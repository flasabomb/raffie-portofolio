"use client";

import { useEffect, useState } from "react";
import { Save, Loader2, RefreshCcw } from "lucide-react";
import TopBar from "@/components/admin/TopBar";

// Sample Pre-defined Templates
const templates = {
  "Dark Modern": {
    template: "Dark Modern",
    font_heading: "Barlow Condensed",
    font_body: "DM Sans",
    color_base: "#0D0D0D",
    color_surface: "#1a1a1a",
    color_elevated: "#262626",
    color_accent: "#facc15",
    color_accent_dark: "#eab308",
    color_muted: "#a3a3a3",
    color_border: "#333333",
    color_text: "#ffffff"
  },
  "Light Minimalist": {
    template: "Light Minimalist",
    font_heading: "Inter",
    font_body: "Inter",
    color_base: "#F9FAFB",
    color_surface: "#FFFFFF",
    color_elevated: "#F3F4F6",
    color_accent: "#2563EB",
    color_accent_dark: "#1D4ED8",
    color_muted: "#6B7280",
    color_border: "#E5E7EB",
    color_text: "#111827"
  },
  "Cyberpunk": {
    template: "Cyberpunk",
    font_heading: "Orbitron",
    font_body: "Roboto",
    color_base: "#0B0B1A",
    color_surface: "#101026",
    color_elevated: "#181836",
    color_accent: "#FDE047",
    color_accent_dark: "#D97706",
    color_muted: "#9CA3AF",
    color_border: "#6D28D9",
    color_text: "#F3F4F6"
  },
  "Soft Elegance": {
    template: "Soft Elegance",
    font_heading: "Playfair Display",
    font_body: "Lato",
    color_base: "#FAF5F0",
    color_surface: "#FFFFFF",
    color_elevated: "#F3EBE1",
    color_accent: "#D4A373",
    color_accent_dark: "#B5835A",
    color_muted: "#9CA3AF",
    color_border: "#E7D8C9",
    color_text: "#4A4A4A"
  }
};

const fontOptions = [
  "Barlow Condensed", "DM Sans", "Inter", "Playfair Display", 
  "Roboto", "Orbitron", "Lato", "Space Grotesk", "Outfit", "Lora"
];

const sectionIds = ["hero", "about", "projects", "skills", "contact"];

