"use client";

import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

const services = [
  {
    number: "01",
    category: "Website design and application development",
    title: "E-commerce Website Development",
    body: "E-commerce websites with secure checkout, product management, and payment and logistics integrations.",
    tags: ["Secure checkout", "Product management", "Payments & logistics"],
    accent: "blue",
    glyph: "◇",
  },
  {
    number: "02",
    category: "Website design and application development",
    title: "Web Development Services",
    body: "High-performance websites focused on speed, usability, and conversion.",
    tags: ["Performance", "Usability", "Conversion"],
    accent: "primary",
    glyph: "↗",
  },
  {
    number: "03",
    category: "Website design and application development",
    title: "Mobile App Development",
    body: "Fast, secure mobile apps with easy UX and integrations for payments, notifications, and admin dashboards.",
    tags: ["Payments", "Notifications", "Admin dashboards"],
    accent: "coral",
    glyph: "◎",
  },
  {
    number: "04",
    category: "Cloud computing and API integration",
    title: "Cloud Computing Services",
    body: "Cloud infrastructure and architecture that reduce complexity and prepare systems for growth.",
    tags: ["Infrastructure", "Architecture", "API integration"],
    accent: "blue",
    glyph: "☁",
  },
  {
    number: "05",
    category: "Cloud computing and API integration",
    title: "Website Speed Optimization",
    body: "Performance optimization with a clear technical plan to load faster and reduce drop-off.",
    tags: ["Technical audit", "Core Web Vitals", "Faster loading"],
    accent: "primary",
    glyph: "ϟ",
  },
  {
    number: "06",
    category: "Cloud computing and API integration",
    title: "Internet of Things (IoT)",
    body: "IoT solutions that connect devices, collect operational data, and deliver actionable insights.",
    tags: ["Connected devices", "Operational data", "Live insights"],
    accent: "coral",
    glyph: "∿",
  },
  {
    number: "07",
    category: "Cybersecurity and data analytics",
    title: "Cybersecurity",
    body: "Proactive protection controls, risk reduction, and operational response readiness.",
    tags: ["Protection controls", "Risk reduction", "Response readiness"],
    accent: "blue",
    glyph: "⬡",
  },
  {
    number: "08",
    category: "SEO and digital identity",
    title: "SEO Services",
    body: "Technical SEO, content optimization, and structured growth strategies for qualified traffic.",
    tags: ["Technical SEO", "Content optimization", "Organic growth"],
    accent: "primary",
    glyph: "⌁",
  },
  {
    number: "09",
    category: "SEO and digital identity",
    title: "Content Creation Services",
    body: "Digital content with a clear brand voice and marketing messages aligned to sales goals.",
    tags: ["Brand voice", "Marketing content", "Sales alignment"],
    accent: "coral",
    glyph: "✎",
  },
  {
    number: "10",
    category: "SEO and digital identity",
    title: "Brand Identity Design",
    body: "Brand identity and visual systems for a consistent, memorable digital presence.",
    tags: ["Visual identity", "Design systems", "Brand consistency"],
    accent: "blue",
    glyph: "✦",
  },
  {
    number: "11",
    category: "SEO and digital identity",
    title: "UX Design Services",
    body: "UX audits and iterative improvements for conversions, accessibility, and satisfaction.",
    tags: ["UX audits", "Accessibility", "Conversion"],
    accent: "primary",
    glyph: "◉",
  },
  {
    number: "12",
    category: "SEO and digital identity",
    title: "Digital Marketing Services",
    body: "Practical campaigns to increase visibility and lead generation.",
    tags: ["Campaigns", "Visibility", "Lead generation"],
    accent: "coral",
    glyph: "↗",
  },
  {
    number: "13",
    category: "Product and software systems",
    title: "SaaS Systems",
    body: "Multi-tenant platforms with thoughtful permissions, billing, workflows, and observability.",
    tags: ["Architecture", "Subscriptions", "Analytics"],
    accent: "blue",
    glyph: "⌘",
  },
  {
    number: "14",
    category: "Cybersecurity and data analytics",
    title: "AI, Automation & Data Analytics",
    body: "Useful intelligence, automation, and data analytics embedded into real workflows with practical guardrails.",
    tags: ["AI agents", "Data analytics", "Automation"],
    accent: "primary",
    glyph: "⌬",
  },
];

