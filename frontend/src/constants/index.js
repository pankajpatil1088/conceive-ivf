export const APPOINTMENT_TYPES = [
  'Consultation',
  'Follow-up',
  'Treatment',
  'Monitoring',
  'Surgery',
  'Lab Work',
  'Counseling'
];

export const DOCTORS = [
  'Dr. Smith',
  'Dr. Johnson',
  'Dr. Brown',
  'Dr. Wilson',
  'Dr. Davis'
];

export const TREATMENT_TYPES = [
  'IVF (In Vitro Fertilization)',
  'IUI (Intrauterine Insemination)',
  'ICSI (Intracytoplasmic Sperm Injection)',
  'Egg Freezing',
  'Sperm Freezing',
  'Embryo Freezing',
  'Fertility Assessment',
  'Hormone Therapy',
  'Surgery',
  'Consultation'
];

export const BLOOD_GROUPS = [
  'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
];

export const GENDERS = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'other', label: 'Other' }
];

export const PATIENT_STATUSES = [
  'Active',
  'Inactive',
  'Treatment',
  'Completed'
];

export const APPOINTMENT_STATUSES = [
  'confirmed',
  'pending',
  'cancelled',
  'completed'
];

export const EMERGENCY_RELATIONS = [
  'Spouse',
  'Parent',
  'Sibling',
  'Friend',
  'Other'
];

export const INFERTILITY_REASONS = [
  { value: 'male-factor', label: 'Male Factor Infertility' },
  { value: 'female-factor', label: 'Female Factor Infertility' },
  { value: 'unexplained', label: 'Unexplained Infertility' },
  { value: 'tubal-factor', label: 'Tubal Factor' },
  { value: 'endometriosis', label: 'Endometriosis' },
  { value: 'ovulatory-disorders', label: 'Ovulatory Disorders' },
  { value: 'other', label: 'Other' }
];

export const IVF_ATTEMPTS = [
  { value: '0', label: 'None' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4+', label: '4 or more' }
];

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PATIENTS: '/patients',
  APPOINTMENTS: '/appointments',
  REGISTER: '/register',
  DAY2_EVALUATION: '/day2-evaluation',
  REPORTS: '/reports',
  ANALYTICS: '/analytics',
  SETTINGS: '/settings',
  PLANNING_DETAILS: '/planning-details'
};

export const LOCAL_STORAGE_KEYS = {
  USER: 'user',
  THEME_COLORS: 'theme-colors',
  THEME_LOGO: 'theme-logo',
  SIDEBAR_COLLAPSED: 'sidebar-collapsed'
};