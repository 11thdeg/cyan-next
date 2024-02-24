import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('cn-app-bar')
export class CnAppBar extends LitElement {
  public static styles = css`
    :host {
      display: contents;
    }
    :host header{
      display: flex;
      margin-left: var(--cn-margin-for-rail, 0);
      padding: 0 var(--cn-gap);
      height: var(--cn-app-bar-height);
      align-items: center;
      justify-content: space-between;
      flex-wrap: nowrap; 
    }
    ::slotted(h2), h2 {
      font-family: var(--cn-font-family-headings);
      font-size: var(--cn-font-size-heading-4);
      font-weight: var(--cn-font-weight-heading-4);
      line-height: var(--cn-line-height-heading-4);
      letter-spacing: var(--cn-letter-spacing-heading-4);
      color: var(--cn-color-on-app-bar);
      height: var(--cn-line-height-heading-4);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }`

  @property({ type: String, reflect: true })
  public title = ''

  render() {
    return html`<header>
      ${this.title ? html`<h2>${this.title}</h2>` : ''}
      <div><slot name="actions"></slot></div>
  </header>`
  }
}
