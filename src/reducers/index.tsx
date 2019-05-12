import {
    GET_FORECAST
} from '../actions';

const initialState = {
    data: {}
}

export const forecastReducer = (state = initialState, action: any) => {
    console.log(action.payload)
    switch (action.type) {
        case GET_FORECAST:
            return {
                ...state,
                data: action.payload
            }
        default:
            return state
    }
}
