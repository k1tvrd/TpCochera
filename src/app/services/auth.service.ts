import { Injectable } from '@angular/core';
import { Login } from '../Interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getToken(): string {
    return localStorage.getItem("token") ?? "";
  }

  estaLogueado(): boolean { //para guarda. Ver si se permite acceso o no tras login.
    if (this.getToken())
      return true;
    else
      return false;
  }

  login(datosLogin: Login) {
    return fetch("http://localhost:4000/login", { //llamada a backend. Fetch se comunica con back. Hace solicitud y recibe rta. 
      method: "POST",
      headers: { //objeto que acepta datos de tipo json.  
        "Content-Type": "application/json" //indico q es un objeto lo q estoy mandando.
      },
      body: JSON.stringify(datosLogin),//jsonstringify para q se haga string.
    })
      .then(res => { //THEN RES EXPLICADO EN CLASE 6
        return res.json().then(data => { //permiten encadenar acciones que se ejecutan una tras otra, manejando el flujo asíncrono de las solicitudes de red. Sin ellos, no se pueden manejar correctamente los datos cdo se reciben.
          if (data.status === "ok") {//login correcto.
            localStorage.setItem("token", data.token); // para guardar algo [data.token] en una variable [token]
            return true;
          } else {//login incorrecto.
            return false;
          }
        })
      })
  }

  logout(): void { //funcion de logout
    localStorage.removeItem("token");
  }

};

