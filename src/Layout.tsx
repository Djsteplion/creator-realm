import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

const Layout = () => {
  return (
    <div className="flex h-screen w-full">
      {/* Fixed Sidebar */}
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* fixed Top Bar */}
        <Navbar />

        {/* Dynamic Content Area */}
        <main className="flex-1 overflow-y-auto py-2">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default Layout;