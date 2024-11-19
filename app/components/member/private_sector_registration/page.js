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
import ReviewInformation from "../../shared/ReviewInformation";

const steps = [
  "Company Information",
  "Company Contact Person",
  "Plan Information",
  "Emergency Contact Information",
  "Review",
];
const API_POST = "http://api.tillahealthinsurance.com/members/register";

const fieldDefinitions = {
  companyInformation: [
    {
      name: "company_name",
      label: "Company Name",
      type: "text",
      required: true,
    },
    {
      name: "company_registration_number",
      label: "Company Registration Number",
      type: "text",
      required: true,
    },
    {
      name: "industry_type",
      label: "Industry Type",
      type: "text",
      required: true,
    },
    {
      name: "street_address",
      label: "Street Address",
      type: "text",
      required: true,
    },
    { name: "company_city", label: "City", type: "text", required: true },
    {
      name: "company_region",
      label: "Region/Zone",
      type: "text",
      required: true,
    },
    {
      name: "company_kifle_ketema",
      label: "Kifle Ketema/Zip Code",
      type: "text",
    },
    { name: "company_country", label: "Country", type: "text", required: true },
    {
      name: "company_phone",
      label: "Company Phone Number",
      type: "text",
      required: true,
    },
    {
      name: "company_email",
      label: "Company Email Address",
      type: "email",
      required: true,
    },
    {
      name: "number_of_employees",
      label: "Number of Employees",
      type: "select",
      options: ["0 to 10", "10 to 50", "50 to 100", "Over 100"],
      required: true,
    },
    { name: "company_website", label: "Company Website", type: "url" },
  ],

  companyContactPerson: [
    {
      name: "contact_last_name",
      label: "Contact Person’s Last Name",
      type: "text",
      required: true,
    },
    {
      name: "contact_first_name",
      label: "Contact Person’s First Name",
      type: "text",
      required: true,
    },
    {
      name: "contact_position",
      label: "Position/Title",
      type: "text",
      required: true,
    },
    {
      name: "contact_phone",
      label: "Contact Person’s Phone Number",
      type: "text",
      required: true,
    },
    {
      name: "contact_email",
      label: "Contact Person’s Email Address",
      type: "email",
      required: true,
    },
  ],
  planInformation: [
    {
      name: "enrollment_coverage_options",
      label: "Enrollment Coverage Options",
      type: "select",
      options: [
        "All Full-Time Employees",
        "Full-Time and Part-Time Employees",
        "Select Departments Only",
        "Individual Choice (Employees opt-in)",
      ],
      required: true,
    },
    {
      name: "plan_coverage_type",
      label: "Plan Coverage Type",
      type: "select",
      options: ["Medical"],
      required: true,
    },
    {
      name: "preferred_start_date",
      label: "Preferred Start Date",
      type: "date",
      required: true,
    },
    {
      name: "preferred_end_date",
      label: "Preferred End Date (if applicable)",
      type: "date",
    },
  ],
  employeeEnrollmentOptions: [
    {
      name: "enrollment_coverage_options",
      label: "Enrollment Coverage Options",
      type: "select",
      options: [
        "All Full-Time Employees",
        "Full-Time and Part-Time Employees",
        "Select Departments Only",
        "Individual Choice (Employees opt-in)",
      ],
      required: true,
    },
  ],
  emergencyContact: [
    {
      name: "emergency_name",
      label: "Emergency Contact Name",
      type: "text",
      required: true,
    },
    {
      name: "emergency_relationship",
      label: "Relationship to Company (e.g., Legal Advisor, HR Head)",
      type: "text",
      required: true,
    },
    {
      name: "emergency_phone",
      label: "Emergency Contact Phone Number",
      type: "text",
      required: true,
    },
    {
      name: "emergency_email",
      label: "Emergency Contact Email Address",
      type: "email",
    },
    {
      name: "emergency_address",
      label: "Emergency Contact Address (optional)",
      type: "text",
    },
  ],
};

const MemberBasicRegistration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    companyInformation: {},
    companyContactPerson: {},
    planInformation: {},
    emergencyContact: {},
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
