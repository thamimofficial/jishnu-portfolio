import { useEffect, useRef, useState } from "react";

// Drop your own files in /public/assets/videos and /public/assets/posters, then edit this list.
const PROJECTS = [
  { title: "Midnight Drive", category: "Car Videos",vertical: true, video: "/assets/videos/project-1.mp4", poster: "/assets/posters/project-1.jpg" },
  { title: "Desert Run", category: "Car Videos",vertical: true, video: "/assets/videos/project-2.mp4", poster: "/assets/posters/project-2.jpg" },
  { title: "Street Reel", category: "Reels", vertical: true, video: "/assets/videos/project-3.mp4", poster: "/assets/posters/project-3.jpg" },
  { title: "Launch Spot", category: "Ad Creatives", vertical: true,video: "/assets/videos/project-4.mp4", poster: "/assets/posters/project-4.jpg" },
  { title: "Skyline Campaign", category: "Brand Campaigns", vertical: true, video: "/assets/videos/project-5.mp4", poster: "/assets/posters/project-5.jpg" },
  { title: "Chrome Edition", category: "Reels", vertical: true, video: "/assets/videos/project-6.mp4", poster: "/assets/posters/project-6.jpg" },
];
const CATS = ["All", "Car Videos", "Reels", "Ad Creatives", "Brand Campaigns"];

/* Local assets expected in /public/assets/ :
   hero-left.jpg, hero-right.jpg (or .mp4 with same names), logo.svg (optional) */

const NAV = [
  ["About", "about"], ["Services", "services"], ["Work", "work"],
  ["Process", "process"], ["Why Us", "why"], ["Packs", "packs"],
];

const STATS = [
  { value: 19.9, suffix: "M+", label: "Total views", dec: 1 },
  { value: 2.4, suffix: "M", label: "Likes", dec: 1 },
  { value: 183, suffix: "K", label: "Saves", dec: 0 },
  { value: 432, suffix: "K", label: "Shares", dec: 0 },
];

const CONTACT = {
  whatsapp: "971507286515",        // country code + number, digits only, no + or spaces
  phoneDisplay: "+971 50 728 6515",
  email: "hello@yourdomain.com",
  instagram: "https://www.instagram.com/jishnu_visuals/",
  instagramHandle: "@yourhandle",
  location: "Dubai, UAE",
};

