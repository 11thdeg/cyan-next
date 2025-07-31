# Machine Control

This document provides an overview of the design system intended for machine control interfaces, such as LLM's, chatbots, and other AI-driven applications. The design system is built to ensure consistency, accessibility, and ease of use across various components.

## Core Principles

1.  **Declarative Usage**: Use the custom elements directly in your HTML. The components are self-contained and require minimal configuration.
2.  **Styling**: Components come with a default theme. You can override styles using CSS custom properties. Refer to each component's documentation for available properties.
3.  **Functionality**: Components encapsulate complex behaviors. Interact with them through attributes and events.

## CSS and Atomics

The design system's styling is divided into two main parts: app-level CSS and atomic CSS.

### App-Level CSS

This provides the foundational styling for the application. It includes base styles for standard HTML elements (like forms, typography) and styles for larger container components. This ensures a consistent look and feel out of the box.

Key app-level styles include:
- **App Bar**: A top application bar.
- **Tray**: A slide-out navigation panel.
- **Rail**: A side navigation rail, typically for tablet viewports.
- **Forms**: Base styling for `form`, `label`, `input`, and `select` elements.
- **Buttons**: Default styles for `<button>` and anchor tags styled as buttons.
- **Diff**: Styling for displaying text differences.

### Atomic CSS

Atomic classes are single-purpose utility classes that allow for granular control over styling. They can be used to modify layout, spacing, colors, and other properties on a case-by-case basis, extending the base styles provided by the app-level CSS.

A core part of the atomic system is for `flexbox` layouts. Use the `.flex` class to create a flex container, and utility classes to control direction, wrapping, and alignment.

```html
<div class="flex flex-col justify-center items-center">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Other Atomics

Other utilities for borders, border-radius, and other properties are also available.

- `.border`: Adds a standard border.
- `.border-radius`: Adds a standard border radius.

## Available Components

Here is a list of available components and their purpose.

*   `cn-dice`: A component for rolling dice.
*   `cn-editor`: A rich text editor.
*   `cn-lightbox`: A lightbox for displaying images and other content.
*   `cn-story-clock`: A component for visualizing story progression.

### Usage Example

To use a component, include its script and then use the custom element in your HTML.

```html
<script type="module" src="/path/to/cn-dice.js"></script>

<cn-dice></cn-dice>
```

