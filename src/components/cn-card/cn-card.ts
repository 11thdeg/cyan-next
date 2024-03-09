import './styles.sass'
import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('cn-card')
export class CnCard extends LitElement {
  @property({ type: Number, reflect: true })
  elevation = 1

  @property({ type: String, reflect: true })
  cover = ''

  @property({ type: String, reflect: true }) noun = ''

  @property({ type: String, reflect: true }) title = ''

  @property({ type: String, reflect: true }) description = ''

  @property({ type: String, reflect: true }) link = ''
  
  get coverImageURL () {
    return this.cover || ''
  }

  get titleSlot () {
    if (!this.title) return html``

    if (!this.link) return html`<h4>${this.title}</h4>`

    const linkUrl:string = this.link || ''

    return html`<h4><a href=${linkUrl}>${this.title}</a></h4>`
  }

  render () {
    return html`
      <div class="cardHeader">   
        ${this.noun ? html`<cyan-icon noun=${this.noun} class="cardNoun" ?large=${!!this.cover} ?dark=${!!this.cover}></cyan-icon>` : ''}
        ${this.titleSlot}
      </div>
      <div class="cardHeader">
        ${this.cover ? html`<img src="${this.coverImageURL}" alt="" class="cover" />` : ''}
        <div class="avatar"><slot name="avatar"></slot></div>
        <div class="title"><slot name="title"></slot></div>
      </div>
      <div class="cardContent">
        ${ this.description }
      </div>`
  }

  static styles = css`
    :host {
      box-sizing: border-box;
      display: block;
      padding: var(--cn-grid-size) var(--cn-gap);
      border-radius: var(--cn-border-radius-large);
      position: relative;
      container-type: inline-size;
      flex-grow: 1;
      transition: background 0.27 ease-in-out;
    }
     :host h4 {
      margin: 12px 16px;
      padding: 0;
      font-family: var(--cn-font-family-headings);
      font-weight: var(--cn-font-weight-headline-card);
      font-size: var(--cn-font-size-headline-card);
      line-height: var(--cn-line-height-headline-card);
      letter-spacing: var(--cn-letter-spacing-headline-card);
      color: var(--cn-color-heading-card, cyan);

      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;  
      overflow: hidden;
      text-overflow: ellipsis;
    }
    :host h4 a {
      color: var(--cn-color-headings-link, yellow);
      text-decoration: none;
    }
    :host h4 a:hover {
      text-decoration: underline;
    }
    :host([elevation="0"]) {
      padding: calc(var(--cn-grid-size) - 1px) calc(var(--cn-gap) - 1px);
      border: 1px solid var(--cn-color-border);
    }
    :host([elevation="1"]) {
      background: var(--cn-elevation-1);
    }
    :host([elevation="2"]) {
      background: var(--cn-elevation-2);
    }
    :host([elevation="3"]) {
      background: var(--cn-elevation-3);
    }
    :host([elevation="4"]) {
      background: var(--cn-elevation-3);
    }
    :host .cardHeader {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: left;
      gap: var(--cn-grid-size);
      position: relative;
    }`
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