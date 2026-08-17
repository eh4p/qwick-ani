"use client";

import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Image from "next/image";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { categories, faqs, products, testimonials, type Product } from "./store-data";

gsap.registerPlugin(ScrollTrigger);

type Overlay = "cart" | "search" | "wishlist" | "account" | null;

type CartItem = {
  productId: string;
  variant: string;
  quantity: number;
};

type IconName =
  | "account"
  | "arrow"
  | "bag"
  | "check"
  | "chevron"
  | "close"
  | "heart"
  | "minus"
  | "plus"
  | "search";

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    account: (
      <>
        <circle cx="12" cy="8" r="3.25" />
        <path d="M5.8 20c.55-4 2.65-6 6.2-6s5.65 2 6.2 6" />
      </>
    ),
    arrow: <path d="M5 12h13m-5-5 5 5-5 5" />,
    bag: (
      <>
        <path d="M5 8.5h14l-1 12H6l-1-12Z" />
        <path d="M9 9V6.5a3 3 0 0 1 6 0V9" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m8 10 4 4 4-4" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    heart: <path d="M20.8 8.7c0 5.4-8.8 10.4-8.8 10.4S3.2 14.1 3.2 8.7A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.8 2.3Z" />,
    minus: <path d="M5 12h14" />,
    plus: <path d="M5 12h14M12 5v14" />,
    search: (
      <>
        <circle cx="10.7" cy="10.7" r="6.7" />
        <path d="m16 16 4 4" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
      {paths[name]}
    </svg>
  );
}

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <a className={`brand-mark ${light ? "brand-mark-light" : ""}`} href="#top" aria-label="PULSE/01 — back to top">
      <span className="brand-glyph" aria-hidden="true">
        <i />
        <i />
      </span>
      <strong>PULSE</strong>
      <em>/01</em>
    </a>
  );
}

function Price({ product }: { product: Product }) {
  return (
    <span className="product-price">
      ${product.price}
      {product.compareAt && <del>${product.compareAt}</del>}
    </span>
  );
}

