import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSpecialties, deleteSpecialty } from '../utils/supabaseDataManager';
import { Edit, Eye, FileText, Plus, Trash2 } from 'lucide-react';
import {
  Stethoscope, Users, Droplets, Waves, Syringe,
  TestTube, Microscope, Shield, Pill, Slice, Activity, Heart, Brain
} from "lucide-react";
import './AdminSpecialtiesList.css';

// Icon mapping
const iconComponents = {
  Stethoscope, Users, Droplets, Waves, Syringe,
  TestTube, Microscope, Shield, Pill, Slice, Activity, Heart, Brain
};

export default function AdminSpecialtiesList() {
  const [specialties, setSpecialties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSpecialties();
  }, []);

  const loadSpecialties = async () => {
    setLoading(true);
    const data = await getSpecialties();
    setSpecialties(data);
    setLoading(false);
  };

  const handleDelete = async (slug, title) => {
    if (window.confirm(`"${title}" uzmanlık alanını silmek istediğinize emin misiniz?\n\nBu işlem geri alınamaz!`)) {
      try {
        await deleteSpecialty(slug);
        await loadSpecialties();
      } catch (error) {
        alert('Uzmanlık alanı silinirken bir hata oluştu: ' + error.message);
      }
    }
  };

  const filteredSpecialties = specialties.filter(specialty =>
    specialty.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    specialty.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hasContent = (specialty) => {
    return specialty.content?.whatIs;
  };

  const getContentStatus = (specialty) => {
    if (!specialty.content) return 'empty';
    const whatIs = specialty.content.whatIs;
    if (!whatIs || whatIs === '<p><br></p>' || whatIs.trim() === '') return 'empty';
    return 'complete';
  };

  if (loading) {
    return (
      <div className="admin-specialties-list">
        <h1 className="admin-specialties-list-title">Yükleniyor...</h1>
      </div>
    );
  }

  return (
    <div className="admin-specialties-list">
      <div className="admin-specialties-list-header">
        <div>
          <h1 className="admin-specialties-list-title">Uzmanlık Alanları</h1>
          <p className="admin-specialties-list-subtitle">Uzmanlık alanlarınızın içeriğini düzenleyin</p>
        </div>
        <Link to="/admin/specialties/new" className="admin-specialty-add-btn">
          <Plus size={20} />
          Yeni Uzmanlık Ekle
        </Link>
      </div>

      <div className="admin-specialties-search">
        <input
          type="text"
          placeholder="Uzmanlık alanı ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="admin-specialties-search-input"
        />
      </div>

      <div className="admin-specialties-cards">
        {filteredSpecialties.map(specialty => {
          const Icon = iconComponents[specialty.icon] || Stethoscope;
          const status = getContentStatus(specialty);
          
          return (
            <div key={specialty.slug} className="admin-specialty-card">
              <div className="admin-specialty-card-header">
                <div className="admin-specialty-card-icon">
                  <Icon size={32} />
                </div>
              </div>
              
              <div className="admin-specialty-card-content">
                <h3 className="admin-specialty-card-title">{specialty.title}</h3>
                <p className="admin-specialty-card-description">{specialty.description}</p>
                
                <div className="admin-specialty-card-meta">
                  <div className="admin-specialty-card-meta-item">
                    <FileText size={16} />
                    <span>İçerik</span>
                  </div>
                </div>

                <div className="admin-specialty-card-actions">
                  <div className="admin-specialty-card-main-actions">
                    <Link 
                      to={`/uzmanlik/${specialty.slug}`}
                      target="_blank"
                      className="admin-specialty-card-btn preview"
                    >
                      <Eye size={18} />
                      Önizle
                    </Link>
                    <Link 
                      to={`/admin/specialties/edit/${specialty.slug}`}
                      className="admin-specialty-card-btn edit"
                    >
                      <Edit size={18} />
                      Düzenle
                    </Link>
                  </div>
                  <button
                    onClick={() => handleDelete(specialty.slug, specialty.title)}
                    className="admin-specialty-card-btn-delete"
                    title="Sil"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSpecialties.length === 0 && (
        <div className="admin-specialties-empty">
          <p>Aradığınız kriterlere uygun uzmanlık alanı bulunamadı.</p>
        </div>
      )}
    </div>
  );
}
