import { useState, useEffect } from 'react'
import { Calendar, User, Tag } from "lucide-react"
import { getBlogPosts } from '../utils/supabaseDataManager'
import { Link } from 'react-router-dom'
import { publicAsset } from '../utils/paths'
import './BlogPage.css'

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    setLoading(true)
    const posts = await getBlogPosts()
    setBlogPosts(posts)
    setLoading(false)
  }

  return (
    <div className="blog-page">
      <div className="blog-page-header">
        <div className="blog-page-header-container">
          <h1 className="blog-page-title">Sağlık Blog</h1>
          <p className="blog-page-subtitle">
            Sağlığınız hakkında bilmeniz gereken her şey - Uzman tavsiyeleri ve güncel tıbbi bilgiler
          </p>
        </div>
      </div>

      <div className="blog-page-container">
        {loading ? (
          <div className="blog-page-loading">Yükleniyor...</div>
        ) : (
          <div className="blog-page-grid">
            {blogPosts.map((post) => (
            <article
              key={post.id}
              className="blog-page-card"
            >
              <div className="blog-page-image-wrapper">
                <img
                  src={publicAsset(post.image || "/placeholder.svg")}
                  alt={post.title}
                  className="blog-page-image"
                />
                <span className="blog-page-category">
                  {post.category}
                </span>
              </div>
              <div className="blog-page-content">
                <div className="blog-page-meta">
                  <div className="blog-page-meta-item">
                    <Calendar size={16} />
                    <span>{post.date}</span>
                  </div>
                  <div className="blog-page-meta-item">
                    <User size={16} />
                    <span>{post.author}</span>
                  </div>
                </div>
                <h2 className="blog-page-post-title">
                  <Link to={`/blog/${post.slug}`} className="blog-page-read-more">{post.title}</Link>
                </h2>
                <p className="blog-page-excerpt">{post.excerpt}</p>
                <div className="blog-page-footer">
                  <span className="blog-page-read-time">{post.readTime} okuma</span>
                  <Link to={`/blog/${post.slug}`} className="blog-page-read-more">Devamını Oku →</Link>
                </div>
              </div>
            </article>
          ))}
          </div>
        )}
      </div>
    </div>
  )
}
