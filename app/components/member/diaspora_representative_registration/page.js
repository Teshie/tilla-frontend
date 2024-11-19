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
  "Representative Informatiom",
  "Representative Address",
  "Primary Member Information",
  "Address",
  "Review",
];
const API_POST = "http://api.tillahealthinsurance.com/members/register";

// Define all fields for each step
const fieldDefinitions = {
  // Existing Primary Member Information
  // Representing Person Information
  representative: [
    {
      name: "rep_last_name",
      label: "Representative's Last Name",
      type: "text",
      required: true,
    },
    {
      name: "rep_first_name",
      label: "Representative's First Name",
      type: "text",
      required: true,
    },
    {
      name: "rep_middle_initial",
      label: "Representative's Middle Initial",
      type: "text",
    },
    {
      name: "rep_relationship",
      label: "Relationship to Primary Member",
      options: ["Legal Guardian", "Parent", "Power of Attorney"],
      type: "select",
      required: true,
    },

    {
      name: "rep_phone",
      label: "Representative’s Phone Number",
      type: "text",
      required: true,
    },
    {
      name: "rep_email",
      label: "Representative’s Email Address",
      type: "email",
    },
  ],
  // Address Information
  addressPr: [
    {
      name: "address1",
      label: "Mailing Address Line 1",
      type: "text",
      required: true,
    },
    { name: "city", label: "City", type: "text", required: true },
    {
      name: "region_or_state",
      label: "Region/State",
      type: "text",
      required: false,
    },
    {
      name: "wereda",
      label: "Woreda",
      type: "text",
      required: false,
    },
    {
      name: "kifle_ketema_or_zip",
      label: "Kifle Ketema/Zip Code",
      type: "text",
    },
    { name: "country", label: "Country", type: "text", required: true },
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
    {
      name: "marital_status",
      label: "Marital Status",
      type: "select",
      options: ["Single", "Married", "Widowed", "Divorced", "Separated"],
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

  // Address Information
  address: [
    {
      name: "address1",
      label: "Mailing Address Line 1",
      type: "text",
      required: true,
    },
    { name: "city", label: "City", type: "text", required: true },
    {
      name: "region_or_state",
      label: "Region/State",
      type: "text",
      required: false,
    },
    {
      name: "wereda",
      label: "Woreda",
      type: "text",
      required: false,
    },
    {
      name: "kifle_ketema_or_zip",
      label: "Kifle Ketema/Zip Code",
      type: "text",
    },
    { name: "country", label: "Country", type: "text", required: true },
  ],

  // Representing Person Information
  representative: [
    {
      name: "rep_last_name",
      label: "Representative's Last Name",
      type: "text",
      required: true,
    },
    {
      name: "rep_first_name",
      label: "Representative's First Name",
      type: "text",
      required: true,
    },
    {
      name: "rep_middle_initial",
      label: "Representative's Middle Initial",
      type: "text",
    },
    {
      name: "rep_relationship",
      label: "Relationship to Primary Member",
      type: "text",
      required: true,
    },
    {
      name: "rep_phone",
      label: "Representative’s Phone Number",
      type: "text",
      required: true,
    },
    {
      name: "rep_email",
      label: "Representative’s Email Address",
      type: "email",
    },
  ],
};

const MemberBasicRegistration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    representative: {},
    addressPr:{},
    user: {},
    address: {},
    children: [],
  });

  const [errors, setErrors] = useState({});
  const [apiData, setApiData] = useState(null);
  const [showPricing, setShowPricing] = useState(false);

  const fetchApiData = async () => {
    try {
      const response = await axios.post(API_POST, formData, {
        headers: { "Content-Type": "application/json" },
      });
      localStorage.setItem("apiResponseData", JSON.stringify(response.data));
      setApiData(response.data);
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

  const handleChildChange = (index, e) => {
    const { name, value } = e.target;
    const updatedChildren = formData.children.map((child, idx) =>
      idx === index ? { ...child, [name]: value } : child
    );
    setFormData({ ...formData, children: updatedChildren });
  };

  const addChild = () => {
    setFormData((prevData) => ({
      ...prevData,
      children: [
        ...prevData.children,
        { full_name: "", gender: "", dob: "", age: "" },
      ],
    }));
  };

  const removeChild = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      children: prevData.children.filter((_, idx) => idx !== index),
    }));
  };

  const handleSubmit = () => {
    fetchApiData();
  };

  const getStepFields = () => {
    const stepKeys = Object.keys(fieldDefinitions);
    if (
      (activeStep === 3 && formData.selection.plan_type !== "Family") ||
      (activeStep === 4 && formData.selection.plan_type !== "Family")
    )
      return [];
    return fieldDefinitions[stepKeys[activeStep]] || [];
  };

  const getStepDataKey = () => {
    const stepKeys = Object.keys(fieldDefinitions);
    return stepKeys[activeStep];
  };

  return (
    <div className={`${showPricing ? "" : "mt-10"}`}>
      {showPricing ? (
        <PricingPlans />
      ) : (
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
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
                {getStepFields().map((field) => (
                  <TextField
                    key={field.name}
                    select={field.type === "select"}
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
                  >
                    {field.type === "select" &&
                      field.options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                  </TextField>
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
                {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
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
                    onClick={handleSubmit}
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
