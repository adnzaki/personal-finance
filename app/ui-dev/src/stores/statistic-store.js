import { defineStore } from 'pinia'
import { api } from 'src/router/http'
import { date, Screen } from 'quasar'
// import { usePagingStore as paging } from 'ss-paging-vue'
import { indonesiaDate } from 'src/composables/utils'

export const useStatisticStore = defineStore('statistic', {
  state: () => ({
    baseUrl: 'statistic/',
    range: {
      label: 'Bulanan',
      value: 'monthly',
    },
    dateRange: Date.now(),
    dateRangeText: '',
    balanceSummary: [],
    totalIncome: 0,
    totalExpense: 0,
    netIncome: 0,
    biggestTransaction: {
      response: [],
      category: [],
      totalTransaction: [],
    },
    allTransactions: {
      income: [],
      expense: [],
    },
  }),
  actions: {
    getTotalBalance() {
      api
        .get(`${this.baseUrl}get-total-balance/${this.dateRange}`)
        .then(({ data }) => {
          this.balanceSummary = data
        })
    },
    getAllTransactionByCategory(dateRange) {
      api
        .get(`${this.baseUrl}get-all-transaction-by-category/${dateRange}`)
        .then(({ data }) => {
          this.allTransactions = data
        })
    },
    getBiggestTransactionByCategory() {
      api
        .get(
          `${this.baseUrl}get-biggest-transaction-by-category/${this.dateRange}`,
        )
        .then(({ data }) => {
          this.biggestTransaction = data
        })
    },
    getTotalIncomeExpense() {
      api
        .get(`${this.baseUrl}get-total-income-expense/${this.dateRange}`)
        .then(({ data }) => {
          this.totalIncome = data.total_income
          this.totalExpense = data.total_expense
          this.netIncome = data.net_income
        })
    },
    setDateFromTodayDate() {
      let splitDateRange = this.dateRange.split('-')
      splitDateRange[2] = new Date().getDate()
      this.dateRange = splitDateRange.join('-')
    },
    setDateRange() {
      if (this.range.value === 'daily') {
        this.setDateFromTodayDate()
        this.dateRangeText = this.formatDateStr(this.dateRange)
        this.dateRange = this.formatDateValue(this.dateRange)
      } else if (this.range.value === 'weekly') {
        this.setDateFromTodayDate()
        const weekInterval = this.getWeeklyRange(this.dateRange)
        const startDate = weekInterval.start
        const endDate = weekInterval.end

        this.dateRangeText = `${this.formatDateStr(startDate)} - ${this.formatDateStr(endDate)}`
        this.dateRange = `${this.formatDateValue(startDate)}_${this.formatDateValue(endDate)}`
      } else if (this.range.value === 'monthly') {
        const monthStart = date.startOfDate(this.dateRange, 'month')
        const monthEnd = date.endOfDate(this.dateRange, 'month')

        this.dateRangeText = `${this.formatDateStr(monthStart)} - ${this.formatDateStr(monthEnd)}`
        this.dateRange = `${this.formatDateValue(monthStart)}_${this.formatDateValue(monthEnd)}`
      } else if (this.range.value === 'yearly') {
        const yearStart = date.startOfDate(this.dateRange, 'year')
        const yearEnd = date.endOfDate(this.dateRange, 'year')

        this.dateRangeText = `${this.formatDateStr(yearStart)} - ${this.formatDateStr(yearEnd)}`
        this.dateRange = `${this.formatDateValue(yearStart)}_${this.formatDateValue(yearEnd)}`
      }
    },
    getWeeklyRange(date) {
      // Ensure the input is a Date object
      const currentDate = new Date(date)

      // Calculate the distance from Sunday (day 0)
      const dayOfWeek = currentDate.getDay() // 0 for Sunday, 6 for Saturday

      // Date of Sunday (start of the week)
      const sunday = new Date(currentDate)
      sunday.setDate(currentDate.getDate() - dayOfWeek)

      // Date of Saturday (end of the week)
      const saturday = new Date(currentDate)
      saturday.setDate(currentDate.getDate() + (6 - dayOfWeek))

      // Format the result (optional)
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
      return {
        start: sunday.toLocaleDateString('en-CA', options), // Format YYYY-MM-DD
        end: saturday.toLocaleDateString('en-CA', options),
      }
    },
    formatDateValue(val) {
      return date.formatDate(val, 'YYYY-MM-DD', indonesiaDate)
    },
    formatDateStr(val) {
      const format = Screen.lt.sm ? 'DD MMM YYYY' : 'DD MMMM YYYY'
      return date.formatDate(val, format, indonesiaDate)
    },
  },
})
