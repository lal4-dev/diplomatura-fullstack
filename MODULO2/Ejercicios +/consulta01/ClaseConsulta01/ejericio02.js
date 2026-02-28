/* 

La Empresa de Energía de Catamarca comunica que la factura correspondiente al mes de enero de 2026 se calculará de la siguiente forma: se Obtendrá del promedio de las facturas de octubre, noviembre y diciembre de 2025.
Debe crear las siguientes variables:
- Octubre 2025 => aquí deberá ponerle el valor que usted desee
- Noviembre 2025 => aquí deberá ponerle el valor que usted desee
- Diciembre 2025 => aquí deberá ponerle el valor que usted desee
- Enero 2026 => El Sistema debe calcular y obtener el valor de la factura de enero.
- Deberá sumar los importes de las tres facturas y dividirlo por 3 (es decir obtener el promedio).

*/

{
    let octubre2025 = 95000.00;
    let noviembre2025 = 110000.00;
    let diciembre2025 = 54000;

    let enero2026 = (octubre2025 + noviembre2025 + diciembre2025) / 3;

    console.log('Factura de Enero de 2026 ',enero2026.toFixed(2));




}