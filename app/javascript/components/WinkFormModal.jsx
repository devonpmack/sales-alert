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

  const title = createMode
    ? 'Track a New Product'
    : wink && `Edit ${wink.name}`;

  const [deleting, setDeleting] = useState(false);

  let formWink = wink;
  if (!formWink || createMode) {
    formWink = {
      name: '',
      threshold: null,
      url: '',
    };
  }

  const destroyWink = async () => {
    setDeleting(true);
    await axios.delete(`/tracked_items/${wink.id}.json`);
    setDeleting(false);
    onSubmit();
  };

  function removeRef(url) {
    const {value} = url;
    const index = value.indexOf('ref');

    if (index !== -1) {
      url.onChange(value.slice(0, index));
    }
  }

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
          } else if (input <= 0) {
            return 'Threshold must be greater than 0';
          }
        },
        url(input) {
          if (
            !/^(?:http(s)?:\/\/)?[\w，.-]+(?:\.[\w，\.-]+)+[\w，\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
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

        let itemId;
        if (createMode) {
          const resp = await axios.post('/tracked_items.json', payload);
          itemId = resp.data.id;
          await axios.post(`/query/${itemId}`);
        } else {
          await axios.patch(`/tracked_items/${wink.id}.json`, payload);
        }

        onSubmit(itemId);
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
                  <TextField
                    label="Tracker Name"
                    {...name}
                    placeholder="Toothbrush"
                  />
                  <TextField
                    prefix="$"
                    placeholder="7.00"
                    label="Notify me when product goes below"
                    {...threshold}
                    onBlur={() =>
                      threshold.dirty &&
                      threshold.onChange(Number(threshold.value).toFixed(2))
                    }
                    value={formatThreshold(threshold)}
                    type="number"
                  />
                  <TextField
                    label="Link to Amazon Product"
                    placeholder="https://www.amazon.ca/Colgate-Total-Toothpaste-Clean-Mint/dp/B07KF6SV8N/"
                    {...url}
                    onBlur={() => removeRef(url)}
                  />
                  <Stack distribution="trailing">
                    {!createMode && (
                      <Stack.Item fill>
                        <Button destructive onClick={destroyWink}>
                          Delete
                        </Button>
                      </Stack.Item>
                    )}
                    {dirty && (
                      <Button
                        onClick={() => {
                          if (createMode) {
                            onClose();
                          }
                          reset();
                        }}
                      >
                        Discard
                      </Button>
                    )}
                    <Button primary submit disabled={!dirty}>
                      {createMode ? 'Create' : 'Save'}
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

function formatThreshold(threshold) {
  if (threshold.dirty) {
    return threshold.value;
  }

  if (!threshold.value) {
    return null;
  }

  return Number(threshold.value).toFixed(2);
}
