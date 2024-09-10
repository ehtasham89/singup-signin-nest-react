import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Heading, Button, Link, Text } from '@chakra-ui/react';
import { useApi } from '../../hooks/useApi';
import FormField from './../molecules/FormField';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters')
    .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .required('Password is required'),
});

const SignUpForm: React.FC = () => {
    const [ isSignup, setIsSignup ] = useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const { callApi } = useApi();

    const navigate = useNavigate();

    useEffect(() => {
        if (isSignup) {
            navigate('/');
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSignup]);

    const onSubmit = async (data: any) => {
        try {
            const response = await callApi('/auth/signup', 'POST', data, true);
            
            if (response) {
                setIsSignup(true);
            }
        } catch (error) {
            console.error('Error during sign-up:', error);
        }
    };

    return (
        <Box>
        <Heading>Sign Up</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormField label="Name" placeholder="Name" {...register('name')} error={errors.name?.message} />
            <FormField label="Email" placeholder="Email" {...register('email')} error={errors.email?.message} />
            <FormField label="Password" placeholder="Password" type="password" {...register('password')} error={errors.password?.message} />
            <Button type="submit" colorScheme="blue" mt={4}>Sign Up</Button>
        </form>

        <Text mt={4}>
            Don't have an account?{' '}
            <Link as={RouterLink} to="/" color="teal.500">
                Back to login
            </Link>
        </Text>
        </Box>
    );
};

export default SignUpForm;
