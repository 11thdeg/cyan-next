import { Component } from 'solid-js'; 
import 'solid-js/types/jsx'; 
import { CnCard, CnIcon, CnNavigationIcon } from './main';

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'cn-icon': CnIcon,
      'cn-card': CnCard,
      'cn-navigation-icon': CnNavigationIcon
    }
  }
}