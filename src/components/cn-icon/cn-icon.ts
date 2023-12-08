/**
 * This is a wrapper lit component for the lazy loading of icons.
 */
import {customElement, property} from 'lit/decorators.js';
import {LitElement, css} from 'lit';
import {until} from 'lit-html/directives/until.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

@customElement('cn-icon')
export class CnIcon extends LitElement {
  public static styles = css`
    :host {
      color: var(--cn-color-key, red);
      height: 128px;
      width: 128px;
    }
    svg {
      height: 100%;
      width: 100%;
    }`

  @property({type: String, reflect: true})
  public noun: string = "";

  // private debug = true
  loadingIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="12" fill="currentColor"></circle>
      </svg>`

  protected render() {
    const content = fetch('./icons/'+this.noun + ".svg").then(r => 
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
      "cn-icon": CnIcon;
    }
    /* eslint-disable @typescript-eslint/no-namespace */
    namespace JSX {
      interface IntrinsicElements {
        "cn-icon": CnIcon;
      }
    }
  }