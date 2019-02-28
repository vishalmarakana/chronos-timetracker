const config = {
  apiUrl: 'https://chronos-api.web-pal.com', // server url
  socketUrl: 'https://chronos-socket.web-pal.com', // url of socket server

  supportLink: 'https://web-pal.atlassian.net/servicedesk/customer/portal/2',
  githubLink: 'https://github.com/web-pal/chronos-timetracker',
  trelloApiKey: '0c531045b6f176f6f4fb1c4584661bd7',

  idleTimeThreshold: 300, // seconds of inactivity considering user is idle
  checkUpdates: false,
  infoLog: false,
  reduxLogger: true,
  issueWindowDevTools: false,
  popupWindowDevTools: false,
  loginWindowDevTools: false,

  loginTrelloWindowDevTools: true,
};

export default config;
