const nodemailer = require('nodemailer')
const pug = require('pug')
const juice = require('juice')
const htmlToText = require('html-to-text')
const promisify = require('es6-promisify')

const transporter = nodemailer.createTransport({
  debug: true,
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})

const generateHTML = (filename, options = {}) => {
  const html = pug.renderFile(`${__dirname }/../views/email/${filename}.pug`, options) // create a temlpate
  const inlined = juice(html) // takes the include css for this templete and inlines it for the email styling
  return inlined
}

exports.send = async (options) => {
  const { filename, subject, user: { email } } = options

  const html = generateHTML(filename, options) // generate html email to send
  const text = htmlToText.fromString(html) // generate text version as fallback

  const mailOptions = {
    from: 'Brew App <noreply@shannonjohnstone.com.au>',
    subject,
    to: email,
    html,
    text
  }

  const sendMail = promisify(transporter.sendMail, transporter)
  return sendMail(mailOptions)
}
