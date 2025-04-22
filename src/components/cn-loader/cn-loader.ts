import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import './styles.css'

export type CN_LOADER_FOR_VALUES = '' | 'navigation'

@customElement('cn-loader')
export class CnLoader extends LitElement {
  @property({ type: String, reflect: true })
  noun = 'fox'

  @property({ type: String, reflect: true })
  for: CN_LOADER_FOR_VALUES = ''

  public render() {
    return html`
      <div class="lds-dual-ring"></div>
      <cn-icon
        noun="${this.noun}"
        ?large=${this.for === ''}
      ></cn-icon>
    `
  }

  public static styles = css`
    :host {
      display: grid;
      height: var(--cn-loader-size);
      width: var(--cn-loader-size);
      aspect-ratio: 1;
      place-content: center;
      position: relative;
    }
    :host([for="navigation"]) {
      height: calc(var(--cn-line) * 1);
      width: calc(var(--cn-line) * 1);
    }
    
    :host cn-icon {
      grid-area: 1 / 1;
      opacity: 0.44;
      animation: c1 2s infinite linear;
      color: var(--cn-loader-color);
    }
    .lds-dual-ring,
    .lds-dual-ring:after {
      box-sizing: border-box;
    }
    .lds-dual-ring {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    .lds-dual-ring:after {
      content: " ";
      opacity: 0.72;
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: var(--cn-loader-line-width) solid var(--cn-loader-color);
      border-color: var(--cn-loader-color) transparent var(--cn-loader-color) transparent;
      animation: lds-dual-ring 1.2s linear infinite;
    }
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}`
}

/* HTML: <div class="loader"></div>  * /


.loader {
  width: 50px;
  aspect-ratio: 1;
  background: var(--color-primary);
  border-radius: 50%;
  animation: l1 3s infinite linear;
}
@keyframes l1{
  12.5% {border-radius: 37% 63% 70% 30% / 30% 62% 38% 70%}
  25%   {border-radius: 50% 50% 70% 30% / 52% 62% 38% 48%}
  37.5% {border-radius: 33% 67% 18% 82% / 52% 75% 25% 48%}
  50%   {border-radius: 73% 27% 18% 82% / 52% 32% 68% 48%}
  62.5% {border-radius: 73% 27% 74% 26% / 64% 32% 68% 36%}
  75%   {border-radius: 84% 16% 15% 85% / 55% 79% 21% 45%}
  87.5% {border-radius: 12% 88% 69% 31% / 10% 66% 34% 90%}
}*/
