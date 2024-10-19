// fonts.js

// Use the <style> block directly in your HTML/JSX only if you need inline styles.
// For JS modules like React, import fonts directly from Google APIs.

// Add these imports inside your JSX or HTML Head section.
<style>
  @import url('https://fonts.googleapis.com/css2?family=Kalnia+Glaze:wght@100..700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Cairo+Play:wght@200..1000&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Kalnia+Glaze:wght@100..700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Merienda:wght@300..900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Edu+AU+VIC+WA+NT+Guides:wght@400..700&display=swap');
</style>

// Corrected fonts object in fonts.js
export const fonts = {
  serif: '"Kalnia Glaze", serif',
  monospace: '"JetBrains Mono", monospace',
  cursive: '"Merienda", cursive',
  cursiv: '"Edu AU VIC WA NT Guides", cursive'
};
