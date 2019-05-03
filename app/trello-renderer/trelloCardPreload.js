/* eslint-disable no-param-reassign */

import configureStore from './store/configureCardPreloadStore';

const store = configureStore();

window.addEventListener(
  'message',
  (event) => {
    console.log(event);
    if (
      event.type === 'message'
      && event.origin === 'https://webpal-trello.glitch.me'
      && event.data.secret
    ) {
      const { secret } = event.data;
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
          secret,
          type: 'bulk',
        },
        'https://trello.com',
      );
    }
  },
  false,
);
