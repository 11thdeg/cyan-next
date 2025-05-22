import './styles.css'
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

  @property({ type: Number, reflect: true })
  public elevation = 0

  connectedCallback(): void {
    super.connectedCallback()
    this.ariaLabel = 'Avatar'
  }

  /**
   * We want to turn the nick into a value between 0 and 100, and then
   * use that to color-mix between the avatar background color 1 and 2
   */
  private renderBackgroundStyle() {
    const nick = this.nick
    if (nick) {
      const hash = Array.from(nick).reduce(
        (acc, char) => acc + char.charCodeAt(0),
        0,
      )
      const value = Math.abs(hash % 100)
      return `background-color: color-mix(in hsl, var(--cn-color-avatar-1), var(--cn-color-avatar-2) ${value}%)`
    }
    return 'background-color: var(--cn-color-avatar-1)'
  }

  public render() {
    const image = this.src
      ? html`<img src="${this.src}" alt="Avatar" />`
      : this.nick
        ? html`<div class="placeholder">${this.nick.substring(0, 2)}</div>`
        : html`<cn-icon noun="avatar"></cn-icon>`

    return html`
      <div class="avatarFrame" style="${this.renderBackgroundStyle()}">
        ${image}
      </div>
    `
  }
  public static styles = css`
    :host {
      display: contents;
    }
    :host(:hover) {
      --cn-color-avatar-1: var(--color-surface-4);
      --cn-color-avatar-2: var(--color-surface-4);
    }
    :host .avatarFrame {
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      aspect-ratio: 1 / 1;
      height: calc(var(--cn-line) * 3);
      background-color: var(--color-button);
      user-select: none;
      cursor: pointer;
      transition: background-color 0.3s ease-in-out;
      color: var(--color-on-surface);
    }
    :host([elevation="1"]) .avatarFrame {
      box-shadow: var(--shadow-elevation-1);
    }
    :host([elevation="2"]) .avatarFrame {
      box-shadow: var(--shadow-elevation-2);
    }
    img {
      height: calc(var(--cn-line) * 3 - var(--cn-grid));
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
  `
}
