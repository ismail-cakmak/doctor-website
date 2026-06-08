import { Award, Heart, Users, CheckCircle2, Star } from "lucide-react"
import { appPath, publicAsset } from "../utils/paths"
import './AboutPage.css'

export default function AboutPage() {
  const stats = [
    { icon: Users, value: "10,000+", label: "Mutlu Hasta" },
    { icon: Award, value: "25+", label: "Yıllık Deneyim" },
  ]

  const values = [
    {
      icon: Heart,
      title: "Hasta Odaklı Yaklaşım",
      description: "Her hastama özel ilgi gösterir, bireysel ihtiyaçlarına göre kişiselleştirilmiş tedavi planları oluştururum."
    },
    {
      icon: Award,
      title: "Uzmanlık ve Deneyim",
      description: "Alanımdaki güncel bilimsel gelişmeleri yakından takip eder, kanıta dayalı tıp ilkeleriyle çalışırım."
    },
    {
      icon: Star,
      title: "Modern Teknoloji",
      description: "En son teknolojik ekipmanlar ve güncel yöntemlerle hastalarıma daha etkili çözümler sunarım."
    }
  ]

const timeline = [
  {
    year: "1998",
    title: "Tıp Fakültesi Mezuniyeti",
    description: "Fırat Üniversitesi Tıp Fakültesi’nden mezun olarak tıp doktoru unvanını aldım."
  },
  {
    year: "2006",
    title: "Üroloji Uzmanlık Eğitimi",
    description: "Harran Üniversitesi Tıp Fakültesi’nde Üroloji ihtisasımı tamamlayarak uzman oldum."
  },
  {
    year: "2006-2008",
    title: "Kamu ve Özel Sektörde Görevler",
    description: "Şırnak Asker Hastanesi, Siverek Devlet Hastanesi"
  },
  {
    year: "2008-2025",
    title: "Androloji ve Üroloji Alanında Gelişim",
    description: " Özel Şanmed Hastanesi, Balıklıgöl Devlet Hastanesi ve Mehmet Akif İnan Eğitim ve Araştırma Hastanesi’nde üroloji uzmanı ve yönetici olarak görev yaptım."
  },
  {
    year: "Günümüz",
    title: "Sürekli Bilimsel ve Mesleki Gelişim",
    description: "Bilimsel, kaliteli ve yenilikçi sağlık hizmeti sunma hedefiyle çalışmalarımı sürdürmekte, hastalarıma en iyi tedavi seçeneklerini sunmaya devam etmekteyim."
  }
];


  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-hero-title">Hakkımda</h1>
          <p className="about-hero-subtitle">
            20 yılı aşkın deneyimim ve hasta odaklı yaklaşımımla, 
            sağlığınız için en iyisini sunuyorum.
          </p>
        </div>
      </section>



      {/* Mission Section */}
      <section className="about-mission-section">
        <div className="about-container">
          <div className="about-mission-grid">
            <div className="about-mission-image">
              <img 
                src={publicAsset("/sabri keser.jpeg")} 
                alt="Doktor portresi" 
                className="mission-img"
              />
            </div>
            <div className="about-mission-content">
              <h2 className="about-section-title">Hakkımda</h2>
              <div className="about-mission-text">
                <p>
                  1974 yılında Şanlıurfa’ da doğdum. Fırat Üniversitesi Tıp Fakültesi’ ni 1998’ de bitirip tıp doktoru unvanı aldım. 2001-2006 yılları arasında Harran Üniversitesi Tıp Fakültesi’ nde Üroloji ihtisasımı tamamladım. Daha sonra Şırnak Asker Hastanesi ve Şanlıurfa’ da Siverek Devlet Hastanesi, Özel Şanmed Hastanesi, Balıklıgöl Devlet Hastanesi, Mehmet Akif İnan Eğitim ve Araştırma Hastanelerinde üroloji uzmanı ve yönetici olarak çalışmalarıma devam ettim. Şu anda Şanlıurfa’ da özel muayenehanemde hastalarıma hizmet vermeye devam ediyorum.
İlgi alanlarım özellikle androloji ile ilgili problemler ve çözüm teknikleri üzerinedir. Erkek infertilitesi (kısırlık), erektil disfonksiyon, erken boşalma, kadın cinsel fonksiyon bozuklukları, penis eğriliği (Peyronie hastalığı), erkek genital estetik (penil protez- mutluluk çubuğu-) cerrahileri, ESWT şok dalga tedavisi, penil ve testiküler PRP, eksozom ve kök hücre tedavileri, kronik prostatit ve tedavi seçenekleri, iyi huylu prostat büyümesi, böbrek ve idrar kanalı taş cerrahisi, kadınlarda sistit, idrar kaçırma ve sarkma ameliyatları üzerine çalışmalar yürütmekteyim.
Amacım hayatım boyunca, üroloji ve androloji alanlarında bilimsel, kaliteli ve yenilikçi sağlık hizmeti sunabilmektir. Hastalarıma en iyi tedaviyi sunabilmek ve mesleki bilgi birikimimi sürekli güncel tutmak için çalışmalarıma devam ediyorum.
Evli ve 2 çocuk babasıyım.

                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values-section">
        <div className="about-container">
          <h2 className="about-section-title-center">Değerlerim</h2>
          <p className="about-section-subtitle">
            Hekimlik pratiğimi şekillendiren temel ilkeler
          </p>
          
          <div className="about-values-grid">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="about-value-card">
                  <div className="about-value-icon-wrapper">
                    <Icon className="about-value-icon" />
                  </div>
                  <h3 className="about-value-title">{value.title}</h3>
                  <p className="about-value-description">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="about-timeline-section">
        <div className="about-container">
          <h2 className="about-section-title-center">Kariyer Yolculuğum</h2>
          <p className="about-section-subtitle">
            Mesleki yolculuğumdan öne çıkan başlıklar
          </p>
          
          <div className="timeline">
            {timeline.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="about-container">
          <div className="about-cta-content">
            <h2 className="about-cta-title">Sağlığınız İçin Benimle İletişime Geçin</h2>
            <p className="about-cta-text">
              Uzmanlığım ve modern yaklaşımlarla sağlık sorunlarınızda yanınızda olayım
            </p>
            <div className="about-cta-buttons">
              <a href={appPath("/#contact")} className="about-cta-button primary">
                Randevu Alın
              </a>
              <a href="tel:+905551234567" className="about-cta-button secondary">
                Beni Arayın
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