const projects = [
  { name: "Allianz", theme: "dark" },
  { name: "HNI (Hanan Nagi)", theme: "light" },
  { name: "Address Investment", theme: "electric" },
  { name: "Atomic Rides", theme: "dark" },
  { name: "LENSAURA", theme: "light" },
  { name: "Optimim Oil", theme: "electric" },
  { name: "Colorplay", theme: "dark" },
  { name: "Bfas", theme: "light" },
  { name: "11:11", theme: "electric" },
];

const process = [
  ["01", "Discover", "We align on the problem, users, constraints, and the outcome that matters."],
  ["02", "Shape", "We turn evidence into a focused product scope, system map, and delivery plan."],
  ["03", "Design", "We prototype the experience early, test the hard parts, and establish the visual system."],
  ["04", "Build", "Senior engineers ship in transparent increments with quality built into every cycle."],
  ["05", "Launch", "We harden, release, observe, and make the path from handoff to adoption feel seamless."],
  ["06", "Scale", "We stay close as usage grows—improving performance, capability, and product value."],
];

const expertise = [
  "Next.js",
  "React",
  "Node.js",
  "TypeScript",
  "Python",
  "PostgreSQL",
  "AWS",
  "Docker",
  "OpenAI",
  "Figma",
];

const systemCaptions = [
  ["Platform engineering", "Secure, composable foundations designed for real users, real load, and the next stage of growth.", "BUILD THE FOUNDATION"],
  ["Experience design", "Complex workflows shaped into clear, useful interfaces that feel effortless from the first click.", "DESIGN THE EXPERIENCE"],
  ["AI automation", "Practical intelligence embedded into the work—removing repetition while keeping people in control.", "AUTOMATE THE RIGHT WORK"],
  ["Scale & support", "Performance, observability, and continuous improvement long after the first release goes live.", "KEEP MOVING FORWARD"],
  ["Product strategy", "Evidence, priorities, and a focused roadmap that turns an ambitious idea into a buildable product.", "SHAPE THE PRODUCT"],
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg className={diagonal ? "arrow-diagonal" : ""} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <a className={`logo ${footer ? "logo-footer" : ""}`} href="#top" aria-label="QRFDS — back to top">
      <Image
        className="logo-image"
        src="/qrfds/qrfds-logo.webp"
        alt=""
        width={512}
        height={493}
        aria-hidden="true"
      />
      <span>QRFDS</span>
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        className="site-header"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#process">Process</a>
        </nav>
        <a className="header-cta" href="#contact">
          Start a project <Arrow diagonal />
        </a>
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobile navigation">
              {[
                ["01", "Services", "#services"],
                ["02", "Work", "#work"],
                ["03", "About", "#about"],
                ["04", "Process", "#process"],
                ["05", "Contact", "#contact"],
              ].map(([number, label, href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                  <small>{number}</small>
                  <span>{label}</span>
                  <Arrow diagonal />
                </a>
              ))}
            </nav>
            <div className="mobile-menu-foot">
              <span>Digital products, built properly.</span>
              <a href="mailto:info@qrfds.com">info@qrfds.com</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-stage">
        <div className="hero-media" aria-hidden="true">
          <Image
            src="/qrfds/hero-brand-v2.png"
            alt=""
            fill
            preload
            sizes="100vw"
          />
          <div className="hero-media-veil" />
        </div>
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orbit orbit-a" aria-hidden="true" />
        <div className="hero-orbit orbit-b" aria-hidden="true" />
        <div className="hero-node node-a" aria-hidden="true"><i /></div>
        <div className="hero-node node-b" aria-hidden="true"><i /></div>

        <div className="hero-content page-shell">
          <div className="hero-kicker">
            <span className="status-dot" />
            Independent software studio · Building worldwide
          </div>
          <h1 className="hero-title">
            We engineer
            <span>what&apos;s next.</span>
          </h1>
          <div className="hero-bottom">
            <p>
              QRFDS turns ambitious ideas into digital products that are useful,
              scalable, and distinctly yours.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">
                Start a project <Arrow diagonal />
              </a>
              <a className="button button-ghost" href="#work">
                Explore our work <Arrow />
              </a>
            </div>
          </div>
          <div className="hero-scroll">
            <span>Scroll to explore</span>
            <i><b /></i>
          </div>
        </div>
      </div>
    </section>
  );
}

