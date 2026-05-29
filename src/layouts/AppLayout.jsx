import Sidebar from '../components/Sidebar';
import { useTheme } from '../context/ThemeContext';

const AppLayout = ({ children }) => {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <Sidebar />
      {/* lg:pl-60 matches the 240px (w-60) sidebar; on mobile sidebar is a drawer so no padding needed */}
      <div className="lg:pl-60 transition-all duration-300 min-h-screen" id="main-content-area">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
