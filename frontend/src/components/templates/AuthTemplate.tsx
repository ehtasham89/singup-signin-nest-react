import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

type AuthTemplateProps = {
  children: React.ReactNode;
};

const AuthTemplate: React.FC<AuthTemplateProps> = ({ children }) => (
  <Flex justify="center" align="center" height="100vh" bg="gray.100">
    <Box p={6} bg="white" boxShadow="lg" rounded="md">
      {children}
    </Box>
  </Flex>
);

export default AuthTemplate;
