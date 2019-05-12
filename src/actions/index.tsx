export const GET_FORECAST = 'GET_FORECAST';

export const getForecast = (data: any) => ({
    type: GET_FORECAST,
    payload: data
});