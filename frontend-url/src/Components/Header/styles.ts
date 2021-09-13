import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ButtonMaterial from '@material-ui/core/Button';
import colors from '../../styles/colors';
import vars from '../../styles/vars';

//ajustando o cabeçalho
export const Container = styled.header`
    padding: 0 60px;
    height: ${vars.HeightHeader}px;
    background: ${colors.red};
    display: flex;
    align-items: center;
    justify-content: space-between;

`;
//ajustando o nome do cabeçalho
export const Brand = styled(Link)`
    height: 100%;
    display: flex;
    align-items: center;
    text-decoration: none;
    h1{
        text-transform: uppercase;
        font-weight: bold;
        color: ${colors.primary1};
        margin-left: 4px;
    }
`;

//ajustando o butão do nome login
export const MenuUser = styled.div`
    display:flex;
    align-items: center;
    height: 100%;
    
    svg{
        margin-right:15px;
    }
    
    button{
        outline: none;
        border: none;
        background: transparent;
        font-size: 18px;
        color: ${colors.primary1};
        cursor: pointer;
    }
`;

export const Form = styled.form`
    max-width: 320px;
    display: flex;
    width: 100%;
    justify-content: center;
    flex-direction: column;
    label{
        font-weight: bold;
        font-size: 14px;
        font-family: 'Roboto', sans-serif;
    }
    input[type=text], input[type=password]{
        min-width: 320px;
        width: 100%;
        font-size: 14px;
        font-family: 'Roboto', sans-serif;
        padding: 10px 16px;
        border-radius: 4px;
        border: 1px solid ${colors.grey};
        outline: none;
        margin-bottom: 10px;
        &:focus{
            outline-color: ${colors.grey};
            outline-width: 1px;
        }
    }
    p{
        margin-top: 8px;
        font-size: 14px;
        color: ${colors.blue};
        font-weight: bold;
        cursor: pointer;
        text-align: right;
    }
    span.err{
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 5px;
        color: ${colors.red};
        font-size: 14px;
        font-weight: bold;
    }
`
//ajustando o butao de fazer registro e fechar
export const Button = styled(ButtonMaterial)`
    &.MuiButtonBase-root {
        display: flex;
        justify-content: center;
        align-items: center;
        /* width: 180px; */
        background: ${colors.red};
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
        font-size: 12px;
        color: ${colors.primary1};
    }
`


