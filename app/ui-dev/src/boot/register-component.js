/**
 * Global component registration,
 * so we do not need to register them on each main component
 *
 * @author    Adnan Zaki
 * @copyright Wolestech (c) 2024
 * @since     2021
 */

import SearchBox from 'components/SearchBox.vue'
import DataNavigator from 'components/DataNavigator.vue'
import LogoutButton from 'components/LogoutButton.vue'
import DropdownSearch from 'components/DropdownSearch.vue'
import SaveButton from 'components/SaveButton.vue'
import DataNavMobile from 'components/DataNavMobile.vue'
import AppVersion from 'src/components/AppVersion.vue'

export default ({ app }) => {
  app.component('search-box', SearchBox)
  app.component('data-nav', DataNavigator)
  app.component('logout-btn', LogoutButton)
  app.component('dropdown-search', DropdownSearch)
  app.component('save-btn', SaveButton)
  app.component('data-nav-mobile', DataNavMobile)
  app.component('app-version', AppVersion)
}
