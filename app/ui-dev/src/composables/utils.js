import colors from './color-pallete'
import LocalStorageHelper from './storage'

export const storage = (key) => new LocalStorageHelper(key)

export const formatter = (numberFormat, options) => {
  return new Intl.NumberFormat(numberFormat, options)
}

export const formatDecimal = (value) =>
  value === '0' || value === null
    ? '-'
    : formatter('en-US', { style: 'decimal' }).format(value)

export const validateNumber = (val, allowArithmetic = false) => {
  const regex = allowArithmetic ? /^(\d+(,\d+)*|[+\-*/])+$/ : /^\d+(,\d+)*$/
  return regex.test(val)
}

export function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}

export const indonesiaDate = {
  days: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
  months: [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ],
  daysShort: ['Mgg', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
  monthsShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Agu',
    'Sep',
    'Okt',
    'Nov',
    'Des',
  ],
}
