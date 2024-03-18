import { LitElement, css, html } from 'lit'
/**
 * This is a wrapper lit component for the lazy loading of icons.
 */
import { customElement, property } from 'lit/decorators.js'

@customElement('cn-avatar-button')
export class CnAvatarButton extends LitElement {
  @property({ type: String, reflect: true })
  public src = ''

  connectedCallback(): void {
    super.connectedCallback()
    this.role = 'button'
    this.ariaLabel = 'Avatar'
  }

  public render() {
    const image = this.src
      ? html`<img src="${this.src}" alt="Avatar" />`
      : html`<cn-icon noun="avatar" class="placeholder"></cn-icon>`

    return html`
      ${image}
      <cn-icon class="action" noun="open-down" small></cn-icon>
    `
  }
  public static styles = css`
    :host {
      display: block;
      height: calc(var(--cn-line) * 3);
      width: calc(var(--cn-line) * 4.5);
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
    cn-icon.placeholder {
      position: absolute;
      left: calc(var(--cn-gap));
      top: calc(var(--cn-line) * 0.75);
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
    cn-icon.action {
      position: absolute;
      right: var(--cn-grid);
      top: var(--cn-line);
      color: var(--cn-color-on-field);
    }
  `
}
