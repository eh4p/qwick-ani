"use client";

import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

const disciplines = [
  ["PRODUCT ENGINEERING", "From a rough idea to a focused, shippable product."],
  ["FRONTEND SYSTEMS", "Expressive interfaces with quiet, dependable foundations."],
  ["BACKEND & APIS", "Resilient services, thoughtful models, and clean contracts."],
  ["CLOUD DELIVERY", "Automated paths from commit to observable production."],
];

const projects = [
  {
    index: "01",
    title: "Orbit Finance",
    type: "Fintech platform",
    description:
      "A calm command center that turns complex financial activity into decisions teams can make in seconds.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    variant: "finance",
  },
  {
    index: "02",
    title: "Pulse Ops",
    type: "Realtime operations",
    description:
      "A live operations workspace that keeps field teams, events, and critical alerts moving as one system.",
    tags: ["React", "Node.js", "WebSockets"],
    variant: "pulse",
  },
  {
    index: "03",
    title: "Nexus AI",
    type: "Knowledge assistant",
    description:
      "A cited knowledge layer that helps specialists find, compare, and act on the right internal context.",
    tags: ["Python", "FastAPI", "Vector search"],
    variant: "nexus",
  },
];

const stack = [
  ["TS", "TypeScript", "18deg", "37%"],
  ["NX", "Next.js", "72deg", "44%"],
  ["RE", "React", "126deg", "38%"],
  ["NO", "Node.js", "180deg", "45%"],
  ["PG", "Postgres", "234deg", "39%"],
  ["AW", "Cloud", "288deg", "44%"],
];

