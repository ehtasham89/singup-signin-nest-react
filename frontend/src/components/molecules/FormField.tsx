import React from 'react';
import { Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';

interface FormFieldProps {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  error?: string;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, name, placeholder, type = 'text', error, ...rest }, ref) => (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        id={name}
        name={name}
        placeholder={placeholder}
        type={type}
        ref={ref}  // Pass the forwarded ref here
        {...rest}  // Other properties passed to the Input
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
);

// Optionally display a name for better debugging
FormField.displayName = "FormField";

export default FormField;
