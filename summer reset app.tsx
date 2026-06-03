<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="theme-color" content="#0a0a0a">
<title>Summer Reset</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@700;800&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
:root{--bg:#0a0a0a;--surface:#141414;--card:#1c1c1c;--border:rgba(255,255,255,0.07);--text:#f0f0f0;--muted:#6b6b6b;--faint:#2a2a2a;--green:#1D9E75;--green-dim:rgba(29,158,117,0.12);--amber:#EF9F27;--amber-dim:rgba(239,159,39,0.12);--purple:#7F77DD;--purple-dim:rgba(127,119,221,0.12);--coral:#D85A30}
html,body{background:var(--bg);color:var(--text);font-family:'DM Mono',monospace;font-size:14px;min-height:100vh;overscroll-behavior:none}
.app{max-width:420px;margin:0 auto;padding:0 0 80px}
.header{padding:52px 20px 24px;border-bottom:1px solid var(--border)}
.header-top{display:flex;justify-content:space-between;align-items:flex-start}
.app-label{font-size:10px;letter-spacing:0.2em;color:var(--muted);text-transform:uppercase;margin-bottom:6px}
.app-title{font-family:'Syne',sans-serif;font-size:32px;font-weight:800;line-height:1;color:var(--text)}
.app-title span{color:var(--green)}
.date-badge{font-size:11px;color:var(--muted);background:var(--faint);padding:6px 10px;border-radius:6px}
.progress-section{padding:24px 20px 0;display:flex;align-items:center;gap:20px}
.ring-wrap{position:relative;width:72px;height:72px;flex-shrink:0}
.ring-wrap svg{transform:rotate(-90deg)}
.ring-bg{fill:none;stroke:var(--faint);stroke-width:5}
.ring-fill{fill:none;stroke:var(--green);stroke-width:5;stroke-linecap:round;transition:stroke-dashoffset 0.5s ease}
.ring-text{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.ring-pct{font-family:'Syne',sans-serif;font-size:16px;font-weight:700;color:var(--text)}
.ring-sub{font-size:9px;color:var(--muted);margin-top:1px}
.progress-stats{flex:1}
.stat-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
.stat-label{font-size:11px;color:var(--muted)}
.stat-val{font-size:13px;font-weight:500;color:var(--text)}
.progress-bar{height:3px;background:var(--faint);border-radius:2px;overflow:hidden;margin-top:4px}
.progress-fill{height:100%;background:var(--green);border-radius:2px;transition:width 0.5s ease;width:0%}
.section{padding:28px 20px 0}
.section-header{display:flex;align-items:center;gap:8px;margin-bottom:12px}
.section-dot{width:6px;height:6px;border-radius:50%}
.dot-morning{background:var(--amber)}
.dot-day{background:var(--green)}
.dot-evening{background:var(--purple)}
.section-title{font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:var(--muted)}
.section-time{font-size:10px;color:var(--muted);margin-left:auto}
.habit-list{display:flex;flex-direction:column;gap:2px}
.habit{display:flex;align-items:center;gap:14px;background:var(--card);padding:14px 16px;border-radius:10px;cursor:pointer;transition:opacity 0.2s;border:1px solid var(--border);user-select:none}
.habit.done{opacity:0.45}
.habit.done .habit-name{text-decoration:line-through}
.check{width:22px;height:22px;border-radius:50%;border:1.5px solid var(--muted);flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:all 0.2s}
.check svg{display:none}
.habit.done .check{background:var(--green);border-color:var(--green)}
.habit.done .check svg{display:block}
.habit-info{flex:1;min-width:0}
.habit-name{font-size:13px;color:var(--text);line-height:1.4}
.habit-tag{display:inline-block;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;padding:2px 6px;border-radius:4px;margin-top:4px;font-weight:500}
.tag-sleep{background:var(--purple-dim);color:var(--purple)}
.tag-diet{background:var(--amber-dim);color:var(--amber)}
.tag-fitness{background:var(--green-dim);color:var(--green)}
.tag-mindset{color:#e07050;background:rgba(216,90,48,0.15)}
.timeline-section{padding:28px 20px 0}
.timeline-label{font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:var(--muted);margin-bottom:14px}
.phase-card{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:14px 16px;display:flex;gap:14px;align-items:flex-start;margin-bottom:8px}
.phase-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;margin-top:5px}
.phase-title{font-size:12px;font-weight:500;color:var(--text);margin-bottom:4px}
.phase-desc{font-size:11px;color:var(--muted);line-height:1.6}
.bottom-bar{position:fixed;bottom:0;left:0;right:0;background:var(--surface);border-top:1px solid var(--border);padding:12px 20px}
.bottom-inner{display:flex;width:100%;max-width:420px;margin:0 auto;justify-content:space-between;align-items:center}
.pillars{display:flex;gap:6px}
.pillar-pip{font-size:9px;letter-spacing:0.05em;text-transform:uppercase;padding:4px 8px;border-radius:20px;border:1px solid var(--border);color:var(--muted);transition:all 0.3s}
.pip-sleep.active{border-color:var(--purple);color:var(--purple);background:var(--purple-dim)}
.pip-diet.active{border-color:var(--amber);color:var(--amber);background:var(--amber-dim)}
.pip-fitness.active{border-color:var(--green);color:var(--green);background:var(--green-dim)}
.reset-btn{font-family:'DM Mono',monospace;font-size:11px;color:var(--muted);background:transparent;border:1px solid var(--border);padding:6px 12px;border-radius:6px;cursor:pointer}
.motivation{margin:24px 20px 0;padding:16px;background:var(--green-dim);border:1px solid rgba(29,158,117,0.2);border-radius:10px;display:none}
.motivation.show{display:block}
.motivation-text{font-size:12px;color:var(--green);line-height:1.6}
</style>
</head>
<body>
<div class="app">
  <div class="header">
    <div class="header-top">
      <div>
        <div class="app-label">Summer reset</div>
        <div class="app-title">Day <span>1</span></div>
      </div>
      <div class="date-badge" id="date-badge"></div>
    </div>
  </div>
  <div class="progress-section">
    <div class="ring-wrap">
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle class="ring-bg" cx="36" cy="36" r="30"/>
        <circle class="ring-fill" id="ring" cx="36" cy="36" r="30" stroke-dasharray="188.5" stroke-dashoffset="188.5"/>
      </svg>
      <div class="ring-text">
        <div class="ring-pct" id="ring-pct">0%</div>
        <div class="ring-sub">done</div>
      </div>
    </div>
    <div class="progress-stats">
      <div class="stat-row"><span class="stat-label">completed</span><span class="stat-val" id="stat-done">0 / 11</span></div>
      <div class="progress-bar"><div class="progress-fill" id="prog-fill"></div></div>
      <div class="stat-row" style="margin-top:10px"><span class="stat-label">back to school</span><span class="stat-val" id="stat-days"></span></div>
    </div>
  </div>
  <div class="motivation" id="motivation"><div class="motivation-text">Day complete. That's how it's done. Keep the same energy tomorrow.</div></div>
  <div class="section">
    <div class="section-header"><div class="section-dot dot-morning"></div><div class="section-title">Morning</div><div class="section-time">when you wake up</div></div>
    <div class="habit-list">
      <div class="habit" onclick="toggle(this)" data-tag="sleep"><div class="check"><svg width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 4L4.5 7.5L11 1" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="habit-info"><div class="habit-name">Wake up at a consistent time</div><span class="habit-tag tag-sleep">sleep</span></div></div>
      <div class="habit" onclick="toggle(this)" data-tag="diet"><div class="check"><svg width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 4L4.5 7.5L11 1" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="habit-info"><div class="habit-name">Full glass of water on wake-up</div><span class="habit-tag tag-diet">diet</span></div></div>
      <div class="habit" onclick="toggle(this)" data-tag="diet"><div class="check"><svg width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 4L4.5 7.5L11 1" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="habit-info"><div class="habit-name">Eat your first meal</div><span class="habit-tag tag-diet">diet</span></div></div>
      <div class="habit" onclick="toggle(this)" data-tag="mindset"><div class="check"><svg width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 4L4.5 7.5L11 1" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="habit-info"><div class="habit-name">No phone for first 20 min</div><span class="habit-tag tag-mindset">mindset</span></div></div>
    </div>
  </div>
  <div class="section">
    <div class="section-header"><div class="section-dot dot-day"></div><div class="section-title">During the day</div></div>
    <div class="habit-list">
      <div class="habit" onclick="toggle(this)" data-tag="fitness"><div class="check"><svg width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 4L4.5 7.5L11 1" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="habit-info"><div class="habit-name">Work out (any form, 30+ min)</div><span class="habit-tag tag-fitness">fitness</span></div></div>
      <div class="habit" onclick="toggle(this)" data-tag="mindset"><div class="check"><svg width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 4L4.5 7.5L11 1" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="habit-info"><div class="habit-name">Get outside / sunlight</div><span class="habit-tag tag-mindset">mindset</span></div></div>
      <div class="habit" onclick="toggle(this)" data-tag="mindset"><div class="check"><svg width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 4L4.5 7.5L11 1" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="habit-info"><div class="habit-name">Off social media 2+ hours</div><span class="habit-tag tag-mindset">mindset</span></div></div>
      <div class="habit" onclick="toggle(this)" data-tag="diet"><div class="check"><svg width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 4L4.5 7.5L11 1" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="habit-info"><div class="habit-name">Stay hydrated all day</div><span class="habit-tag tag-diet">diet</span></div></div>
    </div>
  </div>
  <div class="section">
    <div class="section-header"><div class="section-dot dot-evening"></div><div class="section-title">Evening</div><div class="section-time">wind down</div></div>
    <div class="habit-list">
      <div class="habit" onclick="toggle(this)" data-tag="diet"><div class="check"><svg width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 4L4.5 7.5L11 1" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="habit-info"><div class="habit-name">Eat dinner before 9pm</div><span class="habit-tag tag-diet">diet</span></div></div>
      <div class="habit" onclick="toggle(this)" data-tag="sleep"><div class="check"><svg width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 4L4.5 7.5L11 1" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="habit-info"><div class="habit-name">Wind down by midnight (screen off)</div><span class="habit-tag tag-sleep">sleep</span></div></div>
      <div class="habit" onclick="toggle(this)" data-tag="sleep"><div class="check"><svg width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M1 4L4.5 7.5L11 1" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="habit-info"><div class="habit-name">In bed by 1am</div><span class="habit-tag tag-sleep">sleep</span></div></div>
    </div>
  </div>
  <div class="timeline-section">
    <div class="timeline-label">10-week game plan</div>
    <div class="phase-card"><div class="phase-dot" style="background:#1D9E75"></div><div><div class="phase-title">Weeks 1–2 · Reset</div><div class="phase-desc">Lock in the rhythm. Same wake time daily, both meals hit, in bed by 1am.</div></div></div>
    <div class="phase-card"><div class="phase-dot" style="background:#EF9F27"></div><div><div class="phase-title">Weeks 3–7 · Build</div><div class="phase-desc">Level up workouts, make meals more intentional. Add protein, reduce junk.</div></div></div>
    <div class="phase-card"><div class="phase-dot" style="background:#7F77DD"></div><div><div class="phase-title">Weeks 8–10 · Sharpen</div><div class="phase-desc">Shift wake time earlier to prep for school. Arrive ready, not adjusting.</div></div></div>
  </div>
  <div style="height:28px"></div>
</div>
<div class="bottom-bar">
  <div class="bottom-inner">
    <div class="pillars">
      <div class="pillar-pip pip-sleep" id="pip-sleep">sleep</div>
      <div class="pillar-pip pip-diet" id="pip-diet">diet</div>
      <div class="pillar-pip pip-fitness" id="pip-fitness">fitness</div>
    </div>
    <button class="reset-btn" onclick="resetAll()">reset day</button>
  </div>
</div>
<script>
const TOTAL=11;
const KEY='summer_reset_'+new Date().toDateString();
document.getElementById('date-badge').textContent=new Date().toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'});
const target=new Date('2025-08-15');
const diff=Math.ceil((target-new Date())/(1000*60*60*24));
document.getElementById('stat-days').textContent=diff>0?diff+' days':'Soon!';
function updateUI(){
  const habits=document.querySelectorAll('.habit');
  const done=document.querySelectorAll('.habit.done').length;
  const pct=Math.round(done/TOTAL*100);
  document.getElementById('ring').style.strokeDashoffset=188.5-(188.5*pct/100);
  document.getElementById('ring-pct').textContent=pct+'%';
  document.getElementById('stat-done').textContent=done+' / '+TOTAL;
  document.getElementById('prog-fill').style.width=pct+'%';
  document.getElementById('motivation').className='motivation'+(done===TOTAL?' show':'');
  ['sleep','diet','fitness'].forEach(tag=>{
    const all=document.querySelectorAll('.habit[data-tag="'+tag+'"]').length;
    const d=document.querySelectorAll('.habit.done[data-tag="'+tag+'"]').length;
    document.getElementById('pip-'+tag).className='pillar-pip pip-'+tag+(d===all&&all>0?' active':'');
  });
  const doneIds=[];
  habits.forEach((h,i)=>{if(h.classList.contains('done'))doneIds.push(i);});
  try{localStorage.setItem(KEY,JSON.stringify(doneIds));}catch(e){}
}
function toggle(el){el.classList.toggle('done');updateUI();}
function resetAll(){document.querySelectorAll('.habit').forEach(h=>h.classList.remove('done'));updateUI();}
try{
  const saved=JSON.parse(localStorage.getItem(KEY)||'[]');
  const habits=document.querySelectorAll('.habit');
  saved.forEach(i=>{if(habits[i])habits[i].classList.add('done');});
}catch(e){}
updateUI();
</script>
</body>
</html>