const values = [
  {
    number: "01",
    title: "Clarity before complexity",
    body: "The best technical decision is the one a team can understand, maintain, and confidently change.",
  },
  {
    number: "02",
    title: "Motion with meaning",
    body: "Interaction should reveal hierarchy, confirm intent, and make the product feel instantly legible.",
  },
  {
    number: "03",
    title: "Built for the real world",
    body: "Performance, accessibility, failure states, and operability are product features—not final polish.",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true">
      <path d="m10.5 7-6 7 6 7M17.5 7l6 7-6 7M16 4l-4 20" />
    </svg>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`brand ${compact ? "brand-compact" : ""}`} href="#top" aria-label="Ehab — back to top">
      <span className="brand-mark">E</span>
      {!compact && <span className="brand-name">EHAB</span>}
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
        <Brand />
        <div className="header-actions">
          <button
            className="menu-trigger"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span>{menuOpen ? "CLOSE" : "MENU"}</span>
            <span className={`menu-plus ${menuOpen ? "is-open" : ""}`} aria-hidden="true" />
          </button>
          <motion.a
            className="pill-button header-cta"
            href="mailto:ehab.dev@example.com"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            GET IN TOUCH
          </motion.a>
          <span className="availability-dot" aria-label="Available for select projects">
            <span />
          </span>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="menu-overlay"
            id="site-menu"
            initial={{ clipPath: "circle(0% at 94% 5%)" }}
            animate={{ clipPath: "circle(145% at 94% 5%)" }}
            exit={{ clipPath: "circle(0% at 94% 5%)" }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="menu-grid">
              <span className="eyebrow">EXPLORE / 2026</span>
              <nav aria-label="Main navigation">
                {[
                  ["01", "Home", "#top"],
                  ["02", "Selected work", "#work"],
                  ["03", "Approach", "#approach"],
                  ["04", "Contact", "#contact"],
                ].map(([number, label, href]) => (
                  <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                    <span>{number}</span>
                    {label}
                    <ArrowIcon />
                  </a>
                ))}
              </nav>
              <p>Software engineering for products that need to feel as considered as they are capable.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CodeCore() {
  return (
    <div className="code-core-shell" aria-label="Animated software engineering code core">
      <div className="core-halo halo-one" />
      <div className="core-halo halo-two" />
      <svg className="core-orbits" viewBox="0 0 640 640" aria-hidden="true">
        <defs>
          <linearGradient id="orbitGradient" x1="0" x2="1">
            <stop offset="0" stopColor="#ff3dbf" />
            <stop offset="0.5" stopColor="#9964ff" />
            <stop offset="1" stopColor="#39bdf8" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g className="orbit-group orbit-group-a" fill="none" stroke="url(#orbitGradient)">
          <path d="M116 338C79 214 200 108 333 126c149 20 226 192 150 314-75 120-278 114-347-5-33-57-41-129-20-192" />
          <path d="M150 423C67 327 136 168 269 126c128-41 281 57 283 202 2 143-156 241-283 196-58-20-99-58-119-101Z" />
        </g>
        <g className="orbit-group orbit-group-b" fill="none" stroke="url(#orbitGradient)">
          <path d="M116 280c32-136 205-203 322-122 128 89 105 287-31 357-131 68-302-33-303-181 0-19 3-37 12-54Z" />
          <path d="M198 136c111-62 270-4 320 115 50 120-35 269-162 287-129 19-255-90-231-223 14-77 41-139 73-179Z" />
        </g>
        <circle cx="320" cy="320" r="205" />
        <circle cx="320" cy="320" r="249" opacity=".35" />
        <circle cx="320" cy="320" r="285" opacity=".15" />
      </svg>
      <div className="core-terminal">
        <div className="terminal-top"><i /><i /><i /><span>ehab/core.ts</span></div>
        <div className="terminal-code" aria-hidden="true">
          <span><b>const</b> idea = <em>await</em> listen();</span>
          <span><b>return</b> craft(idea)</span>
          <span className="code-indent">.withClarity()</span>
          <span className="code-indent">.ship(); <i>▋</i></span>
        </div>
        <div className="terminal-status"><span /> SYSTEMS ONLINE</div>
      </div>
      <div className="core-node node-one">API</div>
      <div className="core-node node-two">UI</div>
      <div className="core-node node-three">DB</div>
      <div className="core-node node-four">01</div>
    </div>
  );
}

function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const moveCore = (event: ReactPointerEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const x = (event.clientX / window.innerWidth - 0.5) * 18;
    const y = (event.clientY / window.innerHeight - 0.5) * 18;
    gsap.to(".code-core-shell", { x, y, duration: 1.2, ease: "power3.out" });
  };

  return (
    <section className="hero" id="top" ref={heroRef} onPointerMove={moveCore}>
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-copy gsap-reveal">
        <p className="eyebrow"><span /> SOFTWARE ENGINEER · OPEN TO REMOTE</p>
        <h1>
          MEET EHAB,
          <br />YOUR <span>LIMITLESS</span>
          <br />SOFTWARE
          <br />ENGINEER
        </h1>
        <p className="hero-intro">
          I DESIGN AND ENGINEER DIGITAL PRODUCTS THAT TURN AMBITIOUS IDEAS INTO FAST, RESILIENT, AND DELIGHTFULLY HUMAN SOFTWARE.
        </p>
      </div>

      <div className="hero-core gsap-reveal">
        <CodeCore />
      </div>

      <div className="hero-disciplines gsap-reveal">
        <p className="eyebrow">EHAB FOR</p>
        {disciplines.map(([title, body], index) => (
          <a href="#work" key={title}>
            <span className="discipline-number">0{index + 1}</span>
            <span><b>{title}</b><small>{body}</small></span>
          </a>
        ))}
      </div>

      <a className="scroll-cue" href="#work" aria-label="Scroll to selected work">
        <span>SCROLL TO EXPLORE</span>
        <i><ArrowIcon /></i>
      </a>
    </section>
  );
}

function AssistantFeatureCard() {
  return (
    <div className="lia-feature-card lia-assistant-card">
      <div className="lia-glass-panel assistant-panel">
        <div className="assistant-label"><span className="assistant-logo">E</span> EHAB · Assistant</div>
        <p>How can I help today? Ask anything — from shaping a product to shipping the code.</p>
        <div className="assistant-thinking"><i /><i /><i /></div>
        <div className="assistant-actions">
          <span><b>◇</b> Create interface</span>
          <span><b>▧</b> Summarize brief</span>
          <span><b>✣</b> Generate</span>
        </div>
        <div className="assistant-input"><b>＋</b><span>Ask anything…</span><i>⌘</i></div>
      </div>
      <div className="assistant-watch"><i>▶</i> Watch build</div>
      <div className="assistant-code-orb"><CodeIcon /></div>
    </div>
  );
}

function TransactionFeatureCard() {
  return (
    <div className="lia-feature-card lia-transaction-card">
      <div className="transaction-sheen" />
      <div className="transaction-content">
        <div className="transaction-progress">
          {["Discover", "Design", "Build", "Ship"].map((step, index) => (
            <span className={`transaction-step step-${index + 1}`} key={step}>
              <i>{index === 0 ? "✓" : ""}</i>{step}<b />
            </span>
          ))}
        </div>
        <div className="transaction-project">
          <span className="project-thumbnail"><i /><i /><i /></span>
          <span><small>FEATURED BUILD</small><strong>Orbit Finance · Platform</strong><em>Next.js → Node.js&nbsp;&nbsp; · &nbsp;&nbsp;3 services</em></span>
        </div>
        <div className="transaction-result">
          <span><i /> Production confirmed</span><strong>99.98%</strong>
        </div>
      </div>
    </div>
  );
}

function LanguageFeatureCard() {
  return (
    <div className="lia-feature-card lia-language-card">
      <div className="language-panel">
        <div className="language-status"><i /> EHAB · Responding in your stack</div>
        <div className="language-detected"><span>◆</span><b>TypeScript</b><small>DETECTED</small></div>
        <div className="language-message user-message">Can you make this experience feel more alive?</div>
        <div className="language-reply"><span>E</span><p><small>EHAB</small>Absolutely. I&apos;ll make every layer arrive with purpose.</p></div>
        <div className="language-tags">React · Node.js · Python · PostgreSQL · Cloud · APIs</div>
      </div>
    </div>
  );
}

function WorkIntro() {

  return (
    <section className="work-intro" id="work">
      <div className="feature-stage">
        <div className="outline-type" aria-hidden="true">
          <span>OUR FEATURES</span><span>POWERED BY AI</span>
        </div>
        <div className="feature-vignette" />
        <div className="feature-card-scene">
          <div className="feature-card-position feature-card-left"><AssistantFeatureCard /></div>
          <div className="feature-card-position feature-card-center"><TransactionFeatureCard /></div>
          <div className="feature-card-position feature-card-right"><LanguageFeatureCard /></div>
        </div>
        <div className="showcase-caption">
          <h2>End-to-End Product Delivery</h2>
          <div className="caption-signal"><i /><i /><i /></div>
          <p>Shape, engineer, and ship the entire product flow—from first idea to reliable production.</p>
          <a className="text-link" href="#projects">EXPLORE THE BUILDS <ArrowIcon /></a>
        </div>
      </div>
    </section>
  );
}

function ProjectVisual({ variant }: { variant: string }) {
  return (
    <div className={`project-visual visual-${variant}`}>
      <div className="visual-grid" />
      {variant === "finance" && (
        <>
          <div className="finance-orbit orbit-a" />
          <div className="finance-orbit orbit-b" />
          <div className="finance-balance"><small>TOTAL BALANCE</small><strong>$248,901</strong><span>+12.8% this month</span></div>
          <div className="finance-card"><span>EHAB / ORBIT</span><b>•••• 3042</b></div>
        </>
      )}
      {variant === "pulse" && (
        <>
          <div className="pulse-map">
            {["18%", "34%", "49%", "63%", "78%"].map((left, index) => (
              <i key={left} style={{ left, top: `${24 + (index % 3) * 22}%` }} />
            ))}
          </div>
          <div className="pulse-stat"><small>LIVE SIGNALS</small><strong>1,284</strong><span><i /> Synced now</span></div>
          <div className="pulse-log"><span>CAI-04</span><b>Nominal</b><span>DXB-12</span><b>Nominal</b><span>AMS-08</span><b>Review</b></div>
        </>
      )}
      {variant === "nexus" && (
        <>
          <div className="nexus-core"><span>N</span><i /><i /><i /></div>
          <div className="nexus-message message-a">What changed in the release?</div>
          <div className="nexus-message message-b"><b>12 sources compared</b><span>The new flow reduces setup time by 38%…</span></div>
          <div className="nexus-source">DOCS / TICKETS / CODE</div>
        </>
      )}
      <span className="visual-index">{variant === "finance" ? "01" : variant === "pulse" ? "02" : "03"}</span>
    </div>
  );
}

function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="projects-stage">
        <div className="projects-heading">
          <p className="eyebrow"><span /> SELECTED WORK</p>
          <h2>Three builds.<br /><em>One standard.</em></h2>
          <p>Useful, durable, and impossible to ignore.</p>
          <div className="project-scene-count"><span>01</span> / 03</div>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <ProjectVisual variant={project.variant} />
              <div className="project-copy">
                <div><span>{project.index} / 03</span><span>{project.type}</span></div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                <a className="project-link" href="#contact" aria-label={`Discuss a build like ${project.title}`}>
                  LET&apos;S TALK <ArrowIcon />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StackOrbit() {
  return (
    <section className="stack-section">
      <div className="stack-stage">
        <div className="stack-stars" aria-hidden="true" />
        <div className="stack-orbit">
          <div className="stack-ring ring-one" />
          <div className="stack-ring ring-two" />
          <div className="stack-ring ring-three" />
          {stack.map(([short, label, angle, distance]) => (
            <div
              className="stack-item"
              key={label}
              style={{ "--angle": angle, "--distance": distance } as CSSProperties}
            >
              <span>{short}</span><b>{label}</b>
            </div>
          ))}
          <div className="stack-center">
            <CodeIcon />
            <small>THE STACK</small>
            <strong>Tools chosen<br />for the problem.</strong>
          </div>
        </div>
        <div className="stack-statement">
          <span>Strong products are</span>
          <h2>built with tools that<br /><em>earn their place.</em></h2>
          <p>No cargo cults. No technology theatre. Just pragmatic choices built around the people and the product.</p>
        </div>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section className="approach" id="approach">
      <div className="approach-stage">
        <header className="section-header">
          <p className="eyebrow"><span /> THE OPERATING SYSTEM</p>
          <h2>How thoughtful software<br /><em>gets made.</em></h2>
        </header>
        <div className="value-list">
          {values.map((value) => (
            <article key={value.number} className="value-row">
              <span>{value.number}</span>
              <h3>{value.title}</h3>
              <p>{value.body}</p>
              <i><ArrowIcon /></i>
            </article>
          ))}
        </div>
        <div className="metrics">
          <div><strong>360°</strong><span>PRODUCT THINKING<br />FROM END TO END</span></div>
          <div><strong>0→1</strong><span>AMBIGUOUS IDEAS<br />INTO CLEAR PRODUCTS</span></div>
          <div><strong>∞</strong><span>CURIOSITY FOR<br />THE NEXT PROBLEM</span></div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-stars" aria-hidden="true" />
      <div className="contact-content">
        <p className="contact-kicker"><span>✦</span> START A CONVERSATION</p>
        <h2>Where ambitious ideas<br /><em>become working products.</em></h2>
        <p>Have a product to launch, a system to untangle, or an experience worth making unforgettable?</p>
        <motion.a
          className="contact-button"
          href="mailto:ehab.dev@example.com"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          LET&apos;S BUILD IT <ArrowIcon />
        </motion.a>
      </div>
      <div className="planet">
        <div className="planet-grid" />
        <div className="planet-glow" />
        <div className="planet-route route-one" />
        <div className="planet-route route-two" />
        <span className="planet-pin pin-one" />
        <span className="planet-pin pin-two" />
        <span className="planet-pin pin-three" />
      </div>
      <footer>
        <div>
          <Brand />
          <p>Built with clarity. Designed for momentum.</p>
          <span>© {new Date().getFullYear()} EHAB</span>
        </div>
        <div className="footer-status"><i /> AVAILABLE FOR SELECT PROJECTS</div>
        <div className="footer-links">
          <span>CONNECT</span>
          <a href="mailto:ehab.dev@example.com">EMAIL</a>
          <a href="#top">LINKEDIN</a>
          <a href="#top">GITHUB</a>
        </div>
      </footer>
    </section>
  );
}

function PortfolioContent() {
  const rootRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0 : 1.15,
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 0.9,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleY(${self.progress})`;
          }
        },
      });

      if (!prefersReducedMotion) {
        gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((element) => {
          gsap.fromTo(
            element,
            { scale: 0.72, z: -620, opacity: 0, filter: "blur(14px)" },
            {
              scale: 1,
              z: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1.15,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 84%", once: true },
            },
          );
        });

        gsap.timeline({
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 },
        })
          .to(".hero-copy", { scale: 1.35, z: 420, opacity: 0, filter: "blur(12px)", ease: "none" }, 0)
          .to(".hero-core", { scale: 2.2, z: 800, opacity: 0, filter: "blur(16px)", ease: "none" }, 0)
          .to(".hero-disciplines", { scale: 1.45, z: 520, opacity: 0, ease: "none" }, 0);

        media.add("(min-width: 801px)", () => {
          const orbitX = window.innerWidth * 0.46;
          const orbitY = window.innerHeight * 0.14;
          const orbitApex = window.innerHeight * -0.1;
          const orbitUnderside = window.innerHeight * 0.5;
          const featureTimeline = gsap.timeline({
            defaults: { force3D: false },
            scrollTrigger: { trigger: ".work-intro", start: "top top", end: "bottom bottom", scrub: 1.15 },
          });

          featureTimeline
            .set(".feature-card-position", { xPercent: -50, yPercent: -50 }, 0)
            .set(".feature-card-center", { zIndex: 4 }, 0)
            .set([".feature-card-left", ".feature-card-right"], { zIndex: 1 }, 0)
            .fromTo(".outline-type", { scale: 0.46, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.85, ease: "power2.out" }, 0)
            .fromTo(".feature-card-center", { x: 0, y: 0, rotation: 0, scale: 0.15, opacity: 0 }, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: 1.15, ease: "power2.out" }, 0.08)
            .fromTo(".feature-card-left", { x: -orbitX, y: orbitY, rotation: -24, scale: 0.12, opacity: 0 }, { x: -orbitX, y: orbitY, rotation: -24, scale: 0.82, opacity: 0.54, duration: 1.1, ease: "power2.out" }, 0.22)
            .fromTo(".feature-card-right", { x: orbitX, y: orbitY, rotation: 24, scale: 0.12, opacity: 0 }, { x: orbitX, y: orbitY, rotation: 24, scale: 0.82, opacity: 0.5, duration: 1.1, ease: "power2.out" }, 0.22)
            .fromTo(".showcase-caption", { scale: 0.5, z: -900, opacity: 0 }, { scale: 1, z: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, 0.58)
            .fromTo(".transaction-step i", { scale: 0.5 }, { scale: 1.18, backgroundColor: "#69eea3", stagger: 0.12, yoyo: true, repeat: 1, duration: 0.18 }, 1.05)

            // Transaction falls left, language rises from the right, assistant circles behind.
            .set(".feature-card-center", { zIndex: 2 }, 1.58)
            .set(".feature-card-right", { zIndex: 4 }, 1.58)
            .set(".feature-card-left", { zIndex: 1 }, 1.58)
            .to(".feature-card-center", { motionPath: { path: [{ x: 0, y: 0 }, { x: -orbitX * 0.52, y: orbitApex }, { x: -orbitX, y: orbitY }], curviness: 2 }, rotation: -24, scale: 0.82, opacity: 0.54, duration: 0.9, ease: "power1.inOut" }, 1.58)
            .to(".feature-card-right", { motionPath: { path: [{ x: orbitX, y: orbitY }, { x: orbitX * 0.52, y: orbitApex }, { x: 0, y: 0 }], curviness: 2 }, rotation: 0, scale: 1, opacity: 1, duration: 0.9, ease: "power1.inOut" }, 1.58)
            .to(".feature-card-left", { motionPath: { path: [{ x: -orbitX, y: orbitY }, { x: -orbitX * 0.5, y: orbitUnderside }, { x: 0, y: orbitUnderside }], curviness: 1.8 }, rotation: 0, scale: 0.44, opacity: 0.08, duration: 0.45, ease: "power1.in" }, 1.58)
            .to(".feature-card-left", { motionPath: { path: [{ x: 0, y: orbitUnderside }, { x: orbitX * 0.5, y: orbitUnderside }, { x: orbitX, y: orbitY }], curviness: 1.8 }, rotation: 24, scale: 0.82, opacity: 0.5, duration: 0.45, ease: "power1.out" }, 2.03)

            // Language falls left, assistant rises, transaction returns around the lower arc.
            .set(".feature-card-right", { zIndex: 2 }, 2.72)
            .set(".feature-card-left", { zIndex: 4 }, 2.72)
            .set(".feature-card-center", { zIndex: 1 }, 2.72)
            .to(".feature-card-right", { motionPath: { path: [{ x: 0, y: 0 }, { x: -orbitX * 0.52, y: orbitApex }, { x: -orbitX, y: orbitY }], curviness: 2 }, rotation: -24, scale: 0.82, opacity: 0.54, duration: 0.9, ease: "power1.inOut" }, 2.72)
            .to(".feature-card-left", { motionPath: { path: [{ x: orbitX, y: orbitY }, { x: orbitX * 0.52, y: orbitApex }, { x: 0, y: 0 }], curviness: 2 }, rotation: 0, scale: 1, opacity: 1, duration: 0.9, ease: "power1.inOut" }, 2.72)
            .to(".feature-card-center", { motionPath: { path: [{ x: -orbitX, y: orbitY }, { x: -orbitX * 0.5, y: orbitUnderside }, { x: 0, y: orbitUnderside }], curviness: 1.8 }, rotation: 0, scale: 0.44, opacity: 0.08, duration: 0.45, ease: "power1.in" }, 2.72)
            .to(".feature-card-center", { motionPath: { path: [{ x: 0, y: orbitUnderside }, { x: orbitX * 0.5, y: orbitUnderside }, { x: orbitX, y: orbitY }], curviness: 1.8 }, rotation: 24, scale: 0.82, opacity: 0.5, duration: 0.45, ease: "power1.out" }, 3.17)

            // Assistant falls left, transaction rises, language completes the orbit behind.
            .set(".feature-card-left", { zIndex: 2 }, 3.86)
            .set(".feature-card-center", { zIndex: 4 }, 3.86)
            .set(".feature-card-right", { zIndex: 1 }, 3.86)
            .to(".feature-card-left", { motionPath: { path: [{ x: 0, y: 0 }, { x: -orbitX * 0.52, y: orbitApex }, { x: -orbitX, y: orbitY }], curviness: 2 }, rotation: -24, scale: 0.82, opacity: 0.54, duration: 0.9, ease: "power1.inOut" }, 3.86)
            .to(".feature-card-center", { motionPath: { path: [{ x: orbitX, y: orbitY }, { x: orbitX * 0.52, y: orbitApex }, { x: 0, y: 0 }], curviness: 2 }, rotation: 0, scale: 1, opacity: 1, duration: 0.9, ease: "power1.inOut" }, 3.86)
            .to(".feature-card-right", { motionPath: { path: [{ x: -orbitX, y: orbitY }, { x: -orbitX * 0.5, y: orbitUnderside }, { x: 0, y: orbitUnderside }], curviness: 1.8 }, rotation: 0, scale: 0.44, opacity: 0.08, duration: 0.45, ease: "power1.in" }, 3.86)
            .to(".feature-card-right", { motionPath: { path: [{ x: 0, y: orbitUnderside }, { x: orbitX * 0.5, y: orbitUnderside }, { x: orbitX, y: orbitY }], curviness: 1.8 }, rotation: 24, scale: 0.82, opacity: 0.5, duration: 0.45, ease: "power1.out" }, 4.31)

            .to(".feature-card-scene", { scale: 1.58, opacity: 0, duration: 1.15, ease: "power2.in", force3D: false }, 5.02)
            .to(".showcase-caption", { scale: 1.38, z: 520, opacity: 0, filter: "blur(12px)", duration: 0.8, ease: "power2.in" }, 5.15)
            .to(".outline-type", { scale: 1.24, opacity: 0, duration: 0.8, ease: "power2.in" }, 5.15);

          const projectCards = gsap.utils.toArray<HTMLElement>(".project-card");
          const projectTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: ".projects",
              start: "top top",
              end: "bottom bottom",
              scrub: 1.1,
              onUpdate: (self) => {
                const count = Math.min(3, Math.floor(self.progress * 3) + 1);
                const counter = rootRef.current?.querySelector<HTMLElement>(".project-scene-count span");
                if (counter) counter.textContent = `0${count}`;
              },
            },
          });

          projectTimeline.fromTo(".projects-heading", { scale: 0.6, z: -800, opacity: 0 }, { scale: 1, z: 0, opacity: 1, duration: 0.5 }, 0);
          projectCards.forEach((card, index) => {
            const start = 0.35 + index * 1.25;
            projectTimeline
              .fromTo(card, { scale: 0.18, z: -1800, opacity: 0, filter: "blur(24px)" }, { scale: 1, z: 0, opacity: 1, filter: "blur(0px)", duration: 0.58, ease: "power2.out" }, start)
              .to(card, { scale: 1.48, z: 700, opacity: 0, filter: "blur(16px)", duration: 0.58, ease: "power2.in" }, start + 0.72);
          });
          projectTimeline.to(".projects-heading", { scale: 1.28, z: 420, opacity: 0, duration: 0.55 }, 3.55);

          gsap.timeline({
            scrollTrigger: { trigger: ".stack-section", start: "top top", end: "bottom bottom", scrub: 1.1 },
          })
            .fromTo(".stack-orbit", { scale: 0.16, z: -1800, opacity: 0, rotate: -20 }, { scale: 1, z: 0, opacity: 1, rotate: 0, duration: 1.2, ease: "power2.out" }, 0)
            .fromTo(".stack-statement", { scale: 0.42, z: -900, opacity: 0, filter: "blur(18px)" }, { scale: 1, z: 0, opacity: 1, filter: "blur(0px)", duration: 0.8 }, 0.4)
            .to(".stack-orbit", { scale: 1.72, z: 720, opacity: 0, filter: "blur(16px)", duration: 0.85, ease: "power2.in" }, 1.55)
            .to(".stack-statement", { scale: 1.4, z: 480, opacity: 0, duration: 0.7, ease: "power2.in" }, 1.65);

          const approachTimeline = gsap.timeline({
            scrollTrigger: { trigger: ".approach", start: "top top", end: "bottom bottom", scrub: 1.05 },
          });
          approachTimeline.fromTo(".section-header", { scale: 0.45, z: -1000, opacity: 0 }, { scale: 1, z: 0, opacity: 1, duration: 0.65 }, 0);
          gsap.utils.toArray<HTMLElement>(".value-row").forEach((row, index) => {
            approachTimeline.fromTo(row, { scale: 0.24, z: -1400, opacity: 0, filter: "blur(18px)" }, { scale: 1, z: 0, opacity: 1, filter: "blur(0px)", duration: 0.5 }, 0.35 + index * 0.28);
          });
          approachTimeline
            .fromTo(".metrics", { scale: 0.3, z: -1200, opacity: 0 }, { scale: 1, z: 0, opacity: 1, duration: 0.55 }, 1.15)
            .to(".approach-stage", { scale: 1.3, z: 480, opacity: 0, filter: "blur(12px)", duration: 0.75, ease: "power2.in" }, 2.15);
        });

        gsap.fromTo(".contact-content", { scale: 0.35, z: -1200, opacity: 0, filter: "blur(20px)" }, {
          scale: 1,
          z: 0,
          opacity: 1,
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: { trigger: ".contact", start: "top bottom", end: "center center", scrub: 1 },
        });
        gsap.fromTo(".planet", { scale: 0.52, opacity: 0 }, {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: { trigger: ".contact", start: "top bottom", end: "center center", scrub: 1 },
        });
      }
    }, rootRef);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <main className="portfolio" ref={rootRef}>
      <Header />
      <div className="scroll-progress" aria-hidden="true"><span ref={progressRef} /></div>
      <Hero />
      <WorkIntro />
      <Projects />
      <StackOrbit />
      <Approach />
      <Contact />
    </main>
  );
}

export default function Portfolio() {
  return <PortfolioContent />;
}
