import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts, deleteBlogPost } from '../utils/supabaseDataManager';
import { Plus, Edit, Trash2, Calendar, User } from 'lucide-react';
import './AdminBlogList.css';

export default function AdminBlogList() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    const data = await getBlogPosts();
    setPosts(data);
    setLoading(false);
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`"${title}" başlıklı yazıyı silmek istediğinize emin misiniz?`)) {
      try {
        await deleteBlogPost(id);
        await loadPosts();
      } catch (error) {
        alert('Yazı silinirken bir hata oluştu: ' + error.message);
      }
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="admin-blog-list">
        <h1 className="admin-blog-list-title">Yükleniyor...</h1>
      </div>
    );
  }

  return (
    <div className="admin-blog-list">
      <div className="admin-blog-list-header">
        <div>
          <h1 className="admin-blog-list-title">Blog Yazıları</h1>
          <p className="admin-blog-list-subtitle">Tüm blog yazılarınızı görüntüleyin ve yönetin</p>
        </div>
        <Link to="/admin/blog-posts/new" className="admin-blog-add-btn">
          <Plus size={20} />
          Yeni Yazı Ekle
        </Link>
      </div>

      <div className="admin-blog-search">
        <input
          type="text"
          placeholder="Başlık veya kategori ile ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="admin-blog-search-input"
        />
      </div>

      <div className="admin-blog-cards">
        {filteredPosts.map(post => (
          <div key={post.id} className="admin-blog-card">
            <div className="admin-blog-card-image">
              <img src={post.image || '/placeholder.svg'} alt={post.title} />
              <span className="admin-blog-card-category">{post.category}</span>
            </div>
            
            <div className="admin-blog-card-content">
              <h3 className="admin-blog-card-title">{post.title}</h3>
              <p className="admin-blog-card-excerpt">{post.excerpt}</p>
              
              <div className="admin-blog-card-meta">
                <div className="admin-blog-card-meta-item">
                  <Calendar size={16} />
                  <span>{post.date}</span>
                </div>
                <div className="admin-blog-card-meta-item">
                  <User size={16} />
                  <span>{post.author}</span>
                </div>
              </div>

              <div className="admin-blog-card-actions">
                <Link 
                  to={`/admin/blog-posts/edit/${post.id}`}
                  className="admin-blog-card-btn edit"
                >
                  <Edit size={18} />
                  Düzenle
                </Link>
                <button
                  onClick={() => handleDelete(post.id, post.title)}
                  className="admin-blog-card-btn delete"
                >
                  <Trash2 size={18} />
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="admin-blog-empty">
          <p>Henüz blog yazısı bulunmamaktadır.</p>
          <Link to="/admin/blog-posts/new" className="admin-blog-empty-btn">
            <Plus size={20} />
            İlk Yazıyı Ekle
          </Link>
        </div>
      )}
    </div>
  );
}
