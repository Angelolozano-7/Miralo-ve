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
id: "Universidades-3",
nombre: "Universidades 3",
background: "/assets/Universidades-3.jpg",
// ⚠️ Valores de ejemplo: ajusta con el Editor (modo 'edit')
quadNorm: [
[0.6452,0.341],
[0.9438,0.3241],
[0.9454,0.4879],
[0.6452,0.4907],
],
}
,// puedes agregar más vallas aquí
{
id: "Estadio-Pascual-Guerrero-1",
nombre: "Estadio Pascual Guerrero 1",
background: "/assets/Estadio-pascual-guerrero-1.jpg",
// ⚠️ Valores de ejemplo: ajusta con el Editor (modo 'edit')
quadNorm: [
[0.14,0.4055],
[0.793,0.4006],
[0.7949,0.6719],
[0.14,0.6793],
],
}
,
{
id: "Granada-2",
nombre: "Granada 2",
background: "/assets/Granada-2.jpg",
// ⚠️ Valores de ejemplo: ajusta con el Editor (modo 'edit')
quadNorm: [
[0.2479,0.1737],
[0.5807,0.2033],
[0.5844,0.3488],
[0.2516,0.334],
],
}
,
{
id: "san-antonio",
nombre: "San antonio",
background: "/assets/san-antonio.jpg",
// ⚠️ Valores de ejemplo: ajusta con el Editor (modo 'edit')
quadNorm: [
[0.4094,0.1539],
[0.5481,0.149],
[0.5499,0.4598],
[0.4112,0.4622],
],
}
,
{
id: "Centro-Comercial-Calima",
nombre: "Centro Comercial Calima",
background: "/assets/Centro-Comercial-Calima.jpg",
// ⚠️ Valores de ejemplo: ajusta con el Editor (modo 'edit')
quadNorm: [
[0.6234,0.0676],
[0.8241,0.0627],
[0.8223,0.149],
[0.6216,0.149],
],
}
,
{
id: "Intercontinental",
nombre: "Intercontinental",
background: "/assets/Intercontinental.jpg",
// ⚠️ Valores de ejemplo: ajusta con el Editor (modo 'edit')
quadNorm: [
[0.0987,0.0923],
[0.3326,0.0947],
[0.3344,0.1909],
[0.0987,0.1934],
],
}
,
{
id: "Unicentro-2",
nombre: "Unicentro 2",
background: "/assets/Unicentro-2.jpg",
// ⚠️ Valores de ejemplo: ajusta con el Editor (modo 'edit')
quadNorm: [
[0.4506,0.1613],
[0.5993,0.1589],
[0.5993,0.2205],
[0.4506,0.223],
],
}
,
{
id: "Universidades-1",
nombre: "Universidades 1",
background: "/assets/Universidades-1.jpg",
// ⚠️ Valores de ejemplo: ajusta con el Editor (modo 'edit')
quadNorm: [
[0.3665,0.1638],
[0.514,0.1613],
[0.514,0.2255],
[0.3646,0.223],
],
}
,
{
id: "Salsodromo-5",
nombre: "Salsodromo 5",
background: "/assets/Salsodromo-5.jpg",
// ⚠️ Valores de ejemplo: ajusta con el Editor (modo 'edit')
quadNorm: [
[0.4357,0.0454],
[0.6048,0.0454],
[0.6048,0.1169],
[0.4357,0.1194],
],
}
,
];