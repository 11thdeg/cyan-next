import { LitElement, css, html } from 'lit'
/**
 * This is a wrapper lit component for the lazy loading of icons.
 */
import { customElement, property } from 'lit/decorators.js'

@customElement('cn-avatar')
export class CnAvatar extends LitElement {
  @property({ type: String, reflect: true })
  public src = ''

  @property({ type: String, reflect: true })
  public nick = ''

  connectedCallback(): void {
    super.connectedCallback()
    this.ariaLabel = 'Avatar'
  }

  public render() {
    const image = this.src
      ? html`<img src="${this.src}" alt="Avatar" />`
      : this.nick
        ? html`<div class="placeholder">${this.nick.substring(0, 2)}</div>`
        : html`<cn-icon noun="avatar" class="placeholder"></cn-icon>`

    return html`
      ${image}
    `
  }
  public static styles = css`
    :host {
      display: block;
      height: calc(var(--cn-line) * 3);
      width: calc(var(--cn-line) * 3);
      border-radius: calc(var(--cn-line) * 1.5);
      position: relative;
      background-color: var(--cn-color-button);
      user-select: none;
      cursor: pointer;
      transition: background-color 0.3s ease-in-out;
    }
    :host(:hover) {
      background-color: var(--cn-color-button-hover);
    }
    :host(:active) {
      background-color: var(--cn-color-button-active);
    }
    img {
      height: calc(var(--cn-line) * 3 - var(--cn-grid));
      padding-top: calc(var(--cn-grid) / 2);
      padding-left: calc(var(--cn-grid) / 2);
      border-radius: 50%;
      object-fit: cover;
      aspect-ratio: 1 / 1;
    }
    div.placeholder {
      font-family: var(--cn-font-family-ui);
      font-size: calc(var(--cn-line) * 1.5);
      line-height: calc(var(--cn-line) * 3);
      text-align: center;
      text-transform: uppercase;
    }
    cn-icon.placeholder {
      position: absolute;
      left: calc(var(--cn-gap) + 1px);
      top: calc(var(--cn-line) * 0.75 - 1px);
      color: var(--cn-color-on-field);
      z-index: 2;
    }
    cn-icon.placeholder::before {
      content: '';
      position: absolute;
      left: calc(var(--cn-grid) * -1.5 );
      top: calc(var(--cn-grid) * -1.5 );
      width: calc(var(--cn-line) * 3.25 - var(--cn-gap));
      height: calc(var(--cn-line) * 3.25 - var(--cn-gap));
      border-radius: 50%;
      background-color: var(--cn-color-button-hover);
      z-index: -1;
    }
    :host(:hover) cn-icon.placeholder::before {
      background-color: var(--cn-color-button);
    }
  `
}
