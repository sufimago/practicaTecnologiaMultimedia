document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    // Obtener el parámetro "type" de la URL
    const type = urlParams.get('type');
    // Obtener el parámetro "id" de la URL
    const id = parseInt(urlParams.get('id'));

    function getDate(string) {
        // Dividir la cadena en fecha y hora usando 'T' como separador
        let parts = string.split('T');

        // La parte 0 contendrá la fecha
        let date = parts[0];

        return date;
    }

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

    function getYouTubeVideoId(url) {
        const regExp = /^.*(youtu\.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    // Utilizar el tipo y el ID para cargar el contenido correspondiente
    if (type === 'product') {
        fetch('../JSONs/productos.json')
            .then(response => response.json())
            .then(data => {
                // Buscar el producto con el ID específico
                const producto = data.itemListElement[id];
                if (producto) {
                    // Obtención del contenedor de la página
                    const container = document.getElementById('content-info');
                    container.classList.add('row', 'rounded');
                    container.style = "background: rgba(255, 255, 255, 0.5);"

                    // Creación del contenedor de la imagen
                    const containerImage = document.createElement('div');
                    containerImage.classList.add('col-lg-6');

                    const containerImage2 = document.createElement('div');
                    containerImage2.classList.add('position-relative', 'h-100', 'overflow-hidden');

                    // Creación de la imagen
                    const productImage = document.createElement('img');
                    productImage.src = producto.image;
                    productImage.alt = producto.name;
                    productImage.classList.add('position-absolute', 'w-100', 'h-100');
                    productImage.style = "object-fit: cover;";

                    // Creación del contenedor de la información y sus respectivos contenedores hijos
                    const containerInfo = document.createElement('div');
                    containerInfo.classList.add('col-lg-6');

                    const productName = document.createElement('h2');
                    productName.textContent = producto.name;
                    productName.classList.add('font-weight-bold', 'text-center', 'mb-4', 'mt-4');

                    const productDescription = document.createElement('p');
                    productDescription.textContent = producto.description;
                    productDescription.classList.add('product-description', 'mb-4');

                    const containerBuy = document.createElement('div');
                    containerBuy.classList.add('row', 'justify-content-center', 'pb-4');

                    const containerPrice = document.createElement('div');
                    containerPrice.classList.add('col-lg-6');

                    const productPrice = document.createElement('h5');
                    productPrice.textContent = `${producto.offers.price}${producto.offers.priceCurrency}`;
                    productPrice.classList.add('font-weight-bold', 'text-center');

                    const containerStock = document.createElement('div');
                    containerStock.classList.add('col-lg-6');

                    const productStock = document.createElement('p');
                    productStock.classList.add('product-stock');
                    if (producto.offers.availability === "InStock") {
                        productStock.classList.add('text-success', 'text-center');
                        productStock.textContent = "Disponible";
                    } else {
                        productStock.classList.add('text-danger', 'text-center');
                        productStock.textContent = "No disponible";
                    }

                    const productLink = document.createElement('a');
                    productLink.href = producto.offers.url;
                    productLink.textContent = 'Ver producto';
                    productLink.classList.add('product-link', 'btn', 'btn-primary', 'py-3', 'px-5');

                    containerImage2.appendChild(productImage);
                    containerImage.appendChild(containerImage2);

                    containerInfo.appendChild(productName);
                    containerInfo.appendChild(productDescription);

                    containerPrice.appendChild(productPrice);
                    containerStock.appendChild(productStock);

                    containerBuy.appendChild(containerPrice);
                    containerBuy.appendChild(containerStock);
                    containerBuy.appendChild(productLink);

                    containerInfo.appendChild(containerBuy);

                    container.appendChild(containerImage);
                    container.appendChild(containerInfo);
                } else {
                    // Manejar el caso de que no se encuentre el producto con el ID específico
                    console.error('Producto no encontrado.');
                }
            })
            .catch(error => console.error('Error al cargar los productos:', error));
    } else if (type === 'artisan') {
        fetch('../JSONs/artesanos.json')
            .then(response => response.json())
            .then(data => {
                // Buscar el artesano con el ID específico
                const artesano = data.itemListElement[id];
                if (artesano) {
                    // Obtención del contenedor de la página
                    const container = document.getElementById('content-info');
                    container.classList.add('row', 'rounded');
                    container.style = "background: rgba(255, 255, 255, 0.5);"

                    // Creación del contenedor de la imagen
                    const containerImage = document.createElement('div');
                    containerImage.classList.add('col-lg-6');

                    const containerImage2 = document.createElement('div');
                    containerImage2.classList.add('position-relative', 'h-100', 'overflow-hidden');

                    // Creación de la imagen
                    const artisanImage = document.createElement('img');
                    artisanImage.src = artesano.image;
                    artisanImage.alt = artesano.name;
                    artisanImage.classList.add('position-absolute', 'w-100', 'h-100');
                    artisanImage.style = "object-fit: cover;";

                    // Creación del contenedor de la información
                    const containerInfo = document.createElement('div');
                    containerInfo.classList.add('col-lg-6');

                    const artisanName = document.createElement('h2');
                    artisanName.textContent = artesano.name;
                    artisanName.classList.add('font-weight-bold', 'text-center', 'mb-4', 'mt-4');

                    const job = document.createElement('h5');
                    job.classList.add('text-uppercase', 'text-muted', 'mb-3', 'text-center');
                    job.textContent = artesano.jobTitle;

                    const artisanDescription = document.createElement('p');
                    artisanDescription.textContent = artesano.description;
                    artisanDescription.classList.add('product-description', 'mb-3');

                    const address = document.createElement('h6');
                    address.classList.add('mb-3');
                    address.textContent = `Dirección: ${artesano.address.streetAddress}, ${artesano.address.addressLocality}`;

                    const contact = document.createElement('h6');
                    contact.classList.add('mb-3');
                    contact.textContent = `Contacto: ${artesano.email}`;

                    containerImage2.appendChild(artisanImage);
                    containerImage.appendChild(containerImage2);

                    containerInfo.appendChild(artisanName);
                    containerInfo.appendChild(job);
                    containerInfo.appendChild(artisanDescription);
                    containerInfo.appendChild(address);
                    containerInfo.appendChild(contact);

                    if (artesano.url === "No disponible") {
                    } else {
                        const buttonContainer = document.createElement('div');
                        buttonContainer.classList.add('d-flex', 'justify-content-center');

                        const artisanLink = document.createElement('a');
                        artisanLink.href = artesano.url;
                        artisanLink.textContent = 'Más información';
                        artisanLink.classList.add('product-link', 'btn', 'btn-primary', 'py-3', 'px-5', 'mb-3');

                        buttonContainer.appendChild(artisanLink);
                        containerInfo.appendChild(buttonContainer);
                    }

                    container.appendChild(containerImage);
                    container.appendChild(containerInfo);
                } else {
                    // Manejar el caso de que no se encuentre el artesano con el ID específico
                    console.error('Artesano no encontrado.');
                }
            })
            .catch(error => console.error('Error al cargar los artesanos:', error));
    } else if (type === 'event') {
        // Cargar eventos de ambos JSON
        Promise.all([
            fetchEvents("../JSONs/eventos.json"),
            fetchEvents("https://www.firabalear.com/assets/json/fires.json")
        ])
        .then(results => {
            let events = [...results[0], ...results[1]]; // Concatenar los arrays de eventos
            const evento = events[id];
            let videoUrl = evento.videoUrl;
            if (evento) {
                const containerMain = document.getElementById('content-info');
                containerMain.classList.add('row', 'justify-content-center');

                const container = document.createElement('div');
                container.classList.add('row', 'mb-5', 'rounded', 'col-lg-12');
                container.style = "background: rgba(255, 255, 255, 0.5);"

                const containerVideo = document.createElement('div');
                containerVideo.classList.add('col-lg-6', 'px-0');
                containerVideo.style = "min-height: 500px;";

                const containerVideo2 = document.createElement('div');
                containerVideo2.classList.add('position-relative', 'h-100');

                const eventVideo = document.createElement('img');
                eventVideo.src = evento.image;
                eventVideo.alt = evento.name;
                eventVideo.classList.add('position-absolute', 'w-100', 'h-100');
                eventVideo.style = "object-fit: cover;";

                containerVideo2.appendChild(eventVideo);

                if (videoUrl) {
                    const eventVideoButton = document.createElement('button');
                    eventVideoButton.type = "button";
                    eventVideoButton.classList.add('btn-play');
                    eventVideoButton.setAttribute('data-toggle', 'modal');
                    eventVideoButton.setAttribute('data-target', '#videoModal');

                    // Evento para el botón de reproducir video
                    eventVideoButton.addEventListener('click', function () {                
                        if (videoUrl && videoUrl.includes('youtube.com')) {
                            let videoId = getYouTubeVideoId(videoUrl);  // Utilizar la función para extraer el ID del video
                            if (videoId) {
                                let youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&showinfo=0`;
                                document.getElementById('video').src = youtubeEmbedUrl;
                                $('#videoModal').modal('show');
                            } else {
                                console.log('No se pudo obtener el ID del video de YouTube.');
                            }
                            // Agregar un evento al modal que se dispare cuando se cierre
                            $('#videoModal').on('hidden.bs.modal', function (e) {
                                // Detener la reproducción del video al cerrar el modal
                                $('#video').attr('src', ''); // Detiene la reproducción del video estableciendo el atributo 'src' en una cadena vacía
                            });
                        } else {
                            console.log('La URL del video no es válida o está indefinida.');
                        }
                    });

                    const spanElement = document.createElement('span');
                    eventVideoButton.appendChild(spanElement);

                    containerVideo2.appendChild(eventVideoButton);
                } 

                containerVideo.appendChild(containerVideo2);

                const containerInfo = document.createElement('div');
                containerInfo.classList.add('col-lg-6');

                const eventName = document.createElement('h2');
                eventName.textContent = evento.name;
                eventName.classList.add('section-title', 'position-relative', 'text-center', 'mt-5', 'mb-2');

                const eventDescription = document.createElement('p');
                eventDescription.textContent = evento.description;
                eventDescription.classList.add('product-description', 'mb-4');

                const containerBuy = document.createElement('div');
                containerBuy.classList.add('row', 'justify-content-center', 'pb-4');

                const eventPrice = document.createElement('h5');
                if (evento.offers.price === "Free") {
                    eventPrice.textContent = "Entrada gratuita";
                    eventPrice.classList.add('text-success', 'text-center');
                } else {
                    eventPrice.textContent = `Precio: ${evento.offers[0].price}€`
                    eventPrice.classList.add('font-weight-bold', 'text-center');
                }

                containerInfo.appendChild(eventName);
                containerInfo.appendChild(eventDescription);

                containerBuy.appendChild(eventPrice);

                containerInfo.appendChild(containerBuy);

                container.appendChild(containerVideo);
                container.appendChild(containerInfo);

                containerMain.appendChild(container);

                const container2 = document.createElement('div');
                container2.classList.add('row', 'rounded', 'col-lg-12');

                const containerMap = document.createElement('div');
                containerMap.classList.add('col-lg-6');
                containerMap.id = "map";
                containerMap.style = "border-radius: 20px;";

                const mapContainerTitle = document.createElement('h2');
                mapContainerTitle.classList.add('section-title', 'col-lg-12', 'position-relative', 'text-center', 'mb-5');
                mapContainerTitle.textContent = "Localización";

                containerMain.appendChild(mapContainerTitle);

                container2.appendChild(containerMap);

                const weatherApp = document.createElement('div');
                weatherApp.classList.add('weather', 'col-lg-6');
                weatherApp.style = "height: 500px;";

                const city = document.createElement('h2');
                city.classList.add('city');
                city.textContent = evento.location.address.addressLocality;

                const date = document.createElement('h5');
                date.classList.add('date');
                date.textContent = inverseDate(getDate(evento.startDate));

                weatherApp.appendChild(city);
                weatherApp.appendChild(date);

                const apiKey = "0d3fcda382a14595964144610242104";
                let latitud = evento.location.geo.latitude;
                let longitud = evento.location.geo.longitude;
                const fecha = getDate(evento.startDate);

                const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitud},${longitud}&dt=${fecha}&lang=es`;

                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        if (data.forecast.forecastday.length > 0) {
                            const weather = data.forecast.forecastday[0].day;

                            const temp = document.createElement('h1');
                            temp.classList.add('temp');
                            temp.textContent = `${weather.avgtemp_c}ºC`;

                            const flex = document.createElement('div');
                            flex.classList.add('flex');

                            const icon = document.createElement('img');
                            icon.classList.add('icon');
                            icon.src = weather.condition.icon;

                            const desc = document.createElement('div');
                            desc.classList.add('description');
                            desc.textContent = weather.condition.text;

                            flex.appendChild(icon);
                            flex.appendChild(desc);

                            const row2 = document.createElement('div');
                            row2.classList.add('row');
                            row2.id = "row2";

                            const uv = document.createElement('div');
                            uv.classList.add('uv', 'col-lg-6');
                            uv.textContent = `UV: ${weather.uv}`;

                            const probRain = document.createElement('div');
                            probRain.classList.add('probRain', 'col-lg-6');
                            probRain.textContent = `Prob. lluvia: ${weather.daily_will_it_rain}%`

                            row2.appendChild(uv);
                            row2.appendChild(probRain);

                            const row3 = document.createElement('div');
                            row3.classList.add('row');
                            row3.id = "row3";

                            const humidity = document.createElement('div');
                            humidity.classList.add('humidity', 'col-lg-6');
                            humidity.textContent = `Humedad: ${weather.avghumidity}%`;

                            const wind = document.createElement('div');
                            wind.classList.add('wind', 'col-lg-6');
                            wind.textContent = `Viento: ${weather.avgvis_km} km/h`;

                            row3.appendChild(humidity);
                            row3.appendChild(wind);

                            weatherApp.appendChild(temp);
                            weatherApp.appendChild(flex);
                            weatherApp.appendChild(row2);
                            weatherApp.appendChild(row3);

                        } else {
                            const noData = document.createElement('h3');
                            noData.classList.add('nodata');
                            noData.textContent = "No hay datos disponibles";
                            weatherApp.appendChild(noData);
                        }
                    })
                    .catch(error => {
                        console.error('Error al obtener los datos del tiempo:', error);
                    });

                    container2.appendChild(weatherApp);

                    containerMain.appendChild(container2);

                    let map = L.map('map').setView([latitud, longitud], 11)

                    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 19,
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    }).addTo(map);

                    let markerCoordinates = [latitud, longitud];
                    let marker = L.marker(markerCoordinates).addTo(map);

                    marker.bindPopup(`<b>${evento.name}</b>`).openPopup();

            } else {
                console.error('Evento no encontrado.');
            }
        })
        .catch(error => console.error('Error al cargar los eventos:', error));
    }
});