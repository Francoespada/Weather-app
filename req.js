const key = '290e1bd931383ad50218856eae711c56';

const requestCity = async (city) =>{
    const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
    const query = `?q=${city}&appid=${key}`;
    const response = await fetch(baseURL + query);
    const data = await response.json();
    return data;
}

