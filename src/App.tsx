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
    const [data, updateData] = useState({});
    const [loading, updateLoading] = useState(false);
    let timeout: any;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        updateLoading(true);
        clearTimeout(timeout);

        // TODO: some timeout bug here, still sending unwanted requests
        timeout = setTimeout(async () => {
            try {
                const result = await axios.get(
                    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3bd9a65beb67d52b8250ce5ee16d364d&units=metric`);

                updateLoading(false);
                updateData(result.data);
                store.dispatch(getForecast(result.data));
            } catch (error) {
                updateData({ error: true });
            }
        }, 2000);
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
                    <Forecast city={city} loading={loading} />
                </Wrapper>
            </div>
        </Provider>
    );
}

export default App;
