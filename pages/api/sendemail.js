const nodemailer = require('nodemailer');

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))


export default async function handler(req, res) {
  const properties = JSON.parse(req.body);
  const username = properties.telegram
    const database = require('../../lib/db.json')
    if(!database[username]) {
      return res.status(404).send()
    }

    const content = 'test'
    bot.Telegram.sendMessage(database[username], content, {parse_mode: 'MarkdownV2'}).catch(() => {return res.status(404).send()})

  let transporter = nodemailer.createTransport({
    host: 'smtp.yandex.com',
    port: 465,
    secure: true,
    auth: {
      user: 'evanenev',
      pass: 'aajfqggsxqjxgsmc',
    },
    sendmail: true,
    newline: 'windows',
    logger: false,
    path: '/usr/sbin/sendmail',
  });

  let message = {
    from: 'evanenev@ya.ru',
    to: `ivanbubenev1968@gmail.com`,
    subject: 'Form',
    html:
      '<p>test</p>',
  };

  const info = await transporter.sendMail(message).catch((error) => {
    console.error(error);
  });

  console.debug(info);
}
