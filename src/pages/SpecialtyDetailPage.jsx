import { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { getSpecialtyBySlug } from '../utils/supabaseDataManager'
import './SpecialtyDetailPage.css'
import {
  Stethoscope, Users, Droplets, Waves, Syringe,
  TestTube, Sparkles, Microscope, Shield, Pill, Slice, Activity, Heart, Brain
} from "lucide-react";

// Icon mapping for specialties
const iconComponents = {
  Stethoscope, Users, Droplets, Waves, Syringe,
  TestTube, Sparkles, Microscope, Shield, Pill, Slice, Activity, Heart, Brain
};

export default function SpecialtyDetailPage() {
  const { slug } = useParams()
  const [specialty, setSpecialty] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSpecialty()
  }, [slug])

  const loadSpecialty = async () => {
    setLoading(true)
    const data = await getSpecialtyBySlug(slug)
    setSpecialty(data)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="specialty-detail-page">
        <div className="specialty-detail-container">
          <h1 className="specialty-detail-title">Yükleniyor...</h1>
        </div>
      </div>
    )
  }
  
  // If specialty not found, redirect to specialties page
  if (!specialty) {
    return <Navigate to="/uzmanlik-alanlari" replace />
  }
  
  const Icon = iconComponents[specialty.icon] || Stethoscope;

  return (
    <div className="specialty-detail-page">
      <div className="specialty-detail-container">
        {/* Header Section */}
        <div className="specialty-detail-header">
          <div className="specialty-detail-icon-wrapper">
            <Icon className="specialty-detail-icon" />
          </div>
          <h1 className="specialty-detail-title">{specialty.title}</h1>
          <p className="specialty-detail-subtitle">{specialty.description}</p>
        </div>

        {/* Content Section */}
        <div className="specialty-detail-content">
          <section className="specialty-section">
            <div className="specialty-section-text" dangerouslySetInnerHTML={{ __html: specialty.content?.whatIs || `<p>${specialty.title} hakkında detaylı bilgi yakında eklenecektir.</p>` }} />
          </section>

          {/* Call to Action */}
          <div className="specialty-detail-cta">
            <h3 className="specialty-cta-title">Randevu Almak İster Misiniz?</h3>
            <p className="specialty-cta-text">
              {specialty.title} hakkında daha fazla bilgi almak veya randevu oluşturmak için bizimle iletişime geçin.
            </p>
            <div className="specialty-cta-buttons">
              <a href="tel:+905452640880" className="specialty-cta-btn primary">
                Hemen Ara
              </a>
              <a href="https://wa.me/905452640880" className="specialty-cta-btn secondary">
                WhatsApp Mesaj
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
