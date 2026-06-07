import { useState, useEffect } from 'react'
import './Specialties.css'
import { Link } from 'react-router-dom'
import { getSpecialties } from '../utils/supabaseDataManager'
import {
  Stethoscope, Users, Droplets, Waves, Syringe,
  TestTube, Sparkles, Microscope, Shield, Pill, Slice, Activity, Heart, Brain
} from "lucide-react";

// Icon mapping for specialties
const iconComponents = {
  Stethoscope, Users, Droplets, Waves, Syringe,
  TestTube, Sparkles, Microscope, Shield, Pill, Slice, Activity, Heart, Brain
};

export default function Specialties() {
  const [specialties, setSpecialties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSpecialties()
  }, [])

  const loadSpecialties = async () => {
    setLoading(true)
    const data = await getSpecialties()
    setSpecialties(data)
    setLoading(false)
  }

  if (loading) {
    return (
      <section id="specialties" className="specialties-section">
        <div className="specialties-container">
          <h2 className="specialties-title">Uzmanlık Alanları</h2>
          <p className="specialties-subtitle">Yükleniyor...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="specialties" className="specialties-section">
      <div className="specialties-container">
        <h2 className="specialties-title">Uzmanlık Alanları</h2>
        <p className="specialties-subtitle">
          Sağlık ihtiyaçlarınıza özel kapsamlı tıbbi hizmetler
        </p>

        <div className="specialties-grid">
          {specialties.map((specialty, index) => {
            const Icon = iconComponents[specialty.icon] || Stethoscope;
            return (
              <Link
                key={index}
                to={`/uzmanlik/${specialty.slug}`}
                className="specialty-card"
              >
                <div className="specialty-icon-wrapper">
                  <Icon className="specialty-icon" />
                </div>
                <h3 className="specialty-title">{specialty.title}</h3>
                <p className="specialty-description">{specialty.description}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
