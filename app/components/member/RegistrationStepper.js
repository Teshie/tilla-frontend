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
} from "@mui/material";

const steps = [
  "Personal Information",
  // "Account Details",
  "Address Information",
  "Employment Information",
  "Medicare Information",
  "Attachement",
  "Other IDs",
  "Language",
  "Communication",
  "House Hold",
  // "Authorization",
  // "Case",
  // "Compliance Program",
  // "Episode of Core",
  "Review",
];

// Field configuration for each step
const fieldDefinitions = {
  personalInformation: [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "hicnRrb", label: "HICN/RRB", type: "text" },
    { name: "alerts", label: "Alerts", type: "text" },
    { name: "height", label: "Height", type: "number" },
    { name: "weight", label: "Weight", type: "number" },
    { name: "workBasketState", label: "Work Basket State", type: "text" },
    { name: "dateOfBirth", label: "Date of Birth", type: "date" },
    { name: "status", label: "Status", type: "text" },
    { name: "gender", label: "Gender", type: "text" },
    { name: "phone", label: "Phone", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "sexualOrientation", label: "Sexual Orientation", type: "text" },
    { name: "raceEthnicity", label: "Race/Ethnicity", type: "text" },
    { name: "genderIdentity", label: "Gender Identity", type: "text" },
    {
      name: "memberToSendChecksTo",
      label: "Member to Send Checks To",
      type: "text",
    },
    { name: "otherNames", label: "Other Names", type: "text" },
    { name: "smokingStatus", label: "Smoking Status", type: "text" },
    { name: "vipReason", label: "VIP Reason", type: "text" },
    { name: "informationSource", label: "Information Source", type: "text" },
    { name: "handicapped", label: "Handicapped", type: "checkbox" },
    { name: "inHospice", label: "In Hospice", type: "checkbox" },
  ],
  // accountDetails: [
  //   { name: "username", label: "Username", type: "text" },
  //   { name: "password", label: "Password", type: "password" },
  // ],
  addressInformation: [
    { name: "street", label: "Street", type: "text" },
    {
      name: "house_number",
      label: "House Number",
      type: "text",
      default: "100",
    },
    {
      name: "address_type",
      label: "Address Type",
      type: "text",
      default: "Home",
    },
    { name: "city", label: "City", type: "text" },
    { name: "kifle_ketema", label: "Kifle Ketema", type: "text" },
    { name: "wereda", label: "Wereda", type: "text" },
    { name: "kebele", label: "Kebele", type: "text" },
    { name: "region", label: "Region", type: "text" },
    { name: "zip_postal_code", label: "Zip/Postal Code", type: "text" },
    { name: "longitude", label: "Longitude", type: "number" },
    { name: "latitude", label: "Latitude", type: "number" },
    { name: "country", label: "Country", type: "text", default: "Ethiopia" },
  ],
  employmentInformation: [
    { name: "companyName", label: "Company Name", type: "text" },
    { name: "position", label: "Position", type: "text" },
    { name: "employmentStatus", label: "Employment Status", type: "text" },
    { name: "yearsEmployed", label: "Years Employed", type: "number" },
  ],
  medicare: [
    { name: "medicareNumber", label: "Medicare Number", type: "text" },
    { name: "planType", label: "Plan Type", type: "text" },
    { name: "coverageStartDate", label: "Coverage Start Date", type: "date" },
    { name: "coverageEndDate", label: "Coverage End Date", type: "date" },
  ],
  attachmentInformation: [
    {
      name: "file_name",
      label: "File Name",
      type: "text",
      InputLabelProps: { shrink: true },
    },
    { name: "file", label: "File", type: "file" },
    { name: "link", label: "Link", type: "text" },
    { name: "description", label: "Description", type: "text" },
    { name: "classification", label: "Classification", type: "text" },
    { name: "user", label: "User", type: "text" }, // Assuming you'll have a dropdown or select for users
    {
      name: "external_reference_number",
      label: "External Reference Number",
      type: "text",
    },
    { name: "date_modified", label: "Date Modified", type: "datetime-local" },
    { name: "deactivated", label: "Deactivated", type: "checkbox" },
  ],
  otherIDInformation: [
    {
      name: "type",
      label: "Type",
      type: "text",
      InputLabelProps: { shrink: true },
    },
    {
      name: "province",
      label: "Province",
      type: "text",
      InputLabelProps: { shrink: true },
    },
    {
      name: "country",
      label: "Country",
      type: "text",
      InputLabelProps: { shrink: true },
    },
    { name: "id_number", label: "ID Number", type: "number" },
    {
      name: "effective_date",
      label: "Effective Date",
      type: "date",
      InputLabelProps: { shrink: true },
    },
    {
      name: "through_date",
      label: "Through Date",
      type: "date",
      InputLabelProps: { shrink: true },
    },
  ],
  languageInformation: [
    {
      name: "name",
      label: "Name",
      type: "text",
      InputLabelProps: { shrink: true },
    },
    { name: "primary", label: "Primary", type: "checkbox" },
    { name: "native", label: "Native", type: "checkbox" },
  ],
  communicationInformation: [
    {
      name: "contact_method",
      label: "Contact Method",
      type: "text",
      InputLabelProps: { shrink: true },
    },
    {
      name: "email_format",
      label: "Email Format",
      type: "text",
      InputLabelProps: { shrink: true },
    },
    {
      name: "document_delivery_method",
      label: "Document Delivery Method",
      type: "text",
      InputLabelProps: { shrink: true },
    },
  ],
  householdInformation: [
    {
      name: "first_name",
      label: "First Name",
      type: "text",
      InputLabelProps: { shrink: true },
    },
    {
      name: "last_name",
      label: "Last Name",
      type: "text",
      InputLabelProps: { shrink: true },
    },
  ],
};

const RegistrationStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    personalInformation: {},
    // accountDetails: {},
    addressInformation: {},
    employmentInformation: {},
    medicare: {},
    attachmentInformation: {},
    otherIDInformation: {},
    languageInformation: {},
    communicationInformation: {},
    householdInformation: {},
    // authorizationInformation: {},
    // caseInformation: {},
    // complianceProgramInformation: {},
    // episodeOfCareInformation: {},
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
    console.log("Form data submitted:", formData);
  };

  // Get the current step's field configuration
  const getStepFields = () => {
    const stepKeys = Object.keys(fieldDefinitions);
    return fieldDefinitions[stepKeys[activeStep]];
  };

  const getStepDataKey = () => {
    const stepKeys = Object.keys(fieldDefinitions);
    return stepKeys[activeStep];
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ padding: 3 }}>
        {/* Form Fields for the current step */}
        {activeStep < steps.length - 1 && (
          <Box
            component="form"
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: "repeat(3, 1fr)", // Three columns layout
            }}
          >
            {getStepFields().map((field) => (
              <TextField
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type}
                value={formData[getStepDataKey()][field?.name] || ""}
                onChange={(e) => handleChange(e, getStepDataKey())}
                size="small"
                margin="dense"
                InputLabelProps={field.type === "date" ? { shrink: true } : {}}
              />
            ))}
          </Box>
        )}

        {/* Review Step */}
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
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={
              activeStep === steps.length - 1 ? handleSubmit : handleNext
            }
          >
            {activeStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RegistrationStepper;
