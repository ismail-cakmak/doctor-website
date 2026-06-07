import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBlogPostBySlug } from '../utils/supabaseDataManager'
import './BlogPostPage.css'

export default function BlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPost()
  }, [slug])

  const loadPost = async () => {
    setLoading(true)
    const data = await getBlogPostBySlug(slug)
    setPost(data)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="blog-post-page">
        <div className="blog-post-container">
          <h1 className="blog-post-title">Yükleniyor...</h1>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="blog-post-page">
        <div className="blog-post-container">
          <h1 className="blog-post-title">Yazı bulunamadı</h1>
          <p>Aradığınız blog yazısı mevcut değil.</p>
          <Link to="/blog" className="blog-post-back">← Blog'a dön</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="blog-post-page">
      <div className="blog-post-hero">
        <div className="blog-post-hero-container">
          <span className="blog-post-category">{post.category}</span>
          <h1 className="blog-post-hero-title">{post.title}</h1>
          <p className="blog-post-meta">{post.date} • {post.readTime} • {post.author}</p>
        </div>
      </div>

      <div className="blog-post-container">
        <div className="blog-post-image-wrapper">
          <img src={post.image} alt={post.title} className="blog-post-image" />
        </div>
        <article className="blog-post-content">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
        <div className="blog-post-actions">
          <Link to="/blog" className="blog-post-back">← Tüm yazılar</Link>
        </div>
      </div>
    </div>
  )
}


