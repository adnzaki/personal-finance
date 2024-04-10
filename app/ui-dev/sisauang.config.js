/**
 * Configuration for Actudent User Interface
 *
 * @author  Adnan Zaki | Wolestech DevTeam
 */

import { mode, host, uiPath, baseUrl } from './build.config'

const uiPort = 9200

export default {
  // API Url for admin section
  // adminAPI: `${baseUrl()}admin/`,

  // original API public path
  apiPublicPath: `${baseUrl()}`,

  // This URL will be used to redirect from
  // YesStudy authentication page into main
  // application page
  homeUrl: () => {
    return mode === 'development'
      ? `http://localhost:${uiPort}/#/dashboard`
      : `${uiPath()}app`
  },
  loginUrl: () => {
    return mode === 'development'
      ? `http://localhost:${uiPort}/#/login`
      : `${uiPath()}app/#/login`
  },

  host,
  uiPath,
  mode,

  // Cookie key name
  cookieName: 'sisauang_token',

  // Cookie expiration time in miliseconds (120 in minutes)
  cookieExp: 120 * 60 * 1000,
}
