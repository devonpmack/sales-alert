import React, {useState} from 'react';
import {ResourceList, TextStyle, Button} from '@shopify/polaris';
import {Redirect} from 'react-router-dom';
import WinkViewer from './WinkViewer';

export default function WinkEditor(props) {
  const {items, onClick, loading, setViewingWink, viewingWink} = props;

  const [searchQuery, setSearchQuery] = useState('');

  const filterControl = (
    <ResourceList.FilterControl
      searchValue={searchQuery}
      onSearchChange={(value) => setSearchQuery(value)}
    />
  );

  const queryRegexp = new RegExp(searchQuery, 'i');
  const filteredItems = searchQuery
    ? items.filter((item) => queryRegexp.test(item.name))
    : items;

  if (viewingWink) {
    return <WinkViewer wink={viewingWink} />;
  }

  return (
    <ResourceList
      loading={loading}
      filterControl={filterControl}
      resourceName={{singular: 'wink', plural: 'winks'}}
      items={filteredItems}
      renderItem={(item) => {
        const {id, name, threshold} = item;

        const shortcutActions = [
          {
            content: 'Edit',
            onAction: () => {
              onClick(item);
            },
          },
          {
            content: 'View',
            onAction: () => {
              setViewingWink(item);
              setViewingWink;
            },
          },
        ];
        return (
          <ResourceList.Item
            id={id}
            onClick={() => onClick(item)}
            shortcutActions={shortcutActions}
          >
            <h3>
              <TextStyle variation="strong">{name}</TextStyle>
            </h3>
            <div>{`Wink Price: $${threshold}`}</div>
          </ResourceList.Item>
        );
      }}
    />
  );
}
