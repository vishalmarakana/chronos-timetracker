/* eslint-disable no-param-reassign */

import configureStore from './store/configureCardPreloadStore';

const store = configureStore();

console.log('store', store);
console.log('store', store.getState());

const iframe = document.querySelector('.plugin-iframe');

if (iframe) {
  iframe.contentWindow.postMessage('5ccac869d743525f84927b45');
}
