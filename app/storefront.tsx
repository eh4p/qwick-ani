"use client";

import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type FormEvent } from "react";
import { categories, faqs, products, testimonials, type Product } from "./store-data";
import { AccountOverlay, CartDrawer, QuickView, SearchOverlay, WishlistDrawer, type CartItem } from "./store-overlays";
import { BrandMark, Icon, Price, ProductArt } from "./store-ui";

gsap.registerPlugin(ScrollTrigger);

type Overlay = "cart" | "search" | "wishlist" | "account" | null;

function Loader({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 18%)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="loader-pattern" aria-hidden="true"><i /><i /><i /></div>
          <span>Pattern room / Cairo</span>
          <strong>SEAM<em>/03</em></strong>
          <small>Drawing the collection</small>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Header({
  cartCount,
  wishlistCount,
  onOpen,
}: {
  cartCount: number;
  wishlistCount: number;
  onOpen: (overlay: Exclude<Overlay, null>) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    ["01", "Shop", "#shop"],
    ["02", "Collections", "#collections"],
    ["03", "Method", "#method"],
    ["04", "Notes", "#reviews"],
  ];

  return (
    <>
      <header className="site-header">
        <BrandMark />
        <p className="header-edition">COLLECTION III — MATERIAL / MOTION</p>
        <div className="header-tools">
          <button type="button" aria-label="Search products" onClick={() => onOpen("search")}><Icon name="search" /><span>Search</span></button>
          <button className="desktop-tool" type="button" aria-label="Open account" onClick={() => onOpen("account")}><Icon name="account" /><span>Account</span></button>
          <button className="desktop-tool" type="button" aria-label={`Wishlist with ${wishlistCount} items`} onClick={() => onOpen("wishlist")}><Icon name="heart" /><span>Pins {wishlistCount}</span></button>
          <button className="cart-tool" type="button" aria-label={`Cart with ${cartCount} items`} onClick={() => onOpen("cart")}><Icon name="bag" /><span>Rail {String(cartCount).padStart(2, "0")}</span></button>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen((open) => !open)}><i /><i /></button>
        </div>
      </header>
      <nav className="selvedge-nav" aria-label="Primary navigation">
        <span aria-hidden="true">CM</span>
        {links.map(([number, label, href]) => <a key={href} href={href}><i>{number}</i><b>{label}</b></a>)}
      </nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div id="mobile-menu" className="mobile-menu" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}>
            <nav aria-label="Mobile navigation">{links.map(([number, label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}><small>{number}</small><span>{label}</span><Icon name="arrow" /></a>)}</nav>
            <div><button type="button" onClick={() => { onOpen("search"); setMenuOpen(false); }}>Search collection</button><button type="button" onClick={() => { onOpen("wishlist"); setMenuOpen(false); }}>Pins ({wishlistCount})</button><button type="button" onClick={() => { onOpen("account"); setMenuOpen(false); }}>Account</button></div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="chapter-progress" aria-hidden="true"><i /><span>THREAD / 00</span></div>
    </>
  );
}

