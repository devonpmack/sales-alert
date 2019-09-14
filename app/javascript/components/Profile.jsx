import React, {useState, useEffect, Route} from 'react';
import {Redirect} from 'react-router-dom';
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
      <SkeletonPage title="This is your profile">
        <Layout>
          <Layout.Section>
            <Card title="Keep track of prices all across the web">
              <Card.Section>
                <SkeletonBodyText lines={2} />
              </Card.Section>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card title="Your winks">
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
            onSubmit={() => {
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
}
