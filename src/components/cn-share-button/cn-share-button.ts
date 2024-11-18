import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { logDebug } from '../../utils/logHelpers'
import './styles.css'

/**
 * An example of SVG Icons wrapped in a LitElement.
 *
 * @param {string} src the path to the SVG file
 * @param {string} label an optional label for the button. In case the
 * label is givem, the icon will be hidden and the label will be shown instead.
 */
@customElement('cn-share-button')
export class CnShareButton extends LitElement {
  @property({ type: String, reflect: true })
  src = ''

  @property({ type: String, reflect: true })
  title = ''

  @property({ type: String, reflect: true })
  label = ''

  @property({ type: String, reflect: true })
  ariaLabel = ''

  @property({ type: String, reflect: true })
  noun = ''

  private defaultIcon = html`<svg 
  version="1.1"
  xmlns="http://www.w3.org/2000/svg" 
  xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 128 128"
  style="enable-background:new 0 0 128 128;"
  xml:space="preserve">
  <style type="text/css">
  .st0{opacity:0.3;enable-background:new;}
  </style>
  <g fill="currentColor">
    <circle class="st0" cx="102.6" cy="19.3" r="6.4"/>
    <circle class="st0" cx="25.4" cy="64.3" r="6.4"/>
    <circle class="st0" cx="102.6" cy="109.4" r="6.4"/>
    <path d="M102.6,90.5c-4.9,0-9.3,1.9-12.6,4.9L44.1,68.8c0.3-1.5,0.6-3,0.6-4.5s-0.3-3-0.6-4.5l45.3-26.4c3.5,3.2,8,5.2,13.1,5.2
	  c10.7,0,19.3-8.6,19.3-19.3S113.2,0,102.6,0S83.3,8.6,83.3,19.3c0,1.5,0.3,3,0.6,4.5L38.6,50.2c-3.5-3.2-8-5.2-13.1-5.2
      C14.8,45,6.2,53.6,6.2,64.3s8.6,19.3,19.3,19.3c5.1,0,9.6-2,13.1-5.2l45.8,26.7c-0.3,1.3-0.5,2.8-0.5,4.2
      c0,10.3,8.4,18.8,18.8,18.8s18.8-8.4,18.8-18.8S112.9,90.5,102.6,90.5 M102.6,12.9c3.5,0,6.4,2.9,6.4,6.4s-2.9,6.4-6.4,6.4
      s-6.4-2.9-6.4-6.4S99,12.9,102.6,12.9 M25.4,70.7c-3.5,0-6.4-2.9-6.4-6.4c0-3.5,2.9-6.4,6.4-6.4s6.4,2.9,6.4,6.4
      C31.9,67.8,29,70.7,25.4,70.7 M102.6,115.8c-3.5,0-6.4-2.9-6.4-6.4c0-3.5,2.9-6.4,6.4-6.4s6.4,2.9,6.4,6.4
      C109,112.9,106.1,115.8,102.6,115.8"/>
  </g>
  </svg>`

  /**
   * Handles the click event on the button.
   *
   * If the browser supports the Web Share API, it will open the share dialog,
   * otherwise it will copy the current URL to the clipboard.
   *
   * After success, the method emits a `copy` or `share` as event depending
   * on the action taken.
   */
  private async handleClicked() {
    console.log('share button clicked')
    console.log('navigator.share', navigator.share)

    // Check if the Web Share API is supported by the browser, if so, use it
    if (typeof navigator.share !== 'undefined') {
      await navigator.share({
        title: this.title || document.title,
        url: this.src || window.location.href,
      })
      this.dispatchEvent(new Event('share'))
      logDebug('Shared:', this.src || window.location.href)
      return
    }

    // Otherwise, fallback to the Clipboard API
    const text = this.src || window.location.href
    await navigator.clipboard.writeText(text)
    console.log('Copied to clipboard:', text)
    this.dispatchEvent(new Event('copy'))
  }

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('click', this.handleClicked)

    // Add aria role button
    if (!this.hasAttribute('role')) this.setAttribute('role', 'button')
  }

  render() {
    const icon = this.noun
      ? html`<cn-icon noun=${this.noun}></cn-icon>`
      : this.defaultIcon

    const labelString = this.label ? this.label : 'Share'

    return html`
      <button>
        <span class="label">${labelString}</span> ${icon}
      </button>`
  }

  static styles = css`
    :host {
      display: contents;
    }
    :host button {
      color: var(--color-on-cn-share-button, yellow);
      position: relative;
      z-index: 1;
      font-family: var(--cn-font-family-ui);
      font-weight: var(--cn-font-weight-ui);
      font-size: var(--cn-font-size-ui);
      letter-spacing: var(--cn-letter-spacing-ui);
      line-height: var(--cn-line-height-button, calc(38 / 16 * 1rem));
      padding: var(--cn-padding-button, 0 var(--cn-gap));
      border: none;
      background: none;
      text-decoration: none;
      user-select: none;
      overflow: hidden;
      flex-grow: 0;
      flex-shrink: 0;
    }
    :host button:hover{
      color: var(--color-on-cn-share-button-hover);
    }
    :host button:active {
      color: var(--color-on-cn-share-button-active);
    }

    :host button::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: var(--cn-share-button-size);
      background: var(--background-button-text);
      z-index: -1;
      border-radius: calc(var(--cn-share-button-size) / 2);
      transition: all 0.3s ease-in-out;
      transform: translateY(-50%);
    }
    :host(:hover) button::before {
      background: var(--background-button-text-hover);
      box-shadow: var(--shadow-button-hover);
    }
    :host(:active) button::before {
      background: var(--background-button-text-active);
      color: var(--color-on-cn-share-button-active);
    }

    :host svg,
    :host img {
      height: var(--cn-icon-size-small);
      width: var(--cn-icon-size-small);
      vertical-align: middle;
      margin-bottom: 0.15em;
    }
    @media (max-width: 620px) {
      :host .label {
        display: none;
      }
      :host button {
        position: relative;  
        margin: 0;
        padding: 0;
        padding: var(--cn-grid);
        width: var(--cn-line-height-button, calc(38 / 16 * 1rem));
      }
      :host svg {
        position: absolute;
        top: var(--cn-grid);
        left: calc(var(--cn-grid) * 0.75);
      }
    }
    :host img {
      object-fit: contain;
    }
    @media (max-width: 620px) {
      :host button {
        aspect-ratio: 1/1;
        width: var(--cn-share-button-size);
        margin: 0;
        padding: 0;
      }
      :host button::before {
        border-radius: 50%;
        top: 0;
        transform: translateY(0);
        left: 0;
      }
      :host svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(1.25);
      }
    }
    
    `
}

declare global {
  interface HTMLElementTagNameMap {
    'cn-share-button': CnShareButton
  }
}
