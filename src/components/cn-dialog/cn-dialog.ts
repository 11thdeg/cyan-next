import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import './overrides.css'

@customElement('cn-dialog')
export class CnDialog extends LitElement {
  @property({ type: String, reflect: true })
  returnValue = ''

  private dialogId = 'cn-dialog'

  connectedCallback() {
    super.connectedCallback()
    this.dialogId = `cn-dialog-${Math.random().toString(36).substring(2, 9)}`
    this.setAttribute('role', 'dialog')
    this.setAttribute('aria-labelledby', this.dialogId)
  }

  public close(returnValue?: string) {
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

  static styles = css`
    :host dialog {
      border-radius: var(--cn-border-radius);
      padding: var(--cn-gap);
      border: none;
      background: var(--background-dialog, #002337);
      color: var(--color-on-dialog, #fff);
      width: min(720px, calc(100vh - var(--cn-gap)));
      box-sizing: border-box;
      max-height: calc(100vh - var(--cn-gap));
      position: relative;
    }
    @media screen and (max-width: 840px) {
      :host dialog {
        width: calc(100vw - 16px);
        width: calc(100vw - 16px);
      }
    }
    :host dialog::backdrop {
      background: var(--cn-background-dialog-backdrop, hsla(202, 100%, 11%, 0.55));
    }
    :host nav.dialog-header {
      display: flex;
      gap: var(--cn-gap);
      color: var(--cn-color-dialog, #fff);
      padding: 0;
      width: 100%;
      height: calc(var(--cn-line) * 2);
      box-sizing: border-box;
    }
    :host nav.header h3 {
      font-family: var(--cyan-font-family-headline-4);
      font-weight: var(--cyan-font-weight-headline-4);
      font-size: var(--cyan-font-size-headline-4);
      line-height: 48px;
      letter-spacing: var(--cyan-letter-spacing-headline-4);
      color: var(--cyan-color-heading-1);
      margin: 0;
      padding: 0;
      color: var(--cn-color-dialog-header, #fff);
      height: 48px;
      overflow: hidden;
      text-overflow: ellipsis;
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
    }`

  render() {
    return html`
      <dialog>
        <nav class="dialog-header">
          <button class="icon" @click=${this.cancel}>
            <cn-icon noun="close"></cn-icon>
          </button>
          <slot name="header"></slot>
        </nav>
        <div class="dialog-content">
          <slot></slot>
        </div>
      </dialog>
    `
  }
}
