// Productos completos del menú que me proporcionaste
const productosMenu = {
    "Costilla de cerdo": 300,
    "Pollo asado": 220,
    "Cerdo asado": 220,
    "Corazón asado": 220,
    "Gonces asados": 450,
    "Lomo de costilla asado": 470,

    // Mariscos
    "Camarones a la plancha": 370,
    "Camarones empanizados": 370,
    "Camarones al ajillo": 370,
    "Corvina a la plancha": 370,

    // Pollo
    "Pollo a la plancha": 350,
    "Pollo al vino": 350,
    "Pollo jalapeño": 350,
    "Pollo a la plancha (Tipo Boca)": 400,

    // Extras
    "Arroz o gallo pinto": 50,
    "Papas": 200,
    "Ensalada": 40,
    "Tostones": 50,
    "Chimichurri": 0,  // Sin precio
    "Jalapeño": 40,
    "Queso": 50,

    // Cervezas y Licores
    "Toña": 0, // Sin precio proporcionado
    "Toña Light": 0, // Sin precio proporcionado
    "Victoria Clásica": 0, // Sin precio proporcionado
    "Victoria Frost": 0, // Sin precio proporcionado
    "Sol": 0, // Sin precio proporcionado
    "Heineken": 0, // Sin precio proporcionado
    "Bamboo": 0, // Sin precio proporcionado
    "Adán y Eva": 0, // Sin precio proporcionado
    "Bliss": 0, // Sin precio proporcionado
    "Hard Seltzer Spark": 0, // Sin precio proporcionado
    "Smirnoff": 0, // Sin precio proporcionado
    "1/2 botella de ron nacional Flor de Caña (Gran Reserva/Ultra Lite)": 0, // Sin precio proporcionado
    "1/4 botella de ron nacional Flor de Caña (Gran Reserva/Ultra Lite)": 0, // Sin precio proporcionado
    "Tequila José Cuervo Especial": 0, // Sin precio proporcionado
    "Whisky Johnnie Walker Red": 0, // Sin precio proporcionado
    "Whisky Johnnie Walker Black": 0 // Sin precio proporcionado
};

let ventas = JSON.parse(localStorage.getItem('ventas')) || {};
let mesaSeleccionada = null;

// Cargar mesas al iniciar
window.onload = function () {
    cargarMesas();
    cargarProductos();
};

// Cargar mesas en el selector
function cargarMesas() {
    const selectorMesas = document.getElementById('seleccionar-mesa');
    for (let i = 1; i <= 15; i++) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = `Mesa ${i}`;
        selectorMesas.appendChild(opcion);
    }
    
    // Evento de cambio de mesa
    selectorMesas.addEventListener('change', (e) => {
        mesaSeleccionada = e.target.value;
        document.getElementById('mesa-seleccionada').textContent = mesaSeleccionada;
        calcularTotal();
    });
}

// Cargar productos en la lista
function cargarProductos() {
    const listaProductos = document.getElementById('lista-productos');
    for (let [producto, precio] of Object.entries(productosMenu)) {
        const divProducto = document.createElement('div');
        divProducto.classList.add('producto');
        divProducto.textContent = `${producto} (C$${precio})`;
        divProducto.onclick = () => agregarProducto(producto, precio);
        listaProductos.appendChild(divProducto);
    }
}

// Agregar producto a la venta de la mesa
function agregarProducto(producto, precio) {
    if (!mesaSeleccionada) {
        alert('Selecciona una mesa primero.');
        return;
    }
    
    if (!ventas[mesaSeleccionada]) {
        ventas[mesaSeleccionada] = [];
    }
    
    ventas[mesaSeleccionada].push({ producto, precio });
    calcularTotal();
}

// Calcular el total de la mesa seleccionada
function calcularTotal() {
    const productosMesa = ventas[mesaSeleccionada] || [];
    const total = productosMesa.reduce((acc, item) => acc + item.precio, 0);
    document.getElementById('total').textContent = total;
}

// Guardar la venta en LocalStorage
function guardarVenta() {
    if (!mesaSeleccionada) {
        alert('Selecciona una mesa antes de guardar.');
        return;
    }
    
    localStorage.setItem('ventas', JSON.stringify(ventas));
    alert('Venta guardada.');
}