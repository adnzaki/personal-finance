import { defineBoot } from '#q-app/wrappers'

const appVersion = '1.0.0-alpha.9'

export default defineBoot(({ app }) => {
  app.config.globalProperties.$appVersion = appVersion
})

export { appVersion }
