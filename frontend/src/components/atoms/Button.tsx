import { Button as ChakraButton } from '@chakra-ui/react';

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ onClick, children }) => (
  <ChakraButton onClick={onClick} colorScheme="blue">
    {children}
  </ChakraButton>
);

export default Button;
