import React, {useState} from 'react';
import {Modal, TextField, Banner} from '@shopify/polaris';
import FormState from '@shopify/react-form-state';
import axios from 'axios-on-rails';
import {Redirect} from 'react-router-dom';

export default function LoginModal(props) {
  const {loggedIn, registerMode, setRegisterMode, onLoggedIn} = props;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (loggedIn) return null;

  const formMarkup = registerMode ? (
    <FormState
      initialValues={{email: '', password: '', passwordConfirmation: ''}}
    >
      {(formDetails) => {
        const {
          fields: {email, password, passwordConfirmation},
        } = formDetails;

        return (
          <Modal
            title="Register"
            loading={loading}
            open={props.open}
            primaryAction={{
              content: 'Register',
              onAction: async () => {
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
                } else {
                  setError(response.data.error);
                }
                setLoading(false);
              },
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
        } = formDetails;

        return (
          <Modal
            title="Log in"
            loading={loading}
            open={props.open}
            primaryAction={{
              content: 'Confirm',
              onAction: async () => {
                setLoading(true);
                const response = await axios.post('/login', {
                  login: {email: email.value, password: password.value},
                });
                if (response.data.success) {
                  onLoggedIn(response.data);
                } else {
                  setError('Invalid username or password.')
                }
                setLoading(false);
              },
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
            {error && <Banner status="critical">{error}</Banner>}
            <Modal.Section>
              <form>
                <TextField {...email} label="Email" type="email" />
                <TextField {...password} label="Password" type="password" />
              </form>
            </Modal.Section>
          </Modal>
        );
      }}
    </FormState>
  );

  return formMarkup;
}
