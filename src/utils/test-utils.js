/**
 * Remove comments, line feeds & extra spaces between tags
 * @param {string} value
 */
export function lightDom (value) {
  let result = value.replace(/<!---->/gim, '');
  result = result.replace(/\n/gim, '');
  result = result.replace(/>\s+</gim, '><');
  return result;
}
