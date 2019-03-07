'use-strict';

import sendgrid from '@sendgrid/mail';
import config from '../config';

sendgrid.setApiKey(config.sendGridKey);

class EmailServices {
  sendWelcome = async ({ email: to, name }) => {
    sendgrid.send({
      to,
      from: 'hello@node-store.io',
      subject: 'Welcome to Node Store!',
      html: config.EMAIL_TMPL.replace('{0}', name),
    });
  };

  send = async (to, subject, body) => {
    sendgrid.send({
      to,
      from: 'hello@node-store.io',
      subject,
      html: body,
    });
  };
}

export default EmailServices;
