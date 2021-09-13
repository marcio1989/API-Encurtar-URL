import React, { useCallback, useMemo, useRef, useState } from 'react';
import useShortUrl from '../../hooks/useShortUrl';
import Header from '../../Components/Header';
import Container from '../../Components/Container';
import Loader from '../../Components/Loader';
import Snackbar from '@material-ui/core/Snackbar';
import Card from '../../Components/Card';
import { Form, InputWraper, Button, ButtonSM } from './styles';
import { useAuthContext } from '../../context/authContext';
const Home: React.FC = () => {

  const { isSinged, handleSetOpenLoginDialog } = useAuthContext();
  const { url, errUrl, isLoadingResponse, clearUrl, getUrl } = useShortUrl();
  const urlInput = useRef<any>(null);
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!isSinged){
      handleSetOpenLoginDialog(true);
      return;
    }
    getUrl(originalUrl);
  }, [originalUrl, isSinged, getUrl, handleSetOpenLoginDialog]);

  const copyToClipboard = useCallback(() => {
    urlInput.current?.select();
    document.execCommand('copy');
    urlInput.current?.setSelectionRange(0, 0);
    setOpen(true);
  }, []);

  const handleClose = useCallback((event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }, []);

  const isCanSedingRequest = useMemo<boolean>(() =>
    !!originalUrl && !isLoadingResponse,
    [originalUrl, isLoadingResponse])

  return (
    <>
      <Header />
      <Container>
        <Card>
          {
            !url ?
              <>
                <h2>Encurtador de URL</h2>
                <Form onSubmit={e => isCanSedingRequest && handleSubmit(e)}>
                  <InputWraper
                    isFocused
                  >
                    <input
                      type="text"
                      value={originalUrl}
                      onChange={e => setOriginalUrl(e.target.value)} //input para colar URL original
                      placeholder={'Cole o link aqui'}
                    />
                    <Button 
                      type='submit'
                      disabled={!isCanSedingRequest} //botão para encurtar URL
                    >
                      {isLoadingResponse ?
                        <Loader />
                        :
                        'Encurtar URL'
                      }
                    </Button>
                  </InputWraper>
                  <span className='err footer'>
                    <p>{errUrl}</p>
                  </span>
                </Form>
              </>
              :
              <>
                <h2>URL encurtada com sucesso!</h2>
                <Form onSubmit={e => e.preventDefault()}> 
                  <InputWraper>
                    <input
                      ref={urlInput}
                      type="text"
                      value={url}
                      readOnly
                    />
                    <Button
                      type='button'
                      onClick={copyToClipboard}>
                      Copiar URL
                    </Button>

                  </InputWraper>
                  <span className='footer'>

                    <ButtonSM //botao para encurtar outra URL
                      type='button'
                      onClick={() => {
                        clearUrl();
                        setOriginalUrl(''); //clicando para voltar por inicio
                      }}
                    >
                      ← Encurtar outra URL
                    </ButtonSM>
                  </span>
                </Form>
              </>
          }

        </Card>
      </Container>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="URL copiada!"
      />
    </>
  );
};

export default Home;
