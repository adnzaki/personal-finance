import { defineStore } from 'pinia'
import { ref } from 'vue'
import { conf, api, createFormData } from 'src/router/http'
import { Cookies } from 'quasar'

export const useLoginStore = defineStore('login', () => {
  const username = ref('')
  const password = ref('')
  const showMsg = ref(false)
  const msg = ref('')
  const msgClass = ref('black')

  const showPassword = ref(false)

  const saveUserLogin = (user, token) => {
    let accounts = JSON.parse(localStorage.getItem('multiAccounts')) || []

    // Cek apakah user sudah ada dalam daftar
    if (!accounts.some((acc) => acc.userId === user.id)) {
      accounts.push({
        userId: user.id,
        name: user.username,
        token, // Simpan token autentikasi user
      })
      localStorage.setItem('multiAccounts', JSON.stringify(accounts))
    }
  }

  const cookieOptions = ref({})

  const setCookieOptions = () => {
    conf.cookieExp *= 12 * 360 // keep cookie valid for 360 days

    const dt = new Date()
    let now = dt.getTime()
    let expMs = now + conf.cookieExp
    let exp = new Date(expMs)
    cookieOptions.value = {
      expires: exp.toUTCString(),
      path: '/',
      sameSite: 'None',
      secure: true,
    }
  }

  const getSavedAccounts = () => {
    return JSON.parse(localStorage.getItem('multiAccounts')) || []
  }

  function removeAccount(logout = true, name = null) {
    let accounts = getSavedAccounts()
    accounts = accounts.filter((acc) => {
      return logout
        ? acc.name !== localStorage.getItem('username')
        : acc.name !== name
    })
    localStorage.setItem('multiAccounts', JSON.stringify(accounts))
  }

  const validate = () => {
    msg.value = ''
    showMsg.value = true
    const hideMsg = () => (showMsg.value = false)

    if (username.value === '' || password.value === '') {
      msg.value = 'Username dan password wajib diisi'
      msgClass.value = 'negative'
      setTimeout(hideMsg, 6000)
    } else {
      const postData = {
        username: username.value,
        password: password.value,
      }

      msgClass.value = 'black'
      msg.value = 'Memroses autentikasi...'
      api
        .post('validate-login', postData, {
          transformRequest: [(data) => createFormData(data)],
        })
        .then(({ data }) => {
          if (data.status === 'failed') {
            msg.value = data.message
            msgClass.value = 'negative'
          } else {
            msg.value = 'Login berhasil. Mengalihkan ke halaman utama...'
            msgClass.value = 'positive'

            // set cookie
            setCookieOptions()
            Cookies.set(conf.cookieName, data.token, cookieOptions.value)

            saveUserLogin(data.user, data.token)
            localStorage.setItem('username', data.user.username)
            localStorage.removeItem('addAccount')

            // redirect to dashboard
            window.location.href = conf.homeUrl()
          }
        })
        .catch((err) => {
          msg.value = err
          msgClass.value = 'negative'
          setTimeout(hideMsg, 6000)
        })
    }
  }

  return {
    msg,
    showMsg,
    username,
    password,
    msgClass,
    showPassword,
    cookieOptions,
    validate,
    removeAccount,
    setCookieOptions,
    getSavedAccounts,
  }
})