function PatternStory({ onShop }: { onShop: () => void }) {
  return (
    <section className="pattern-story" aria-label="From line to garment">
      <div className="pattern-stage">
        <div className="pattern-grid" aria-hidden="true" />
        <div className="thread-progress" aria-hidden="true"><i /><i /><i /></div>

        <div className="story-scene hero-scene">
          <div className="hero-media"><Image src="/atelier/campaign-atelier.png" alt="Two models wearing cobalt and oxblood tailoring in the SEAM pattern room" fill priority sizes="100vw" /></div>
          <div className="hero-paper" aria-hidden="true"><span>P–03</span><i /><i /></div>
          <div className="hero-title">
            <p><span>Collection III</span> / Cairo pattern room</p>
            <h1>A line<br />becomes <em>a life.</em></h1>
            <button type="button" onClick={onShop}>Enter the cutting table <Icon name="arrow" /></button>
          </div>
          <div className="hero-margin-note"><span>Cloth has memory.</span><b>We cut with it,<br />not against it.</b></div>
          <div className="hero-measure" aria-hidden="true"><b>112</b><span>CM / FULL LENGTH</span></div>
        </div>

        <div className="story-scene draft-scene">
          <div className="draft-heading"><p>STEP 01 / DRAFT</p><h2>First, draw<br />what the body <em>might do.</em></h2></div>
          <div className="paper-piece paper-piece-a" aria-hidden="true"><span>FRONT / A</span><i /></div>
          <div className="paper-piece paper-piece-b" aria-hidden="true"><span>SLEEVE / B</span><i /></div>
          <div className="paper-piece paper-piece-c" aria-hidden="true"><span>BACK / C</span><i /></div>
          <ProductArt product={products[0]} className="draft-object" />
          <div className="draft-note draft-note-a"><i />One continuous shoulder</div>
          <div className="draft-note draft-note-b"><i />Soft canvas / no padding</div>
          <p className="draft-number" aria-hidden="true">01</p>
        </div>

        <div className="story-scene drape-scene">
          <div className="drape-image"><Image src="/atelier/campaign-atelier.png" alt="Oxblood cloth suspended across the atelier" fill sizes="100vw" /></div>
          <div className="drape-curtain" aria-hidden="true" />
          <div className="drape-copy"><p>STEP 02 / DRAPE</p><h2>The cloth<br /><em>answers back.</em></h2><span>Gravity is part of every pattern. We leave room for fabric to choose its own final line.</span></div>
          <div className="drape-words" aria-hidden="true"><span>WEIGHT</span><span>BIAS</span><span>FALL</span></div>
        </div>

        <div className="story-scene assemble-scene">
          <p className="assemble-step">STEP 03 / ASSEMBLE</p>
          <h2>Six pieces.<br />One <em>working wardrobe.</em></h2>
          <div className="assembly-line">
            {products.map((product) => <ProductArt key={product.id} product={product} />)}
          </div>
          <div className="assembly-index">
            {categories.map((category) => <div key={category.number}><span>{category.number}</span><b>{category.name}</b><small>{category.count}</small></div>)}
          </div>
          <button type="button" onClick={onShop}>Unpin the collection <Icon name="arrow" /></button>
        </div>

        <div className="story-caption" aria-hidden="true"><span>SCROLL / CUT / FOLD</span><i /></div>
      </div>
    </section>
  );
}

function ProductPattern({
  product,
  wished,
  onWish,
  onQuickView,
  onAdd,
}: {
  product: Product;
  wished: boolean;
  onWish: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAdd: (product: Product) => void;
}) {
  return (
    <article className={`pattern-product pattern-product-${product.imageIndex + 1}`}>
      <div className="pattern-product-rule" aria-hidden="true"><i /><span>{18 + product.imageIndex * 7}.5 CM</span></div>
      <button className="pattern-product-image" type="button" onClick={() => onQuickView(product)} aria-label={`View ${product.name}`}><ProductArt product={product} /><span>Open fitting <Icon name="arrow" /></span></button>
      <div className="pattern-product-copy">
        <p><span>{product.collection}</span><b>{product.badge}</b></p>
        <h3>{product.name}</h3>
        <small>{product.description}</small>
        <div><Price product={product} /><span>★ {product.rating} ({product.reviews})</span></div>
      </div>
      <div className="pattern-product-actions"><button className={wished ? "is-wished" : ""} type="button" aria-label={wished ? `Unpin ${product.name}` : `Pin ${product.name}`} aria-pressed={wished} onClick={() => onWish(product)}><Icon name="heart" /></button><button type="button" onClick={() => onAdd(product)}>Quick pin <Icon name="plus" /></button></div>
    </article>
  );
}

