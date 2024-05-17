// DECLARACIONES
const stars = document.querySelectorAll('.star');
const saveButton = document.getElementById('saveBtn');
const closeButton = document.getElementById('closeBtn');
const xbutton = document.getElementById('xbutton');
const nameInput = document.getElementById('autor');
const commentInput = document.getElementById('reseña');
const ratingInput = document.getElementById('puntuacion');
const errorName = document.getElementById('errorName');
const errorRating = document.getElementById('errorRating');
let lastClickedIndex = -1; // Inicialmente no se ha clicado ninguna estrella
// Lista estática de reseñas que se almacenará en local storage junto con las que se añadan
const reviews = [
    {
        "name": "Juan Pérez",
        "rating": 4,
        "description": "Una plataforma excelente para descubrir el talento local de Mallorca. Me encanta cómo destacan a los artesanos y muestran sus creaciones. ¡Una manera perfecta de apoyar la economía local y obtener piezas únicas!",
        "date": "23-03-2024"
    },
    {
        "name": "María García",
        "rating": 5,
        "description": "¡Qué maravilla descubrir este sitio web! Me encanta la artesanía mallorquina y aquí he encontrado una variedad increíble de productos únicos. ¡Definitivamente mi nueva fuente de inspiración y compras!",
        "date": "26-03-2024"
    },
    {
        "name": "Pedro Martínez",
        "rating": 5,
        "description": "Este sitio web es un tesoro escondido para aquellos que buscan algo más que productos comerciales. La artesanía mallorquina tiene una belleza y autenticidad únicas, y este sitio la presenta de manera excepcional. ¡Cada visita es una nueva aventura llena de descubrimientos fascinantes!",
        "date": "08-04-2024"
    },
    {
        "name": "Ana López",
        "rating": 5,
        "description": "Increíble encontrar un sitio web que reúna toda la belleza de la artesanía mallorquina en un solo lugar. Además de los productos, la sección de eventos es genial para estar al tanto de ferias y exposiciones. ¡Definitivamente lo recomendaré a mis amigos y familiares!",
        "date": "13-04-2024"
    },
    {
        "name": "Carlos Rodríguez",
        "rating": 4,
        "description": "Como turista que visita Mallorca regularmente, este sitio web es mi nuevo compañero de viaje. Me encanta explorar las creaciones locales antes de mi viaje y luego buscar los talleres y eventos una vez que llego a la isla. ¡Una forma perfecta de sumergirse en la cultura mallorquina desde casa y durante las vacaciones!",
        "date": "21-04-2024"
    }
]

// GESTIÓN DEL RENDERIZADO DE LAS RESEÑAS POR PRIMERA VEZ
// Guardar los datos en LocalStorage
localStorage.setItem('reviewsData', JSON.stringify(reviews));

// Renderizar las reseñas
renderReviews(reviews);

// Función para dibujar las estrellas según la puntuación
function drawStars(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHtml += '<i class="bi bi-star-fill star checked"></i>'; // Añadir estrella llena
        } else {
            starsHtml += '<i class="bi bi-star-fill star"></i>'; // Añadir estrella vacía
        }
    }
    return starsHtml;
}

// Función para dibujar las reseñas
function renderReviews(reviews) {
    const content = document.getElementById('reviewsContainer');
    content.innerHTML = '';

    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('container-review');

        const headerReview = document.createElement('div');
        headerReview.classList.add('header-review');

        const userNameReview = document.createElement('div');
        userNameReview.classList.add('name-review-date');

        const name = document.createElement('p');
        name.classList.add('name-review');
        name.textContent = review.name;

        const date = document.createElement('span');
        date.classList.add('date-review', 'text-center');
        date.textContent = review.date;

        userNameReview.appendChild(name);
        userNameReview.appendChild(date);

        const starsHtml = drawStars(review.rating);
        const starsContainer = document.createElement('div');
        starsContainer.classList.add('stars-container');
        starsContainer.innerHTML = starsHtml; // Convertir la cadena HTML en nodos DOM

        headerReview.appendChild(userNameReview);
        headerReview.appendChild(starsContainer);

        const desc = document.createElement('p');
        desc.classList.add('description-review');
        desc.textContent = review.description;

        reviewElement.appendChild(headerReview);
        reviewElement.appendChild(desc);

        // Agregar el elemento al contenedor de contenido
        content.appendChild(reviewElement);
    });
}

