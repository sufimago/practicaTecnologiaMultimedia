const loadMoreButton = document.getElementById('loadMoreButton');
const sortOrderAsc = document.getElementById('orderByNameAsc');
const sortOrderDesc = document.getElementById('orderByNameDesc');
const sortPriceAsc = document.getElementById('orderByPriceAsc');
const sortPriceDesc = document.getElementById('orderByPriceDesc');

fetch("../JSONs/productos.json")
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        let products = data.itemListElement;
        let productsContainer = document.getElementById("productsContainer");
        let showAllProducts = false; 

        // Generar IDs únicos para cada evento cuando se carga la página por primera vez
        let productIdCounter = 0;
        products.forEach(product => {
            product.id = productIdCounter++;
        });

        function renderProducts() {
            productsContainer.innerHTML = ''; // Limpiar el contenedor antes de renderizar los productos nuevamente

            let productsToShow = showAllProducts ? products : products.slice(0, 6); // Determinar cuántos productos mostrar

            productsToShow.forEach(product => {
                let productId = product.id;
                let cardDiv = document.createElement("div");
                cardDiv.className = "col-lg-4 col-md-6 mb-4 pb-2";
                cardDiv.id = 'product-' + productId; 
                cardDiv.innerHTML = `
                    <div class="product-item d-flex flex-column align-items-center text-center bg-light rounded py-5 px-3">
                        <div class="bg-primary mt-n5 py-3" style="width: 80px;">
                            <h5 class="font-weight-bold text-white mb-0">${product.offers.price}€</h5>
                        </div>
                        <div class="position-relative bg-primary rounded-circle mt-n3 mb-4 p-3" style="width: 150px; height: 150px;">
                            <img class="rounded-circle w-100 h-100" src="${product.image}" alt="${product.name}" style="object-fit: cover;">
                        </div>
                        <h5 class="font-weight-bold mb-4">${product.name}</h5>
                        <a href="info.html?type=product&&id=${productId}" class="btn btn-sm btn-secondary">Detalles</a>
                    </div>
                `;
                productsContainer.appendChild(cardDiv); 
            });
        }

        // function sortProductsByPriceAsc() {
        //     products.sort((a, b) => parseFloat(a.offers.price) - parseFloat(b.offers.price));
        //     renderProducts();
        // }

        // function sortProductsByPriceDesc() {
        //     products.sort((a, b) => parseFloat(b.offers.price) - parseFloat(a.offers.price));
        //     renderProducts();
        // }        

        // Llamar a la función para renderizar los productos cuando se carga la página
        renderProducts(products.slice(0, 6));

        // Agregar un evento de clic al botón "Cargar más"
        loadMoreButton.addEventListener('click', function() {
            showAllProducts = true;
            renderProducts(products);
            this.style.display = 'none';
        });

        // Agregar eventos de clic a los botones de ordenamiento
        sortOrderAsc.addEventListener('click', function() {
            showAllProducts = true;
            products.sort((a, b) => {
                return a.name.localeCompare(b.name); // Ordenar alfabéticamente por nombre ascendente
            });
            renderProducts();
            loadMoreButton.style.display = 'none';
        });
        
        sortOrderDesc.addEventListener('click', function() {
            showAllProducts = true;
            products.sort((a, b) => {
                return b.name.localeCompare(a.name); // Ordenar alfabéticamente por nombre descendente
            });
            renderProducts();
            loadMoreButton.style.display = 'none';
        });

        sortPriceAsc.addEventListener('click', function() {
            showAllProducts = true;
            products.sort((a, b) => parseFloat(a.offers.price) - parseFloat(b.offers.price));
            renderProducts();
            loadMoreButton.style.display = 'none';
        });
        
        sortPriceDesc.addEventListener('click', function() {
            showAllProducts = true;
            products.sort((a, b) => parseFloat(b.offers.price) - parseFloat(a.offers.price));
            renderProducts();
            loadMoreButton.style.display = 'none';
        });

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });