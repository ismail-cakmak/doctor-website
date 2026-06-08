import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import BlogPage from "./pages/BlogPage"
import BlogPostPage from "./pages/BlogPostPage"
import SpecialtyDetailPage from "./pages/SpecialtyDetailPage"

// Admin components
import AdminLogin from "./pages/AdminLogin"
import AdminDashboard from "./pages/AdminDashboard"
import AdminOverview from "./pages/AdminOverview"
import AdminBlogList from "./pages/AdminBlogList"
import AdminBlogEditor from "./pages/AdminBlogEditor"
import AdminSpecialtiesList from "./pages/AdminSpecialtiesList"
import AdminSpecialtyEditor from "./pages/AdminSpecialtyEditor"
import AdminVideosList from "./pages/AdminVideosList"
import AdminVideoEditor from "./pages/AdminVideoEditor"
import ProtectedRoute from "./components/ProtectedRoute"

const routerBasename = import.meta.env.BASE_URL === "/"
  ? undefined
  : import.meta.env.BASE_URL.replace(/\/$/, "")

function App() {
  return (
    <Router basename={routerBasename}>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/*" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<AdminOverview />} />
          <Route path="blog-posts" element={<AdminBlogList />} />
          <Route path="blog-posts/new" element={<AdminBlogEditor />} />
          <Route path="blog-posts/edit/:id" element={<AdminBlogEditor />} />
          <Route path="specialties" element={<AdminSpecialtiesList />} />
          <Route path="specialties/new" element={<AdminSpecialtyEditor />} />
          <Route path="specialties/edit/:slug" element={<AdminSpecialtyEditor />} />
          <Route path="videos" element={<AdminVideosList />} />
          <Route path="videos/new" element={<AdminVideoEditor />} />
          <Route path="videos/edit/:id" element={<AdminVideoEditor />} />
        </Route>

        {/* Public Routes */}
        <Route path="/*" element={
          <div className="min-h-screen bg-white">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/hakkimda" element={<AboutPage />} />
                <Route path="/uzmanlik/:slug" element={<SpecialtyDetailPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  )
}

export default App
