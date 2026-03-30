"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import { Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy login: in local prototype, any password logs you in
    if (password) {
      alert("Logged in successfully! This is a prototype so auth is mocked.");
      router.push("/admin");
    } else {
      alert("Please enter a password");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={`${styles.loginBox} glass`}>
        <div className={styles.iconWrapper}>
          <Lock size={32} color="var(--accent-cyan)" />
        </div>
        <h1 className="font-geek" style={{marginBottom: "30px", fontSize: "2rem"}}>
          Secure <span className="text-gradient">Access</span>
        </h1>
        
        <form onSubmit={handleLogin} className={styles.form}>
          <input 
            type="password" 
            placeholder="Admin Password" 
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="primaryButton" style={{width: "100%", padding: "14px"}}>
            Enter CMS
          </button>
        </form>
      </div>
    </div>
  );
}
