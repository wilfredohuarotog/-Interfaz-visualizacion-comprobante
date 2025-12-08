import { Component } from '@angular/core';
import { Header } from '../header/header';
import { View } from '../view/view';

@Component({
  selector: 'app-layout',
  imports: [Header, View],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

}
