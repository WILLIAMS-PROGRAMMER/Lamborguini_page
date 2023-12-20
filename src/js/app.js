
let paso = 1;

const cita = {
    id: '',
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
   mostrarSeccion(); // Esto es para que la primera vez se muestre algo
   tabs(); // Cambia la seccion cuando se presionen los tabs
   botonesPaginador(); //Agrega o quita los botones del paginador
   paginaSiguiente(); // boton para avanzar de pagina
   paginaAnterior(); // boton para retroceder de pagina
   consultarAPI(); // Consulta la api en el backend de php
   idCliente();
   nombreCliente(); // Añade el mobre del cliente al objeto de cita
   seleccionarFecha(); // Añade la fecha de la cita en el objeto
   seleccionarHora(); // Añade la hora de la cita en el objeto
    mostrarResumen(); // Muestra el resumen de la cita
}

function mostrarSeccion() {
    //ocultar la seccion que tenga la clase de mostrar
    const seccionAnterior = document.querySelector('.mostrar');
    if(seccionAnterior) { seccionAnterior.classList.remove('mostrar'); }
    //Selelccionar la seccion con el paso
    const seccion = document.querySelector(`#paso-${paso}`);
    seccion.classList.add('mostrar');

    //Quita la clase actual al tab anterior
    const tabAnterior = document.querySelector('.actual');
    if(tabAnterior) { tabAnterior.classList.remove('actual')};
    //Resalta el tab actual
    const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add('actual');
}

function tabs() {
    const botones = document.querySelectorAll('.tabs button');

    botones.forEach(boton => {
        boton.addEventListener('click', function(e) {
            paso = parseInt(e.target.dataset.paso);
            mostrarSeccion();
            botonesPaginador();
        });
    });
}

function botonesPaginador() {
    const paginaSiguiente = document.querySelector('#siguiente');
    const paginaAnterior = document.querySelector('#anterior');

    if(paso == 1) {
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    } else if (paso == 3) {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');
        mostrarResumen();
    } else {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }
    mostrarSeccion();
}

function paginaAnterior() {
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click',function() {
        paso--;
        botonesPaginador();
    })
}

function paginaSiguiente() {
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click',function() {
        paso++;
        botonesPaginador();
    })
}

async function consultarAPI() {
    try {
        const url = '/api/servicios';
        const resultado = await fetch(url);
        //console.log(resultado);
        const servicios = await resultado.json();
        //console.log(servicios);
        mostrarServicios(servicios);
    } catch (error) {
        console.log(error);
    }
}

