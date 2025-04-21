import conf from '../../sisauang.config'
import axios from 'axios'
import { Cookies, LoadingBar } from 'quasar'
import { storage } from 'src/composables/utils'

export const api = axios.create({ baseURL: conf.apiPublicPath })
export const msgPrefix = '[SisaUang] '
export const timeout = 3500
export const bearerToken = `Bearer ${Cookies.get(conf.cookieName)}`

api.interceptors.request.use(
  (config) => {
    if (config.url !== 'validate-login' && config.url !== 'signup') {
      if (Cookies.get(conf.cookieName) !== null) {
        config.headers.Authorization = `Bearer ${Cookies.get(conf.cookieName)}`
      }
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const validatePage = (isLoginPage: string | boolean = false) => {
  runLoadingBar()
  if (Cookies.has(conf.cookieName)) {
    const doValidation = () => {
      api
        .get('validate-page', {
          headers: {
            Authorization: `Bearer ${Cookies.get(conf.cookieName)}`,
          },
        })
        .then(({ data }) => {
          if (data.status === 503) {
            console.warn(
              msgPrefix +
                'Connection to API failed. Any request will be rejected and redirected to Login page.',
            )
            redirect()
          } else {
            console.info(
              msgPrefix +
                'Successfully established connection to SisaUang API.',
            )

            if (isLoginPage && localStorage.getItem('addAccount') === null) {
              window.location.href = conf.homeUrl()
            }

            // registration page can only be accessed from Login Page
            if (isLoginPage === 'register') {
              const canRegister = storage('canRegister')
              if (!canRegister.has() || canRegister.get() !== 1) {
                redirect()
              }
            }
          }
        })
        .catch((error) => {
          console.error(msgPrefix + 'Error:', error)
          if (!isLoginPage) redirect()
        })
    }

    window.addEventListener('load', doValidation)

    if (document.readyState === 'complete') {
      doValidation()
    }
  } else {
    console.warn(msgPrefix + 'No token provided')
    if (!isLoginPage) redirect()
  }
}

export function redirect() {
  // when the page is accessed with full reload
  // we have to wait for until the entire page is fully loaded
  window.onload = () => {
    window.location.href = conf.loginUrl()
  }
  // just go back to login page
  window.location.href = conf.loginUrl()
  window.location.reload()
  // and we use this way for SPA routing,
  // because the entire page has been fully loaded
  if (document.readyState === 'complete') {
    window.location.href = conf.loginUrl()
  }
}

export function createFormData(obj: object) {
  let formData = new FormData()

  for (let item in obj) {
    formData.append(item, obj[item])
  }

  return formData
}

type loadingBarOptions = {
  color?: string
  size?: string
  position?: 'top' | 'right' | 'bottom' | 'left'
}

export function runLoadingBar(options?: loadingBarOptions) {
  const defaultOptions: loadingBarOptions = {
    color: 'info',
    size: '4px',
    position: 'top',
  }

  if (options === undefined) {
    options = {
      color: defaultOptions.color,
      size: defaultOptions.size,
      position: defaultOptions.position,
    }
  }

  LoadingBar.setDefaults({
    color: options.color ?? defaultOptions.color,
    size: options.size ?? defaultOptions.size,
    position: options.position ?? defaultOptions.position,
  })

  LoadingBar.start()
  LoadingBar.stop()
  LoadingBar.increment(0.22)
}

export { axios, conf }
