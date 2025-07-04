import { defineStore } from 'pinia'
import { api, conf, timeout, createFormData } from 'src/router/http'
import { Notify, Dialog, Cookies } from 'quasar'
import { usePagingStore as paging } from 'ss-paging-vue'
import { errorNotif } from 'src/composables/notify'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    baseUrl: 'category/',
    hideDefault: 1,
    error: {},
    current: 1,
    showAddForm: false,
    showEditForm: false,
    disableButton: false,
    formTitle: 'Tambah Kategori',
    data: { category_name: '', category_type: 'expense' },
  }),

  actions: {
    deleteCategory(id) {
      Dialog.create({
        title: 'Hapus Kategori',
        message: 'Anda yakin ingin menghapus kategori ini?',
        cancel: true,
        persistent: true,
      })
        .onOk(() => {
          const notifyProgress = Notify.create({
            group: false,
            spinner: true,
            message: 'Menghapus kategori...',
            color: 'info',
            position: 'top',
            timeout: 0,
          })

          api
            .get(`${this.baseUrl}delete/${id}`)
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
          this.formTitle = 'Perbarui Kategori'
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
        message: 'Menyimpan kategori...',
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

            this.data = {
              category_name: '',
              category_type: 'expense',
            }

            // next action from the component
            afterSuccess()
          }
        })
    },
    resetForm() {
      this.error = {}
      this.current = 1
      paging().reloadData()
    },
    toggleDefaultCategory() {
      api
        .post(
          `${this.baseUrl}update-default-visibility`,
          { value: this.hideDefault },
          {
            transformRequest: [
              (data) => {
                return createFormData(data)
              },
            ],
          },
        )
        .then(({ data }) => {
          if (data.code === 200) {
            this.getCategories()
          }
        })
    },
    getDefaultCategorySetting() {
      api
        .get(`${this.baseUrl}get-default-category-setting`)
        .then(({ data }) => {
          this.hideDefault = data.hideDefault
        })
    },
    getCategories() {
      const limit = 25
      paging().state.rows = limit

      paging().getData({
        lang: 'indonesia',
        limit,
        offset: this.current - 1,
        orderBy: 'category_type',
        searchBy: 'category_name',
        sort: 'ASC',
        search: '',
        url: `${conf.apiPublicPath}${this.baseUrl}get-data`,
        autoReset: 500,
        beforeRequest: () => {
          paging().state.token = `Bearer ${Cookies.get(conf.cookieName)}`
        },
        afterRequest: () => {
          this.getDefaultCategorySetting()
        },
        onError: () => {
          errorNotif()
        },
        debug: true,
      })
    },
  },
})
