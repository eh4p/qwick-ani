"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import dynamic from "next/dynamic";

const PremiumExperience = dynamic(() => import("./components/premium-experience"), {
  ssr: false,
  loading: () => null,
});

const industries = [
  ["HOTELS & RESTAURANTS", "Reservations made easy, intelligent pre and post booking support and more!"],
  ["HEALTHCARE", "Effortless appointment bookings, patient record management, and smart FAQ handling!"],
  ["AIRLINES", "Hassle-free flight bookings, live flight updates, baggage info, and more!"],
  ["CRUISE LINES", "Ask LIA for cabin recommendations, promotions, and more!"],
  ["FINTECH", "Automate all your financial needs with LIA!"],
  ["REAL ESTATE", "Help clients find properties, book visits, and get answers faster!"],
  ["EDUCATION", "Streamline enrollment inquiries, course guidance, student assistance, and more!"],
  ["RETAIL", "Deliver personalized shopping assistance, order tracking, promotions, and more!"],
];

const features = [
  ["Conversational AI", "Engage customers with natural, human-like conversations powered by advanced AI.", "chat"],
  ["End-to-End Transactions", "Automate the entire booking flow from inquiry to confirmation with real-time availability.", "booking"],
  ["Multilingual Support", "Break language barriers by engaging customers in their own language, anywhere.", "language"],
  ["Voice Search", "Enable hands-free discovery through natural voice commands for faster, effortless bookings.", "voice"],
  ["Mobile App & Human Handover", "Seamlessly transfer conversations to your team when needed, with full access via a mobile app.", "phone"],
  ["Omnichannel Support", "Connect with customers across WhatsApp, Instagram, Messenger and more all in one place.", "channels"],
  ["Smart Negotiation", "Guide every conversation to a win-win outcome with personalized offers that balance margin and customer satisfaction.", "deal"],
  ["Cross-selling & Upselling", "Increase revenue by recommending relevant add-ons and upgrades at the right moment in the journey.", "upsell"],
  ["Built to Fit Business Workflows", "Integrate LIA with your existing tools CRM, Booking, Payments, Slack and more.", "workflow"],
  ["Interactive Dashboard", "Track performance, analyze customer interactions and uncover insights through powerful dashboards.", "dashboard"],
  ["Easy Customization", "Quickly customize LIA to match your brand with a flexible, widget-based design.", "theme"],
  ["Multimedia Responses", "Bring conversations to life with photos, videos and location cards sent right inside the chat.", "media"],
];

const industryWheel = [
  ["Hospitality", "Reservations made easy, intelligent pre and post booking support and more!", "▥"],
  ["Real Estate", "Help customers discover properties, schedule viewings, answer buyer inquiries and guide them through every step.", "⌂"],
  ["Education & Related Service-Based Industries", "Simplify admissions, course inquiries and provide instant support with ease.", "◇"],
  ["Travel & Tourism", "From trip planning to bookings, LIA helps travelers explore, decide and book with ease.", "◎"],
  ["Cruise Lines", "Ask LIA for cabin recommendations, promotions, and more!", "≋"],
  ["Airlines", "Hassle free flight bookings, live updates, and baggage information delivered instantly.", "✈"],
  ["FinTech", "Automate financial needs and handle inquiries with remarkable efficiency.", "$"],
  ["Healthcare", "Effortless appointment bookings, patient record management and smart FAQ handling!", "⌁"],
  ["Others", "No matter the business, LIA adapts to any workflow, understands customer needs and provides instant, intelligent support.", "✦"],
  ["Retail & eCommerce", "Skyrocket sales with smart upselling and personalized promotions tailored to each shopper's preferences.", "▣"],
];

const faqs = [
  ["Do I need technical expertise to use your AI agents?", "No. LIA is designed to be configured and managed without specialist AI knowledge."],
  ["What kind of tasks can your AI agents handle?", "LIA supports conversations, search, sales, bookings, payments, customer service and connected workflows."],
  ["How secure is my data with LIA?", "LIA is built on secure, scalable infrastructure with controlled integrations and enterprise-ready deployment options."],
  ["Can LIA customize solutions for my company?", "Yes. LIA can be tailored to your brand, data, processes, channels and customer journey."],
  ["Can your solutions run on-premises?", "Deployment can be adapted to your organization’s infrastructure and security requirements."],
];

