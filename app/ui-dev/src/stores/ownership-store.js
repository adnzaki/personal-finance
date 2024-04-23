import { defineStore } from 'pinia'
import {
  api,
  conf,
  timeout,
  bearerToken,
  createFormData,
} from 'src/router/http'
import { Cookies, Notify } from 'quasar'
import { usePagingStore as paging } from 'ss-paging-vue'

export const useOwnershipStore = defineStore('ownership', {
  state: () => ({
    baseUrl: 'ownership/',
    error: {},
    current: 1,
    showAddForm: false,
    showEditForm: false,
    disableButton: false,
    addFormTitle: 'Tambah Kepemilikan',
    data: { kepemilikan: '' },
  }),
  actions: {
    save({ id, afterSuccess }) {
      const endpoint =
        id !== null ? `${this.baseUrl}save/${id}` : `${this.baseUrl}save`

      const notifyProgress = Notify.create({
        group: false,
        spinner: true,
        message: 'Menyimpan data kepemilikan...',
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
          } else {
            this.resetForm()
            notifyProgress({
              message: data.msg,
              color: 'positive',
              icon: 'done',
              spinner: false,
            })

            // next action from the component
            afterSuccess()
          }
        })
    },
    getOwnership() {
      const limit = 25
      paging().state.rows = limit

      paging().getData({
        token: bearerToken,
        lang: 'indonesia',
        limit,
        offset: this.current - 1,
        orderBy: 'kepemilikan',
        searchBy: 'kepemilikan',
        sort: 'ASC',
        search: '',
        url: `${conf.apiPublicPath}${this.baseUrl}get-data/`,
        autoReset: {
          active: true,
          timeout: 500,
        },
      })
    },
    resetForm() {
      this.error = {}
      this.current = 1
      paging().reloadData()
    },
  },
})
