"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import { Save, ArrowLeft, Image as ImageIcon, Bold, Italic, Heading2, List, Quote, Video as YoutubeIcon } from "lucide-react";
import Link from "next/link";
import styles from "./editor.module.css";

export default function RichTextEditorPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Youtube.configure({
        inline: false,
        width: 800,
        height: 450,
      }),
      Placeholder.configure({
        placeholder: "Write your geeky thoughts here...",
      }),
    ],
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: styles.tiptapEditor,
      },
    },
  });

  const addImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && editor) {
        editor.chain().focus().setImage({ src: data.url }).run();
      } else {
        alert("Failed to upload image");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    }
    // reset input
    e.target.value = '';
  };

  const addYoutubeVideo = () => {
    const url = prompt('Enter YouTube URL');
    if (url && editor) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 800,
        height: 450,
      });
    }
  };

  const handleSave = async () => {
    if (!title) return alert("Please enter a title");
    if (!editor) return;
    
    setIsSaving(true);
    const content = editor.getHTML();
    
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title, 
          content,
          slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        }),
      });
      if (res.ok) {
        alert("Draft saved successfully!");
        router.push("/admin");
      } else {
        const err = await res.json();
        alert(`Failed to save draft: ${err.error}`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className={styles.editorContainer}>
      {/* Topbar */}
      <header className={styles.editorHeader}>
        <div className={styles.headerLeft}>
          <Link href="/admin" className={styles.backBtn}><ArrowLeft size={20} /></Link>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.saveBtn} onClick={handleSave} disabled={isSaving}>
            <Save size={18} /> {isSaving ? "Saving..." : "Save Draft"}
          </button>
        </div>
      </header>

      {/* Tiptap Minimalist Editor (Notion Style) */}
      <main className={styles.mainEditorArea}>
        <input 
          type="text" 
          placeholder="New Post Title..." 
          className={`${styles.titleInput} font-geek`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        {/* Formatting Toolbar */}
        <div className={styles.toolbar}>
          <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? styles.activeTool : ''}>
            <Bold size={16} />
          </button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? styles.activeTool : ''}>
            <Italic size={16} />
          </button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? styles.activeTool : ''}>
            <Heading2 size={16} />
          </button>
          <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? styles.activeTool : ''}>
            <List size={16} />
          </button>
          <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? styles.activeTool : ''}>
            <Quote size={16} />
          </button>
          
          <div className={styles.divider}></div>
          
          <label className={styles.toolBtn}>
            <input type="file" accept="image/*" style={{display: 'none'}} onChange={addImage} />
            <ImageIcon size={16} style={{ cursor: 'pointer' }} />
          </label>
          <button onClick={addYoutubeVideo} className={styles.toolBtn}>
            <YoutubeIcon size={16} />
          </button>
        </div>

        {/* Dynamic Editor Content */}
        <EditorContent editor={editor} />
      </main>
    </div>
  );
}
