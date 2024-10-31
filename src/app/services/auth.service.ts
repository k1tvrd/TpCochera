import { Injectable } from '@angular/core';
import { Login } from '../Interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getToken(): string {
    return localStorage.getItem("token") ?? "";
  }

  estaLogueado(): boolean { //para guarda. ver si dejo pasar o no tras login
    if (this.getToken())
      return true;
    else
      return false;
  }

  /**INICIA SESION*/
  login(datosLogin: Login) {
    return fetch("http://localhost:4000/login", { //llamada a backend. fetch se comunica con back end. hace solicitud y recibe rta. return es porque el fetch devuelve algo
      method: "POST",
      headers: { //objeto que acepta datos de tipo json. con esto backend entiende 
        "Content-Type": "application/json" //indico q es un objeto lo q estoy mandando
      },
      body: JSON.stringify(datosLogin),//jsonstringify para q se haga string
    })
      .then(res => { //THEN RES EXPLICADO EN CLASE 6
        return res.json().then(data => { //permiten encadenar acciones que se ejecutan una tras otra, manejando el flujo asíncrono de las solicitudes de red. Sin ellos, no podrías manejar correctamente los datos una vez que se reciben.
          if (data.status === "ok") {//login correcto
            localStorage.setItem("token", data.token); // para guardar algo [data.token] en una variable [token]
            return true;
          } else {//login incorrecto
            return false;
          }
        })
      })
  }

  logout(): void { //funcion de logout
    localStorage.removeItem("token"); 
  }
  
};

