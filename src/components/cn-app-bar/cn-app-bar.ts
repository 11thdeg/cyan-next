import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import './cn-app-bar.css'

// Define the allowed values for the barType attribute
type BarMode = 'sticky' | 'modal' | ''

/**
 * A Lit wrapper for App-bar content and visuals
 */
@customElement('cn-app-bar')
export class CnAppBar extends LitElement {
  @property({ type: String, reflect: true }) noun = ''
  @property({ type: String, reflect: true }) title = ''
  @property({ type: String, reflect: true }) shortTitle = ''
  @property({ type: String, reflect: true }) mode: BarMode = '' // 'sticky' or 'modal'
  @property({ type: Boolean, reflect: true }) scrolled = false

  private handleScroll() {
    this.scrolled = window.pageYOffset > 0
  }

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener('scroll', this.handleScroll.bind(this))
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.handleScroll.bind(this))
    super.disconnectedCallback()
  }

  private handleBackClick() {
    history.back()
  }

  render() {
    const titleSnippet = this.shortTitle
      ? html`<span class="sm-hidden">${this.title}</span><span class="md-hidden">${this.shortTitle}</span>`
      : html`${this.title}`

    return html`
      <div class="container">
        ${
          this.mode === 'modal'
            ? html`
              <button type="button" class="back-button" @click="${this.handleBackClick}">
                <cn-icon noun="arrow-left"></cn-icon>
              </button>
            `
            : ''
        }
        ${
          this.noun && this.mode !== 'modal'
            ? html`
              <div class="noun-icon">
                <cn-icon noun="${this.noun}"></cn-icon> 
              </div>
            `
            : ''
        }
        <h3 class="title">${titleSnippet}</h3>
        ${
          this.mode !== 'modal'
            ? html`
          <div class="actions"><slot></slot></div>
        `
            : ''
        }
      </div>
    `
  }

  static styles = css`
    :host {
      /* border: solid 1px red; */
      display: block;
      position: relative;
      height: var(--cn-app-bar-height, 56px);
      background-color: transparent;
      color: var(--color-on-app-bar, cyan);
      z-index: 100;
      transition: background-color 0.3s ease, box-shadow 0.3s ease;
      border-radius: 0 0 0 var(--cn-border-radius-large, 16px);
    }

    @media (max-width: 620px) {
      :host {
        border-radius: 0;
      }
      .sm-hidden {
        display: none;
      }
    }
    @media (min-width: 621px) {
      .md-hidden {
        display: none
      }
    }

    :host([mode="sticky"]),
    :host([mode="modal"]) {
      position: sticky;
      top: 0;
    }

    :host([mode="sticky"][scrolled]),
    :host([mode="modal"]) {
      box-shadow: var(--shadow-elevation-1, 0 2px 4px rgba(0, 0, 0, 0.1));
    }

    :host([mode="sticky"][scrolled]) {
      background-color: var(--color-primary, #fff);
    }

    :host([mode="modal"]) {
      background-color: var(--background-modal, rgba(0, 0, 0, 0.2));
    }

    button cn-icon {
      z-index: 120;
    }

    :host([mode="modal"]) .container {
      padding-left: var(--cn-grid, 8px);
    }

    .container {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 var(--cn-gap, 16px); /* Use cn-gap variable */
      gap: var(--cn-gap, 16px); /* Use cn-gap variable */
    }

    .noun-icon {
      display: flex;
      align-items: center;
      /*margin-left: calc(var(--cn-grid, 8px) * -1); /* Use cn-grid variable */
      z-index: 120;
    }

    .title {
      color: var(--color-on-app-bar);
      flex-grow: 1;
      font-family: var(--cn-font-family-headings);
      font-weight: var(--cn-font-weight-app-bar, 300);
      font-size: var(--cn-font-size-app-bar, calc(var(--cn-grid) * 4.5));
      line-height: var(--cn-font-size-app-bar, calc(var(--cn-grid) * 4.5));
      letter-spacing: var(--cn-letter-spacing-app-bar, 0.25px);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: var(--cn-app-bar-height, 56px);
    }

    .actions {
      display: flex;
      align-items: center;
      gap: var(--cn-gap, 16px); /* Use cn-gap variable */
    }

    .back-button {
      display: flex;
      align-items: center;
      cursor: pointer;
      color: var(--color-on-button);
      background: none;
      border: none;
      position: relative;
      /*margin-left: calc(var(--cn-grid, 8px) * -1); /* Use cn-grid variable */
      
    }
    .back-button::before {
      content: '';
      position: absolute;
      height: var(--cn-navigation-icon-size, calc(1rem / 16 * 42));
      width: var(--cn-navigation-icon-size, calc(1rem / 16 * 42));
      border-radius: 50%;
      background: var(--background-button);
    }`
}
