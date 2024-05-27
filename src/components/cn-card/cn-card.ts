import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import './styles.sass'

@customElement('cn-card')
export class CnCard extends LitElement {
  @property({ type: Number, reflect: true })
  elevation = 1

  @property({ type: String, reflect: true })
  cover = undefined

  @property({ type: String, reflect: true }) noun = ''

  @property({ type: String, reflect: true }) title = ''

  @property({ type: String, reflect: true }) description = ''

  @property({ type: String, reflect: true }) href = ''

  get coverSlot() {
    if (!this.cover) return undefined

    const coverUrl: string = this.cover || ''

    if (!this.href)
      return html`<div class="cardContent" aria-hidden="true">
        <img src=${coverUrl} alt="" />
        <div class="tint"></div>
      </div>`

    const linkUrl: string = this.href || ''

    return html`<div class="cardContent" aria-hidden="true">
      <a href=${linkUrl} class="cardContent">
        <img src=${coverUrl} alt="" />
        <div class="tint"></div>
      </a>
    </div>`
  }

  get titleSlot() {
    if (!this.title) return html``

    if (!this.href) return html`<h4>${this.title}</h4>`

    const linkUrl: string = this.href || ''

    return html`<h4><a href=${linkUrl}>${this.title}</a></h4>`
  }

  render() {
    return html`
      ${this.coverSlot}
      <div class="cardHeader">   
        ${
          this.noun
            ? html`<cn-icon noun=${this.noun} class="cardNoun" ?large=${!!this
                .cover} ?dark=${!!this.cover}></cn-icon>`
            : ''
        }
        ${this.titleSlot}
      </div>
      <p class="cardDescription">
        <slot></slot>
     </p>
     <nav class="cardActions"><slot name="actions"></slot></nav>`
  }

  static styles = css`
    :host {
      box-sizing: border-box;
      display: block;
      // padding: var(--cn-grid) var(--cn-gap);
      border-radius: var(--cn-border-radius-large);
      position: relative;
      container-type: inline-size;
      flex-grow: 1;
      transition: background 0.27 ease-in-out;
      font-family: var(--cn-font-family-text);
      font-size: var(--cn-font-size-text);
      font-weight: var(--cn-font-weight-text);
      line-height: var(--cn-line-height-text);
      letter-spacing: var(--cn-letter-spacing-text);
      color: var(--color-text-low-emphasis);
      padding: var(--cn-grid) var(--cn-gap);
    }
    :host([cover]) .cardNoun {
      position: absolute;
      top: 12px;
      left: 12px;
      margin: 0;
      padding: 0;
      z-index: 2;
    }
    :host .cardContent {
      padding: 0;
      margin: calc(-1 * var(--cn-grid)) calc(-1 * var(--cn-gap));
      margin-bottom: 0;
      border-radius: var(--cn-border-radius-card, 16px);
      max-height: 100cqw;
      overflow: hidden;
      position: relative;
    }
    :host .cardContent img {
      width: calc(100cqw + var(--cn-gap) * 2);
      aspect-ratio: 16/9;
      object-fit: cover;
      border-radius: 16px;
      position: relative;
      display: block;
    }
    :host .cardContent a {
      display: contents;
    }
    :host .cardNoun {
      align-self: flex-start;
      flex-shrink: 0;
      margin-top: var(--cn-grid);
    }
    :host div.tint {
      position: absolute;
      bottom: 0;
      left: 0;
      height: min(95cqw, 44%);
      width: calc(100cqw + var(--cn-gap) * 2);
      z-index: 1;
      background: linear-gradient(
        0deg,
        hsla(var(--chroma-primary-95-hsl), 0.7), 
        hsla(var(--chroma-primary-30-hsl), 0.0)
      );
      background-blend-mode: hard-light;
      pointer-events: none;
      border-radius: 0 0 var(--cn-border-radius-card, 16px) var(--cn-border-radius-card, 16px);
    }
     :host h4 {
      margin: 0;
      padding: 0;
      font-family: var(--cn-font-family-headings);
      font-weight: var(--cn-font-weight-headline-card);
      font-size: var(--cn-font-size-headline-card);
      line-height: var(--cn-line-height-headline-card);
      letter-spacing: var(--cn-letter-spacing-headline-card);
      color: var(--color-heading-2, cyan);

      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;  
      overflow: hidden;
      text-overflow: ellipsis;
    }
    :host h4 a {
      // color: var(--cn-color-headings-link, yellow);
      color: var(--color-heading-2, cyan);
      text-decoration: none;
    }
    :host h4 a:hover {
      text-decoration: underline;
    }
    :host([elevation="0"]) {
      padding: calc(var(--cn-grid) - 1px) calc(var(--cn-gap) - 1px);
      border: 1px solid var(--color-border);
    }
    :host([elevation="1"]) {
      background: var(--cn-elevation-1);
      box-shadow: var(--cn-shadow-elevation-1)
    }
    :host([elevation="2"]) {
      background: var(--cn-elevation-2);
      box-shadow: var(--cn-shadow-elevation-2)
    }
    :host([elevation="3"]) {
      background: var(--cn-elevation-3);
      box-shadow: var(--cn-shadow-elevation-3)
    }
    :host([elevation="4"]) {
      background: var(--cn-elevation-4);
      box-shadow: var(--cn-shadow-elevation-4)
    }
    :host .cardHeader {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: left;
      gap: var(--cn-grid);
    }
    :host:after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 44px;
      height: 44px;
      background: none;
      opacity: 0;
      z-index: 0;
      pointer-events: none;
      transition: opacity .2s ease-in-out;
      will-change: opacity background;
      clip-path: polygon(100% 0, 0 0, 100% 100%);
      border-radius: 0 var(--cn-border-radius-large) 0 0;
    }
    :host([notify]):after {
      background: var(--color-notify);
      opacity: 0.82;
    }
    :host([alert]):after {
      background: var(--color-alert);
      opacity: 1;
    }
    `
}

