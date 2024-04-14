import { defineStore } from 'pinia'
import { api } from 'src/router/http'

export const useOwnershipStore = defineStore('ownership', {
  state: () => ({
    showAddForm: false,
    addFormTitle: 'Tambah Kepemilikan',
  }),
  actions: {
    getOwnership() {},
  },
})
