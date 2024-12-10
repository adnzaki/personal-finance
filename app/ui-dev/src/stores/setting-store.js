import { defineStore } from 'pinia'
import { api, timeout, bearerToken, createFormData } from 'src/router/http'
import { Notify } from 'quasar'

export const useSettingStore = defineStore('setting', {
  state: () => ({
    baseUrl: 'settings/',
    data: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  }),
  actions: {
    updatePassword() {
      const endpoint = `${this.baseUrl}update-password`

      const notifyProgress = Notify.create({
        group: false,
        spinner: true,
        message: 'Mengubah password...',
        color: 'info',
        position: 'center',
        timeout: 0,
      })

      api
        .post(endpoint, this.data, {
          headers: { Authorization: bearerToken },
          transformRequest: [
            (data) => {
              return createFormData(data)
            },
          ],
        })
        .then(({ data }) => {
          notifyProgress({ timeout })
          if (data.code === 500) {
            this.error = data.msg
            notifyProgress({
              message: `Error! Silakan isi form dengan benar.`,
              color: 'negative',
              spinner: false,
            })
          } else if (data.code === 503) {
            notifyProgress({
              message: `Error! ${data.msg}`,
              color: 'negative',
              spinner: false,
            })
          } else {
            notifyProgress({
              message: 'Password berhasil diubah.',
              color: 'positive',
              spinner: false,
            })

            this.data = {
              oldPassword: null,
              newPassword: null,
              confirmNewPassword: null,
            }
          }
        })
        .catch(({ response }) => {
          notifyProgress({
            message: `Error! ${response.data.msg}`,
            color: 'negative',
            spinner: false,
          })
        })
    },
  },
})
