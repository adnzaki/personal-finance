import { defineStore } from 'pinia'
import { api, conf, timeout, createFormData } from 'src/router/http'
import { Notify, Dialog, Cookies } from 'quasar'
import { usePagingStore as paging } from 'ss-paging-vue'
import { errorNotif } from 'src/composables/notify'

export const useFundStore = defineStore('fund', {
  state: () => ({
    baseUrl: 'fund/',
    error: {},
    current: 1,
    showAddForm: false,
    showEditForm: false,
    disableButton: false,
    formTitle: 'Tambah Sumber Dana',
    fundId: null,
    data: {
      nama: '',
      kepemilikan: [],
      ownerName: '',
      ownerId: null,
      balance: '0',
    },
    allOwners: [],
    ownerList: [],
    deletedBalance: [],
  }),
  actions: {
    addBalance() {
      if (this.data.balance !== '') {
        this.data.kepemilikan.push({
          name: this.data.ownerName,
          id_kepemilikan: this.data.ownerId,
          jumlah_dana: '0',
          status: 'new',
        })

        // remove selected owner
        const index = this.ownerList.findIndex(
          (item) => item.id === this.data.ownerId,
        )
        if (index > -1) {
          this.ownerList.splice(index, 1)
        }

        // set default value for ownerId and ownerName
        if (this.ownerList.length > 0) {
          this.data.ownerId = this.ownerList[0].id
          this.data.ownerName = this.ownerList[0].kepemilikan
        }
      }
    },
    removeBalance(owner) {
      // remove selected owner
      const index = this.data.kepemilikan.findIndex(
        (item) => item.id_kepemilikan === owner.id_kepemilikan,
      )
      if (index > -1) {
        this.data.kepemilikan.splice(index, 1)
      }

      this.deletedBalance.push({
        ownerId: owner.id_kepemilikan,
        fundId: owner.id_sumber_dana,
      })

      this.getPemilik()
    },
    getPemilik(next = null) {
      api
        .get(`${this.baseUrl}get-pemilik`)
        .then(({ data }) => {
          this.allOwners = data
          if (next) next(data)

          // filter existing ID first
          const existingIds = new Set(
            this.data.kepemilikan.map((item) => item.id_kepemilikan),
          )
          const filteredData = data.filter((item) => !existingIds.has(item.id))
          this.ownerList = filteredData

          if (this.ownerList.length > 0) {
            this.data.ownerName = this.ownerList[0].kepemilikan
            this.data.ownerId = this.ownerList[0].id
          }
        })
        .catch(() => {
          errorNotif()
        })
    },
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
          this.data.nama = data.fundSource.nama
          this.data.kepemilikan = data.ownership
          this.data.ownerName = data.ownership.kepemilikan
          this.data.ownerId = data.ownership.id_kepemilikan
          if (data.ownership.length > 0) {
            this.data.balance = data.ownership.jumlah_dana
          }

          this.fundId = data.fundSource.id

          this.formTitle = 'Perbarui Sumber Dana'
          next()
        })
        .catch(() => {
          errorNotif()
        })
    },
    save(afterSuccess) {
      const endpoint =
        this.fundId !== null
          ? `${this.baseUrl}save/${this.fundId}`
          : `${this.baseUrl}save`

      const notifyProgress = Notify.create({
        group: false,
        spinner: true,
        message: 'Menyimpan data sumber dana...',
        color: 'info',
        position: 'top',
        timeout: 0,
      })

      const ownership = this.data.kepemilikan.filter(
        (item) => item.status === 'new',
      )

      const data = {
        nama: this.data.nama,
        kepemilikan: JSON.stringify(ownership),
        ownerName: this.data.ownerName,
        ownerId: this.data.ownerId,
        balance: this.data.balance,
        deletedBalance: JSON.stringify(this.deletedBalance),
      }

      api
        .post(endpoint, data, {
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
        .catch(() => {
          notifyProgress()
          errorNotif()
        })
    },
    getFund(next = null) {
      const limit = 25
      paging().state.rows = limit

      paging().getData({
        lang: 'indonesia',
        limit,
        offset: this.current - 1,
        orderBy: 'nama',
        searchBy: 'nama',
        sort: 'ASC',
        search: '',
        url: `${conf.apiPublicPath}${this.baseUrl}get-data/`,
        autoReset: 500,
        beforeRequest: () => {
          paging().state.token = `Bearer ${Cookies.get(conf.cookieName)}`
        },
        afterRequest: () => {
          if (next) next()
        },
        onError: () => {
          errorNotif()
        },
      })
    },
    resetForm() {
      this.error = {}
      this.current = 1
      this.deletedBalance = []
      this.data.kepemilikan = []
      paging().reloadData()
    },
  },
})
