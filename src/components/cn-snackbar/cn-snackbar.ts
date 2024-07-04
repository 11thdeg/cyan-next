import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { logDebug } from '../../utils/logHelpers'
// import { logDebug } from '../../utils/logHelpers'

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
  snackStack: Array<SnackbarMessage> = []

  @property({ type: Boolean, reflect: true })
  visible = false

  /**
   * Pushes a new message to the stack, and shows the snackbar if it's not visible.
   *
   * @param message {SnackbarMessage} - The message to show
   */
  pushToStack(message: SnackbarMessage) {
    // DEBUG
    // logDebug('CnSnackbar.pushToStack', message.message, message.action?.label, this.snackStack.length)

    this.snackStack.push(message)

    // if this is the first message, show the snackbar and set a timeout to hide it
    if (this.snackStack.length === 1) {
      this.visible = true
      if (!message.action)
        window.setTimeout(() => {
          this.popFromStack()
        }, 5000)
    }
  }

  /**
   * Pops the current message from the stack. If there are more messages in the stack,
   * it will shift to the next message via `shiftFromStack`.
   */
  popFromStack() {
    // DEBUG
    // logDebug('CnSnackbar.popFromStack', this.snackStack.length)

    // Hide the snackbar before removing the message from the stack
    this.visible = false

    // Wait for 0.3s for the opacity transition to complete
    if (this.snackStack.length > 0)
      window.setTimeout(() => {
        if (this.snackStack.length > 1) this.shiftFromStack()
        else this.snackStack.shift()
      }, 300)
  }

  /**
   * Shifts to the next message in the stack and shows the snackbar.
   */
  shiftFromStack() {
    // DEBUG
    // logDebug('CnSnackbar.shiftFromStack', this.snackStack.length)

    // Sanity: if there are no more messages, ignore and return
    if (this.snackStack.length === 0) {
      // logDebug('CnSnackbar.shiftFromStack: No more messages to show, ignoring.')
      return
    }

    this.snackStack.shift()
    this.visible = true

    // if there is no action, set a timeout to hide the snackbar
    //
    // The snackbar will be hidden by the action button click event
    // if there is an action in the message
    if (!this.snackStack[0]?.action)
      window.setTimeout(() => {
        this.popFromStack()
      }, 5000)
  }

  /**
   * Handles the action button click event and hides the snack. If there is an action,
   * it will execute the action callback.
   */
  handleActionClick() {
    // logDebug('CnSnackbar.handleActionClick')
    if (!this.snackStack[0].action)
      throw new Error('CnSnackbar: No action to handle, ignoring.')
    this.snackStack[0].action.callback()
    this.popFromStack()
  }

  handleAdd(event: Event) {
    console.log('cn-snackbar-add event received', event)
    if (event instanceof CustomEvent) {
      const detail = event.detail
      if (typeof detail === 'object' && detail !== null) {
        logDebug('cn-snackbar-add event received', detail, this)
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
    window.addEventListener('cn-snackbar-add', (event: Event) =>
      this.handleAdd(event),
    )
    console.log('CnSnackbar connected')
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
      bottom: var( --cn-grid, 8px);
      left: var( --cn-grid, 8px);
      background-color: var(--color-secondary, #333); 
      color: var(--color-on-secondary, #fff);
      border-radius: var(--cn-border-radius, 4px) 0 var(--cn-border-radius, 4px) 0;
      opacity: 0;
      transition: opacity 0.3s;
      z-index: var(--cn-snackbar-z-index, 1000);
      // disable selection
      user-select: none;
    }
    :host([visible]) {
      opacity: 1;
    }
    :host .message {
      // Font and text
      font-family: var(--cn-font-family-ui);
      font-weight: var(--cn-font-weight-ui);
      font-size: var(--cn-font-size-ui);
      line-height: var(--cn-line-height-button, calc(38 / 16 * 1rem));
      /* 38px */
      letter-spacing: var(--cn-letter-spacing-ui);
      margin: 5px var(--cn-gap, 1rem) 5px var(--cn-gap, 1rem);
    }
    :host button {
      display: inline-block;
      color: var(---cn-color-on-button);
      background: var(--cn-color-button);

      // Font and text
      font-family: var(--cn-font-family-ui);
      font-weight: var(--cn-font-weight-ui);
      font-size: var(--cn-font-size-ui);
      line-height: var(--cn-line-height-button, calc(38 / 16 * 1rem));
      /* 38px */
      letter-spacing: var(--cn-letter-spacing-ui);

      border-radius: calc(19 / 16 * 1rem);
      border: none;
      height: var(--cn-line-height-button, calc(38 / 16 * 1rem));
      margin: 5px 0em;
      margin-right: var(--cn-grid, 1rem);
      padding: 0 16px;
      transition: all 0.3s ease-in-out;
      text-decoration: none;
    }
    `
}
