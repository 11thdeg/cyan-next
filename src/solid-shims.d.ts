import { CnCard } from './components/CnCard'
import { CnIcon } from './components/CnIcon'
import { CnNavigationIcon } from './components/CnNavigationIcon'

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'cn-icon': CnIcon
      'cn-card': CnCard
      'cn-navigation-icon': CnNavigationIcon
    }
  }
}
