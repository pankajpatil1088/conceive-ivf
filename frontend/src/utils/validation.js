export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

export const validateMinLength = (value, minLength) => {
  return value && value.toString().length >= minLength;
};

export const validateMaxLength = (value, maxLength) => {
  return !value || value.toString().length <= maxLength;
};

export const validateAge = (age) => {
  const numAge = parseInt(age);
  return numAge >= 0 && numAge <= 120;
};

export const validateDate = (date) => {
  const dateObj = new Date(date);
  return dateObj instanceof Date && !isNaN(dateObj);
};

export const validatePatientForm = (formData) => {
  const errors = {};

  if (!validateRequired(formData.firstName)) {
    errors.firstName = 'First name is required';
  }

  if (!validateRequired(formData.lastName)) {
    errors.lastName = 'Last name is required';
  }

  if (!validateEmail(formData.email)) {
    errors.email = 'Valid email is required';
  }

  if (!validatePhone(formData.phone)) {
    errors.phone = 'Valid phone number is required';
  }

  if (!validateRequired(formData.dateOfBirth)) {
    errors.dateOfBirth = 'Date of birth is required';
  }

  if (!validateRequired(formData.gender)) {
    errors.gender = 'Gender is required';
  }

  if (!validateRequired(formData.emergencyName)) {
    errors.emergencyName = 'Emergency contact name is required';
  }

  if (!validatePhone(formData.emergencyPhone)) {
    errors.emergencyPhone = 'Valid emergency contact phone is required';
  }

  if (!validateRequired(formData.emergencyRelation)) {
    errors.emergencyRelation = 'Emergency contact relationship is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateAppointmentForm = (formData) => {
  const errors = {};

  if (!validateRequired(formData.patientName)) {
    errors.patientName = 'Patient name is required';
  }

  if (!validateEmail(formData.patientEmail)) {
    errors.patientEmail = 'Valid email is required';
  }

  if (!validatePhone(formData.patientPhone)) {
    errors.patientPhone = 'Valid phone number is required';
  }

  if (!validateRequired(formData.date)) {
    errors.date = 'Appointment date is required';
  }

  if (!validateRequired(formData.time)) {
    errors.time = 'Appointment time is required';
  }

  if (!validateRequired(formData.type)) {
    errors.type = 'Appointment type is required';
  }

  if (!validateRequired(formData.doctor)) {
    errors.doctor = 'Doctor selection is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};