const SERVICES = [
  ["Cinematic Car Videos", "Rolling shots, detail passes and grade-ready edits built for automotive launches."],
  ["Social Media Reels", "Vertical-first stories cut for retention on Instagram, TikTok and YouTube Shorts."],
  ["Paid Ad Creatives", "Hook-driven ad variants designed and tested for conversion, not just looks."],
  ["Brand Campaigns", "Concept, shoot and rollout for luxury and lifestyle brands across platforms."],
  ["Photography", "Editorial product, vehicle and lifestyle stills with a consistent visual signature."],
  ["Content Strategy", "Monthly content plans that turn one shoot into a full multi-platform calendar."],
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Michroma&family=Outfit:wght@300;400;500;600&display=swap');
:root{--bg:#0D0D0D;--fg:#fff;--mut:#a3a3a3;--acc:#FF6600;--line:#262626;
--head:'Michroma','Arial Black',sans-serif;--body:'Outfit',system-ui,sans-serif}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;scroll-padding-top:72px}
body{background:var(--bg);color:var(--fg);font-family:var(--body);line-height:1.6;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
:focus-visible{outline:2px solid var(--acc);outline-offset:3px}
h1,h2,h3{font-family:var(--head);text-transform:uppercase;font-weight:400;line-height:1.15;letter-spacing:.02em}
.wrap{max-width:1200px;margin:0 auto;padding:0 24px}
.btn{display:inline-block;font:600 .8rem var(--body);letter-spacing:.16em;text-transform:uppercase;padding:16px 30px;border:1px solid var(--acc);cursor:pointer;transition:background .2s,color .2s,transform .2s}
.btn.solid{background:var(--acc);color:#000}
.btn.solid:hover{background:#fff;border-color:#fff}
.btn.ghost{background:transparent;color:#fff;border-color:#fff}
.btn.ghost:hover{border-color:var(--acc);color:var(--acc)}
.btn.sm{padding:11px 20px;font-size:.72rem}

.aboutgrid{display:grid;grid-template-columns:380px 1fr;gap:72px;align-items:center}
.photo{position:relative;aspect-ratio:4/5;border:1px solid var(--line);background:#141414}
.photo::after{content:"";position:absolute;inset:16px -16px -16px 16px;border:1px solid var(--acc);z-index:-1}
.photo img{width:100%;height:100%;object-fit:cover;display:block}
.about h2{font-size:clamp(1.5rem,3.4vw,2.5rem);margin-bottom:24px}
.about p{color:var(--mut);font-weight:300;max-width:560px;margin-bottom:16px}
.about .cta{justify-content:flex-start;margin-top:28px}
@media(max-width:800px){.aboutgrid{grid-template-columns:1fr;gap:48px}.photo{max-width:340px}}

.nav{position:fixed;inset:0 0 auto 0;z-index:50;background:rgba(13,13,13,.82);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}
.nav .wrap{display:flex;align-items:center;justify-content:space-between;height:72px}
.logo{font-family:var(--head);font-size:.95rem;letter-spacing:.12em;display:flex;align-items:center;gap:10px}
.logo i{width:10px;height:10px;background:var(--acc);display:inline-block}
.links{display:flex;gap:30px}
.links a{font-size:.85rem;color:var(--mut);transition:color .2s}
.links a:hover{color:var(--acc)}
@media(max-width:960px){.links{display:none}}

.hero{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden;padding:120px 0 80px}
.split{position:absolute;inset:0;display:grid;grid-template-columns:1fr 1fr}
.split div{background:#1a1a1a center/cover no-repeat}
.split div:first-child{background-image:url('/assets/hero-left.jpg')}
.split div:last-child{background-image:url('/assets/hero-right.jpg');border-left:1px solid rgba(255,102,0,.5)}
.hero::before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,rgba(13,13,13,.55) 0%,rgba(13,13,13,.78) 60%,var(--bg) 100%)}
.hero .wrap{position:relative;z-index:2;max-width:940px}
.tag{color:var(--acc);font-size:.85rem;letter-spacing:.22em;text-transform:uppercase;font-weight:500;margin-bottom:26px}
.hero h1{font-size:clamp(1.9rem,5.2vw,4rem);margin-bottom:28px}
.hero p{max-width:640px;margin:0 auto 40px;color:#d4d4d4;font-size:1.08rem;font-weight:300}
.cta{display:flex;gap:16px;justify-content:center;flex-wrap:wrap}
.hero .wrap>*{animation:rise .8s both}
.hero .wrap>*:nth-child(2){animation-delay:.12s}.hero .wrap>*:nth-child(3){animation-delay:.24s}.hero .wrap>*:nth-child(4){animation-delay:.36s}
@keyframes rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
@media(prefers-reduced-motion:reduce){*{animation:none!important;scroll-behavior:auto!important}}
@media(max-width:700px){.split{grid-template-columns:1fr}.split div:last-child{display:none}}

.stats{border-block:1px solid var(--line)}
.stats .wrap{display:grid;grid-template-columns:repeat(4,1fr)}
.stat{padding:56px 20px;text-align:center;border-right:1px solid var(--line)}
.stat:last-child{border-right:0}
.stat b{display:block;font-family:var(--head);font-weight:400;font-size:clamp(1.6rem,3.6vw,2.8rem);color:#fff}
.stat span{display:block;margin-top:10px;color:var(--mut);font-size:.78rem;letter-spacing:.18em;text-transform:uppercase}
@media(max-width:700px){.stats .wrap{grid-template-columns:1fr 1fr}.stat:nth-child(2){border-right:0}.stat:nth-child(-n+2){border-bottom:1px solid var(--line)}}

section.block{padding:120px 0}
.head{margin-bottom:56px;max-width:640px}
.head h2{font-size:clamp(1.5rem,3.4vw,2.5rem);margin-bottom:16px}
.head p{color:var(--mut);font-weight:300}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);border:1px solid var(--line)}
.card{background:var(--bg);padding:40px 32px 44px;transition:background .25s}
.card:hover{background:#161616}
.card small{font-family:var(--head);font-size:.8rem;color:var(--acc)}
.card h3{font-size:1rem;margin:36px 0 14px}
.card p{color:var(--mut);font-size:.95rem;font-weight:300}
.card:hover h3{color:var(--acc)}
@media(max-width:900px){.grid{grid-template-columns:1fr 1fr}}
@media(max-width:600px){.grid{grid-template-columns:1fr}}

.contact{border-top:1px solid var(--line)}
form{display:grid;grid-template-columns:1fr 1fr;gap:18px;max-width:820px}
form .full{grid-column:1/-1}
label{display:block;font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;color:var(--mut);margin-bottom:8px}
input,select,textarea{width:100%;background:#141414;border:1px solid var(--line);color:#fff;padding:14px 16px;font:400 1rem var(--body);border-radius:0;transition:border-color .2s}
input:focus,select:focus,textarea:focus{outline:none;border-color:var(--acc)}
textarea{min-height:130px;resize:vertical}
.err{color:#ff8a4d;font-size:.8rem;margin-top:6px}
@media(max-width:600px){form{grid-template-columns:1fr}}

.toast{position:fixed;right:24px;bottom:24px;z-index:100;background:#141414;border:1px solid var(--acc);border-left-width:4px;padding:18px 22px;max-width:340px;box-shadow:0 20px 60px rgba(0,0,0,.6);animation:rise .4s both}
.toast b{display:block;font-family:var(--head);font-weight:400;font-size:.8rem;text-transform:uppercase;color:var(--acc);margin-bottom:6px}
.toast p{font-size:.9rem;color:#d4d4d4}
.hero{background:#0D0D0D url('/assets/hero-poster.jpg') center/cover no-repeat}
.bgvid{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
@media(prefers-reduced-motion:reduce){.bgvid{display:none}}
.pp{position:absolute;right:24px;bottom:24px;z-index:3;width:44px;height:44px;background:rgba(13,13,13,.7);border:1px solid #fff;color:#fff;cursor:pointer;font-size:.8rem;transition:border-color .2s,color .2s}
.pp:hover{border-color:var(--acc);color:var(--acc)}
.filters{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:36px}
.filters button{background:transparent;color:var(--mut);border:1px solid var(--line);padding:10px 18px;font:500 .8rem var(--body);letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:all .2s}
.filters button:hover{color:#fff;border-color:#fff}
.filters button.on{background:var(--acc);border-color:var(--acc);color:#000}
.wgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;align-items:start}
.pcard{position:relative;display:block;width:100%;aspect-ratio:16/9;background:#141414;border:1px solid var(--line);padding:0;cursor:pointer;overflow:hidden;color:#fff;text-align:left}
.pcard.v{aspect-ratio:9/16}
.pcard video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.pcard .cap{position:absolute;inset:auto 0 0 0;padding:44px 20px 18px;background:linear-gradient(transparent,rgba(13,13,13,.92));border-bottom:3px solid var(--acc);opacity:0;transition:opacity .25s}
.pcard:hover .cap,.pcard:focus-visible .cap{opacity:1}
.cap b{display:block;font-family:var(--head);font-weight:400;font-size:.85rem;text-transform:uppercase}
.cap span{color:var(--acc);font-size:.8rem}
@media(hover:none){.pcard .cap{opacity:1}}
@media(max-width:900px){.wgrid{grid-template-columns:1fr 1fr}}
@media(max-width:600px){.wgrid{grid-template-columns:1fr}}

.fullwork{position:fixed;inset:0;z-index:150;background:var(--bg);overflow-y:auto;padding:40px 0 80px}
.fwhead{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:40px}
.fwhead h2{font-size:clamp(1.5rem,3.4vw,2.5rem)}

.lb{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.94);display:flex;align-items:center;justify-content:center;padding:24px}
.lb video{max-width:100%;max-height:86vh;background:#000}
.lb .x{position:absolute;top:20px;right:24px;width:48px;height:48px;background:var(--acc);border:0;color:#000;font-size:1.2rem;cursor:pointer}
.foot{border-top:1px solid var(--line);padding:64px 0 28px;color:var(--mut);font-size:.9rem}
.fgrid{display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:40px}
.fgrid h4{font-family:var(--head);font-weight:400;font-size:.75rem;letter-spacing:.14em;text-transform:uppercase;color:#fff;margin-bottom:18px}
.fgrid a,.fgrid span{display:block;margin-bottom:10px;transition:color .2s}
.fgrid a:hover{color:var(--acc)}
.fgrid .logo{color:#fff;margin-bottom:16px}
.fabout{max-width:280px;font-weight:300}
.fcopy{margin-top:48px;padding-top:24px;border-top:1px solid var(--line);text-align:center;font-size:.8rem}
@media(max-width:800px){.fgrid{grid-template-columns:1fr 1fr}}
@media(max-width:500px){.fgrid{grid-template-columns:1fr}}`;

function Counter({ value, suffix, dec }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setN(value); return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / 1600, 1);
        setN(value * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return <b ref={ref}>{n.toFixed(dec)}{suffix}</b>;
}

function LoopVideo({ src, poster }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {}); else v.pause();
    }, { threshold: 0.35 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="metadata" />;
}

function Work() {
  const [all, setAll] = useState(false);   // full-page reels view
  const [open, setOpen] = useState(null);  // fullscreen player
  const preview = PROJECTS.slice(0, 3);

  useEffect(() => {
    if (!all && !open) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (open) setOpen(null);
      else setAll(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [all, open]);

  const card = (p) => (
    <button
      key={p.title}
      className={"pcard" + (p.vertical ? " v" : "")}
      aria-label={`Play ${p.title}`}
      onClick={() => setOpen(p)}
    >
      <LoopVideo src={p.video} poster={p.poster} />
      <span className="cap"><b>{p.title}</b><span>{p.category}</span></span>
    </button>
  );

  return (
    <section id="work" className="block">
      <div className="wrap">
        <div className="head">
          <h2>Selected Work</h2>
          <p>A taste of recent reels. Open the full collection to see everything.</p>
        </div>

        <div className="wgrid">{preview.map(card)}</div>

        <div className="cta" style={{ marginTop: 40 }}>
          <button className="btn solid" onClick={() => setAll(true)}>View all work</button>
        </div>
      </div>

      {all && (
        <div className="fullwork" role="dialog" aria-modal="true" aria-label="All work">
          <div className="wrap">
            <div className="fwhead">
              <h2>All Work</h2>
              <button className="btn ghost sm" onClick={() => setAll(false)}>← Back</button>
            </div>
            <div className="wgrid">{PROJECTS.map(card)}</div>
          </div>
        </div>
      )}

      {open && (
        <div className="lb" role="dialog" aria-modal="true" aria-label={open.title} onClick={() => setOpen(null)}>
          <video src={open.video} poster={open.poster} controls autoPlay playsInline onClick={(e) => e.stopPropagation()} />
          <button className="x" aria-label="Close video" onClick={() => setOpen(null)}>✕</button>
        </div>
      )}
    </section>
  );
}

export default function App() {
  const [form, setForm] = useState({ name: "", email: "", type: "Cinematic Car Videos", message: "" });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(false);
  const heroRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const toggleHero = () => {
    const v = heroRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };

  const go = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

const submit = (e) => {
  e.preventDefault();
  const er = {};
  if (!form.name.trim()) er.name = "Enter your name.";
  if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = "Enter a valid email address.";
  if (form.message.trim().length < 10) er.message = "Tell us a little about the project (10+ characters).";
  setErrors(er);
  if (Object.keys(er).length) return;

  const text =
    `New project inquiry\n\n` +
    `Name: ${form.name.trim()}\n` +
    `Email: ${form.email.trim()}\n` +
    `Service: ${form.type}\n` +
    `Details: ${form.message.trim()}`;
  const url = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;

  const w = window.open(url, "_blank", "noopener");
  if (!w) window.location.href = url; // fallback if the popup is blocked

  setForm({ name: "", email: "", type: form.type, message: "" });
  setToast(true);
};
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 4500);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <>
      <style>{css}</style>

      <header className="nav">
        <div className="wrap">
          <a href="#top" className="logo" onClick={go("top")}><i />JISHNU VISUALS</a>
          <nav className="links" aria-label="Primary">
            {NAV.map(([label, id]) => <a key={id} href={`#${id}`} onClick={go(id)}>{label}</a>)}
          </nav>
          <a href="#contact" className="btn solid sm" onClick={go("contact")}>Start a project</a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <video ref={heroRef} className="bgvid" autoPlay muted loop playsInline preload="auto" poster="/assets/hero-poster.jpg" aria-hidden="true">
            <source src="/assets/videos/hero.mp4" type="video/mp4" />
          </video>
          <button className="pp" aria-label={playing ? "Pause background video" : "Play background video"} onClick={toggleHero}>{playing ? "❚❚" : "▶"}</button>
          <div className="wrap">
            <div className="tag">Dubai · Video Production · Design</div>
            <h1>Cinematic Content That Makes Brands Stand Out.</h1>
            <p>Premium multi-platform content, high-converting ad creatives and visual strategy for luxury and automotive brands, from a single shoot to a full campaign.</p>
            <div className="cta">
              <a href="#contact" className="btn solid" onClick={go("contact")}>Start a project</a>
              <a href="#work" className="btn ghost" onClick={go("work")}>View work</a>
            </div>
          </div>
        </section>

<section className="stats" aria-label="Client results">
          <div className="wrap">
            {STATS.map((s) => (
              <div className="stat" key={s.label}>
                <Counter {...s} />
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="block about">
  <div className="wrap aboutgrid">
    <div className="photo">
      <img src="/assets/profile.jpg" alt="JISHNU VISUALS" loading="lazy" />
    </div>
    <div>
      <div className="tag">About</div>
      <h2>JISHNU VISUALS</h2>
      <p>
        I'm a Dubai-based videographer and designer creating cinematic content for
        luxury and automotive brands. From a single reel to a full campaign, I handle
        the concept, shoot, edit and rollout, so every frame looks premium and performs.
      </p>
      <p>
        Edit this text with your own story, experience and the brands you've worked with.
      </p>
      <div className="cta">
        <a href="#contact" className="btn solid" onClick={go("contact")}>Work with me</a>
        <a href={CONTACT.instagram} className="btn ghost" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
    </div>
  </div>
</section>

        <section id="services" className="block">
          <div className="wrap">
            <div className="head">
              <h2>Services</h2>
              <p>Everything a brand needs to look premium and perform on every screen.</p>
            </div>
            <div className="grid">
              {SERVICES.map(([title, text], i) => (
                <article className="card" key={title}>
                  <small>{String(i + 1).padStart(2, "0")}</small>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Work />
        {/* Add #process, #why and #packs sections here so the nav anchors have targets */}

        <section id="contact" className="block contact">
          <div className="wrap">
            <div className="head">
              <h2>Start a project</h2>
              <p>Share the brief and get a reply within one working day.</p>
            </div>
            <form onSubmit={submit} noValidate>
              <div>
                <label htmlFor="name">Name</label>
                <input id="name" value={form.name} onChange={set("name")} autoComplete="name" />
                {errors.name && <div className="err">{errors.name}</div>}
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={form.email} onChange={set("email")} autoComplete="email" />
                {errors.email && <div className="err">{errors.email}</div>}
              </div>
              <div className="full">
                <label htmlFor="type">Service</label>
                <select id="type" value={form.type} onChange={set("type")}>
                  {SERVICES.map(([t]) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="full">
                <label htmlFor="message">Project details</label>
                <textarea id="message" value={form.message} onChange={set("message")} />
                {errors.message && <div className="err">{errors.message}</div>}
              </div>
              <div className="full"><button className="btn solid" type="submit">Send inquiry</button></div>
            </form>
          </div>
        </section>
      </main>

<footer className="foot">
  <div className="wrap fgrid">
    <div>
      <a href="#top" className="logo" onClick={go("top")}><i />JISHNU VISUALS</a>
      <p className="fabout">Cinematic video, reels and ad creatives for luxury and automotive brands.</p>
    </div>
    <div>
      <h4>Contact</h4>
      <a href={`tel:+${CONTACT.whatsapp}`}>{CONTACT.phoneDisplay}</a>
      <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
      <span>{CONTACT.location}</span>
    </div>
    <div>
      <h4>Follow</h4>
      <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">Instagram {CONTACT.instagramHandle}</a>
    </div>
    <div>
      <h4>Explore</h4>
      {NAV.map(([label, id]) => <a key={id} href={`#${id}`} onClick={go(id)}>{label}</a>)}
    </div>
  </div>
  <div className="wrap fcopy">© {new Date().getFullYear()} Jishnu Palassery · All rights reserved</div>
</footer>

      {toast && (
        <div className="toast" role="status" aria-live="polite">
          <b>Inquiry sent</b>
          <p>Thanks, we'll be in touch within one working day.</p>
        </div>
      )}
    </>
  );
}
