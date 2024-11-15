"use client";
import React, { useState, useEffect } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Box,
  Typography,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import PricingPlans from "../../pricing/page";

const steps = ["Primary Member Information", "Address", "Review"];

const API_POST = "http://api.tillahealthinsurance.com/members/register";

// Define Ethiopian regions
const ethiopianRegions = [
  "Addis Ababa",
  "Afar",
  "Amhara",
  "Benishangul-Gumuz",
  "Dire Dawa",
  "Gambela",
  "Harari",
  "Oromia",
  "Sidama",
  "Somali",
  "Southern Nations, Nationalities, and Peoples' Region",
  "Tigray",
];

const fieldDefinitions = {
  selection: [
    {
      name: "plan_type",
      label: "Please select your plan type",
      type: "select",
      options: ["Family", "Individual"],
      required: true,
    },
  ],
  user: [
    {
      name: "last_name",
      label: "Primary Member's Last Name",
      type: "text",
      required: true,
    },
    {
      name: "first_name",
      label: "Primary Member's First Name",
      type: "text",
      required: true,
    },
    {
      name: "middle_initial",
      label: "Primary Member's Middle Initial",
      type: "text",
    },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      options: ["Male", "Female"],
      required: true,
    },
    {
      name: "date_of_birth",
      label: "Date of Birth",
      type: "date",
      required: true,
    },
    { name: "age", label: "Age", type: "number", required: true },
    {
      name: "marital_status",
      label: "Marital Status",
      type: "select",
      options: ["Single", "Married"],
      required: true,
    },
    {
      name: "email",
      label: "Primary Member’s Email Address",
      type: "email",
      required: true,
    },
    {
      name: "phone",
      label: "Primary Member’s Phone Number",
      type: "text",
      required: true,
    },
  ],
  address: [
    {
      name: "address1",
      label: "Mailing Address Line 1",
      type: "text",
      required: true,
    },
    { name: "city", label: "City", type: "text", required: true },
    {
      name: "region_or_zone",
      label: "Region/Zone",
      type: "text",
      required: true,
    },
    {
      name: "kifle_ketema_or_zip",
      label: "Kifle Ketema/Zip Code",
      type: "text",
    },
    { name: "country", label: "Country", type: "text", required: true },
  ],
};

const MemberBasicRegistration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    selection:{},
    address: {},
    user: {},
  });
  const [errors, setErrors] = useState({});
  const [apiData, setApiData] = useState(null); // State to hold API response data
  const [showPricing, setShowPricing] = useState(false); // State to control PricingPlan visibility

  // Fetch API data and store it in local storage
  const fetchApiData = async () => {
    try {
      const response = await axios.post(API_POST, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Store the response in localStorage
      localStorage.setItem("apiResponseData", JSON.stringify(response.data));

      // Set response data in state
      setApiData(response.data);

      // Show PricingPlan component if API call is successful
      setShowPricing(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleNext = () => {
    const currentFields = getStepFields();
    const currentDataKey = getStepDataKey();
    const newErrors = {};

    // Validate required fields for the current step
    currentFields.forEach((field) => {
      if (field.required && !formData[currentDataKey][field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    if (Object.keys(newErrors).length === 0) {
      setErrors({});
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setErrors(newErrors);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e, stepKey) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [stepKey]: {
        ...prevData[stepKey],
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const handleSubmit = () => {
    fetchApiData();
  };

  const getStepFields = () => {
    const stepKeys = Object.keys(fieldDefinitions);
    return fieldDefinitions[stepKeys[activeStep]];
  };

  const getStepDataKey = () => {
    const stepKeys = Object.keys(fieldDefinitions);
    return stepKeys[activeStep];
  };

  return (
    <div className={`${showPricing ? "" : "mt-10"}`}>
      {showPricing ? (
        <PricingPlans /> // Show PricingPlan component if API data is present
      ) : (
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ padding: 3 }}>
            {activeStep < steps.length - 1 && (
              <Box
                component="form"
                sx={{
                  display: "grid",
                  gap: 2,
                  gridTemplateColumns: "repeat(4, 1fr)",
                }}
              >
                {getStepFields().map((field) =>
                  field.type === "select" ? (
                    <TextField
                      key={field.name}
                      select
                      label={field.required ? `${field.label} *` : field.label}
                      name={field.name}
                      value={formData[getStepDataKey()][field.name] || ""}
                      onChange={(e) => handleChange(e, getStepDataKey())}
                      size="small"
                      margin="dense"
                      error={Boolean(errors[field.name])}
                      helperText={errors[field.name] || ""}
                    >
                      {field.options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    <TextField
                      key={field.name}
                      label={field.required ? `${field.label} *` : field.label}
                      name={field.name}
                      type={field.type}
                      value={formData[getStepDataKey()][field.name] || ""}
                      onChange={(e) => handleChange(e, getStepDataKey())}
                      size="small"
                      margin="dense"
                      error={Boolean(errors[field.name])}
                      helperText={errors[field.name] || ""}
                      InputLabelProps={
                        field.type === "date" ? { shrink: true } : {}
                      }
                    />
                  )
                )}
              </Box>
            )}

            {activeStep === steps.length - 1 && (
              <div>
                <Typography variant="h6">Review your information</Typography>
                <pre>{JSON.stringify(formData, null, 2)}</pre>
              </div>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 2,
              }}
            >
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                Back
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button variant="contained" onClick={handleSubmit}>
                  Submit
                </Button>
              ) : (
                <Button variant="contained" onClick={handleNext}>
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default MemberBasicRegistration;