const testimonials = [
  {
    quote: "With successful integration of Yana chatbot with our core systems like inventory management, reservation and ticketing... passengers getting a completely rich experience.",
    name: "Chamara Perera",
    role: "Group Head of IT",
    portrait: "/lia/testimonials/chamara-perera.jpeg",
    logo: "/lia/logo/2.svg",
  },
  {
    quote: "Since partnering with LIA 18 months ago, The Galle Face Hotel has seen an increase in direct online bookings, add-ons and overall guest engagement through our website. We sincerely thank CodeGen, its management team and backend team for their responsiveness, support, and continued commitment.",
    name: "Suresh Abbas",
    role: "General Manager",
    portrait: "/lia/testimonials/suresh-abbas.jpg",
    logo: "/lia/logo/1.svg",
  },
  {
    quote: "The LIA team worked closely with us, taking on every challenge to personalize the solution to our needs. Their efforts helped deliver one of the first chatbot initiatives of its kind in Sri Lanka's insurance industry.",
    name: "Suneth Jayamanne",
    role: "Chief Information Officer",
    portrait: "/lia/testimonials/suneth-jayamanne.jpg",
    logo: "/lia/logo/hnb-life.png",
  },
];

function WaveBars({ dark = false }: { dark?: boolean }) {
  return (
    <span className={`wave-bars${dark ? " dark" : ""}`} aria-hidden="true">
      {[10, 18, 28, 16, 24, 12, 20].map((height, index) => (
        <i key={index} style={{ "--bar-height": `${height}px`, "--bar-delay": `${index * -0.11}s` } as CSSProperties} />
      ))}
    </span>
  );
}

function FeatureVisual({ type }: { type: string }) {
  if (type === "voice") {
    return (
      <div className="voice-demo">
        <WaveBars />
        <button className="demo-mic" aria-label="Voice search demo">⌁</button>
        <div className="voice-query"><small>LISTENING</small><span>Find me a flight to Tokyo next Friday</span></div>
      </div>
    );
  }

  if (type === "phone") {
    return (
      <div className="phone-demo">
        <div className="phone-speaker" />
        <div className="phone-message">Hi! I can help with your booking. What dates work?</div>
        <div className="phone-handover"><span className="online-dot" /> Handed over to Sarah</div>
      </div>
    );
  }

  if (type === "language") {
    return (
      <div className="language-demo">
        <div><span>ES</span> ¿Tienen habitaciones disponibles?</div>
        <div><span>FR</span> Bien sûr! Nous avons de la disponibilité.</div>
        <div><span>JP</span> 今週末に空室はございますか？</div>
        <div><span>AR</span> بالتأكيد! لدينا غرف متاحة.</div>
      </div>
    );
  }

  if (type === "booking") {
    return (
      <div className="booking-demo">
        <div className="booking-title">Your reservation</div>
        <div className="booking-row"><span>01</span><b>Discover</b><i>✓</i></div>
        <div className="booking-row"><span>02</span><b>Book</b><i>✓</i></div>
        <div className="booking-row active"><span>03</span><b>Pay</b><i>•••</i></div>
        <div className="booking-row"><span>04</span><b>Confirm</b><i /></div>
      </div>
    );
  }

  if (type === "dashboard") {
    return (
      <div className="dashboard-demo">
        <div className="metric"><small>CONVERSATIONS</small><strong>24,892</strong><span>+18.4%</span></div>
        <svg viewBox="0 0 360 150" aria-hidden="true"><path d="M0 132 C35 120 48 122 75 98 S125 118 150 75 S205 102 230 48 S285 72 360 12" /><path className="chart-fill" d="M0 132 C35 120 48 122 75 98 S125 118 150 75 S205 102 230 48 S285 72 360 12 L360 150 L0 150Z" /></svg>
        <div className="dashboard-stats"><span>92%<small>RESOLVED</small></span><span>4.9<small>CSAT</small></span><span>0:42<small>RESPONSE</small></span></div>
      </div>
    );
  }

  if (type === "channels" || type === "workflow") {
    const labels = type === "channels" ? ["WhatsApp", "Instagram", "Messenger", "Web", "Mobile"] : ["CRM", "Payments", "Booking", "Slack", "ERP"];
    return (
      <div className="network-demo">
        <div className="network-core"><img src="/lia/logo/lia-white.png" alt="LIA" /></div>
        {labels.map((label, index) => <span key={label} className={`network-node node-${index}`}>{label}</span>)}
      </div>
    );
  }

  if (type === "deal") {
    return (
      <div className="deal-demo">
        <small>SMART OFFER</small><strong>$420</strong><span>Original offer $485</span>
        <div className="deal-scale"><i /><b /></div>
        <button>Accept offer <span>→</span></button>
      </div>
    );
  }

  if (type === "upsell") {
    return (
      <div className="upsell-demo">
        <small>COMPLETE YOUR STAY</small>
        <div><span>✦</span><b>Ocean view upgrade</b><em>+$40</em></div>
        <div><span>♨</span><b>Spa experience</b><em>+$28</em></div>
        <div><span>⇄</span><b>Airport transfer</b><em>+$18</em></div>
      </div>
    );
  }

  if (type === "theme") {
    return (
      <div className="theme-demo">
        <div className="theme-preview"><span>LIA</span><p>How can I help today?</p><i /></div>
        <div className="theme-swatches"><b /><b /><b /><b /></div>
        <span className="theme-label">Match your brand in seconds</span>
      </div>
    );
  }

  if (type === "media") {
    return (
      <div className="media-demo">
        <div className="media-chat">Can you show me the rooftop pool and a room?</div>
        <div className="media-chat answer">Of course — here&apos;s a quick look 📸</div>
        <div className="media-grid"><span>POOL</span><span>SUITE</span><span>0:18 ▶</span><span>VIEW</span></div>
      </div>
    );
  }

  return (
    <div className="chat-demo">
      <div className="chat-bubble"><small>LIA · ASSISTANT</small>How can I help today? Ask anything — from booking to support.</div>
      <div className="typing"><i /><i /><i /></div>
      <div className="chat-composer"><span>Ask anything…</span><button><WaveBars dark /></button></div>
    </div>
  );
}

