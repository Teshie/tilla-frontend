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

const steps = ["Primary Member Information", "Address", "Review"];
const API_POST = "http://api.tillahealthinsurance.com/members/register";

// Define all fields for each step
const fieldDefinitions = {
  personalInformation: [
    { name: "first_name", label: "First Name", type: "text", required: true },
    { name: "last_name", label: "Last Name", type: "text", required: true },
    { name: "middle_initial", label: "Middle Initial", type: "text" },
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
      name: "email_address",
      label: "Email Address",
      type: "email",
      required: true,
    },
    {
      name: "phone_number",
      label: "Phone Number",
      type: "text",
      required: true,
    },
  ],
  businessInformation: [
    {
      name: "company_name",
      label: "Company/Agency Name",
      type: "text",
      required: true,
    },
    {
      name: "business_type",
      label: "Business Type",
      type: "select",
      options: ["Private", "Group", "Sector"],
      required: true,
    },
    {
      name: "business_license_number",
      label: "Business License Number",
      type: "text",
      required: true,
    },
    {
      name: "tax_identification_number",
      label: "Tax Identification Number (TIN)",
      type: "text",
      required: true,
    },
    {
      name: "business_address_line_1",
      label: "Address Line 1",
      type: "text",
      required: true,
    },
    {
      name: "business_address_line_2",
      label: "Address Line 2 (optional)",
      type: "text",
    },
    { name: "business_city", label: "City", type: "text", required: true },
    {
      name: "business_state",
      label: "State/Region",
      type: "text",
      required: true,
    },
    {
      name: "business_kifle_ketema",
      label: "Kifle Ketema/Zone (if applicable)",
      type: "text",
    },
    {
      name: "business_zip_code",
      label: "Zip Code",
      type: "text",
      required: true,
    },
  ],
  professionalInformation: [
    {
      name: "broker_id_number",
      label: "Broker ID Number (if already assigned)",
      type: "text",
    },
    {
      name: "years_of_experience",
      label: "Years of Experience",
      type: "number",
      required: true,
    },
    {
      name: "specialization",
      label: "Specialization",
      type: "select",
      options: [
        "Individual Plans",
        "Family Plans",
        "NGO Plans",
        "Diaspora Health Connect",
        "Other (specify)",
      ],
      required: true,
    },
    {
      name: "licensing_states",
      label: "Licensing State(s)",
      type: "text",
      required: true,
    },
    {
      name: "license_issued_date",
      label: "License Issued Date",
      type: "date",
      required: true,
    },
    {
      name: "license_expiry_date",
      label: "License Expiry Date",
      type: "date",
      required: true,
    },
  ],
  identificationAndPersonalDetails: [
    { name: "provider_id", label: "Provider ID", type: "text", required: true },
    { name: "tin_number", label: "TIN Number", type: "text", required: true },
    {
      name: "provider_last_name",
      label: "Last Name/Facility Name",
      type: "text",
      required: true,
    },
    { name: "provider_first_name", label: "First Name", type: "text" },
    { name: "provider_middle_initial", label: "Middle Initial", type: "text" },
    { name: "provider_title", label: "Title", type: "text" },
    { name: "provider_contact_person", label: "Contact Person", type: "text" },
  ],
  addressAndContactDetails: [
    {
      name: "provider_address",
      label: "Address",
      type: "text",
      required: true,
    },
    { name: "provider_city", label: "City", type: "text", required: true },
    { name: "provider_county", label: "County", type: "text" },
    { name: "provider_region", label: "Region/Zone", type: "text" },
    {
      name: "provider_kifle_ketema",
      label: "Kifle Ketema/Zip Code",
      type: "text",
    },
    { name: "provider_zip_code", label: "Zip Code", type: "text" },
    {
      name: "provider_phone_number",
      label: "Phone Number",
      type: "text",
      required: true,
    },
    { name: "provider_fax", label: "Fax", type: "text" },
    {
      name: "provider_email",
      label: "Email Address",
      type: "email",
      required: true,
    },
  ],
  professionalAndGroupDetails: [
    { name: "provider_type", label: "Provider Type", type: "text" },
    {
      name: "provider_primary_specialty",
      label: "Primary Specialty",
      type: "text",
    },
    { name: "provider_sub_specialty", label: "Sub Specialty", type: "text" },
    {
      name: "medicare_provider_number",
      label: "Medicare Provider Number",
      type: "text",
    },
    { name: "provider_group_name", label: "Group Name", type: "text" },
    {
      name: "provider_group_contact_person",
      label: "Group Contact Person",
      type: "text",
    },
    {
      name: "provider_group_phone_number",
      label: "Group Phone Number",
      type: "text",
    },
    { name: "provider_group_address", label: "Group Address", type: "text" },
  ],
};

const BrokerRegistration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    personalInformation: {},
    businessInformation: {},
    professionalInformation: {},
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

export default BrokerRegistration;
