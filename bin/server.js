'use-strict';

import http from 'http';
import debug from 'debug';
import app from '../src/app';
import ServerUtils from './SeverUtils';

const port = ServerUtils.normalizePort(process.env.PORT || 8080);

app.set('port', port);

const server = http.createServer(app);

server.listen(port);

server.on('error', ServerUtils.onError);

server.on('listening', () => {
  const addr = server.address();

  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;

  debug(`Listening on ${bind}`);
});

ServerUtils.loading(port);
