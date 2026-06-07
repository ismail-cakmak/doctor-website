import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getVideoById, saveVideo } from '../utils/supabaseDataManager';
import { Save, ArrowLeft, CheckCircle, Video } from 'lucide-react';
import './AdminVideoEditor.css';

export default function AdminVideoEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    youtubeUrl: '',
    displayOrder: 0
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [previewId, setPreviewId] = useState(null);

  useEffect(() => {
    if (isEdit) {
      loadVideo();
    }
  }, [id, isEdit]);

  useEffect(() => {
    // Extract YouTube ID for preview
    if (formData.youtubeUrl) {
      const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /^([a-zA-Z0-9_-]{11})$/
      ];
      
      for (const pattern of patterns) {
        const match = formData.youtubeUrl.match(pattern);
        if (match && match[1]) {
          setPreviewId(match[1]);
          return;
        }
      }
    }
    setPreviewId(null);
  }, [formData.youtubeUrl]);

  const loadVideo = async () => {
    setLoading(true);
    const video = await getVideoById(parseInt(id));
    if (video) {
      setFormData(video);
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
    if (!formData.youtubeUrl.trim()) newErrors.youtubeUrl = 'YouTube URL\'si gereklidir';
    
    // Validate YouTube URL format
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/
    ];
    
    let isValidUrl = false;
    for (const pattern of patterns) {
      if (pattern.test(formData.youtubeUrl)) {
        isValidUrl = true;
        break;
      }
    }
    
    if (!isValidUrl) {
      newErrors.youtubeUrl = 'Geçerli bir YouTube URL\'si giriniz (örn: https://www.youtube.com/watch?v=xxxxx)';
    }
    
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
      const savedVideo = await saveVideo(formData);
      
      // Update form data with saved video
      setFormData(savedVideo);
      
      // Show success message
      setShowSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      
      setSaving(false);
    } catch (error) {
      alert('Video kaydedilirken bir hata oluştu: ' + error.message);
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-video-editor">
        <h1 className="admin-video-editor-title">Yükleniyor...</h1>
      </div>
    );
  }

  return (
    <div className="admin-video-editor">
      {showSuccess && (
        <div className="admin-success-notification">
          <CheckCircle size={24} />
          <span>Başarıyla kaydedildi!</span>
        </div>
      )}
      
      <div className="admin-video-editor-header">
        <button 
          onClick={() => navigate('/admin/videos')}
          className="admin-video-editor-back"
          disabled={saving}
        >
          <ArrowLeft size={20} />
          Geri Dön
        </button>
        <h1 className="admin-video-editor-title">
          {isEdit ? 'Videoyu Düzenle' : 'Yeni Video Ekle'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="admin-video-editor-form">
        <div className="admin-video-editor-section">
          <div className="admin-video-editor-field">
            <label className="admin-video-editor-label">
              Başlık <span className="required">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className={`admin-video-editor-input ${errors.title ? 'error' : ''}`}
              placeholder="Video başlığını girin"
            />
            {errors.title && <p className="admin-video-editor-error">{errors.title}</p>}
          </div>

          <div className="admin-video-editor-field">
            <label className="admin-video-editor-label">
              YouTube URL <span className="required">*</span>
            </label>
            <input
              type="text"
              value={formData.youtubeUrl}
              onChange={(e) => handleChange('youtubeUrl', e.target.value)}
              className={`admin-video-editor-input ${errors.youtubeUrl ? 'error' : ''}`}
              placeholder="https://www.youtube.com/watch?v=xxxxx"
            />
            {errors.youtubeUrl && <p className="admin-video-editor-error">{errors.youtubeUrl}</p>}
            <p className="admin-video-editor-help">
              YouTube video URL'sini yapıştırın. Desteklenen formatlar:<br/>
              • https://www.youtube.com/watch?v=xxxxx<br/>
              • https://youtu.be/xxxxx<br/>
              • Video ID: xxxxx
            </p>
          </div>

          {previewId && (
            <div className="admin-video-editor-field">
              <label className="admin-video-editor-label">
                Önizleme
              </label>
              <div className="admin-video-preview">
                <iframe
                  src={`https://www.youtube.com/embed/${previewId}`}
                  title="Video Preview"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          <div className="admin-video-editor-field">
            <label className="admin-video-editor-label">
              Sıralama
            </label>
            <input
              type="number"
              value={formData.displayOrder}
              onChange={(e) => handleChange('displayOrder', parseInt(e.target.value) || 0)}
              className="admin-video-editor-input"
              min="0"
            />
            <p className="admin-video-editor-help">
              Videolar bu sıraya göre gösterilir (küçükten büyüğe)
            </p>
          </div>
        </div>

        <div className="admin-video-editor-actions">
          <button
            type="button"
            onClick={() => navigate('/admin/videos')}
            className="admin-video-editor-btn cancel"
          >
            İptal
          </button>
          <button
            type="submit"
            className="admin-video-editor-btn save"
            disabled={saving}
          >
            <Save size={20} />
            {saving ? 'Kaydediliyor...' : (isEdit ? 'Değişiklikleri Kaydet' : 'Videoyu Ekle')}
          </button>
        </div>
      </form>
    </div>
  );
}