function Header({ menuOpen, setMenuOpen, toggleTheme }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void; toggleTheme: () => void }) {
  return (
    <>
      <header className="site-header">
        <a href="#hero" className="brand" aria-label="LIA home"><img src="/lia/lia.svg" alt="LIA" /></a>
        <div className="header-actions">
          <button className="menu-trigger" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "CLOSE" : "MENU"}<span>{menuOpen ? "×" : "+"}</span></button>
          <a className="outline-cta" href="#contact">GET IN TOUCH</a>
          <button className="theme-toggle" aria-label="Toggle color theme" onClick={toggleTheme}>◔</button>
        </div>
      </header>
      <div className={`menu-panel${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen}>
        <nav>
          {["SOLUTIONS", "AI PRODUCTS", "ABOUT US", "FAQ", "CONTACT"].map((item, index) => (
            <a key={item} href={index === 3 ? "#section-faq" : index === 4 ? "#contact" : "#features"} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{item}<i>↗</i></a>
          ))}
        </nav>
        <p>LIMITLESS INTELLIGENCE.<br />ONE CONNECTED EXPERIENCE.</p>
      </div>
    </>
  );
}

export default function Home() {
  const featureRef = useRef<HTMLElement>(null);
  const industryRef = useRef<HTMLElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [industryStep, setIndustryStep] = useState(0);
  const [conversations, setConversations] = useState(10000);
  const [salary, setSalary] = useState(4200);
  const [minutes, setMinutes] = useState(8);
  const [agentBand, setAgentBand] = useState("1–10");

  const savings = Math.round(323028 * (conversations / 10000) * (salary / 4200) * (minutes / 8));

  useEffect(() => {
    const loadTimer = window.setTimeout(() => setLoaded(true), 850);
    let ticking = false;
    const updateScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const viewport = window.innerHeight;
        if (featureRef.current) {
          const start = featureRef.current.offsetTop;
          const distance = featureRef.current.offsetHeight - viewport;
          const progress = Math.max(0, Math.min(1, (window.scrollY - start) / distance));
          let trackProgress = 0;
          if (progress < 0.07) {
            trackProgress = (progress / 0.07) * 0.04;
          } else if (progress < 0.18) {
            trackProgress = 0.04 + ((progress - 0.07) / 0.11) * 0.43;
          } else if (progress < 0.42) {
            trackProgress = 0.47 + ((progress - 0.18) / 0.24) * 0.53;
          } else {
            trackProgress = 1;
          }
          featureRef.current.style.setProperty("--feature-progress", String(progress));
          featureRef.current.style.setProperty("--feature-track-progress", String(trackProgress));
        }
        if (industryRef.current) {
          const start = industryRef.current.offsetTop;
          const distance = industryRef.current.offsetHeight - viewport;
          const progress = Math.max(0, Math.min(1, (window.scrollY - start) / distance));
          industryRef.current.style.setProperty("--industry-progress", String(progress));
        }
        ticking = false;
      });
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    return () => {
      window.clearTimeout(loadTimer);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  const toggleTheme = () => document.documentElement.classList.toggle("light");

  return (
    <main className="lia-page">
      <div className={`preloader${loaded ? " hidden" : ""}`}><img src="/lia/favicon.svg" alt="LIA" /><span><i /></span></div>
      <PremiumExperience />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} toggleTheme={toggleTheme} />

      <section id="hero" className="hero">
        <div className="hero-atmosphere" />
        <div className="hero-layout">
          <div className="hero-copy">
            <h1>Meet Lia,<br />Your Limitless<br />Intelligent Agent</h1>
            <p>LIA AI CONVERSATIONAL AGENT CONNECTS SEAMLESSLY ACROSS WEB, MOBILE, SOCIAL MEDIA AND IN-STORE PLATFORMS, DELIVERING CONSISTENT CUSTOMER EXPERIENCES. BACKED BY A SECURE, SCALABLE INFRASTRUCTURE, LIA ENSURES EASY CUSTOMIZATION, REAL-TIME INSIGHTS AND EFFORTLESS INTEGRATION WITH YOUR SYSTEMS.</p>
          </div>

          <div className="hero-orb-wrap">
            <div className="orb-rings"><i /><i /><i /><i /></div>
            <svg className="voice-orb" viewBox="0 0 700 700" aria-hidden="true">
              <defs><linearGradient id="orb-gradient"><stop stopColor="#f13de8" /><stop offset=".55" stopColor="#8f43fa" /><stop offset="1" stopColor="#327dff" /></linearGradient></defs>
              <circle cx="350" cy="350" r="196" />
              <circle cx="350" cy="350" r="178" />
              <path d="M115 354 C150 354 168 348 198 354 C234 361 250 342 278 354 C310 366 323 336 350 354 C379 373 392 340 421 354 C449 368 470 344 498 354 C532 365 560 352 585 354" />
              <path className="orbit-path second" d="M173 360 C166 268 235 184 330 169 C420 154 515 219 527 320 C542 419 468 509 370 527 C266 544 176 468 173 360Z" />
              <path className="orbit-path third" d="M147 338 C168 238 245 202 317 230 C376 253 399 173 463 208 C534 247 554 345 501 414 C444 490 384 446 326 485 C247 537 123 451 147 338Z" />
            </svg>
            <div className="orb-center"><WaveBars /><p>Tap the mic to talk</p><button aria-label="Start voice input">♩</button></div>
          </div>

          <aside className="industry-rail">
            <h2>LIA for</h2>
            <div className="rail-window"><div className="rail-track">
              {[...industries, ...industries].map(([title, description], index) => (
                <article key={`${title}-${index}`}><h3>{title}</h3><p>{description}</p></article>
              ))}
            </div></div>
          </aside>
        </div>
      </section>

      <section id="features" className="feature-journey" ref={featureRef}>
        <div className="feature-sticky">
          <div className="feature-marquee" aria-hidden="true">
            <div><span>OUR FEATURES ✦ OUR FEATURES ✦ OUR FEATURES ✦</span><span>OUR FEATURES ✦ OUR FEATURES ✦ OUR FEATURES ✦</span></div>
            <div className="reverse"><span>POWERED BY AI ✦ POWERED BY AI ✦ POWERED BY AI ✦</span><span>POWERED BY AI ✦ POWERED BY AI ✦ POWERED BY AI ✦</span></div>
          </div>
          <div className="feature-track">
            {features.map(([title, description, type], index) => (
              <article className="feature-item" key={title} style={{ "--feature-index": index } as CSSProperties}>
                <div className="feature-card"><FeatureVisual type={type} /><a href="https://youtu.be/tQFA3OowFWw?si=MvNPc9BdRxdVbhbb" target="_blank" rel="noreferrer" className="watch-chip"><i>▶</i>Watch video</a></div>
                <h3>{title}</h3><span className="feature-rule"><i /></span><p>{description}</p>
              </article>
            ))}
          </div>
          <div className="trusted-scene">
            <h2>Trusted by teams that<br />value exceptional<br />digital experiences.</h2>
            <div className="logo-cloud">
              {[1, 2, 3, 4, 5, 6, 7].map((logo, index) => <img key={logo} src={`/lia/logo/${logo}.svg`} alt="Trusted LIA client" className={`client-logo logo-${index + 1}`} />)}
              <img src="/lia/logo/hnb-life.png" alt="HNB Life" className="client-logo logo-8" />
            </div>
          </div>
        </div>
      </section>

      <section id="industries" className="industry-journey" ref={industryRef}>
        <div className="industry-sticky">
          <div className="industry-wheel" style={{ "--industry-step": industryStep } as CSSProperties}>
            <div className="industry-sectors" />
            <div className="industry-core"><small>BUILT FOR EVERY INDUSTRY</small><img src="/lia/lia.svg" alt="LIA" /><span>VOICE AI PLATFORM</span></div>
            {industryWheel.map(([title, description, icon], index) => {
              const angle = ((index - industryStep) * 36 + 18) * (Math.PI / 180);
              const x = (50 + Math.cos(angle) * 39).toFixed(4);
              const y = (50 + Math.sin(angle) * 39).toFixed(4);
              return (
                <article key={title} className="industry-card" style={{ left: `${x}%`, top: `${y}%` }}>
                  <i>{icon}</i><h3>{title}</h3><b /><p>{description}</p>
                </article>
              );
            })}
          </div>
          <button className="industry-nav prev" onClick={() => setIndustryStep((step) => (step + 9) % 10)}>←&nbsp; Prev</button>
          <button className="industry-nav next" onClick={() => setIndustryStep((step) => (step + 1) % 10)}>Next &nbsp;→</button>
        </div>
      </section>

      <section id="section-faq" className="faq-section">
        <div className="faq-intro reveal">
          <h2>AI Employee FAQs.<span>Let&apos;s clear things up.</span></h2>
          <p>We know — AI tools, automation, workflows and Agents can feel overwhelming. LIA brings everything together into one connected experience.</p>
          <p>Whether you&apos;re managing finance, conversations or automation, we&apos;re here to make it simple, clear and easy to use.</p>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <div className={`faq-row${openFaq === index ? " open" : ""}`} key={question}>
              <button onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{question}</span><i>⌄</i></button>
              <div><p>{answer}</p></div>
            </div>
          ))}
          <a href="#contact" className="more-link">View more <span>→</span></a>
        </div>
      </section>

      <section id="roi-calculator" className="roi-section">
        <div className="roi-controls">
          <h2>Calculate ROI</h2><p>Discover how much money and time LIA puts back into your business.</p>
          <label>Customer Conversations (Monthly)<span>ⓘ</span><output>{Math.round(conversations / 1000)}K</output></label>
          <input type="range" min="1000" max="50000" step="1000" value={conversations} onChange={(event) => setConversations(Number(event.target.value))} style={{ "--range": `${((conversations - 1000) / 49000) * 100}%` } as CSSProperties} />
          <label>Number of Agents<span>ⓘ</span></label>
          <div className="agent-bands">{["1–10", "11–25", "26–50", "51–100", "100+"].map((band) => <button key={band} className={agentBand === band ? "active" : ""} onClick={() => setAgentBand(band)}>{band}</button>)}</div>
          <label>Agent&apos;s Salary (Monthly)<span>ⓘ</span><output>${(salary / 1000).toFixed(1)}K</output></label>
          <input type="range" min="1800" max="10000" step="100" value={salary} onChange={(event) => setSalary(Number(event.target.value))} style={{ "--range": `${((salary - 1800) / 8200) * 100}%` } as CSSProperties} />
          <label>Average Resolution Time (Minutes)<span>ⓘ</span><output>{minutes}m</output></label>
          <input type="range" min="2" max="30" value={minutes} onChange={(event) => setMinutes(Number(event.target.value))} style={{ "--range": `${((minutes - 2) / 28) * 100}%` } as CSSProperties} />
        </div>
        <div className="roi-result">
          <div className="gauge">
            <div className="gauge-ticks">{Array.from({ length: 55 }, (_, index) => <i key={index} style={{ transform: `rotate(${index * 3.34 - 91}deg)` }} />)}</div>
            <div className="gauge-arc"><b /></div>
            <div className="gauge-value"><strong>${savings.toLocaleString()}</strong><span>YEAR 1 SAVINGS</span><p>That&apos;s ${Math.round(savings / 12).toLocaleString()} saved every month!</p></div>
          </div>
          <div className="roi-stats">
            <span><small>AUTOMATED TICKETS / MONTH</small><b>{Math.round(conversations * 0.85).toLocaleString()} TICKETS</b></span>
            <span><small>5-YEAR PROJECTION</small><b>${(savings * 5).toLocaleString()}</b></span>
            <span><small>PAYROLL OFFSET</small><b>17% OF ANNUAL PAYROLL</b></span>
          </div>
          <div className="roi-mini"><div><small>HOURS SAVED / YEAR</small><b>{Math.round((conversations * minutes * 12 * 0.35) / 60).toLocaleString()}</b><span>35% time reduction</span></div><div><small>AGENTS REASSIGNED</small><b>{agentBand === "1–10" ? 9 : agentBand.replace(/\D/g, "")}</b><span>To higher-value work</span></div></div>
        </div>
      </section>

      <section id="testimonials" className="testimonials-section">
        <header><h2>What clients say</h2><p>Real feedback from the airlines, hotels and insurers running LIA in production.</p></header>
        <div className="testimonial-window"><div className="testimonial-track">
          {[...testimonials, ...testimonials].map((item, index) => (
            <article key={`${item.name}-${index}`}><blockquote>“{item.quote}”</blockquote><footer><img src={item.portrait} alt={item.name} /><span><b>{item.name}</b><small>{item.role}</small></span><img className="testimonial-logo" src={item.logo} alt="" /></footer></article>
          ))}
        </div></div>
      </section>

      <section id="contact" className="contact-section">
        <div className="stars" aria-hidden="true">{Array.from({ length: 42 }, (_, index) => <i key={index} style={{ "--x": `${(index * 37) % 100}%`, "--y": `${(index * 61) % 76}%`, "--delay": `${(index % 8) * -0.4}s` } as CSSProperties} />)}</div>
        <div className="contact-copy"><span>✦ · Start</span><h2>Where clarity<br />becomes progress.</h2><p>From pricing to features, here are the answers to common<br />questions about LIA</p><a href="mailto:hello@lialive.ai">Start your journey</a></div>
        <div className="planet"><div className="planet-lines" /></div>
        <footer className="site-footer">
          <div><img src="/lia/lia.svg" alt="LIA" /><p>Built with clarity. Designed for flow.</p><a href="#">Privacy Policy</a></div>
          <nav><div><b>Product</b><a href="#hero">Home</a><a href="#features">Feature</a><a href="#roi-calculator">ROI Calculator</a><a href="#testimonials">Testimonials</a></div><div><b>Company</b><a href="#">About</a><a href="#">Blog</a><a href="#">Careers</a><a href="#">Press</a></div></nav>
        </footer>
      </section>

      <button className="floating-chat" aria-label="Open LIA chat"><span>▱</span></button>
    </main>
  );
}
