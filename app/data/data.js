export const MINIMUM_CARD_HEIGHT = "h-16";
import diaspora from "../../public/assets/diasporaOne.png";
import family from "../../public/assets/familyOne.png";
import federal from "../../public/assets/gov.png";
import ngo from "../../public/assets/ngoOne.png";
import privateSector from "../../public/assets/private_sector.png";
export const planData = [
  {
    id: "diaspora",
    title: "Diaspora",
    description: "International insurance plan for Diaspora members.",
    image: diaspora, // Image path from the public/images folder
    link: "/components/member/personal-representative-choice", // The link for the Diaspora plan
  },
  {
    id: "individual-or-family",
    title: "Individual or Family",
    description: "Plans for individuals or families seeking coverage.",
    image: family, // Image path from the public/images folder
    link: "/components/member/family_or_individual", // The link for the Individual or Family plan
  },
  {
    id: "private-sector",
    title: "Private Sector",
    description: "Insurance plans for employees in the private sector.",
    image: privateSector, // Image path from the public/images folder
    link: "/components/member/private_sector_registration", // The link for the Private Sector plan
  },
  {
    id: "ngo",
    title: "NGO",
    description: "Specialized plans for NGO workers and their families.",
    image: ngo, // Image path from the public/images folder
    link: "/components/member/ngo_registration", // The link for the Individual or Family plan
  },
  {
    id: "federal-employee",
    title: "Federal Employee Program",
    description: "Exclusive plans for federal employees.",
    image: federal, // Image path from the public/images folder
    link: "/components/member/federal_employee-registration", // The link for the Federal Employee Program plan
  },
];

export const claims = [];

export const others = [
  { id: 1, label: "Brokers" },
  { id: 2, label: "Broker Agent" },
];
export const members = [
  { id: 1, label: "Subscription" },
  { id: 2, label: "Member Account" },
  { id: 3, label: "Member Health Condition" },
  { id: 4, label: "Account" },
  { id: 5, label: "Compliance Program" },
  { id: 6, label: "Accumulator Adjustment" },
  { id: 7, label: "External Member" },
];

export const provider = [
  { id: 1, label: "Practitioner" },
  { id: 2, label: "Supplier" },
  { id: 3, label: "Supplier Location" },
  { id: 4, label: "Supplier Network" },
  { id: 5, label: "Named Provider Grouping" },
  { id: 6, label: "Tax Entity" },
  { id: 7, label: "Quality Adjustment Table" },
  { id: 8, label: "Quality Adjustment Detail" },
];

export const finances = [
  { id: 1, label: "Premium Payment" },
  { id: 2, label: "Premium Payable" },
];

export const funding = [
  { id: 1, label: "Funding Adjustment" },
  { id: 2, label: "Funding Payment" },
];
export const utilization = [];

export const administration = [
  { id: 1, label: "Business calendar" },
  { id: 2, label: "User account" },
];

export const financials = [
  { id: 1, label: "Brokers" },
  { id: 2, label: "Brokers" },
];
