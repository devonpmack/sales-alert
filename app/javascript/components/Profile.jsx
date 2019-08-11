import React from 'react';
import {Page, Layout, CalloutCard} from '@shopify/polaris';

export default function Profile(props) {
  return (
    <Page title="This is your profile">
      <Layout>
        <Layout.Section>
          <CalloutCard
            title="Keep track of prices all across the web"
            illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
            primaryAction={{
              content: 'Add Wink',
            }}
            // secondaryAction={{
              // content: "Don't have an account? Click here to sign up for free!",
              // onAction: () => {
              //   setRegisterMode(true);
              //   toggleLoginOpen();
              // },
            // }}
          >
            <p>
              Sales wink alerts you the moment a sale starts so you won't miss a
              thing.
            </p>
          </CalloutCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
