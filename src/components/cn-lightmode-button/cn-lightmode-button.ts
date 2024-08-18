import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('cn-lightmode-button')
export class CnLightmodeButton extends LitElement {
  public static styles = css`
    :host {
      display: block;
      position: relative;
      height: calc(6 * var(--cn-grid));
      height: calc(6 * var(--cn-grid));
      border-radius: 50%;
      background: var(--background-button);
      margin: 0;
      padding-top: calc(var(--cn-grid) / 2);
      transition: background 0.3s ease-in-out
    }
    :host(:hover) {
      background: var(--background-button-hover);
    }
    :host button {
      background: none;
      border: none;
    }
    :host([mode="dark"]) cn-icon {
      color: var(--color-notify);
    }
  `

  @property({ type: String, reflect: true })
  public mode = window.matchMedia('(prefers-color-scheme: dark)')
    ? 'dark'
    : 'light'

  onToggle() {
    this.mode = this.mode === 'dark' ? 'light' : 'dark'
    this.dispatchEvent(new Event(this.mode, { bubbles: true }))
    if (this.mode === 'dark') {
      document.body.classList.add('force-dark')
      document.body.classList.remove('force-light')
    } else {
      document.body.classList.add('force-light')
      document.body.classList.remove('force-dark')
    }
  }

  public render() {
    return html`
      <button @click=${this.onToggle}>
        <cn-icon noun="moon"></cn-icon>
      </button>
    `
  }
}
