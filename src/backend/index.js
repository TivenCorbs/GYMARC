/**
 * @module GoogleOAuthExample
 * @description This module sets up an Express application with Google OAuth2.0
 * authentication using Passport. It includes user session management and routes
 * for handling authentication and user profile access.
 *
 * @requires express
 * @requires passport
 * @requires passport-google-oauth20
 * @requires express-session
 *
 * @summary Demonstrates Google OAuth2.0 integration in an Express app.
 *
 * ## Functionality
 * - Initializes an Express application.
 * - Configures session management with express-session.
 * - Sets up Passport for user authentication.
 * - Implements Google OAuth 2.0 strategy for authentication with Passport.
 * - Serializes and deserializes user information to maintain session state.
 * - Defines routes:
 *   - `/auth/google`: Initiates authentication with Google.
 *   - `/auth/google/callback`: Handles the callback after Google
 *     authentication.
 *   - `/profile`: Displays the user profile if authenticated.
 *   - `/logout`: Logs out the user and redirects to the home page.
 *   - `/`: Home page with a link to initiate authentication.
 *
 * ## Usage
 * Start the server by setting environment variables for `SESSION_SECRET_KEY`,
 * `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and optionally `PORT`, then
 * running this module.
 *
 * Navigate to `http://localhost:<PORT>` (default is 3000) in a web browser to
 * view and interact with the application.
 */
import express from 'express';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import session from 'express-session';

// Create an Express application
const app = express();

// Create an in-memory store for user sessions
const User = {};

/**
 * Configures session middleware for the application using express-session. This
 * setup is crucial for managing user sessions across multiple HTTP requests.
 *
 * @see {@link https://www.npmjs.com/package/express-session|Express Session}
 *
 * @param {express.Application} app - The Express application instance.
 * @function use
 * @memberof express.Application
 */
app.use(
  session({
    // Secret key for signing the session ID cookie
    secret: process.env['SESSION_SECRET_KEY'],
    // Do not save session if unmodified
    resave: false,
    // Save new sessions that have not been modified
    saveUninitialized: true,
  })
);

/**
 * Initializes Passport and its session management in the Express application.
 * This configuration is essential for handling user authentication and maintaining session data
 * across multiple requests within a user's login session.
 *
 * @see {@link http://www.passportjs.org/docs/|PassportJS Documentation}
 *
 * @param {express.Application} app - The Express application instance.
 * @function use
 * @memberof express.Application
 */
// Initialize Passport
app.use(passport.initialize());
// Enable session support for Passport
app.use(passport.session());

/**
 * Configures Passport to use the Google OAuth 2.0 strategy for user
 * authentication. This setup involves specifying Google's API client details
 * and a callback URL which Google will use after the user has authenticated.
 * The strategy requires handling the user's authentication result, which
 * includes access and refresh tokens along with user profile information.
 *
 * @see
 * {@link https://www.passportjs.org/packages/passport-google-oauth20/|Passport Google OAuth2.0 Strategy}
 *
 * @param {passport.PassportStatic} passport - The Passport instance.
 * @function use
 * @memberof passport.PassportStatic
 */
passport.use(
  new GoogleStrategy(
    {
      // Your Google client ID
      clientID: process.env['GOOGLE_CLIENT_ID'],
      // Your Google client secret
      clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
      // URL to which Google will redirect after authentication
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    // Callback function to process the authenticated user
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

/**
 * Serializes the user instance into the session. Specifically, it stores the
 * user's ID in the session, which helps in retrieving the user's full object on
 * subsequent requests. This function is part of Passport's session management
 * process to keep track of authenticated users.
 *
 * @param {passport.PassportStatic} passport - The Passport instance.
 * @function serializeUser
 * @memberof passport.PassportStatic
 */
passport.serializeUser((user, done) => {
  User[user.id] = user;
  done(null, user.id);
});

/**
 * Deserializes the user from the session, retrieving the full user object based
 * on the user ID. This function is crucial for Passport's session management,
 * enabling the application to access the user's information on subsequent
 * requests after authentication.
 *
 * @param {passport.PassportStatic} passport - The Passport instance.
 * @function deserializeUser
 * @memberof passport.PassportStatic
 */
passport.deserializeUser((id, done) => {
  const user = User[id];
  done(null, user);
});

/**
 * Defines a route to start authentication with Google using Passport. The route
 * handler invokes the Passport authenticate middleware for Google OAuth 2.0,
 * specifying the required scopes such as 'profile' and 'email'. This scope
 * determines the information requested from Google's user data.
 *
 * @param {express.Application} app - The Express application instance.
 * @function get
 * @memberof express.Application
 */
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

/**
 * Defines a route to handle the callback from Google authentication. This route
 * uses Passport's authenticate method to process the authentication result from
 * Google. On successful authentication, the user is redirected to the
 * '/profile' page. On failure, the user is redirected back to the home page.
 *
 * @param {express.Application} app - The Express application instance.
 * @function get
 * @memberof express.Application
 */
app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/',
  })
);

/**
 * Defines a route for displaying the user's profile page after successful
 * authentication. If the user is authenticated, it renders a welcome message, a
 * logout link, and the user's profile picture. If the user is not
 * authenticated, they are redirected to the home page.
 *
 * @param {express.Application} app - The Express application instance.
 * @function get
 * @memberof express.Application
 */
app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.user);
    res.send(
      `<h1>Welcome, ${req.user.displayName}</h1><a href="/logout">Logout</a>` +
        `<img src="${req.user.photos[0].value}">`
    );
  } else {
    res.redirect('/');
  }
});

/**
 * Defines a route to log out users. It uses Passport's `logout` method to end
 * the user's session and then redirects the user to the home page. If there is
 * an error during the logout process, the error is handled and passed to the
 * next middleware.
 *
 * @param {express.Application} app - The Express application instance.
 * @function get
 * @memberof express.Application
 */
app.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

/**
 * Defines the route for the home page of the application, which displays a
 * welcome message and a link to initiate authentication with Google using
 * OAuth. This route is typically the entry point for users accessing the
 * application.
 *
 * @param {express.Application} app - The Express application instance.
 * @function get
 * @memberof express.Application
 */
app.get('/', (req, res) => {
  res.send(
    '<h1>Welcome to the Google OAuth Example</h1><a href="/auth/google">Login with Google</a>'
  );
});

/**
 * Starts the Express server, listening on the specified port or the default
 * port 3000 if not provided. Once the server is running, it logs a message to
 * the console indicating the server's address.
 *
 * @param {number} [port=3000] - The port number on which the server should
 * listen. If not provided, defaults to 3000.
 * @param {Function} callback - Optional callback function to be executed once
 * the server has started.
 */
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
