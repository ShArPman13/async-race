export function createElement(tag: string, className: string, text?: string) {
  const element = document.createElement(`${tag}`);
  element.className = `${className}`;
  if (text) {
    element.textContent = `${text}`;
  }

  return element;
}