export default function ThemeEditorPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [globalTheme, setGlobalTheme] = useState(templates["Dark Modern"]);
  const [sectionsTheme, setSectionsTheme] = useState(
    sectionIds.map(id => ({ section_id: id, is_custom: false, color_base: "", color_text: "", color_accent: "" }))
  );

  useEffect(() => {
    fetch("/api/theme")
      .then(res => res.json())
      .then(data => {
        if (data.globalTheme) setGlobalTheme(data.globalTheme);
        if (data.sectionsTheme && data.sectionsTheme.length > 0) {
          // Merge with default section Ids
          const merged = sectionIds.map(id => {
            const found = data.sectionsTheme.find((s: { section_id: string, [key: string]: unknown }) => s.section_id === id);
            return found || { section_id: id, is_custom: false, color_base: "", color_text: "", color_accent: "" };
          });
          setSectionsTheme(merged);
        }
        setLoading(false);
      });
  }, []);

  const handleGlobalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGlobalTheme(prev => ({ ...prev, [name]: value }));
  };

  const applyTemplate = (templateName: keyof typeof templates) => {
    setGlobalTheme(templates[templateName]);
  };

  const handleSectionChange = (sectionId: string, field: string, value: string | boolean) => {
    setSectionsTheme(prev => 
      prev.map(sec => sec.section_id === sectionId ? { ...sec, [field]: value } : sec)
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ globalTheme, sectionsTheme })
      });
      if (!res.ok) throw new Error("Failed to save");
      alert("Theme updated successfully! Refresh your public site to see changes.");
    } catch (error) {
      console.error(error);
      alert("Error saving theme.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-surface">
      <TopBar title="Theme & Styling" />
      <div className="flex-1 overflow-auto p-4 md:p-8">
        <form onSubmit={handleSave} className="mx-auto max-w-4xl space-y-8 pb-20">
          
          {/* Templates Section */}
          <div className="rounded-xl border border-border bg-base p-6 shadow-xl">
            <h2 className="mb-4 font-heading text-2xl text-[var(--text-primary)]">Preset Templates</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {Object.keys(templates).map((key) => {
                const isSelected = globalTheme.template === key;
                return (
                  <button
                    type="button"
                    key={key}
                    onClick={() => applyTemplate(key as keyof typeof templates)}
                    className={`flex flex-col items-center justify-center rounded-lg border-2 p-4 transition-all ${
                      isSelected ? "border-accent bg-accent/10" : "border-border hover:border-accent/50 bg-surface"
                    }`}
                  >
                    <span className={`text-sm font-semibold ${isSelected ? "text-accent" : "text-[var(--text-primary)]"}`}>{key}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Typography */}
            <div className="rounded-xl border border-border bg-base p-6 shadow-xl">
               <h2 className="mb-4 font-heading text-2xl text-[var(--text-primary)]">Typography</h2>
               <div className="space-y-4">
                 <div>
                    <label className="mb-1 block text-sm text-muted">Heading Font</label>
                    <select 
                      name="font_heading" 
                      value={globalTheme.font_heading} 
                      onChange={handleGlobalChange}
                      className="w-full rounded-lg bg-[#1A1A1A] border border-[#333333] px-3 py-2 text-[var(--text-primary)] outline-none focus:border-accent"
                    >
                      {fontOptions.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                 </div>
                 <div>
                    <label className="mb-1 block text-sm text-muted">Body Font</label>
                    <select 
                      name="font_body" 
                      value={globalTheme.font_body} 
                      onChange={handleGlobalChange}
                      className="w-full rounded-lg bg-[#1A1A1A] border border-[#333333] px-3 py-2 text-[var(--text-primary)] outline-none focus:border-accent"
                    >
                      {fontOptions.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                 </div>
               </div>
            </div>

            {/* Global Colors */}
            <div className="rounded-xl border border-border bg-base p-6 shadow-xl">
               <h2 className="mb-4 font-heading text-2xl text-[var(--text-primary)]">Global Colors</h2>
               <div className="grid grid-cols-2 gap-4">
                 {['color_base', 'color_surface', 'color_elevated', 'color_accent', 'color_text', 'color_muted'].map(colorKey => (
                   <div key={colorKey}>
                      <label className="mb-1 block text-xs text-muted">{colorKey.replace('color_', '').toUpperCase()}</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          name={colorKey}
                          value={(globalTheme as Record<string, string>)[colorKey]}
                          onChange={handleGlobalChange}
                          className="h-8 w-8 cursor-pointer rounded border border-[#333333] bg-transparent"
                        />
                        <input
                          type="text"
                          name={colorKey}
                          value={(globalTheme as Record<string, string>)[colorKey]}
                          onChange={handleGlobalChange}
                          className="w-full rounded bg-[#1A1A1A] border border-[#333333] px-2 py-1 text-sm text-[var(--text-primary)] outline-none uppercase font-mono"
                        />
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Section Overrides */}
          <div className="rounded-xl border border-border bg-base p-6 shadow-xl">
            <h2 className="mb-4 font-heading text-2xl text-[var(--text-primary)]">Custom Section Themes (Overrides)</h2>
            <p className="text-sm text-muted mb-4">Enable this to give a specific section distinct colors from the global theme.</p>
            
            <div className="space-y-4">
              {sectionsTheme.map((sec) => (
                <div key={sec.section_id} className="rounded-lg border border-[#333333] bg-[#1A1A1A] p-4">
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="font-bold text-[var(--text-primary)] capitalize">{sec.section_id} Section</h3>
                     <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={sec.is_custom} 
                          onChange={(e) => handleSectionChange(sec.section_id, 'is_custom', e.target.checked)}
                          className="accent-[#FF5C1A]"
                        />
                        <span className="text-sm text-muted">Enable Override</span>
                     </label>
                  </div>
                  
                  {sec.is_custom && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-[#333333] pt-4 mt-2">
                       <div>
                          <label className="mb-1 block text-xs text-muted">BACKGROUND COLOR</label>
                          <div className="flex gap-2">
                            <input type="color" value={sec.color_base || globalTheme.color_base} onChange={(e) => handleSectionChange(sec.section_id, 'color_base', e.target.value)} className="h-8 w-8 cursor-pointer bg-transparent"/>
                            <input type="text" value={sec.color_base || globalTheme.color_base} onChange={(e) => handleSectionChange(sec.section_id, 'color_base', e.target.value)} className="w-full rounded bg-[#262626] px-2 py-1 text-sm text-[var(--text-primary)]"/>
                          </div>
                       </div>
                       <div>
                          <label className="mb-1 block text-xs text-muted">TEXT COLOR</label>
                          <div className="flex gap-2">
                            <input type="color" value={sec.color_text || globalTheme.color_text} onChange={(e) => handleSectionChange(sec.section_id, 'color_text', e.target.value)} className="h-8 w-8 cursor-pointer bg-transparent"/>
                            <input type="text" value={sec.color_text || globalTheme.color_text} onChange={(e) => handleSectionChange(sec.section_id, 'color_text', e.target.value)} className="w-full rounded bg-[#262626] px-2 py-1 text-sm text-[var(--text-primary)]"/>
                          </div>
                       </div>
                       <div>
                          <label className="mb-1 block text-xs text-muted">ACCENT COLOR</label>
                          <div className="flex gap-2">
                            <input type="color" value={sec.color_accent || globalTheme.color_accent} onChange={(e) => handleSectionChange(sec.section_id, 'color_accent', e.target.value)} className="h-8 w-8 cursor-pointer bg-transparent"/>
                            <input type="text" value={sec.color_accent || globalTheme.color_accent} onChange={(e) => handleSectionChange(sec.section_id, 'color_accent', e.target.value)} className="w-full rounded bg-[#262626] px-2 py-1 text-sm text-[var(--text-primary)]"/>
                          </div>
                       </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 rounded-xl border border-[#333333] px-6 py-3 font-semibold text-[var(--text-primary)] transition hover:bg-[#2A2A2A]"
            >
              <RefreshCcw size={18} /> Revert
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-[var(--text-primary)] transition hover:bg-[var(--accent-dark)] disabled:opacity-50"
            >
              {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              {saving ? "Saving..." : "Save Theme Preferences"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
