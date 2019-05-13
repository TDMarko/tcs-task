import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { forecastReducer } from './reducers';
import { getForecast } from './actions';

import { Wrapper } from './components/Wrapper';
import { Input } from './components/Input';
import Forecast from './components/Forecast';

const store = createStore(forecastReducer);

const App: React.FC = () => {
    const [city, updateCity] = useState('Riga');
    let timeout: any;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        clearTimeout(timeout);

        // TODO: some timeout bug here, still sending unwanted requests
        timeout = setTimeout(async () => {
            try {
                // TODO: of course, keeping link in such way with key ir wrong, but this is demo app, so...
                const result = await axios.get(
                    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3bd9a65beb67d52b8250ce5ee16d364d&units=metric`);

                store.dispatch(getForecast(result.data));
            } catch (error) {
                // TODO: should make propper error handling
                store.dispatch(getForecast({ error: true }));
            }
        }, 1000);
    }

    const changeCity = (city: string) => {
        updateCity(city);
        fetchData();
    }

    return (
        <Provider store={store}>
            <div className="App">
                <Wrapper>
                    <Input placeholder="Enter city..." value={city} onChange={(e) => changeCity(e.target.value)} autoFocus />
                    <Forecast city={city} />
                </Wrapper>
            </div>
        </Provider>
    );
}

export default App;
