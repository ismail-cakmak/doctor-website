import { Link } from 'react-router-dom'
import { publicAsset } from '../utils/paths'
import './About.css'

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <h2 className="about-title">Dr. Bülent Sabri Keser Kimdir?</h2>

        <div className="about-content-wrapper">
          <div className="about-text-content">
            <p className="about-text">
              Dr. Bülent Sabri Keser, üroloji ve androloji alanlarında 20 yılı aşkın deneyime sahip bir uzmandır. Fırat Üniversitesi Tıp Fakültesi’nden mezun olmuş, Harran Üniversitesi Tıp Fakültesi’nde üroloji ihtisasını tamamlamıştır
            </p>

            <p className="about-text">
Hasta odaklı ve kanıta dayalı bir yaklaşımla çalışan Dr. Keser; erkek infertilitesi, erektil disfonksiyon, erken boşalma, penis eğriliği (Peyronie), iyi huylu prostat büyümesi ve taş cerrahisi gibi ürolojik sorunların yanı sıra kadınlarda sistit, idrar kaçırma ve pelvik organ sarkması cerrahilerinde uzmanlaşmıştır. ESWT (şok dalga), penil/testiküler PRP, eksozom ve kök hücre gibi yenilikçi tedavileri uygun hastalarda uygulamakta; yalnızca semptomları değil, hastayı bütünüyle ele alarak kişiye özel, kapsamlı tedavi planları geliştirmektedir
            </p>

            <div className="about-cta-wrapper">
              <Link
                to="/hakkimda"
                className="about-cta-button"
              >
                Hakkımda
              </Link>
            </div>
          </div>

          <div className="about-image-wrapper">
            <img 
              src={publicAsset("/sabri keser.jpeg")} 
              alt="Dr. Sabri Keser" 
              className="about-image"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
