export async function filterCSS(dataPromise: Promise<string>) {
  let css = await dataPromise;

  // Remove specific problematic properties globally
  const propertiesToStrip = [
    "color",
    "background-color",
    "background",
    "line-height",
    "font-family",
  ];

  propertiesToStrip.forEach((prop) => {
    const re = new RegExp(`\\b${prop}\\s*:[^;}]+;?`, "gi");
    css = css.replace(re, "");
  });

  return css;
}

export async function filterHTML(dataPromise: Promise<string>) {
  const html = await dataPromise;
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Remove all inline style attributes
  doc.querySelectorAll("[style]").forEach((el) => el.removeAttribute("style"));

  // Optionally remove internal <style> blocks if they are known to be problematic
  // doc.querySelectorAll('style').forEach(el => el.remove());

  // Create the style element
  const style = doc.createElement("style");
  style.textContent = `
          `;

  return new XMLSerializer().serializeToString(doc);
}
