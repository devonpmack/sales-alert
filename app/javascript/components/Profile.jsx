import React, {useState, Route} from 'react';
import axios from 'axios-on-rails';
import {Redirect} from 'react-router-dom';
import {MobileChevronMajorMonotone} from '@shopify/polaris-icons';
import {
  Page,
  Layout,
  CalloutCard,
  Card,
  Modal,
  TextField,
} from '@shopify/polaris';
import {useFetch} from './hooks';
import WinkEditor from './WinkEditor';
import WinkFormModal from './WinkFormModal';

export default function Profile(props) {
  const {user} = props;

  const [stale, setStale] = useState(false);
  const [itemOpen, setItemOpen] = useState(null);
  const [createMode, setCreateMode] = useState(false);
  const [viewingWink, setViewingWink] = useState(null);
  const [items, loading] = useFetch(`/users/${user.id}.json`, stale);

  if (!user) return <Redirect to="/" />;

  const onWinkClick = (wink) => {
    setItemOpen(wink);
  };

  return (
    <Page title="This is your profile">
      <Layout>
        <Layout.Section>
          <CalloutCard
            title="Keep track of prices all across the web"
            illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
            primaryAction={{
              content: 'Add Wink',
              onClick: () => setCreateMode(true),
            }}
          >
            <p>
              Sales wink alerts you the moment a sale starts so you won't miss a
              thing.
            </p>
          </CalloutCard>
          <Card
            title={viewingWink ? viewingWink.name : 'Your Winks'}
            secondaryFooterActions={
              viewingWink && [
                {
                  content: 'Back',
                  icon: MobileChevronMajorMonotone,
                  onAction: () => {
                    setViewingWink(null);
                  },
                },
              ]
            }
            primaryFooterAction={
              viewingWink && {
                content: 'View Product',
                onAction: () => window.open(viewingWink.url),
              }
            }
          >
            <Card.Section>
              <WinkEditor
                loading={loading}
                items={items}
                onClick={onWinkClick}
                setViewingWink={setViewingWink}
                viewingWink={viewingWink}
              />
            </Card.Section>
          </Card>
          <WinkFormModal
            userId={user.id}
            open={Boolean(itemOpen) || createMode}
            createMode={createMode}
            onClose={() => {
              setItemOpen(null);
              setCreateMode(false);
            }}
            wink={itemOpen}
            onSubmit={() => {
              setItemOpen(false);
              setCreateMode(false);
              setStale(!stale);
            }}
          />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
