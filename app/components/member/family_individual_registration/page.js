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
import ReviewInformation from "./ReviewInformation";
const getFormattedReviewData = () => {
  // Organize data for review in a readable format
  const reviewData = [
    {
      heading: "Plan Type",
      fields: [{ label: "Plan Type", value: formData.selection.plan_type }],
    },
    {
      heading: "Primary Member Information",
      fields: [
        { label: "First Name", value: formData.user.first_name },
        { label: "Last Name", value: formData.user.last_name },
        { label: "Gender", value: formData.user.gender },
        { label: "Date of Birth", value: formData.user.dob },
        { label: "Phone Number", value: formData.user.phone_number },
        { label: "Email", value: formData.user.email },
        { label: "Occupation", value: formData.user.occupation },
      ],
    },
    {
      heading: "Address",
      fields: [
        { label: "Street", value: formData.address.street },
        { label: "City", value: formData.address.city },
        { label: "State", value: formData.address.state },
        { label: "Zip Code", value: formData.address.zip },
        { label: "Country", value: formData.address.country },
      ],
    },
    {
      heading: "Family Member Information",
      fields: [
        { label: "Spouse Name", value: formData.family.spouse_name },
        { label: "Spouse Date of Birth", value: formData.family.spouse_dob },
        {
          label: "Number of Children",
          value: formData.family.number_of_children,
        },
      ],
    },
    {
      heading: "Dependent Children Information",
      fields: formData.children.map((child, index) => ({
        label: `Child ${index + 1}`,
        value: `Name: ${child.full_name}, Gender: ${child.gender}, DOB: ${child.dob}, Age: ${child.age}`,
      })),
    },
  ];

  return reviewData;
};

const steps = ["Primary Member Information", "Address", "Review"];
const API_POST = "http://api.tillahealthinsurance.com/members/register";

// Define all fields for each step
const fieldDefinitions = {
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

            {activeStep === 4 && (
              <Box sx={{ padding: 3 }}>
                <Typography>Dependent Children Information:</Typography>
                {formData.children.map((child, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      gap: 2,
                      marginBottom: 2,
                    }}
                  >
                    <TextField
                      label="Full Name"
                      name="full_name"
                      value={child.full_name}
                      onChange={(e) => handleChildChange(index, e)}
                      size="small"
                      margin="dense"
                    />
                    <TextField
                      select
                      label="Select Gender"
                      name="gender"
                      value={child.gender}
                      onChange={(e) => handleChildChange(index, e)}
                      size="small"
                      margin="dense"
                    >
                      {["Male", "Female", "Other"].map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      label="Date of Birth"
                      name="dob"
                      type="date"
                      value={child.dob}
                      onChange={(e) => handleChildChange(index, e)}
                      size="small"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      label="Age"
                      name="age"
                      type="number"
                      value={child.age}
                      onChange={(e) => handleChildChange(index, e)}
                      size="small"
                      margin="dense"
                    />
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removeChild(index)}
                    >
                      Remove
                    </Button>
                  </Box>
                ))}
                <Button variant="outlined" onClick={addChild}>
                  Add Child
                </Button>
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
