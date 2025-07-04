import { defineStore } from 'pinia'
import { api, conf, timeout, createFormData } from 'src/router/http'
import { Notify, Dialog, Cookies } from 'quasar'
import { usePagingStore as paging } from 'ss-paging-vue'
import { errorNotif } from 'src/composables/notify'
import { evaluate } from 'mathjs'

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    baseUrl: 'transaction/',
    error: {},
    current: 1,
    showForm: false,
    disableButton: false,
    formType: '',
    formTitle: 'Tambah Transaksi',
    transactionId: null,
    fundSource: [],
    targetFunds: [],
    targetOwners: [],
    owners: [],
    categories: [],
    categoryName: '',
    fundId: null,
    ownerId: null,
    destinationFundId: null,
    destinationOwnerId: null,
    filter: {
      fundId: { label: 'Semua', value: 'all' },
      ownerId: { label: 'Semua', value: 'all' },
      transactionType: { label: 'Semua', value: 'all' },
      category: { label: 'Semua', value: 'all' },
      date: { label: 'Semua', value: 'all' },
      owners: [],
      categories: [],
    },
    data: {
      id_pemilik_sumber_dana: '',
      jenis_transaksi: 'expense',
      tgl_transaksi: '',
      deskripsi: '',
      nominal: 0,
      id_kategori: '',
      sumber_dana_tujuan: '',
      pemilik_dana_tujuan: '',
    },
    showFilter: false,
    filterMode: false, // whether advance filter active or not
  }),
  actions: {
    getDetail(id, next) {
      api
        .get(`${this.baseUrl}detail/${id}`)
        .then(({ data }) => {
          const {
            id_transaksi,
            id_sumber_dana,
            id_pemilik_sumber_dana,
            sumber_dana,
            category_name,
            nama_tujuan_transfer,
            ...filteredResponse
          } = data
          this.transactionId = id_transaksi

          // set selected fund source
          this.fundId = { label: sumber_dana, value: id_sumber_dana }

          if (data.jenis_transaksi === 'transfer') {
            this.getTargetFunds(id_sumber_dana, true, data.sumber_dana_tujuan)

            this.destinationFundId = {
              label: nama_tujuan_transfer.sumber_dana,
              value: data.sumber_dana_tujuan,
            }

            this.destinationOwnerId = {
              label: nama_tujuan_transfer.kepemilikan,
              value: data.pemilik_dana_tujuan,
            }
          }

          // get fund owner
          this.getOwnerByFundSource(id_sumber_dana, id_pemilik_sumber_dana)

          this.data = { ...this.data, ...filteredResponse }

          // set category name
          this.categoryName = category_name
          this.getCategories(data.id_kategori)

          this.formTitle = 'Perbarui Transaksi'
          next()
        })
        .catch(() => {
          errorNotif()
        })
    },
    getTransactions() {
      const limit = 25
      paging().state.rows = limit

      const { fundId, ownerId, transactionType, category, date } = this.filter

      const params = `${fundId.value}/${ownerId.value}/${transactionType.value}/${category.value}/${date.value}`

      paging().getData({
        lang: 'indonesia',
        limit,
        offset: this.current - 1,
        orderBy: 'tgl_transaksi',
        searchBy: 'deskripsi',
        sort: 'DESC',
        search: '',
        url: `${conf.apiPublicPath}${this.baseUrl}get-data/${params}`,
        autoReset: 500,
        beforeRequest: () => {
          paging().state.token = `Bearer ${Cookies.get(conf.cookieName)}`
        },
        onError: () => {
          errorNotif()
        },
      })
    },
    deleteTransaction(id) {
      Dialog.create({
        title: 'Hapus Transaksi',
        message: 'Anda yakin ingin menghapus transaksi ini?',
        cancel: true,
        persistent: true,
      })
        .onOk(() => {
          const notifyProgress = Notify.create({
            group: false,
            spinner: true,
            message: 'Menghapus transaksi...',
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
        position: 'top',
        timeout: 0,
      })

      this.data.nominal = this.data.nominal.toString()
      this.data.nominal = this.data.nominal.replace(/,/g, '')
      this.data.nominal = evaluate(this.data.nominal)

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
        .catch(() => {
          notifyProgress()
          errorNotif()
        })
    },
    resetForm(fromEditPage = false) {
      // ensure that the form is reset to "Add" mode
      this.transactionId = null

      this.fundId = null
      this.ownerId = null
      this.destinationFundId = null
      this.destinationOwnerId = null
      this.categories = []

      this.error = {}
      if (!fromEditPage) {
        this.current = 1
        paging().reloadData()
      }

      this.data = {
        id_pemilik_sumber_dana: '',
        jenis_transaksi: 'expense',
        tgl_transaksi: '',
        deskripsi: '',
        nominal: 0,
        id_kategori: '',
        sumber_dana_tujuan: '',
      }
    },
    getTargetFunds(from, skipDefault = false, targetFundId = null) {
      api
        .get(`${this.baseUrl}get-target-funds/${from}`)
        .then(({ data }) => {
          this.targetFunds = data
          if (data.length > 0) {
            if (!skipDefault) {
              this.destinationFundId = data[0]
              this.data.sumber_dana_tujuan = data[0].value
              this.getTargetOwners(data[0].value)
            } else {
              this.getTargetOwners(targetFundId, true)
            }
          } else {
            this.destinationFundId = null
            this.data.sumber_dana_tujuan = ''
          }
        })
        .catch(() => {
          errorNotif()
        })
    },
    getTargetOwners(destinationFundId, skipDefault = false) {
      api
        .get(`${this.baseUrl}get-owner-by-fund-id/${destinationFundId}`)
        .then(({ data }) => {
          this.targetOwners = data.owners
          if (this.targetOwners.length > 0) {
            if (!skipDefault) {
              this.destinationOwnerId = this.targetOwners[0]
              this.data.pemilik_dana_tujuan = this.targetOwners[0].value
            }
          } else {
            this.destinationFundId = null
            this.data.pemilik_dana_tujuan = ''
          }
        })
        .catch(() => {
          errorNotif()
        })
    },
    getCategories(categoryId = null) {
      const transactionType = this.filterMode
        ? this.filter.transactionType.value
        : this.data.jenis_transaksi
      api
        .get(`${this.baseUrl}get-categories/${transactionType}`)
        .then(({ data }) => {
          if (!this.filterMode) {
            this.categories = data
            if (data.length > 0 && !this.filterMode) {
              if (categoryId === null) {
                this.data.id_kategori = data[0].id
              } else {
                this.data.id_kategori = categoryId
              }
            }
          } else {
            this.filter.categories = data
          }
        })
        .catch(() => {
          errorNotif()
        })
    },
    getOwnerByFundSource(val, selected = null) {
      const fundOwnerId = selected === null ? '' : `/${selected}`
      api
        .get(`${this.baseUrl}get-owner-by-fund-id/${val}${fundOwnerId}`)
        .then(({ data }) => {
          if (!this.filterMode) {
            this.owners = data.owners
            if (this.owners.length > 0) {
              if (selected === null) {
                this.ownerId = this.owners[0]
                this.data.id_pemilik_sumber_dana = this.owners[0].value
              } else {
                this.ownerId = data.selected
                this.data.id_pemilik_sumber_dana = data.selected.value
              }
            } else {
              this.ownerId = null
              this.data.id_pemilik_sumber_dana = ''
            }
          } else {
            this.filter.owners = data.owners
          }
        })
        .catch(() => {
          errorNotif()
        })
    },
    getFundSource() {
      api
        .get(`${this.baseUrl}get-fund-source`)
        .then(({ data }) => {
          this.fundSource = data
        })
        .catch(() => {
          errorNotif()
        })
    },
  },
})
