

async function verificarContribuyente() {
    const cedula = document.getElementById('cedulaInput').value;
    const resultadoDiv = document.getElementById('resultado');

    // Validar si la cedula o ruc son ecuatorianos
    if (!validarCedulaRucEcuatoriano(cedula)) {
        resultadoDiv.innerHTML = '<div class="alert alert-danger" role="alert">La cédula o RUC no es válido</div>';
        return;
    }

    try {
        const cedulaValidad = cedula + '001';
        const response = await fetch(`http://localhost:3000/consulta-contribuyente?numeroRuc=${cedulaValidad}`);
        const data = await response.json();

        // Verifica si la respuesta es true
        if (data === true) {
            resultadoDiv.innerHTML = '<div class="alert alert-success" role="alert">Es un contribuyente</div>';
        } else {
            resultadoDiv.innerHTML = '<div class="alert alert-warning" role="alert">No es un contribuyente</div>';
        }
    } catch (error) {
        console.error('Error al llamar al servicio', error);
        resultadoDiv.innerHTML = '<div class="alert alert-danger" role="alert">Error al llamar al servicio</div>';
    }
}

function validarCedulaRucEcuatoriano(cedula) {
    
    // Verificar que la cédula tenga 10 dígitos
    if (cedula.length !== 10) {
      return false;
    }
  
    // Verificar que la cédula sea numérica
    if (!/^\d+$/.test(cedula)) {
      return false;
    }
  
    // Verificar el último dígito de la cédula usando el algoritmo de validación
    const digitoVerificador = parseInt(cedula.charAt(9));
    let suma = 0;
    let coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    
    for (let i = 0; i < coeficientes.length; i++) {
      let producto = parseInt(cedula.charAt(i)) * coeficientes[i];
      suma += producto >= 10 ? producto - 9 : producto;
    }
    
    const digitoCalculado = suma % 10 === 0 ? 0 : 10 - (suma % 10);
    
    return digitoVerificador === digitoCalculado;
  
}

function limitarCaracteres(input) {
    // Elimina caracteres no numéricos
    input.value = input.value.replace(/[^0-9]/g, '');

    // Limita a 10 caracteres
    if (input.value.length > 10) {
      input.value = input.value.slice(0, 10);
    }
  } 


  async function scrapeData() {
    alert('hola')
    const tipoIdentificacion = 'CED';
    const identificacion = $('#identificacion').val();

    try {
      const response = await $.get(`http://localhost:3001/scrape?tipoIdentificacion=${tipoIdentificacion}&identificacion=${identificacion}`);
      displayResult(response);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  }

  function displayResult(data) {
    console.log(data);
    const resultDiv = $('#result');
    resultDiv.empty();

    if (data) {
      resultDiv.append(`<p>Nombre: ${data.nombre}</p>`);
      resultDiv.append(`<p>Puntos: ${data.puntos}</p>`);
    } else {
      resultDiv.append('<p>No se pudo obtener la información.</p>');
    }
  }


  async function scrapeData() {
    const tipoIdentificacion = 'CED';
    const identificacion = $('#identificacion').val();

    try {
        const response = await $.get(`http://localhost:3001/scrape?tipoIdentificacion=${tipoIdentificacion}&identificacion=${identificacion}`);
        displayResult(response);
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
}

function displayResult(data) {
    const resultDiv = $('#result');
    resultDiv.empty();

    if (data) {
        resultDiv.append(`<p class="lead">Nombre: ${data.nombre}</p>`);
        resultDiv.append(`<p class="lead">Puntos: ${data.puntos}</p>`);
    } else {
        resultDiv.append('<p class="lead text-danger">No se pudo obtener la información.</p>');
    }
}