function mostrarServicios(servicios) {
    servicios.forEach(servicio => {
        const {id,nombre,precio} = servicio;

        const nombreServicio = document.createElement('P'); // P es parrafo
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement('P'); // P es parrafo
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$${precio}`;

        const servicioDiv = document.createElement('DIV'); // P es parrafo
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function() {
            seleccionarServicio(servicio);
        } 
        
        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);

        document.querySelector('#servicios').appendChild(servicioDiv);
    });
}

function seleccionarServicio(servicio) {
    const {id} = servicio;
    const {servicios} = cita;
    //Identificar el elemento al que se le da click
    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);

   //Comprobar si unservicio ya fue agregado
   if(servicios.some( agregado => agregado.id == id ) ) {
        //Eliminarlo
        cita.servicios = servicios.filter(agregado => agregado.id != id);
        divServicio.classList.remove('seleccionado');
    } else {
        //  Agregarlo
        cita.servicios = [...servicios,servicio];
        divServicio.classList.add('seleccionado');
    }

   console.log(cita);
}

function idCliente() {
    const id = document.querySelector('#id').value;
    cita.id = id;
}

function nombreCliente() {
    const nombre = document.querySelector('#nombre').value;
    cita.nombre = nombre;
}

function seleccionarFecha() {
    const inputFecha = document.querySelector('#fecha');
    inputFecha.addEventListener('input',function(e) {
        const dia = new Date(e.target.value).getUTCDay();
        if([6,0].includes(dia)) {
            e.target.value = '';
            mostrarAlerta('Horario de atencion: de Lunes a Viernes','error','.formulario');
        } else {
            cita.fecha = e.target.value;
        }
    });
}

function seleccionarHora() {
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', function(e) {
        const horaCita = e.target.value;
        const hora = horaCita.split(":")[0];
        if(hora < 10 || hora > 18) {
            e.target.value = '';
            mostrarAlerta('Hora no valida','error','.formulario');
        } else {
            cita.hora = e.target.value;
        }
    });
}

function mostrarAlerta(mensaje,tipo,elemento) {
    //previene que se genere mas de 1 alerta
    const alertaPrevia = document.querySelector('.alerta');
    if(alertaPrevia) return;
    //Scripting para crear alerta
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    const referencia = document.querySelector(elemento);
    referencia.appendChild(alerta);
    //Eliminar la alerta
    setTimeout(() => {
        alerta.remove();
    },2700);
}

function mostrarResumen() {
    const resumen = document.querySelector('.contenido-resumen');

    //Limpiar contenido de Resumen
    while(resumen.firstChild) {
        resumen.removeChild(resumen.firstChild);
    }

    if( Object.values(cita).includes('') || cita.servicios.length == 0 ) {
        mostrarAlerta('Rellenar todos los campos','error','.contenido-resumen');
        return;
    } 

    // Formatear el div de resumen
    const {nombre,fecha,hora,servicios} = cita;

    //Heading para Servicios en Resumen
    const headingServicios = document.createElement('H3');
    headingServicios.textContent = 'Resumen de Servicios';
    resumen.appendChild(headingServicios);

    //Iterando y mostrando los servicios
    servicios.forEach(servicio => {
        //Destructuring
        const {id,precio,nombre} = servicio;

        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');

        const textoServicio = document.createElement('P');
        textoServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.innerHTML = `<span>Precio:</span> $${precio}`;

        contenedorServicio.appendChild(textoServicio);
        contenedorServicio.appendChild(precioServicio);

        resumen.appendChild(contenedorServicio);
        
    })

    //Heading para Cita en Resumen
    const headingCita = document.createElement('H3');
    headingCita.textContent = 'Resumen de Cita';
    resumen.appendChild(headingCita);

    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;

    //Formatear fecha en español
    const fechaObj = new Date(fecha);
    const mes = fechaObj.getMonth();
    const dia = fechaObj.getDate() +2;
    const year = fechaObj.getFullYear();

    const fechaUTC = new Date(Date.UTC(year,mes,dia));

    const opciones = { weekday: 'long', year:'numeric', month: 'long', day: 'numeric'}
    const fechaFormateada = fechaUTC.toLocaleDateString('es-MX', opciones);
   

    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;

    const HoraCita = document.createElement('P');
    HoraCita.innerHTML = `<span>Hora:</span> ${hora} Horas`;

    //Boton para crear una cita
    const botonReservar = document.createElement('BUTTON');
    botonReservar.classList.add('boton');
    botonReservar.textContent = 'Reservar Cita';
    botonReservar.onclick = reservarCita; // Debe de ser sin (), ya que si le ponemos no funciona

    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(HoraCita);
    resumen.appendChild(botonReservar);
}

async function reservarCita() {
    const {fecha,hora,servicios ,id} = cita;
    const idServicios = servicios.map(servicio => servicio.id);

    const datos = new FormData();
    datos.append('fecha', fecha);
    datos.append('hora', hora);
    datos.append('usuarioId', id);
    datos.append('servicios', idServicios);
    
    //Peticion hacia la api
    const url = '/api/citas'
    const respuesta = await fetch(url, {
        method: 'POST',
        body: datos
    });
    const resultado = await respuesta.json();
    //EN POSTMAN ES MAS SENCILLO
    console.log(resultado.id); //result : asi se llama en active record //ese id es el de cita ,no el de usuario
    if(resultado.result) {
        Swal.fire({
            icon: "success",
            title: "Cita creada",
            text: "Tu cita fue creada correctamente",
            button: 'OK'
          }).then(() => {
            setTimeout(() => {
                window.location.reload();
            },200);        
          })
    }
}