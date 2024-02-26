import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('cn-app-menu-button')
export class CnAppMenuButton extends LitElement {
  @property({ type: String, reflect: true })
  ariaExpanded = 'false'

  @property({ type: String, reflect: true })
  ariaLabel = 'Menu'

  @property({ type: String, reflect: true })
  ariaControls = '#cn-tray'

  toggleOpen() {
    this.ariaExpanded = this.ariaExpanded === 'true' ? 'false' : 'true'
    this.dispatchEvent(new CustomEvent('change', { detail: this.ariaExpanded }))
  }

  render() {
    return html`
      <button type="button" 
        aria-label="${this.ariaLabel}" 
        aria-controls=${this.ariaControls}
        @click="${this.toggleOpen}">
      <span class="state-box">
        <span class="state-indicator"></span>
      </span>
    </button>`
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
      height: var(--cn-navigation-icon-size, calc(1rem / 16 * 56));
      width: var(--cn-navigation-icon-size, calc(1rem / 16 * 56));
      margin-top: var(--cn-navigation-icon-padding-top, calc(1rem / 16 * 10));
      border-radius: 50%;
    }
    :host button {
      height: var(--cn-navigation-icon-size, calc(1rem / 16 * 56));
      width: var(--cn-navigation-icon-size, calc(1rem / 16 * 56));
      background: hsla(var(--chroma-key-10-hsl), 11%);
      border: none;
      margin: 0;
      padding: 0;
      border-radius: 50%;
    }
    :host button:hover {
      background: hsla(var(--chroma-key-10-hsl), 17%);
    }
    :host .state-box {
      display: block;
      margin: 2px;
      padding: 0px;
      height: 42px;
      width: var(--cn-navigation-icon-size, calc(1rem / 16 * 56));
      background-color: var(--cyan-color-nav-menu-button-background);
      border-radius: 50%;
      position: relative;
      transition: background-color 0.2s ease-in-out; 
    }
    :host .state-box:hover {
      background-color: var(--cyan-color-nav-menu-button-background-hover);
    }
    :host .state-box:active {
      background-color: var(--cyan-color-nav-menu-button-background-active);
    }
    :host([open]) .state-box {
      background: var(--cyan-background-nav-menu-button-open);
    }
    :host .state-indicator {
      display: block;
      position: absolute;
      top: 10px;
      left: calc(1rem / 16 * 14);
      height: 24px;
      width: 24px;
    }
    .state-indicator::before, .state-indicator::after {
      content: "";
      display: block;
      position: absolute;
      background-color: currentColor;
      width: 24px;
      height: 4px;
      border-radius: 2px;
      transition: transform 0.2s ease-in-out;
    }
    .state-indicator::before {
      top: 5px;
    }
    .state-indicator::after {
      bottom: 5px;
    }
    :host([ariaExpanded='true']) {
      background: var(--chroma-key-80)
    }
    :host([ariaExpanded='true']) .state-indicator::before  {
      transform: translate3d(0, 5px, 0) rotate(45deg);
    }
    :host([ariaExpanded='true']) .state-indicator::after {
      transform: translate3d(0, -5px, 0) rotate(-45deg);
    }
    :host button:focus {
      outline: none;
    }
    :host img {
      pointer-events: none;
      width: 52px;
      position: absolute;
      top: -2px;
      left: -2px;
      opacity: 0.17;
      z-index: 3;
    }
    :host([open]) img {
      opacity: 0.22;
    }
  `
}
