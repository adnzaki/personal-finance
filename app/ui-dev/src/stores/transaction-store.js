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

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    baseUrl: 'transaction/',
    error: {},
    current: 1,
    showAddForm: false,
    showEditForm: false,
    disableButton: false,
    formTitle: 'Tambah Transaksi',
    transactionId: null,
    fundSource: [],
    owners: [],
    categories: [],
    data: {
      id_sumber_dana: null,
      id_kepemilikan: null,
      jenis_transaksi: 'expense',
      tgl_transaksi: null,
      deskripsi: '',
      nominal: 0,
      id_kategori: null,
    },
  }),
  actions: {
    getCategories() {
      api
        .get(`${this.baseUrl}get-categories/${this.data.jenis_transaksi}`, {
          headers: { Authorization: bearerToken },
        })
        .then(({ data }) => {
          this.categories = data
        })
    },
    getOwnerByFundSource(val) {
      api
        .get(`${this.baseUrl}get-owner-by-fund-id/${val}`, {
          headers: { Authorization: bearerToken },
        })
        .then(({ data }) => {
          this.owners = data
          if (data.length > 0) {
            this.data.id_kepemilikan = data[0]
          } else {
            this.data.id_kepemilikan = null
          }
        })
    },
    getFundSource() {
      api
        .get(`${this.baseUrl}get-fund-source`, {
          headers: { Authorization: bearerToken },
        })
        .then(({ data }) => {
          this.fundSource = data
        })
        .catch((error) => {
          console.error(error)
        })
    },
  },
})
