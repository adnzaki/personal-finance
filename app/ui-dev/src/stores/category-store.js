import { defineStore } from 'pinia'
import {
  api,
  conf,
  timeout,
  bearerToken,
  createFormData,
} from 'src/router/http'
import { Notify, Dialog } from 'quasar'
import { usePagingStore as paging } from 'ss-paging-vue'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    baseUrl: conf.apiPublicPath + 'category/',
    hideDefault: 1,
    error: {},
    current: 1,
    showAddForm: false,
    showEditForm: false,
    disableButton: false,
    formTitle: 'Tambah Kategori',
    data: { kepemilikan: '' },
  }),

  actions: {
    toggleDefaultCategory() {
      api
        .post(
          `${this.baseUrl}update-default-visibility`,
          { value: this.hideDefault },
          {
            headers: { Authorization: bearerToken },
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
    getDetail(id, next) {},
    deleteCategory(id) {},
    getDefaultCategorySetting() {
      api
        .get(`${this.baseUrl}get-default-category-setting`, {
          headers: { Authorization: bearerToken },
        })
        .then(({ data }) => {
          this.hideDefault = data.hideDefault
        })
    },
    getCategories() {
      const limit = 25
      paging().state.rows = limit

      paging().getData({
        token: bearerToken,
        lang: 'indonesia',
        limit,
        offset: this.current - 1,
        orderBy: 'category_type',
        searchBy: 'category_name',
        sort: 'ASC',
        search: '',
        url: `${this.baseUrl}get-data/`,
        autoReset: {
          active: true,
          timeout: 500,
        },
        afterRequest: () => {
          this.getDefaultCategorySetting()
        },
      })
    },
  },
})
