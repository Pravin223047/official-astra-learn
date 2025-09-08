import { Candidate, Job, ChatMessage } from "./types";

// Mock data for candidates
export const candidates: Candidate[] = [
  {
    id: "1",
    name: "Alex Johnson",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150",
    github: "https://github.com/alexjohnson",
    linkedin: "https://linkedin.com/in/alexjohnson",
    portfolio: "https://alexjohnson.dev",
    selected: false,
    resumeScore: 85,
    resumeUrl: "/resumes/alex-johnson.pdf",
    atsScore: 92,
    mockInterviews: 3,
    skills: ["React", "TypeScript", "Node.js", "GraphQL"],
    education: [
      {
        id: "edu-1-1",
        institution: "MIT",
        degree: "Bachelor of Science",
        field: "Computer Science",
        location: "Cambridge, MA",
        startYear: 2015,
        endYear: 2019,
        startDate: "2015-09",
        current: false,
      },
    ],
    experience: [
      {
        id: "exp-1-1",
        company: "TechCorp",
        position: "Senior Frontend Developer",
        location: "San Francisco, CA",
        startDate: "2019-06",
        endDate: "2023-02",
        current: false,
        description:
          "Led frontend development of multiple projects using React and TypeScript.",
        achievements: [
          "Promoted to Senior Developer within 2 years",
          "Implemented company-wide TypeScript migration",
        ],
      },
    ],
    notes: "Excellent communication skills, strong problem-solver.",
  },
  {
    id: "2",
    name: "Samantha Lee",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150",
    github: "https://github.com/samanthalee",
    linkedin: "https://linkedin.com/in/samanthalee",
    selected: true,
    resumeScore: 92,
    resumeUrl: "/resumes/samantha-lee.pdf",
    atsScore: 88,
    mockInterviews: 2,
    skills: ["Vue.js", "JavaScript", "Python", "Django"],
    education: [
      {
        id: "edu-2-1",
        institution: "Stanford University",
        degree: "Master of Science",
        field: "Software Engineering",
        location: "Stanford, CA",
        startYear: 2017,
        endYear: 2019,
        startDate: "2017-09",
        current: false,
      },
      {
        id: "edu-2-2",
        institution: "UC Berkeley",
        degree: "Bachelor of Arts",
        field: "Computer Science",
        location: "Berkeley, CA",
        startYear: 2013,
        endYear: 2017,
        startDate: "2013-09",
        current: false,
      },
    ],
    experience: [
      {
        id: "exp-2-1",
        company: "WebTech Solutions",
        position: "Full Stack Developer",
        location: "Remote",
        startDate: "2019-08",
        endDate: undefined,
        current: true,
        description:
          "Developing full-stack applications using Vue.js and Django.",
        achievements: [],
      },
    ],
  },
  {
    id: "3",
    name: "David Chen",
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150",
    github: "https://github.com/davidchen",
    linkedin: "https://linkedin.com/in/davidchen",
    portfolio: "https://davidchen.io",
    selected: false,
    resumeScore: 78,
    atsScore: 82,
    mockInterviews: 1,
    skills: ["Angular", "TypeScript", "Java", "Spring"],
    education: [
      {
        id: "edu-3-1",
        institution: "CalTech",
        degree: "Bachelor of Science",
        field: "Computer Engineering",
        location: "Pasadena, CA",
        startYear: 2014,
        endYear: 2018,
        startDate: "2014-09",
        current: false,
      },
    ],
    experience: [
      {
        id: "exp-3-1",
        company: "Enterprise Solutions",
        position: "Backend Developer",
        location: "San Jose, CA",
        startDate: "2018-07",
        endDate: "2021-11",
        current: false,
        description: "Built robust backend services using Java and Spring.",
        achievements: [],
      },
      {
        id: "exp-3-2",
        company: "Tech Innovations",
        position: "Full Stack Engineer",
        location: "San Jose, CA",
        startDate: "2021-12",
        current: true,
        description:
          "Working on full-stack applications with Angular and Spring.",
        achievements: [],
      },
    ],
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150",
    github: "https://github.com/emilyrodriguez",
    linkedin: "https://linkedin.com/in/emilyrodriguez",
    selected: false,
    resumeScore: 90,
    resumeUrl: "/resumes/emily-rodriguez.pdf",
    atsScore: 94,
    mockInterviews: 4,
    skills: ["React", "Redux", "Node.js", "MongoDB", "Express"],
    education: [
      {
        id: "edu-4-1",
        institution: "Harvard University",
        degree: "Master of Science",
        field: "Data Science",
        location: "Cambridge, MA",
        startYear: 2018,
        endYear: 2020,
        startDate: "2018-09",
        current: false,
      },
      {
        id: "edu-4-2",
        institution: "Boston University",
        degree: "Bachelor of Science",
        field: "Computer Science",
        location: "Boston, MA",
        startYear: 2014,
        endYear: 2018,
        startDate: "2014-09",
        current: false,
      },
    ],
    experience: [
      {
        id: "exp-4-1",
        company: "DataTech",
        position: "Data Engineer",
        location: "Remote",
        startDate: "2020-05",
        endDate: "2022-09",
        current: false,
        description: "Developed data pipelines and analytics tools.",
        achievements: [],
      },
      {
        id: "exp-4-2",
        company: "SoftServe",
        position: "MERN Stack Developer",
        location: "Remote",
        startDate: "2022-10",
        current: true,
        description: "Building scalable web applications using the MERN stack.",
        achievements: [],
      },
    ],
    notes: "Highly analytical, great team player.",
  },
  {
    id: "5",
    name: "Michael Wilson",
    avatar:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150",
    github: "https://github.com/michaelwilson",
    linkedin: "https://linkedin.com/in/michaelwilson",
    portfolio: "https://michaelwilson.me",
    selected: true,
    resumeScore: 88,
    atsScore: 86,
    mockInterviews: 2,
    skills: ["Python", "Django", "JavaScript", "Docker", "AWS"],
    education: [
      {
        id: "edu-5-1",
        institution: "University of Washington",
        degree: "Bachelor of Science",
        field: "Software Engineering",
        location: "Seattle, WA",
        startYear: 2016,
        endYear: 2020,
        startDate: "2016-09",
        current: false,
      },
    ],
    experience: [
      {
        id: "exp-5-1",
        company: "Cloud Solutions",
        position: "DevOps Engineer",
        location: "Seattle, WA",
        startDate: "2020-08",
        endDate: undefined,
        current: true,
        description: "Managing cloud infrastructure and CI/CD pipelines.",
        achievements: [],
      },
    ],
  },
  {
    id: "6",
    name: "Olivia Martinez",
    avatar:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150",
    github: "https://github.com/oliviamartinez",
    linkedin: "https://linkedin.com/in/oliviamartinez",
    selected: false,
    resumeScore: 82,
    resumeUrl: "/resumes/olivia-martinez.pdf",
    atsScore: 78,
    mockInterviews: 1,
    skills: ["iOS", "Swift", "Objective-C", "UIKit", "SwiftUI"],
    education: [
      {
        id: "edu-6-1",
        institution: "Cornell University",
        degree: "Bachelor of Science",
        field: "Information Science",
        location: "Ithaca, NY",
        startYear: 2015,
        endYear: 2019,
        startDate: "2015-09",
        current: false,
      },
    ],
    experience: [
      {
        id: "exp-6-1",
        company: "AppWorks",
        position: "iOS Developer",
        location: "Remote",
        startDate: "2019-07",
        endDate: undefined,
        current: true,
        description: "Developing native iOS applications for various clients.",
        achievements: [],
      },
    ],
  },
];

