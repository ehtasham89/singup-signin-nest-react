import React, { useContext } from 'react';
import { ChakraProvider, Container } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';

function App() {
  const ProtectedRoute = () => {
    const { isAuthenticated } = useContext(AuthContext) || {};

    // Add loading state if the authentication check is in progress
    if (isAuthenticated === undefined) {
      return <div>Loading...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Container>
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<SignIn />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
          </Container>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
