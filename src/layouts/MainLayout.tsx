import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { alertsData } from '@/data/stockData';

const MainLayout = () => {
  const navigate = useNavigate();
  const unreadAlerts = alertsData.filter(a => !a.read).length;

  const handleLogout = () => {
    localStorage.removeItem('marketmind_logged_in');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onLogout={handleLogout} alertCount={unreadAlerts} />
      <main className="pt-20 pb-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