function CuttingTable({
  wishlist,
  onWish,
  onQuickView,
  onAdd,
}: {
  wishlist: string[];
  onWish: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAdd: (product: Product) => void;
}) {
  return (
    <section className="cutting-table" id="shop">
      <header className="table-heading" id="collections">
        <p className="eyebrow">THE CUTTING TABLE / ALL PIECES</p>
        <h2>Choose by<br /><em>instinct,</em> not season.</h2>
        <p>Six forms that share a single colour story and refuse a single occasion.</p>
        <span>NEW ARRIVALS + CONTINUING CUTS / 2026</span>
      </header>
      <div className="category-index">
        {categories.map((category) => <a href="#product-board" key={category.number}><span>{category.number}</span><strong>{category.name}</strong><small>{category.note}</small><b>{category.count}</b></a>)}
      </div>
      <div className="product-board" id="product-board">
        <div className="board-note board-note-a" aria-hidden="true">FACE →</div>
        <div className="board-note board-note-b" aria-hidden="true">DO NOT CUT / SELVEDGE</div>
        {products.map((product) => <ProductPattern key={product.id} product={product} wished={wishlist.includes(product.id)} onWish={onWish} onQuickView={onQuickView} onAdd={onAdd} />)}
      </div>
    </section>
  );
}

function AtelierStory() {
  return (
    <section className="atelier-story" id="method">
      <div className="atelier-photo"><Image src="/atelier/campaign-atelier.png" alt="The SEAM atelier with paper patterns and finished tailoring" fill sizes="(max-width: 800px) 100vw, 64vw" /></div>
      <div className="atelier-copy">
        <p className="eyebrow">METHOD NOTE / 03</p>
        <h2>We keep the<br />pattern <em>visible.</em></h2>
        <p>SEAM began around one cutting table in Cairo: a designer, a pattern cutter, and the belief that process should remain legible in the finished piece.</p>
        <p>Our basting lines, folded edges, and deliberate allowances are not decoration. They are the evidence of how a garment learned to move.</p>
        <a href="#newsletter">Read the next room note <Icon name="arrow" /></a>
      </div>
      <div className="method-values">
        <article><span>01</span><h3>Cloth first</h3><p>Deadstock, traced sources, and small cloth runs selected for the way they age.</p></article>
        <article><span>02</span><h3>Small rooms</h3><p>Every piece moves through a workshop of fewer than twelve people.</p></article>
        <article><span>03</span><h3>Useful allowance</h3><p>Generous seams and hems make future alterations part of the design.</p></article>
      </div>
    </section>
  );
}

function EditorsRail({
  wishlist,
  onWish,
  onQuickView,
  onAdd,
}: {
  wishlist: string[];
  onWish: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAdd: (product: Product) => void;
}) {
  const selection = [products[2], products[0], products[3]];
  return (
    <section className="editors-rail">
      <header><p className="eyebrow">MOST WORN / ATELIER LEDGER</p><h2>The pieces<br />that leave <em>first.</em></h2><span>Updated after every eighty orders.</span></header>
      <div className="ledger">
        {selection.map((product, index) => (
          <article key={product.id}>
            <span className="ledger-rank">0{index + 1}</span>
            <button type="button" onClick={() => onQuickView(product)}><ProductArt product={product} /></button>
            <div><small>{product.category} / ★ {product.rating}</small><h3>{product.name}</h3><p>{product.status}</p></div>
            <Price product={product} />
            <button className={wishlist.includes(product.id) ? "is-wished" : ""} type="button" aria-label={`Pin ${product.name}`} onClick={() => onWish(product)}><Icon name="heart" /></button>
            <button type="button" onClick={() => onAdd(product)}>Add <Icon name="plus" /></button>
          </article>
        ))}
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="reviews" id="reviews">
      <div className="review-score"><span>FITTING NOTES / 248 VERIFIED</span><strong>4.9</strong><p>★★★★★</p></div>
      <div className="review-notes">
        {testimonials.map((review, index) => <article key={review.name}><span>PIN 0{index + 1}</span><blockquote>“{review.quote}”</blockquote><div><b>{review.name}</b><small>{review.role}</small></div><p>{review.piece}</p></article>)}
      </div>
    </section>
  );
}

