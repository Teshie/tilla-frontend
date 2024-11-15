"use client";
import React, { useState } from "react";
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

const steps = [
  "Primary Member Information",
  "Address",
  "Family Member Information",
  "Dependent Children Information",
  "Review",
];

const API_POST = "http://api.tillahealthinsurance.com/members/register";

const fieldDefinitions = {
  user: [
    { name: "first_name", label: "First Name", type: "text", required: true },
    { name: "last_name", label: "Last Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
  ],
  address: [
    { name: "street", label: "Street", type: "text", required: true },
    { name: "city", label: "City", type: "text", required: true },
  ],
  family: [{ name: "spouse_name", label: "Spouse's Name", type: "text" }],
};

const MemberBasicRegistration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    selection: {},
    user: {},
    address: {},
    family: {},
    children: [],
  });

  const [errors, setErrors] = useState({});
  const [showPricing, setShowPricing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(""); // To track plan selection

  const fetchApiData = async () => {
    try {
      const response = await axios.post(API_POST, formData, {
        headers: { "Content-Type": "application/json" },
      });
      localStorage.setItem("apiResponseData", JSON.stringify(response.data));
      setShowPricing(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleNext = () => {
    const currentFields = getStepFields();
    const currentDataKey = getStepDataKey();
    const newErrors = {};

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

  const handlePlanTypeChange = (planType) => {
    setSelectedPlan(planType);
    setFormData((prevData) => ({
      ...prevData,
      selection: { plan_type: planType },
    }));
    setActiveStep(1); // Move to the next step after selecting plan
  };

  const getStepFields = () => {
    const stepKeys = Object.keys(fieldDefinitions);
    return fieldDefinitions[stepKeys[activeStep]] || [];
  };

  const getStepDataKey = () => {
    const stepKeys = Object.keys(fieldDefinitions);
    return stepKeys[activeStep];
  };

  return (
    <div>
      {showPricing ? (
        <PricingPlans />
      ) : (
        <Box sx={{ width: "100%" }}>
          {activeStep === 0 && (
            <Box>
              <Typography variant="h6">Select Plan Type:</Typography>
              <Button onClick={() => handlePlanTypeChange("Individual")}>
                Individual Plan
              </Button>
              <Button onClick={() => handlePlanTypeChange("Family")}>
                Family Plan
              </Button>
            </Box>
          )}

          {activeStep !== 0 && (
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => {
                if (selectedPlan === "Family" && index === 0) {
                  return null; // Skip "Plan Type" step for Family
                }
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          )}

          <Box sx={{ padding: 3 }}>
            {selectedPlan === "Family" && activeStep === 1 && (
              <Box>
                <Typography variant="h6">
                  Please select your family plan
                </Typography>
                <div>{/* Show plan selection div here */}</div>
              </Box>
            )}

            {activeStep < steps.length - 1 && (
              <Box component="form" sx={{ display: "grid", gap: 2 }}>
                {getStepFields().map((field) => (
                  <TextField
                    key={field.name}
                    label={field.required ? `${field.label} *` : field.label}
                    name={field.name}
                    value={formData[getStepDataKey()][field.name] || ""}
                    onChange={(e) => handleChange(e, getStepDataKey())}
                    error={Boolean(errors[field.name])}
                    helperText={errors[field.name] || ""}
                    size="small"
                    margin="dense"
                  />
                ))}
              </Box>
            )}

            {activeStep < steps.length - 1 && (
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
              >
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button variant="contained" onClick={handleNext}>
                  Next
                </Button>
              </Box>
            )}

            {activeStep === steps.length - 1 && (
              <Box sx={{ mt: 3 }}>
                <Typography>Review your information:</Typography>
                <ReviewInformation formData={formData} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 3,
                  }}
                >
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={fetchApiData}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </div>
  );
};

export default MemberBasicRegistration;
