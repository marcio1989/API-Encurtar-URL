import styled from 'styled-components';
import colors from '../../styles/colors';
import vars from '../../styles/vars';

//ajustando o bady da aplicação
export const Main = styled.div`
    height: calc(100vh - ${vars.HeightHeader}px);
    background: ${colors.primary2};
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 0 20px;
`;

