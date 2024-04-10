/**
 * Global Configuration is like a magic file that changes everything in the app
 * Incorrect setting in this configuration will cause the app does not run as expected
 * Please read the instruction in order to set up this configuration correctly.
 *
 * @author      Adnan Zaki
 * @copyright   Wolestech DevTeam (c) 2024
 * @since       March 2021
 * @package     Configuration
 */

// There are 3 modes available to run:
// -----------------------------------------------------------------------------------
// "development" mode means you are in truly development environment,
// you are using a dev server from node.js, non-minified UI files, etc.
// -----------------------------------------------------------------------------------
// "build" mode means you are using minified/build version of UI files. It still runs
// on your local web server, but it can be called as "production mode on local server"
// -----------------------------------------------------------------------------------
// "production" mode means you have deployed YesStudy Admin in cloud hosting or
// production server, etc. It will use different URL from your local development
// and of course using HTTPS.

// ------------------ CAUTION! -------------------------------------
// ----- Switch to "production" mode first before create -----------
// ----- build setup for production server/cloud hosting, ----------
// ----- as the bundler will use this mode for bundling the UI files. --
const port = ''

const mode = 'development' // development, build, production

// ------ WARNING! Do not touch below this line ------
/**
 * Host of API
 *
 * @returns string
 */
const host = () => {
  const path = window.location.hostname

  const protocol = mode === 'production' ? 'https' : 'http'

  return `${protocol}://${path}${port}/`
}

/**
 * Path to user interface URL
 *
 * @returns string
 */
const uiPath = () => {
  return mode === 'production' ? host() : `${host()}personal-finance/`
}

/**
 * API Base URL
 *
 * @returns string
 */
const baseUrl = () => {
  return mode === 'production'
    ? `${host()}api/public/`
    : `${host()}personal-finance/api/public/`
}

export { mode, host, uiPath, baseUrl }