function ServiceAndFAQ() {
  const [open, setOpen] = useState(0);
  const services = [
    ["01", "Express, included", "Complimentary worldwide delivery over $350."],
    ["02", "21-day fitting", "Try every piece slowly, in your own wardrobe."],
    ["03", "Alteration credit", "$30 toward a local tailor during your first year."],
    ["04", "Secure payment", "Encrypted checkout with cards, PayPal, and Apple Pay."],
  ];
  return (
    <section className="service-faq" id="faq">
      <div className="service-grid" aria-label="Customer services">{services.map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      <div className="faq-heading"><p className="eyebrow">FITTING ROOM / QUESTIONS</p><h2>Notes in<br />the <em>margin.</em></h2><a href="mailto:room@seam03.studio">room@seam03.studio</a></div>
      <div className="faq-list">
        {faqs.map((item, index) => {
          const expanded = open === index;
          return <article key={item.question} className={expanded ? "is-open" : ""}><button type="button" aria-expanded={expanded} onClick={() => setOpen(expanded ? -1 : index)}><span>0{index + 1}</span><strong>{item.question}</strong><Icon name={expanded ? "minus" : "plus"} /></button><div><p>{item.answer}</p></div></article>;
        })}
      </div>
    </section>
  );
}

function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSubmitted(true); }
  return (
    <section className="newsletter" id="newsletter">
      <div className="newsletter-pattern" aria-hidden="true"><span>CUT ON FOLD</span><i /><i /><b>03</b></div>
      <div className="newsletter-copy">
        <p className="eyebrow">ROOM NOTES / OCCASIONAL</p>
        <h2>New cloth.<br />New cuts.<br /><em>No noise.</em></h2>
        <p>A letter from the pattern room when a piece is ready—not when a calendar says it should be.</p>
        {submitted ? <div className="newsletter-success"><Icon name="check" /> Your note is pinned to the board.</div> : <form onSubmit={submit}><label htmlFor="newsletter-email">Email address</label><div><input id="newsletter-email" name="email" type="email" placeholder="you@example.com" required /><button type="submit" aria-label="Join room notes"><Icon name="arrow" /></button></div></form>}
        <small>By joining, you agree to our privacy note. Leave whenever you like.</small>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <BrandMark inverse />
        <p>Pattern-led clothing and objects.<br />Drawn in Cairo. Made in small rooms.</p>
        <div><span>COLLECTION</span><a href="#shop">All pieces</a><a href="#collections">Tailoring</a><a href="#collections">Dresses</a><a href="#collections">Objects</a></div>
        <div><span>ASSISTANCE</span><a href="#faq">Sizing & fit</a><a href="#faq">Shipping & returns</a><a href="mailto:room@seam03.studio">Contact the room</a><a href="#method">Care & alterations</a></div>
        <div><span>FOLLOW THE THREAD</span><a href="#reviews">Instagram</a><a href="#reviews">Are.na</a><a href="#reviews">Pinterest</a></div>
      </div>
      <div className="footer-word" aria-hidden="true">SEAM<span>/03</span></div>
      <div className="footer-bottom"><span>© 2026 SEAM/03</span><span>USD / EN</span><span>CAIRO 30.0444° N</span><a href="#top">Return to pattern ↑</a></div>
    </footer>
  );
}

