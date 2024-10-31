import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [RouterModule, CommonModule, HeaderComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
  
})
export class ReportesComponent {
  headerR = {
    numero: "N°",
    mes: "Mes",
    usos: "Usos",
    cobrado: "Cobrado",
};

filasReportes = [
    { mes: "2024/10", usos: 175, cobrado: true },
    { mes: "2024/10", usos: 175, cobrado: false },
    { mes: "2024/10", usos: 175, cobrado: true },
    { mes: "2024/10", usos: 175, cobrado: false },
    { mes: "2024/10", usos: 175, cobrado: true },
    { mes: "2024/10", usos: 175, cobrado: true },
    { mes: "2024/10", usos: 175, cobrado: false },
    { mes: "2024/10", usos: 175, cobrado: true },
];

}



