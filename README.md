# passport-sanity
[Passport](http://passportjs.org/) strategy for authenticating with
[Sanity](https://www.sanity.io/) using the OAuth 2.0 API.
 
[![Build Status](https://travis-ci.com/skogsmaskin/passport-sanity.svg?branch=master)](https://travis-ci.com/skogsmaskin/passport-sanity)

This module lets you authenticate with Sanity.io in your Node.js applications.
By plugging into Passport, Sanity.io authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).


## Install

```bash
$ npm install passport-sanity
```

## Usage

#### Create an Application

Before using `passport-sanity`, you must register an application with Sanity.
Your application will be issued a client ID and client secret, which need to be provided to the strategy.
You will also need to configure a callback URL which matches the route in your application.

#### Configure Strategy

The Sanity authentication strategy authenticates users using a Sanity account
and OAuth 2.0 tokens. The client ID and secret obtained when creating an
application are supplied as options when creating the strategy. The strategy
also requires a `verify` callback, which receives the access token, as well as 
`profile` which contains the authenticated user's Netilify profile. 
The `verify` callback must call `cb` providing a user to complete authentication.

```js
const SanityStrategy = require('passport-sanity').Strategy;

passport.use(new SanityStrategy({
    clientID: SANITY_CLIENT_ID,
    clientSecret: SANITY_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/sanity/callback",
    state: true // use OAuth2 state param to protect against csrf attacks (requries express-session)
  },
  (accessToken, refreshToken, profile, cb) => {
    User.findOrCreate({provider: 'sanity': providerId: profile.id }, (err, user) => {
      return cb(err, user)
    })
  }
))
```

*Note: While Sanity doesn't support refresh tokens (as for Jul. 2019),
the verify callback still uses a second parameter `refreshToken` to conform
to the OAuth2 standard. This makes it easier to  share a verify callback function
for all `passport-oauth2` based authentications you use with Passport.js.
The `refreshToken` will be undefined with this strategy, and should just be ignored.*

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'sanity'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```js
app.get('/auth/sanity', passport.authenticate('sanity'))

app.get('/auth/sanity/callback', 
  passport.authenticate('sanity', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  })
```
