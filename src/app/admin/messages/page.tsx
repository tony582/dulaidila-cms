"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutDashboard, MessageSquare, PenSquare, Briefcase, Mail, CheckCircle } from "lucide-react";
import styles from "../admin.module.css";
import messagesStyles from "./messages.module.css";

export default function MessagesDashboard() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/admin/messages");
      const data = await res.json();
      setMessages(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "UNREAD" ? "READ" : "UNREAD";
    try {
      await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      fetchMessages();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className="font-geek">Dulaidila CMS</h2>
        </div>
        <nav className={styles.navStack}>
          <Link href="/admin" className={styles.navItem}><LayoutDashboard size={18}/> Overview</Link>
          <Link href="/admin/editor" className={styles.navItem}><PenSquare size={18}/> Write Post</Link>
          <Link href="/admin/comments" className={styles.navItem}><MessageSquare size={18}/> Comments</Link>
          <Link href="/admin/messages" className={styles.activeNav}><Mail size={18}/> Contact Inbox</Link>
          <Link href="/admin/portfolio" className={styles.navItem}><Briefcase size={18}/> Portfolio</Link>
        </nav>
      </aside>

      <main className={styles.adminMain}>
        <header className={styles.mainHeader}>
          <h1>Contact Messages Inbox</h1>
        </header>

        <section className={styles.contentSection}>
          <div className={messagesStyles.messagesGrid}>
            {loading ? (
              <p>Loading inbox...</p>
            ) : messages.length === 0 ? (
              <p className={styles.emptyState}>No messages yet. Waiting for clients to say hello!</p>
            ) : (
              messages.map((msg: any) => (
                <div key={msg.id} className={`${messagesStyles.messageCard} ${msg.status === 'UNREAD' ? messagesStyles.unread : ''}`}>
                  <div className={messagesStyles.messageHeader}>
                    <div>
                      <h3>{msg.name}</h3>
                      <a href={`mailto:${msg.email}`} className={messagesStyles.email}>{msg.email}</a>
                    </div>
                    <span className={messagesStyles.date}>{new Date(msg.createdAt).toLocaleString()}</span>
                  </div>
                  
                  <div className={messagesStyles.metaInfo}>
                    {msg.company && <span className={messagesStyles.badge}>Company: {msg.company}</span>}
                    {msg.projectType && <span className={messagesStyles.badge}>Type: {msg.projectType}</span>}
                  </div>

                  <p className={messagesStyles.body}>{msg.message}</p>

                  <div className={messagesStyles.actions}>
                    <button 
                      className={styles.textBtn} 
                      onClick={() => markAsRead(msg.id, msg.status)}
                    >
                       <CheckCircle size={16} /> 
                       {msg.status === "UNREAD" ? "Mark as Read" : "Mark as Unread"}
                    </button>
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
