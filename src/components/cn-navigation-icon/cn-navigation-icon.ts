import { LitElement, css, html } from 'lit'
/**
 * This is a wrapper lit component for the lazy loading of icons.
 */
import { customElement, property } from 'lit/decorators.js'
import './styles.css'

@customElement('cn-navigation-icon')
export class CnNavigationIcon extends LitElement {
  public static styles = css`
    :host {
      display: block;
      position: relative;
      height: var(--cn-navigation-icon-size, calc(1rem / 16 * 56));
      width: var(--cn-navigation-icon-size, calc(1rem / 16 * 56));
      padding-top: var(--cn-navigation-icon-padding-top, calc(1rem / 16 * 10));
    }
    :host([label=""]) cn-icon {
      margin-left: var(--cn-navigation-icon-margin-left, calc(1rem / 16 * 10));
    }
    :host cn-icon {
      margin-left: var(--cn-navigation-icon-margin-left, calc(1rem / 16 * 16));
      position: relative;
    }
    :host cn-icon::before {
      content: '';
      position: absolute;
      top: -8px;
      left: -8px;
      right: 0;
      bottom: 0; 
      background: var(--chroma-key-10);
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
      border-radius: 50%;
      height: var(--cn-navigation-icon-size-small, calc(1rem / 16 * 40));
      width: var(--cn-navigation-icon-size-small, calc(1rem / 16 * 40));
    }
    :host([label=""]) cn-icon::before {
      top: -10px;
      left: -10px;
      height: var(--cn-navigation-icon-size, calc(1rem / 16 * 56));
      width: var(--cn-navigation-icon-size, calc(1rem / 16 * 56));
    }
    :host(:hover) cn-icon::before {
      opacity: 0.11;
    }
    :host(:active) cn-icon::before {
      opacity: 0.22;
    }
    :host([checked]) cn-icon::before {
      opacity: 0.055;
    }
    :host .navigation-icon-label {
      height: var(--cn-navigation-icon-label-height, 1rem);
      font-size: var(--cn-font-size-small, 0.75rem);
      line-height: var(--cn-navigation-icon-label-height, 1rem);
      display: block;
      text-align: center;
      max-width: 100%;
      overflow: hidden;
      padding-top: var(--cn-navigation-icon-label-padding-top, 0.5rem);
      text-overflow: ellipsis;
      text-decoration: none;      
    }
  `
  @property({ type: String, reflect: true })
  public noun = ''

  @property({ type: String, reflect: true })
  public label = ''

  @property({ type: Boolean, reflect: true })
  public checked = false

  public render() {
    const hasLabel = this.label !== ''

    return html`<cn-icon noun="${this.noun}" ?small=${hasLabel}></cn-icon> 
    ${
      this.label
        ? html`
      <div class="navigation-icon-label">${this.label}</div>`
        : ''
    }`
  }
}
