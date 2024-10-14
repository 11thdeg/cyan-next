import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import './cn-tray-button.css'

@customElement('cn-tray-button')
export class CnTrayButton extends LitElement {
  @property({ type: String, reflect: true, attribute: 'aria-expanded' })
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
      height: var(--cn-navigation-icon-size, calc(1rem / 16 * 56));
      width: var(--cn-navigation-icon-size, calc(1rem / 16 * 56));
      border-radius: 50%;
    }
    :host button {
      height: var(--cn-navigation-icon-size, calc(1rem / 16 * 56));
      width: var(--cn-navigation-icon-size, calc(1rem / 16 * 56));
      background: none;
      border: none;
      margin: 0;
      padding: 0;
    }
    :host button::before {
      background: var(--background-button-text);
      border-radius: 50%;
      content: '';
      display: block;
      position: absolute;
      height: calc(100% - var(--cn-grid));
      width: calc(100% - var(--cn-grid));
      z-index: -1;
      top: calc(var(--cn-grid) / 2);
      left: calc(var(--cn-grid) / 2);
      transition: background 0.2s ease;
    }
    :host button:hover::before {
      background: var(--background-button-text-hover);
    }
    :host button:active::before {
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
    :host([aria-expanded='true']) .state-indicator::before  {
      transform: translate3d(0, 5px, 0) rotate(45deg);
    }
    :host([aria-expanded='true']) .state-indicator::after {
      transform: translate3d(0, -5px, 0) rotate(-45deg);
    }
    :host button:focus {
      outline: none;
    }
  `
}
