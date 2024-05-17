const loadMoreButton = document.getElementById('loadMoreButton');
const filterByJobTitle = document.getElementById('filterByJobTitle');
const sortOrderAsc = document.getElementById('sortOrderAsc');
const sortOrderDesc = document.getElementById('sortOrderDesc');
let artisans = []; // La lista de artesanos se obtiene de tu JSON

fetch("../JSONs/artesanos.json")
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        artisans = data.itemListElement;
        const artisansContainer = document.getElementById("artisansContainer");
        let showAllArtisans = false;
        let sortBy = ''; // Variable para almacenar el criterio de ordenación
        let sortOrder = 'asc'; // Variable para almacenar el orden de la ordenación

        // Obtener todas las profesiones (jobTitle) únicas de los artesanos
        const jobTitles = [...new Set(artisans.map(artisan => artisan.jobTitle))];

        // Agregar las opciones al desplegable
        jobTitles.forEach(jobTitle => {
            const option = document.createElement('option');
            option.value = jobTitle;
            option.textContent = jobTitle;
            filterByJobTitle.appendChild(option);
        });

        // Función para renderizar los artesanos
        function renderArtisans() {
            artisansContainer.innerHTML = ''; 
            let artisansToShow = showAllArtisans ? artisans : artisans.slice(0, 6); 

            // Filtrar por tipo de artesanía si se selecciona
            if (filterByJobTitle.value !== 'all') {
                artisansToShow = artisansToShow.filter(artisan => artisan.jobTitle === filterByJobTitle.value);
            }

            // Ordenar los artesanos según el criterio y el orden
            if (sortBy) {
                artisansToShow.sort((a, b) => {
                    const comparison = a[sortBy].localeCompare(b[sortBy]);
                    return sortOrder === 'asc' ? comparison : -comparison;
                });
            }

            artisansToShow.forEach(function(artisan, index) {
                let cardDiv = document.createElement("div");
                cardDiv.className = "col-lg-4 col-md-6 mb-4 pb-2";
                cardDiv.id = 'artisan-' + index;
                cardDiv.innerHTML = `
                    <div class="team-item">
                        <div class="team-img mx-auto">
                            <img class="rounded-circle w-100 h-100" src="${artisan.image}" alt="${artisan.name}" style="object-fit: cover;">
                        </div>
                        <div class="position-relative text-center bg-light rounded px-4 py-5" style="margin-top: -100px;">
                            <h3 class="font-weight-bold mt-5 mb-3 pt-5">${artisan.name}</h3>
                            <h6 class="text-uppercase text-muted mb-4">${artisan.jobTitle}</h6>
                            <br><a href="info.html?type=artisan&&id=${index}" class="btn btn-sm btn-secondary">Detalles</a>
                        </div>
                    </div>
                `;
                artisansContainer.appendChild(cardDiv); 
            });
        }

        renderArtisans();

        loadMoreButton.addEventListener('click', function() {
            showAllArtisans = true;
            renderArtisans();
            this.style.display = 'none';
        });

        // Agregar funcionalidad de filtrado por tipo de artesanía
        filterByJobTitle.addEventListener('change', function() {
            showAllArtisans = true;
            renderArtisans();
            loadMoreButton.style.display = 'none';
        });

        // Añadir funcionalidad de orden ascendente y descendente
        sortOrderAsc.addEventListener('click', function() {
            showAllArtisans = true;
            sortBy = 'name';
            sortOrder = 'asc'; // Establecer el orden ascendente
            renderArtisans();
            loadMoreButton.style.display = 'none';
        });

        sortOrderDesc.addEventListener('click', function() {
            showAllArtisans = true;
            sortBy = 'name';
            sortOrder = 'desc'; // Establecer el orden descendente
            renderArtisans();
            loadMoreButton.style.display = 'none';
});
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });