import React from 'react';
import AuthTemplate from '../components/templates/AuthTemplate';
import SignUpForm from '../components/organisms/SignUpForm';

const SignUp: React.FC = () => (
  <AuthTemplate>
    <SignUpForm />
  </AuthTemplate>
);

export default SignUp;
