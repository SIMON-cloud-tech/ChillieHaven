import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import "../css/BlogSection.css";

function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [visible, setVisible] = useState(3);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE}/blogs`)
      .then((res) => res.json())
      .then((data) => {
         console.log("Blog data:", data);
        // 🔥 SAFE GUARD: ensure array always
        if (Array.isArray(data)) {
          setBlogs(data);
        } else if (Array.isArray(data.data)) {
          setBlogs(data.data);
        } else {
          setBlogs([]);
        }
      })
      .catch((err) => {
        console.log("Blog fetch error:", err);
        setBlogs([]); // 🔥 prevent crash
      });
  }, [API_BASE]);

  // 🔍 SAFE FILTERING
  const filteredBlogs = useMemo(() => {
    const q = search.toLowerCase();

    return blogs.filter((blog) => {
      const title = blog?.title?.toLowerCase() || "";
      const date = blog?.date?.toLowerCase() || "";

      return title.includes(q) || date.includes(q);
    });
  }, [blogs, search]);

  const visibleBlogs = filteredBlogs.slice(0, visible);
  const hasMore = visible < filteredBlogs.length;

  return (
    <section className="blog-section">
      <h2 className="section-title">Latest Blog Updates</h2>

      {/* SEARCH */}
      <div className="blog-search-wrapper">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setVisible(3);
          }}
          className="blog-search-input"
          placeholder="Search blogs..."
        />
      </div>

      {/* LOAD MORE */}
      {hasMore && (
        <div className="blog-load-wrapper">
          <button onClick={() => setVisible(v => v + 3)}>
            Load More
          </button>
        </div>
      )}

      {/* GRID */}
      <div className="blog-grid">
        {visibleBlogs.map((blog, i) => (
          <div key={blog?.id || i} className="blog-card">
            <h3>{blog.title || "Untitled"}</h3>
            <p>{blog.shortDesc}...</p>
            <small>{blog.date || "No date"}</small>
             <button className="read-more-btn" onClick={() => navigate(`/blog/${blog.slug}`)}> Read More </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BlogSection;