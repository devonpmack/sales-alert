import React, {useState, useEffect, Route} from 'react';
import {Redirect} from 'react-router-dom';
import promisePoller from 'promise-poller';
import {MobileChevronMajorMonotone} from '@shopify/polaris-icons';
import {
  Page,
  Layout,
  CalloutCard,
  Card,
  Modal,
  TextField,
  SkeletonBodyText,
  SkeletonPage,
} from '@shopify/polaris';
import axios from 'axios-on-rails';
import WinkEditor from './WinkEditor';
import WinkFormModal from './WinkFormModal';

export default function Profile(props) {
  const {user, loading, refresh, kickout} = props;

  const [stale, setStale] = useState(false);
  const [itemOpen, setItemOpen] = useState(null);
  const [createMode, setCreateMode] = useState(false);
  const [viewingWink, setViewingWink] = useState(null);

  if (loading || loading === null) {
    return (
      <SkeletonPage title="Price Tracker">
        <Layout>
          <Layout.Section>
            <Card title="Keep track of Amazon prices">
              <Card.Section>
                <SkeletonBodyText lines={2} />
              </Card.Section>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card title="Your Tracked Products">
              <Card.Section>
                <SkeletonBodyText lines={2} />
              </Card.Section>
              <Card.Section>
                <SkeletonBodyText lines={5} />
              </Card.Section>
            </Card>
          </Layout.Section>
        </Layout>
      </SkeletonPage>
    );
  }

  if (kickout || (!user && loading === false)) {
    return <Redirect to="/" />;
  }

  const onWinkClick = (wink) => {
    setItemOpen(wink);
  };

  return (
    <Page fullWidth={viewingWink} title="Price Tracker">
      <Layout>
        <Layout.Section>
          {!viewingWink && (
            <CalloutCard
              title="Keep track of Amazon prices"
              illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
              primaryAction={{
                content: 'Track a new Product',
                onClick: () => setCreateMode(true),
              }}
            >
              <p>Click below to start tracking a new Amazon product.</p>
            </CalloutCard>
          )}
          <Card
            title={viewingWink ? viewingWink.name : 'Your Tracked Products'}
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
                setCreateMode={setCreateMode}
                loading={loading}
                items={user && user.winks ? user.winks : []}
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
            onSubmit={(id) => {
              if (id) {
                pollFirstQuery(id);
              }
              setItemOpen(false);
              setCreateMode(false);
              refresh(user.id);
              setStale(!stale);
            }}
          />
        </Layout.Section>
      </Layout>
    </Page>
  );

  async function pollItem(itemId, resolve, reject) {
    const response = await axios.get(`/tracked_items/${itemId}`);

    if (response && response.data && response.data.winks.length > 0) {
      resolve(response.data.winks);
    } else {
      reject('Fail');
    }
  }

  async function pollFirstQuery(id) {
    const taskFn = () => {
      return new Promise((resolve, reject) => {
        pollItem(id, resolve, reject);
      });
    };
    const resp = await promisePoller({
      taskFn,
      interval: 1000,
      retries: 60,
    });

    setViewingWink(undefined);

    // if (viewingWink && viewingWink.id === id) {
    //   setViewingWink({...viewingWink, winks: resp});
    // }
    refresh(user.id);
  }
}
