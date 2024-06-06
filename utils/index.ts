export function fixEncoding(text: any) {
  if (!text) return "";
  if (typeof text === "number") return text;

  try {
    let buffer = new Uint8Array([...text].map((c) => c.charCodeAt(0)));
    return new TextDecoder("utf-8").decode(buffer);
  } catch (error) {
    return text;
  }
}
