export function flattenFormData(formData) {
  const flattenedData = {};

  // Iterate through each section of the formData
  for (const sectionKey in formData) {
    if (formData.hasOwnProperty(sectionKey)) {
      const fields = formData[sectionKey];

      // Merge each field from the section into the flattenedData object
      for (const [key, value] of Object.entries(fields)) {
        flattenedData[key] = value; // Add the field to the flattened object
      }
    }
  }

  return flattenedData;
}
