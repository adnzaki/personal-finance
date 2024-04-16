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
// import RowDropdown from 'components/RowDropdown.vue'
// import DeleteConfirm from 'components/DeleteConfirm.vue'
// import ErrorMsg from 'src/components/ErrorMessage.vue'
// import EmployeePhoto from 'src/pages/employee/EmployeePhoto.vue'
// import DropdownSearch from 'components/DropdownSearch.vue'
// import BtnTooltip from 'components/BtnTooltip.vue'
// import SpinnerLoading from 'components/Spinner.vue'

export default ({ app }) => {
  app.component('search-box', SearchBox)
  app.component('data-nav', DataNavigator)
  app.component('logout-btn', LogoutButton)
  // app.component('row-dropdown', RowDropdown)
  // app.component('delete-confirm', DeleteConfirm)
  // app.component('ac-error', ErrorMsg)
  // app.component('employee-photo', EmployeePhoto)
  // app.component('dropdown-search', DropdownSearch)
  // app.component('btn-tooltip', BtnTooltip)
  // app.component('ac-spinner', SpinnerLoading)
}
