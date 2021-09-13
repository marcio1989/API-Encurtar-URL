import styled from 'styled-components';

export const Table = styled.div`
    width:100%;
    margin-top: 32px;
    .thead{
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        .tr{
            font-size: 16px;
            font-weight: bold;
            padding: 12px 10px;
            font-family: 'Roboto', sans-serif;
        }
    }
    .tbody{
        display: flex;
        flex-wrap: wrap;
        .tr{
            width: 100%;
            display: flex;
            .td{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 16px;
                padding: 12px 10px;
                font-family: 'Roboto', sans-serif;
            }

        }
    }
    .code{
        flex: .3;
    }
    .original{
        flex: .5;
    }
    .createdAt{
        flex: .2;
    }
    .load{
        width: 100%;
        display: flex;
        justify-content: center;
    }
`;
