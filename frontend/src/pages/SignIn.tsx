import React, { useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Heading, Button, Link, Text } from '@chakra-ui/react';
import { useAuth } from './../contexts/AuthContext'; 
import FormField from '../components/molecules/FormField';
import AuthTemplate from '../components/templates/AuthTemplate';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

const SignIn: React.FC = (props) => {
  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
        navigate('/dashboard');
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const onSubmit = async (data: any) => {
    try {
        await login(String(data.email), String(data.password));
      } catch (error) {
        console.error('Error during sign-in:', error);
      }
  };
  

  return (
    <AuthTemplate>
        <Heading>Sign In</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormField label="Email" placeholder="Email" {...register('email')} error={errors.email?.message} />
            <FormField label="Password" placeholder="Password" type="password" {...register('password')} error={errors.password?.message} />
            <Button type="submit" colorScheme="blue" mt={4}>Sign In</Button>
        </form>

        <Text mt={4}>
            Don't have an account?{' '}
            <Link as={RouterLink} to="/signup" color="teal.500">
            Sign up here
            </Link>
        </Text>
    </AuthTemplate>
  );
};

export default SignIn;
