"use client";

import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
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
                  ["02", "Shop watches", "#shop"],
                  ["03", "Technology", "#features"],
                  ["04", "Our promise", "#service"],
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
    gsap.registerPlugin(ScrollTrigger);

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
