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
  flashAlert(
    'Tidak dapat terhubung dengan server, silakan refresh halaman ini.',
    'negative',
  )
}

const timeout = 3500

export { flashAlert, errorNotif, timeout }
