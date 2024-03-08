import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('cn-lightmode-button')
export class CnLightmodeButton extends LitElement {
  public static styles = css`
    :host {
      display: block;
      position: relative;
      height: calc(6 * var(--cn-grid-size));
      height: calc(6 * var(--cn-grid-size));
      border-radius: 50%;
      background: var(--cn-elevation-1);
      margin: 0;
      padding-top: calc(var(--cn-grid-size) / 2);
      transition: background 0.3s ease-in-out
    }
    :host(:hover) {
      background: var(--cn-elevation-2);
    }
    :host button {
      background: none;
      border: none;
    }
    :host([mode="dark"]) cn-icon {
      color: var(--chroma-primary-20);
    }
  `

  @property({ type: String, reflect: true })
  public mode = window.matchMedia("(prefers-color-scheme: dark)") ? 'dark' : 'light'

  onToggle () {
    this.mode = this.mode === 'dark' ? 'light' : 'dark'
    this.dispatchEvent(new Event(this.mode, { bubbles: true }))
    if (this.mode === 'dark') {
      document.body.classList.add('dark')
      document.body.classList.remove('light')
    }
    else {
      document.body.classList.add('light')
      document.body.classList.remove('dark')
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