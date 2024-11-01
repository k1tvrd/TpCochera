import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { Login } from "../../Interfaces/login";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, HeaderComponent, FormsModule], //traigo el routerModule para poder usar el router.
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent { //solicitud al backend para crear objeto con username y password. Creo interfaz.
  datosLogin: Login = {
    username: "",
    password: "",
  };

  router = inject(Router); //inject me permite usar router mas tarde. Debe importarse arriba.
  auth = inject(AuthService); //para el servicio del login.

  login() { //para autenticar los datos del login y que me lleve a estado cochera si son correctos.
    this.auth.login(this.datosLogin)
      .then(ok => {
        if (ok) {  //dice como fue operacion de login. Espero recibir si o no. Si es si (ok) navega a estado cocehera, si no, no accede.
          this.router.navigate(["/estado-cocheras"])
        } else {
          Swal.fire({
            icon: "error",
            title: "Credenciales incorrectas",
            text: "El usuario o contraseña no están registrados",
            footer: '<a href="#">No estás registrado?</a>'
          });
        }
      });
  }
}


