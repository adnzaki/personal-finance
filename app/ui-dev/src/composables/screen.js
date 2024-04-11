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

const checkColWidth = () => {
  return Screen.lt.sm ? 'decrease-col-size' : ''
}

const maximizedDialog = () => {
  return Screen.lt.sm ? true : false
}

const cardDialog = () => {
  return Screen.lt.sm ? {} : { width: '700px', maxWidth: '80vw' }
}

export {
  maximizedDialog,
  cardDialog,
  checkColWidth,
  wrapperPadding,
  menuWidth,
  titleSpacing,
}
