import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../utils/auth';
import { FileText, Stethoscope, LogOut, LayoutDashboard, Video } from 'lucide-react';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/admin');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <LayoutDashboard size={32} />
          <h2>Admin Panel</h2>
        </div>
        
        <nav className="admin-nav">
          <Link 
            to="/admin/dashboard" 
            className={`admin-nav-item ${isActive('/admin/dashboard') ? 'active' : ''}`}
          >
            <LayoutDashboard size={20} />
            <span>Genel Bakış</span>
          </Link>
          
          <Link 
            to="/admin/blog-posts" 
            className={`admin-nav-item ${location.pathname.includes('/admin/blog') ? 'active' : ''}`}
          >
            <FileText size={20} />
            <span>Blog Yazıları</span>
          </Link>
          
          <Link 
            to="/admin/specialties" 
            className={`admin-nav-item ${location.pathname.includes('/admin/specialt') ? 'active' : ''}`}
          >
            <Stethoscope size={20} />
            <span>Uzmanlık Alanları</span>
          </Link>
          
          <Link 
            to="/admin/videos" 
            className={`admin-nav-item ${location.pathname.includes('/admin/video') ? 'active' : ''}`}
          >
            <Video size={20} />
            <span>Videolar</span>
          </Link>
        </nav>
        
        <button onClick={handleLogout} className="admin-logout-btn">
          <LogOut size={20} />
          <span>Çıkış Yap</span>
        </button>
      </aside>
      
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
