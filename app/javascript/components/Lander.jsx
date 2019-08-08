import React, {useState, useEffect} from 'react';
import {AppProvider, CalloutCard, Button, Modal, Card, TextContainer, TextField, TopBar, Page, ContextualSaveBar, SettingToggle, Layout, Frame, TextStyle} from '@shopify/polaris';
import {ArrowLeftMinor} from '@shopify/polaris-icons';
import LoginModal from './LoginModal';
export default function Lander(props) {
  const theme = {
    colors: {
      topBar: {
        background: '#2c2c2c',
      },
    },
    logo: {
      width: 124,
      topBarSource:
        'https://i.imgur.com/eJHZaPA.png',
      onAction: () => window.href = '/',
      accessibilityLabel: 'Sales Wink',
      contextualSaveBarSource:
        'https://i.imgur.com/eJHZaPA.png',
    },
  };
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [registerMode, setRegisterMode] = useState(false);
  
  useEffect(() => {
    setLoggedIn(props.loggedIn);
  });


  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const toggleLoginOpen = () => {
    setLoginOpen(!loginOpen);
  };

  const loginModalMarkup = (
    <LoginModal onClose={toggleLoginOpen} open={loginOpen} registerMode={registerMode} setRegisterMode={setRegisterMode} />
  );

  const userMenuMarkup = loggedIn && (
    <TopBar.UserMenu
      actions={[
        {
          items: [{content: 'My Profile', onAction: () => window.location.href = '/profile'}],
        },
        {
          items: [{content: 'Get Premium'}],
        },
        {
          items: [{content: 'Log out'}],
        },
      ]}
      detail="Free Member"
      initials="D"
      open={userMenuOpen}
      onToggle={toggleUserMenu}
    />);

  const topBarMarkup = <TopBar userMenu={userMenuMarkup}/>;

  const pageMarkup = (
    <Page title="Welcome to Sales Wink">
      {loginModalMarkup}
      <Layout>
        <Layout.Section>
          <CalloutCard
            title="Keep track of prices all across the web"
            illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
            primaryAction={{
              content: 'Log in',
              onAction: () => {setRegisterMode(false); toggleLoginOpen();}
            }}
            secondaryAction={{content: 'Don\'t have an account? Click here to sign up for free!', onAction: () => {setRegisterMode(true); toggleLoginOpen();}}}
          >
            <p>Sales wink alerts you the moment a sale starts so you won't miss a thing.</p>
          </CalloutCard>
        </Layout.Section>
      </Layout>
    </Page>
  );


  return (
    <div style={{height: '250px'}}>
      <AppProvider theme={theme}>
        <Frame topBar={topBarMarkup}>
          {pageMarkup}
        </Frame>
      </AppProvider>
    </div>
  );
}