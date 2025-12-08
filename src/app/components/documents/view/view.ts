import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../../../services/auth';
import { DocumentService} from '../../../services/documents';

@Component({
  selector: 'app-view',
  imports: [CommonModule],
  templateUrl: './view.html',
  styleUrl: './view.css',
})
export class View implements OnInit{

  private authService = inject(AuthService);
  private documentService = inject(DocumentService);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  ticket = '571cc3a3-5b1f-4855-af26-0de6e7c5475f';

    documents = {
    xml: null as SafeUrl | null,
    cdr: null as SafeUrl | null,
    pdf: null as SafeUrl | null
  };

  ngOnInit(): void {
    
        if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadDocuments();
  }

    loadDocuments(): void {
    const token = this.authService.getToken();
    if (!token) return;

    this.documentService.getXML(this.ticket, token).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        this.documents.xml = this.sanitizer.bypassSecurityTrustUrl(url);
      },
      error: (err) => {
        console.error('Error al cargar XML:', err);
      }
    });

    this.documentService.getCDR(this.ticket, token).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        this.documents.cdr = this.sanitizer.bypassSecurityTrustUrl(url);
      },
      error: (err) => {
        console.error('Error al cargar CDR:', err);
      }
    });

    this.documentService.getPDF(this.ticket, token).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        this.documents.pdf = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      },
      error: (err) => {
        console.error('Error al cargar PDF:', err);
      }
    });
  }
  downloadDocument(url: SafeUrl | null, filename: string): void {
  if (!url) return;

  const realUrl = this.sanitizer.sanitize(4, url);

  if (!realUrl) return;

  const a = document.createElement('a');
  a.href = realUrl;
  a.download = filename;
  a.click();
}
}
