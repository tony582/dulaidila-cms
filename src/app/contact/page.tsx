"use client";

import { motion } from "motion/react";
import { useState, SyntheticEvent } from "react";
import { Terminal, Send, CheckCircle, MapPin, Mail, Coffee, MessageCircle } from "lucide-react";
import styles from "./contact.module.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`container ${styles.contactContainer}`}>
      
      {/* Left Info Column */}
      <motion.div 
        className={styles.infoCol}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className={styles.brandIcon}>
          <Terminal size={48} />
        </div>
        <h1 className="font-geek">Say <span className="text-gradient">Hello.</span></h1>
        <p className={styles.subtitle}>
          Have a project in mind or want to explore how we can collaborate?
          We'd love to hear from you.
        </p>

        <div className={styles.socialInfo}>
          <div className={styles.infoItem}>
            <Mail size={20} className={styles.infoIndicator} />
            <span>tony.jin@dulaidila.com</span>
          </div>
          <div className={styles.infoItem}>
            <MessageCircle size={20} className={styles.infoIndicator} />
            <span>WeChat: dulaidila</span>
          </div>
          <div className={styles.infoItem}>
            <Coffee size={20} className={styles.infoIndicator} />
            <span>Let's grab a virtual coffee</span>
          </div>
        </div>
      </motion.div>

      {/* Right Form Column */}
      <motion.div 
        className={styles.formCol}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <div className={`glass-card ${styles.formCard}`}>
          {isSuccess ? (
            <motion.div 
              className={styles.successState}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <CheckCircle size={64} className={styles.successIcon} />
              <h2>Message Sent!</h2>
              <p>Thank you for reaching out. Our team will get back to you shortly.</p>
              <button className={styles.btnOutline} onClick={() => {
                setIsSuccess(false);
                setFormData({ name: "", email: "", company: "", projectType: "", message: "" });
              }}>
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name">Your Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe" 
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com" 
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="company">Company (Optional)</label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company" 
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Acme Inc." 
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="projectType">Project Type</label>
                  <select 
                    id="projectType" 
                    name="projectType" 
                    value={formData.projectType}
                    onChange={handleChange}
                  >
                    <option value="">Select an option</option>
                    <option value="digital_design">UI/UX Digital Design</option>
                    <option value="dev">Full-stack Development</option>
                    <option value="consulting">Tech Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="message">Message *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  required 
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..." 
                ></textarea>
              </div>

              {errorMsg && <p className={styles.errorMessage}>{errorMsg}</p>}

              <button 
                type="submit" 
                className={styles.submitBtn} 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                {!isSubmitting && <Send size={18} />}
              </button>
            </form>
          )}
        </div>
      </motion.div>

    </div>
  );
}
