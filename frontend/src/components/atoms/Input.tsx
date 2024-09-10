import { Input as ChakraInput } from '@chakra-ui/react';

type InputProps = {
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const Input: React.FC<InputProps> = ({ name, type = 'text', value, onChange, placeholder }) => (
  <ChakraInput
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

export default Input;
