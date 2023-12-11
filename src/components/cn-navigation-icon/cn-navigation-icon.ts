/**
 * This is a wrapper lit component for the lazy loading of icons.
 */
import {customElement, property} from 'lit/decorators.js'
import {LitElement, css, html} from 'lit'
import './styles.css'

@customElement('cn-navigation-icon')
export class CnNavigationIcon extends LitElement {
  public static styles = css`
    :host span.label {
      font-size: var(--cn-font-size-small, 0.75rem);
      display: block;
      text-align: center;
    }
  `
  @property({type: String, reflect: true})
  public noun: string = ''

  @property({type: String, reflect: true})
  public label: string = ''

  public render() {
    return html`<cn-icon noun="${this.noun}" ?small=${this.label || false}></cn-icon> 
    ${this.label ? html`
      <span class="label">${this.label}</span>` : '' }`
  }
}