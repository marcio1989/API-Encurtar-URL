import React from 'react';
import Routes from './routes';
import GlobalStyle from './styles/global';
import { StylesProvider } from '@material-ui/core/styles';
import { AuthProvider } from './context/authContext';
function App() {
  return (
    <>
      <GlobalStyle />
      <StylesProvider injectFirst>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </StylesProvider>
    </>
  );
}

export default App;
