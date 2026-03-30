"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, MessageSquare } from "lucide-react";
import styles from "./CommentsSection.module.css";

interface Comment {
  id: string;
  authorName: string;
  content: string;
  createdAt: string;
  status: string;
  replies?: Comment[];
}

export default function CommentsSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?postId=${postId}`);
      const data = await res.json();
      if (data.comments) setComments(data.comments);
    } catch (e) {
      console.error("Error fetching comments:", e);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    setIsSubmitting(true);
    setSuccessMsg("");

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, authorName: name, content })
      });
      if (res.ok) {
        setSuccessMsg("Comment submitted successfully! It is pending moderation by Tony.");
        setName("");
        setContent("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h3 className="font-geek" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "32px", fontSize: "1.5rem" }}>
        <MessageSquare size={24} color="var(--accent-purple)" /> 
        Community Discussion
      </h3>

      <div className={`${styles.formCard} glass-card`}>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <User size={18} className={styles.inputIcon} />
            <input 
              type="text" 
              placeholder="Your Name / Organization" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
            />
          </div>
          <textarea 
            placeholder="Share your thoughts..." 
            value={content} 
            onChange={e => setContent(e.target.value)} 
            rows={4} 
            required 
            className={styles.textarea}
          />
          <div className={styles.submitRow}>
            {successMsg ? (
              <span className={styles.successText}>{successMsg}</span>
            ) : <span />}
            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Post Comment"} <Send size={16} />
            </button>
          </div>
        </form>
      </div>

      <div className={styles.commentsList}>
        <AnimatePresence>
          {comments.length === 0 ? (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.emptyText}>
              No discussions yet. Join the conversation below.
            </motion.p>
          ) : (
            comments.map((c, i) => (
              <motion.div 
                key={c.id} 
                className={`${styles.commentBubble} ${c.status === 'FEATURED' ? styles.featured : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={styles.commentHeader}>
                  <div className={styles.authorBadge}>{c.authorName.charAt(0).toUpperCase()}</div>
                  <strong>{c.authorName}</strong>
                  {c.status === 'FEATURED' && <span className={styles.tagFeatured}>Featured</span>}
                  <span className={styles.date}>{new Date(c.createdAt).toLocaleDateString()}</span>
                </div>
                <p className={styles.commentBody}>{c.content}</p>
                {/* Admin replies directly nested */}
                {c.replies && c.replies.length > 0 && (
                  <div className={styles.repliesList}>
                    {c.replies.map(r => (
                      <div key={r.id} className={`${styles.commentBubble} ${styles.replyBubble}`}>
                        <div className={styles.commentHeader}>
                          <div className={styles.authorBadge} style={{ background: 'var(--accent-cyan)' }}>T</div>
                          <strong>Tony Jin (Admin)</strong>
                          <span className={styles.date}>{new Date(r.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className={styles.commentBody}>{r.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
