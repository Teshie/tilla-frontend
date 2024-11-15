import React from "react";

const ReviewInformation = ({ formData, step }) => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>Review Your Information</h2>

      {/* Render step labels if provided */}
      {step && step.length > 0 && (
        <div>
          {step.map((label, index) => (
            <h3 key={index}>{label}</h3>
          ))}
        </div>
      )}

      {/* Dynamically render all sections of formData */}
      {formData &&
        Object.entries(formData).map(([sectionName, sectionData], index) => (
          <section key={index}>
            <h3>{sectionName.replace(/_/g, " ")}</h3>
            {typeof sectionData === "object" && sectionData !== null ? (
              Array.isArray(sectionData) ? (
                // Render arrays
                sectionData.map((item, itemIndex) => (
                  <div key={itemIndex} style={{ marginBottom: "10px" }}>
                    {typeof item === "object" && item !== null ? (
                      Object.entries(item).map(([key, value]) => (
                        <p key={key}>
                          <strong>{key.replace(/_/g, " ")}:</strong>{" "}
                          {value || "N/A"}
                        </p>
                      ))
                    ) : (
                      <p>{item || "N/A"}</p>
                    )}
                  </div>
                ))
              ) : (
                // Render objects
                Object.entries(sectionData).map(([key, value]) => (
                  <p key={key}>
                    <strong>{key.replace(/_/g, " ")}:</strong> {value || "N/A"}
                  </p>
                ))
              )
            ) : (
              // Render primitive values
              <p>
                <strong>{sectionName.replace(/_/g, " ")}:</strong>{" "}
                {sectionData || "N/A"}
              </p>
            )}
          </section>
        ))}
    </div>
  );
};

export default ReviewInformation;
