import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBlogPosts, saveBlogPost } from '../utils/supabaseDataManager';
import RichTextEditor from '../components/RichTextEditor';
import { Save, ArrowLeft, CheckCircle } from 'lucide-react';
import './AdminBlogEditor.css';

export default function AdminBlogEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    author: 'Dr. Sabri Keser',
    date: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
    readTime: '5 dakika',
    image: '/medical-research-lab.png'
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isEdit) {
      loadPost();
    }
  }, [id, isEdit]);

  const loadPost = async () => {
    setLoading(true);
    const posts = await getBlogPosts();
    const post = posts.find(p => p.id === parseInt(id));
    if (post) {
      setFormData(post);
    }
    setLoading(false);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Başlık gereklidir';
    if (!formData.excerpt.trim()) newErrors.excerpt = 'Özet gereklidir';
    if (!formData.content.trim() || formData.content === '<p><br></p>') newErrors.content = 'İçerik gereklidir';
    if (!formData.category.trim()) newErrors.category = 'Kategori gereklidir';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setSaving(true);
    try {
      const savedPost = await saveBlogPost(formData);
      
      // Update form data with saved post (in case ID was generated)
      setFormData(savedPost);
      
      // Show success message
      setShowSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      
      setSaving(false);
    } catch (error) {
      alert('Yazı kaydedilirken bir hata oluştu: ' + error.message);
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-blog-editor">
        <h1 className="admin-blog-editor-title">Yükleniyor...</h1>
      </div>
    );
  }

  return (
    <div className="admin-blog-editor">
      {showSuccess && (
        <div className="admin-success-notification">
          <CheckCircle size={24} />
          <span>Başarıyla kaydedildi!</span>
        </div>
      )}
      
      <div className="admin-blog-editor-header">
        <button 
          onClick={() => navigate('/admin/blog-posts')}
          className="admin-blog-editor-back"
          disabled={saving}
        >
          <ArrowLeft size={20} />
          Geri Dön
        </button>
        <h1 className="admin-blog-editor-title">
          {isEdit ? 'Blog Yazısını Düzenle' : 'Yeni Blog Yazısı'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="admin-blog-editor-form">
        <div className="admin-blog-editor-section">
          <div className="admin-blog-editor-field">
            <label className="admin-blog-editor-label">
              Başlık <span className="required">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className={`admin-blog-editor-input ${errors.title ? 'error' : ''}`}
              placeholder="Blog yazısının başlığını girin"
            />
            {errors.title && <p className="admin-blog-editor-error">{errors.title}</p>}
          </div>

          <div className="admin-blog-editor-field">
            <label className="admin-blog-editor-label">
              URL Slug (Otomatik oluşturulur)
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => handleChange('slug', e.target.value)}
              className="admin-blog-editor-input"
              placeholder="ornek-blog-yazisi"
            />
            <p className="admin-blog-editor-help">
              Boş bırakırsanız başlıktan otomatik oluşturulacaktır
            </p>
          </div>

          <div className="admin-blog-editor-row">
            <div className="admin-blog-editor-field">
              <label className="admin-blog-editor-label">
                Kategori <span className="required">*</span>
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className={`admin-blog-editor-input ${errors.category ? 'error' : ''}`}
                placeholder="Kardiyoloji, Beslenme, vb."
                list="categories"
              />
              <datalist id="categories">
                <option value="Kardiyoloji" />
                <option value="Koruyucu Hekimlik" />
                <option value="Kronik Hastalık" />
                <option value="Beslenme" />
                <option value="Zihinsel Sağlık" />
                <option value="İç Hastalıkları" />
                <option value="Genel Sağlık" />
              </datalist>
              {errors.category && <p className="admin-blog-editor-error">{errors.category}</p>}
            </div>

            <div className="admin-blog-editor-field">
              <label className="admin-blog-editor-label">
                Yazar
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => handleChange('author', e.target.value)}
                className="admin-blog-editor-input"
              />
            </div>
          </div>

          <div className="admin-blog-editor-row">
            <div className="admin-blog-editor-field">
              <label className="admin-blog-editor-label">
                Tarih
              </label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className="admin-blog-editor-input"
                placeholder="15 Mart 2024"
              />
            </div>

            <div className="admin-blog-editor-field">
              <label className="admin-blog-editor-label">
                Okuma Süresi
              </label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) => handleChange('readTime', e.target.value)}
                className="admin-blog-editor-input"
                placeholder="5 dakika"
              />
            </div>
          </div>

          <div className="admin-blog-editor-field">
            <label className="admin-blog-editor-label">
              Görsel URL
            </label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => handleChange('image', e.target.value)}
              className="admin-blog-editor-input"
              placeholder="/medical-research-lab.png"
            />
          </div>

          <div className="admin-blog-editor-field">
            <label className="admin-blog-editor-label">
              Özet <span className="required">*</span>
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => handleChange('excerpt', e.target.value)}
              className={`admin-blog-editor-textarea ${errors.excerpt ? 'error' : ''}`}
              placeholder="Yazının kısa özetini girin (liste ve kartlarda görünecek)"
              rows="3"
            />
            {errors.excerpt && <p className="admin-blog-editor-error">{errors.excerpt}</p>}
          </div>

          <div className="admin-blog-editor-field">
            <label className="admin-blog-editor-label">
              İçerik <span className="required">*</span>
            </label>
            <RichTextEditor
              value={formData.content}
              onChange={(value) => handleChange('content', value)}
              placeholder="Blog yazınızın içeriğini buraya yazın. Başlıklar, kalın yazı, listeler ve daha fazlası için yukarıdaki araç çubuğunu kullanın."
            />
            {errors.content && <p className="admin-blog-editor-error">{errors.content}</p>}
          </div>
        </div>

        <div className="admin-blog-editor-actions">
          <button
            type="button"
            onClick={() => navigate('/admin/blog-posts')}
            className="admin-blog-editor-btn cancel"
          >
            İptal
          </button>
          <button
            type="submit"
            className="admin-blog-editor-btn save"
            disabled={saving}
          >
            <Save size={20} />
            {saving ? 'Kaydediliyor...' : (isEdit ? 'Değişiklikleri Kaydet' : 'Yazıyı Yayınla')}
          </button>
        </div>
      </form>
    </div>
  );
}
