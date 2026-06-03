
import { useState, useEffect } from "react";

const HABITS = [
  { id: 0, name: "Wake up at a consistent time", tag: "sleep", section: "morning" },
  { id: 1, name: "Full glass of water on wake-up", tag: "diet", section: "morning" },
  { id: 2, name: "Eat your first meal", tag: "diet", section: "morning" },
  { id: 3, name: "No phone for first 20 min", tag: "mindset", section: "morning" },
  { id: 4, name: "Work out (any form, 30+ min)", tag: "fitness", section: "day" },
  { id: 5, name: "Get outside / sunlight", tag: "mindset", section: "day" },
  { id: 6, name: "Off social media 2+ hours", tag: "mindset", section: "day" },
  { id: 7, name: "Stay hydrated all day", tag: "diet", section: "day" },
  { id: 8, name: "Eat dinner before 9pm", tag: "diet", section: "evening" },
  { id: 9, name: "Wind down by midnight (screen off)", tag: "sleep", section: "evening" },
  { id: 10, name: "In bed by 1am", tag: "sleep", section: "evening" },
];

const PHASES = [
  { color: "#1D9E75", title: "Weeks 1–2 · Reset", desc: "Lock in the rhythm. Same wake time daily, both meals hit, in bed by 1am." },
  { color: "#EF9F27", title: "Weeks 3–7 · Build", desc: "Level up workouts, make meals more intentional. Add protein, reduce junk." },
  { color: "#7F77DD", title: "Weeks 8–10 · Sharpen", desc: "Shift wake time earlier to prep for school. Arrive ready, not adjusting." },
];

const TAG_STYLES = {
  sleep:    { bg: "rgba(127,119,221,0.15)", color: "#9490e8" },
  diet:     { bg: "rgba(239,159,39,0.15)",  color: "#EF9F27" },
  fitness:  { bg: "rgba(29,158,117,0.15)",  color: "#1D9E75" },
  mindset:  { bg: "rgba(216,90,48,0.15)",   color: "#e07050" },
};

const SECTION_META = {
  morning: { label: "Morning", sub: "when you wake up", dot: "#EF9F27" },
  day:     { label: "During the day", sub: "", dot: "#1D9E75" },
  evening: { label: "Evening", sub: "wind down", dot: "#7F77DD" },
};

function getDaysUntil() {
  const target = new Date("2025-08-15");
  const now = new Date();
  const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  return diff > 0 ? `${diff} days` : "Soon!";
}

