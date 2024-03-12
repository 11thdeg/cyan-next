import { CnCard } from './components/cn-card/cn-card'
import { CnIcon } from './components/cn-icon/cn-icon'
import { CnNavigationIcon } from './components/cn-navigation-icon/cn-navigation-icon'

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'cn-icon': CnIcon
      'cn-card': CnCard
      'cn-navigation-icon': CnNavigationIcon
    }
  }
}
