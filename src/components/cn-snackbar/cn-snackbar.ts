import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { logDebug } from '../../utils/logHelpers'

/**
 * The message to show in the Snackbar, with an optional action. The event listener
 * listens to the `cn-snackbar-add` event to show a new message, and expects the event
 * detail to be an object with the following properties:
 *
 * @property {string} message - The message to show
 * @property {object} action - An optional action to perform when the user clicks the action button,
 *  if not provided, the action button will be hidden
 * @property {string} action.label - The label of the action button
 * @property {function} action.callback - The callback to execute when the action button is clicked
 */
export type SnackbarMessage = {
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
  snackStack: Array<SnackbarMessage> = [
    { message: 'Welcome to Cyan Next!' },
  ]

  @property({ type: Boolean, reflect: true })
  visible = true

  pushToStack(message: SnackbarMessage) {
    logDebug('CnSnackbar.pushToStack', message.message, message.action?.label, this.snackStack.length)
    this.snackStack.push(message)
    this.visible = true
    if (!message.action) window.setTimeout(() => {
      this.popFromStack()
    }, 5000)
  }

  popFromStack() {
    logDebug('CnSnackbar.popFromStack', this.snackStack.length)
    this.snackStack.shift()
    if (this.snackStack.length === 0) {
      this.visible = false
    }
  }

  /**
   * Handles the action button click event and hides the snack. If there is an action,
   * it will execute the action callback.
   */
  handleActionClick() {
    logDebug('CnSnackbar.handleActionClick')
    if (!this.snackStack[0].action) throw new Error('CnSnackbar: No action to handle, ignoring.')
    this.snackStack[0].action.callback()
    this.popFromStack()
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
      ? html`<button @click=${this.handleActionClick}>${this.snackStack[0].action.label}</button>`
      : ''

    return html`
      <div class="message">${this.snackStack[0]?.message}</div>
      ${actionDiv}
    `
  }

  static styles = css`
    :host {
      display: flex;
      position: fixed;
      bottom: var( --cn-grid-size, 8px);
      left: var( --cn-grid-size, 8px);
      padding: var( --cn-grid-size, 8px) var(--cn-border-radius, 16px);
      background-color: var(--color-contrast, #333); 
      color: var(--color-on-contrast, #fff);
      border-radius: var(--cn-border-radius, 4px) 0 var(--cn-border-radius, 4px) 0;
      opacity: 0;
      transition: opacity 0.3s;
      z-index: var(--cn-snackbar-z-index, 1000);
    }
    :host([visible]) {
      opacity: 1;
    }
    `
}