function getDateStr() {
  return new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function getTodayKey() {
  return "summer_reset_" + new Date().toDateString();
}

export default function App() {
  const [done, setDone] = useState(() => {
    try {
      const saved = localStorage.getItem(getTodayKey());
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch { return new Set(); }
  });

  useEffect(() => {
    try {
      localStorage.setItem(getTodayKey(), JSON.stringify([...done]));
    } catch {}
  }, [done]);

  function toggle(id) {
    setDone(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function reset() { setDone(new Set()); }

  const total = HABITS.length;
  const doneCount = done.size;
  const pct = Math.round((doneCount / total) * 100);
  const circ = 188.5;
  const offset = circ - (circ * pct / 100);

  const sections = ["morning", "day", "evening"];

  const pillars = ["sleep", "diet", "fitness"].map(tag => {
    const tagHabits = HABITS.filter(h => h.tag === tag);
    const allDone = tagHabits.every(h => done.has(h.id));
    return { tag, allDone };
  });

  const styles = {
    app: { background: "#0a0a0a", minHeight: "100vh", color: "#f0f0f0", fontFamily: "'DM Mono', monospace", fontSize: 14, maxWidth: 420, margin: "0 auto", paddingBottom: 80 },
    header: { padding: "52px 20px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)" },
    headerTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
    appLabel: { fontSize: 10, letterSpacing: "0.2em", color: "#6b6b6b", textTransform: "uppercase", marginBottom: 6 },
    appTitle: { fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, lineHeight: 1, color: "#f0f0f0" },
    dateBadge: { fontSize: 11, color: "#6b6b6b", background: "#2a2a2a", padding: "6px 10px", borderRadius: 6 },
    progressSection: { padding: "24px 20px 0", display: "flex", alignItems: "center", gap: 20 },
    ringWrap: { position: "relative", width: 72, height: 72, flexShrink: 0 },
    ringText: { position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" },
    ringPct: { fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "#f0f0f0" },
    ringSub: { fontSize: 9, color: "#6b6b6b", marginTop: 1 },
    progressStats: { flex: 1 },
    statRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
    statLabel: { fontSize: 11, color: "#6b6b6b" },
    statVal: { fontSize: 13, fontWeight: 500, color: "#f0f0f0" },
    progressBarBg: { height: 3, background: "#2a2a2a", borderRadius: 2, overflow: "hidden", marginTop: 4 },
    progressFill: { height: "100%", background: "#1D9E75", borderRadius: 2, width: pct + "%", transition: "width 0.5s ease" },
    section: { padding: "28px 20px 0" },
    sectionHeader: { display: "flex", alignItems: "center", gap: 8, marginBottom: 12 },
    sectionTitle: { fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6b6b6b" },
    sectionTime: { fontSize: 10, color: "#6b6b6b", marginLeft: "auto" },
    habitList: { display: "flex", flexDirection: "column", gap: 2 },
    habit: (isDone) => ({
      display: "flex", alignItems: "center", gap: 14,
      background: "#1c1c1c", padding: "14px 16px", borderRadius: 10,
      cursor: "pointer", border: "1px solid rgba(255,255,255,0.07)",
      opacity: isDone ? 0.45 : 1, transition: "opacity 0.2s",
      userSelect: "none", WebkitTapHighlightColor: "transparent",
    }),
    check: (isDone) => ({
      width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
      border: isDone ? "none" : "1.5px solid #6b6b6b",
      background: isDone ? "#1D9E75" : "transparent",
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "all 0.2s",
    }),
    habitName: (isDone) => ({ fontSize: 13, color: "#f0f0f0", lineHeight: 1.4, textDecoration: isDone ? "line-through" : "none" }),
    habitTag: (tag) => ({ display: "inline-block", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 6px", borderRadius: 4, marginTop: 4, fontWeight: 500, background: TAG_STYLES[tag].bg, color: TAG_STYLES[tag].color }),
    timelineSection: { padding: "28px 20px 0" },
    timelineLabel: { fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6b6b6b", marginBottom: 14 },
    phaseCard: { background: "#1c1c1c", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "14px 16px", display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 8 },
    phaseTitle: { fontSize: 12, fontWeight: 500, color: "#f0f0f0", marginBottom: 4 },
    phaseDesc: { fontSize: 11, color: "#6b6b6b", lineHeight: 1.6 },
    bottomBar: { position: "fixed", bottom: 0, left: 0, right: 0, background: "#141414", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" },
    bottomInner: { display: "flex", width: "100%", maxWidth: 420, margin: "0 auto", justifyContent: "space-between", alignItems: "center" },
    pillarsRow: { display: "flex", gap: 6 },
    pip: (tag, allDone) => ({
      fontSize: 9, letterSpacing: "0.05em", textTransform: "uppercase",
      padding: "4px 8px", borderRadius: 20,
      border: allDone ? `1px solid ${TAG_STYLES[tag].color}` : "1px solid rgba(255,255,255,0.07)",
      color: allDone ? TAG_STYLES[tag].color : "#6b6b6b",
      background: allDone ? TAG_STYLES[tag].bg : "transparent",
      transition: "all 0.3s",
    }),
    resetBtn: { fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#6b6b6b", background: "transparent", border: "1px solid rgba(255,255,255,0.07)", padding: "6px 12px", borderRadius: 6, cursor: "pointer" },
    motivation: { margin: "24px 20px 0", padding: 16, background: "rgba(29,158,117,0.12)", border: "1px solid rgba(29,158,117,0.2)", borderRadius: 10 },
    motivationText: { fontSize: 12, color: "#1D9E75", lineHeight: 1.6 },
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } body { background: #0a0a0a; }`}</style>

      <div style={styles.app}>
        <div style={styles.header}>
          <div style={styles.headerTop}>
            <div>
              <div style={styles.appLabel}>Summer reset</div>
              <div style={styles.appTitle}>Day <span style={{ color: "#1D9E75" }}>1</span></div>
            </div>
            <div style={styles.dateBadge}>{getDateStr()}</div>
          </div>
        </div>

        <div style={styles.progressSection}>
          <div style={styles.ringWrap}>
            <svg width="72" height="72" viewBox="0 0 72 72" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="36" cy="36" r="30" fill="none" stroke="#2a2a2a" strokeWidth="5" />
              <circle cx="36" cy="36" r="30" fill="none" stroke="#1D9E75" strokeWidth="5" strokeLinecap="round"
                strokeDasharray={circ} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 0.5s ease" }} />
            </svg>
            <div style={styles.ringText}>
              <div style={styles.ringPct}>{pct}%</div>
              <div style={styles.ringSub}>done</div>
            </div>
          </div>
          <div style={styles.progressStats}>
            <div style={styles.statRow}>
              <span style={styles.statLabel}>completed</span>
              <span style={styles.statVal}>{doneCount} / {total}</span>
            </div>
            <div style={styles.progressBarBg}><div style={styles.progressFill} /></div>
            <div style={{ ...styles.statRow, marginTop: 10 }}>
              <span style={styles.statLabel}>back to school</span>
              <span style={styles.statVal}>{getDaysUntil()}</span>
            </div>
          </div>
        </div>

        {doneCount === total && (
          <div style={styles.motivation}>
            <div style={styles.motivationText}>Day complete. That's how it's done. Keep the same energy tomorrow.</div>
          </div>
        )}

        {sections.map(sec => {
          const meta = SECTION_META[sec];
          const habits = HABITS.filter(h => h.section === sec);
          return (
            <div key={sec} style={styles.section}>
              <div style={styles.sectionHeader}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: meta.dot }} />
                <div style={styles.sectionTitle}>{meta.label}</div>
                {meta.sub && <div style={styles.sectionTime}>{meta.sub}</div>}
              </div>
              <div style={styles.habitList}>
                {habits.map(h => {
                  const isDone = done.has(h.id);
                  return (
                    <div key={h.id} style={styles.habit(isDone)} onClick={() => toggle(h.id)}>
                      <div style={styles.check(isDone)}>
                        {isDone && (
                          <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                            <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div style={styles.habitName(isDone)}>{h.name}</div>
                        <span style={styles.habitTag(h.tag)}>{h.tag}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div style={styles.timelineSection}>
          <div style={styles.timelineLabel}>10-week game plan</div>
          {PHASES.map((p, i) => (
            <div key={i} style={styles.phaseCard}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, flexShrink: 0, marginTop: 5 }} />
              <div>
                <div style={styles.phaseTitle}>{p.title}</div>
                <div style={styles.phaseDesc}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: 28 }} />
      </div>

      <div style={styles.bottomBar}>
        <div style={styles.bottomInner}>
          <div style={styles.pillarsRow}>
            {pillars.map(({ tag, allDone }) => (
              <div key={tag} style={styles.pip(tag, allDone)}>{tag}</div>
            ))}
          </div>
          <button style={styles.resetBtn} onClick={reset}>reset day</button>
        </div>
      </div>
    </>
  );
}
