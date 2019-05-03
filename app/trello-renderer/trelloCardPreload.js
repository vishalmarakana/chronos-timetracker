/* eslint-disable no-param-reassign */

import configureStore from './store/configureCardPreloadStore';

const store = configureStore();

{
  let powerUpApi = null;
  window.providePowerUpApiForChronos = (api) => {
    powerUpApi = api;
  };

  /*
  window.addEventListener(
    'message',
    (event) => {
      console.log(event);
      if (
        event.type === 'message'
        && event.origin === 'https://webpal-trello.glitch.me'
        && event.source.isChronos
        && event.data.secret
      ) {
        secret = event.data.secret;
      }
    },
    false,
  );
  */
  setTimeout(() => {
    postMessage(
      {
        data: [
          {
            type: 'request',
            data: {
              args: [
                {
                  url: 'https://trello.com/c/82eHEIF3/1-testcard',
                  context: {
                    command: 'navigate',
                  },
                },
              ],
              command: 'navigate',
              id: '$generateRandomId',
            },
          },
        ],
        secret: powerUpApi.io.secret,
        type: 'bulk',
      },
      'https://trello.com',
    );
  }, 5000);
}
