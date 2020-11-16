export function renderStyle(elem: HTMLElement, style: any) {
  Object.keys(style).forEach((attr: any) => {
    elem.style[attr] = style[attr];
  });
}
