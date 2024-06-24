export const recoverPasswordTemplate = {
  html:
    '<h1>Hi, ##name##</h1>' +
    '<p>' +
    'Click <a href="http://localhost:5173/create-new-password/##token##">here</a> to recover your password' +
    '</p>',
  subject: 'Password recovery',
}
