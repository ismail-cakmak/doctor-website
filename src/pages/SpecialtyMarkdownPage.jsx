import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './SpecialtyDetailPage.css'

export default function SpecialtyMarkdownPage({ slug, icon: Icon, title, description }) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Import markdown file dynamically
    import(`../content/specialties/${slug}.md?raw`)
      .then((module) => {
        setContent(module.default)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error loading markdown:', error)
        setContent('# İçerik Yüklenemedi\n\nİçerik dosyası bulunamadı.')
        setLoading(false)
      })
  }, [slug])

  // Custom components for enhanced rendering
  const components = {
    // Custom table styling
    table: ({ node, ...props }) => (
      <div className="markdown-table-wrapper">
        <table {...props} />
      </div>
    ),
    // Custom blockquote with icon
    blockquote: ({ node, ...props }) => (
      <blockquote className="markdown-blockquote" {...props} />
    ),
    // Add target blank to external links
    a: ({ node, href, ...props }) => {
      const isExternal = href?.startsWith('http')
      return (
        <a 
          href={href} 
          {...props} 
          {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
        />
      )
    },
    // Custom heading with anchors
    h2: ({ node, children, ...props }) => {
      const id = children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
      return <h2 id={id} {...props}>{children}</h2>
    },
    h3: ({ node, children, ...props }) => {
      const id = children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
      return <h3 id={id} {...props}>{children}</h3>
    },
  }

  if (loading) {
    return (
      <div className="specialty-detail-page">
        <div className="specialty-detail-container">
          <p>Yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="specialty-detail-page">
      <div className="specialty-detail-container">
        {/* Header Section */}
        <div className="specialty-detail-header">
          <div className="specialty-detail-icon-wrapper">
            <Icon className="specialty-detail-icon" />
          </div>
          <h1 className="specialty-detail-title">{title}</h1>
          <p className="specialty-detail-subtitle">{description}</p>
        </div>

        {/* Content Section - Rendered from Markdown */}
        <div className="specialty-detail-content">
          <div className="markdown-content">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={components}
            >
              {content}
            </ReactMarkdown>
          </div>

          {/* Call to Action */}
          <div className="specialty-detail-cta">
            <h3 className="specialty-cta-title">Randevu Almak İster Misiniz?</h3>
            <p className="specialty-cta-text">
              {title} hakkında daha fazla bilgi almak veya randevu oluşturmak için bizimle iletişime geçin.
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
