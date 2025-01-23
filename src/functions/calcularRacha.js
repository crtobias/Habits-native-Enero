export default function calcularRacha(arrayFechas) {
    function normalizarFecha(fechaIn) {
        const fecha = new Date(fechaIn);
        const dia = fecha.getUTCDate(); 
        const mes = fecha.getUTCMonth() + 1; 
        return { dia, mes };
    }

    function verificarRacha(fechaActual, fechas) {
        let racha = 1; 
        let { dia, mes } = fechaActual;
        const mapaFechas = new Set(fechas.map(fecha => `${fecha.dia}-${fecha.mes}`));
    
        while (true) {
            dia--; 
    
            if (dia < 1) {
                mes--; 
                if (mes < 1) {
                    mes = 12; 
                }
    
                dia = new Date(2025, mes, 0).getDate();
            }

            if (mapaFechas.has(`${dia}-${mes}`)) {
                racha++;
            } else {
                break;
            }
        }
    
        return racha;
    }

    const fechaActual = normalizarFecha(new Date)
    const fechasNormalizadas = arrayFechas.map(normalizarFecha);

    console.log("racha de :",verificarRacha(fechaActual,fechasNormalizadas));
    return(verificarRacha(fechaActual,fechasNormalizadas))
}