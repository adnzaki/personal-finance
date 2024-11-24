import { Screen } from 'quasar'

const titleSpacing = () => {
  return Screen.lt.sm ? '' : 'q-mt-md'
}

const menuWidth = () => {
  return Screen.lt.sm ? 300 : 250
}

const wrapperPadding = () => {
  return Screen.lt.sm ? '' : 'q-pa-md'
}

const dashboardWrapperPadding = () => {
  return Screen.lt.sm ? '' : 'q-pa-xs'
}

const checkColWidth = () => {
  return Screen.lt.sm ? 'decrease-col-size' : ''
}

const maximizedDialog = () => {
  return Screen.lt.sm ? true : false
}

const dialogSize = () => {
  return Screen.lt.sm ? {} : { width: '700px', maxWidth: '80vw' }
}

const dense = () => {
  return Screen.lt.sm ? false : true
}

export {
  maximizedDialog,
  dialogSize,
  checkColWidth,
  wrapperPadding,
  dashboardWrapperPadding,
  menuWidth,
  titleSpacing,
  dense,
}
