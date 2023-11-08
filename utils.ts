/**
 * Tranverses a JSON object and performs a callback on non-objects
 * @param data
 * @param callback
 */
const traverseJSON = (data: any, callback: (value: any) => void) => {
  // Helper function to traverse the JSON recursively
  const traverse = (obj: any) => {
    // Loop through each key in the object
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        // If the value is an object, recursively call traverse
        if (typeof obj[key] === "object" && obj[key] !== null) {
          traverse(obj[key]);
        } else {
          // Execute the callback function for each non-object value
          callback(obj[key]);
        }
      }
    }
  };

  // Start traversal from the initial JSON object
  traverse(data);
};

const sanitizeMessage = (str: string) => {
  str += "";
  // eslint-disable-next-line no-useless-escape
  // the 'useless escape' is used to perform code injection, which we want to prevent
  str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
  return str.trim();
};

/**
 * Format and sanitize widget for delivery to Websocket
 * @param widget
 * @returns
 */
export const formatWidget = (widget: UnknownWidget) => {
  traverseJSON(widget, sanitizeMessage);
  const stringified = JSON.stringify(widget);

  return stringified;
};
