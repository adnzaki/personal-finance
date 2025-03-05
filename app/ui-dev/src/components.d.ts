// src/components.d.ts
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    SearchBox: (typeof import('components/SearchBox.vue'))['default']
    DataNav: (typeof import('components/DataNavigator.vue'))['default']
    LogoutBtn: (typeof import('components/LogoutButton.vue'))['default']
    DropdownSearch: (typeof import('components/DropdownSearch.vue'))['default']
    SaveBtn: (typeof import('components/SaveButton.vue'))['default']
    DataNavMobile: (typeof import('components/DataNavMobile.vue'))['default']
  }
}

export {}
