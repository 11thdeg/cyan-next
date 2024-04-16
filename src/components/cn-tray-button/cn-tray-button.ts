import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('cn-tray-button')
export class CnTrayButton extends LitElement {
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
      border-radius: 50%;
    }
    :host button {
      height: var(--cn-navigation-icon-size, calc(1rem / 16 * 56));
      width: var(--cn-navigation-icon-size, calc(1rem / 16 * 56));
      background: var(--background-button);
      border: none;
      margin: 0;
      padding: 0;
      border-radius: 50%;
      transition: all 0.3s ease-in-out;
    }
    :host button:hover {
      background: var(--background-button-hover);
    }
    :host button:active {
      background: var(--background-button);
    }
    :host .state-box {
      display: block;
      margin: 2px;
      padding: 0px;
      height: 42px;
      width: var(--cn-navigation-icon-size, calc(1rem / 16 * 56));
      position: relative;
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
      background-color: var(--color-on-primary);
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
