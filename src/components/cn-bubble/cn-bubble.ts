import { LitElement, css, html } from 'lit'
import './light-dom.css'
/**
 * This is a wrapper lit component for the lazy loading of icons.
 */
import { customElement, property } from 'lit/decorators.js'

@customElement('cn-bubble')
export class CnBubble extends LitElement {
  @property({ type: Boolean, reflect: true })
  public reply = false

  public render() {
    return html`
      <slot></slot>
    `
  }

  static styles = css`
    :host {
      display: block;
      background: var(--color-bubble);
      color: var(--color-on-bubble);
      border-radius: 0 var(--cn-border-radius) var(--cn-border-radius) var(--cn-border-radius); 
      padding: var(--cn-grid);
      margin: 0;
      position: relative;
      box-sizing: border-box;
    }
    :host(:not([reply])) {
      margin-left: var(--cn-gap);
    }
    :host(:not([reply])):after {
      content: "";
      position: absolute;
      top: 0;
      border-style: solid;
      border-color: transparent var(--color-bubble);
      left: calc(-1 * var(--cn-gap));
      border-width: 0 var(--cn-gap) var(--cn-gap) 0;
      bottom: auto;
    }
    :host([reply]){
      background: var(--color-reply-bubble);
      border-radius: var(--cn-border-radius) 0px var(--cn-border-radius) var(--cn-border-radius);
      margin-right: var(--cn-gap);
    }
    :host([reply]):after {
      content: "";
      position: absolute;
      top: 0;
      border-style: solid;
      border-color: transparent var(--color-reply-bubble);
      right: calc(-1 * var(--cn-gap));
      border-width: 0 0 var(--cn-gap) var(--cn-gap) ;
      bottom: auto;
    }`
}
