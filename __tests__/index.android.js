import 'react-native';
import React from 'react';
import App from '../index.android.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  fetch = jest.fn(() => new Promise(resolve => resolve()));
  const tree = renderer.create(
    <App />
  );
  expect(tree).toMatchSnapshot();

});
