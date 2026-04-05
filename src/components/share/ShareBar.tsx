"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./ShareBar.module.css";

// ── Icons ────────────────────────────────────────────────────────────────────

function IconLink() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function IconX() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.402 6.231H2.744l7.737-8.852L1.254 2.25h7.002l4.264 5.634L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
    </svg>
  );
}

function IconWeibo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.61-2.759 5.049-6.739 5.443zM9.05 17.219c-.384.616-1.208.884-1.829.602-.612-.279-.793-.991-.406-1.593.379-.595 1.176-.861 1.793-.601.622.263.82.968.442 1.592zm2.032-1.169c-.141.237-.453.353-.689.253-.232-.09-.305-.361-.164-.591.14-.231.436-.347.672-.253.239.09.323.354.181.591zm.19-2.667c-1.02-.269-2.67.12-3.892 1.15-.509.42-.569 1.037-.127 1.352.436.31 1.142.186 1.626-.268.218-.2.437-.389.69-.467.277-.083.55-.07.784.038.232.107.38.288.428.503.078.34-.05.721-.338 1.019-.571.593-1.521.884-2.403.761-.879-.123-1.503-.625-1.586-1.305-.07-.575.228-1.19.801-1.687 1.394-1.209 3.472-1.657 4.856-1.052.374.162.675.406.886.713.212.31.321.673.319 1.053a3.23 3.23 0 0 1-.108.757c-.026.092-.093.17-.18.21-.088.04-.189.035-.274-.012-.084-.047-.146-.127-.168-.218a1.73 1.73 0 0 0-.123-.404c-.175-.39-.601-.622-1.192-.782zm7.741-8.91c-1.067-.983-2.67-1.373-4.285-1.066l-.215.04-.2-.127c-.547-.344-1.271-.479-2.027-.38l-.293.039-.112-.272C11.476 1.79 9.762.986 7.976 1.07L7.73 1.08 7.55.889C6.827.133 5.794-.174 4.784.094c-1.01.268-1.785 1.07-2.051 2.118C2.248 3.649 2.563 5.1 3.39 6.273c.163.232.139.549-.059.758-.197.208-.499.274-.764.163-.521-.218-.983-.603-1.302-1.1C.477 4.98.151 3.334.525 1.876.908.364 2.003-.738 3.441-1.122c1.445-.385 2.947.023 4.02 1.097.977-.023 1.966.306 2.79.958.765-.22 1.583-.257 2.376-.109 1.712-1.131 3.82-1.454 5.734-.877 1.937.585 3.44 2.023 4.013 3.84.585 1.852.187 3.849-.985 5.19l-.145.163-.218.009h-.013c-.295 0-.567-.165-.707-.43-.14-.264-.126-.586.035-.837.94-1.575 1.192-3.413.542-4.955z"/>
    </svg>
  );
}

function IconQR() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
      <rect x="14" y="14" width="3" height="3"/>
      <rect x="18" y="18" width="3" height="3"/>
    </svg>
  );
}

// ── Component ────────────────────────────────────────────────────────────────

interface ShareBarProps {
  title: string;
  url?: string;
}

export default function ShareBar({ title, url }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [pageUrl, setPageUrl] = useState(url ?? "");
  const qrRef = useRef<HTMLDivElement>(null);

  // resolve real URL client-side
  useEffect(() => {
    if (!url) setPageUrl(window.location.href);
  }, [url]);

  // close QR on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (qrRef.current && !qrRef.current.contains(e.target as Node)) {
        setShowQR(false);
      }
    };
    if (showQR) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showQR]);

  const encoded = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=00d4ff&bgcolor=0a0a0f&data=${encoded}`;

  return (
    <div className={styles.shareBar}>
      <span className={styles.label}>分享</span>

      {/* Copy Link */}
      <button
        className={`${styles.btn} ${copied ? styles.copied : ""}`}
        onClick={handleCopy}
        title="复制链接"
      >
        {copied ? <IconCheck /> : <IconLink />}
        <span>{copied ? "已复制" : "复制链接"}</span>
      </button>

      {/* Twitter / X */}
      <a
        className={styles.btn}
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        title="分享到 X (Twitter)"
      >
        <IconX />
        <span>X</span>
      </a>

      {/* Weibo */}
      <a
        className={styles.btn}
        href={`https://service.weibo.com/share/share.php?url=${encoded}&title=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        title="分享到微博"
      >
        <IconWeibo />
        <span>微博</span>
      </a>

      {/* WeChat QR */}
      <div className={styles.qrWrapper} ref={qrRef}>
        <button
          className={`${styles.btn} ${showQR ? styles.active : ""}`}
          onClick={() => setShowQR((v) => !v)}
          title="微信扫码分享"
        >
          <IconQR />
          <span>微信</span>
        </button>

        {showQR && (
          <div className={styles.qrPopup}>
            <div className={styles.qrArrow} />
            <p className={styles.qrHint}>微信扫码分享</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrSrc}
              alt="WeChat QR Code"
              width={160}
              height={160}
              className={styles.qrImage}
            />
            <p className={styles.qrUrl}>{pageUrl.replace(/^https?:\/\//, "")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
