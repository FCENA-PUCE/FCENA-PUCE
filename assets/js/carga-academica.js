// Función principal para calcular todos los valores
function calculateAll() {
    // Obtener valores de entrada
    const clases_1_1_ord = parseFloat(document.getElementById('clases_1_1_ord').value) || 0;
    const clases_1_05_ord = parseFloat(document.getElementById('clases_1_05_ord').value) || 0;
    const clases_1_1_ext = parseFloat(document.getElementById('clases_1_1_ext').value) || 0;
    const clases_1_05_ext = parseFloat(document.getElementById('clases_1_05_ext').value) || 0;
    const investigacion_ord = parseFloat(document.getElementById('investigacion_ord').value) || 0;
    const vinculacion_ord = parseFloat(document.getElementById('vinculacion_ord').value) || 0;
    const gestion_ord = parseFloat(document.getElementById('gestion_ord').value) || 0;
    const gestion_ext = parseFloat(document.getElementById('gestion_ext').value) || 0;

    // Calcular preparación
    const preparacion_ord = clases_1_1_ord + (0.5 * clases_1_05_ord);
    const preparacion_ext = preparacion_ord + clases_1_1_ext + (0.5 * clases_1_05_ext);

    // Para extraordinario, investigación y vinculación son iguales al ordinario
    const investigacion_ext = investigacion_ord;
    const vinculacion_ext = vinculacion_ord;

    // Calcular totales
    const total_ord = clases_1_1_ord + clases_1_05_ord + preparacion_ord + investigacion_ord + vinculacion_ord + gestion_ord;
    const total_ext = clases_1_1_ext + clases_1_05_ext + preparacion_ext + investigacion_ext + vinculacion_ext + gestion_ext;
    
    // Calcular compensación
    const compensacion_ord = Math.max(0, total_ord - 40);
    const compensacion_ext = total_ord > 40 ? (total_ord - 40) * (20 / 6) : 0;

    // Total compensado: ordinario = total - compensación, extraordinario = total + compensación
    const total_compensado_ord = total_ord - compensacion_ord;
    const total_compensado_ext = total_ext + compensacion_ext;    // Actualizar elementos en la página
    updateElement('preparacion_ord', preparacion_ord);
    updateElement('preparacion_ext', preparacion_ext);
    updateElement('investigacion_ext', investigacion_ext);
    updateElement('vinculacion_ext', vinculacion_ext);
    updateElement('total_ord', total_ord);
    updateElement('total_ext', total_ext);
    
    // Mostrar compensación con signo negativo para ordinario y positivo para extraordinario
    if (compensacion_ord > 0) {
        updateElementWithSign('compensacion_ord', compensacion_ord, '-');
    } else {
        updateElement('compensacion_ord', compensacion_ord);
    }
    
    if (compensacion_ext > 0) {
        updateElementWithSign('compensacion_ext', compensacion_ext, '+');
    } else {
        updateElement('compensacion_ext', compensacion_ext);
    }
    
    updateElement('total_compensado_ord', total_compensado_ord);
    updateElement('total_compensado_ext', total_compensado_ext);

    // Actualizar colores según los totales
    updateRowColors();
}

// Función auxiliar para actualizar elementos con formato
function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = formatNumber(value);
    }
}

// Función para actualizar elementos con signo específico (+ o -)
function updateElementWithSign(id, value, sign) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = sign + formatNumber(value);
    }
}

// Función para formatear números (máximo 2 decimales, sin decimales innecesarios)
function formatNumber(value) {
    if (value === 0) return '0';
    
    // Redondear a 2 decimales y convertir a string
    const rounded = Math.round(value * 100) / 100;
    
    // Si es un número entero, mostrar sin decimales
    if (rounded % 1 === 0) {
        return rounded.toString();
    }
    
    // Si tiene decimales, mostrar hasta 2 decimales sin ceros innecesarios
    return rounded.toFixed(2).replace(/\.?0+$/, '');
}

// Función para actualizar colores de las filas según los valores
function updateRowColors() {
    const totalOrd = parseFloat(document.getElementById('total_ord').textContent) || 0;
    const totalExt = parseFloat(document.getElementById('total_ext').textContent) || 0;
    const totalCompOrd = parseFloat(document.getElementById('total_compensado_ord').textContent) || 0;
    const totalCompExt = parseFloat(document.getElementById('total_compensado_ext').textContent) || 0;
      // Aplicar estilos especiales si los totales superan ciertos umbrales
    const totalRow = document.querySelector('.total-row');
    const finalTotalRow = document.querySelector('.final-total-row');
    
    // Cambiar color de fondo de las filas según el total ordinario
    if (totalOrd > 40) {
        totalRow.style.backgroundColor = 'rgba(255, 193, 7, 0.2)';
        finalTotalRow.style.backgroundColor = 'rgba(255, 193, 7, 0.3)';
    } else {
        totalRow.style.backgroundColor = 'rgba(227, 242, 253, 0.3)';
        finalTotalRow.style.backgroundColor = 'rgba(227, 242, 253, 0.5)';
    }
    
    // Verificar si los totales compensados están fuera del rango 39.5 - 40.5
    const isCompOrdOutOfRange = totalCompOrd < 39.5 || totalCompOrd > 40.5;
    const isCompExtOutOfRange = totalCompExt < 39.5 || totalCompExt > 40.5;
    
    // Elementos de totales compensados
    const totalCompOrdElement = document.getElementById('total_compensado_ord');
    const totalCompExtElement = document.getElementById('total_compensado_ext');
    
    // Elementos de totales normales
    const totalOrdElement = document.getElementById('total_ord');
    const totalExtElement = document.getElementById('total_ext');
    
    // Resetear los estilos de los totales normales (azul por defecto)
    totalOrdElement.style.color = '#134383';
    totalOrdElement.style.fontWeight = '600';
    totalExtElement.style.color = '#134383';
    totalExtElement.style.fontWeight = '600';
    
    // Aplicar color solo a columna ordinaria
    if (isCompOrdOutOfRange) {
        // Fuera de rango: rojo
        totalCompOrdElement.style.color = '#dc3545';
        totalCompOrdElement.style.fontWeight = 'bold';
    } else {
        // Dentro de rango: verde
        totalCompOrdElement.style.color = '#14a651';
        totalCompOrdElement.style.fontWeight = '600';
    }
    
    // Aplicar color solo a columna extraordinaria
    if (isCompExtOutOfRange) {
        // Fuera de rango: rojo
        totalCompExtElement.style.color = '#dc3545';
        totalCompExtElement.style.fontWeight = 'bold';
    } else {
        // Dentro de rango: verde
        totalCompExtElement.style.color = '#14a651';
        totalCompExtElement.style.fontWeight = '600';
    }
}

// Función para validar entrada numérica
function validateInput(input) {
    let value = parseFloat(input.value);
    
    if (isNaN(value) || value < 0) {
        input.value = '';
        return;
    }
    
    // Redondear a 1 decimal
    value = Math.round(value * 10) / 10;
    input.value = value;
    
    calculateAll();
}

// Agregar event listeners cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Agregar validación a todos los inputs
    const inputs = document.querySelectorAll('#carga-academica input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            // Calcular en tiempo real mientras se escribe
            calculateAll();
        });
    });
    
    // Calcular valores iniciales
    calculateAll();
});
