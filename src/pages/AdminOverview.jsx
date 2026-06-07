import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Stethoscope, TrendingUp, Download, Video } from 'lucide-react';
import { getBlogPosts, getSpecialties, getAllVideos } from '../utils/supabaseDataManager';
import './AdminOverview.css';

export default function AdminOverview() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [posts, specs, vids] = await Promise.all([
      getBlogPosts(),
      getSpecialties(),
      getAllVideos()
    ]);
    setBlogPosts(posts);
    setSpecialties(specs);
    setVideos(vids);
    setLoading(false);
  };

  const handleExportAll = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      version: '1.0',
      blogPosts: blogPosts,
      specialties: specialties,
      videos: videos,
      summary: {
        totalBlogPosts: blogPosts.length,
        totalSpecialties: specialties.length,
        totalVideos: videos.length,
        totalContent: blogPosts.length + specialties.length + videos.length
      }
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `content-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="admin-overview">
        <h1 className="admin-overview-title">Yükleniyor...</h1>
      </div>
    );
  }

  return (
    <div className="admin-overview">
      <h1 className="admin-overview-title">Genel Bakış</h1>
      <p className="admin-overview-subtitle">İçerik yönetim panelinize hoş geldiniz</p>
      
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon blog">
            <FileText size={32} />
          </div>
          <div className="admin-stat-content">
            <p className="admin-stat-label">Toplam Blog Yazısı</p>
            <p className="admin-stat-value">{blogPosts.length}</p>
          </div>
        </div>
        
        <div className="admin-stat-card">
          <div className="admin-stat-icon specialty">
            <Stethoscope size={32} />
          </div>
          <div className="admin-stat-content">
            <p className="admin-stat-label">Uzmanlık Alanı</p>
            <p className="admin-stat-value">{specialties.length}</p>
          </div>
        </div>
        
        <div className="admin-stat-card">
          <div className="admin-stat-icon video">
            <Video size={32} />
          </div>
          <div className="admin-stat-content">
            <p className="admin-stat-label">Toplam Video</p>
            <p className="admin-stat-value">{videos.length}</p>
          </div>
        </div>
        
        <div className="admin-stat-card">
          <div className="admin-stat-icon activity">
            <TrendingUp size={32} />
          </div>
          <div className="admin-stat-content">
            <p className="admin-stat-label">Toplam İçerik</p>
            <p className="admin-stat-value">{blogPosts.length + specialties.length + videos.length}</p>
          </div>
        </div>
      </div>
      
      <div className="admin-quick-actions">
        <h2>Hızlı İşlemler</h2>
        <div className="admin-action-buttons">
          <Link to="/admin/blog-posts/new" className="admin-action-btn primary">
            <FileText size={20} />
            Yeni Blog Yazısı
          </Link>
          <Link to="/admin/blog-posts" className="admin-action-btn secondary">
            <FileText size={20} />
            Blog Yazılarını Yönet
          </Link>
          <Link to="/admin/specialties" className="admin-action-btn secondary">
            <Stethoscope size={20} />
            Uzmanlık Alanlarını Düzenle
          </Link>
          <Link to="/admin/videos" className="admin-action-btn secondary">
            <Video size={20} />
            Videoları Yönet
          </Link>
        </div>
      </div>
      
      <div className="admin-recent-posts">
        <h2>Son Eklenen Blog Yazıları</h2>
        <div className="admin-recent-list">
          {blogPosts.slice(0, 5).map(post => (
            <Link 
              key={post.id} 
              to={`/admin/blog-posts/edit/${post.id}`}
              className="admin-recent-item"
            >
              <div className="admin-recent-info">
                <h3>{post.title}</h3>
                <p>{post.date} • {post.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="admin-export-section">
        <div className="admin-export-content">
          <div className="admin-export-info">
            <h2>İçeriği Dışa Aktar</h2>
            <p>Tüm blog yazıları ve uzmanlık alanlarınızı JSON formatında dışa aktarın</p>
          </div>
          <button onClick={handleExportAll} className="admin-export-btn">
            <Download size={20} />
            Tüm İçeriği Dışa Aktar
          </button>
        </div>
      </div>
    </div>
  );
}
