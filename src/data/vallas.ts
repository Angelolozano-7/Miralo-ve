export type Point = [number, number]; // [x,y]


export interface Valla {
id: string;
nombre: string;
background: string; // ruta en /public/assets/...
mask?: string; // opcional, PNG con alfa
quadNorm: Point[]; // 4 puntos, en orden: TL, TR, BR, BL (valores 0..1)
}


export const VALLAS: Valla[] = [
{
id: "pascual-4",
nombre: "Estadio Pascual Guerrero 4",
background: "/assets/pascual-4.jpg",
// ⚠️ Valores de ejemplo: ajusta con el Editor (modo 'edit')
quadNorm: [
[0.4057, 0.1539],
[0.555, 0.1441],
[0.555 , 0.4548],
[0.4038 , 0.4573],
],
},
// puedes agregar más vallas aquí
];