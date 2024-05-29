import { defineStore } from 'pinia'
import {
  api,
  conf,
  timeout,
  bearerToken,
  createFormData,
} from 'src/router/http'
import { Cookies, Notify, Dialog } from 'quasar'
import { usePagingStore as paging } from 'ss-paging-vue'

export const useFundStore = defineStore('fund', {
  state: () => ({
    baseUrl: 'fund/',
    error: {},
    current: 1,
    showAddForm: false,
    showEditForm: false,
    disableButton: false,
    formTitle: 'Tambah Sumber Dana',
    data: { nama: '', kepemilikan: [] },
  }),
  actions: {
    deleteFund(id) {
      Dialog.create({
        title: 'Hapus Sumber Dana',
        message: 'Anda yakin ingin menghapus sumber dana ini?',
        cancel: true,
        persistent: true,
      })
        .onOk(() => {
          const notifyProgress = Notify.create({
            group: false,
            spinner: true,
            message: 'Menghapus data sumber dana...',
            color: 'info',
            position: 'center',
            timeout: 0,
          })

          api
            .get(`${this.baseUrl}delete/${id}`, {
              headers: { Authorization: bearerToken },
            })
            .then(({ data }) => {
              notifyProgress({
                timeout,
                message: data.msg,
                spinner: false,
              })

              if (data.code === 200) {
                notifyProgress({
                  color: 'positive',
                  icon: 'done',
                })
              } else {
                notifyProgress({
                  color: 'negative',
                  icon: 'close',
                })
              }
              paging().reloadData()
            })
            .catch((error) => {
              console.error(error)
              notifyProgress({
                message: error.message,
                color: 'negative',
                spinner: false,
                timeout,
              })
            })
        })
        .onCancel(() => {
          // console.log('Cancel')
        })
    },
    getDetail(id, next) {
      api
        .get(`${this.baseUrl}detail/${id}`, {
          headers: { Authorization: bearerToken },
        })
        .then(({ data }) => {
          this.data = data
          this.formTitle = 'Perbarui Sumber Dana'
          next()
        })
        .catch((error) => {
          console.error(error)
        })
    },
    save({ id, afterSuccess }) {
      const endpoint =
        id !== null ? `${this.baseUrl}save/${id}` : `${this.baseUrl}save`

      const notifyProgress = Notify.create({
        group: false,
        spinner: true,
        message: 'Menyimpan data sumber dana...',
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

            this.data.nama = ''

            // next action from the component
            afterSuccess()
          }
        })
    },
    getFund() {
      const limit = 25
      paging().state.rows = limit

      paging().getData({
        token: bearerToken,
        lang: 'indonesia',
        limit,
        offset: this.current - 1,
        orderBy: 'nama',
        searchBy: 'nama',
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
