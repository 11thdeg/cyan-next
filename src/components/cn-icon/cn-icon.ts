/**
 * This is a wrapper lit component for the lazy loading of icons.
 */
import {customElement, property} from 'lit/decorators.js'
import {LitElement, css, html} from 'lit'
import './styles.css'

@customElement('cn-icon')
export class CnIcon extends LitElement {
  public static styles = css`
    :host {
      color: var(--cn-color-key, currentColor);
      height: var(--cn-icon-size, 128px);
      width: var(--cn-icon-size, 128px);
      display: block;
    }
    :host([xsmall]) {
      height: var(--cn-icon-size-xsmall);
      width: var(--cn-icon-size-xsmall);
    }
    :host([small]) {
      height: var(--cn-icon-size-small);
      width: var(--cn-icon-size-small);
    }
    :host([large]) {
      height: var(--cn-icon-size-large);
      width: var(--cn-icon-size-large);
    }
    :host([xlarge]) {
      height: var(--cn-icon-size-xlarge);
      width: var(--cn-icon-size-xlarge);
    }
    svg {
      height: 100%;
      width: 100%;
    }`

  @property({type: String, reflect: true})
  public noun: string = ''

  @property({type: Boolean, reflect: true})
    xsmall?: boolean = false

  @property({type: Boolean, reflect: true})
    small?: boolean = false

  @property({type: Boolean, reflect: true})
    large?: boolean = false
  
  @property({type: Boolean, reflect: true})
    xlarge?: boolean = false

  protected render() {
    const iconUrl = `./icons/${this.noun}.svg#icon`
    return html`<svg
      viewBox="0 0 128 128"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="ariaNoun">
      <title id="ariaNoun">${this.noun}</title>
      <use href=${iconUrl}></use>
    </svg>`
  }
}

// Make this available to react/preact/solid
declare global {
  interface HTMLElementTagNameMap {
    'cn-icon': CnIcon;
  }
  /* eslint-disable @typescript-eslint/no-namespace */
  namespace JSX {
    interface IntrinsicElements {
      'cn-icon': CnIcon;
    }
  }
}