import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

export interface CnListItem {
  key: string
  title: string
}

@customElement('cn-sortable-list')
export class CnSortableList extends LitElement {
  static styles = css`
    :host {
      display: block;
      // UI text-styling
      font-family: var(--cn-font-family-ui);
      font-weight: var(--cn-font-weight-ui);
      font-size: var(--cn-font-size-ui);
      line-height: var(--cn-line-height-ui);
      letter-spacing: var(--cn-letter-spacing-ui);
    }
    ul {
      list-style-type: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: var(--cn-grid);
    }
    .item {
      display: flex;
      align-items: center;
      border: var(--color-border) 1px solid;
      border-radius: var(--cn-border-radius);
      padding: var(--cn-grid);
      cursor: move;
      gap: var(--cn-grid);
      // UI text-styling
      font-family: var(--cn-font-family-ui);
      font-weight: var(--cn-font-weight-ui);
      font-size: var(--cn-font-size-ui);
      line-height: var(--cn-line-height-ui);
      letter-spacing: var(--cn-letter-spacing-ui);
    }

    .title {
      flex-grow: 1;
    }

    .item:hover {
      background: var(--background-button-text-hover);
    }

    cn-icon[noun="drag"] {
      cursor: grab;
    }
  `

  @property({ type: Array }) items: CnListItem[] = []

  // private _dragStartIndex = -1;

  render() {
    return html`
      <ul>
        ${this.items.map(
          (item, index) => html`
          <li 
            class="item" 
            draggable="true"
            @dragstart="${(e: DragEvent) => this._onDragStart(e, index)}"
            @dragover="${this._onDragOver}"
            @drop="${(e: DragEvent) => this._onDrop(e, index)}"
          >
            <cn-icon noun="drag"></cn-icon>
            <span class="title">${item.title}</span>
            <slot name="${item.key}"></slot>
          </li>
        `,
        )}
      </ul>
    `
  }

  private _onDragStart(e: DragEvent, index: number) {
    // this._dragStartIndex = index;
    if (e.dataTransfer) {
      e.dataTransfer.setData('text/plain', index.toString())
    }
  }

  private _onDragOver(e: DragEvent) {
    e.preventDefault()
  }

  private _onDrop(e: DragEvent, dropIndex: number) {
    e.preventDefault()
    const dataTransfer = e.dataTransfer
    if (!dataTransfer) {
      return
    }
    const dragIndex = Number.parseInt(dataTransfer.getData('text/plain'))

    if (dragIndex >= 0 && dragIndex !== dropIndex) {
      const updatedItems = [...this.items]
      const [removed] = updatedItems.splice(dragIndex, 1)
      updatedItems.splice(dropIndex, 0, removed)
      this.items = updatedItems

      this.dispatchEvent(
        new CustomEvent('items-changed', {
          detail: { items: this.items },
        }),
      )
    }
  }
}
