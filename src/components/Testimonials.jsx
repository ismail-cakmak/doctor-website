import { Star } from "lucide-react"
import './Testimonials.css'

const testimonials = [
  {
    name: "Ahmet Yılmaz",
    rating: 5,
    text: "Dr. Keser olağanüstü bir hekim. Dinlemek için zaman ayırıyor ve kapsamlı açıklamalar sunuyor. Kendisini şiddetle tavsiye ediyorum!",
    date: "2 hafta önce",
    verified: true,
  },
  {
    name: "Ayşe Demir",
    rating: 5,
    text: "Şimdiye kadar gittiğim en iyi doktor. Çok bilgili, ilgili ve profesyonel. Ofis personeli de harika.",
    date: "1 ay önce",
    verified: true,
  },
  {
    name: "Mehmet Kaya",
    rating: 5,
    text: "Dr. Keser kronik rahatsızlığımı etkili bir şekilde yönetmeme yardımcı oldu. Bütünsel yaklaşımı yaşam kalitemi önemli ölçüde iyileştirdi.",
    date: "2 ay önce",
    verified: true,
  },
  {
    name: "Zeynep Arslan",
    rating: 5,
    text: "Mükemmel bakım ve detaylara dikkat. Dr. Keser hastalarını gerçekten önemsiyor ve bu yaptığı her şeyde görülüyor.",
    date: "3 ay önce",
    verified: true,
  },
]

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <h2 className="testimonials-title">Hasta Yorumları</h2>
        <p className="testimonials-subtitle">
          Hastalarımızın deneyimleri hakkında söylediklerini görün
        </p>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-user">
                  <div className="testimonial-avatar">
                    <span className="testimonial-initial">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="testimonial-name">{testimonial.name}</h3>
                    <p className="testimonial-date">{testimonial.date}</p>
                  </div>
                </div>
                {testimonial.verified && (
                  <span className="testimonial-verified">Doğrulanmış</span>
                )}
              </div>

              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="testimonial-star" />
                ))}
              </div>

              <p className="testimonial-text">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
