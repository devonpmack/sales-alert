import React from 'react';
import {ResourceList, TextStyle, TextField} from '@shopify/polaris';

export default function WinkEditor(props) {
  const {items, onClick, loading} = props;
  return (
    <ResourceList
      loading={loading}
      resourceName={{singular: 'wink', plural: 'winks'}}
      items={items}
      renderItem={(item) => {
        const {id, url, name, threshold} = item;
        // const media = <Avatar customer size="medium" name={name} />;

        // const shortcutActions = <TextField value={threshold} type="currency"/>
        return (
          <ResourceList.Item
            id={id}
            onClick={() => onClick(item)}
            // media={media}
            accessibilityLabel={`View details for ${name}`}
            // shortcutActions={shortcutActions}
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
