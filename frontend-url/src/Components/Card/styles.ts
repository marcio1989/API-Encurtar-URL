import styled from 'styled-components';
import colors from '../../styles/colors';

export interface ICardProps{
    maxWidth?: number
}
//ajustando a borda
export const Container = styled.div<ICardProps>`
    max-width: ${props=> props.maxWidth}px;
    width: 100%;
    background: ${colors.primary1};
    box-shadow: 0 1px 4px #ccc;
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
    margin-top: 80px;
    h1{
        text-align: center;
    }
`;
