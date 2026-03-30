"use client";

import { useState, useEffect } from "react";
import { Check, X, Star, MessageCircle, RefreshCw } from "lucide-react";
import styles from "./CommentsManager.module.css";

interface AdminComment {
  id: string;
  authorName: string;
  content: string;
  status: string;
  createdAt: string;
  post: { title: string };
}

export default function CommentsManager() {
  const [comments, setComments] = useState<AdminComment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/comments");
      const data = await res.json();
      if (data.comments) {
        setComments(data.comments);
      }
    } catch (e) {
      console.error("Failed to load admin comments", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/admin/comments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status })
      });
      if (res.ok) {
        setComments(c => c.map(comment => comment.id === id ? { ...comment, status } : comment));
      }
    } catch (e) {
      console.error("Update failed", e);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className="font-geek" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <MessageCircle size={24} /> Moderation Queue
        </h2>
        <button onClick={fetchComments} className={styles.refreshBtn} disabled={loading}>
          <RefreshCw size={16} className={loading ? styles.spinning : ''} /> Refresh
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Status</th>
              <th>Author</th>
              <th>Comment</th>
              <th>Post</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.map(c => (
              <tr key={c.id}>
                <td>
                  <span className={`${styles.badge} ${styles[c.status.toLowerCase()]}`}>
                    {c.status}
                  </span>
                </td>
                <td><strong>{c.authorName}</strong></td>
                <td style={{ maxWidth: "300px" }}><p className={styles.truncate}>{c.content}</p></td>
                <td className={styles.postTitle}>{c.post?.title}</td>
                <td className={styles.date}>{new Date(c.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className={styles.actions}>
                    {c.status !== 'APPROVED' && c.status !== 'FEATURED' && (
                      <button title="Approve" onClick={() => updateStatus(c.id, 'APPROVED')} className={`${styles.iconBtn} ${styles.approve}`}><Check size={16} /></button>
                    )}
                    {c.status !== 'FEATURED' && (
                      <button title="Feature" onClick={() => updateStatus(c.id, 'FEATURED')} className={`${styles.iconBtn} ${styles.feature}`}><Star size={16} /></button>
                    )}
                    {c.status !== 'REJECTED' && (
                      <button title="Reject" onClick={() => updateStatus(c.id, 'REJECTED')} className={`${styles.iconBtn} ${styles.reject}`}><X size={16} /></button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {comments.length === 0 && !loading && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                  Zero comments requiring moderation right now. Paranoid but peaceful.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
