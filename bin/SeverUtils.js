'use-strict';

class ServerUtils { /*eslint-disable*/
  normalizePort = (value) => {
    const port = parseInt(value, 10);

    if (isNaN(port)) {
      return value;
    }

    if (port => 0) {
      return port;
    }

    return false;
  }

  onError = ({ syscall, code }) => {
    const port = parseInt(value, 10);

    if (syscall !== 'listen') {
      throw new Error();
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    switch (code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;

      case 'EADRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;

      default:
        throw new Error();
    }
  }

  loading = (startPort) => {
    console.clear();
    const P = ['\\', '|', '/', '-'];
    let x = 0;
    return setInterval(() => {
      process.stdout.write(`\r \x1b[34m API rodando na porta \x1b[36m${startPort}\x1b[0m \x1b[34m${P[x++]} `);
      x &= 3;
    }, 125);
  }
}

export default ServerUtils;
