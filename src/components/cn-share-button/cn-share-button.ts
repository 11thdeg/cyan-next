import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

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
  noun = ''

  @property({ type: Boolean, reflect: true })
  disabled = false

  @property({ type: Boolean, reflect: true })
  fallback = false

  @property({ type: String, reflect: true })
  text = ''

  private defaultIcon = html`<?xml version="1.0" encoding="UTF-8"?>
  <svg width="1200pt" height="1200pt" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
   <path fill="currentColor" 
   d="m1150.2 572.26-412.5-375c-10.969-10.031-26.859-12.562-40.406-6.5625-13.594 6-22.312 19.453-22.312 34.312v161.34c-105.61 0.09375-354.32 23.812-516.84 227.81-81.469 102.28-109.08 282.28-119.48 350.06l-0.79688 5.0625c-2.5312 16.547 6.1406 32.719 21.328 39.75 5.0625 2.3438 10.406 3.4688 15.703 3.4688 10.641 0 21.094-4.5469 28.406-12.984 60.281-69.797 164.9-163.55 320.63-213.84 81.094-26.156 165.32-37.312 250.97-33.141v184.97c0 14.484 8.3438 27.656 21.469 33.891 13.031 6.1406 28.594 4.3125 39.844-4.875l412.5-337.5c8.4375-6.8906 13.453-17.156 13.734-28.031 0.28125-10.922-4.2188-21.375-12.281-28.734z"/>
  </svg>
  `

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
    if (!this.fallback && typeof navigator.share === 'function') {
      // Check this.fallback
      try {
        await navigator.share({
          title: this.title || document.title,
          url: this.src || window.location.href, // Corrected
          text: this.text || undefined, // Added text
        })
        this.dispatchEvent(new Event('share'))
      } catch (error: unknown) {
        console.error('Web Share API failed:', error)
        // Optionally, dispatch an error event or try the fallback here too
        if ((error as Error).name !== 'AbortError') {
          // User didn't cancel the share
          this.executeFallback() // Or just call the copy part directly
        }
      }
      return
    }

    // Fallback to Clipboard API (or if this.fallback is true)
    this.executeFallback()
  }

  private async executeFallback() {
    const textToCopy = this.src || window.location.href
    try {
      await navigator.clipboard.writeText(textToCopy)
      this.dispatchEvent(new Event('copy'))
      // Consider dispatching a success notification/event
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
      this.dispatchEvent(new Event('copy_error')) // Or a generic error event
    }
  }

  render() {
    const icon = this.noun
      ? html`<cn-icon noun=${this.noun}></cn-icon>`
      : this.defaultIcon

    const labelString = this.label ? this.label : 'Share'
    const showLabelText = this.label.length > 0

    return html`
      <button 
        aria-label=${labelString}
        ?disabled=${this.disabled}
        @click=${this.handleClicked}>
        ${showLabelText ? html`<span class="label">${labelString}</span>` : ''} 
        ${icon}
      </button>`
  }

  static styles = css`
    :host {
      display: inline-block;
    }
    :host button {
      background: var(
        --color-cn-share-button,
        var(--background-button-text)
      );
      color: var(
        --color-on-cn-share-button,
        var(--color-on-button)
      );

      height: var(--cn-line-height-button, calc(38 / 16 * 1rem));
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--cn-grid);
      border-radius: calc(19 / 16 * 1rem);

      /* standard UI font specs */
      font-family: var(--cn-font-family-ui);
      font-weight: var(--cn-font-weight-ui);
      font-size: var(--cn-font-size-ui);
      letter-spacing: var(--cn-letter-spacing-ui);
      line-height: var(--cn-line-height-button, calc(38 / 16 * 1rem));

      padding: var(--cn-padding-button, 0 var(--cn-gap));
      border: none;
      text-decoration: none;
      user-select: none;
      overflow: hidden;
      flex-grow: 0;
      flex-shrink: 0;
      transition: all 0.22s; 

      vertical-align: middle;
    }
    :host button:hover{
      background: var(
        --color-cn-share-button-hover,
        var(--background-button-text-hover)
      );
      color: var(
        --color-on-cn-share-button-hover,
        var(--color-on-button-hover)
      );
    }
    :host button:active {
      background: var(
        --color-cn-share-button,
        var(--background-button-text)
      );
      color: var(
        --color-on-cn-share-button,
        var(--color-on-button)
      );
    }

    :host svg{
      height: var(--cn-icon-size-small);
      width: var(--cn-icon-size-small);
    }
    @media (max-width: 620px) {
      :host .label {
        display: none;
      }
    }
    :host img {
      object-fit: contain;
    }
    @media (max-width: 620px) {
      :host button {
        aspect-ratio: 1/1;
        margin: 0;
        padding: 0;
      }
    }
    `
}

declare global {
  interface HTMLElementTagNameMap {
    'cn-share-button': CnShareButton
  }
}