// Mock data for jobs
export const jobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    techStack: ["React", "TypeScript", "Redux", "GraphQL"],
    description:
      "We are looking for a Senior Frontend Developer to join our Engineering team.",
    responsibilities: [
      "Build efficient and reusable front-end components",
      "Collaborate with back-end developers and web designers",
      "Optimize applications for maximum speed and scalability",
      "Implement responsive design",
    ],
    requirements: [
      "5+ years of experience with React",
      "Strong knowledge of TypeScript",
      "Experience with GraphQL",
      "Understanding of CI/CD pipelines",
    ],
    postedDate: "2023-05-15",
    status: "Open",
  },
  {
    id: "2",
    title: "Full Stack Developer",
    department: "Product",
    location: "Remote",
    type: "Full-time",
    techStack: ["Node.js", "Express", "React", "MongoDB"],
    description:
      "Join our Product team as a Full Stack Developer and help build our core platform.",
    responsibilities: [
      "Develop both client and server-side applications",
      "Implement security and data protection",
      "Design and develop APIs",
      "Collaborate with the product team",
    ],
    requirements: [
      "3+ years of experience with full-stack development",
      "Strong understanding of JavaScript/TypeScript",
      "Experience with React and Node.js",
      "Knowledge of MongoDB or similar NoSQL databases",
    ],
    postedDate: "2023-06-02",
    status: "Open",
  },
  {
    id: "3",
    title: "UI/UX Designer",
    department: "Design",
    location: "New York, NY",
    type: "Full-time",
    techStack: ["Figma", "Adobe XD", "Sketch", "HTML/CSS"],
    description:
      "We are seeking a talented UI/UX Designer to create amazing user experiences.",
    responsibilities: [
      "Create wireframes, prototypes, and mockups",
      "Collaborate with product managers and engineers",
      "Conduct user research and testing",
      "Establish design guidelines",
    ],
    requirements: [
      "3+ years of experience in UI/UX design",
      "Proficiency in design tools like Figma or Sketch",
      "Understanding of HTML/CSS",
      "Portfolio showcasing design projects",
    ],
    postedDate: "2023-05-28",
    status: "Open",
  },
  {
    id: "4",
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Seattle, WA",
    type: "Full-time",
    techStack: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
    description:
      "Join our Infrastructure team to build and maintain our cloud infrastructure.",
    responsibilities: [
      "Design and implement CI/CD pipelines",
      "Manage cloud infrastructure on AWS",
      "Implement infrastructure as code using Terraform",
      "Monitor and optimize system performance",
    ],
    requirements: [
      "4+ years of experience with DevOps practices",
      "Strong knowledge of AWS services",
      "Experience with container orchestration",
      "Understanding of security best practices",
    ],
    postedDate: "2023-06-10",
    status: "Open",
  },
  {
    id: "5",
    title: "Data Scientist",
    department: "Data",
    location: "Remote",
    type: "Contract",
    techStack: ["Python", "TensorFlow", "PyTorch", "SQL"],
    description:
      "Looking for a Data Scientist to help analyze and model our data.",
    responsibilities: [
      "Develop machine learning models",
      "Analyze large datasets to extract insights",
      "Collaborate with product and engineering teams",
      "Present findings to stakeholders",
    ],
    requirements: [
      "Master's degree in a quantitative field",
      "Strong programming skills in Python",
      "Experience with machine learning frameworks",
      "Knowledge of SQL and database systems",
    ],
    postedDate: "2023-05-20",
    status: "Closed",
  },
];

