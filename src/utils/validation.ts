export interface ValidationState {
  width: string | null;
  height: string | null;
}

export const validateDimension = (
  value: string,
  field: 'width' | 'height'
): string | null => {
  if (!value) {
    return 'Required';
  }
  
  const num = parseInt(value);
  if (isNaN(num) || num <= 0) {
    return 'Must be greater than 0';
  }
  
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return 'Password is required';
  }

  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }

  // Add more password requirements if needed
  // Example:
  // if (!/[A-Z]/.test(password)) {
  //   return 'Password must contain at least one uppercase letter';
  // }

  return null;
};