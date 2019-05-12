import styled from 'styled-components';
import bg from '../../assets/bg-sunny.jpg';

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url(${bg}) no-repeat;
    background-size: cover;
`;
