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
    targetFunds: [],
    targetOwners: [],
    owners: [],
    categories: [],
    fundId: null,
    ownerId: null,
    destinationFundId: null,
    destinationOwnerId: null,
    data: {
      id_sumber_dana: '',
      id_pemilik_sumber_dana: '',
      jenis_transaksi: 'expense',
      tgl_transaksi: '',
      deskripsi: '',
      nominal: 0,
      id_kategori: '',
      sumber_dana_tujuan: '',
      pemilik_dana_tujuan: '',
    },
  }),
  actions: {
    save(afterSuccess) {
      const endpoint =
        this.transactionId !== null
          ? `${this.baseUrl}save/${this.transactionId}`
          : `${this.baseUrl}save`

      const notifyProgress = Notify.create({
        group: false,
        spinner: true,
        message: 'Menyimpan transaksi...',
        color: 'info',
        position: 'center',
        timeout: 0,
      })

      this.data.nominal = this.data.nominal.replace(/,/g, '')

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
              message: `Error! Silakan lengkapi data transaksi.`,
              color: 'negative',
              spinner: false,
            })
          } else {
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
    resetForm() {
      this.error = {}
      this.current = 1
      //paging().reloadData()
      this.data = {
        id_sumber_dana: '',
        id_pemilik_sumber_dana: '',
        jenis_transaksi: 'expense',
        tgl_transaksi: '',
        deskripsi: '',
        nominal: 0,
        id_kategori: '',
        sumber_dana_tujuan: '',
      }
    },
    getTargetFunds(from) {
      api
        .get(`${this.baseUrl}get-target-funds/${from}`, {
          headers: { Authorization: bearerToken },
        })
        .then(({ data }) => {
          this.targetFunds = data
          if (data.length > 0) {
            this.destinationFundId = data[0]
            this.data.sumber_dana_tujuan = data[0].value
            this.getTargetOwners(data[0].value)
          } else {
            this.destinationFundId = null
            this.data.sumber_dana_tujuan = ''
          }
        })
    },
    getTargetOwners(destinationFundId) {
      api
        .get(`${this.baseUrl}get-owner-by-fund-id/${destinationFundId}`, {
          headers: { Authorization: bearerToken },
        })
        .then(({ data }) => {
          this.targetOwners = data
          if (data.length > 0) {
            this.destinationOwnerId = data[0]
            this.data.pemilik_dana_tujuan = data[0].value
          } else {
            this.destinationFundId = null
            this.data.pemilik_dana_tujuan = ''
          }
        })
    },
    getCategories() {
      api
        .get(`${this.baseUrl}get-categories/${this.data.jenis_transaksi}`, {
          headers: { Authorization: bearerToken },
        })
        .then(({ data }) => {
          this.categories = data
          if (data.length > 0) {
            this.data.id_kategori = data[0].id
          }
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
            this.ownerId = data[0]
            this.data.id_pemilik_sumber_dana = data[0].value
          } else {
            this.ownerId = null
            this.data.id_pemilik_sumber_dana = ''
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
