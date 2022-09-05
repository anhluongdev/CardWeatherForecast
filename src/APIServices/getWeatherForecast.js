import * as request from '~/Utils/request';

export const showWeatherForecast = async (locationId) => {
    try {
        const res = await request.getWeather(
            `/forecasts/v1/daily/5day/${locationId}?apikey=fajpfdX0ca1OGeBMj2QLqXArDgIMmIlE`,
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};
