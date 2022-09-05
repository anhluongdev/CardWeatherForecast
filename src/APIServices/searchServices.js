import * as request from '~/Utils/request';

export const searchLocation = async (q) => {
    try {
        const res = await request.getLocation(
            'locations/v1/cities/autocomplete?apikey=fajpfdX0ca1OGeBMj2QLqXArDgIMmIlE',
            {
                params: {
                    q,
                },
            },
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};
