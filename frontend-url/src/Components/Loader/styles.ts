import styled from 'styled-components';
import CircularProgressUI from '@material-ui/core/CircularProgress';

export interface ILoaderProps {
    colorloader?: string;
    size?: number;
}
export const CircularProgress = styled(CircularProgressUI) <ILoaderProps>`
    &.MuiCircularProgress-colorPrimary{
        color: ${props => props.colorloader};
    }
`;
