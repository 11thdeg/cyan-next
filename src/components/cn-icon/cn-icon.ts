/**
 * This is a wrapper lit component for the lazy loading of icons.
 */
import {customElement, property} from 'lit/decorators.js'
import {LitElement, css} from 'lit'
import {until} from 'lit-html/directives/until.js'
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js'
import './styles.css'

@customElement('cn-icon')
export class CnIcon extends LitElement {
  public static styles = css`
    :host {
      color: var(--cn-color-key, currentColor);
      height: var(--cn-icon-size, 128px);
      width: var(--cn-icon-size, 128px);
      display: block;
    }
    :host([small]) {
      height: var(--cn-icon-size-small, --cn-icon-size);
      width: var(--cn-icon-size-small, --cn-icon-size);
    }
    svg {
      height: 100%;
      width: 100%;
    }`

  @property({type: String, reflect: true})
  public noun: string = ''

  @property({type: Boolean, reflect: true})
    small?: boolean = false

  // private debug = true
  loadingIcon = `<svg 
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  x="0px"
  y="0px"
  viewBox="0 0 128 128"
  fill="currentColor"
  class="warning"
>
<path d="M67.6,64.5c4.7,0.5,10.1-3.7,8.7-8.7c-0.7-2.2-2.6-4-4.7-4.9c-4.6-2-9.3,1.6-11.7,5.4c-4.6,6.9-0.1,19.9,8,21.8
	c7.4,1.2,14.4-6.2,17.2-12.5c6.1-12.8-5.8-30.1-20.1-27.2c-9.1,1.9-16.5,9.9-19.6,18.3C40,72,51.8,90.5,67.1,93.8
	c6.5,1.2,12.8-1,18.2-5.2c10.2-8.2,16.4-22.3,14.6-35.5c-2.1-14.9-14.3-28.6-28.9-31.4C46.6,16.9,25.1,44.4,27,67.3
	c1.2,17.4,13.5,32.9,29,40.8c0.6,0.3,3.8,1.8,4.4,2.1c0.6,0.2,2.1,0.8,2.8,1c2.1,0.9,5.4,1.7,7.6,2.3c0.8,0.1,0.7,1.4-0.2,1.4
	c-5.4-0.3-10.9-1.2-16.2-2.9c-14.1-4.7-26.6-15.1-33.1-28.6c-3.6-7.4-5.6-15.4-5.3-23.8c0.9-24.1,18.6-48.2,43.4-52.4
	c19.2-3.2,38.2,8.2,47.3,24.7c4.5,8.1,6.9,17.5,6.4,26.7c-0.9,15.2-8.8,29.6-20.9,38.9c-10.3,8-24.5,9.8-35.9,3.2
	c-16-8.9-25.9-29.4-19-47c5.6-13.8,20.5-26.1,36-22.3c9.1,2.3,16.1,10,18.6,18.8c2.7,8.8-0.4,18.5-6.6,25.1
	c-5.4,6.1-15.3,10.8-22.7,5.4C51.9,72.6,51,55,63.7,48.7c5.6-3.1,13.1,0.4,14.7,6.5c1.6,6.3-5.1,11.6-10.9,10.6
	C66.5,65.8,66.7,64.4,67.6,64.5L67.6,64.5z"/>
</svg>`

  protected render() {
    const content = fetch('./icons/'+this.noun + '.svg').then(r => 
      r.status === 200 ? r.text().then(iconString => unsafeHTML(iconString)) : unsafeHTML(this.loadingIcon)
    )
    console.debug('cn-icon',this.noun, content)

    // return unsafeHTML(`${until(this.content, this.loadingIcon)}`)
    return until(content, this.loadingIcon)
  }
}

// Make this available to react/preact/solid
declare global {
  interface HTMLElementTagNameMap {
    'cn-icon': CnIcon;
  }
  /* eslint-disable @typescript-eslint/no-namespace */
  namespace JSX {
    interface IntrinsicElements {
      'cn-icon': CnIcon;
    }
  }
}