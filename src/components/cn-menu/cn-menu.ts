import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import './light-dom.css'

@customElement('cn-menu')
export class CnMenu extends LitElement {
  static styles = css`
    .cn-menu {
      position: relative;
      display: inline-block;
    }
    /* Target the button directly */
    .cn-menu button { 
      border: none;
      cursor: pointer;
      color: var(--color-on-primary);
      background: var(--background-button-text);
      border-radius: 50%;
      width: calc(6 * var(--cn-grid));
      height: calc(6 * var(--cn-grid));
      padding: 0;
      margin: 0;
      display: flex;
        justify-content: center;
        align-items: center;
    }
    .cn-menu button:hover {
        background: var(--background-button-text-hover);
        box-shadow: var(--shadow-button-hover);
        color: var(---cn-color-on-button-hover);
    }
    .cn-menu button:active {
        background: var(--background-button-text-active);
        color: var(---cn-color-on-button-active);
    }

    .cn-menu-content {
      display: none;
      position: absolute;
      background-color: var(--background-elevation-2);
      min-width: 160px;
      box-shadow: var(--shadow-elevation-2);
      z-index: 1;
      top: calc(2 * var(--cn-grid));
      right: calc(2 * var(--cn-grid));
      padding: 0;
      border-radius: var(--cn-border-radius);
      overflow: hidden;
    }
    .show {
      display: block;
    }
  `

  @property({ type: String }) value = ''

  private _showMenu = false

  render() {
    return html`
      <div class="cn-menu">
        <button type="button" class="text icon" @click="${this._toggleMenu}"> 
          <cn-icon noun="kebab"></cn-icon>
        </button>
        <div class="cn-menu-content ${this._showMenu ? 'show' : ''}">
          <slot @slotchange="${this._handleSlotChange}"></slot>
        </div>
      </div>
    `
  }

  private _toggleMenu() {
    this._showMenu = !this._showMenu
    this.requestUpdate() // This line is crucial!
  }

  private _handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement
    const elements = slot.assignedElements()

    for (const el of elements) {
      el.addEventListener('click', () => {
        const textContent = el.textContent?.trim()
        this.value = textContent ?? ''
        this._showMenu = false
        this.dispatchEvent(
          new CustomEvent('option-selected', { detail: { value: this.value } }),
        )
      })
    }
  }

  // New method to handle document clicks
  private _handleDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement
    if (this._showMenu && !this.contains(target)) {
      this._showMenu = false
      this.requestUpdate()
    }
  }

  // Add event listeners in connectedCallback
  connectedCallback() {
    super.connectedCallback()
    document.addEventListener('click', this._handleDocumentClick.bind(this))
  }

  // Remove event listener in disconnectedCallback
  disconnectedCallback() {
    super.disconnectedCallback()
    document.removeEventListener('click', this._handleDocumentClick.bind(this))
  }
}
