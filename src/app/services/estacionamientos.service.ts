import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Estacionamiento } from '../Interfaces/estacionamiento';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EstacionamientosService {

  auth = inject(AuthService)

  getEstacionamiento(): Promise<Estacionamiento[]> {
    return fetch("http://localhost:4000/estacionamientos", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + (this.auth.getToken() ?? "")
      },
    }).then(r => r.json());
  }

  //fetch que trae estacionamiento. Se hace cruce de datos. toma id cochera, busca cual es el estacionamiento activo que le corresponde. 
  //decime que patente esta ocupada y a que hora.
  //api de esatcionamiento conoce patente e ingreso, cochera solo tiene id y deshabilitada. 

  buscarEstacionamientoActivo(idCochera: number) {
    return this.getEstacionamiento().then(estacionamientos => {
      let buscado = null
      for (let estacionamiento of estacionamientos) {//declaro variable que va a asumir cada valor del array estacionamientos.
        if (estacionamiento.idCochera === idCochera &&
          estacionamiento.horaEgreso === null) {//busco de entre todos, alguno que tenga el mismo id de cochera que estoy buscando y que tenga egreso null, porque eso signfiica que esta activo. 
          buscado = estacionamiento;
        }
      }
      return buscado;
    });
  }

  getEstacionamientoId(idEstacionamiento: number): Promise<Estacionamiento[]> {
    return fetch(`http://localhost:4000/estacionamientos/${idEstacionamiento}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + (this.auth.getToken() ?? "")
      },
    }).then(r => r.json());
  }

  abrirEstacionamiento(patenteAuto: string, idCochera: number) {//abre un estacionamiento con una patente sobre una cochera en particular.
    return fetch("http://localhost:4000/estacionamientos/abrir", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + (this.auth.getToken() ?? ""),
        "content-type": "application/json"
      },
      body: JSON.stringify({
        patente: patenteAuto, //estacionarAuto recibe patente y esa es la que se manda al back bajo el nombre de patente.
        idCochera: idCochera, //recibo atributos al inicio para usarlos aca.
        idUsuarioIngreso: "admin",
      })
    }).then(r => r.json());
  }

  cerrarEstacionamiento(patenteAuto: string, idCochera: number) {
    return fetch("http://localhost:4000/estacionamientos/cerrar", {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + (this.auth.getToken() ?? ""),
        "content-type": "application/json"
      },
      body: JSON.stringify({
        patente: patenteAuto,
        idUsuarioIngreso: "admin"
      })
    });
  }

}  