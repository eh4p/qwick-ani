"use client";

import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type PointerEvent,
} from "react";

const collections = [
  ["MOVE", "Training, recovery, and every finish line."],
  ["LIVE", "Sleep, focus, and a calmer daily rhythm."],
  ["ROAM", "Navigation and safety beyond the signal."],
  ["CONNECT", "Calls, music, and messages at a glance."],
];

const products = [
  {
    index: "01",
    name: "AION Pulse",
    edition: "Everyday performance",
    price: "$349",
    description: "Our essential titanium smartwatch with precision health sensing, bright always-on display, and seven-day battery.",
    features: ["45 mm", "Titanium", "7-day battery"],
    image: "/watches/aion-pulse.png",
    alt: "Black AION Pulse smartwatch with electric lime activity rings",
    tone: "lime",
    badge: "BESTSELLER",
  },
  {
    index: "02",
    name: "AION Air",
    edition: "Light by design",
    price: "$299",
    description: "Remarkably light, quietly capable. Built for all-day comfort with advanced sleep, stress, and cycle insights.",
    features: ["41 mm", "Aluminum", "5-day battery"],
    image: "/watches/aion-air.png",
    alt: "Warm silver AION Air smartwatch with a sand woven band",
    tone: "sand",
    badge: "NEW",
  },
  {
    index: "03",
    name: "AION Ultra",
    edition: "Made for the wild",
    price: "$599",
    description: "A rugged navigation watch engineered for altitude, open water, long trails, and the days that refuse an itinerary.",
    features: ["49 mm", "Titanium", "14-day battery"],
    image: "/watches/aion-ultra.png",
    alt: "Graphite AION Ultra smartwatch with cyan navigation face",
    tone: "blue",
    badge: "ADVENTURE",
  },
];

const orbitFeatures = [
  ["HR", "Heart rate", "12deg", "38%"],
  ["OX", "Blood oxygen", "68deg", "44%"],
  ["SL", "Sleep score", "125deg", "38%"],
  ["GPS", "Dual-band GPS", "180deg", "45%"],
  ["TMP", "Temperature", "238deg", "39%"],
  ["SOS", "Emergency SOS", "298deg", "44%"],
];

const promises = [
  {
    number: "01",
    title: "Built to stay with you",
    body: "Premium materials, water resistance, and battery life measured in days—not hours.",
  },
  {
    number: "02",
    title: "Your health, kept private",
    body: "Your personal health data is encrypted, exportable, and never sold to advertisers.",
  },
  {
    number: "03",
    title: "Try it in your real life",
    body: "Wear it for 30 days. If it is not the right fit, returns are free and uncomplicated.",
  },
];

const featuredCaptions = [
  ["AION Pulse", "Your daily performance watch, tuned for training, recovery, and everything between.", "FROM $349"],
  ["AION Sense", "A calm, personal health companion that turns live signals into useful guidance.", "FROM $399"],
  ["AION Ultra", "Rugged titanium, dual-band navigation, and fourteen days of expedition-ready power.", "FROM $599"],
  ["AION Air", "Our lightest watch, designed for effortless all-day comfort and deeper nights.", "FROM $299"],
  ["AION Coach", "Adaptive goals and timely prompts that meet your energy instead of fighting it.", "INCLUDED WITH AION"],
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 8.5h14l-1 11H6l-1-11ZM9 9V6.5a3 3 0 0 1 6 0V9" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true">
      <path d="M3 15h5l2.5-7 5 13 3-9 2 3H25" />
    </svg>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`brand ${compact ? "brand-compact" : ""}`} href="#top" aria-label="AION — back to top">
      <span className="brand-mark"><i /></span>
      {!compact && <span className="brand-name">AION</span>}
    </a>
  );
}

