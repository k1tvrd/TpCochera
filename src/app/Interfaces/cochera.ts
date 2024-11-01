export interface Cochera {
    id: number;
    descripcion: string;
    deshabilitada: boolean;
    eliminada: boolean;
}

//para tener los tipos de fila de cocheras en un lugar global y que desde
//varios lugares se puedan aplicar a los tipos de estas filas.
//Poder referenciarlo desde distintos sitios.