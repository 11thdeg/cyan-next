import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

export type CN_LOADER_FOR_VALUES = '' | 'navigation'

@customElement('cn-loader')
export class CnLoader extends LitElement {
  @property({ type: String, reflect: true })
  noun = 'fox'

  @property({ type: String, reflect: true })
  for: CN_LOADER_FOR_VALUES = ''

  public render() {
    return html`
      <div class="loader-animation"></div>
      <cn-icon
        noun="${this.noun}"
        ?large=${this.for === ''}
      ></cn-icon>
    `
  }

  public static styles = css`
    :host {
      display: grid;
      height: calc(var(--cn-line) * 3);
      width: calc(var(--cn-line) * 3);
      place-content: center;
    }
    :host([for="navigation"]) {
      height: calc(var(--cn-line) * 1);
      width: calc(var(--cn-line) * 1);
    }
    :host .loader-animation {
       grid-area: 1 / 1; 
    }
    :host cn-icon {
      grid-area: 1 / 1;
      opacity: 0.44;
      animation: c1 2s infinite linear;
    }
    .loader-animation {
      width: calc(var(--cn-line) * 3);
      aspect-ratio: 1;
      background: var(--color-on-primary);
      border-radius: 50%;
      animation: l1 7s infinite linear;
      opacity: 0.11;
    }
    :host([for="navigation"]) .loader-animation {
      width: calc(var(--cn-line) * 1.5);
    }
    @keyframes c1 {
        0% {opacity: 0; transform: scale(0.4)}
        50% {opacity: 0.88; transform: scale(0.8)}
        100% {opacity: 0; transform: scale(1.2)}
    }
    @keyframes l1{
      12.5% {border-radius: 37% 63% 70% 30% / 30% 62% 38% 70%}
      25%   {border-radius: 50% 50% 70% 30% / 52% 62% 38% 48%}
      37.5% {border-radius: 33% 67% 18% 82% / 52% 75% 25% 48%}
      50%   {border-radius: 73% 27% 18% 82% / 52% 32% 68% 48%}
      62.5% {border-radius: 73% 27% 74% 26% / 64% 32% 68% 36%}
      75%   {border-radius: 84% 16% 15% 85% / 55% 79% 21% 45%}
      87.5% {border-radius: 12% 88% 69% 31% / 10% 66% 34% 90%}
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