export default function Storefront() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [quickProduct, setQuickProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1050);
    try {
      setCart(JSON.parse(localStorage.getItem("seam03-cart") ?? "[]"));
      setWishlist(JSON.parse(localStorage.getItem("seam03-wishlist") ?? "[]"));
    } catch {
      localStorage.removeItem("seam03-cart");
      localStorage.removeItem("seam03-wishlist");
    }
    setHydrated(true);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("seam03-cart", JSON.stringify(cart));
    localStorage.setItem("seam03-wishlist", JSON.stringify(wishlist));
  }, [cart, wishlist, hydrated]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2300);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const active = overlay !== null || quickProduct !== null;
    if (!active) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => document.querySelector<HTMLElement>("[data-dialog] [data-autofocus], [data-dialog] button")?.focus(), 50);
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOverlay(null); setQuickProduct(null); return; }
      if (event.key !== "Tab") return;
      const dialog = document.querySelector<HTMLElement>("[data-dialog]");
      const focusable = dialog?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", handleKey);
    return () => { window.clearTimeout(focusTimer); document.body.style.overflow = ""; document.removeEventListener("keydown", handleKey); previous?.focus(); };
  }, [overlay, quickProduct]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 0.9 });
    const update = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(update); lenis.destroy(); };
  }, []);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add("(min-width: 821px) and (prefers-reduced-motion: no-preference)", () => {
        const story = gsap.timeline({ scrollTrigger: { trigger: ".pattern-story", start: "top top", end: "bottom bottom", scrub: 0.85, invalidateOnRefresh: true } });
        story
          .to(".chapter-progress i", { scaleX: 0.38, duration: 2.8, ease: "none" }, 0)
          .to(".thread-progress", { scaleY: 1, duration: 4.45, ease: "none" }, 0)
          .to(".chapter-progress span", { textContent: "THREAD / 01", duration: 0.1 }, 0.4)
          .to(".hero-media", { xPercent: -18, scale: 1.18, clipPath: "inset(8% 25% 12% 8%)", duration: 1.15, ease: "none" }, 0)
          .to(".hero-paper", { xPercent: -130, rotate: -10, duration: 0.9, ease: "none" }, 0.18)
          .to(".hero-title", { xPercent: -24, opacity: 0, duration: 0.48 }, 0.72)
          .to(".hero-margin-note, .hero-measure", { yPercent: -100, opacity: 0, duration: 0.4 }, 0.76)
          .to(".hero-scene", { opacity: 0, duration: 0.16 }, 1.1)
          .to(".draft-scene", { opacity: 1, duration: 0.15 }, 1.02)
          .fromTo(".paper-piece-a", { xPercent: -95, rotate: -30 }, { xPercent: 0, rotate: -5, duration: 0.72, ease: "none" }, 1.04)
          .fromTo(".paper-piece-b", { yPercent: -95, rotate: 26 }, { yPercent: 0, rotate: 8, duration: 0.72, ease: "none" }, 1.08)
          .fromTo(".paper-piece-c", { xPercent: 110, rotate: 45 }, { xPercent: 0, rotate: 2, duration: 0.72, ease: "none" }, 1.1)
          .fromTo(".draft-object", { clipPath: "inset(50% 50% 50% 50%)", scale: 0.55 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 0.68, ease: "none" }, 1.55)
          .fromTo(".draft-note", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, stagger: 0.12, duration: 0.38 }, 1.78)
          .to(".paper-piece", { xPercent: (index) => index === 0 ? -45 : index === 2 ? 48 : 5, yPercent: (index) => index === 1 ? -32 : 12, rotate: (index) => [-17, 18, 11][index], duration: 0.65, ease: "none" }, 2.05)
          .to(".draft-object", { scale: 1.42, rotate: -2, duration: 0.62, ease: "none" }, 2.08)
          .to(".draft-scene", { opacity: 0, duration: 0.18 }, 2.55)
          .to(".drape-scene", { opacity: 1, duration: 0.15 }, 2.48)
          .fromTo(".drape-image", { clipPath: "inset(100% 0 0 0)", scale: 1.25 }, { clipPath: "inset(0% 0 0 0)", scale: 1, duration: 0.82, ease: "none" }, 2.46)
          .fromTo(".drape-curtain", { xPercent: -115, skewX: -12 }, { xPercent: 30, skewX: 4, duration: 1.2, ease: "none" }, 2.52)
          .fromTo(".drape-copy", { yPercent: 45, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.48 }, 2.82)
          .fromTo(".drape-words span", { xPercent: (index) => index % 2 ? 110 : -110 }, { xPercent: 0, stagger: 0.08, duration: 0.58 }, 2.72)
          .to(".drape-image", { scale: 1.16, xPercent: 8, duration: 0.72, ease: "none" }, 3.32)
          .to(".drape-scene", { clipPath: "inset(0 0 100% 0)", duration: 0.48, ease: "none" }, 3.72)
          .to(".assemble-scene", { opacity: 1, duration: 0.15 }, 3.66)
          .fromTo(".assembly-line .product-art", { yPercent: (index) => index % 2 ? -125 : 125, rotate: (index) => (index - 3) * 8, scale: 0.5 }, { yPercent: 0, rotate: 0, scale: 1, stagger: 0.08, duration: 0.72, ease: "none" }, 3.66)
          .fromTo(".assemble-scene h2, .assemble-step", { xPercent: -25, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.5 }, 3.82)
          .fromTo(".assembly-index div", { yPercent: 80, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.07, duration: 0.38 }, 4.12)
          .to(".chapter-progress i", { scaleX: 0.58, duration: 1.2, ease: "none" }, 3.55)
          .to(".chapter-progress span", { textContent: "THREAD / 03", duration: 0.1 }, 3.7);

        gsap.utils.toArray<HTMLElement>(".pattern-product").forEach((item, index) => {
          gsap.fromTo(item, { y: 120 + index * 12, rotate: index % 2 ? 2.5 : -2.5 }, { y: 0, rotate: 0, ease: "none", scrollTrigger: { trigger: item, start: "top 95%", end: "top 48%", scrub: 0.8 } });
        });
        gsap.fromTo(".atelier-photo img", { scale: 1.18, yPercent: -6 }, { scale: 1, yPercent: 7, ease: "none", scrollTrigger: { trigger: ".atelier-story", start: "top bottom", end: "bottom top", scrub: 1 } });
        gsap.to(".chapter-progress i", { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".footer", start: "top bottom", end: "bottom bottom", scrub: 1 } });
      });
      return () => media.revert();
    }, rootRef);
    return () => context.revert();
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  function announce(message: string) { setToast(message); }
  function addToCart(product: Product, variant = product.variants[0], quantity = 1) {
    setCart((current) => {
      const index = current.findIndex((item) => item.productId === product.id && item.variant === variant);
      if (index === -1) return [...current, { productId: product.id, variant, quantity }];
      return current.map((item, itemIndex) => itemIndex === index ? { ...item, quantity: item.quantity + quantity } : item);
    });
    announce(`${product.name} pinned to your fitting rail.`);
  }
  function toggleWishlist(product: Product) {
    const removing = wishlist.includes(product.id);
    setWishlist((current) => removing ? current.filter((id) => id !== product.id) : [...current, product.id]);
    announce(removing ? `${product.name} unpinned.` : `${product.name} pinned for later.`);
  }
  function updateQuantity(index: number, amount: number) {
    setCart((current) => current.flatMap((item, itemIndex) => itemIndex !== index ? [item] : item.quantity + amount > 0 ? [{ ...item, quantity: item.quantity + amount }] : []));
  }
  function openQuickView(product: Product) { setOverlay(null); setQuickProduct(product); }
  function continueShopping() { setOverlay(null); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }

  return (
    <div className="seam-store" id="top" ref={rootRef}>
      <Loader visible={loading} />
      <Header cartCount={cartCount} wishlistCount={wishlist.length} onOpen={setOverlay} />
      <main>
        <PatternStory onShop={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })} />
        <CuttingTable wishlist={wishlist} onWish={toggleWishlist} onQuickView={openQuickView} onAdd={addToCart} />
        <AtelierStory />
        <EditorsRail wishlist={wishlist} onWish={toggleWishlist} onQuickView={openQuickView} onAdd={addToCart} />
        <Reviews />
        <ServiceAndFAQ />
        <Newsletter />
      </main>
      <Footer />

      <AnimatePresence mode="wait">
        {overlay === "cart" && <CartDrawer key="cart" items={cart} onClose={() => setOverlay(null)} onQuantity={updateQuantity} onRemove={(index) => setCart((current) => current.filter((_, itemIndex) => itemIndex !== index))} onContinue={continueShopping} />}
        {overlay === "wishlist" && <WishlistDrawer key="wishlist" wishlist={wishlist} onClose={() => setOverlay(null)} onRemove={toggleWishlist} onAdd={addToCart} />}
        {overlay === "search" && <SearchOverlay key="search" onClose={() => setOverlay(null)} onQuickView={openQuickView} />}
        {overlay === "account" && <AccountOverlay key="account" onClose={() => setOverlay(null)} />}
        {quickProduct && <QuickView key={quickProduct.id} product={quickProduct} wished={wishlist.includes(quickProduct.id)} onClose={() => setQuickProduct(null)} onWish={toggleWishlist} onRelated={openQuickView} onAdd={(product, variant, quantity) => { addToCart(product, variant, quantity); setQuickProduct(null); setOverlay("cart"); }} />}
      </AnimatePresence>
      <AnimatePresence>{toast && <motion.div className="toast" role="status" initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 16, opacity: 0 }}><Icon name="check" />{toast}</motion.div>}</AnimatePresence>
    </div>
  );
}
