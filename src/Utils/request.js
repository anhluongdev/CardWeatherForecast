import axios from 'axios';

const request = axios.create({
    baseURL: 'http://dataservice.accuweather.com/',
});

export const getLocation = async (path, options = []) => {
    const response = await request.get(path, options);
    return response.data;
};

export const getWeather = async (path, locationId = '') => {
    const response = await request.get(path, locationId);
    return response.data;
};
