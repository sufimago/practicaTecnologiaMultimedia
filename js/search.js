const searchContainer = document.querySelector('#searchbar');
const inputSearch = document.querySelector('#inputSearch');
const boxSuggestions = document.querySelector('.container-suggestions');
const searchButton = document.querySelector('#searchButton');
const searchLink = document.querySelector('a');

let suggestions = []; // Array para almacenar las sugerencias
let artisansSearch = [];
let productsSearch = [];
let eventsSearch = [];

// Función para cargar los archivos JSON y almacenar la información
async function loadSuggestions() {
    try {
        const responseArtisans = await fetch('../JSONs/artesanos.json');
        let dataArtisans = await responseArtisans.json();
        artisansSearch = dataArtisans.itemListElement;

        const responseProducts = await fetch('../JSONs/productos.json');
        let dataProducts = await responseProducts.json();
        productsSearch = dataProducts.itemListElement;

        const responseEvents = await fetch('../JSONs/eventos.json');
        let dataEvents = await responseEvents.json();

        const responseEvents2 = await fetch('https://www.firabalear.com/assets/json/fires.json');
        let dataEvents2 = await responseEvents2.json();

        dataEvents2 = dataEvents2.filter(result => result.location.address.addressRegion === "Mallorca");
        eventsSearch = [...dataEvents.itemListElement, ...dataEvents2];

        // Crear las sugerencias como objetos dentro de un array
        createSuggestions();

    } catch (error) {
        console.error('Error al cargar los archivos JSON:', error);
    }
}

// Llamar a la función para cargar las sugerencias cuando se carga la página
loadSuggestions();

// Función para crear el array de sugerencias
function createSuggestions() {
    // Creación de objetos de artesanos
    for (i = 0 ; i < artisansSearch.length ; i++) {
        let artisan = {
            name: artisansSearch[i].name,
            type: "artisan",
            index: i
        }

        // Agrega el objeto al array de sugerencias
        suggestions.push(artisan);
    }

    // Creación de objetos de productos
    for (i = 0 ; i < productsSearch.length ; i++) {
        let product = {
            name: productsSearch[i].name,
            type: "artisan",
            index: i
        }

        // Agrega el objeto al array de sugerencias
        suggestions.push(product);
    }

    // Creación de objetos de eventos
    for (i = 0 ; i < eventsSearch.length ; i++) {
        let event = {
            name: eventsSearch[i].name,
            type: "event",
            index: i
        }

        // Agrega el objeto al array de sugerencias
        suggestions.push(event);
    }
} 

// Función para mostrar sugerencias cuando el usuario va escribiendo
inputSearch.onkeyup = (e) => {
    let userData = e.target.value;
    let emptyArray = [];

    if (userData) {
        emptyArray = suggestions.filter(data => {
            return data.name.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });

        emptyArray = emptyArray.map(data => {
            return data = `<li>${data.name}</li>`;
        });

        if (emptyArray.length > 0) {
            searchContainer.classList.add('active');
            showSuggestions(emptyArray);

            let allList = boxSuggestions.querySelectorAll('li');

            allList.forEach(li => {
                li.onclick = function() {
                    select(this);
                }
            });
        } else {
            // Si no hay resultados, muestra un mensaje
            searchContainer.classList.remove('active');
            boxSuggestions.innerHTML = "<li>No hay resultados</li>";
            searchButton.disabled = true; // Deshabilita el botón de búsqueda
        }

    } else {
        searchContainer.classList.remove('active');
        clearSuggestions(); // Limpia las sugerencias cuando no hay entrada de usuario
        searchButton.disabled = true; // Deshabilita el botón de búsqueda cuando no hay entrada de usuario
    }

    // Verificar si el texto de búsqueda coincide con alguna sugerencia seleccionada
    if (userData) {
        let selectedIndex = suggestions.findIndex(suggestion => suggestion.name === userData);
        console.log(selectedIndex);
        if (selectedIndex === -1) {
            // Si el texto de búsqueda no coincide con ninguna sugerencia seleccionada, deshabilitar el botón de búsqueda
            // y borrar el link de búsqueda.
            searchButton.disabled = true;
            searchLink.href = '';
        }
    }
};

// Función para seleccionar una sugerencia
function select(element) {
    let selectUserData = element.textContent;
    inputSearch.value = selectUserData;

    // Busca el índice de la sugerencia seleccionada por nombre
    let selectedIndex = suggestions.findIndex(suggestion => suggestion.name === selectUserData);

    // Obtiene los campos necesarios para crear la url correspondiente al índice seleccionado
    let selectedType = suggestions[selectedIndex].type;

    let selectedId = suggestions[selectedIndex].index;

    searchLink.href =`https://www.artesaniamallorca.com/info.html?type=${selectedType}&id=${selectedId}`;

    searchButton.disabled = false; // Habilita el botón de búsqueda

    clearSuggestions();  // Limpia las sugerencias al seleccionar una sugerencia
}


// Función para mostrar las sugerencias en la lista
const showSuggestions = list => {
    let listData;

    if (!list.length) {
        userValue = inputSearch.value;
        listData = `<li>${userValue}</li>`
    } else {
        listData = list.join(' ');
    }
    boxSuggestions.innerHTML = listData;
}

// Función para limpiar la lista de sugerencias
function clearSuggestions() {
    boxSuggestions.innerHTML = ''; // Borra todas las sugerencias
}

// Evento clic en cualquier parte del documento
document.addEventListener('click', function(event) {
    const isClickInsideSearchContainer = searchContainer.contains(event.target);
    if (!isClickInsideSearchContainer) {
        clearSuggestions(); // Se borran las sugerencias si se hace clic fuera de la barra de búsqueda
    }
});

// Evento clic fuera del navegador
window.addEventListener('blur', function() {
    clearSuggestions(); // Se borran las sugerencias al hacer clic fuera del navegador
});

// Función para mostrar el popup de error
function showErrorPopup() {
    const errorPopup = document.getElementById("errorPopup");
    errorPopup.style.display = "block";
};

// Función para cerrar el popup de error
function closeErrorPopup() {
    const errorPopup = document.getElementById("errorPopup");
    errorPopup.style.display = "none";
};

searchButton.addEventListener('click', function(event) {
    clearSuggestions(); // Borrar la lista de sugerencias por motivos estéticos
    event.preventDefault(); // Evitar la acción predeterminada del botón (redirección)

    if (searchButton.disabled || inputSearch.value === '') {
        showErrorPopup(); // Mostrar el popup de error si el botón está deshabilitado
    } else {
        // Obtener la URL de redirección del enlace
        const redirectURL = searchLink.href;
        
        // Redirigir a la URL sin abrir una nueva pestaña
        window.location.href = redirectURL;
    }
});