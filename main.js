const form = document.getElementById('form');
const cityInput = document.getElementById('inp');
const cardContainer = document.querySelector('.cards-main');


// guardamos array de las ciudades
let cities = JSON.parse(localStorage.getItem('cities')) || [];

// funcion para guardar en LS
const saveLocalStorage = citiesList => {
    localStorage.setItem('cities', JSON.stringify(citiesList));
}

// funcion para convertir Kelvin a Celsius

const convertCelsius = kelvin => {
    let celsius = Math.round(kelvin - 273.15);
    return celsius;
};

// funcion para renderizar HTML
const renderCity = city => {
    const imgName = city.weather[0].icon
    return `

        <div class="card-clima animate">

            <div class="clima-info">
                <h2 class="info-title">${city.name}</h2>
                <p class="info-subtitle">${city.weather[0].description}</p>
                <div class="info-temp">
                    <span class="temp">
                        ${convertCelsius(city.main.temp)}°
                    </span>
                    <span class="st">
                        ${convertCelsius(city.main.feels_like)}ST
                    </span>

                </div>
            </div>

            <div class"img-clima-cont">
                <img src="./assets/img/${imgName}.png" alt="" class="img-clima">
            </div>

            <div>
            <img src="./assets/img/cerrar.png" alt="" class="close" data-id="${city.id}">
            </div>

        </div>

    `
}

// funcion para la logica de renderizar
const renderCitiesList = citiesList => {
    cardContainer.innerHTML = citiesList.map(city => renderCity(city)).join('');
  };

// funcion para buscar ciudad
const searchCity = async e => {
    e.preventDefault();

    // capturamos valor del input
    const searchedCity = cityInput.value.trim();
    
    if(searchedCity === ''){
        alert('Por favor ingrese una ciudad');
        return;
    }

    //vamos a pasarle el valor del input a la funcion requestCity
    const fetchedCity = await requestCity(searchedCity);

    //alerta por si no existe ninguna ciudad con ese id
    if(!fetchedCity.id){
        alert('La ciudad ingresada no existe');
        form.reset();
        return;
        // si existe la ciudad buscada en el ls que no la vuelva a imprimir
    } else if(cities.some(city => city.id === fetchedCity.id)){
        alert('Ya estamos mostrando el clima de esa ciudad');
        form.reset();
        return;
    }


    cities = [fetchedCity, ... cities];
    renderCitiesList(cities);
    saveLocalStorage(cities);
    form.reset();
};

// funcion para eliminar tarjetas
const removeCity = e => {
    if(!e.target.classList.contains('close'))return;
    const filterId = Number(e.target.dataset.id);
    if(window.confirm('¿Estas seguro de borrar esta ciudad?')){
        cities = cities.filter(city => city.id !== filterId);
        renderCitiesList(cities);
        saveLocalStorage(cities);
    }
}
    



// funcion gral para llamar todo
const init = () => {
    renderCitiesList(cities);
    form.addEventListener('submit', searchCity);
    cardContainer.addEventListener('click', removeCity);
};
init();