/*export * from './theme.sass'
import { html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { CyanThemedElement } from '../../cyan-themed-element'

@customElement('cyan-card')
export class CyanCard extends CyanThemedElement {

  static styles = css`
    :host {
      box-sizing: border-box;
      margin: 0;
      padding: 8px 12px;
      display: block;
      border-radius: 16px;
      position: relative;
    }
    :host([elevation="0"]) {
      padding: 7px 11px;
      border: var(--cyan-border-card-elevation-0);
    }
    :host([elevation="1"]) {
      background: var(--cyan-background-card-elevation-1);
      box-shadow: var(--cyan-box-shadow-card-elevation-1);
    }
    :host([elevation="2"]) {
      background: var(--cyan-background-card-elevation-2);
      box-shadow: var(--cyan-box-shadow-card-elevation-2);
    }
    :host([elevation="3"]) {
      background: var(--cyan-background-card-elevation-3);
      box-shadow: var(--cyan-box-shadow-card-elevation-3);
    }
    :host .cover {
      width: 100%;
      position: absolute;
      top: 0px;
      left: 0px;
      height: 120px;
      object-fit: cover;
      border-radius: 16px 16px 0px 0px;
    }
    :host .cardHeader {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: left;
      gap: 8px;
      position: relative;
    }
    :host([cover]) .cardHeader {
      display: block;
      border-radius: 16px 16px 0 0;
      margin: -8px -12px 0 -12px;
      height: 120px;
    }
    :host([cover]) .cardHeader .avatar {
      position: absolute;
      bottom: -12px;
      left: 12px;
      z-index: 1;
    }
    :host([cover]) .cardHeader .title {
      position: absolute;
      bottom: 0px;
      right: 0px;
      background: var(--cyan-background-cardheader-title);
      padding-right: 12px;
      width: 100%;
      box-sizing: border-box;
      padding-left: 72px;
      text-align: right
    }`

  @property({ type: Number, reflect: true }) elevation = 0

  @property({ type: String, reflect: true }) cover = undefined

  get coverImageURL () {
    return this.cover || ''
  }

  render () {
    return html`
      <div class="cardHeader">
        ${this.cover ? html`<img src="${this.coverImageURL}" alt="" class="cover" />` : ''}
        <div class="avatar"><slot name="avatar"></slot></div>
        <div class="title"><slot name="title"></slot></div>
      </div>
      <div class="cardContent">
        <slot></slot>
      </div>`
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'cyan-card': CyanCard
  }
}*/
