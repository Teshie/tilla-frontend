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
  "NGO Information",
  "Contact Person Information",
  "Employee Member Information",
  "Enrollment  Information",
  "Identification",
  "Emergency Contact Information",
  "Review",
];
// const API_POST = "http://api.tillahealthinsurance.com/members/register";
const API_POST = "http://127.0.0.1:8000/api/ngo/";

// Define all fields for each step
const fieldDefinitions = {
  ngo: [
    { name: "ngo_name", label: "NGO Name", type: "text", required: true },
    {
      name: "ngo_registration_number",
      label: "NGO Registration Number",
      type: "text",
      required: true,
    },
    {
      name: "ngo_country",
      label: "NGO Country of Origin",
      type: "text",
      required: true,
    },
    {
      name: "ngo_street_address",
      label: "Street Address",
      type: "text",
      required: true,
    },
    { name: "ngo_city", label: "City", type: "text", required: true },
    { name: "ngo_region", label: "Region/Zone", type: "text", required: true },
    { name: "ngo_kifle_ketema", label: "Kifle Ketema/Zip Code", type: "text" },
    {
      name: "ngo_country_address",
      label: "Country",
      type: "text",
      required: true,
    },
    {
      name: "ngo_phone",
      label: "NGO Phone Number",
      type: "text",
      required: true,
    },
    {
      name: "ngo_email",
      label: "NGO Email Address",
      type: "email",
      required: true,
    },
  ],
  contact: [
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
      label: "Contact Person’s Position/Title",
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
  employee: [
    { name: "employee_id", label: "Employee ID", type: "text", required: true },
    {
      name: "employee_last_name",
      label: "Employee's Last Name",
      type: "text",
      required: true,
    },
    {
      name: "employee_first_name",
      label: "Employee's First Name",
      type: "text",
      required: true,
    },
    {
      name: "employee_middle_initial",
      label: "Employee's Middle Initial",
      type: "text",
    },
    {
      name: "employee_gender",
      label: "Gender",
      type: "select",
      options: ["Male", "Female", "Other"],
      required: true,
    },
    {
      name: "employee_dob",
      label: "Employee's Date of Birth",
      type: "date",
      required: true,
    },
    {
      name: "employee_age",
      label: "Employee's Age",
      type: "number",
      required: true,
    },
    {
      name: "employee_position",
      label: "Employee's Position/Title",
      type: "text",
    },
    {
      name: "employee_department",
      label: "Employee's Department",
      type: "text",
    },
  ],
  employeeContact: [
    {
      name: "employee_phone",
      label: "Employee's Phone Number",
      type: "text",
      required: true,
    },
    {
      name: "employee_email",
      label: "Employee's Email Address",
      type: "email",
      required: true,
    },
    {
      name: "employee_address",
      label: "Employee's Mailing Address Line 1",
      type: "text",
      required: true,
    },
    { name: "employee_city", label: "City", type: "text", required: true },
    {
      name: "employee_region",
      label: "Region/Zone",
      type: "text",
      required: true,
    },
    {
      name: "employee_kifle_ketema",
      label: "Kifle Ketema/Zip Code",
      type: "text",
    },
    {
      name: "employee_country",
      label: "Country",
      type: "text",
      required: true,
    },
  ],
  enrollment: [
    {
      name: "enrollment_start_date",
      label: "Enrollment Start Date",
      type: "date",
      required: true,
    },
    { name: "enrollment_end_date", label: "Enrollment End Date", type: "date" },
    {
      name: "employee_status",
      label: "Employee Status",
      type: "select",
      options: ["Full-Time", "Part-Time", "Volunteer", "Intern"],
      required: true,
    },
  ],
  identification: [
    {
      name: "national_id",
      label: "Employee National ID Number",
      type: "text",
      required: true,
    },
    { name: "member_id", label: "Member ID", type: "text" },
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
      label: "Emergency Contact Relationship",
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
      label: "Emergency Contact Address",
      type: "text",
    },
  ],
};

const MemberBasicRegistration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    ngo: {},
    contact: {},
    employee: {},
    employeeContact: {},
    enrollment: {},
    identification: {},
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
  console.log(formData, "formdata");

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
