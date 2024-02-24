import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

type SnackbarMessage = {
  message: string
  action?: {
    label: string
    callback: () => void
  }
}

/**
 * An example of SVG Icons wrapped in a LitElement.
 *
 * @event {CustomEvent} cn-snackbar-add - The Snackbar listens to this event to show a new message.
 * The event detail should be an object with the following properties:
 * - message: the message to show
 * - action: an optional action to perform when the user clicks the action button,
 *   if not provided, the action button will be hidden
 */
@customElement('cn-snackbar')
export class CnSnackbar extends LitElement {
  @property({ type: Array })
  snackStack: Array<SnackbarMessage> = []

  @property({ type: Boolean, reflect: true })
  visible = false

  pushToStack(message: SnackbarMessage) {
    this.snackStack.push(message)
    this.visible = true
  }

  handleAdd(event: Event) {
    if (event instanceof CustomEvent) {
      const detail = event.detail
      if (typeof detail === 'object' && detail !== null) {
        console.log('cn-snackbar-add event received', detail)
        this.pushToStack(detail)
      } else {
        console.error(
          'cn-snackbar-add event detail is not an object, ignoring.',
        )
      }
    } else {
      console.error('cn-snackbar-add event is not a CustomEvent, ignoring.')
    }
  }

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('cn-snackbar-add', this.handleAdd)
  }

  render() {
    const actionDiv = this.snackStack[0]?.action
      ? html`<button @click=${this.snackStack[0].action.callback}>${this.snackStack[0].action.label}</button>`
      : ''

    return html`
      <div class="message">${this.snackStack[0]?.message}</div>
      ${actionDiv}
    `
  }

  static styles = css`
    :host {
      position: fixed;
      bottom: 0;
      left: 0;  
      opacity: 0;
      transition: opacity 0.3s;
    }
    :host([visible]) {
      opacity: 1;
    }
    `
}
