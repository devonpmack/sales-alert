import React, {useState} from 'react';
import { Modal, TextField } from '@shopify/polaris';
import FormState from '@shopify/react-form-state';
export default function LoginModal(props) {
  const { registerMode, setRegisterMode } = props;

  const formMarkup = registerMode ? (<div/>) : (
    <FormState initialValues={{email: '', password: ''}}>
      {formDetails => { 
        const {fields: {email, password}} = formDetails;
        return (
          <form>
            <TextField {...email} label="Email" type="email"></TextField>
            <TextField {...password} label="Password" type="password"></TextField>
          </form>
        );
      }}
        
    </FormState>
  );

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
        {formMarkup}
      </Modal.Section>
    </Modal>
  );
}