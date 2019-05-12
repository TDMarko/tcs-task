import React from 'react';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';

interface IForecast {
    loading: boolean;
    city?: string;
    // TODO: type any is a hack, usually all props should be specified
    data?: any;
}

const Wrapper = styled.div`
    width: 400px;
`;

const Title = styled.div`
    margin: 40px 0;
    text-align: center;
    box-sizing: border-box;
    font-size: 24px;
    color: #ffffff;
`;

const Temperature = styled.div`
    font-size: 48px;
`;

const Cloud = styled.div`
    border-spacing: unset;
`;

const Table = styled.table`
    width: 400px;
    border-spacing: unset;
`;

const Column = styled.td`
    color: #ffffff;
    padding: 6px 0;
    border-bottom: 1px solid #ffffff;
`;

const Error = styled.div`
    color: #ffffff;
    text-align: center;
    padding: 20px 0;
`;

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
console.log(props)
    return (
        <Wrapper>
            {/* This should be done in map, seems like we can have miltiple cities */}
            {!isEmpty(props.data) && !props.data.error ? (
                <React.Fragment>
                    <Title>
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
                                    {new Date(sys.sunrise * 1000).getHours()}h {new Date(sys.sunrise * 1000).getMinutes()}m
                                </Column>
                            </tr>
                            <tr>
                                <Column>Sunset</Column>
                                <Column>
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