import { Notify } from 'quasar'

function flashAlert(message, color = 'positive', position = 'top') {
  Notify.create({
    message,
    position,
    color,
    multiline: true,
  })
}

function errorNotif() {
  flashAlert('Something went wrong, please refresh this page.', 'negative')
}

const timeout = 3500

export { flashAlert, errorNotif, timeout }