function Header({ cartCount }: { cartCount: number }) {
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
        <div className="desktop-nav" aria-label="Primary navigation">
          <a href="#featured">FEATURED</a>
          <a href="#shop">WATCHES</a>
          <a href="#features">TECHNOLOGY</a>
          <a href="#service">WHY AION</a>
        </div>
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
          <a className="bag-button" href="#shop" aria-label={`Shopping bag with ${cartCount} items`}>
            <BagIcon />
            <span>BAG</span>
            <b aria-live="polite">{cartCount}</b>
          </a>
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
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="menu-grid">
              <span className="eyebrow">SHOP / AION</span>
              <nav aria-label="Menu navigation">
                {[
                  ["01", "Discover", "#top"],
                  ["02", "Featured", "#featured"],
                  ["03", "Shop watches", "#shop"],
                  ["04", "Technology", "#features"],
                  ["05", "Our promise", "#service"],
                ].map(([number, label, href]) => (
                  <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                    <span>{number}</span>
                    {label}
                    <ArrowIcon />
                  </a>
                ))}
              </nav>
              <div className="menu-note">
                <p>Time, tuned to you.</p>
                <span>Free delivery · 30-day returns</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function WatchFace() {
  return (
    <div className="watch-stage" aria-label="AION Pulse smartwatch">
      <div className="watch-orbit orbit-one" />
      <div className="watch-orbit orbit-two" />
      <div className="watch-orbit orbit-three" />
      <div className="hero-watch-image">
        <Image
          src="/watches/aion-pulse.png"
          alt="Black AION Pulse smartwatch"
          fill
          priority
          sizes="(max-width: 900px) 90vw, 50vw"
        />
      </div>
      <span className="watch-callout callout-one"><i /> 7 DAY BATTERY</span>
      <span className="watch-callout callout-two"><i /> TITANIUM CASE</span>
      <span className="watch-callout callout-three"><i /> HEALTH SENSORS</span>
    </div>
  );
}

function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const moveWatch = (event: PointerEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 18;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 18;
    gsap.to(".watch-stage", { x, y, duration: 1.2, ease: "power3.out" });
  };

  return (
    <section className="hero" id="top" ref={heroRef} onPointerMove={moveWatch}>
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-copy gsap-reveal">
        <p className="eyebrow"><span /> NEW · AION PULSE</p>
        <h1>
          YOUR TIME.
          <br />YOUR HEALTH.
          <br /><em>IN SYNC.</em>
        </h1>
        <p className="hero-intro">
          A SMARTWATCH DESIGNED TO HELP YOU MOVE WITH PURPOSE, RECOVER DEEPLY, AND STAY CLOSE TO WHAT MATTERS.
        </p>
        <div className="hero-actions">
          <motion.a className="primary-button" href="#shop" whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
            SHOP THE COLLECTION <ArrowIcon />
          </motion.a>
          <a className="text-button" href="#features">EXPLORE THE TECHNOLOGY</a>
        </div>
      </div>

      <div className="hero-product gsap-reveal">
        <WatchFace />
      </div>

      <div className="hero-collections gsap-reveal">
        <p className="eyebrow">MADE FOR</p>
        {collections.map(([title, body], index) => (
          <a href="#shop" key={title}>
            <span className="collection-number">0{index + 1}</span>
            <span><b>{title}</b><small>{body}</small></span>
          </a>
        ))}
      </div>

      <a className="scroll-cue" href="#discover" aria-label="Scroll to discover AION">
        <span>SCROLL TO DISCOVER</span>
        <i><ArrowIcon /></i>
      </a>
    </section>
  );
}

function BatteryFeatureCard() {
  return (
    <div className="feature-card battery-card">
      <div className="feature-card-top"><span>ENDURANCE</span><b>01</b></div>
      <div className="battery-dial"><span>7</span><small>DAYS</small><i /></div>
      <p>Charge less. Live more.</p>
      <small>From a full week of daily wear to a 14-day expedition mode.</small>
    </div>
  );
}

