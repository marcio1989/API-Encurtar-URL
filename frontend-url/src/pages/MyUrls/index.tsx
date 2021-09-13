import React, { useEffect } from 'react';
import { Table } from './styles';
import Header from '../../Components/Header';
import Card from '../../Components/Card';
import Container from '../../Components/Container';
import useShortUrl from '../../hooks/useShortUrl';
import Loader from '../../Components/Loader';
import moment from 'moment';
import 'moment/locale/pt-br';
import colors from '../../styles/colors';
moment.locale('pt-br');
//tabela listando as URLS...
const MyUrls: React.FC = () => {
  const { getMyUrls, isLoadingResponse, urls } = useShortUrl();

  useEffect(() => {
    getMyUrls();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Card
          maxWidth={1200}
        >
          <h1>Listas das URL</h1>
          <Table>
            {isLoadingResponse ?
              <div className='load'>
                <Loader colorloader={colors.blue} />
              </div>
              :
              <>
                <div className='thead'>
                  <div className='tr original'>URL original</div>
                  <div className='tr code'>URL encurtada</div>
                  <div className='tr createdAt'>Data e hora de criação</div>
                </div>
                <div className='tbody'>
                  {
                    urls.map(url => (
                      <div key={url._id} className='tr'>
                        <div className='td original'>
                          <a href={url.original} target='_blank' title={url.original}><p>{url.original} </p></a>
                        </div>
                        <div className='td code'>
                          <a href={url.code} target='_blank' title={url.code}><p>{url.code}</p></a>
                        </div>
                        <div className='td createdAt'>
                          <p>{moment(url.createdAt).format('DD/MM/YYYY, HH:mm')}</p>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </>
            }
          </Table>
        </Card>
      </Container>
    </>
  );
};

export default MyUrls;
