import React, {useState, useEffect} from 'react';
import {HashRouter, Route} from 'react-router-dom';
import axios from 'axios-on-rails';
import {
  AppProvider,
  CalloutCard,
  Button,
  Modal,
  Card,
  TextContainer,
  TextField,
  TopBar,
  Page,
  ContextualSaveBar,
  SettingToggle,
  Layout,
  Frame,
  TextStyle,
} from '@shopify/polaris';
import {ArrowLeftMinor} from '@shopify/polaris-icons';
import LoginModal from './LoginModal';
import Welcome from './Welcome';
import Profile from './Profile';

export default function Lander(props) {
  const theme = {
    colors: {
      topBar: {
        background: '#2c2c2c',
      },
    },
    logo: {
      width: 124,
      topBarSource: 'https://i.imgur.com/eJHZaPA.png',
      onAction: () => (window.location.href = '/'),
      accessibilityLabel: 'Sales Wink',
      contextualSaveBarSource: 'https://i.imgur.com/eJHZaPA.png',
    },
  };
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [registerMode, setRegisterMode] = useState(false);

  useEffect(
    () => {
      setLoggedIn(props.loggedIn);
    },
    [props.loggedIn],
  );

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const toggleLoginOpen = () => {
    setLoginOpen(!loginOpen);
  };

  const loginModalMarkup = (
    <LoginModal
      onClose={toggleLoginOpen}
      open={loginOpen}
      registerMode={registerMode}
      setRegisterMode={setRegisterMode}
    />
  );

  const userMenuMarkup = loggedIn && (
    <TopBar.UserMenu
      actions={[
        {
          items: [
            {
              content: 'My Profile',
              onAction: () => (window.location.href = '/profile'),
            },
          ],
        },
        {
          items: [{content: 'Get Premium'}],
        },
        {
          items: [
            {
              content: 'Log out',
              onAction: async () => {
                await axios.delete('/login');
                document.location.href = '/';
              },
            },
          ],
        },
      ]}
      detail="Free Member"
      initials="D"
      open={userMenuOpen}
      onToggle={toggleUserMenu}
    />
  );

  const topBarMarkup = <TopBar userMenu={userMenuMarkup} />;

  return (
    <div style={{height: '250px'}}>
      <HashRouter>
        <AppProvider theme={theme}>
          <Frame topBar={topBarMarkup}>
            {loginModalMarkup}
            <Route
              path="/"
              exact
              render={(rprops) => (
                <Welcome {...rprops} toggleLogin={toggleLoginOpen} />
              )}
            />
            <Route path="/profile" component={Profile} />
          </Frame>
        </AppProvider>
      </HashRouter>
    </div>
  );
}
