import React, {useState, useEffect} from 'react';
import {EventListener, Modal, TextField, Banner} from '@shopify/polaris';
import FormState from '@shopify/react-form-state';
import axios from 'axios-on-rails';
import ReactGA from 'react-ga';

export default function LoginModal(props) {
  const {loggedIn, registerMode, setRegisterMode, onLoggedIn} = props;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => setError(null), [registerMode]);

  if (loggedIn) return null;

  const login = async (email, password) => {
    setLoading(true);
    const response = await axios.post('/login', {
      login: {email: email.value, password: password.value},
    });
    if (response.data.success) {
      onLoggedIn(response.data);
      ReactGA.event({
        category: 'User',
        action: 'Log in',
      });
    } else {
      setError('Incorrect email or password.');
    }
    setLoading(false);
  };

  const register = async (email, password, passwordConfirmation) => {
    setLoading(true);
    const response = await axios.post('/users.json', {
      user: {
        email: email.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value,
      },
    });
    if (response.data.success) {
      onLoggedIn(response.data);
      ReactGA.event({
        category: 'User',
        action: 'Create an Account',
      });
    } else {
      setError(response.data.error);
    }
    setLoading(false);
  };

  const handleKeydown = (email, password = '', passwordConfirmation = '') => (
    event,
  ) => {
    if (event.key !== 'Enter') return;
    event.stopPropagation();
    if (registerMode) {
      register(email, password, passwordConfirmation);
    } else {
      login(email, password);
    }
  };

  const formMarkup = registerMode ? (
    <FormState
      validateOnSubmit
      initialValues={{email: '', password: '', passwordConfirmation: ''}}
      validators={{
        email(input) {
          if (
            !/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
              input,
            )
          ) {
            return 'Invalid email';
          }
        },
        password(input) {
          if (input.length < 5) {
            return 'Password must be at least 5 characters long';
          } else if (input.length > 30) {
            return 'Password must be less than 30 characters long';
          }
        },
      }}
    >
      {(formDetails) => {
        const {
          fields: {email, password, passwordConfirmation},
          dirty,
        } = formDetails;

        return (
          <Modal
            title="Register"
            loading={loading}
            open={props.open}
            primaryAction={{
              content: 'Register',
              disabled: !dirty,
              onAction: () => register(email, password, passwordConfirmation),
            }}
            secondaryActions={[
              {
                content: 'Already have an account?',
                onAction: () => {
                  setRegisterMode(!registerMode);
                },
              },
            ]}
            onClose={props.onClose}
          >
            <EventListener
              capture
              event="keydown"
              handler={handleKeydown(email, password)}
            />
            {error && <Banner status="critical">{error}</Banner>}
            <Modal.Section>
              <form>
                <TextField {...email} label="Email" type="email" />
                <TextField {...password} label="Password" type="password" />
                <TextField
                  {...passwordConfirmation}
                  label="Confirm Password"
                  type="password"
                />
              </form>
            </Modal.Section>
          </Modal>
        );
      }}
    </FormState>
  ) : (
    <FormState initialValues={{email: '', password: ''}}>
      {(formDetails) => {
        const {
          fields: {email, password},
          dirty,
          submit,
        } = formDetails;
        return (
          <Modal
            title="Log in"
            loading={loading}
            open={props.open}
            primaryAction={{
              disabled: !dirty,
              content: 'Log in',
              onAction: () => login(email, password),
            }}
            secondaryActions={[
              {
                content: registerMode
                  ? 'Already have an account?'
                  : "Don't have an account?",
                onAction: () => {
                  setRegisterMode(!registerMode);
                },
              },
            ]}
            onClose={props.onClose}
          >
            <EventListener
              capture
              event="keydown"
              handler={handleKeydown(email, password)}
            />
            {error && <Banner status="critical">{error}</Banner>}
            <EventListener
              capture
              event="keydown"
              handler={(event) => event.key === 'Enter' && submit()}
            />
            <Modal.Section>
              <form onSubmit={submit}>
                <TextField {...email} label="Email" type="email" />
                <TextField {...password} label="Password" type="password" />
              </form>
            </Modal.Section>
          </Modal>
        );
      }}
    </FormState>
  );

  return <div>{formMarkup}</div>;
}
