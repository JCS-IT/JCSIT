/**
 * Converts a string to title case.
 * @param {string} input - The string to convert.
 * @returns {string} The converted string in title case.
 */
export const toTitleCase = (input: string) => {
  if (!input) return "";
  return input
    .toLowerCase()
    .replace(new RegExp(/(?:^|\s|-)\w/g), (match) => match.toUpperCase());
};

/**
 * Converts a slug string to title case.
 * @param {string} slug - The slug string to convert.
 * @returns {string} The title case string.
 */
export const slugToTitle = (slug: string) => {
  if (!slug) return "";
  return toTitleCase(slug.replace("-", " "));
};

/**
 * Converts a string to a slug format.
 * @param {string} input - The string to be converted.
 * @returns {string} - The converted slug string.
 */
export const stringToSlug = (input: string) => {
  return input
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};