function SignalStrip() {
  return (
    <div className="signal-strip" aria-label="QRFDS capabilities">
      <div className="signal-track">
        {[0, 1].map((group) => (
          <div className="signal-group" aria-hidden={group === 1} key={group}>
            <span>Strategy</span><i />
            <span>Design</span><i />
            <span>Engineering</span><i />
            <span>AI systems</span><i />
            <span>Cloud</span><i />
            <span>Growth</span><i />
          </div>
        ))}
      </div>
    </div>
  );
}

function Introduction() {
  return (
    <section className="introduction section-dark">
      <div className="page-shell intro-grid">
        <div className="section-index reveal">
          <span>01</span>
          <p>QRFDS in one line</p>
        </div>
        <div className="intro-statement reveal">
          <p className="eyebrow">From idea to impact</p>
          <h2>
            Software should move your business forward—not become another thing
            <em> holding it back.</em>
          </h2>
        </div>
        <div className="intro-detail reveal">
          <p>
            We pair product thinking with deep engineering to design, build, and
            scale software that solves hard problems elegantly.
          </p>
          <a className="text-link" href="#about">How we work <Arrow /></a>
        </div>
        <div className="metrics reveal" aria-label="Company highlights">
          <div><strong>01</strong><span>Senior team<br />from day one</span></div>
          <div><strong>360°</strong><span>Product-to-platform<br />ownership</span></div>
          <div><strong>∞</strong><span>Built to evolve,<br />not expire</span></div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="services" id="services">
      <div className="services-pin">
        <div className="services-heading page-shell">
          <div>
            <p className="eyebrow">02 / Capabilities</p>
            <h2>From first thought<br />to <em>full scale.</em></h2>
          </div>
          <p>
            One integrated team across strategy, design, engineering, and growth.
            Slide to explore.
          </p>
        </div>
        <div className="services-track-wrap">
          <div className="services-track">
            {services.map((service) => (
              <article className={`service-card accent-${service.accent}`} key={service.number}>
                <div className="service-card-top">
                  <span>{service.number}</span>
                  <i>{service.glyph}</i>
                </div>
                <div>
                  <small className="service-category">{service.category}</small>
                  <h3>{service.title}</h3>
                  <p>{service.body}</p>
                </div>
                <ul>
                  {service.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
        <div className="services-progress page-shell" aria-hidden="true">
          <span>01</span><i><b /></i><span>{String(services.length).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}

function SystemsPulseIcon() {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true">
      <path d="M3 15h5l2.5-7 5 13 3-9 2 3H25" />
    </svg>
  );
}

function PlatformSystemCard() {
  return (
    <div className="lia-feature-card lia-transaction-card lia-platform-card">
      <div className="transaction-sheen" />
      <div className="transaction-content">
        <div className="transaction-progress">
          {["Model", "Build", "Integrate", "Deploy"].map((step, index) => (
            <span className={`transaction-step step-${index + 1}`} key={step}>
              <i>{index === 0 ? "✓" : ""}</i>{step}<b />
            </span>
          ))}
        </div>
        <div className="transaction-project">
          <span className="system-thumbnail platform-thumbnail"><i /><i /><i /></span>
          <span><small>CORE PLATFORM</small><strong>Scalable application architecture</strong><em>TypeScript&nbsp;&nbsp; · &nbsp;&nbsp;APIs&nbsp;&nbsp; · &nbsp;&nbsp;Cloud</em></span>
        </div>
        <div className="transaction-result">
          <span><i /> Production ready</span><strong>BUILT TO SCALE</strong>
        </div>
      </div>
    </div>
  );
}

function ExperienceSystemCard() {
  return (
    <div className="lia-feature-card lia-language-card lia-experience-card">
      <div className="language-panel">
        <div className="language-status"><i /> QRFDS · Product design review</div>
        <div className="language-detected"><span>◆</span><b>Core workflow</b><small>SIMPLIFIED</small></div>
        <div className="language-message">The primary workflow still feels too complex.</div>
        <div className="language-reply"><span>Q</span><p><small>QRFDS DESIGN</small>We reduced it to three clear steps and kept advanced controls in context.</p></div>
        <div className="language-tags">Research · UX · Prototyping · UI · Design systems · Testing</div>
      </div>
    </div>
  );
}

function AutomationSystemCard() {
  return (
    <div className="lia-feature-card lia-assistant-card lia-automation-card">
      <div className="lia-glass-panel assistant-panel">
        <div className="assistant-label"><span className="assistant-logo">Q</span> QRFDS · Workflow intelligence</div>
        <p>Three repetitive approval steps can be safely automated with a human review checkpoint.</p>
        <div className="assistant-thinking"><i /><i /><i /></div>
        <div className="assistant-actions">
          <span><b>◇</b> Map workflow</span>
          <span><b>▧</b> Add guardrails</span>
          <span><b>✣</b> Review output</span>
        </div>
        <div className="assistant-input"><b>＋</b><span>Describe your next workflow…</span><i>⌘</i></div>
      </div>
      <div className="assistant-watch"><i>↗</i> Automation ready</div>
      <div className="assistant-code-orb"><SystemsPulseIcon /></div>
    </div>
  );
}

function ScaleSystemCard() {
  return (
    <div className="lia-feature-card lia-assistant-card lia-scale-card">
      <div className="lia-glass-panel assistant-panel">
        <div className="assistant-label"><span className="assistant-logo">Q</span> QRFDS · Live operations</div>
        <p>Demand is climbing while response times remain steady across every critical service.</p>
        <div className="assistant-thinking"><i /><i /><i /></div>
        <div className="assistant-actions">
          <span><b>◇</b> Healthy systems</span>
          <span><b>▧</b> Stable latency</span>
          <span><b>✣</b> Live insights</span>
        </div>
        <div className="assistant-input"><b>＋</b><span>View system health</span><i>↗</i></div>
      </div>
      <div className="assistant-watch"><i>✓</i> All systems healthy</div>
      <div className="assistant-code-orb"><SystemsPulseIcon /></div>
    </div>
  );
}

function StrategySystemCard() {
  return (
    <div className="lia-feature-card lia-transaction-card lia-strategy-card">
      <div className="transaction-sheen" />
      <div className="transaction-content">
        <div className="transaction-progress">
          {["Discover", "Shape", "Prototype", "Validate"].map((step, index) => (
            <span className={`transaction-step step-${index + 1}`} key={step}>
              <i>{index === 0 ? "✓" : ""}</i>{step}<b />
            </span>
          ))}
        </div>
        <div className="transaction-project">
          <span className="system-thumbnail strategy-thumbnail"><i /><i /><i /></span>
          <span><small>PRODUCT BLUEPRINT</small><strong>One clear path from idea to launch</strong><em>Evidence&nbsp;&nbsp; · &nbsp;&nbsp;Priorities&nbsp;&nbsp; · &nbsp;&nbsp;Roadmap</em></span>
        </div>
        <div className="transaction-result">
          <span><i /> Direction aligned</span><strong>READY TO BUILD</strong>
        </div>
      </div>
    </div>
  );
}

function SystemsShowcase() {
  return (
    <section className="featured-products" id="systems" aria-label="QRFDS systems in motion">
      <div className="featured-stage">
        <div className="systems-kicker"><span>QRFDS / SYSTEMS IN MOTION</span><i>SCROLL TO ROTATE</i></div>
        <div className="outline-type" aria-hidden="true">
          <span>DIGITAL</span><span>SYSTEMS</span>
        </div>
        <div className="feature-vignette" />
        <div className="featured-card-scene">
          <div className="featured-card-position"><PlatformSystemCard /></div>
          <div className="featured-card-position"><ExperienceSystemCard /></div>
          <div className="featured-card-position"><AutomationSystemCard /></div>
          <div className="featured-card-position"><ScaleSystemCard /></div>
          <div className="featured-card-position"><StrategySystemCard /></div>
        </div>
        <div className="featured-captions">
          {systemCaptions.map(([title, body, detail], index) => (
            <div className={`featured-caption-copy ${index === 0 ? "is-active" : ""}`} key={title}>
              <h2>{title}</h2>
              <div className="caption-signal"><i /><i /><i /></div>
              <p>{body}</p>
              <a className="featured-text-link" href="#contact">{detail} <Arrow /></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section className="work" id="work">
      <div className="work-stage">
        <div className="work-heading page-shell">
          <p className="eyebrow">03 / Selected work</p>
        </div>
        <div className="work-panels">
          {projects.map((project, index) => (
            <article
              className={`work-panel project-${index + 1} theme-${project.theme}`}
              key={project.name}
              style={{ "--project-index": index } as CSSProperties}
            >
              <div className="project-scene" aria-hidden="true">
                <div className="project-grid" aria-hidden="true" />
                <div className="project-orb project-orb-primary" />
                <div className="project-orb project-orb-secondary" />
                <span className="project-echo project-echo-a">{project.name}</span>
                <span className="project-echo project-echo-b">{project.name}</span>
              </div>
              <div className="project-copy">
                <h3>{project.name}</h3>
              </div>
            </article>
          ))}
        </div>
        <div className="work-counter" aria-hidden="true">
          {projects.map((project, index) => <i className={index === 0 ? "active" : ""} key={project.name} />)}
        </div>
      </div>
    </section>
  );
}

function WhyQrfds() {
  const reasons = [
    ["01", "Engineering depth", "Senior technical judgment where it matters—from architecture to the last interaction."],
    ["02", "Product instinct", "We question assumptions, reduce complexity, and keep every decision tied to user value."],
    ["03", "Built for change", "Clean systems, composable foundations, and documentation that let your product evolve."],
    ["04", "True partnership", "A small, accountable team that communicates clearly and stays close after launch."],
  ];

  return (
    <section className="why section-paper">
      <div className="page-shell">
        <div className="why-heading reveal">
          <p className="eyebrow">04 / Why QRFDS</p>
          <h2>Sharp thinking.<br /><em>Solid systems.</em></h2>
          <p>We bring the rigor of an engineering partner and the taste of a product studio.</p>
        </div>
        <div className="why-grid">
          {reasons.map(([number, title, body]) => (
            <article className="why-card reveal" key={number}>
              <div><span>{number}</span><i /></div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="process section-dark" id="process">
      <div className="page-shell process-layout">
        <aside className="process-intro">
          <p className="eyebrow">05 / The process</p>
          <h2>Clarity at<br />every <em>turn.</em></h2>
          <p>
            No black box. You see the work, understand the tradeoffs, and know
            exactly where the product is going.
          </p>
          <div className="process-dial" aria-hidden="true">
            <span>QRFDS</span>
            <i /><i /><i />
          </div>
        </aside>
        <div className="process-steps">
          {process.map(([number, title, body]) => (
            <article className="process-step" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
              <i><Arrow diagonal /></i>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Expertise() {
  return (
    <section className="expertise section-dark">
      <div className="page-shell expertise-heading reveal">
        <p className="eyebrow">06 / Technology</p>
        <h2>The right stack.<br />Not just the <em>trendy one.</em></h2>
        <p>
          We choose proven, modern technology around your users, constraints,
          and growth—not our résumé.
        </p>
      </div>
      <div className="expertise-marquee" aria-label="Technologies we work with">
        <div>
          {[...expertise, ...expertise].map((item, index) => (
            <span aria-hidden={index >= expertise.length} key={`${item}-${index}`}>{item}<i /></span>
          ))}
        </div>
      </div>
      <div className="page-shell expertise-note reveal">
        <span>Web</span><span>Mobile</span><span>Cloud</span><span>AI</span>
        <p>Technology is the material.<br />The product is the point.</p>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about section-cobalt" id="about">
      <div className="about-grid" aria-hidden="true" />
      <div className="page-shell about-content">
        <p className="eyebrow reveal">07 / Our point of view</p>
        <h2 className="reveal">
          We believe the best software feels <em>inevitable</em>—simple on the
          surface, formidable underneath.
        </h2>
        <div className="about-foot reveal">
          <p>
            QRFDS is an independent software company for founders and teams with
            complex ideas and high standards.
          </p>
          <p>
            We work closely, think in systems, and care about the details users
            may never notice—but always feel.
          </p>
        </div>
      </div>
      <div className="about-stamp" aria-hidden="true">
        <span>THINK · MAKE · REFINE · SCALE · </span>
        <b>Q</b>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact section-paper" id="contact">
      <div className="contact-glow" aria-hidden="true" />
      <div className="page-shell contact-content">
        <p className="eyebrow reveal">Have an idea worth building?</p>
        <h2 className="reveal">Let&apos;s make it<br /><em>real.</em></h2>
        <div className="contact-row reveal">
          <a href="mailto:info@qrfds.com">
            <span>Start a conversation</span>
            <strong>info@qrfds.com</strong>
            <i><Arrow diagonal /></i>
          </a>
          <p>
            Tell us where you&apos;re headed. We&apos;ll reply with clear next steps,
            usually within two business days.
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer section-paper">
      <div className="page-shell footer-main">
        <Logo footer />
        <div className="footer-nav">
          <div><span>Explore</span><a href="#services">Services</a><a href="#work">Work</a><a href="#about">About</a><a href="#process">Process</a></div>
          <div><span>Connect</span><a href="mailto:info@qrfds.com">Email</a><a href="https://www.linkedin.com/company/qrfds/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/qrfds" target="_blank" rel="noreferrer">GitHub</a></div>
        </div>
      </div>
      <div className="page-shell footer-bottom">
        <span>© 2026 QRFDS. All rights reserved.</span>
        <span>Independent software company · qrfds.com</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}

function PortfolioContent() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    ScrollTrigger.config({ ignoreMobileResize: true });

    let lenis: Lenis | null = null;
    const lenisFrame = (time: number) => lenis?.raf(time * 1000);

    const media = gsap.matchMedia();
    let refreshFrame = 0;
    let resizeTimer = 0;
    let isMounted = true;
    let viewportWidth = window.innerWidth;

    const refreshScrollTriggers = () => {
      window.cancelAnimationFrame(refreshFrame);
      refreshFrame = window.requestAnimationFrame(() => {
        lenis?.resize();
        ScrollTrigger.refresh(true);
      });
    };

    const refreshAfterResize = () => {
      const nextWidth = window.innerWidth;
      const isMobileHeightOnlyResize = nextWidth < 768 && Math.abs(nextWidth - viewportWidth) < 2;
      viewportWidth = nextWidth;
      if (isMobileHeightOnlyResize) return;

      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        gsap.matchMediaRefresh();
        refreshScrollTriggers();
      }, 150);
    };

    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") refreshScrollTriggers();
    };

    const context = gsap.context(() => {
      media.add({ mobile: "(max-width: 767px)", desktop: "(min-width: 768px)", portrait: "(orientation: portrait)" }, ({ conditions }) => {
        const isMobile = conditions?.mobile ?? false;

        if (!isMobile) {
          lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.9 });
          lenis.on("scroll", ScrollTrigger.update);
          gsap.ticker.add(lenisFrame);
          gsap.ticker.lagSmoothing(0);
        }

        gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
          gsap.fromTo(
            element,
            { y: isMobile ? 36 : 72, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.15,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 88%", once: true },
            },
          );
        });

        gsap.timeline({
          defaults: { force3D: true },
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom bottom", scrub: 1.2 },
        })
          .to(".hero-media img", { scale: isMobile ? 1.1 : 1.2, yPercent: isMobile ? 4 : 7, ease: "none" }, 0)
          .to(".hero-media-veil", { opacity: 0.68, ease: "none" }, 0)
          .to(".hero-title", { yPercent: isMobile ? -12 : -22, opacity: 0.08, ease: "none" }, 0)
          .to(".hero-bottom", { yPercent: isMobile ? -18 : -35, opacity: 0, ease: "none" }, 0)
          .to(".orbit-a", { rotate: isMobile ? 32 : 60, scale: isMobile ? 1.1 : 1.2, ease: "none" }, 0)
          .to(".orbit-b", { rotate: isMobile ? -26 : -48, scale: isMobile ? 0.9 : 0.8, ease: "none" }, 0)
          .to(".node-a", { xPercent: -140, yPercent: -90, ease: "none" }, 0)
          .to(".node-b", { xPercent: 120, yPercent: 75, ease: "none" }, 0);

        {
          const track = document.querySelector<HTMLElement>(".services-track");
          if (track) {
            gsap.to(track, {
              x: () => -(track.scrollWidth - window.innerWidth + window.innerWidth * 0.08),
              ease: "none",
              scrollTrigger: {
                trigger: ".services",
                start: "top top",
                end: () => `+=${Math.max(track.scrollWidth * (isMobile ? 0.58 : 0.72), window.innerHeight * (isMobile ? 1.8 : 2.5))}`,
                pin: ".services-pin",
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });
            gsap.to(".services-progress b", {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: ".services",
                start: "top top",
                end: () => `+=${Math.max(track.scrollWidth * (isMobile ? 0.58 : 0.72), window.innerHeight * (isMobile ? 1.8 : 2.5))}`,
                scrub: true,
              },
            });
          }
        }

        {
          const orbitX = window.innerWidth * (isMobile ? 0.6 : 0.46);
          const orbitY = window.innerHeight * (isMobile ? 0.06 : 0.13);
          const orbitApex = window.innerHeight * (isMobile ? -0.03 : -0.1);
          const orbitUnderside = window.innerHeight * (isMobile ? 0.3 : 0.46);
          const cards = gsap.utils.toArray<HTMLElement>(".featured-card-position");
          const captions = gsap.utils.toArray<HTMLElement>(".featured-caption-copy");
          const slots = [
            { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, zIndex: 4 },
            { x: -orbitX, y: orbitY, rotation: -24, scale: 0.82, opacity: 0.5, zIndex: 2 },
            { x: -orbitX * 0.28, y: orbitUnderside, rotation: -8, scale: 0.42, opacity: 0.06, zIndex: 1 },
            { x: orbitX * 0.28, y: orbitUnderside, rotation: 8, scale: 0.42, opacity: 0.06, zIndex: 1 },
            { x: orbitX, y: orbitY, rotation: 24, scale: 0.82, opacity: 0.48, zIndex: 2 },
          ];
          const initialSlots = [0, 4, 3, 2, 1];
          gsap.set(cards, { xPercent: -50, yPercent: -50 });
          gsap.set(captions.slice(1), { autoAlpha: 0, y: 18 });

          const featuredIntro = gsap.timeline({
            defaults: { force3D: true },
            scrollTrigger: {
              trigger: ".featured-products",
              start: "top bottom",
              end: "top top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          featuredIntro.fromTo(
            ".featured-stage .outline-type",
            { scale: 0.46, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.85, ease: "power2.out" },
            0,
          );

          cards.forEach((card, index) => {
            const target = slots[initialSlots[index]];
            featuredIntro.fromTo(card, {
              x: target.x,
              y: target.y,
              rotation: target.rotation,
              scale: 0.12,
              opacity: 0,
              zIndex: target.zIndex,
            }, {
              ...target,
              duration: 1,
              ease: "power2.out",
            }, index === 0 ? 0.02 : 0.12);
          });

          featuredIntro
            .fromTo(captions[0], { scale: 0.5, z: -900, opacity: 0 }, { scale: 1, z: 0, opacity: 1, duration: 0.62, ease: "power2.out" }, 0.32)
            .fromTo(".featured-stage .transaction-step i", { scale: 0.5 }, { scale: 1.18, backgroundColor: "#42B6C9", stagger: 0.08, yoyo: true, repeat: 1, duration: 0.16 }, 0.62);

          const featuredTimeline = gsap.timeline({
            defaults: { force3D: true },
            scrollTrigger: {
              trigger: ".featured-products",
              start: "top top",
              end: isMobile ? "+=420%" : "+=500%",
              pin: true,
              scrub: 1.15,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          const pathsForMove = (from: number, to: number) => {
            if (from === 0 && to === 1) return [{ x: 0, y: 0 }, { x: -orbitX * 0.52, y: orbitApex }, { x: -orbitX, y: orbitY }];
            if (from === 4 && to === 0) return [{ x: orbitX, y: orbitY }, { x: orbitX * 0.52, y: orbitApex }, { x: 0, y: 0 }];
            if (from === 1 && to === 2) return [{ x: -orbitX, y: orbitY }, { x: -orbitX * 0.62, y: orbitUnderside * 0.72 }, { x: -orbitX * 0.28, y: orbitUnderside }];
            if (from === 2 && to === 3) return [{ x: -orbitX * 0.28, y: orbitUnderside }, { x: 0, y: orbitUnderside * 1.08 }, { x: orbitX * 0.28, y: orbitUnderside }];
            return [{ x: orbitX * 0.28, y: orbitUnderside }, { x: orbitX * 0.62, y: orbitUnderside * 0.72 }, { x: orbitX, y: orbitY }];
          };

          for (let step = 0; step < 4; step += 1) {
            const time = 0.18 + step * 1.02;
            cards.forEach((card, cardIndex) => {
              const currentSlot = (initialSlots[cardIndex] + step) % 5;
              const nextSlot = (currentSlot + 1) % 5;
              const target = slots[nextSlot];
              featuredTimeline
                .set(card, { zIndex: target.zIndex }, time)
                .to(card, {
                  motionPath: { path: pathsForMove(currentSlot, nextSlot), curviness: 2 },
                  rotation: target.rotation,
                  scale: target.scale,
                  opacity: target.opacity,
                  duration: 0.92,
                  ease: "power1.inOut",
                }, time);
            });

            featuredTimeline
              .to(captions[step], { autoAlpha: 0, y: -18, duration: 0.22, ease: "power1.in" }, time + 0.16)
              .fromTo(captions[step + 1], { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" }, time + 0.48);
          }

          featuredTimeline
            .to(".featured-card-scene", { scale: 1.58, opacity: 0, duration: 0.9, ease: "power2.in" }, 4.28)
            .to(".featured-captions", { scale: 1.38, z: 520, opacity: 0, duration: 0.7, ease: "power2.in" }, 4.4)
            .to(".featured-stage .outline-type", { scale: 1.24, opacity: 0, duration: 0.7, ease: "power2.in" }, 4.4);
        }

        {
          const panels = gsap.utils.toArray<HTMLElement>(".work-panel");
          const dots = gsap.utils.toArray<HTMLElement>(".work-counter i");
          gsap.set(panels, { zIndex: (index) => index + 1 });
          gsap.set(panels.slice(1), { yPercent: 100, autoAlpha: 0 });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: ".work",
              start: "top top",
              end: () => `+=${Math.max((panels.length - 1) * window.innerHeight * (isMobile ? 0.62 : 0.78), window.innerHeight * (isMobile ? 2.2 : 2.6))}`,
              pin: ".work-stage",
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          panels.slice(1).forEach((panel, index) => {
            const start = index * 1.2 + 0.35;
            timeline
              .to(panels[index].querySelector(".project-copy"), { y: -80, opacity: 0, duration: 0.35 }, start)
              .set(panel, { autoAlpha: 1 }, start)
              .to(panel, { yPercent: 0, duration: 0.9, ease: "power2.inOut", force3D: true }, start)
              .fromTo(panel.querySelector(".project-copy"), { y: 90, opacity: 0 }, { y: 0, opacity: 1, duration: 0.72, ease: "power2.out" }, start + 0.18)
              .fromTo(panel.querySelector(".project-orb-primary"), { yPercent: 28 }, { yPercent: 0, duration: 0.9, ease: "power2.out", force3D: true }, start)
              .fromTo(panel.querySelector(".project-echo-a"), { xPercent: -5 }, { xPercent: 0, duration: 0.9, ease: "power1.out", force3D: true }, start)
              .set(panels[index], { autoAlpha: 0 }, start + 0.9)
              .set(dots[index], { className: "" }, start + 0.52)
              .set(dots[index + 1], { className: "active" }, start + 0.52);
          });
        }

        gsap.utils.toArray<HTMLElement>(".process-step").forEach((step) => {
          gsap.fromTo(step, { opacity: 0.24 }, {
            opacity: 1,
            scrollTrigger: { trigger: step, start: "top 68%", end: "bottom 38%", scrub: true },
          });
        });

        gsap.to(".about-grid", {
          x: isMobile ? 48 : 120,
          y: isMobile ? 32 : 80,
          force3D: true,
          ease: "none",
          scrollTrigger: { trigger: ".about", start: "top bottom", end: "bottom top", scrub: 1 },
        });
        gsap.to(".about-stamp", {
          rotate: 48,
          ease: "none",
          scrollTrigger: { trigger: ".about", start: "top bottom", end: "bottom top", scrub: 1 },
        });

        return () => {
          gsap.ticker.remove(lenisFrame);
          lenis?.destroy();
          lenis = null;
        };
      });
    }, root);

    window.addEventListener("load", refreshScrollTriggers);
    window.addEventListener("resize", refreshAfterResize);
    window.addEventListener("orientationchange", refreshScrollTriggers);
    screen.orientation?.addEventListener("change", refreshScrollTriggers);
    window.addEventListener("pageshow", refreshScrollTriggers);
    document.addEventListener("visibilitychange", refreshWhenVisible);
    document.fonts?.addEventListener("loadingdone", refreshScrollTriggers);
    document.fonts?.ready.then(() => {
      if (isMounted) refreshScrollTriggers();
    });

    refreshScrollTriggers();

    return () => {
      isMounted = false;
      window.cancelAnimationFrame(refreshFrame);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("load", refreshScrollTriggers);
      window.removeEventListener("resize", refreshAfterResize);
      window.removeEventListener("orientationchange", refreshScrollTriggers);
      screen.orientation?.removeEventListener("change", refreshScrollTriggers);
      window.removeEventListener("pageshow", refreshScrollTriggers);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
      document.fonts?.removeEventListener("loadingdone", refreshScrollTriggers);
      gsap.ticker.remove(lenisFrame);
      lenis?.destroy();
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <main className="qrfds-site" ref={root}>
      <Header />
      <Hero />
      <SignalStrip />
      <Introduction />
      <Services />
      <SystemsShowcase />
      <Work />
      <WhyQrfds />
      <Process />
      <Expertise />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}

export default function Portfolio() {
  return <PortfolioContent />;
}
