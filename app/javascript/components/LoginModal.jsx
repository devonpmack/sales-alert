import React, {useState} from 'react';
import { Modal, TextField } from '@shopify/polaris';

export default function LoginModal(props) {
  const { registerMode, setRegisterMode } = props;
  return (
    <Modal
      title={registerMode ? 'Register' : 'Log in'}
      open={props.open}
      primaryAction={{
        content: 'Confirm',
        onAction: ()=>{},
      }}
      secondaryActions={[
        {
          content: registerMode ? 'Already have an account?' : 'Don\'t have an account?',
          onAction: ()=>{setRegisterMode(!registerMode);},
        },
      ]}
      onClose={props.onClose}
    >
      <Modal.Section>
        <TextField label="Email" type="email"></TextField>
        <TextField label="Password" type="password"></TextField>
        {(registerMode) && 
            <TextField label="Confirm Password" type="password"></TextField>
        }
      </Modal.Section>
    </Modal>
  );
}