// Cargar el archivo JSON de productos
fetch('../JSONs/productos.json')
.then(response => response.json())
.then(data => {
    let carousel = document.getElementById('productsCarousel');
    let products = data.itemListElement;
    let productsToShow = products.slice(0, 6); // Determinar cuántos productos mostrar

    // Generar los elementos del carrusel
    productsToShow.forEach(function(product, index) {
        let productItem = document.createElement('div');
        productItem.classList.add('product-item', 'd-flex', 'flex-column', 'align-items-center', 'text-center', 'bg-light', 'rounded', 'py-5', 'px-3');

        productItem.innerHTML = `
            <div class="bg-primary mt-n5 py-3" style="width: 90px;">
                <h5 class="font-weight-bold text-white mb-0">${product.offers.price}${product.offers.priceCurrency}</h5>
            </div>
            <div class="position-relative bg-primary mt-n3 mb-4" style="width: 150px; height: 150px;">
                <img class="position-absolute w-100 h-100" src="${product.image}" alt="${product.name}" style="object-fit: cover;">
            </div>
            <h5 class="font-weight-bold mb-4">${product.name}</h5>
            <a href="info.html?type=product&&id=${index}" class="btn btn-sm btn-secondary">Detalles</a>
        `;

        carousel.appendChild(productItem);
    });

    // Inicializar el carrusel con Owl Carousel
    $(document).ready(function () {
        $('#productsCarousel').owlCarousel({
            autoplay: false,
            smartSpeed: 1500,
            margin: 30,
            dots: false,
            loop: true,
            nav: true,
            navText: [
                '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            ],
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 4
                }
            }
        });
    });
})
.catch(error => console.error('Error cargando productos:', error));

// Cargar el archivo JSON de artesanos
fetch('../JSONs/artesanos.json')
.then(response => response.json())
.then(data => {
    let carousel = document.getElementById('artisansCarousel');
    let artisans = data.itemListElement;
    let artisansToShow = artisans.slice(0, 4); // Determinar cuántos artesanos mostrar

    // Generar los elementos del carrusel
    artisansToShow.forEach(function(artisan, index) {
        let artisansItem = document.createElement('div');
        artisansItem.classList.add('team-item');

        artisansItem.innerHTML = `
            <div class="team-img mx-auto">
                <img class="rounded-circle w-100 h-100" src="${artisan.image}" alt="${artisan.name}" style="object-fit: cover;">
            </div>
            <div class="position-relative text-center bg-light rounded px-4 py-5" style="margin-top: -100px; height: 55vh;">
                <h3 class="font-weight-bold mt-5 mb-3 pt-5">${artisan.name}</h3>
                <h6 class="text-uppercase text-muted mb-4">${artisan.jobTitle}</h6>
                <br><a href="info.html?type=artisan&&id=${index}" class="btn btn-sm btn-secondary">Detalles</a>
        </div>
        `;
        carousel.appendChild(artisansItem);
    });

    // Inicializar el carrusel con Owl Carousel
    $(document).ready(function () {
        $(".team-carousel").owlCarousel({
            autoplay: false,
            smartSpeed: 1500,
            margin: 30,
            dots: false,
            loop: true,
            nav : true,
            navText : [
                '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            ],
            responsive: {
                0:{
                    items:1
                },
                576:{
                    items:1
                },
                768:{
                    items:2
                },
                992:{
                    items:3
                }
            }
        });
    })
})
.catch(error => console.error('Error cargando artesanos:', error));

// Cargar el archivo JSON de eventos
fetch('../JSONs/eventos.json')
.then(response => response.json())
.then(data => {
    let carousel = document.getElementById('eventsCarousel');
    let events = data.itemListElement;
    let eventsToShow = events.slice(0, 5); // Determinar cuántos eventos mostrar

    // Generar los elementos del carrusel
    eventsToShow.forEach(function(event, index) {
        let eventsItem = document.createElement('div');
        eventsItem.classList.add('events-item');

        eventsItem.innerHTML = `
            <div class="events-img mx-auto" style="height: 40vh;">
                <img class="rounded-circle w-100 h-100 bg-light p-3" src="${event.image}" alt="${event.name}" style="object-fit: cover;">
            </div>
            <div class="position-relative text-center bg-light rounded p-4" style="margin-top: -20px; height: 40vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <h5 class="font-weight-semi-bold mt-3 mb-4">${event.name}</h5>
                <h6 class="text-uppercase text-muted mb-4">${event.location.address.addressRegion}</h6>
                <h6>${event.location.address.addressLocality}</h6>
                <p>${event.location.address.streetAddress}</p>
                <a href="info.html?type=event&&id=${index}" class="border-bottom border-secondary text-decoration-none text-secondary bottom-0">Descubre más</a>
            </div>
        `;
        carousel.appendChild(eventsItem);
    });

    // Inicializar el carrusel con Owl Carousel
    $(document).ready(function () {
        $(".events-carousel").owlCarousel({
            autoplay: false,
            smartSpeed: 1500,
            margin: 30,
            dots: false,
            loop: true,
            nav : true,
            navText : [
                '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            ],
            responsive: {
                0:{
                    items:1
                },
                576:{
                    items:2
                },
                768:{
                    items:3
                },
                992:{
                    items:4
                }
            }
        });
    })
})
.catch(error => console.error('Error cargando eventos:', error));