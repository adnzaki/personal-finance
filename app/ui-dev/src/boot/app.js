import { defineBoot } from '#q-app/wrappers'
import Plugin from '@quasar/quasar-ui-qmarkdown'
import '@quasar/quasar-ui-qmarkdown/dist/index.css'

const appVersion = '1.0.0-beta.2'

export default defineBoot(({ app }) => {
  app.config.globalProperties.$appVersion = appVersion
  app.use(Plugin)
})

export { appVersion }
