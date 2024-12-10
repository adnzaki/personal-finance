import { defineStore } from 'pinia'
import { api, bearerToken } from 'src/router/http'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    baseUrl: 'dashboard/',
    biggestFunds: {
      funds: [],
      rows: 0,
    },
    transactions: {
      expense: [],
      income: [],
      transfer: [],
    },
  }),

  actions: {
    getTransactionByCategory() {
      api
        .get(`${this.baseUrl}get-transaction-by-category`, {
          headers: {
            Authorization: bearerToken,
          },
        })
        .then(({ data }) => {
          this.transactions = data
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    },
    getBiggestFunds() {
      api
        .get(`${this.baseUrl}get-biggest-funds`, {
          headers: {
            Authorization: bearerToken,
          },
        })
        .then(({ data }) => {
          this.biggestFunds = data
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    },
  },
})
