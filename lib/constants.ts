import { ResumeTemplate } from "./types";

export const RESUME_TEMPLATES: ResumeTemplate[] = [
  {
    id: "professional",
    name: "Professional",
    description: "A clean, professional template suitable for most industries",
    thumbnail: "/templates/professional.png",
  },
  {
    id: "modern",
    name: "Modern",
    description: "A contemporary design with a creative touch",
    thumbnail: "/templates/modern.png",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "A simple, elegant design focusing on content",
    thumbnail: "/templates/minimalist.png",
  },
  {
    id: "creative",
    name: "Creative",
    description: "A bold design for creative professions",
    thumbnail: "/templates/creative.png",
  },
  {
    id: "executive",
    name: "Executive",
    description: "A sophisticated design for senior positions",
    thumbnail: "/templates/executive.png",
  },
];

export const FONT_FAMILIES = [
  { value: "inter", label: "Inter" },
  { value: "roboto", label: "Roboto" },
  { value: "open-sans", label: "Open Sans" },
  { value: "montserrat", label: "Montserrat" },
  { value: "poppins", label: "Poppins" },
  { value: "lato", label: "Lato" },
  { value: "playfair-display", label: "Playfair Display" },
  { value: "merriweather", label: "Merriweather" },
];

export const COLOR_SCHEMES = [
  {
    value: "blue",
    label: "Professional Blue",
    primary: "#1a73e8",
    secondary: "#4285f4",
  },
  {
    value: "teal",
    label: "Modern Teal",
    primary: "#009688",
    secondary: "#4db6ac",
  },
  {
    value: "purple",
    label: "Creative Purple",
    primary: "#673ab7",
    secondary: "#9575cd",
  },
  { value: "red", label: "Bold Red", primary: "#e53935", secondary: "#ef5350" },
  {
    value: "green",
    label: "Nature Green",
    primary: "#43a047",
    secondary: "#66bb6a",
  },
  {
    value: "orange",
    label: "Warm Orange",
    primary: "#fb8c00",
    secondary: "#ffb74d",
  },
  {
    value: "gray",
    label: "Classic Gray",
    primary: "#455a64",
    secondary: "#78909c",
  },
  {
    value: "pink",
    label: "Vibrant Pink",
    primary: "#ec407a",
    secondary: "#f48fb1",
  },
  {
    value: "indigo",
    label: "Deep Indigo",
    primary: "#3f51b5",
    secondary: "#7986cb",
  },
  {
    value: "amber",
    label: "Bright Amber",
    primary: "#ffca28",
    secondary: "#ffd54f",
  },
  {
    value: "lime",
    label: "Fresh Lime",
    primary: "#c0ca33",
    secondary: "#d4e157",
  },
  {
    value: "cyan",
    label: "Cool Cyan",
    primary: "#00acc1",
    secondary: "#4dd0e1",
  },
  {
    value: "brown",
    label: "Earthy Brown",
    primary: "#6d4c41",
    secondary: "#8d6e63",
  },
  {
    value: "gold",
    label: "Royal Gold",
    primary: "#bfa700",
    secondary: "#ffd700",
  },
  {
    value: "navy",
    label: "Elegant Navy",
    primary: "#003366",
    secondary: "#336699",
  },
  {
    value: "mint",
    label: "Soft Mint",
    primary: "#98ff98",
    secondary: "#b2fab4",
  },
];

export const PHOTO_BORDER_RADIUS = [
  { value: "square", label: "Square" },
  { value: "rounded", label: "Rounded" },
  { value: "circle", label: "Circle" },
];

export const FORM_STEPS = [
  { id: "personal", title: "Personal Info" },
  { id: "experience", title: "Experience" },
  { id: "education", title: "Education" },
  { id: "projects", title: "Projects" },
  { id: "skills", title: "Skills" },
  { id: "certifications", title: "Certifications" },
  { id: "languages", title: "Languages" },
  { id: "preview", title: "Preview & Export" },
];

export const DEFAULT_RESUME_DATA = {
  personal: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    summary: "",
    photo: "",
  },
  experience: [],
  education: [],
  projects: [],
  skillCategories: [
    {
      id: "technical",
      name: "Technical Skills",
      skills: [],
    },
    {
      id: "soft",
      name: "Soft Skills",
      skills: [],
    },
  ],
  certifications: [],
  languages: [],
  awards: [],
  customSections: [],
};

export const DEFAULT_CUSTOMIZATION = {
  template: "professional",
  fontFamily: "inter",
  fontSize: "medium",
  colorScheme: "blue",
  spacing: "balanced",
  showBulletPoints: true,
  includeLinks: true,
  headerStyle: "left-aligned",
  showPhoto: false,
  photoBorderRadius: "rounded",
} as const;

export const PROFICIENCY_LEVELS = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
  { value: "Fluent", label: "Fluent" },
  { value: "Native", label: "Native" },
];
