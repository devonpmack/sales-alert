import React, {useState} from 'react';
import {
  Card,
  Stack,
  Button,
  FormLayout,
  TextField,
  Page,
  Spinner,
  Banner,
} from '@shopify/polaris';
import FormState from '@shopify/react-form-state';
import axios from 'axios-on-rails';

export default function Settings(props) {
  const {id, email} = props;

  function passwordValidator(input) {
    if (input.length < 3) {
      return 'Password is too short';
    }
  }

  const [emailBanner, setEmailBanner] = useState(null);
  const [passwordBanner, setPasswordBanner] = useState(null);

  return (
    <Page title="Settings">
      <Card title="Change Email">
        <Card.Section>
          <FormState
            validateOnSubmit
            initialValues={{
              email: '',
              emailConfirmation: '',
              password: '',
            }}
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
              emailConfirmation(input) {
                if (
                  !/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
                    input,
                  )
                ) {
                  return 'Invalid email';
                }
              },
              password(input) {
                if (input.length < 1) {
                  return 'Invalid password';
                }
              },
            }}
            onSubmit={async ({fields: {email, password}}) => {
              const payload = {
                user: {
                  email: email.value,
                  password: password.value,
                },
              };

              setEmailBanner(null);
              const resp = await axios.patch(`/users/${id}.json`, payload);
              if (resp.data.error) {
                setEmailBanner({status: 'critical', message: resp.data.error});
              } else if (resp.data.success) {
                setEmailBanner({
                  status: 'success',
                  message: 'Saved successfully',
                });
              }
            }}
          >
            {(formDetails) => {
              const {
                fields,
                dirty,
                submitting,
                submit,
                valid,
                reset,
              } = formDetails;
              const {email, emailConfirmation, password} = fields;

              return (
                <form onSubmit={submit}>
                  {submitting ? (
                    <Spinner size="large" />
                  ) : (
                    <FormLayout>
                      {emailBanner && (
                        <Banner status={emailBanner.status}>
                          {emailBanner.message}
                        </Banner>
                      )}
                      <TextField {...email} label="New Email" />
                      <TextField
                        {...emailConfirmation}
                        label="Confirm New Email"
                      />
                      <TextField
                        {...password}
                        type="password"
                        label="Password"
                      />
                      <Stack distribution="trailing">
                        <Button
                          primary
                          submit
                          disabled={
                            !dirty ||
                            email.value === email.initialValue ||
                            email.value !== emailConfirmation.value ||
                            password.value === password.initialValue
                          }
                        >
                          Save
                        </Button>
                      </Stack>
                    </FormLayout>
                  )}
                </form>
              );
            }}
          </FormState>
        </Card.Section>
      </Card>
      <Card title="Change Password">
        <Card.Section>
          <FormState
            validateOnSubmit
            initialValues={{
              newPassword: '',
              newPasswordConfirmation: '',
              oldPassword: '',
            }}
            validators={{
              newPassword: passwordValidator,
              newPasswordConfirmation: passwordValidator,
              oldPassword: passwordValidator,
            }}
            onSubmit={async ({
              fields: {newPassword, newPasswordConfirmation, oldPassword},
            }) => {
              const payload = {
                user: {
                  new_password: newPassword.value,
                  password_confirmation: newPasswordConfirmation.value,
                  password: oldPassword.value,
                },
              };

              setPasswordBanner(null);
              const resp = await axios.patch(`/users/${id}.json`, payload);
              if (resp.data.error) {
                setPasswordBanner({
                  status: 'critical',
                  message: resp.data.error,
                });
              } else if (resp.data.success) {
                setPasswordBanner({
                  status: 'success',
                  message: 'Saved successfully',
                });
              }
            }}
          >
            {(formDetails) => {
              const {
                fields,
                dirty,
                submitting,
                submit,
                valid,
                reset,
              } = formDetails;
              const {
                newPassword,
                newPasswordConfirmation,
                oldPassword,
              } = fields;

              return (
                <form onSubmit={submit}>
                  {submitting ? (
                    <Spinner size="large" />
                  ) : (
                    <FormLayout>
                      {passwordBanner && (
                        <Banner status={passwordBanner.status}>
                          {passwordBanner.message}
                        </Banner>
                      )}
                      <TextField
                        {...oldPassword}
                        type="password"
                        label="Password"
                      />
                      <TextField
                        {...newPassword}
                        label="New Password"
                        type="password"
                      />
                      <TextField
                        {...newPasswordConfirmation}
                        label="Confirm New Password"
                        type="password"
                      />
                      <Stack distribution="trailing">
                        <Button
                          primary
                          submit
                          disabled={
                            !(
                              dirty &&
                              newPassword.dirty &&
                              newPasswordConfirmation.dirty &&
                              oldPassword.dirty
                            )
                          }
                        >
                          Save
                        </Button>
                      </Stack>
                    </FormLayout>
                  )}
                </form>
              );
            }}
          </FormState>
        </Card.Section>
      </Card>
    </Page>
  );
}
