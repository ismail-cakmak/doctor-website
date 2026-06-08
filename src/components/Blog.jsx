import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { getBlogPosts } from '../utils/supabaseDataManager'
import { publicAsset } from '../utils/paths'
import './Blog.css'

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    setLoading(true)
    const posts = await getBlogPosts()
    setBlogPosts(posts.slice(0, 3)) // Get first 3 posts for homepage
    setLoading(false)
  }

  if (loading) {
    return (
      <section id="blog" className="blog-section">
        <div className="blog-container">
          <h2 className="blog-title">Son Yazılar</h2>
          <p className="blog-subtitle">Yükleniyor...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="blog" className="blog-section">
      <div className="blog-container">
        <h2 className="blog-title">Son Yazılar</h2>
        <p className="blog-subtitle">
          En son sağlık ipuçları ve tıbbi görüşlerimizle bilgilenin
        </p>

        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="blog-article"
            >
              <div className="blog-image-wrapper">
                <img
                  src={publicAsset(post.image || "/placeholder.svg")}
                  alt={post.title}
                  className="blog-image"
                />
                <span className="blog-category">
                  {post.category}
                </span>
              </div>
              <div className="blog-content">
                <p className="blog-date">{post.date}</p>
                <h3 className="blog-post-title">
                  {post.title}
                </h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="blog-read-more">
                  Devamını Oku →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="blog-cta-wrapper">
          <Link
            to="/blog"
            className="blog-cta-button"
          >
            Tüm Yazıları Görüntüle
          </Link>
        </div>
      </div>
    </section>
  )
}
