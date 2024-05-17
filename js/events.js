const loadMoreButton = document.getElementById('loadMoreButton');
const orderByDate = document.getElementById('orderByDate');
const sortOrderAsc = document.getElementById('orderByNameAsc');
const sortOrderDesc = document.getElementById('orderByNameDesc');

// Inicialización mapa
let map = L.map('map').setView([39.616667, 2.983333],9)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Función que recibe una URL y devuelve la respuesta del fetch con los eventos de esa URL.
const fetchEvents = (url) => {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data)) {
                // Si el JSON es un array directo de eventos
                return data;
            } else if (data.itemListElement) {
                // Si el JSON tiene la propiedad itemListElement
                return data.itemListElement;
            } else {
                // Si no es ninguno de los anteriores, devuelve un array vacío
                return [];
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            return [];
        });
};

// Espera a que ambas llamadas fetch se completen.
Promise.all([
    fetchEvents("../JSONs/eventos.json"),
    fetchEvents("https://www.firabalear.com/assets/json/fires.json")
])
.then(results => {
    results[1] = results[1].filter(result => result.location.address.addressRegion === "Mallorca");
    let events = [...results[0], ...results[1]]; // Combina los arrays de eventos en uno
    let eventsContainer = document.getElementById("eventsContainer");
    let showAllEvents = false; // Booleano que controla si si se ha pulsado el botón de cargar más

    // Función que obtiene las fechas de los eventos
    function getDate(string) {
        // Dividir la cadena en fecha y hora usando 'T' como separador
        let parts = string.split('T');

        // La parte 0 contendrá la fecha
        let date = parts[0];
    
        return date;
    }

    // Función que convierte el formato YYYY-MM-DD en DD-MM-YYYY
    function inverseDate(date) {
        // Dividir la cadena de fecha en partes usando el delimitador '-'
        let parts = date.split('-');

        // Obtener el año, mes y día
        let year = parts[0];
        let month = parts[1];
        let day = parts[2];

        // Concatenar las partes en el nuevo formato
        let newDate = day + '-' + month + '-' + year;

        return newDate;
    }

    // Generar IDs únicos para cada evento cuando se carga la página por primera vez
    let eventIdCounter = 0;
    events.forEach(event => {
        event.id = eventIdCounter++;
    });

    function renderEvents() {
        eventsContainer.innerHTML = ''; // Limpiar el contenedor antes de renderizar los eventos nuevamente

        let eventsToShow = showAllEvents ? events : events.slice(0, 4); // Determinar cuántos eventos mostrar

        eventsToShow.forEach(event => {
            let eventId = event.id;
            let startDate = inverseDate(getDate(event.startDate));
            let endDate = inverseDate(getDate(event.endDate));
            // Crear elementos HTML para la card
            let cardDiv = document.createElement("div");
            cardDiv.className = "col-lg-6 col-md-6 mb-4 pb-2";
            cardDiv.id = 'event-' + eventId; // Aquí se asigna el ID único
            cardDiv.innerHTML = `
                <div class="events-item">
                    <div class="events-img mx-auto">
                        <img class="rounded-circle img-fluid bg-light p-3" src="${event.image}" style="object-fit: cover; width: 100%; height: 400px;">
                    </div>
                    <div class="position-relative text-center bg-light rounded p-4 pb-5" style="margin-top: -75px;">
                        <h5 class="font-weight-semi-bold mt-5 mb-3 pt-5" style="text-decoration: underline;">${event.name}</h5>
                        <p>${event.description}</p>
                        <p><strong>Inicio:</strong> ${startDate}<br><strong>Fin:</strong> ${endDate}</p>
                        <a href="info.html?type=event&&id=${eventId}" class="border-bottom border-secondary text-decoration-none text-secondary">Descubre más</a>
                    </div>
                </div>
            `;
            // Agregar la card al contenedor
            eventsContainer.appendChild(cardDiv);
        });
    }

    function renderMap() {
        events.forEach((event, index) => {
            // Coordenadas de la ubicación del marcador
            let latitud = event.location.geo.latitude;
            let longitud = event.location.geo.longitude;
            let markerCoordinates = [latitud, longitud];
    
            // Crear el marcador con las coordenadas especificadas
            let marker = L.marker(markerCoordinates).addTo(map);
    
            // Mensaje emergente (popup) al marcador
            let popupContent = `<b>${event.name}</b>`;
            marker.bindPopup(popupContent);
    
            // Mostrar el popup al pasar el cursor sobre el marcador
            marker.on('mouseover', function () {
                marker.openPopup();
            });
    
            // Redirigir al hacer clic en el marcador
            marker.on('popupopen', function () {
                marker.on('click', function () {
                    window.location.href = `https://www.artesaniamallorca.com/info.html?type=event&id=${index}`;
                });
            });
        });
    }

    // Llamar a la función para renderizar los eventos cuando se carga la página
    renderEvents();

    // Llamar a la función para renderizar el mapa cuando se carga la página
    renderMap();

    // Agregar evento de clic al botón "Cargar más"
    loadMoreButton.addEventListener('click', function() {
        showAllEvents = true; // Marcar que se deben mostrar todos los eventos
        renderEvents(); // Volver a renderizar los eventos
        this.style.display = 'none'; // Ocultar el botón "Cargar más"
    });

    // Agregar evento de ordenar alfabéticamente en orden ascendente
    sortOrderAsc.addEventListener('click', function() {
        showAllEvents = true; // Marcar que se deben mostrar todos los eventos
        events.sort((a, b) => {
            return a.name.localeCompare(b.name); // Ordenar alfabéticamente por nombre ascendente
        });
        renderEvents(); // Volver a renderizar los eventos
        loadMoreButton.style.display = 'none'; // Ocultar el botón "Cargar más"
    });

    // Agregar evento de ordenar alfabéticamente en orden descendente
    sortOrderDesc.addEventListener('click', function() {
        showAllEvents = true; // Marcar que se deben mostrar todos los eventos
        events.sort((a, b) => {
            return b.name.localeCompare(a.name); // Ordenar alfabéticamente por nombre descendente
        });
        renderEvents(); // Volver a renderizar los eventos
        loadMoreButton.style.display = 'none'; // Ocultar el botón "Cargar más"
    });

    // Agregar evento de ordenar por fecha de inicio más cercana
    orderByDate.addEventListener('click', function() {
        showAllEvents = true; // Marcar que se deben mostrar todos los eventos
        events.sort((a, b) => {
            let startDateA = new Date(getDate(a.startDate));
            let startDateB = new Date(getDate(b.startDate));
            return startDateA - startDateB; // Ordenar por proximidad de fecha
        });
        renderEvents(); // Volver a renderizar los eventos
        loadMoreButton.style.display = 'none'; // Ocultar el botón "Cargar más"
    });
})
.catch(error => {
    console.error('Error fetching data:', error);
});