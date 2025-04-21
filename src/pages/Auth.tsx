
import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

const Auth = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleSuccess = (credentialResponse: any) => {
    // Store the token and update auth state
    login(credentialResponse.credential);
    // Show success message
    toast.success('Successfully signed in with Google');
    // Redirect to home page
    navigate('/');
  };

  const handleGoogleError = () => {
    toast.error('Google sign in failed. Please try again.');
    console.error('Google sign in failed');
  };

  const handleLogout = () => {
    logout();
    toast.info('You have been logged out');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-dark text-white p-4">
      <div className="w-full max-w-md space-y-8 glassmorphism p-8 rounded-xl border border-white/10">
        <div className="text-center">
          <img 
            src="/lovable-uploads/1514bc5a-48b4-4c37-976f-4a1b3c2ab813.png" 
            alt="Bad Habits Logo" 
            className="h-12 w-auto mx-auto mb-6" 
          />
          <h1 className="text-2xl font-bold text-neon">Bad Habits Authentication</h1>
          <p className="mt-2 text-sm text-gray-300">
            {isAuthenticated ? 'You are signed in' : 'Sign in to access exclusive content'}
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 mt-8">
          {isAuthenticated ? (
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="w-full border-red-500 text-red-500 hover:bg-red-500/10"
            >
              Sign Out
            </Button>
          ) : (
            <div className="flex w-full justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                type="standard"
                theme="filled_black"
                text="signin_with"
                shape="rectangular"
                locale="en"
              />
            </div>
          )}

          <div className="mt-4">
            <Button 
              variant="ghost"
              className="text-gray-400 hover:text-white"
              onClick={() => navigate('/')}
            >
              Return to Homepage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
