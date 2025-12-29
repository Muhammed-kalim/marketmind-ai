import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SplashScreen from '@/components/SplashScreen';
import Login from '@/pages/Login';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const loggedIn = localStorage.getItem('marketmind_logged_in');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
      setShowSplash(false);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && !showSplash) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, showSplash, navigate]);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleLogin = () => {
    localStorage.setItem('marketmind_logged_in', 'true');
    setIsLoggedIn(true);
    navigate('/dashboard');
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return null;
};

export default Index;
