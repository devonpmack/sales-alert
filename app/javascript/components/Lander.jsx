import React, {useState, useEffect} from 'react';
import {HashRouter, Route, Redirect} from 'react-router-dom';
import axios from 'axios-on-rails';
import Cookies from 'js-cookie';
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
      onAction: () => (window.location.href = '/#/'),
      accessibilityLabel: 'Sales Wink',
      contextualSaveBarSource: 'https://i.imgur.com/eJHZaPA.png',
    },
  };
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerMode, setRegisterMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const {currentUser: savedUser} = props;
  if (savedUser && !currentUser) {
    setCurrentUser(savedUser);
  }

  const cookie = Cookies.get('user');
  if (!currentUser && cookie) {
    setCurrentUser(JSON.parse(cookie));
  }

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const toggleLoginOpen = (loginMode = true) => {
    setLoginOpen(!loginOpen);
    setRegisterMode(!loginMode);
  };

  const loginModalMarkup = (
    <LoginModal
      onClose={toggleLoginOpen}
      open={loginOpen && !currentUser}
      registerMode={registerMode}
      setRegisterMode={setRegisterMode}
      loggedIn={Boolean(currentUser)}
      onLoggedIn={(user) => {
        setCurrentUser(user);
        Cookies.set('user', user, {expires: 7});
      }}
    />
  );

  const userMenuMarkup = currentUser && (
    <TopBar.UserMenu
      actions={[
        {
          items: [
            {
              content: 'My Profile',
              onAction: () => (window.location.href = '/#/profile'),
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
                Cookies.remove('user');
              },
            },
          ],
        },
      ]}
      detail="Free Member"
      initials={
        currentUser &&
        currentUser.email &&
        currentUser.email.charAt(0).toUpperCase()
      }
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
            {currentUser && <Redirect to="/profile" />}
            {loginModalMarkup}
            <Route
              path="/"
              exact
              render={(rprops) => (
                <Welcome {...rprops} toggleLogin={toggleLoginOpen} />
              )}
            />
            <Route
              path="/profile"
              render={(rprops) => <Profile {...rprops} user={currentUser} />}
            />
          </Frame>
        </AppProvider>
      </HashRouter>
    </div>
  );
}
