import { LitElement, css, html } from 'lit'
/**
 * This is a wrapper lit component for the lazy loading of icons.
 */
import { customElement, property } from 'lit/decorators.js'
import './styles.css'

@customElement('cn-icon')
export class CnIcon extends LitElement {
  public static styles = css`
    :host {
      color: var(--color-on, currentColor);
      height: var(--cn-icon-size, 128px);
      width: var(--cn-icon-size, 128px);
      display: inline-block;
    }
    :host([xsmall]) {
      height: var(--cn-icon-size-xsmall);
      width: var(--cn-icon-size-xsmall);
      position: relative;
    }
    :host([xsmall]) svg{
      position: absolute;
      top: 0;
      left: 0;
    }
    :host([small]) {
      height: var(--cn-icon-size-small);
      width: var(--cn-icon-size-small);
    }
    :host([large]) {
      height: var(--cn-icon-size-large);
      width: var(--cn-icon-size-large);
    }
    :host([xlarge]) {
      height: var(--cn-icon-size-xlarge);
      width: var(--cn-icon-size-xlarge);
    }
    svg {
      height: 100%;
      width: 100%;
      fill: currentColor;
    }`

  @property({ type: String, reflect: true })
  public noun = ''

  @property({ type: Boolean, reflect: true })
  xsmall?: boolean = false

  @property({ type: Boolean, reflect: true })
  small?: boolean = false

  @property({ type: Boolean, reflect: true })
  large?: boolean = false

  @property({ type: Boolean, reflect: true })
  xlarge?: boolean = false

  protected render() {
    const iconUrl = `/icons/${this.noun}.svg#icon`
    return html`<svg
      viewBox="0 0 128 128"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="ariaNoun">
      <title id="ariaNoun">${this.noun}</title>
      <style type="text/css">
	.st1{fill:url(#SVGID_1_);}
</style>
      <defs>
        <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="120.58" y1="23.7324" x2="69.4427" y2="108.0212" gradientTransform="matrix(1 0 0 -1 0 128)">
		      <stop  offset="3.900706e-02" style="stop-color:#004147"/>
		      <stop  offset="1" style="stop-color:#EFFF42;stop-opacity:0"/>
	      </linearGradient>
      </defs>
      <use href=${iconUrl}></use>
    </svg>`
  }
}

// Make this available to react/preact/solid
declare global {
  interface HTMLElementTagNameMap {
    'cn-icon': CnIcon
  }
  /* eslint-disable @typescript-eslint/no-namespace */
  namespace JSX {
    interface IntrinsicElements {
      'cn-icon': CnIcon
    }
  }
}
