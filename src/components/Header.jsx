"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Phone } from "lucide-react"
import './Header.css'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  const scrollToSpecialties = (e) => {
    e.preventDefault()
    setIsMenuOpen(false)
    
    if (location.pathname !== '/') {
      // Navigate to home page first, then scroll
      window.location.href = '/#specialties'
    } else {
      // Already on home page, just scroll
      const specialtiesSection = document.getElementById('specialties')
      if (specialtiesSection) {
        specialtiesSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-inner">
          <Link to="/" className="header-logo-wrapper">
            <img src="/new_logo.png" alt="Logo" className="header-logo-image" />
            <span className="header-logo-text">Dr. Bülent Sabri Keser</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="header-nav-desktop">
            <Link to="/" className="header-nav-link">
              Ana Sayfa
            </Link>
            <Link to="/hakkimda" className="header-nav-link">
              Hakkımda
            </Link>
            <a href="#specialties" onClick={scrollToSpecialties} className="header-nav-link">
              Uzmanlık Alanları
            </a>
            <Link to="/blog" className="header-nav-link">
              Blog
            </Link>
            <a 
              href={isHomePage ? "#location" : "/#location"} 
              className="header-nav-link"
              onClick={(e) => {
                if (!isHomePage) {
                  e.preventDefault()
                  window.location.href = '/#location'
                }
              }}
            >
              İletişim
            </a>
            <a href="tel:+905551234567" className="header-call-button">
              <Phone size={18} />
              <span>Hemen Ara</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button className="header-menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="header-nav-mobile">
            <Link to="/" className="header-nav-link" onClick={handleNavClick}>
              Ana Sayfa
            </Link>
            <Link to="/hakkimda" className="header-nav-link" onClick={handleNavClick}>
              Hakkımda
            </Link>
            <a href="#specialties" onClick={scrollToSpecialties} className="header-nav-link">
              Uzmanlık Alanları
            </a>
            <Link to="/blog" className="header-nav-link" onClick={handleNavClick}>
              Blog
            </Link>
            <a 
              href={isHomePage ? "#location" : "/#location"} 
              className="header-nav-link" 
              onClick={(e) => {
                handleNavClick()
                if (!isHomePage) {
                  e.preventDefault()
                  window.location.href = '/#location'
                }
              }}
            >
              İletişim
            </a>
            <a href="tel:+905551234567" className="header-call-button-mobile">
              <Phone size={18} />
              <span>Hemen Ara</span>
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}