function ProductVisual({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <div className={`product-visual product-visual-${product.accent}`}>
      <Image
        src="/pulse/product-lineup.png"
        alt={`${product.name} — ${product.description}`}
        fill
        priority={priority}
        sizes="(max-width: 720px) 82vw, (max-width: 1200px) 42vw, 30vw"
        style={{ objectPosition: product.imagePosition }}
      />
      <span className="product-index" aria-hidden="true">
        {String(products.findIndex((item) => item.id === product.id) + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

function Loader({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="loader-ring"
            initial={{ rotate: -100, scale: 0.8 }}
            animate={{ rotate: 260, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          >
            <i />
          </motion.div>
          <div>
            <span>Calibrating</span>
            <b>PULSE/01</b>
          </div>
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
    ["Shop", "#shop"],
    ["Collections", "#collections"],
    ["Field notes", "#about"],
    ["Reviews", "#reviews"],
  ];

  return (
    <>
      <header className="site-header">
        <BrandMark light />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-tools">
          <button type="button" aria-label="Search products" onClick={() => onOpen("search")}>
            <Icon name="search" />
          </button>
          <button className="desktop-tool" type="button" aria-label="Member account" onClick={() => onOpen("account")}>
            <Icon name="account" />
          </button>
          <button className="desktop-tool count-tool" type="button" aria-label={`Wishlist with ${wishlistCount} items`} onClick={() => onOpen("wishlist")}>
            <Icon name="heart" />
            {wishlistCount > 0 && <span>{wishlistCount}</span>}
          </button>
          <button className="bag-tool count-tool" type="button" aria-label={`Cart with ${cartCount} items`} onClick={() => onOpen("cart")}>
            <Icon name="bag" />
            <span>{cartCount}</span>
          </button>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <i />
            <i />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-navigation"
            id="mobile-navigation"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobile navigation">
              {links.map(([label, href], index) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                  <small>0{index + 1}</small>
                  <span>{label}</span>
                  <Icon name="arrow" />
                </a>
              ))}
            </nav>
            <div className="mobile-navigation-actions">
              <button type="button" onClick={() => { onOpen("wishlist"); setMenuOpen(false); }}>
                Wishlist ({wishlistCount})
              </button>
              <button type="button" onClick={() => { onOpen("account"); setMenuOpen(false); }}>
                Member access
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="site-progress" aria-hidden="true">
        <i />
      </div>
    </>
  );
}

function ScrollStory({ onShop }: { onShop: () => void }) {
  return (
    <section className="story" aria-label="PULSE/01 performance philosophy">
      <div className="story-stage">
        <div className="story-grid" aria-hidden="true" />
        <div className="story-coordinate story-coordinate-left">34° 03′ / MOTION LAB</div>
        <div className="story-coordinate story-coordinate-right">SCROLL TO APPLY FORCE</div>

        <div className="story-scene hero-scene">
          <div className="hero-photo">
            <Image
              src="/pulse/hero-runner.png"
              alt="Athlete sprinting through an illuminated training tunnel"
              fill
              priority
              sizes="100vw"
            />
          </div>
          <div className="hero-shade" />
          <div className="hero-copy">
            <p className="kicker"><span>01</span> Objects for human output</p>
            <h1>
              Find your
              <em>next gear.</em>
            </h1>
            <p className="hero-note">Performance essentials, reduced to what moves you forward.</p>
            <div className="hero-actions">
              <button className="button button-acid" type="button" onClick={onShop}>
                Enter the lab <Icon name="arrow" />
              </button>
              <a className="text-link" href="#about">Read our field notes</a>
            </div>
          </div>
          <div className="hero-readout" aria-hidden="true">
            <span>Pulse</span>
            <strong>168</strong>
            <small>BPM / PEAK</small>
          </div>
          <div className="hero-wash" />
        </div>

        <div className="story-scene manifesto-scene" aria-hidden="true">
          <p className="kicker"><span>02</span> The operating principle</p>
          <div className="manifesto-ring"><i /><b /></div>
          <p className="manifesto-word">Adapt</p>
          <div className="manifesto-copy">
            <p>Stress is a signal.</p>
            <p>Recovery is the response.</p>
            <strong>Progress is the adaptation.</strong>
          </div>
          <div className="manifesto-metric"><b>+18%</b><span>repeatable output</span></div>
        </div>

        <div className="story-scene category-scene" aria-hidden="true">
          <header>
            <p className="kicker"><span>03</span> Choose your constraint</p>
            <h2>Four systems.<br />One moving body.</h2>
          </header>
          <div className="category-orbit">
            {categories.map((category) => (
              <article className="category-card" key={category.number}>
                <small>{category.number}</small>
                <span>{category.name}</span>
                <p>{category.note}</p>
                <i aria-hidden="true" />
              </article>
            ))}
          </div>
          <div className="category-axis" />
        </div>

        <div className="story-scene feature-scene" aria-hidden="true">
          <div className="feature-signal">
            <span>04 / Featured object</span>
            <i />
          </div>
          <div className="feature-image">
            <Image
              src="/pulse/product-lineup.png"
              alt="Flow Vessel performance hydration bottle"
              fill
              sizes="(max-width: 820px) 100vw, 64vw"
              style={{ objectPosition: "35% center" }}
            />
          </div>
          <p className="feature-ghost">FLOW</p>
          <div className="feature-copy">
            <p>Engineered object / 02</p>
            <h2>Hydration<br />without drag.</h2>
            <span>Impact-resistant / silent carry / 750 ml</span>
          </div>
          <div className="feature-price"><span>FROM</span><b>$38</b></div>
          <div className="feature-callout callout-one"><i /><span>Grip zone / 01</span></div>
          <div className="feature-callout callout-two"><i /><span>Flow core / 02</span></div>
        </div>

        <div className="story-scene portal-scene" aria-hidden="true">
          <div className="portal-ring"><i /></div>
          <p>THE FIELD KIT</p>
          <h2>Objects in<br /><em>forward motion.</em></h2>
          <span>Scroll into the collection</span>
        </div>
      </div>
    </section>
  );
}

function ProductCard({
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
    <article className="product-card">
      <div className="product-card-topline">
        <span>{product.badge}</span>
        <button
          className={wished ? "is-wished" : ""}
          type="button"
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={wished}
          onClick={() => onWish(product)}
        >
          <Icon name="heart" />
        </button>
      </div>
      <button className="product-image-button" type="button" onClick={() => onQuickView(product)} aria-label={`Quick view ${product.name}`}>
        <ProductVisual product={product} />
        <span>Open object <Icon name="arrow" /></span>
      </button>
      <div className="product-card-info">
        <div>
          <p>{product.category}</p>
          <h3>{product.name}</h3>
        </div>
        <Price product={product} />
      </div>
      <div className="product-card-meta">
        <span>★ {product.rating} <i>({product.reviews})</i></span>
        <button type="button" onClick={() => onAdd(product)}>
          Quick add <Icon name="plus" />
        </button>
      </div>
    </article>
  );
}

function CollectionRail({
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
    <section className="collection-scroll" id="shop">
      <div className="collection-stage">
        <header className="collection-header" id="collections">
          <div>
            <p className="kicker"><span>05</span> The field kit</p>
            <h2>Built to be<br /><em>used hard.</em></h2>
          </div>
          <p>Six precise objects. No filler.<br />Drag sideways or keep scrolling.</p>
          <div className="collection-counter"><b>01</b><i /><span>06</span></div>
        </header>
        <div className="collection-track">
          <div className="rail-intro" aria-hidden="true">
            <span>SHOP / ALL SYSTEMS</span>
            <p>→</p>
          </div>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              wished={wishlist.includes(product.id)}
              onWish={onWish}
              onQuickView={onQuickView}
              onAdd={onAdd}
            />
          ))}
          <article className="rail-end">
            <span>Need a starting point?</span>
            <h3>Build your<br />base kit.</h3>
            <a href="#faq">See the field guide <Icon name="arrow" /></a>
          </article>
        </div>
        <div className="rail-rule" aria-hidden="true"><i /></div>
      </div>
    </section>
  );
}

function Benefits() {
  const benefits = [
    ["01", "Tested", "Every formula and material is independently validated before it reaches your kit."],
    ["02", "Reduced", "We remove the ornamental until only performance, durability, and feel remain."],
    ["03", "Repeatable", "Designed for the quiet discipline of showing up again—and again."],
  ];

  return (
    <section className="benefits" id="about">
      <div className="benefits-title">
        <p className="kicker"><span>06</span> Why PULSE/01</p>
        <h2>Nothing extra.<br /><em>Everything earned.</em></h2>
      </div>
      <div className="benefit-object" aria-hidden="true">
        <div className="object-core"><span>P/01</span></div>
        <i className="orbit orbit-a" />
        <i className="orbit orbit-b" />
        <p>FORM → FORCE → FEEDBACK</p>
      </div>
      <div className="benefit-list">
        {benefits.map(([number, title, body]) => (
          <article key={number}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BrandStory() {
  return (
    <section className="brand-story">
      <div className="brand-story-media">
        <Image
          src="/pulse/community-run.png"
          alt="Four runners recovering together after a dawn training session"
          fill
          sizes="100vw"
        />
        <div className="brand-story-stamp" aria-hidden="true">
          <span>EST.</span><b>2026</b><i>CAIRO / WORLD</i>
        </div>
      </div>
      <div className="brand-story-copy">
        <p className="kicker"><span>07</span> Field note / Origin</p>
        <h2>Made between<br />the <em>efforts.</em></h2>
        <div>
          <p>
            PULSE/01 began with a simple frustration: the things around training shouted louder than the training itself.
          </p>
          <p>
            So we built a quieter system—considered objects, honest formulas, and equipment that disappears into the work.
          </p>
        </div>
        <a className="text-link" href="#newsletter">Join the next field test <Icon name="arrow" /></a>
      </div>
    </section>
  );
}

function BestSellers({
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
    <section className="best-sellers">
      <header>
        <p className="kicker"><span>08</span> Current signal</p>
        <h2>Most repeated.</h2>
        <p>Objects our community reaches for first.</p>
      </header>
      <div className="best-seller-grid">
        {[products[0], products[2], products[3]].map((product, index) => (
          <div className={`best-seller best-seller-${index + 1}`} key={product.id}>
            <ProductCard
              product={product}
              wished={wishlist.includes(product.id)}
              onWish={onWish}
              onQuickView={onQuickView}
              onAdd={onAdd}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="testimonials" id="reviews">
      <div className="testimonial-intro">
        <p className="kicker"><span>09</span> Field transmissions</p>
        <p className="rating-large">4.9</p>
        <span>★★★★★<br />1,248 verified sessions</span>
      </div>
      <div className="testimonial-list">
        {testimonials.map((testimonial, index) => (
          <article key={testimonial.name}>
            <span>0{index + 1}</span>
            <blockquote>“{testimonial.quote}”</blockquote>
            <div><b>{testimonial.name}</b><small>{testimonial.role}</small></div>
            <strong>{testimonial.stat}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Service promises">
      <article><span>01</span><h3>Free delivery</h3><p>On orders over $75</p></article>
      <article><span>02</span><h3>30-day field test</h3><p>Use it. Then decide.</p></article>
      <article><span>03</span><h3>Tested + traceable</h3><p>Batch-level transparency</p></article>
      <article><span>04</span><h3>Encrypted checkout</h3><p>Visa / Mastercard / PayPal</p></article>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="faq" id="faq">
      <header>
        <p className="kicker"><span>10</span> Field guide</p>
        <h2>Clear answers.<br /><em>No small print.</em></h2>
        <a href="mailto:field@pulse01.example">field@pulse01.example</a>
      </header>
      <div className="faq-list">
        {faqs.map((item, index) => {
          const expanded = open === index;
          return (
            <article key={item.question} className={expanded ? "is-open" : ""}>
              <button type="button" aria-expanded={expanded} onClick={() => setOpen(expanded ? -1 : index)}>
                <span>0{index + 1}</span>
                <strong>{item.question}</strong>
                <i><Icon name={expanded ? "minus" : "plus"} /></i>
              </button>
              <div className="faq-answer"><p>{item.answer}</p></div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="newsletter" id="newsletter">
      <div className="newsletter-pulse" aria-hidden="true"><i /><i /><i /></div>
      <div className="newsletter-copy">
        <p className="kicker"><span>11</span> Continue the signal</p>
        <h2>Your next<br />session starts <em>here.</em></h2>
        <p>Field tests, training notes, and first access to limited objects. Sent sparingly.</p>
        {submitted ? (
          <div className="newsletter-success"><Icon name="check" /> You’re on the field list.</div>
        ) : (
          <form onSubmit={submit}>
            <label htmlFor="newsletter-email">Email address</label>
            <input id="newsletter-email" name="email" type="email" placeholder="you@example.com" required />
            <button type="submit" aria-label="Join the field list"><Icon name="arrow" /></button>
          </form>
        )}
        <small>By joining, you agree to our privacy policy. Unsubscribe anytime.</small>
      </div>
    </section>
  );
}

function Footer() {
  const columns = [
    ["Shop", ["All objects", "Fuel", "Hydration", "Mobility", "Recovery"]],
    ["Support", ["Shipping & returns", "Field guide", "Contact", "Product care", "Track order"]],
    ["Company", ["Our method", "Journal", "Field testing", "Privacy", "Terms"]],
  ];

  return (
    <footer className="footer">
      <div className="footer-top">
        <BrandMark light />
        <p>Objects for human output.<br />Designed in Cairo. Tested everywhere.</p>
        <div className="footer-links">
          {columns.map(([heading, links]) => (
            <div key={heading as string}>
              <span>{heading}</span>
              {(links as string[]).map((link) => <a key={link} href={link === "Field guide" ? "#faq" : "#shop"}>{link}</a>)}
            </div>
          ))}
        </div>
      </div>
      <div className="footer-word" aria-hidden="true">PULSE<span>/01</span></div>
      <div className="footer-bottom">
        <span>© 2026 PULSE/01 LABS</span>
        <span>USD / EN</span>
        <div><a href="#">Instagram</a><a href="#">Strava</a><a href="#">YouTube</a></div>
        <a href="#top">Back to signal ↑</a>
      </div>
    </footer>
  );
}

function DrawerShell({
  title,
  eyebrow,
  onClose,
  children,
}: {
  title: string;
  eyebrow: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <>
      <motion.button
        className="overlay-backdrop"
        type="button"
        aria-label="Close overlay"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        data-dialog
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <header className="drawer-header">
          <div><span>{eyebrow}</span><h2>{title}</h2></div>
          <button type="button" aria-label={`Close ${title}`} onClick={onClose} data-autofocus><Icon name="close" /></button>
        </header>
        {children}
      </motion.aside>
    </>
  );
}

function CartDrawer({
  items,
  onClose,
  onQuantity,
  onRemove,
  onContinue,
}: {
  items: CartItem[];
  onClose: () => void;
  onQuantity: (index: number, amount: number) => void;
  onRemove: (index: number) => void;
  onContinue: () => void;
}) {
  const detailed = items.flatMap((item) => {
    const product = products.find((candidate) => candidate.id === item.productId);
    return product ? [{ ...item, product }] : [];
  });
  const subtotal = detailed.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <DrawerShell title="Your kit" eyebrow={`${items.reduce((sum, item) => sum + item.quantity, 0)} objects`} onClose={onClose}>
      {detailed.length === 0 ? (
        <div className="empty-state">
          <div className="empty-orbit"><i /></div>
          <h3>No objects in motion.</h3>
          <p>Build your field kit from essentials engineered to move.</p>
          <button className="button button-dark" type="button" onClick={onContinue}>Explore the lab <Icon name="arrow" /></button>
        </div>
      ) : (
        <>
          <div className="drawer-items">
            {detailed.map((item, index) => (
              <article className="drawer-item" key={`${item.productId}-${item.variant}`}>
                <ProductVisual product={item.product} />
                <div className="drawer-item-info">
                  <span>{item.product.category}</span>
                  <h3>{item.product.name}</h3>
                  <p>{item.variant}</p>
                  <div className="quantity">
                    <button type="button" aria-label={`Decrease ${item.product.name} quantity`} onClick={() => onQuantity(index, -1)}><Icon name="minus" /></button>
                    <span>{item.quantity}</span>
                    <button type="button" aria-label={`Increase ${item.product.name} quantity`} onClick={() => onQuantity(index, 1)}><Icon name="plus" /></button>
                  </div>
                </div>
                <div className="drawer-item-price"><b>${item.product.price * item.quantity}</b><button type="button" onClick={() => onRemove(index)}>Remove</button></div>
              </article>
            ))}
          </div>
          <div className="cart-footer">
            <div className="shipping-meter"><span><i style={{ width: `${Math.min(100, subtotal / 0.75)}%` }} /></span><p>{subtotal >= 75 ? "Free delivery unlocked." : `$${75 - subtotal} away from free delivery.`}</p></div>
            <div className="cart-total"><span>Estimated total<small>Taxes calculated at checkout</small></span><b>${subtotal}</b></div>
            <button className="button button-acid" type="button">Secure checkout <Icon name="arrow" /></button>
            <button className="continue-link" type="button" onClick={onContinue}>Continue shopping</button>
          </div>
        </>
      )}
    </DrawerShell>
  );
}

function WishlistDrawer({
  wishlist,
  onClose,
  onRemove,
  onAdd,
}: {
  wishlist: string[];
  onClose: () => void;
  onRemove: (product: Product) => void;
  onAdd: (product: Product) => void;
}) {
  const selected = products.filter((product) => wishlist.includes(product.id));
  return (
    <DrawerShell title="Saved objects" eyebrow={`${selected.length} shortlisted`} onClose={onClose}>
      {selected.length === 0 ? (
        <div className="empty-state"><div className="empty-orbit"><i /></div><h3>Nothing held back.</h3><p>Save an object now. Return to it when the timing is right.</p></div>
      ) : (
        <div className="wishlist-items">
          {selected.map((product) => (
            <article key={product.id}>
              <ProductVisual product={product} />
              <div><span>{product.category}</span><h3>{product.name}</h3><Price product={product} /></div>
              <button className="button button-dark" type="button" onClick={() => onAdd(product)}>Add to kit <Icon name="plus" /></button>
              <button className="remove-wish" type="button" onClick={() => onRemove(product)}>Remove</button>
            </article>
          ))}
        </div>
      )}
    </DrawerShell>
  );
}

function SearchOverlay({
  onClose,
  onQuickView,
}: {
  onClose: () => void;
  onQuickView: (product: Product) => void;
}) {
  const [term, setTerm] = useState("");
  const results = useMemo(() => {
    const value = term.trim().toLowerCase();
    if (!value) return products.slice(0, 4);
    return products.filter((product) => [product.name, product.category, product.description].join(" ").toLowerCase().includes(value));
  }, [term]);

  return (
    <motion.div
      className="search-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Search products"
      data-dialog
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
    >
      <header><BrandMark /><button type="button" onClick={onClose} aria-label="Close search"><Icon name="close" /></button></header>
      <div className="search-field">
        <span>Search the lab</span>
        <input
          data-autofocus
          type="search"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          placeholder="What moves you?"
          aria-label="Search products"
        />
        <Icon name="search" />
      </div>
      <div className="search-categories">
        <span>Quick paths</span>
        {categories.map((category) => <button type="button" key={category.name} onClick={() => setTerm(category.name)}>{category.name}</button>)}
      </div>
      <div className="search-results">
        <p>{term ? `${results.length} results for “${term}”` : "Suggested objects"}</p>
        <div>
          {results.map((product) => (
            <button type="button" key={product.id} onClick={() => onQuickView(product)}>
              <ProductVisual product={product} />
              <span><small>{product.category}</small><strong>{product.name}</strong><Price product={product} /></span>
              <Icon name="arrow" />
            </button>
          ))}
          {results.length === 0 && <div className="no-results">No exact signal. Try “Fuel”, “Mobility”, or “Recovery”.</div>}
        </div>
      </div>
    </motion.div>
  );
}

function AccountOverlay({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  return (
    <DrawerShell title="Member access" eyebrow="PULSE/01 field account" onClose={onClose}>
      <div className="account-panel">
        <span>ONE KIT / EVERY SESSION</span>
        <h3>Track orders.<br />Save protocols.<br />Move forward.</h3>
        {sent ? (
          <div className="account-sent"><Icon name="check" /> Access link sent.</div>
        ) : (
          <form onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
            <label htmlFor="account-email">Email address</label>
            <input id="account-email" data-autofocus type="email" placeholder="you@example.com" required />
            <button className="button button-dark" type="submit">Send access link <Icon name="arrow" /></button>
          </form>
        )}
        <p>No password to remember. We’ll send a secure sign-in link to your inbox.</p>
      </div>
    </DrawerShell>
  );
}

function QuickView({
  product,
  wished,
  onClose,
  onWish,
  onAdd,
}: {
  product: Product;
  wished: boolean;
  onClose: () => void;
  onWish: (product: Product) => void;
  onAdd: (product: Product, variant: string, quantity: number) => void;
}) {
  const [variant, setVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [view, setView] = useState(0);

  return (
    <>
      <motion.button className="overlay-backdrop" type="button" aria-label="Close product details" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
      <motion.div
        className="quick-view"
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} details`}
        data-dialog
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <button className="quick-close" type="button" onClick={onClose} aria-label="Close product details" data-autofocus><Icon name="close" /></button>
        <div className={`quick-media quick-media-view-${view}`}>
          <ProductVisual product={product} priority />
          <div className="quick-gallery"><button className={view === 0 ? "active" : ""} type="button" onClick={() => setView(0)}>01</button><button className={view === 1 ? "active" : ""} type="button" onClick={() => setView(1)}>02</button></div>
        </div>
        <div className="quick-copy">
          <div className="quick-kicker"><span>{product.badge}</span><b>★ {product.rating} ({product.reviews})</b></div>
          <h2>{product.name}</h2>
          <Price product={product} />
          <p className="quick-description">{product.detail}</p>
          <div className="quick-benefits">{product.benefits.map((benefit) => <span key={benefit}><Icon name="check" />{benefit}</span>)}</div>
          <fieldset className="variants">
            <legend>{product.category === "Fuel" ? "Flavor" : "Configuration"} — <b>{variant}</b></legend>
            <div>{product.variants.map((item) => <button className={variant === item ? "active" : ""} type="button" key={item} onClick={() => setVariant(item)}>{item}</button>)}</div>
          </fieldset>
          <div className="quick-actions">
            <div className="quantity"><button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Icon name="minus" /></button><span>{quantity}</span><button type="button" onClick={() => setQuantity((value) => value + 1)}><Icon name="plus" /></button></div>
            <button className="button button-dark" type="button" onClick={() => onAdd(product, variant, quantity)}>Add to kit — ${product.price * quantity}</button>
            <button className={wished ? "quick-wish is-wished" : "quick-wish"} type="button" aria-pressed={wished} onClick={() => onWish(product)}><Icon name="heart" /></button>
          </div>
          <div className="quick-service"><span>Free shipping over $75</span><span>30-day field test</span></div>
        </div>
      </motion.div>
    </>
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
    const loaderTimer = window.setTimeout(() => setLoading(false), 1250);
    try {
      setCart(JSON.parse(localStorage.getItem("pulse-cart") ?? "[]"));
      setWishlist(JSON.parse(localStorage.getItem("pulse-wishlist") ?? "[]"));
    } catch {
      localStorage.removeItem("pulse-cart");
      localStorage.removeItem("pulse-wishlist");
    }
    setHydrated(true);
    return () => window.clearTimeout(loaderTimer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("pulse-cart", JSON.stringify(cart));
    localStorage.setItem("pulse-wishlist", JSON.stringify(wishlist));
  }, [cart, wishlist, hydrated]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const active = overlay !== null || quickProduct !== null;
    if (!active) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => {
      document.querySelector<HTMLElement>("[data-dialog] [data-autofocus], [data-dialog] button")?.focus();
    }, 40);
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOverlay(null);
        setQuickProduct(null);
        return;
      }
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
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
      previous?.focus();
    };
  }, [overlay, quickProduct]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.9 });
    const update = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add("(min-width: 821px) and (prefers-reduced-motion: no-preference)", () => {
        const story = gsap.timeline({
          scrollTrigger: { trigger: ".story", start: "top top", end: "bottom bottom", scrub: 0.75, invalidateOnRefresh: true },
        });
        story
          .to(".site-progress i", { scaleX: 0.42, duration: 4.8, ease: "none" }, 0)
          .to(".hero-photo", { scale: 1.28, xPercent: -3, duration: 1.15, ease: "none" }, 0)
          .to(".hero-readout", { yPercent: -130, opacity: 0, duration: 0.5 }, 0.35)
          .to(".hero-copy", { yPercent: -32, opacity: 0, duration: 0.48 }, 0.52)
          .to(".hero-wash", { opacity: 1, duration: 0.35 }, 0.7)
          .to(".hero-scene", { opacity: 0, duration: 0.12 }, 0.86)
          .to(".manifesto-scene", { opacity: 1, duration: 0.18 }, 0.82)
          .fromTo(".manifesto-word", { scale: 3.6, rotate: -12 }, { scale: 1, rotate: 0, duration: 0.8, ease: "none" }, 0.88)
          .fromTo(".manifesto-ring", { scale: 0.2, rotate: -60 }, { scale: 1.15, rotate: 75, duration: 0.9, ease: "none" }, 0.92)
          .fromTo(".manifesto-copy p, .manifesto-copy strong", { yPercent: 130, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.08, duration: 0.34 }, 1.2)
          .to(".manifesto-word", { scale: 0.35, opacity: 0, duration: 0.48 }, 1.72)
          .to(".manifesto-ring", { scale: 4.5, opacity: 0, duration: 0.58 }, 1.74)
          .to(".manifesto-scene", { opacity: 0, duration: 0.14 }, 2.08)
          .to(".category-scene", { opacity: 1, duration: 0.15 }, 2.02)
          .fromTo(".category-scene header", { xPercent: -35, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.45 }, 2.05)
          .fromTo(".category-card", { xPercent: 180, rotate: 8, scale: 0.72 }, { xPercent: 0, rotate: 0, scale: 1, stagger: 0.1, duration: 0.62, ease: "none" }, 2.05)
          .to(".category-orbit", { xPercent: -18, duration: 0.72, ease: "none" }, 2.7)
          .to(".category-scene", { opacity: 0, scale: 0.86, duration: 0.32 }, 3.12)
          .to(".feature-scene", { opacity: 1, duration: 0.15 }, 3.05)
          .fromTo(".feature-image", { clipPath: "circle(3% at 50% 50%)", scale: 0.3 }, { clipPath: "circle(36% at 50% 50%)", scale: 1, duration: 0.7, ease: "none" }, 3.02)
          .fromTo(".feature-ghost", { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 0.1, duration: 0.58 }, 3.15)
          .fromTo(".feature-copy", { xPercent: -24, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.4 }, 3.36)
          .fromTo(".feature-price", { xPercent: 70, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.38 }, 3.42)
          .fromTo(".feature-callout", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, stagger: 0.12, duration: 0.32 }, 3.55)
          .to(".feature-image", { clipPath: "circle(74% at 50% 50%)", scale: 2.75, filter: "blur(2px)", duration: 0.75, ease: "none" }, 3.86)
          .to(".feature-copy, .feature-price, .feature-callout", { opacity: 0, duration: 0.18 }, 4.05)
          .to(".feature-scene", { opacity: 0, duration: 0.2 }, 4.38)
          .to(".portal-scene", { opacity: 1, duration: 0.18 }, 4.32)
          .fromTo(".portal-ring", { scale: 4.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.55 }, 4.3)
          .fromTo(".portal-scene h2", { scale: 0.65, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.46 }, 4.45);

        const track = document.querySelector<HTMLElement>(".collection-track");
        if (track) {
          gsap.to(track, {
            x: () => -Math.max(0, track.scrollWidth - window.innerWidth + window.innerWidth * 0.1),
            ease: "none",
            scrollTrigger: { trigger: ".collection-scroll", start: "top top", end: "bottom bottom", scrub: 0.8, invalidateOnRefresh: true },
          });
        }

        gsap.fromTo(".object-core", { rotate: -20 }, { rotate: 160, scrollTrigger: { trigger: ".benefits", start: "top bottom", end: "bottom top", scrub: 1 } });
        gsap.fromTo(".orbit-a", { rotate: 0 }, { rotate: 190, scrollTrigger: { trigger: ".benefits", start: "top bottom", end: "bottom top", scrub: 1 } });
        gsap.fromTo(".orbit-b", { rotate: 0 }, { rotate: -120, scrollTrigger: { trigger: ".benefits", start: "top bottom", end: "bottom top", scrub: 1 } });
        gsap.fromTo(".brand-story-media img", { scale: 1.2, yPercent: -6 }, { scale: 1, yPercent: 6, scrollTrigger: { trigger: ".brand-story", start: "top bottom", end: "bottom top", scrub: 1 } });
        gsap.to(".site-progress i", { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".footer", start: "top bottom", end: "bottom bottom", scrub: 1 } });
      });
      return () => media.revert();
    }, rootRef);
    return () => context.revert();
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  function announce(message: string) {
    setToast(message);
  }

  function addToCart(product: Product, variant = product.variants[0], quantity = 1) {
    setCart((current) => {
      const index = current.findIndex((item) => item.productId === product.id && item.variant === variant);
      if (index === -1) return [...current, { productId: product.id, variant, quantity }];
      return current.map((item, itemIndex) => itemIndex === index ? { ...item, quantity: item.quantity + quantity } : item);
    });
    announce(`${product.name} added to your kit.`);
  }

  function toggleWishlist(product: Product) {
    const removing = wishlist.includes(product.id);
    setWishlist((current) => removing ? current.filter((id) => id !== product.id) : [...current, product.id]);
    announce(removing ? `${product.name} removed from saved objects.` : `${product.name} saved.`);
  }

  function updateQuantity(index: number, amount: number) {
    setCart((current) => current.flatMap((item, itemIndex) => {
      if (itemIndex !== index) return [item];
      const quantity = item.quantity + amount;
      return quantity > 0 ? [{ ...item, quantity }] : [];
    }));
  }

  function openQuickView(product: Product) {
    setOverlay(null);
    setQuickProduct(product);
  }

  function continueShopping() {
    setOverlay(null);
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="pulse-store" id="top" ref={rootRef}>
      <Loader visible={loading} />
      <Header cartCount={cartCount} wishlistCount={wishlist.length} onOpen={setOverlay} />
      <main>
        <ScrollStory onShop={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })} />
        <CollectionRail wishlist={wishlist} onWish={toggleWishlist} onQuickView={openQuickView} onAdd={addToCart} />
        <Benefits />
        <BrandStory />
        <BestSellers wishlist={wishlist} onWish={toggleWishlist} onQuickView={openQuickView} onAdd={addToCart} />
        <Testimonials />
        <TrustStrip />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />

      <AnimatePresence mode="wait">
        {overlay === "cart" && (
          <CartDrawer
            key="cart"
            items={cart}
            onClose={() => setOverlay(null)}
            onQuantity={updateQuantity}
            onRemove={(index) => setCart((current) => current.filter((_, itemIndex) => itemIndex !== index))}
            onContinue={continueShopping}
          />
        )}
        {overlay === "wishlist" && (
          <WishlistDrawer key="wishlist" wishlist={wishlist} onClose={() => setOverlay(null)} onRemove={toggleWishlist} onAdd={addToCart} />
        )}
        {overlay === "search" && <SearchOverlay key="search" onClose={() => setOverlay(null)} onQuickView={openQuickView} />}
        {overlay === "account" && <AccountOverlay key="account" onClose={() => setOverlay(null)} />}
        {quickProduct && (
          <QuickView
            key={quickProduct.id}
            product={quickProduct}
            wished={wishlist.includes(quickProduct.id)}
            onClose={() => setQuickProduct(null)}
            onWish={toggleWishlist}
            onAdd={(product, variant, quantity) => { addToCart(product, variant, quantity); setQuickProduct(null); setOverlay("cart"); }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toast && <motion.div className="toast" role="status" initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 16, opacity: 0 }}><Icon name="check" />{toast}</motion.div>}
      </AnimatePresence>
    </div>
  );
}
