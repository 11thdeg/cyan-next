function autoExpandTextarea(event: Event) {
  const target = event.target as HTMLTextAreaElement
  target.style.height = 'auto'
  target.style.height = `${target.scrollHeight + 1}px`
}

for (const textarea of document.body.querySelectorAll(
  'textarea[data-auto-expand]',
)) {
  textarea.addEventListener('keydown', autoExpandTextarea)
  textarea.addEventListener('input', autoExpandTextarea)
}
