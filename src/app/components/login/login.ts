import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  username: string='';
  password: string='';
  showPassword: boolean =false;
  error: string = "";

  constructor(private authService: AuthService, private router: Router){

  }

  login():void {
    this.authService.login(this.username,this.password).subscribe({
      next: () => this.router.navigate(['/documents']),
      error: (err) => {
        console.error('Error completo:', err);
        console.error('Status:', err.status);
        console.error('Message:', err.message);
        
        if (err.status === 0) {
          this.error = 'Error de conexión. Verifica CORS o que el servidor esté disponible.';
        } else if (err.status === 401) {
          this.error = 'Credenciales incorrectas.';
        } else if (err.status === 400) {
          this.error = 'Error en la petición: ' + (err.error?.error_description || 'Datos inválidos');
        } else {
          this.error = `Error ${err.status}: ${err.message || 'Error al autenticar'}`;
        }
      }
    })
  }

    togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

}
