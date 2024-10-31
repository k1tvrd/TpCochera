import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-precios',
  standalone: true,
  imports: [RouterModule, CommonModule, HeaderComponent],
  templateUrl: './precios.component.html',
  styleUrl: './precios.component.scss'
})
export class PreciosComponent {
  headerP = {
    tiempo: "Tiempo",
    costo: "Costo",
    acciones: "Acciones",
    
};

filasPrecios = [
    { tiempo: "Media Hora", costo: 250, acciones: false },
    { tiempo: "Una Hora", costo: 400, acciones: false },
];

}
