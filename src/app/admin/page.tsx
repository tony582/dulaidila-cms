"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PenSquare, LayoutDashboard, MessageSquare, Briefcase } from "lucide-react";
import styles from "./admin.module.css";

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts").then(res => res.json()).then(data => setPosts(data));
  }, []);

  return (
    <div className={styles.adminContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className="font-geek">Dulaidila CMS</h2>
        </div>
        <nav className={styles.navStack}>
          <Link href="/admin" className={styles.activeNav}><LayoutDashboard size={18}/> Overview</Link>
          <Link href="/admin/editor" className={styles.navItem}><PenSquare size={18}/> Write Post</Link>
          <Link href="/admin/comments" className={styles.navItem}><MessageSquare size={18}/> Comments</Link>
          <Link href="/admin/portfolio" className={styles.navItem}><Briefcase size={18}/> Portfolio</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.adminMain}>
        <header className={styles.mainHeader}>
          <h1>Dashboard Overview</h1>
          <Link href="/admin/editor" className="primaryButton" style={{ padding: '8px 16px', background: 'var(--accent-cyan)', color: '#000' }}>
            + New Post
          </Link>
        </header>

        <section className={styles.contentSection}>
          <h2>Published Posts</h2>
          <div className={styles.postList}>
            {posts.length === 0 ? (
              <p className={styles.emptyState}>No posts yet. Start writing your first geeky post!</p>
            ) : (
              posts.map((post: any) => (
                <div key={post.id} className={styles.postItem}>
                  <div className={styles.postInfo}>
                    <h3>{post.title}</h3>
                    <span className={styles.postDate}>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className={styles.postActions}>
                    <button className={styles.textBtn}>Edit</button>
                    <button className={`${styles.textBtn} ${styles.danger}`}>Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
