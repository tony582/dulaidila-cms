"use client";

import { useState, SyntheticEvent } from "react";
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
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
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`container ${styles.page}`}>
      {/* Left — the invitation */}
      <div className={`anim-rise ${styles.infoCol}`}>
        <p className="eyebrow">Contact · 开始对话</p>

        <h1 className={styles.title}>
          Begin the
          <br />
          <em>conversation.</em>
        </h1>

        <p className={styles.subtitle}>
          Have a project in mind, or a problem that refuses to define itself?
          Write to us — 有想法，或是有个还说不清楚的难题？都欢迎来聊。
        </p>

        <dl className={styles.channels}>
          <div className={styles.channelRow}>
            <dt>Email</dt>
            <dd>
              <a href="mailto:tony.jin@dulaidila.com">tony.jin@dulaidila.com</a>
            </dd>
          </div>
          <div className={styles.channelRow}>
            <dt>WeChat</dt>
            <dd>dulaidila</dd>
          </div>
          <div className={styles.channelRow}>
            <dt>Base</dt>
            <dd>Shanghai, China · 上海</dd>
          </div>
        </dl>

        <p className={styles.aphorism}>
          “Every engagement begins with a conversation.”
        </p>
      </div>

      {/* Right — the form */}
      <div
        className={`anim-rise ${styles.formCol}`}
        style={{ animationDelay: "0.14s" }}
      >
        <div className={styles.formCard}>
          {isSuccess ? (
            <div className={`anim-rise ${styles.successState}`}>
              <div className={styles.successMark} aria-hidden>
                ✓
              </div>
              <h2>Message received.</h2>
              <p>
                已收到您的来信。Thank you for reaching out — we will get back to
                you shortly.
              </p>
              <button
                className="btn btn-line"
                onClick={() => {
                  setIsSuccess(false);
                  setFormData({
                    name: "",
                    email: "",
                    company: "",
                    projectType: "",
                    message: "",
                  });
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name">Name 姓名 *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="How should we address you?"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email 邮箱 *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="company">Company 公司</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Optional"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="projectType">Engagement 合作类型</label>
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
                <label htmlFor="message">Brief 项目简述 *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="The problem, the context, the timeline — anything helps."
                ></textarea>
              </div>

              {errorMsg && <p className={styles.errorMessage}>{errorMsg}</p>}

              <button
                type="submit"
                className={`btn btn-ink ${styles.submitBtn}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending…" : "Send Message"}
                {!isSubmitting && <span className="btn-arrow">→</span>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
