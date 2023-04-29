window.onload = valoresDefecto;

//Mostrar el valor del range
function imprimirValorRango(value) {
    let mostrarRango = document.getElementById("mostrar-salario");

    mostrarRango.innerHTML = "$" + value;
}

//Poner condiciones de fecha de Nacimiento
let formulario = document.getElementById("formulario");
let resultados = document.getElementById("resultados");
let menuComidas = document.getElementById("menu-comidas");

formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Has presionado el boton");
    
    imprimirNombre();
    imprimirEmail();
    imprimirEdad();
    imprimirGenero();
    imprimirTelefono();
    imprimirSalario(); //Se hizo con una API

    alert("Formulario Enviado");
});

function imprimirNombre() {
    let h2 = document.createElement("p");
    h2.textContent = "Nombre: " + document.getElementById("nombre").value;
    resultados.appendChild(h2);
}

function imprimirEmail(){
    let h2 =  document.createElement("p");
    h2.textContent = "Correo Electronico: " + document.getElementById("email").value;
    resultados.appendChild(h2);
}

function imprimirEdad() {
    let h2 =  document.createElement("p");
    let fechaNacimientoInput = document.getElementById("fechaNacimiento").value;
    let fechaNacimiento = new Date(fechaNacimientoInput);
    let fechaActual = new Date();
    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

    if (fechaNacimiento.getMonth() > fechaActual.getMonth() ) {
        edad = edad - 1;
    }

    h2.textContent = "Edad: " + edad + " años";
    resultados.appendChild(h2);
}

function imprimirGenero() {
    let h2 =  document.createElement("p");
    
    var opciones = document.getElementsByName("opciones");

    for (let i = 0; i < opciones.length; i++) {
        if (opciones[i].checked) {
            h2.textContent = "Genero: " + opciones[i].value;
        }
    }

    resultados.appendChild(h2);
}

function imprimirTelefono() {
    let h2 =  document.createElement("p");
    h2.textContent = "Telefono: " + document.getElementById("telefono").value;
    resultados.appendChild(h2);
}


// Consumir una API de solo 1 Objeto
function imprimirSalario() {
    let URLserver = "https://tipodecambio.paginasweb.cr/api";
    let SalarioDolares = document.getElementById("salario").value;
    
    $.ajax({
        url: URLserver,
        type: "get",
        dataType: "json",
        success: function(data) {
            console.log(data);
            console.log(data.compra);
            console.log(data.venta);

            let h2Compra = document.createElement("h2");
            h2Compra.textContent = "Compra: ₡" + data.compra;
            resultados.appendChild(h2Compra);

            let h2Venta = document.createElement("h2");
            h2Venta.textContent = "Venta: ₡" + data.venta;
            resultados.appendChild(h2Venta);

            let h2SalarioDolares = document.createElement("h2");
            h2SalarioDolares.textContent = "Salario en Dolares: " + SalarioDolares;
            resultados.appendChild(h2SalarioDolares);

            let h2SalarioColones = document.createElement("h2");
            let SalarioColones = Number.parseFloat(SalarioDolares) * Number.parseFloat(data.compra);
            h2SalarioColones.textContent = "Salario en Colones: " + SalarioColones;
            resultados.appendChild(h2SalarioColones);

            let h2Fecha = document.createElement("h2");
            h2Fecha.textContent = "Fecha: " + data.fecha;
            resultados.appendChild(h2Fecha);
        },
        error: function(error) {
            console.log(error);
        }
    });  
}


//Cambiar de Color

function cambiarColor() {
    let color = document.getElementById("color").value;
    let fondo = document.querySelector("body");
    fondo.style.backgroundColor = color;

    localStorage.setItem("Color", color);
}

//Valores en el LocalStorage

function valoresDefecto() {
    document.querySelector("body").style.backgroundColor = localStorage.getItem("Color");

    imprimirComidas();
}


//Consumir de la Api de comidas

function imprimirComidas() {
    let URLserver = "https://si0sgs.github.io/restaurantly/assets/datos/menu.json";
    let select = document.getElementById("clasificacion");
    let valorSeleccionado = select.value;

    $.ajax({
        url: URLserver,
        type: "get",
        dataType: "json",
        success: function(data) {

            if (valorSeleccionado === "Todos") {
                menuComidas.innerHTML = "";
                data.platillos.forEach((platillo) => {
                    imprimirPlato(platillo.clasificacion, platillo.nombre, platillo.precio, platillo.ingredientes);
                });
            }
            else {
                menuComidas.innerHTML = "";
                data.platillos.forEach((platillo) => {
                    if (valorSeleccionado === platillo.clasificacion) {
                        imprimirPlato(platillo.clasificacion, platillo.nombre, platillo.precio, platillo.ingredientes);
                    }
                });
            }
        },
        error: function(error) {
            console.log(error);
        }
    });  
}

function imprimirPlato(clasificacion, nombre, precio, ingredientes) {
    let h2Clasificacion = document.createElement("h2");
    h2Clasificacion.textContent = "Clasificación: " + clasificacion;
    h2Clasificacion.style.color = "blue";
    menuComidas.appendChild(h2Clasificacion);

    let nombrePlato = document.createElement("p");
    nombrePlato.textContent = "Nombre: " + nombre;
    menuComidas.append(nombrePlato);

    let precioPlato = document.createElement("p");
    precioPlato.textContent = "Precio: $" + precio;
    menuComidas.append(precioPlato);

    let ingredientesPlato = document.createElement("p");
    ingredientesPlato.textContent = "Ingredientes: " + ingredientes;
    menuComidas.append(ingredientesPlato);
}



/*comboClasificacion.addEventListener("change", function(){
    let opcion = this.value;
    console.log("La opcion seleccionada es: " + opcion);
});*/