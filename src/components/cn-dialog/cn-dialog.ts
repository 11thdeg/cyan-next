import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import './overrides.css'

@customElement('cn-dialog')
export class CnDialog extends LitElement {
  @property({ type: String, reflect: true })
  returnValue = ''
  @property({ type: Boolean, reflect: true })
  open = false

  private dialogId = 'cn-dialog'

  connectedCallback() {
    super.connectedCallback()
    this.dialogId = `cn-dialog-${Math.random().toString(36).substring(2, 9)}`
    this.setAttribute('role', 'dialog')
    this.setAttribute('aria-labelledby', this.dialogId)
  }

  public close(returnValue?: string) {
    this.open = false
    this.returnValue = returnValue || ''
    const d = this.shadowRoot?.querySelector('dialog')
    d?.close()
    this.dispatchEvent(new Event('close'))
  }

  protected cancel() {
    this.dispatchEvent(new Event('cancel'))
    this.close()
  }

  public showModal() {
    console.log('showModal')
    const d = this.shadowRoot?.querySelector('dialog')
    d?.showModal()
  }

  public cancelOnOutsideClick(e: Event) {
    // if the target is the dialog-card, do nothing
    if (e.target === this.shadowRoot?.querySelector('.dialog-card')) {
      return
    }
    // if the target is the dialog element: close it
    if (e.target === this.shadowRoot?.querySelector('dialog')) {
      this.close()
      return
    }
  }

  static styles = css`
    :host {
      display: contents;
    }
    :host dialog {
      position: absolute;
      top: 0;
      left: 0;
      width: 100dvw;
      height: 100dvh;
      background: var(--background-dialog-overlay, hsla(0, 33%, 30%, 0.5));
      border: none;
      box-sizing: border-box;
      z-index: var(--cn-z-index-dialog, 10000);
      align-content: center;
    }
    :host .dialog-card {
      margin: auto;
      border-radius: var(--cn-border-radius);
      padding: var(--cn-gap);
      border: none;
      background: var(--background-dialog, #002337);
      color: var(--color-on-dialog, #fff);
      width: min(720px, calc(100vh - var(--cn-gap)));
      box-sizing: border-box;
      max-height: calc(100vh - var(--cn-gap));
    }
    @media screen and (max-width: 840px) {
      :host .dialog-card {
        width: calc(100vw - 16px);
        width: calc(100vw - 16px);
      }
    }
    
    :host nav.header {
      display: flex;
      gap: var(--cn-gap);
      color: var(--cn-color-dialog, #fff);
      padding: 0;
      width: 100%;
      height: calc(var(--cn-line) * 2);
      box-sizing: border-box;
    }
    :host nav.header h3 {
      color: var(--cyan-color-heading-1);
      margin: 0;
      padding: 0;
      color: var(--cn-color-dialog-header, #fff);
      height: 48px;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0;
      color: var(--color-on-dialog);
      align-self: center;
      margin: 0;
      font-family: var(--cn-font-family-headings);
      font-weight: var(--cn-font-weight-heading-4);
      font-size: var(--cn-font-size-heading-4);
      line-height: var(--cn-line-height-heading-4);
      letter-spacing: var(--cn-letter-spacing-heading-4);
    }
    :host button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      margin: 0;
      border-radius: 50%;
      aspect-ratio: 1;
    }
    :host button:hover {
      background: var(--background-button-hover, hsla(0, 0%, 100%, 0.1));
    }
    :host .dialog-content {
      margin-top: 72px;
      overflow-y: scroll;
    }
    `

  render() {
    return html`
      <dialog ?open=${this.open} @click=${this.cancelOnOutsideClick}>
        <div id=${this.dialogId} class="dialog-card">
        <nav class="header">
          <button class="icon" @click=${this.cancel}>
            <cn-icon noun="close"></cn-icon>
          </button>
          <h3>${this.title}</h3>
        </nav>
        <div class="dialog-content">
          <slot></slot>
        </div>
        </div>
      </dialog>
    `
  }
}
