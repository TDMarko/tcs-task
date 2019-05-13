// core
import React from 'react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';

// components
import { Wrapper, Title, Temperature, Cloud, Table, Column, Error } from './Styled';

interface IForecast {
    city?: string;
    // TODO: type any is a hack, usually all props should be specified
    data?: any;
}

// TODO: we can create a mapping for all icons, but not needed now
const getIcon = (icon: string) => {
    switch (icon) {
        case 'Clear':
            return '🔆';

        case 'Clouds':
            return '☁️';

        case 'Rain':
            return '🌧';

        default:
            return '🤷‍♂️';
    }
}

const Forecast = (props: IForecast) => {
    const { main, wind, weather, sys } = props.data;

    return (
        <Wrapper>
            {/* This should be done in map, seems like we can have miltiple cities */}
            {!isEmpty(props.data) && !props.data.error ? (
                <React.Fragment>
                    <Title>
                        {/* TODO: this is potencially unstable interface, if we have data but no weather - we will have error */}
                        <Cloud>{weather[0].main} <span role="img" aria-label="">{getIcon(weather[0].main)}</span></Cloud>
                        <Temperature>{Math.round(main.temp)}°C</Temperature>
                    </Title>
                    <Table>
                        <tbody>
                            <tr>
                                <Column style={{ width: "100px" }}>Wind</Column>
                                <Column>{wind.speed} m/s</Column>
                            </tr>
                            <tr>
                                <Column>Cloudiness</Column>
                                <Column>{weather[0].description}</Column>
                            </tr>
                            <tr>
                                <Column>Pressure</Column>
                                <Column>{main.pressure} hpa</Column>
                            </tr>
                            <tr>
                                <Column>Humidity</Column>
                                <Column>{main.humidity} %</Column>
                            </tr>
                            <tr>
                                <Column>Sunrise</Column>
                                <Column>
                                    { /* TODO: make helper function for this */ }
                                    {new Date(sys.sunrise * 1000).getHours()}h {new Date(sys.sunrise * 1000).getMinutes()}m
                                </Column>
                            </tr>
                            <tr>
                                <Column>Sunset</Column>
                                <Column>
                                    { /* TODO: make helper function for this */ }
                                    {new Date(sys.sunset * 1000).getHours()}h {new Date(sys.sunset * 1000).getMinutes()}m
                                </Column>
                            </tr>
                        </tbody>
                    </Table>
                </React.Fragment>
            ) : <Error>Loading...</Error>}
        </Wrapper>
    )
};

const mapStateToProps = (state: any) => {
    return {
        ...state
    }
}

export default connect(mapStateToProps)(Forecast);