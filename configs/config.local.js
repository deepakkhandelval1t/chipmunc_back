module.exports = {
  'secret': 'ADSHFKJASHDFKL7AS9EYFRYYKQWYEBIRIQWHRJLASYDBIFYAKSLDFYB9PAS7DFKLAFUV6VAIUSDF',
  'website': ['http://localhost:4200'],
  'websiteApi': ['https://api.starf.in/'],
  'allowedOrigins': ['http://localhost:4200'],
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
    user: 'chipmuncsocial@gmail.com',
    pass: 'Password@999',
    test: true,
    testRecepient: 'chipmuncsocial@gmail.com',
    fromDisplayname: 'TeamChipmunc<chipmuncsocial@gmail.com>'
  },
  database: {
    mySqlConnection: 'mysql://root:rat@localhost/chipmunc'
  },
  googleAuth: {
    'clientID': '1052056062671-io5nglheea4frkfo82gqgjmqv5kc0irq.apps.googleusercontent.com',
    'clientSecret': 'RmLwBCaot9Ip9lPYIgVqV6aR',
    'callbackURL': '/assets/socialmedia-callback.html'
  },
  linkedinAuth: {
    'clientID': '81jjgjvvosk4ff',
    'clientSecret': 'D21SN7FQgj2SVz9w',
    'callbackURL': 'dist/assets/auth-callback.php'
  },
  facebookAuth: {
    'clientID': '1529368737192529',
    'clientSecret': '8b01f7c7e6f5c43c2835befb48474f79',
    'callbackURL': '/assets/socialmedia-callback.html'
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