function HealthFeatureCard() {
  return (
    <div className="feature-card health-card">
      <div className="feature-card-top"><span>HEALTH</span><b>02</b></div>
      <div className="health-graph">
        {[36, 48, 43, 69, 55, 78, 62, 83, 58, 74, 52, 67].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
      </div>
      <div className="health-score"><span>72<small>BPM</small></span><b>LIVE</b></div>
      <p>Know your rhythm.</p>
    </div>
  );
}

function ServiceFeatureCard() {
  return (
    <div className="feature-card service-card">
      <div className="feature-card-top"><span>AION CARE</span><b>03</b></div>
      <div className="service-icon"><span>30</span><small>DAYS</small></div>
      <p>Try it. Really try it.</p>
      <small>Free delivery, simple setup, and complimentary 30-day returns.</small>
      <a href="#service">OUR PROMISE <ArrowIcon /></a>
    </div>
  );
}

function Discover() {
  return (
    <section className="discover" id="discover">
      <div className="discover-copy gsap-reveal">
        <p className="eyebrow"><span /> DESIGNED AROUND YOU</p>
        <h2>LESS SCREEN TIME.<br /><em>MORE LIFE IN IT.</em></h2>
        <p>AION filters the noise and brings forward the signals that help you feel, move, and live better.</p>
      </div>
      <div className="feature-card-track">
        <BatteryFeatureCard />
        <HealthFeatureCard />
        <ServiceFeatureCard />
      </div>
    </section>
  );
}

function CoachFeaturedCard() {
  return (
    <div className="lia-feature-card lia-assistant-card">
      <div className="lia-glass-panel assistant-panel">
        <div className="assistant-label"><span className="assistant-logo">A</span> AION · Coach</div>
        <p>Your recovery is trending up. Ready for a focused 32-minute run?</p>
        <div className="assistant-thinking"><i /><i /><i /></div>
        <div className="assistant-actions">
          <span><b>◇</b> Start workout</span>
          <span><b>▧</b> View readiness</span>
          <span><b>✣</b> Adjust goal</span>
        </div>
        <div className="assistant-input"><b>＋</b><span>Ask AION anything…</span><i>⌘</i></div>
      </div>
      <div className="assistant-watch"><i>▶</i> Start session</div>
      <div className="assistant-code-orb"><ActivityIcon /></div>
    </div>
  );
}

function PulseFeaturedCard() {
  return (
    <div className="lia-feature-card lia-transaction-card">
      <div className="transaction-sheen" />
      <div className="transaction-content">
        <div className="transaction-progress">
          {["Move", "Train", "Recover", "Repeat"].map((step, index) => (
            <span className={`transaction-step step-${index + 1}`} key={step}>
              <i>{index === 0 ? "✓" : ""}</i>{step}<b />
            </span>
          ))}
        </div>
        <div className="transaction-project">
          <span className="project-thumbnail"><i /><i /><i /></span>
          <span><small>FEATURED WATCH</small><strong>AION Pulse · Titanium</strong><em>45 mm&nbsp;&nbsp; · &nbsp;&nbsp;7-day battery</em></span>
        </div>
        <div className="transaction-result">
          <span><i /> Ready to ship</span><strong>$349</strong>
        </div>
      </div>
    </div>
  );
}

function SenseFeaturedCard() {
  return (
    <div className="lia-feature-card lia-language-card">
      <div className="language-panel">
        <div className="language-status"><i /> AION · Reading your rhythm</div>
        <div className="language-detected"><span>◆</span><b>Recovery</b><small>OPTIMAL</small></div>
        <div className="language-message user-message">How is my energy looking today?</div>
        <div className="language-reply"><span>A</span><p><small>AION SENSE</small>You recovered well. Your best training window begins at 5:30 PM.</p></div>
        <div className="language-tags">Heart rate · Sleep · Temperature · Stress · Oxygen · Readiness</div>
      </div>
    </div>
  );
}

function UltraFeaturedCard() {
  return (
    <div className="lia-feature-card lia-transaction-card lia-ultra-card">
      <div className="transaction-sheen" />
      <div className="transaction-content">
        <div className="transaction-progress">
          {["Plan", "Climb", "Navigate", "Return"].map((step, index) => (
            <span className={`transaction-step step-${index + 1}`} key={step}>
              <i>{index === 0 ? "✓" : ""}</i>{step}<b />
            </span>
          ))}
        </div>
        <div className="transaction-project">
          <span className="project-thumbnail ultra-thumbnail"><i /><i /><i /></span>
          <span><small>ADVENTURE EDITION</small><strong>AION Ultra · Graphite</strong><em>Dual-band GPS&nbsp;&nbsp; · &nbsp;&nbsp;100 m water resistant</em></span>
        </div>
        <div className="transaction-result">
          <span><i /> Expedition ready</span><strong>14 DAYS</strong>
        </div>
      </div>
    </div>
  );
}

function AirFeaturedCard() {
  return (
    <div className="lia-feature-card lia-assistant-card lia-air-card">
      <div className="lia-glass-panel assistant-panel">
        <div className="assistant-label"><span className="assistant-logo">A</span> AION Air · Sleep</div>
        <p>You slept 7h 48m with a steady heart rate and strong deep-sleep recovery.</p>
        <div className="assistant-thinking"><i /><i /><i /></div>
        <div className="assistant-actions">
          <span><b>◇</b> Sleep score 87</span>
          <span><b>▧</b> Resting HR 54</span>
          <span><b>✣</b> 3 insights</span>
        </div>
        <div className="assistant-input"><b>＋</b><span>View your sleep timeline</span><i>↗</i></div>
      </div>
      <div className="assistant-watch"><i>✓</i> Morning report</div>
      <div className="assistant-code-orb"><ActivityIcon /></div>
    </div>
  );
}

function FeaturedProducts() {
  return (
    <section className="featured-products" id="featured">
      <div className="featured-stage">
        <div className="outline-type" aria-hidden="true">
          <span>FEATURED</span><span>PRODUCTS</span>
        </div>
        <div className="feature-vignette" />
        <div className="featured-card-scene">
          <div className="featured-card-position"><PulseFeaturedCard /></div>
          <div className="featured-card-position"><SenseFeaturedCard /></div>
          <div className="featured-card-position"><UltraFeaturedCard /></div>
          <div className="featured-card-position"><AirFeaturedCard /></div>
          <div className="featured-card-position"><CoachFeaturedCard /></div>
        </div>
        <div className="featured-captions">
          {featuredCaptions.map(([title, body, detail], index) => (
            <div className={`featured-caption-copy ${index === 0 ? "is-active" : ""}`} key={title}>
              <h2>{title}</h2>
              <div className="caption-signal"><i /><i /><i /></div>
              <p>{body}</p>
              <a className="featured-text-link" href="#shop">{detail} <ArrowIcon /></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Products({ onAdd }: { onAdd: (name: string) => void }) {
  return (
    <section className="products" id="shop">
      <div className="products-heading">
        <p className="eyebrow"><span /> THE COLLECTION</p>
        <h2>FIND YOUR<br /><em>AION.</em></h2>
        <p>Three distinct designs.<br />One uncompromising standard.</p>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <article className={`product-card product-${product.tone}`} key={product.name}>
            <div className="product-visual">
              <div className="product-meta-top">
                <span>{product.badge}</span>
                <b>{product.index} / 03</b>
              </div>
              <Image
                className="product-image"
                src={product.image}
                alt={product.alt}
                fill
                sizes="(max-width: 800px) 92vw, 58vw"
              />
              <div className="product-quick"><span>FREE DELIVERY</span><span>2-YEAR WARRANTY</span></div>
            </div>
            <div className="product-copy">
              <div>
                <span>{product.edition}</span>
                <h3>{product.name}</h3>
              </div>
              <strong>{product.price}</strong>
              <p>{product.description}</p>
              <div className="product-features">
                {product.features.map((feature) => <span key={feature}>{feature}</span>)}
              </div>
              <motion.button type="button" onClick={() => onAdd(product.name)} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                ADD TO BAG <BagIcon />
              </motion.button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function AppPreview() {
  return (
    <div className="app-preview">
      <div className="app-top"><span>9:41</span><b>AION</b><i /></div>
      <div className="app-score">
        <div className="score-ring"><span>87<small>READY</small></span></div>
        <p>Good morning.<br /><b>You&apos;re ready to move.</b></p>
      </div>
      <div className="app-stats">
        <div><span>7h 48m</span><small>SLEEP</small></div>
        <div><span>54 bpm</span><small>RESTING HR</small></div>
        <div><span>+1.2°</span><small>TEMP</small></div>
      </div>
      <div className="app-chart"><i /><i /><i /><i /><i /><i /><i /><i /></div>
    </div>
  );
}

function Features() {
  return (
    <section className="features" id="features">
      <div className="feature-ambient" />
      <div className="features-copy gsap-reveal">
        <p className="eyebrow"><span /> AION INTELLIGENCE</p>
        <h2>THE SIGNALS<br /><em>THAT MATTER.</em></h2>
        <p>Advanced sensors become simple, useful guidance. No data overload. Just a clearer view of your energy, sleep, movement, and recovery.</p>
        <a className="primary-button light-button" href="#shop">COMPARE MODELS <ArrowIcon /></a>
      </div>
      <div className="app-device gsap-reveal"><AppPreview /></div>
      <div className="feature-orbit" aria-label="AION health and safety features">
        <div className="orbit-center"><span>AION</span><small>SENSE OS</small></div>
        {orbitFeatures.map(([short, name, angle, radius]) => (
          <div className="orbit-item" key={short} style={{ "--angle": angle, "--radius": radius } as CSSProperties}>
            <span>{short}</span><small>{name}</small>
          </div>
        ))}
      </div>
    </section>
  );
}

function PromiseSection() {
  return (
    <section className="promise" id="service">
      <div className="promise-heading gsap-reveal">
        <p className="eyebrow"><span /> WHY AION</p>
        <h2>GOOD TECH<br /><em>FEELS HUMAN.</em></h2>
      </div>
      <div className="promise-list">
        {promises.map((item) => (
          <article className="promise-row" key={item.number}>
            <span>{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <i><ArrowIcon /></i>
          </article>
        ))}
      </div>
      <div className="service-strip">
        {[["✓", "FREE EXPRESS DELIVERY"], ["↺", "30-DAY RETURNS"], ["＋", "2-YEAR WARRANTY"], ["◎", "24/7 MEMBER SUPPORT"]].map(([icon, label]) => (
          <div key={label}><span>{icon}</span><b>{label}</b></div>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="newsletter" id="newsletter">
      <div className="newsletter-glow" />
      <div className="newsletter-watch" aria-hidden="true">
        <Image src="/watches/aion-ultra.png" alt="" fill sizes="70vw" />
      </div>
      <div className="newsletter-content gsap-reveal">
        <p className="eyebrow"><span /> JOIN THE AION CIRCLE</p>
        <h2>MAKE EVERY<br /><em>SECOND COUNT.</em></h2>
        <p>Early access to new releases, guided challenges, and better habits—delivered thoughtfully.</p>
        {submitted ? (
          <div className="form-success" role="status">YOU&apos;RE IN. WELCOME TO AION.</div>
        ) : (
          <form onSubmit={submit}>
            <label className="sr-only" htmlFor="email">Email address</label>
            <input id="email" type="email" placeholder="YOUR EMAIL ADDRESS" required />
            <button type="submit" aria-label="Join the AION Circle"><ArrowIcon /></button>
          </form>
        )}
      </div>
      <footer>
        <Brand compact />
        <div className="footer-links">
          <a href="#shop">WATCHES</a><a href="#features">TECHNOLOGY</a><a href="#service">SUPPORT</a><a href="#newsletter">JOURNAL</a>
        </div>
        <span>© 2026 AION WEARABLES</span>
      </footer>
    </section>
  );
}

function PortfolioContent() {
  const root = useRef<HTMLElement>(null);
  const [cartCount, setCartCount] = useState(0);
  const [lastAdded, setLastAdded] = useState("");

  const addToBag = (name: string) => {
    setCartCount((count) => count + 1);
    setLastAdded(name);
    window.setTimeout(() => setLastAdded(""), 2200);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.9 });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((element) => {
          gsap.fromTo(element, { y: 80, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1.15, ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 86%", once: true },
          });
        });

        gsap.timeline({ scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.2 } })
          .to(".hero-copy", { yPercent: -26, opacity: 0.25 }, 0)
          .to(".hero-product", { yPercent: 24, scale: 0.82, rotate: 5 }, 0)
          .to(".watch-orbit", { rotate: 110 }, 0)
          .to(".hero-collections", { yPercent: -15, opacity: 0 }, 0);

        gsap.fromTo(".feature-card-track", { xPercent: 18 }, {
          xPercent: -7, ease: "none",
          scrollTrigger: { trigger: ".discover", start: "top bottom", end: "bottom top", scrub: 1.1 },
        });

        media.add({ mobile: "(max-width: 800px)", desktop: "(min-width: 801px)" }, ({ conditions }) => {
          const isMobile = conditions?.mobile ?? false;
          const orbitX = window.innerWidth * (isMobile ? 0.62 : 0.46);
          const orbitY = window.innerHeight * (isMobile ? 0.07 : 0.13);
          const orbitApex = window.innerHeight * (isMobile ? -0.04 : -0.1);
          const orbitUnderside = window.innerHeight * (isMobile ? 0.32 : 0.46);
          const cards = gsap.utils.toArray<HTMLElement>(".featured-card-position");
          const captions = gsap.utils.toArray<HTMLElement>(".featured-caption-copy");
          const slots = [
            { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, zIndex: 4 },
            { x: -orbitX, y: orbitY, rotation: -24, scale: 0.82, opacity: 0.54, zIndex: 2 },
            { x: -orbitX * 0.28, y: orbitUnderside, rotation: -8, scale: 0.42, opacity: 0.06, zIndex: 1 },
            { x: orbitX * 0.28, y: orbitUnderside, rotation: 8, scale: 0.42, opacity: 0.06, zIndex: 1 },
            { x: orbitX, y: orbitY, rotation: 24, scale: 0.82, opacity: 0.5, zIndex: 2 },
          ];
          const initialSlots = [0, 4, 3, 2, 1];
          gsap.set(cards, { xPercent: -50, yPercent: -50 });
          gsap.set(captions.slice(1), { autoAlpha: 0, y: 18 });

          const featuredIntro = gsap.timeline({
            defaults: { force3D: false },
            scrollTrigger: {
              trigger: ".featured-products",
              start: "top bottom",
              end: "top top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          featuredIntro.fromTo(".featured-stage .outline-type", { scale: 0.46, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.85, ease: "power2.out" }, 0);

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
            .fromTo(".featured-stage .transaction-step i", { scale: 0.5 }, { scale: 1.18, backgroundColor: "#c9ff3f", stagger: 0.08, yoyo: true, repeat: 1, duration: 0.16 }, 0.62);

          const featuredTimeline = gsap.timeline({
            defaults: { force3D: false },
            scrollTrigger: {
              trigger: ".featured-products",
              start: "top top",
              end: "+=500%",
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
            .to(".featured-captions", { scale: 1.38, z: 520, opacity: 0, filter: "blur(12px)", duration: 0.7, ease: "power2.in" }, 4.4)
            .to(".featured-stage .outline-type", { scale: 1.24, opacity: 0, duration: 0.7, ease: "power2.in" }, 4.4);
        });

        gsap.utils.toArray<HTMLElement>(".product-card").forEach((card) => {
          const image = card.querySelector(".product-image");
          gsap.fromTo(card, { y: 90, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1.1, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 82%", once: true },
          });
          gsap.fromTo(image, { yPercent: -6, scale: 1.07 }, {
            yPercent: 7, scale: 1, ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1.2 },
          });
        });

        gsap.timeline({ scrollTrigger: { trigger: ".features", start: "top 75%", end: "bottom 30%", scrub: 1 } })
          .fromTo(".app-device", { rotate: -10, y: 130 }, { rotate: 3, y: -40 }, 0)
          .fromTo(".feature-orbit", { rotate: -35, scale: 0.75 }, { rotate: 18, scale: 1 }, 0);

        gsap.utils.toArray<HTMLElement>(".promise-row").forEach((row, index) => {
          gsap.fromTo(row, { x: index % 2 ? 90 : -90, opacity: 0 }, {
            x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 88%", once: true },
          });
        });

        gsap.fromTo(".newsletter-watch", { yPercent: 25, scale: 0.72, rotate: -8 }, {
          yPercent: -15, scale: 1.04, rotate: 4, ease: "none",
          scrollTrigger: { trigger: ".newsletter", start: "top bottom", end: "bottom bottom", scrub: 1.2 },
        });
      });
    }, root);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <main className="storefront" ref={root}>
      <Header cartCount={cartCount} />
      <Hero />
      <Discover />
      <FeaturedProducts />
      <Products onAdd={addToBag} />
      <Features />
      <PromiseSection />
      <Newsletter />
      <AnimatePresence>
        {lastAdded && (
          <motion.div className="cart-toast" role="status" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}>
            <span>ADDED TO BAG</span><b>{lastAdded}</b>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function Portfolio() {
  return <PortfolioContent />;
}
