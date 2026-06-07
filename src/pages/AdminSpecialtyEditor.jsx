import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSpecialtyBySlug, saveSpecialty } from '../utils/supabaseDataManager';
import RichTextEditor from '../components/RichTextEditor';
import { Save, ArrowLeft, CheckCircle } from 'lucide-react';
import './AdminSpecialtyEditor.css';

// Available icons for selection
const availableIcons = [
  { name: 'Stethoscope', label: 'Stetoskop' },
  { name: 'Users', label: 'Kullanıcılar' },
  { name: 'Activity', label: 'Aktivite' },
  { name: 'Droplets', label: 'Damlalar' },
  { name: 'Slice', label: 'Kesit' },
  { name: 'Waves', label: 'Dalgalar' },
  { name: 'Syringe', label: 'Şırınga' },
  { name: 'Microscope', label: 'Mikroskop' },
  { name: 'Shield', label: 'Kalkan' },
  { name: 'TestTube', label: 'Test Tüpü' },
  { name: 'Pill', label: 'Hap' },
  { name: 'Heart', label: 'Kalp' },
  { name: 'Brain', label: 'Beyin' },
];

export default function AdminSpecialtyEditor() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const isEdit = !!slug;

  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    description: '',
    icon: 'Stethoscope',
    content: {
      whatIs: ''
    }
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isEdit) {
      loadSpecialty();
    }
  }, [slug, isEdit]);

  const loadSpecialty = async () => {
    setLoading(true);
    const specialty = await getSpecialtyBySlug(slug);
    if (specialty) {
      setFormData(specialty);
    }
    setLoading(false);
  };

  const handleChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-generate slug from title when creating new specialty
      if (field === 'title' && !isEdit) {
        updated.slug = value
          .toLowerCase()
          .replace(/ğ/g, 'g')
          .replace(/ü/g, 'u')
          .replace(/ş/g, 's')
          .replace(/ı/g, 'i')
          .replace(/ö/g, 'o')
          .replace(/ç/g, 'c')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
      }
      
      return updated;
    });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleContentChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value
      }
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Başlık gereklidir';
    if (!formData.slug.trim()) newErrors.slug = 'URL Slug gereklidir';
    if (!formData.description.trim()) newErrors.description = 'Açıklama gereklidir';
    if (!formData.content.whatIs.trim() || formData.content.whatIs === '<p><br></p>') {
      newErrors.whatIs = 'Bu bölüm boş bırakılamaz';
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
      const savedSpecialty = await saveSpecialty(formData);
      
      // Update form data with saved specialty
      setFormData(savedSpecialty);
      
      // Show success message
      setShowSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // If creating new specialty, redirect to edit page after showing success
      if (!isEdit) {
        setTimeout(() => {
          navigate(`/admin/specialties/edit/${savedSpecialty.slug}`);
        }, 1500);
      } else {
        // Hide success message after 3 seconds for edit mode
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      }
      
      setSaving(false);
    } catch (error) {
      alert('Değişiklikler kaydedilirken bir hata oluştu: ' + error.message);
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-specialty-editor">
        <h1 className="admin-specialty-editor-title">Yükleniyor...</h1>
      </div>
    );
  }

  return (
    <div className="admin-specialty-editor">
      {showSuccess && (
        <div className="admin-success-notification">
          <CheckCircle size={24} />
          <span>Başarıyla kaydedildi!</span>
        </div>
      )}
      
      <div className="admin-specialty-editor-header">
        <button 
          onClick={() => navigate('/admin/specialties')}
          className="admin-specialty-editor-back"
          disabled={saving}
        >
          <ArrowLeft size={20} />
          Geri Dön
        </button>
        <div>
          <h1 className="admin-specialty-editor-title">
            {isEdit ? 'Uzmanlık Alanı Düzenle' : 'Yeni Uzmanlık Alanı Ekle'}
          </h1>
          <p className="admin-specialty-editor-subtitle">
            {isEdit ? 'Tüm bilgileri ve içeriği düzenleyin' : 'Yeni bir uzmanlık alanı oluşturun'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="admin-specialty-editor-form">
        {/* Basic Information Section */}
        <div className="admin-specialty-editor-section">
          <div className="admin-specialty-section-header">
            <h2>Temel Bilgiler</h2>
            <p>Uzmanlık alanının başlık, açıklama ve ikon bilgilerini düzenleyin</p>
          </div>
          
          <div className="admin-specialty-editor-fields">
            <div className="admin-specialty-editor-field">
              <label className="admin-specialty-editor-label">
                Başlık <span className="required">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className={`admin-specialty-editor-input ${errors.title ? 'error' : ''}`}
                placeholder="Androloji"
              />
              {errors.title && <p className="admin-specialty-editor-error">{errors.title}</p>}
            </div>

            <div className="admin-specialty-editor-field">
              <label className="admin-specialty-editor-label">
                Açıklama <span className="required">*</span>
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className={`admin-specialty-editor-input ${errors.description ? 'error' : ''}`}
                placeholder="Erkek sağlığı ve cinsel işlev"
              />
              {errors.description && <p className="admin-specialty-editor-error">{errors.description}</p>}
            </div>

            <div className="admin-specialty-editor-field">
              <label className="admin-specialty-editor-label">
                İkon Seçimi
              </label>
              <select
                value={formData.icon}
                onChange={(e) => handleChange('icon', e.target.value)}
                className="admin-specialty-editor-select"
              >
                {availableIcons.map(icon => (
                  <option key={icon.name} value={icon.name}>
                    {icon.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-specialty-editor-field">
              <label className="admin-specialty-editor-label">
                URL Slug {isEdit && '(değiştirmeyin)'} {!isEdit && <span className="required">*</span>}
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => handleChange('slug', e.target.value)}
                disabled={isEdit}
                className={`admin-specialty-editor-input ${isEdit ? 'disabled' : ''} ${errors.slug ? 'error' : ''}`}
                placeholder="ornek-uzmanlik-alani"
              />
              {errors.slug && <p className="admin-specialty-editor-error">{errors.slug}</p>}
              <p className="admin-specialty-editor-help">
                {isEdit 
                  ? 'URL\'de kullanılan benzersiz tanımlayıcı' 
                  : 'Başlıktan otomatik oluşturulur, gerekirse düzenleyebilirsiniz'}
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="admin-specialty-editor-section">
          <div className="admin-specialty-section-header">
            <h2>İçerik</h2>
            <p>Bu uzmanlık alanının detaylı açıklamasını yazın</p>
          </div>
          <RichTextEditor
            value={formData.content.whatIs}
            onChange={(value) => handleContentChange('whatIs', value)}
            placeholder="Uzmanlık alanının tanımını, tedavi yöntemlerini ve detaylı bilgilerini buraya yazın..."
          />
          {errors.whatIs && <p className="admin-specialty-editor-error">{errors.whatIs}</p>}
        </div>

        <div className="admin-specialty-editor-actions">
          <button
            type="button"
            onClick={() => navigate('/admin/specialties')}
            className="admin-specialty-editor-btn cancel"
          >
            İptal
          </button>
          <button
            type="submit"
            className="admin-specialty-editor-btn save"
            disabled={saving}
          >
            <Save size={20} />
            {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
}
