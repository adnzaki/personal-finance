import { defineStore } from 'pinia'
import { api, conf, timeout, createFormData } from 'src/router/http'
import { Notify, Dialog, Cookies } from 'quasar'
import { usePagingStore as paging } from 'ss-paging-vue'
import { errorNotif } from 'src/composables/notify'

export const useOwnershipStore = defineStore('ownership', {
  state: () => ({
    baseUrl: 'ownership/',
    error: {},
    current: 1,
    showAddForm: false,
    showEditForm: false,
    disableButton: false,
    formTitle: 'Tambah Kepemilikan',
    data: { kepemilikan: '' },
  }),
  actions: {
    deleteOwnership(id) {
      Dialog.create({
        title: 'Hapus Kepemilikan',
        message: 'Anda yakin ingin menghapus kepemilikan ini?',
        cancel: true,
        persistent: true,
      })
        .onOk(() => {
          const notifyProgress = Notify.create({
            group: false,
            spinner: true,
            message: 'Menghapus data kepemilikan...',
            color: 'info',
            position: 'top',
            timeout: 0,
          })

          api
            .get(`${this.baseUrl}delete/${id}`)
            .then(({ data }) => {
              notifyProgress({ timeout, message: data.msg, spinner: false })

              if (data.code === 200) {
                notifyProgress({ color: 'positive', icon: 'done' })
              } else {
                notifyProgress({ color: 'negative', icon: 'close' })
              }
              paging().reloadData()
            })
            .catch(() => {
              notifyProgress()
              errorNotif()
            })
        })
        .onCancel(() => {
          // console.log('Cancel')
        })
    },
    getDetail(id, next) {
      api
        .get(`${this.baseUrl}detail/${id}`)
        .then(({ data }) => {
          this.data = data
          this.formTitle = 'Perbarui Kepemilikan'
          next()
        })
        .catch(() => {
          errorNotif()
        })
    },
    save({ id, afterSuccess }) {
      const endpoint =
        id !== null ? `${this.baseUrl}save/${id}` : `${this.baseUrl}save`

      const notifyProgress = Notify.create({
        group: false,
        spinner: true,
        message: 'Menyimpan data kepemilikan...',
        color: 'info',
        position: 'top',
        timeout: 0,
      })

      api
        .post(endpoint, this.data, {
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

            this.data.kepemilikan = ''

            // next action from the component
            afterSuccess()
          }
        })
        .catch(() => {
          notifyProgress()
          errorNotif()
        })
    },
    getOwnership() {
      const limit = 25
      paging().state.rows = limit

      paging().getData({
        lang: 'indonesia',
        limit,
        offset: this.current - 1,
        orderBy: 'kepemilikan',
        searchBy: 'kepemilikan',
        sort: 'ASC',
        search: '',
        url: `${conf.apiPublicPath}${this.baseUrl}get-data`,
        autoReset: 500,
        beforeRequest: () => {
          paging().state.token = `Bearer ${Cookies.get(conf.cookieName)}`
        },
        onError: () => {
          errorNotif()
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
