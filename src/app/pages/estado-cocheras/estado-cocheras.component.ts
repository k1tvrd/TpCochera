import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cochera } from '../../Interfaces/cochera';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { CocherasService } from '../../services/cocheras.service';
import { Estacionamiento } from '../../Interfaces/estacionamiento';
import { EstacionamientosService } from '../../services/estacionamientos.service';

@Component({
  selector: 'app-estado-cocheras',
  standalone: true,
  imports: [RouterModule, CommonModule, HeaderComponent], //traigo el router module para poder usar el router
  templateUrl: './estado-cocheras.component.html',
  styleUrl: './estado-cocheras.component.scss'
}) //se esta vinculando componente con su html y css

export class EstadoCocherasComponent {
  titulo: string = 'Estado de la cochera';

  filas: (Cochera & { activo: Estacionamiento|null })[] = [];

  siguienteNumero: number = 1;

  auth = inject(AuthService);
  cocheras = inject(CocherasService);
  estacionamientos = inject(EstacionamientosService);

  ngOnInit() {
    this.traerCocheras();
  }

  traerCocheras() {
    return this.cocheras.getCocheras().then(cocheras => {
      this.filas = [];

      for (let cochera of cocheras) {
        this.estacionamientos.buscarEstacionamientoActivo(cochera.id).then(estacionamiento => {
          this.filas.push({
            ...cochera,
            activo: estacionamiento,
          });
        })
      };
    });
  }
  
datosEstadoCocheras = {
    descripcion: " "
  }

  agregarFila(): void {
    this.cocheras.agregarCochera(this.datosEstadoCocheras)
      .then(data => {
        console.log(data);
        this.ngOnInit(); // Recarga los datos después de agregar
      })
      .catch(error => {
        console.error('Hubo un problema con la operación fetch:', error);
      });
  }

 /** Elimina las cocheras activas */
 eliminarFila(idCochera: number): void {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  Swal.fire({
    title: '¿Deseas borrar la cochera?',
    text: 'Esta acción es irrevertible',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.cocheras.eliminarCochera(idCochera)
        .then(response => {
          if (response.ok) {
            swalWithBootstrapButtons.fire({
              title: 'Genial!',
              text: 'La cochera se borró con éxito!',
              icon: 'success'
            });
            // Eliminar la fila en el frontend
            this.filas = this.filas.filter(item => item.id !== idCochera);
          } else {
            swalWithBootstrapButtons.fire({
              title: 'Error',
              text: 'No se pudo borrar la cochera.',
              icon: 'error'
            });
          }
        })
        .catch(error => {
          console.error('Error al borrar la cochera:', error);
          swalWithBootstrapButtons.fire({
            title: 'Error',
            text: 'Ocurrió un error al intentar borrar la cochera.',
            icon: 'error'
          });
        });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: 'Cancelado',
        text: 'La cochera no ha sido eliminada.',
        icon: 'info'
      });
    }
  });
}

  abrirModalEstacionamiento(idCochera:number){ //al principio funcion viene con await y se le puedo poner un async para q funcione pero nosotros lo hacemos con .then
   Swal.fire({
      title: "Ingrese la patente del vehiculo",
      input: "text",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Ingrese una patente valida";
        }
        return
      }
    }).then(res=>{
      if(res.isConfirmed){
        this.estacionamientos.abrirEstacionamiento(res.value, idCochera).then(()=> {
          //actualizar cocheras tras haber agregado una
          this.traerCocheras();
        });
      }
    })
  }

  abrirModalDesbloquear(){
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

    cambiarDisponibilidadCochera(idCochera:number) {
      const cochera = this.filas[idCochera]; // accede a la cochera actual
      const estadoActual = cochera.deshabilitada ? 'no disponible' : 'disponible';
      const proximoEstado = cochera.deshabilitada ? 'disponible' : 'no disponible';
      if (cochera.deshabilitada) {
        this.cocheras.habilitarCochera(cochera).then(() => this.traerCocheras());
      } else {
        this.cocheras.deshabilitarCochera(cochera).then(() => this.traerCocheras());
      };
    }
  }
  