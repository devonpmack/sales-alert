import React, {useState} from 'react';
import {ResourceList, TextStyle, Button} from '@shopify/polaris';
import {Redirect} from 'react-router-dom';

export default function WinkEditor(props) {
  const {items, onClick, loading} = props;
  const [redirecting, setRedirecting] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  if (redirecting) {
    return <Redirect to={redirecting} />;
  }

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

  return (
    <ResourceList
      loading={loading}
      filterControl={filterControl}
      resourceName={{singular: 'wink', plural: 'winks'}}
      items={filteredItems}
      renderItem={(item) => {
        const {id, name, threshold} = item;
        // const media = <Avatar customer size="medium" name={name} />;

        // const shortcutActions = <TextField value={threshold} type="currency"/>
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
              setRedirecting(`/profile/details/${id}`);
            },
          },
        ];
        return (
          <ResourceList.Item
            id={id}
            onClick={() => onClick(item)}
            // media={media}
            accessibilityLabel={`View details for ${name}`}
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
