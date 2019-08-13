import React, {useState} from 'react';
import {ResourceList, TextStyle, Button} from '@shopify/polaris';
import {Redirect} from 'react-router-dom';

export default function WinkViewer(props) {
  const {name, threshold, id} = props;
  return <p>{name}</p>;
}
