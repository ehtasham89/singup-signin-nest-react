import React, { useEffect } from 'react';
import { Heading, Button } from '@chakra-ui/react';
import { useApi } from '../hooks/useApi';
import { useAuth } from '../contexts/AuthContext';
import AuthTemplate from '../components/templates/AuthTemplate';


const Dashboard: React.FC = () => {
    const [user, setUser] = React.useState<any | null>(null);
    const { callApi } = useApi();
    const { logout, isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            const response = await callApi('/user/profile', 'GET', null, true);
            //console.log('User profile:', response);
            if (response) {
              setUser(response);
            }
          } catch (error) {
            console.error('Error fetching user profile:', error);
          }
        };
    
        if (isAuthenticated && !user) {
          fetchUserProfile();
        }
      }, [isAuthenticated, user, callApi]); 

    return (
        <AuthTemplate>
            <Heading>Welcome to the application!</Heading>
                {user && <p>Hello, {user.email}!</p>}
                <Button
                    colorScheme="teal"
                    size="lg"
                    mt={8}
                    onClick={logout}
                >
                    Logout
                </Button>
        </AuthTemplate>
    );
};

export default Dashboard;
