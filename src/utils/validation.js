import { useState } from 'react';

// Form validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^(\+90|0)?[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validatePassword = (password) => {
  // En az 6 karakter, 1 büyük harf, 1 küçük harf, 1 rakam
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/;
  return passwordRegex.test(password);
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const validateMinLength = (value, minLength) => {
  return value && value.length >= minLength;
};

export const validateMaxLength = (value, maxLength) => {
  return value && value.length <= maxLength;
};

export const validateNumeric = (value) => {
  return !isNaN(value) && !isNaN(parseFloat(value));
};

export const validatePositiveNumber = (value) => {
  return validateNumeric(value) && parseFloat(value) > 0;
};

// Form validation object
export const formValidators = {
  email: {
    validate: validateEmail,
    message: 'Geçerli bir e-posta adresi giriniz'
  },
  phone: {
    validate: validatePhone,
    message: 'Geçerli bir telefon numarası giriniz'
  },
  password: {
    validate: validatePassword,
    message: 'Şifre en az 6 karakter olmalı ve büyük harf, küçük harf ve rakam içermelidir'
  },
  required: {
    validate: validateRequired,
    message: 'Bu alan zorunludur'
  },
  minLength: (minLength) => ({
    validate: (value) => validateMinLength(value, minLength),
    message: `En az ${minLength} karakter giriniz`
  }),
  maxLength: (maxLength) => ({
    validate: (value) => validateMaxLength(value, maxLength),
    message: `En fazla ${maxLength} karakter giriniz`
  }),
  numeric: {
    validate: validateNumeric,
    message: 'Sadece sayı giriniz'
  },
  positiveNumber: {
    validate: validatePositiveNumber,
    message: 'Pozitif bir sayı giriniz'
  }
};

// Form validation hook
export const useFormValidation = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    const fieldValidators = {
      email: formValidators.email,
      phone: formValidators.phone,
      password: formValidators.password,
      name: formValidators.required,
      surname: formValidators.required,
      address: formValidators.required,
      city: formValidators.required,
      zipCode: formValidators.required
    };

    const validator = fieldValidators[name];
    if (!validator) return '';

    return validator.validate(value) ? '' : validator.message;
  };

  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, values[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(values).forEach(key => {
      const error = validateField(key, values[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setValues
  };
}; 