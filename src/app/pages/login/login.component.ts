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
  imports: [RouterModule, HeaderComponent, FormsModule], //traigo el router module para poder usar el router
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
//solicitud al backend para crear objeto con username y password. creo interfaz
datosLogin:Login ={ 
  username: "",
  password: "",
};

router = inject(Router); //me permite usar inject mas tarde. lo tengo que importar arriba.
auth = inject(AuthService); //para el servicio del login

login(){ //para autenticar los datos del login y que me lleve a estado cochera si son correcto
  this.auth.login(this.datosLogin)
  .then(ok=> {
    if(ok){  //doice como fue operacion de login si todos los detalles. espero recibir si o no. si es si (ok) navega a estado cocehera, si no, no accede.
      this.router.navigate(["/estado-cocheras"])
    } else{ //alerta 
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


