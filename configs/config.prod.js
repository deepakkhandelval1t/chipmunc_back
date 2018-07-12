module.exports = {
  'secret': 'ADSHFKJASHDFKL7AS9EYFRYYKQWYEBIRIQWHRJLASYDBIFYAKSLDFYB9PAS7DFKLAFUV6VAIUSDF',
  'website': ['https://starf.in/'],
  'websiteApi': ['https://api.starf.in/'],
  'allowedOrigins': ['https://starf.in'],
  "recaptchaKey": "6LeVQD0UAAAAALccXBO30PrmMf3t0k_mxinms0aq",
  jwt: {
    secret: 'SHDJHDSDSD&(**DSUDSY^D&^USDHSODISOIY&D*SYDDH',
    expireTime: 60 * 60 * 0.5, // set time
    audience: 'Starf.IN', 
    issuer: 'https://api.starf.in/'
  },
  emailConfig: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    user: 'eazyrecruit.in@gmail.com',
    pass: 'Tanuj@27',
    test: true,
    testRecepient: 'eazyrecruit.in@gmail.com',
    fromDisplayname: 'TeamEazyRecruit<eazyrecruit.in@gmail.com>'
  },
  database: {
    mySqlConnection: 'mysql://root:root@localhost/eazyrecruit'
  },
  googleAuth: {
    'clientID': '195098776497-10soq2m3v31nbaeg06oc0iv8hd7q9nfc.apps.googleusercontent.com',
    'clientSecret': 'ao2lQC9nSwGGwmyYx5EB6rHZ',
    'callbackURL': 'dist/assets/auth-callback.php'
  },
  linkedinAuth: {
    'clientID': '81jjgjvvosk4ff',
    'clientSecret': 'D21SN7FQgj2SVz9w',
    'callbackURL': 'dist/assets/auth-callback.php'
  },
  facebookAuth: {
    'clientID': '392471997876350',
    'clientSecret': '1b71e8f19ed955318282b3f66ff03e7b',
    'callbackURL': 'dist/assets/auth-callback.php'
  },
  socialPlatforms: {
    Google: 'google',
    Facebook: 'facebook',
    Linkedin: 'linkedin'
  },
  twilioAuth:{
    accountSid :'AC99fcd58f18a79a40db3658c6b9052a80',
    authToken : '2e3a8cd31cf7cad780c46a14dc53a06c',
    from: '+16572363092',
    test: true
  },
  mongodb:{
    connection: 'mongodb://localhost/eazyrecruit'
  },
  allowedIps: ['::1'],
  isSaleStarted: false,
};
