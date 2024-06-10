import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('cn-toggle-button')
export class CyanToggleButton extends LitElement {
    @property({ type: String, reflect: true })
    ariaPressed = 'false'

  @property({ type: Boolean, reflect: true })
    disabled = false

  @property({ type: Boolean, reflect: true })
    pressed = false

  @property({ type: String, reflect: true })
    label = ''

  render () {
    return html`<button aria-pressed="${this.pressed}">${this.label}</button>`
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      user-select: none;
    }
    :host([disabled]) {
      pointer-events: none;
      opacity: 0.33;
    }
    :host button {
      width: 100%;
      display: block;
      border: none;
      background: none;
      box-sizing: border-box;
      font-family: var(--cn-font-family-ui);
      font-weight: var(--cn-font-weight-ui);
      font-size: var(--cn-font-size-ui);
      line-height: var(--cn-line-height-ui);
      letter-spacing: var(--cn-letter-spacing-ui);
      text-align: left;
      position: relative;
      height: calc(var(--cn-grid) * 2);
      border-radius: 0;
    }
    :host button::before {
      content: '';
      position: absolute;
      top: calc(var(--cn-grid) * 0.5);
      right: calc(var(--cn-grid) * 0.5);
      width: calc(var(--cn-grid) * 2);
      height: calc(var(--cn-grid) * 1);
      border-radius: calc(var(--cn-grid) * 0.5);
      background-color: var(--cn-background-toggle-button-off);
      transition: all 0.2s ease-in-out;
    }
    :host button::after {
      content: '';
      position: absolute;
      top: calc(var(--cn-grid) * 0.5);
      right: calc(var(--cn-grid) * 1.5);
      width: calc(var(--cn-grid) * 1);
      height: calc(var(--cn-grid) * 1);
      border-radius: calc(var(--cn-grid) * 0.5);
      background-color: var(--cn-background-toggle-button-knob-off);
      transition: all 0.2s ease-in-out;
    }
    :host([aria-pressed="true"]) button::before {
      background-color: var(--cn-background-toggle-button-on);
    }
    :host([aria-pressed="true"]) button::after {
      background-color: var(--cn-background-toggle-button-knob-on);
      transform: translateX(calc(1 * var(--cn-grid)));
    }
    :host([disabled]) button::before {
      background-color: var(--cn-background-toggle-button-off) !important;
    }
    :host([disabled]) button::after {
      background-color: var(--cn-background-toggle-button-knob-off) !important;
    }
    
  `
}