export const emailConfirmTemplate = {
  html:
    '<b>Hello, ##name##!</b>' +
    '<br/>' +
    'Please confirm your email by clicking on the link below:' +
    '<br/>' +
    '<a href="http://localhost:5173/confirm-email/##token##">Confirm email</a>. ' +
    "If it doesn't work, copy and paste the following link in your browser:" +
    '<br/>' +
    'http://localhost:5173/confirm-email/##token##',
  subject: 'Email Confirmation',
}
