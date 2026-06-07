import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getAllVideos } from '../utils/supabaseDataManager'
import './Videos.css'

export default function Videos() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadVideos()
  }, [])

  const loadVideos = async () => {
    setLoading(true)
    const data = await getAllVideos()
    setVideos(data)
    setLoading(false)
  }

  const videosPerPage = 2
  const maxIndex = Math.max(0, videos.length - videosPerPage)
  const totalPages = maxIndex + 1

  const handlePrevious = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => Math.max(0, prev - 1))
    setTimeout(() => setIsAnimating(false), 400)
  }

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
    setTimeout(() => setIsAnimating(false), 400)
  }

  const handleDotClick = (index) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 400)
  }

  const visibleVideos = videos.slice(currentIndex, currentIndex + videosPerPage)

  if (loading) {
    return (
      <section id="videos" className="videos-section">
        <div className="videos-container">
          <h2 className="videos-title">Videolar</h2>
          <p className="videos-loading">Yükleniyor...</p>
        </div>
      </section>
    )
  }

  if (videos.length === 0) {
    return null // Don't show section if no videos
  }

  return (
    <section id="videos" className="videos-section">
      <div className="videos-container">
        <h2 className="videos-title">Videolar</h2>
        
        <div className="videos-carousel">
          <button 
            className="carousel-button carousel-button-left"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            aria-label="Önceki videolar"
          >
            <ChevronLeft className="carousel-icon" />
          </button>

          <div className={`videos-grid ${isAnimating ? 'fade-in' : ''}`}>
            {visibleVideos.map((video) => (
              <div key={video.id} className="video-item">
                <div className="video-wrapper">
                  <iframe
                    className="video-iframe"
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <h3 className="video-title">{video.title}</h3>
              </div>
            ))}
          </div>

          <button 
            className="carousel-button carousel-button-right"
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            aria-label="Sonraki videolar"
          >
            <ChevronRight className="carousel-icon" />
          </button>
        </div>

        {/* Dot Pagination Indicators */}
        <div className="carousel-dots">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Sayfa ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
