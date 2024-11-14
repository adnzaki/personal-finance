export const formatter = (numberFormat, options) => {
  return new Intl.NumberFormat(numberFormat, options)
}

export const formatDecimal = (value) =>
  formatter('en-US', { style: 'decimal' }).format(value)