// Mock chat messages
export const chatMessages: ChatMessage[] = [
  {
    id: "1",
    senderId: "hr",
    receiverId: "2",
    message:
      "Hi Samantha, we were impressed with your application. When would you be available for an interview?",
    timestamp: "2023-06-15T10:30:00Z",
    read: true,
  },
  {
    id: "2",
    senderId: "2",
    receiverId: "hr",
    message:
      "Hello! Thank you for reaching out. I am available next Monday or Tuesday afternoon.",
    timestamp: "2023-06-15T11:45:00Z",
    read: true,
  },
  {
    id: "3",
    senderId: "hr",
    receiverId: "2",
    message:
      "Great, let's schedule for next Tuesday at 2 PM. I'll send a calendar invite shortly.",
    timestamp: "2023-06-15T13:20:00Z",
    read: true,
  },
  {
    id: "4",
    senderId: "hr",
    receiverId: "5",
    message:
      "Hello Michael, we have reviewed your application and would like to proceed with the next steps.",
    timestamp: "2023-06-16T09:15:00Z",
    read: false,
  },
];

// Get all unique tech stack skills across candidates
export const getAllSkills = (): string[] => {
  const skillsSet = new Set<string>();

  candidates.forEach((candidate) => {
    candidate.skills.forEach((skill) => {
      skillsSet.add(skill);
    });
  });

  return Array.from(skillsSet).sort();
};

// Get all unique tech stack skills across jobs
export const getAllJobSkills = (): string[] => {
  const skillsSet = new Set<string>();

  jobs.forEach((job) => {
    job.techStack.forEach((skill) => {
      skillsSet.add(skill);
    });
  });

  return Array.from(skillsSet).sort();
};

// Get all unique departments
export const getAllDepartments = (): string[] => {
  const departmentsSet = new Set<string>();

  jobs.forEach((job) => {
    departmentsSet.add(job.department);
  });

  return Array.from(departmentsSet).sort();
};

// Get all unique locations
export const getAllLocations = (): string[] => {
  const locationsSet = new Set<string>();

  jobs.forEach((job) => {
    locationsSet.add(job.location);
  });

  return Array.from(locationsSet).sort();
};
