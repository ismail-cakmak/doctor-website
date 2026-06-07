import { isSupabaseConfigured, supabase } from '../lib/supabaseClient'
import * as localData from './dataManager'

const useLocalData = () => !isSupabaseConfigured || !supabase

const formatDate = (dateValue) => {
  if (!dateValue) return ''

  return new Date(dateValue).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const toBlogPost = (post) => ({
  id: post.id,
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  content: post.content,
  image: post.image,
  author: post.author,
  category: post.category,
  readTime: post.read_time || post.readTime,
  date: post.date || formatDate(post.created_at),
})

const toSpecialty = (specialty) => ({
  slug: specialty.slug,
  title: specialty.title,
  description: specialty.description,
  icon: specialty.icon,
  content: {
    whatIs: specialty.what_is || specialty.content?.whatIs || '',
  },
})

const toVideo = (video) => ({
  id: video.id,
  title: video.title,
  youtubeUrl: video.youtube_url || video.youtubeUrl,
  youtubeId: video.youtube_id || video.youtubeId,
  displayOrder: video.display_order ?? video.displayOrder ?? 0,
  isActive: video.is_active ?? video.isActive ?? true,
  createdAt: video.created_at || video.createdAt,
})

const extractYouTubeId = (url) => {
  if (!url) return null

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  return null
}

// ============= BLOG POSTS =============

export const getBlogPosts = async () => {
  if (useLocalData()) return localData.getBlogPosts()

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }

  return data.map(toBlogPost)
}

export const getBlogPostBySlug = async (slug) => {
  if (useLocalData()) return localData.getBlogPostBySlug(slug)

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    console.error('Error fetching blog post:', error)
    return null
  }

  return data ? toBlogPost(data) : null
}

export const saveBlogPost = async (post) => {
  if (useLocalData()) return localData.saveBlogPost(post)

  const slug = post.slug || post.title
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  const postData = {
    slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    image: post.image,
    author: post.author || 'Dr. Sabri Keser',
    category: post.category,
    read_time: post.readTime || post.read_time,
    updated_at: new Date().toISOString(),
  }

  const query = post.id
    ? supabase.from('blog_posts').update(postData).eq('id', post.id)
    : supabase.from('blog_posts').insert([postData])

  const { data, error } = await query.select().single()

  if (error) {
    console.error('Error saving blog post:', error)
    throw error
  }

  return toBlogPost(data)
}

export const deleteBlogPost = async (id) => {
  if (useLocalData()) return localData.deleteBlogPost(id)

  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting blog post:', error)
    throw error
  }
}

// ============= SPECIALTIES =============

export const getSpecialties = async () => {
  if (useLocalData()) return localData.getSpecialties()

  const { data, error } = await supabase
    .from('specialties')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching specialties:', error)
    return []
  }

  return data.map(toSpecialty)
}

export const getSpecialtyBySlug = async (slug) => {
  if (useLocalData()) return localData.getSpecialtyBySlug(slug)

  const { data, error } = await supabase
    .from('specialties')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    console.error('Error fetching specialty:', error)
    return null
  }

  return data ? toSpecialty(data) : null
}

export const saveSpecialty = async (specialty) => {
  if (useLocalData()) return localData.saveSpecialty(specialty)

  const specialtyData = {
    slug: specialty.slug,
    title: specialty.title,
    description: specialty.description,
    icon: specialty.icon,
    what_is: specialty.content?.whatIs || specialty.what_is,
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from('specialties')
    .upsert(specialtyData, { onConflict: 'slug' })
    .select()
    .single()

  if (error) {
    console.error('Error saving specialty:', error)
    throw error
  }

  return toSpecialty(data)
}

export const deleteSpecialty = async (slug) => {
  if (useLocalData()) return localData.deleteSpecialty(slug)

  const { error } = await supabase
    .from('specialties')
    .delete()
    .eq('slug', slug)

  if (error) {
    console.error('Error deleting specialty:', error)
    throw error
  }
}

// ============= VIDEOS =============

export const getAllVideos = async () => {
  if (useLocalData()) return localData.getAllVideos()

  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching all videos:', error)
    return []
  }

  return data.map(toVideo).filter(video => video.isActive !== false)
}

export const getVideoById = async (id) => {
  if (useLocalData()) return localData.getVideoById(id)

  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    console.error('Error fetching video:', error)
    return null
  }

  return data ? toVideo(data) : null
}

export const saveVideo = async (video) => {
  if (useLocalData()) return localData.saveVideo(video)

  const youtubeId = extractYouTubeId(video.youtubeUrl || video.youtube_url)

  if (!youtubeId) {
    throw new Error('Geçerli bir YouTube URL\'si giriniz')
  }

  const videoData = {
    title: video.title,
    youtube_url: video.youtubeUrl || video.youtube_url,
    youtube_id: youtubeId,
    display_order: video.displayOrder ?? video.display_order ?? 0,
    is_active: video.isActive ?? video.is_active ?? true,
    updated_at: new Date().toISOString(),
  }

  const query = video.id
    ? supabase.from('videos').update(videoData).eq('id', video.id)
    : supabase.from('videos').insert([videoData])

  const { data, error } = await query.select().single()

  if (error) {
    console.error('Error saving video:', error)
    throw error
  }

  return toVideo(data)
}

export const deleteVideo = async (id) => {
  if (useLocalData()) return localData.deleteVideo(id)

  const { error } = await supabase
    .from('videos')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting video:', error)
    throw error
  }
}