// GESTIÓN DE LOS EVENTOS RELACIONADOS CON AÑADIR UNA RESEÑA
// GESTIÓN DEL DIBUJO DE LAS ESTRELLAS
stars.forEach(function(star, index) {
    // Agregar evento de pintar y despintar estrellas según sean clicadas
    star.addEventListener('click', function() {
        if (stars[index].classList.contains('checked')) {
            // Si la estrella clicada es la misma que la última clicada, desmarca todas las estrellas
            if (index === lastClickedIndex){
                stars.forEach(function(star) {
                    star.classList.remove('checked');
                });
                lastClickedIndex = -1; // Reinicia el índice de la última estrella clicada

            } else {
                // Si la estrella clicada ya está seleccionada, desmarcar todas las estrellas desde esa estrella hasta el final
                for (let i = index + 1; i < stars.length; i++) {
                    stars[i].classList.remove('checked');
                }
                lastClickedIndex = index; // Actualiza el índice de la última estrella clicada
        }
        } else {
            // Si la estrella clicada no está seleccionada, píntala de dorado y las anteriores también
            for (let i = 0 ; i <= index ; i++) {
                stars[i].classList.add('checked');
            }
            // Despinta las estrellas siguientes
            for (let i = index + 1 ; i < stars.length ; i++) {
                stars[i].classList.remove('checked');
            }
            lastClickedIndex = index; // Actualiza el índice de la última estrella clicada
        }
        ratingInput.value = lastClickedIndex + 1; // Actualiza el valor del input oculto de puntuación
    });

    // Agregar evento de mouseenter
    star.addEventListener('mouseenter', function() {
        if (lastClickedIndex === -1) { // Solo pintar si no se ha hecho clic previamente en una estrella
            // Pintar todas las estrellas hasta la que está siendo apuntada
            for (let i = 0 ; i <= index ; i++) {
                stars[i].classList.add('hovered');
            }
        }
    });

    // Agregar evento de mouseleave
    star.addEventListener('mouseleave', function() {
        // Remover la clase de hover de todas las estrellas
        stars.forEach(function(star) {
            star.classList.remove('hovered');
        });
    });
});

saveButton.addEventListener('mouseenter', function() {
    if (nameInput.value.trim() === "") {
        saveButton.disabled = true;
        errorName.textContent = "Introduce un nombre (Puede ser Anónimo).";
    } else {
        saveButton.disabled = false;
        errorName.textContent = "";
    }
    if (ratingInput.value.trim() <= 0) {
        saveButton.disabled = true;
        errorRating.textContent = "Introduce una puntuación de como mínimo 1 estrella."
    } else {
        saveButton.disabled = false;
        errorRating.textContent = "";
    }
});

// GESTIÓN DEL GUARDADO DE LA NUEVA RESEÑA EN LOCAL STORAGE
saveButton.addEventListener('click', function() {
    // Valores obtenidos de los campos
    let name = nameInput.value.trim();
    let comment = commentInput.value.trim();
    let rating = ratingInput.value.trim();
    let date = new Date;
    let formattedDate = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear();

    // Creación del objeto a guardar en el fichero json
    const newReview = {
        name: name,
        rating: parseInt(rating),
        description: comment,
        date: formattedDate
    }

    // Cerrar el modal
    $('#newReviewModal').modal('hide');

    // Agregar la nueva reseña a las existentes
    addReview(newReview);

    // Limpiar los campos al cerrar el modal
    emptyValues();
});

// Función para agregar una nueva reseña
function addReview(newReview) {
    // Obtener las reseñas desde LocalStorage
    var reviewsData = JSON.parse(localStorage.getItem("reviewsData")) || [];
    
    // Agregar la nueva reseña a la lista
    reviewsData.push(newReview);
    
    // Guardar las reseñas actualizadas en LocalStorage
    localStorage.setItem("reviewsData", JSON.stringify(reviewsData));
    
    // Renderizar las reseñas actualizadas en la página
    renderReviews(JSON.parse(localStorage.getItem("reviewsData")));
}

// Función que vacía los campos del modal
function emptyValues() {
    nameInput.value = '';
    commentInput.value = '';
    ratingInput.value = '';
    stars.forEach(function(star) {
        star.classList.remove('checked');
    });
    errorName.textContent = "";
    errorRating.textContent = "";
}

// Event listener para el botón de cerrar del modal
closeButton.addEventListener('click', function() {
    // Limpiar los campos al cerrar el modal
    emptyValues();
});

// Event listener para el botón de la x para cerrar del modal
xbutton.addEventListener('click', function() {
    // Limpiar los campos al cerrar el modal
    emptyValues();
});

