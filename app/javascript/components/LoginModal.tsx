import React, {useState} from 'react';
import {Modal, TextField} from '@shopify/polaris';
import FormState from '@shopify/react-form-state';
import axios from 'axios-on-rails';

export default function LoginModal(props) {
  const {registerMode, setRegisterMode} = props;
  const {isLoggedIn, setLoggedIn} = useState(false);
  const formMarkup = registerMode ? (
    <div />
  ) : (
    <FormState initialValues={{email: '', password: ''}}>
      {(formDetails) => {
        const {
          fields: {email, password},
        } = formDetails;

        return (
          <Modal
            title={registerMode ? 'Register' : 'Log in'}
            open={props.open}
            primaryAction={{
              content: 'Confirm',
              onAction: async () => {
                await axios.post('/login', {
                  login: {email: email.value, password: password.value},
                });
                setLoggedIn(true);
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
