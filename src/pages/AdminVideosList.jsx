import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllVideos, deleteVideo } from '../utils/supabaseDataManager';
import { Plus, Edit, Trash2, Video } from 'lucide-react';
import './AdminVideosList.css';

export default function AdminVideosList() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    setLoading(true);
    const data = await getAllVideos();
    setVideos(data);
    setLoading(false);
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`"${title}" başlıklı videoyu silmek istediğinize emin misiniz?`)) {
      try {
        await deleteVideo(id);
        await loadVideos();
      } catch (error) {
        alert('Video silinirken bir hata oluştu: ' + error.message);
      }
    }
  };


  if (loading) {
    return (
      <div className="admin-videos-list">
        <h1 className="admin-videos-list-title">Yükleniyor...</h1>
      </div>
    );
  }

  return (
    <div className="admin-videos-list">
      <div className="admin-videos-list-header">
        <div>
          <h1 className="admin-videos-list-title">Videolar</h1>
          <p className="admin-videos-list-subtitle">YouTube videolarınızı yönetin</p>
        </div>
        <Link to="/admin/videos/new" className="admin-videos-add-btn">
          <Plus size={20} />
          Yeni Video Ekle
        </Link>
      </div>

      <div className="admin-videos-cards">
        {videos.map(video => (
          <div key={video.id} className="admin-video-card">
            <div className="admin-video-card-preview">
              <iframe
                className="admin-video-iframe"
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={video.title}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="admin-video-card-content">
              <h3 className="admin-video-card-title">{video.title}</h3>
              <p className="admin-video-card-url">{video.youtubeUrl}</p>
              
              <div className="admin-video-card-meta">
                <div className="admin-video-card-meta-item">
                  <Video size={16} />
                  <span>Sıra: {video.displayOrder}</span>
                </div>
              </div>

              <div className="admin-video-card-actions">
                <Link 
                  to={`/admin/videos/edit/${video.id}`}
                  className="admin-video-card-btn edit"
                >
                  <Edit size={18} />
                  Düzenle
                </Link>
                <button
                  onClick={() => handleDelete(video.id, video.title)}
                  className="admin-video-card-btn delete"
                >
                  <Trash2 size={18} />
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {videos.length === 0 && (
        <div className="admin-videos-empty">
          <Video size={48} />
          <p>Henüz video eklenmemiş.</p>
          <Link to="/admin/videos/new" className="admin-videos-empty-btn">
            <Plus size={20} />
            İlk Videoyu Ekle
          </Link>
        </div>
      )}
    </div>
  );
}

