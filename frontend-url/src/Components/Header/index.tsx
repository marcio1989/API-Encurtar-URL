import React, { useCallback, useEffect, useState } from 'react';
import {  useHistory } from 'react-router-dom';
import { Container, MenuUser, Form, Button } from './styles';
import { Brand } from './styles';
import { AiOutlineLink } from 'react-icons/ai';
import colors from '../../styles/colors';
import { ENUM_ROUTES } from '../../routes/index';
import { FaUserAlt, FaBars } from 'react-icons/fa';
import { useAuthContext } from '../../context/authContext';
import {
  Menu,
  MenuItem,
  Hidden,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import Loader from '../Loader';

const Header: React.FC = () => {
  const history = useHistory();
  const {
    isSinged,
    user,
    isLoadResponse,
    loginErr,
    registerErr,
    openLoginDialog,
    openRegisterDialog,
    singIn,
    singUp,
    singOut,
    handleSetOpenLoginDialog,
    handleSetOpenRegisterDialog
  } = useAuthContext();
  const [nickLoginInputText, setNickLoginInputText] = useState<string>('');
  const [passwordLogin, setPasswordLogin] = useState<string>('');

  const [nickRegisterInputText, setNickRegisterInputText] = useState<string>('');
  const [passwordRegister, setPasswordRegister] = useState<string>('');
  const [confirmPasswordRegister, setConfirmPasswordRegister] = useState<string>('');

  const [anchorEl, setAnchorEl] = useState<any>(null);


  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleOpenLoginDialog = useCallback(() => {
    setAnchorEl(null);
    handleSetOpenLoginDialog(true);
  }, []);

  const handleOpenRegisterDialog = useCallback(() => {
    setAnchorEl(null);
    handleSetOpenRegisterDialog(true);
  }, []);

  const handleCloseLoginDialog = useCallback(() => {
    handleSetOpenLoginDialog(false);
  }, []);

  const handleCloseRegisterDialog = useCallback(() => {
    handleSetOpenRegisterDialog(false);
  }, []);

  const handleLogin = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    singIn({
      nick: nickLoginInputText,
      password: passwordLogin
    })
  }, [singIn, nickLoginInputText, passwordLogin]);

  const handleRegister = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    singUp({
      nick: nickRegisterInputText,
      password: passwordRegister,
      confirmPassord: confirmPasswordRegister
    })
  }, [singUp, nickRegisterInputText, passwordRegister, confirmPasswordRegister]);

  useEffect(() => {
    if (isSinged) {
      handleCloseLoginDialog();
    }
  }, [isSinged, handleCloseLoginDialog])

  return (
    <>
      <Container>
        <Brand to={ENUM_ROUTES.Home}>
          <AiOutlineLink color={colors.primary1} size={32} /><h1> Encurtador</h1>
        </Brand>

        <MenuUser >
          <Hidden smDown>
            <button onClick={handleClick}>
              <FaUserAlt color={colors.primary1} />
              {user?.nick || 'Olá, visitante'}
            </button>
          </Hidden>
          <Hidden mdUp>
            <button onClick={handleClick}>
              <FaBars color={colors.primary1} />
            </button>
          </Hidden>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {isSinged ?
              [
                <MenuItem key={'00'} onClick={() => history.push(ENUM_ROUTES.Home)}>Encurtar</MenuItem>,
                <MenuItem key={'01'} onClick={() => history.push(ENUM_ROUTES.MyUrls)}>URLs</MenuItem>,
                <MenuItem key={'02'} onClick={() => singOut()}>Fazer Logout</MenuItem>
              ]
              :
              [
                <MenuItem key={'03'} onClick={handleOpenLoginDialog}>Fazer login</MenuItem>,
                <MenuItem key={'04'} onClick={handleOpenRegisterDialog}>Registrar-se</MenuItem>
              ]
            }
          </Menu>
        </MenuUser>
      </Container>

      <Dialog
        open={openLoginDialog}
        onClose={handleCloseLoginDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Login</DialogTitle>
        <DialogContent>

          <Form onSubmit={e => !isLoadResponse && handleLogin(e)}>
            <span className='err'>
              {loginErr}
            </span>
            <label htmlFor='nick'>Nick:</label>
            <input
              id='nick'
              type='text'
              required
              placeholder='Digite seu Nick'
              value={nickLoginInputText}
              onChange={e => setNickLoginInputText(e.target.value)}
            />
            <label htmlFor='pass'>Senha:</label>
            <input
              id='pass'
              type='password'
              required
              placeholder='Digite sua senha'
              value={passwordLogin}
              onChange={e => setPasswordLogin(e.target.value)}
            />
            <Button
              type='submit'
              variant='contained'
              disabled={isLoadResponse}
            >
              {isLoadResponse ?
                <Loader size={18} />
                :
                'Fazer login'
              }

            </Button>
            <p onClick={handleOpenRegisterDialog}>Não tem conta, Registre-se!</p>

          </Form>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLoginDialog} color='primary'>
            Fechar
          </Button>

        </DialogActions>
      </Dialog>

      <Dialog
        open={openRegisterDialog}
        onClose={handleOpenRegisterDialog}
        aria-labelledby='alert-dialog-title2'
        aria-describedby='alert-dialog-description2'
      >
        <DialogTitle id='alert-dialog-title2'>Registro</DialogTitle>
        <DialogContent>
          <Form onSubmit={e => !isLoadResponse && handleRegister(e)}>
            <span className='err'>
              {registerErr}
            </span>
            <label htmlFor='nick'>Nick:</label>
            <input
              id='nick'
              type='text'
              required
              placeholder='Digite seu Nick'
              value={nickRegisterInputText}
              onChange={e => setNickRegisterInputText(e.target.value)}
            />
            <label htmlFor='pass'>Senha:</label>
            <input
              id='pass'
              type='password'
              required
              placeholder='Digite sua senha'
              value={passwordRegister}
              onChange={e => setPasswordRegister(e.target.value)}
            />
            <label htmlFor='pass'>Confirme sua senha:</label>
            <input
              id='pass'
              type='password'
              required
              placeholder='Digite sua senha'
              value={confirmPasswordRegister}
              onChange={e => setConfirmPasswordRegister(e.target.value)}
            />
            <Button
              type='submit'
              variant='contained'
              disabled={isLoadResponse}
            >
              {isLoadResponse ?
                <Loader size={18} />
                :
                'Fazer registro'
              }

            </Button>
            <p onClick={handleOpenLoginDialog}>Fazer login!</p>

          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRegisterDialog} color='primary'>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;
