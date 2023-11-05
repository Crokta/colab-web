import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar.tsx';

const RootLayout = () => {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
