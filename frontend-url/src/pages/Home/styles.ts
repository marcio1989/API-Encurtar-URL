import styled, { css } from 'styled-components';
import colors from '../../styles/colors';
import ButtonMaterial from '@material-ui/core/Button';

//estilo para o box do formulário
export const Form = styled.form`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 32px;
    flex-direction: column;
    .footer{
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 16px;
    }
    .err{
        color: ${colors.red};
        font-weight: bold;
    }
`;
interface IInputWraperProps {
    isFocused?: boolean;
}
//estilo do inputa "cole aqui"
export const InputWraper = styled.div<IInputWraperProps>`
    display: flex;
    height: 60px;
    width: 100%;
    justify-content: center;

    input[type=text]{
        max-width: 480px;
        width: 100%;
        font-size: 18px;
        padding: 10px 16px;
        border-top-left-radius: 4px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        border-bottom-left-radius: 4px;
        border: 1px solid ${colors.grey};
        outline: none;
        ${({ isFocused }) => isFocused && css`
            &:focus{
                outline-color: ${colors.grey};
                outline-width: 1px;
            }
        `}
    }
`;
//estilo para o botao "encurtar url"
export const Button = styled(ButtonMaterial)`
    &.MuiButtonBase-root {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 120px;
        background: ${colors.red};
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
        font-size: 16px;
        color: ${colors.primary1};
        border-top-left-radius: 0px;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 0px;
    }
`
//estilo do botão "encurtar outra url"
export const ButtonSM = styled(ButtonMaterial)`
    &.MuiButtonBase-root {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 180px;
        background: ${colors.blue};
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
        font-size: 12px;
        color: ${colors.primary1};
    }
`

