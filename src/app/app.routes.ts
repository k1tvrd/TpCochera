import { UrlCodec } from '@angular/common/upgrade';
import { Router, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { EstadoCocherasComponent } from './pages/estado-cocheras/estado-cocheras.component';
import { PreciosComponent } from './pages/precios/precios.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

//DEFINIR LAS RUTAS DE LAS PAGINAS>: Las rutas definidas permiten que la aplicación navegue entre diferentes componentes.
//ej: vincula el login con las cosas del login, con su css, js, etc

function guardaLogueado() { //guarda para regular acceso, si usuario puede ingresar o no.
    let auth = inject(AuthService) //let pq estoy en un bloque de ejecucion, no declarando cosas en una clase.
    let router = inject(Router);
    if (auth.estaLogueado())
        return true; //si es true, entro a estado cochera.
    else
        router.navigate(["/login"]);
    return false; //si es false, va a login.
}

export const routes: Routes = [ //dice donde esta cada cosa. Path login indica donde esta login.
    {
        path: "login",
        component: LoginComponent
    }, //se usa para diferenciar 2 objetos.

    {
        path: "estado-cocheras",
        component: EstadoCocherasComponent,
        canActivate: [guardaLogueado]
        //para guarda. Admite un array de funciones.
    },

    {
        path: "", //para q cuando alguien entre al path vacio sea redireccionado a la pag de login, q es la pag principal ahora.
        redirectTo: "login",
        pathMatch: "full" //para q redirect lo haga en ese path vacio y no en todos los otros.
    },
    {
        path: "precios",
        component: PreciosComponent,
    },
    {
        path: "reportes",
        component: ReportesComponent,
    },
];
