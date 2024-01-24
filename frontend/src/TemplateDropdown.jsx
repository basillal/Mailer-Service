import React, { useEffect, useState } from 'react';

export const TemplateDropdown = ({ templateNames, selectedTemplate, onChange }) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Set the default template when the component mounts
    if (!initialized && templateNames.length > 0) {
      // onChange(''); // Set the default to an empty string
      setInitialized(true);
    }
  }, [initialized, templateNames, onChange]);

  return (
    <select value={selectedTemplate} onChange={(e) => onChange(e.target.value)}
    
    >
      <option value="">
        Select Template
      </option>
      {templateNames.length > 0 &&
        templateNames.map((templateName) => (
          <option key={templateName} value={templateName}>
            {templateName}
          </option>
        ))}
    </select>
  );
};

