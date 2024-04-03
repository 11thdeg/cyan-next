import type { CnCard } from './components/cn-card/cn-card'
import type { CnIcon } from './components/cn-icon/cn-icon'
import type { CnNavigationIcon } from './components/cn-navigation-icon/cn-navigation-icon'

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'cn-icon': CnIcon
      'cn-card': CnCard
      'cn-navigation-icon': CnNavigationIcon
    }
  }
}
