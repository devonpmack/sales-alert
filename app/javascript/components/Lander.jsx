/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import axios from 'axios-on-rails';
import Cookies from 'js-cookie';
import {AppProvider, TopBar, Frame} from '@shopify/polaris';
import LoginModal from './LoginModal';
import Welcome from './Welcome';
import Profile from './Profile';
import Settings from './Settings';

export default function Lander() {
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
  const [registerMode, setRegisterMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [loading, setLoading] = useState(null);

  async function getUser(id) {
    if (!loading) setLoading(true);
    try {
      const response = await axios.get(`/users/${id}.json`);

      setCurrentUser(response.data);
      setLoading(false);
    } catch (error) {
      setCurrentUser(null);
      setLoading(false);
      Cookies.remove('authToken');
    }
  }

  useEffect(() => {
    const cookie = Cookies.get('authToken');
    if (cookie) {
      getUser(cookie);
      setLoading(true);
    } else {
      setCurrentUser(null);
    }
  }, []);

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
      setRegisterMode={setRegisterMode}
      open={loginOpen && !currentUser}
      registerMode={registerMode}
      loggedIn={Boolean(currentUser)}
      onLoggedIn={(user) => {
        getUser(user.id);
        Cookies.set('authToken', user.id, {expires: 7});
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
              onAction: () => {
                window.location.href = '/profile';
              },
            },
          ],
        },
        // {
        //   items: [{content: 'Get Premium'}],
        // },
        {
          items: [
            {
              content: 'Settings',
              onAction: () => {
                window.location.href = '/settings';
              },
            },
          ],
        },
        {
          items: [
            {
              content: 'Log out',
              onAction: async () => {
                await axios.delete('/login');
                document.location.href = '/';
                Cookies.remove('authToken');
              },
            },
          ],
        },
      ]}
      detail="Member"
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
      <BrowserRouter>
        <AppProvider theme={theme}>
          <Frame topBar={topBarMarkup}>
            {window.location.pathname === '/' && (currentUser || loading) ? (
              <Redirect to="/profile" />
            ) : null}
            {currentUser === null ? <Redirect to="/" /> : null}
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
              render={(rprops) => (
                <Profile
                  {...rprops}
                  loading={loading}
                  refresh={getUser}
                  user={currentUser}
                />
              )}
            />
            <Route
              path="/settings"
              render={(rprops) => (
                <Settings
                  {...rprops}
                  loading={loading}
                  email={currentUser && currentUser.email}
                  id={currentUser && currentUser.id}
                />
              )}
            />
          </Frame>
        </AppProvider>
      </BrowserRouter>
    </div>
  );
}
