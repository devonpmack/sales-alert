import React, {useState} from 'react';
import axios from 'axios-on-rails';
import FormState from '@shopify/react-form-state';

import {
  Page,
  Layout,
  CalloutCard,
  Card,
  Modal,
  TextField,
  FormLayout,
  Spinner,
  Form,
  Button,
  Stack,
} from '@shopify/polaris';

export default function WinkFormModal(props) {
  const {wink, open, onClose, createMode, userId, onSubmit} = props;

  const title = createMode ? 'Create Wink' : wink && `Edit ${wink.name}`;

  const [deleting, setDeleting] = useState(false);

  let formWink = wink;
  if (!formWink || createMode) {
    formWink = {
      name: '',
      threshold: 0,
      url: '',
    };
  }

  const destroyWink = async () => {
    setDeleting(true);
    await axios.delete(`/tracked_items/${wink.id}.json`);
    setDeleting(false);
    onSubmit();
  };

  return (
    <FormState
      validateOnSubmit
      initialValues={{
        name: formWink.name,
        threshold: formWink.threshold,
        url: formWink.url,
      }}
      validators={{
        name(input) {
          if (input.length > 30) {
            return 'That title is too long';
          } else if (input.length < 1) {
            return 'That title is too short';
          }
        },
        threshold(input) {
          if (!/^-?[0-9.,]+$/.test(input)) {
            return 'Threshold must be a number';
          } else if (input < 0) {
            return 'Threshold must be positive';
          }
        },
        url(input) {
          if (
            !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
              input,
            )
          ) {
            return 'Must be a valid URL';
          }
        },
      }}
      onSubmit={async ({fields: {name, threshold, url}}) => {
        const payload = {
          tracked_item: {
            name: name.value,
            threshold: threshold.value,
            url: url.value,
            user_id: userId,
          },
        };

        if (createMode) {
          await axios.post('/tracked_items.json', payload);
        } else {
          await axios.patch(`/tracked_items/${wink.id}.json`, payload);
        }

        onSubmit();
      }}
    >
      {(formDetails) => {
        const {fields, dirty, submitting, submit, valid, reset} = formDetails;
        const {name, threshold, url} = fields;

        return (
          <Modal
            loading={submitting || deleting}
            open={open}
            onClose={onClose}
            title={title}
          >
            <Modal.Section>
              <form onSubmit={submit}>
                <FormLayout>
                  <TextField label="Name" {...name} />
                  <TextField label="Threshold" {...threshold} type="number" />
                  <TextField label="URL" {...url} />
                  <Stack distribution="trailing">
                    <Stack.Item fill>
                      <Button destructive onClick={destroyWink}>Delete</Button>
                    </Stack.Item>
                    {dirty && <Button onClick={reset}>Discard</Button>}
                    <Button primary submit disabled={!dirty}>
                      Confirm
                    </Button>
                  </Stack>
                </FormLayout>
              </form>
            </Modal.Section>
          </Modal>
        );
      }}
    </FormState>
  );
}
