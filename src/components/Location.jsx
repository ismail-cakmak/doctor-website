import { MapPin, Phone, Mail, Clock, Instagram } from "lucide-react"
import './Location.css'

export default function Location() {
  return (
    <section id="location" className="location-section">
      <div className="location-container">
        <div className="location-header">
          <h2 className="location-title">Konum & İletişim</h2>
          <p className="location-subtitle">
            Kliniğimizi ziyaret edin veya bizimle iletişime geçin
          </p>
        </div>

        <div className="location-content">
          {/* Map */}
          <div className="location-map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d794.7362586928444!2d38.81257936957171!3d37.17777719825887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1534710037c6174f%3A0x9e834901c132cb16!2sOp.Dr.B%C3%BClent%20Sabri%20Keser!5e0!3m2!1str!2str!4v1764593497679!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Klinik Konumu"
            ></iframe>
          </div>

          {/* Contact Information */}
          <div className="location-info">
            <div className="location-info-card">
              <div className="location-info-item">
                <div className="location-info-icon-wrapper">
                  <MapPin className="location-info-icon" />
                </div>
                <div>
                  <h3 className="location-info-title">Adres</h3>
                  <p className="location-info-text">
                    Ertuğrul Gazi, Yunus Emre Cd. no:104, 63300 Haliliye/Şanlıurfa
                  </p>
                  <a 
                    href="https://maps.app.goo.gl/oAXBUirsF9K3swzWA" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="location-info-link"
                  >
                    Yol Tarifi Al →
                  </a>
                </div>
              </div>

              <div className="location-info-item">
                <div className="location-info-icon-wrapper">
                  <Phone className="location-info-icon" />
                </div>
                <div>
                  <h3 className="location-info-title">Telefon</h3>
                  <a href="tel:+905452640880" className="location-info-text hover-link">
                    +90 545 264 08 80
                  </a>
                </div>
              </div>

              <div className="location-info-item">
                <div className="location-info-icon-wrapper">
                  <Mail className="location-info-icon" />
                </div>
                <div>
                  <h3 className="location-info-title">E-posta</h3>
                  <a href="mailto:sabrikeser@hotmail.com" className="location-info-text hover-link">
                    sabrikeser@hotmail.com
                  </a>
                </div>
              </div>

              <div className="location-info-item">
                <div className="location-info-icon-wrapper">
                  <Clock className="location-info-icon" />
                </div>
                <div>
                  <h3 className="location-info-title">Çalışma Saatleri</h3>
                  <div className="location-info-text">
                    <p>Pazartesi - Cuma: 08:00 - 18:00</p>
                    <p>Cumartesi: 08:00 - 13:00</p>
                    <p>Pazar: Kapalı</p>
                  </div>
                </div>
              </div>

              <div className="location-info-item">
                <div className="location-info-icon-wrapper">
                  <Instagram className="location-info-icon" />
                </div>
                <div>
                  <h3 className="location-info-title">Instagram</h3>
                  <a 
                    href="https://www.instagram.com/dr.bulentsabrikeser/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="location-info-text hover-link"
                  >
                    @dr.bulentsabrikeser
                  </a>
                  <h4></h4>
                  <a 
                    href="https://www.instagram.com/sanliurfa.modus.ed_swt112/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="location-info-text hover-link"
                  >
                    @sanliurfa.modus.ed_swt112
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

