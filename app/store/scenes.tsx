import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { Product } from "./data";
import { faqs, products } from "./data";
import {
  ArrowIcon,
  BagIcon,
  CloseIcon,
  HeartIcon,
  MenuIcon,
  PlusIcon,
  SearchIcon,
  StarIcon,
  UserIcon,
} from "./icons";

type StoreActions = {
  addToCart: (product: Product, size?: string) => void;
  openQuickView: (product: Product) => void;
  toggleWishlist: (productId: string) => void;
  wishlist: string[];
};

function Wordmark({ footer = false }: { footer?: boolean }) {
  return (
    <a className={`velora-wordmark${footer ? " velora-wordmark-footer" : ""}`} href="#top" aria-label="VELORA — back to top">
      <span className="wordmark-orbit" aria-hidden="true" />
      <span>VELORA</span>
    </a>
  );
}

export function Header({
  cartCount,
  wishlistCount,
  openCart,
  openSearch,
  openWishlist,
  notify,
}: {
  cartCount: number;
  wishlistCount: number;
  openCart: () => void;
  openSearch: () => void;
  openWishlist: () => void;
  notify: (message: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        animate={{ opacity: 1, y: 0 }}
        className="velora-header"
        initial={{ opacity: 0, y: -22 }}
        transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          aria-controls="velora-mobile-menu"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          className="velora-menu-button"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
        <Wordmark />
        <nav aria-label="Primary navigation" className="velora-nav">
          <a href="#shop">Shop</a>
          <a href="#collections">Collections</a>
          <a href="#about">Our world</a>
          <a href="#ritual">Ritual</a>
        </nav>
        <div className="velora-tools">
          <button aria-label="Search" onClick={openSearch} type="button"><SearchIcon /></button>
          <button aria-label="Account" onClick={() => notify("The VELORA account portal is opening soon.")} type="button"><UserIcon /></button>
          <button aria-label={`Wishlist with ${wishlistCount} items`} onClick={openWishlist} type="button">
            <HeartIcon filled={wishlistCount > 0} />
            {wishlistCount > 0 && <small>{wishlistCount}</small>}
          </button>
          <button aria-label={`Cart with ${cartCount} items`} onClick={openCart} type="button">
            <BagIcon />
            <small>{cartCount}</small>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            animate={{ clipPath: "inset(0 0 0 0)" }}
            className="velora-mobile-menu"
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            id="velora-mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <span className="eyebrow">Navigate the ritual</span>
            <nav aria-label="Mobile navigation">
              {[
                ["01", "Shop", "#shop"],
                ["02", "Collections", "#collections"],
                ["03", "Our world", "#about"],
                ["04", "Reviews", "#reviews"],
                ["05", "FAQ", "#faq"],
              ].map(([number, label, href]) => (
                <a href={href} key={href} onClick={() => setMenuOpen(false)}>
                  <small>{number}</small><span>{label}</span><ArrowIcon diagonal />
                </a>
              ))}
            </nav>
            <div className="velora-mobile-menu-actions">
              <button onClick={() => { setMenuOpen(false); openWishlist(); }} type="button">
                Saved formulas <span>{wishlistCount}</span>
              </button>
              <p>Skin in another state.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Hero({ openQuickView }: Pick<StoreActions, "openQuickView">) {
  return (
    <section className="velora-hero" id="top">
      <div className="hero-phase-stage">
        <div className="hero-aurora hero-aurora-a" aria-hidden="true" />
        <div className="hero-aurora hero-aurora-b" aria-hidden="true" />
        <div className="hero-grain" aria-hidden="true" />
        <p className="hero-coordinate" aria-hidden="true">PHASE 01 — 41.9028° N</p>
        <p className="hero-edition" aria-hidden="true">BIO-FERMENTED SKINCARE<br />FORMULATED IN SMALL BATCHES</p>

        <div className="hero-display" aria-hidden="true">SKIN<br /><i>IN</i> ANOTHER<br />STATE</div>

        <div className="hero-product-wrap">
          <div className="hero-halo halo-outer" aria-hidden="true" />
          <div className="hero-halo halo-inner" aria-hidden="true" />
          <div className="hero-product">
            <Image
              alt="VELORA Phase One renewal serum in a pearl glass bottle"
              fill
              preload
              sizes="(max-width: 767px) 72vw, 32vw"
              src="/velora/phase-serum.png"
            />
          </div>
          <span className="formula-label label-a" aria-hidden="true">01 / BIO-RETINOL</span>
          <span className="formula-label label-b" aria-hidden="true">02 / COPPER PEPTIDES</span>
          <span className="formula-label label-c" aria-hidden="true">03 / SNOW MUSHROOM</span>
        </div>

        <div className="hero-copy">
          <span className="eyebrow"><i /> Performance skincare for the in-between</span>
          <h1>Your skin.<br /><em>Re-authored.</em></h1>
          <p>Bio-intelligent formulas that move with your skin—not against it.</p>
          <div className="hero-actions">
            <a className="velora-button velora-button-light magnetic" href="#shop">Enter the ritual <ArrowIcon /></a>
            <button className="text-button" onClick={() => openQuickView(products[0])} type="button">Meet Phase One <ArrowIcon diagonal /></button>
          </div>
        </div>

        <div className="hero-scroll-cue" aria-hidden="true"><span>Scroll to shift phase</span><i><b /></i></div>

        <div className="hero-portal-copy" aria-hidden="true">
          <span>YOUR SKIN IS NOT STATIC</span>
          <strong>NEITHER<br />ARE WE.</strong>
        </div>
      </div>
    </section>
  );
}

export function StoryWorld() {
  return (
    <section className="phase-story" id="about">
      <div className="phase-story-stage">
        <div className="story-progress" aria-hidden="true"><span>THE VELORA METHOD</span><i><b /></i><small>01 — 03</small></div>

        <article className="story-scene story-origin">
          <div className="story-portrait">
            <Image alt="Luminous skin crossed by a crescent of lavender light" fill sizes="100vw" src="/velora/skin-phase.png" />
            <div className="portrait-veil" />
          </div>
          <div className="story-origin-copy">
            <span className="eyebrow">01 / The origin</span>
            <h2>Beauty has<br />always been<br /><em>in motion.</em></h2>
            <p>VELORA studies the living rhythms of skin—its recovery cycles, its shifting needs, its remarkable instinct to return to balance.</p>
          </div>
          <span className="story-giant-type" aria-hidden="true">ALIVE</span>
        </article>

        <article className="story-scene story-portals" id="collections">
          <div className="portal-heading">
            <span className="eyebrow">02 / Choose your phase</span>
            <h2>Three states.<br /><em>One living barrier.</em></h2>
          </div>
          <a className="category-portal portal-cleanse" href="#shop">
            <span>01</span><strong>CLEANSE</strong><small>Reset without stripping</small>
          </a>
          <a className="category-portal portal-treat" href="#shop">
            <span>02</span><strong>TREAT</strong><small>Signal visible renewal</small>
          </a>
          <a className="category-portal portal-seal" href="#shop">
            <span>03</span><strong>SEAL</strong><small>Hold the good in</small>
          </a>
          <div className="portal-orbit-line" aria-hidden="true" />
        </article>

        <article className="story-scene story-formula" id="ritual">
          <div className="formula-product">
            <div className="formula-ring ring-one" aria-hidden="true" />
            <div className="formula-ring ring-two" aria-hidden="true" />
            <Image alt="Phase One serum surrounded by its active formula layers" fill sizes="40vw" src="/velora/phase-serum.png" />
          </div>
          <div className="ingredient ingredient-one"><i /><span>FERMENTED BAKUCHIOL</span><small>Visible renewal, lower reactivity</small></div>
          <div className="ingredient ingredient-two"><i /><span>COPPER TRIPEPTIDE</span><small>Supports the skin&apos;s repair signals</small></div>
          <div className="ingredient ingredient-three"><i /><span>TREMELLA COMPLEX</span><small>Multi-depth water binding</small></div>
          <div className="formula-copy">
            <span className="eyebrow">03 / Bio-intelligent actives</span>
            <h2>A formula that<br /><em>listens first.</em></h2>
            <p>Clinically considered concentrations. Zero fragrance. No aggressive cycles. Just intelligent support for the skin you are already in.</p>
          </div>
        </article>
      </div>
    </section>
  );
}

export function ProductCard({ product, addToCart, openQuickView, toggleWishlist, wishlist }: { product: Product } & StoreActions) {
  const wished = wishlist.includes(product.id);
  return (
    <article className="product-card">
      <div className="product-card-media">
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={wished}
          className={`wishlist-button${wished ? " is-wished" : ""}`}
          onClick={() => toggleWishlist(product.id)}
          type="button"
        >
          <HeartIcon filled={wished} />
        </button>
        <button aria-label={`Quick view ${product.name}`} className="product-image-button" onClick={() => openQuickView(product)} type="button">
          <Image
            alt={`${product.name} — ${product.ritual}`}
            className={product.imageClass}
            fill
            sizes="(max-width: 767px) 78vw, 30vw"
            src={product.image}
          />
        </button>
        <button className="quick-add-button" onClick={() => addToCart(product)} type="button">
          Quick add <PlusIcon />
        </button>
      </div>
      <div className="product-card-meta">
        <div>
          <small>{product.ritual}</small>
          <h3><button onClick={() => openQuickView(product)} type="button">{product.name}</button></h3>
        </div>
        <div className="product-price">
          {product.originalPrice && <s>${product.originalPrice}</s>}
          <span>${product.price}</span>
        </div>
      </div>
      <div className="product-rating" aria-label={`${product.rating} out of 5 stars from ${product.reviews} reviews`} role="img">
        <StarIcon size={11} /><span>{product.rating}</span><small>({product.reviews})</small>
      </div>
    </article>
  );
}

export function CollectionRail(actions: StoreActions) {
  return (
    <section className="collection-scroll" id="shop">
      <div className="collection-stage">
        <div className="collection-heading">
          <div><span className="eyebrow">The phase collection · 06 formulas</span><h2>Objects of<br /><em>daily desire.</em></h2></div>
          <p>High-performance essentials, designed as one fluid ritual. Drag your gaze. Let the scroll do the rest.</p>
        </div>
        <div className="collection-rail">
          {products.slice(0, 5).map((product) => <ProductCard {...actions} key={product.id} product={product} />)}
          <article className="collection-manifesto">
            <span>THE PROMISE</span>
            <strong>Every formula<br />earns its place.</strong>
            <p>No filler steps. No invented concerns. Just what supports the skin&apos;s own intelligence.</p>
            <a href="#products">Build your ritual <ArrowIcon /></a>
          </article>
        </div>
        <div className="collection-index" aria-hidden="true"><span>01</span><i><b /></i><small>06</small></div>
      </div>
    </section>
  );
}

export function ProductExplorer(actions: StoreActions) {
  return (
    <section className="product-explorer" id="products">
      <div className="explorer-head">
        <span className="eyebrow">Best sellers + new arrivals</span>
        <h2>Your ritual,<br /><em>in full.</em></h2>
        <p>Designed to layer intuitively from the lightest phase to the most protective.</p>
      </div>
      <div className="explorer-grid">
        {products.map((product) => <ProductCard {...actions} key={product.id} product={product} />)}
      </div>
    </section>
  );
}

export function ConversionWorld({ notify }: { notify: (message: string) => void }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [email, setEmail] = useState("");

  const submitEmail = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    notify("You are on the VELORA field notes list.");
    setEmail("");
  };

  return (
    <>
      <section className="proof-world" id="reviews">
        <div className="proof-orbit" aria-hidden="true"><span>4.9</span><small>AVERAGE RATING<br />1,840 VERIFIED RITUALS</small></div>
        <div className="proof-heading"><span className="eyebrow">Field reports · 04</span><h2>Skin tells<br /><em>the truth.</em></h2></div>
        <blockquote className="proof-quote proof-quote-main">
          <p>“The first routine I have stayed loyal to. My skin feels quieter, clearer—and completely like itself.”</p>
          <footer><span>LEILA M.</span><small>Phase One + Moon Melt · Verified</small></footer>
        </blockquote>
        <blockquote className="proof-quote proof-quote-side">
          <p>“Cloud Cleanse leaves nothing behind except calm.”</p>
          <footer><span>AMARA J.</span><small>Verified ritual</small></footer>
        </blockquote>
        <div className="press-line"><span>SEEN IN</span><strong>MONOCLE</strong><strong>VOGUE</strong><strong>WALLPAPER*</strong><strong>THE CUT</strong></div>
      </section>

      <section className="service-world" id="shipping">
        {[
          ["01", "Free considered delivery", "Complimentary shipping over $75. Carbon-neutral routes where available."],
          ["02", "30-day ritual returns", "Unopened returns are simple. Formula guidance is always human."],
          ["03", "Secure by design", "Encrypted checkout with all major cards, Apple Pay, and Shop Pay."],
          ["04", "A real skin concierge", "Thoughtful support Monday–Friday, from regimen order to compatibility."],
        ].map(([number, title, text]) => (
          <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
        ))}
      </section>

      <section className="faq-world" id="faq">
        <div className="faq-heading"><span className="eyebrow">Questions, answered</span><h2>Before you<br /><em>begin.</em></h2><p>Need a more personal answer? <a href="mailto:ritual@velora.example">Talk to our ritual team.</a></p></div>
        <div className="faq-list">
          {faqs.map((faq, index) => {
            const open = index === openFaq;
            return (
              <article className={open ? "is-open" : ""} key={faq.question}>
                <h3>
                  <button aria-expanded={open} onClick={() => setOpenFaq(open ? -1 : index)} type="button">
                    <span><small>0{index + 1}</small>{faq.question}</span><PlusIcon />
                  </button>
                </h3>
                <div className="faq-answer"><p>{faq.answer}</p></div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="newsletter-world">
        <div className="newsletter-moon" aria-hidden="true"><Image alt="" fill sizes="50vw" src="/velora/moon-melt.png" /></div>
        <span className="newsletter-ghost" aria-hidden="true">VELORA</span>
        <div className="newsletter-copy">
          <span className="eyebrow">Enter our orbit</span>
          <h2>A quieter kind<br />of <em>beauty letter.</em></h2>
          <p>Field notes on skin, science, and ritual. Plus 15% off your first phase.</p>
          <form onSubmit={submitEmail}>
            <label className="sr-only" htmlFor="newsletter-email">Email address</label>
            <input id="newsletter-email" onChange={(event) => setEmail(event.target.value)} placeholder="Email address" required type="email" value={email} />
            <button aria-label="Join the newsletter" type="submit"><ArrowIcon /></button>
          </form>
          <small>By subscribing, you agree to our privacy policy.</small>
        </div>
      </section>
    </>
  );
}

export function Footer() {
  return (
    <footer className="velora-footer">
      <div className="footer-brand">
        <Wordmark footer />
        <p>Bio-intelligent skincare<br />for skin in motion.</p>
        <div className="footer-social"><a href="#instagram">Instagram</a><a href="#pinterest">Pinterest</a><a href="#tiktok">TikTok</a></div>
      </div>
      <div className="footer-links">
        <div><span>SHOP</span><a href="#shop">All formulas</a><a href="#collections">Collections</a><a href="#products">Best sellers</a><a href="#products">New arrivals</a></div>
        <div><span>CARE</span><a href="#ritual">Our method</a><a href="#about">About VELORA</a><a href="#reviews">Reviews</a><a href="#faq">FAQ</a></div>
        <div><span>HELP</span><a href="mailto:care@velora.example">Contact</a><a href="#shipping">Shipping & returns</a><a href="#accessibility">Accessibility</a><a href="#privacy">Privacy</a></div>
      </div>
      <div className="footer-bottom"><span>© 2026 VELORA LABS</span><span>FORMULATED WITH INTENTION · NEVER TESTED ON ANIMALS</span><a href="#top">BACK TO TOP ↑</a></div>
    </footer>
  );
}
