const configVars = {
    secretKey: 'add secret key here',
    adminEmail: 'add login email here',
    adminPassword: 'add password here',
    dbURL: 'add mongodb URI here',
    emailFrom: '',
    mailSettings: {
      pool: true,
      host: "",
      port: 465,
      secure: true,
      auth: {
          user: "",
          pass: ""
      }
    },
  }
  
  module.exports = {configVars};