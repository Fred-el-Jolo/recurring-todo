import { addParameters } from '@storybook/client-api';

addParameters({
  viewport: {
    defaultViewport: 'mobile1',
  },
  backgrounds: [
    { name: 'twitter', value: '#00aced' },
    { name: 'facebook', value: '#3b5998' },
  ],
});
