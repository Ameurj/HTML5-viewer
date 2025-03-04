// Add to existing patterns in createUrlPatterns function
export const createUrlPatterns = (path: string): string[] => {
  const escapedPath = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return [
    // ... existing patterns ...

    // Google Web Designer media override attribute
    `(data-gwd-media-override=.*?"source":"?)${escapedPath}("?)`,
    // GWD image source attribute
    `(gwd-image\\s+source=["'])${escapedPath}(["'])`,
    // Handle escaped quotes in JSON attributes
    `(\\"source\\":\\s*\\"?)${escapedPath}(\\"?)`,
    // Handle unescaped quotes in JSON attributes
    `("source":\\s*"?)${escapedPath}("?)`,
  ];
};