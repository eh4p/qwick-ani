"use client";

import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Image from "next/image";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";

type Product = {
  id: string;
  object: string;
  name: string;
  category: string;
  price: number;
  image: string;
  alt: string;
  status: string;
  rating: string;
  material: string;
  dimensions: string;
  description: string;
  variants: string[];
};

type CartLine = {
  id: string;
  quantity: number;
  variant: string;
};

type Panel = "menu" | "search" | "account" | "wishlist" | "cart" | null;

const products: Product[] = [
  {
    id: "fold-lounge",
    object: "OBJ. 001",
    name: "Fold Lounge",
    category: "Seating / Soft form",
    price: 1840,
    image: "/stillform/fold-lounge.png",
    alt: "Ivory bouclé Fold lounge chair in a modular paper exhibition room",
    status: "Made to order · 5 weeks",
    rating: "4.9 / 38 reviews",
    material: "Wool bouclé / FSC timber",
    dimensions: "W 91 × D 88 × H 72 cm",
    description:
      "A low chair built around one continuous gesture. Its folded arm becomes structure, support, and a place to pause.",
    variants: ["Oat bouclé", "Graphite wool", "Oxide weave"],
  },
  {
    id: "pleat-lamp",
    object: "OBJ. 014",
    name: "Pleat 02 Lamp",
    category: "Light / Paper study",
    price: 420,
    image: "/stillform/pleat-lamp.png",
    alt: "Pleated paper lamp with an oxide red stem beside an ultramarine opening",
    status: "In stock · Dispatches in 2 days",
    rating: "4.8 / 64 reviews",
    material: "Washi paper / Powder-coated steel",
    dimensions: "Ø 38 × H 61 cm",
    description:
      "A portable pool of warm light. Hand-creased paper softens the source while a slim steel stem keeps the silhouette exact.",
    variants: ["Oxide / Paper", "Blue / Paper", "Ink / Paper"],
  },
  {
    id: "stack-vessels",
    object: "OBJ. 022",
    name: "Stack Vessel Set",
    category: "Table / Fired earth",
    price: 260,
    image: "/stillform/stack-vessels.png",
    alt: "Three handmade stoneware vessels arranged on architectural plinths",
    status: "Small batch · 12 remaining",
    rating: "4.7 / 21 reviews",
    material: "Speckled stoneware / Mineral glaze",
    dimensions: "Set of three · 14–31 cm",
    description:
      "Three useful volumes thrown by hand. Keep them separate, or stack their silhouettes into a changing domestic sculpture.",
    variants: ["Oat set", "Charcoal set", "Mixed set"],
  },
  {
    id: "grid-throw",
    object: "OBJ. 031",
    name: "Room Grid Throw",
    category: "Textile / Woven plane",
    price: 190,
    image: "/stillform/grid-throw.png",
    alt: "Oat grid throw and oxide cushion folding through a wall opening",
    status: "In stock · Dispatches in 2 days",
    rating: "4.9 / 47 reviews",
    material: "70% wool / 30% linen",
    dimensions: "140 × 190 cm",
    description:
      "A heavyweight woven plane that gives a room a softer geometry. Reversible, breathable, and finished with a raw edge.",
    variants: ["Oat / Graphite", "Blue / Oat", "Oxide / Sand"],
  },
];

const roomNames = [
  "Entry installation",
  "Domestic manifesto",
  "Collection archive",
  "Hero object",
  "Product wall",
  "Detail chamber",
  "Social proof",
  "Brand archive",
  "Commerce register",
  "Visitor services",
  "Final installation",
  "Exit",
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

export default function Portfolio() {
  const experienceRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const activeRoomRef = useRef(0);
  const [activeRoom, setActiveRoom] = useState(0);
  const [panel, setPanel] = useState<Panel>(null);
  const [quickProduct, setQuickProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(
    Object.fromEntries(products.map((product) => [product.id, product.variants[0]])),
  );
  const [quickQuantity, setQuickQuantity] = useState(1);
  const [query, setQuery] = useState("");
  const [registerFilter, setRegisterFilter] = useState("Featured");
  const [subscribed, setSubscribed] = useState(false);

  const dialogOpen = panel !== null || quickProduct !== null;
  const cartQuantity = cart.reduce((total, line) => total + line.quantity, 0);
  const cartSubtotal = cart.reduce((total, line) => {
    const product = products.find((item) => item.id === line.id);
    return total + (product?.price ?? 0) * line.quantity;
  }, 0);

  const searchResults = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return products.slice(0, 3);
    return products.filter((product) =>
      [product.name, product.category, product.material].some((field) =>
        field.toLowerCase().includes(value),
      ),
    );
  }, [query]);
  const relatedProduct = quickProduct
    ? products[(products.findIndex((product) => product.id === quickProduct.id) + 1) % products.length]
    : null;
  const registerProducts = registerFilter === "New arrivals"
    ? products.slice(0, 2)
    : registerFilter === "Best sellers"
      ? products.filter((product) => ["pleat-lamp", "grid-throw"].includes(product.id))
      : products;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({ lerp: 0.075, smoothWheel: true });
    let frame = 0;
    const animate = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    lenis.on("scroll", ScrollTrigger.update);

    const context = gsap.context(() => {
      const rooms = gsap.utils.toArray<HTMLElement>(".room-layer");
      gsap.set(rooms.slice(1), { autoAlpha: 0, pointerEvents: "none" });

      gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: experienceRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * (window.innerWidth < 760 ? 5.4 : 6.8)}`,
          pin: stageRef.current,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const nextRoom = Math.min(5, Math.floor(self.progress * 6));
            if (nextRoom !== activeRoomRef.current) {
              activeRoomRef.current = nextRoom;
              setActiveRoom(nextRoom);
            }
          },
        },
      })
        .to(".entry-word--a", { xPercent: -38, letterSpacing: "0.01em", duration: 1 }, 0)
        .to(".entry-word--b", { xPercent: 42, letterSpacing: "0.01em", duration: 1 }, 0)
        .to(".entry-image", { scale: 1.16, xPercent: 5, duration: 1 }, 0)
        .to(".entry-wall--left", { xPercent: -108, duration: 0.85 }, 0.15)
        .to(".entry-wall--right", { xPercent: 108, duration: 0.85 }, 0.15)
        .to(".room-01", { autoAlpha: 0, pointerEvents: "none", duration: 0.22 }, 0.9)
        .fromTo(
          ".room-02",
          { autoAlpha: 0, clipPath: "inset(46% 0 46% 0)" },
          { autoAlpha: 1, clipPath: "inset(0% 0 0% 0)", pointerEvents: "auto", duration: 0.55 },
          0.82,
        )
        .fromTo(".manifesto-line", { yPercent: 120 }, { yPercent: 0, stagger: 0.08, duration: 0.55 }, 0.92)
        .to(".manifesto-line:nth-child(odd)", { xPercent: -10, duration: 0.8 }, 1.45)
        .to(".manifesto-line:nth-child(even)", { xPercent: 8, duration: 0.8 }, 1.45)
        .to(".room-02", { autoAlpha: 0, pointerEvents: "none", duration: 0.22 }, 1.92)
        .fromTo(".room-03", { autoAlpha: 0 }, { autoAlpha: 1, pointerEvents: "auto", duration: 0.32 }, 1.82)
        .fromTo(".archive-image", { xPercent: 75, rotate: 3 }, { xPercent: 0, rotate: 0, duration: 0.8 }, 1.86)
        .fromTo(".collection-line", { xPercent: -35 }, { xPercent: 0, stagger: 0.1, duration: 0.65 }, 1.92)
        .to(".archive-image", { scale: 1.5, xPercent: -38, duration: 0.85 }, 2.55)
        .to(".room-03", { autoAlpha: 0, pointerEvents: "none", duration: 0.18 }, 2.92)
        .fromTo(".room-04", { autoAlpha: 0 }, { autoAlpha: 1, pointerEvents: "auto", duration: 0.3 }, 2.82)
        .fromTo(".hero-object-image", { scale: 1.55 }, { scale: 1, duration: 0.8 }, 2.78)
        .fromTo(".object-wall--a", { xPercent: -105 }, { xPercent: 0, duration: 0.7 }, 2.95)
        .fromTo(".object-wall--b", { xPercent: 105 }, { xPercent: 0, duration: 0.7 }, 2.95)
        .fromTo(".object-meta > *", { y: 28, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.45 }, 3.15)
        .to(".hero-object-image", { rotate: -2.5, scale: 0.92, xPercent: -8, duration: 0.85 }, 3.65)
        .to(".variant-orbit", { rotate: 20, scale: 1.06, duration: 0.85 }, 3.65)
        .to(".object-wall--a", { xPercent: -105, duration: 0.75 }, 4.12)
        .to(".object-wall--b", { xPercent: 105, duration: 0.75 }, 4.12)
        .to(".room-04", { autoAlpha: 0, pointerEvents: "none", duration: 0.2 }, 4.42)
        .fromTo(".room-05", { autoAlpha: 0 }, { autoAlpha: 1, pointerEvents: "auto", duration: 0.3 }, 4.32)
        .fromTo(".wall-exhibit", { xPercent: 120 }, { xPercent: 0, stagger: 0.12, duration: 0.75 }, 4.34)
        .to(".wall-exhibit--1", { xPercent: -112, duration: 0.7 }, 5.05)
        .to(".wall-exhibit--2", { xPercent: -52, duration: 0.7 }, 5.05)
        .to(".wall-exhibit--3", { xPercent: 7, duration: 0.7 }, 5.05)
        .to(".room-05", { autoAlpha: 0, pointerEvents: "none", duration: 0.2 }, 5.65)
        .fromTo(
          ".room-06",
          { autoAlpha: 0, backgroundColor: "#123eb0" },
          { autoAlpha: 1, backgroundColor: "#eee6d7", pointerEvents: "auto", duration: 0.45 },
          5.54,
        )
        .fromTo(".detail-aperture", { clipPath: "inset(50% 50% 50% 50%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9 }, 5.65)
        .fromTo(".detail-copy > *", { y: 34, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.55 }, 5.88)
        .to(".detail-aperture img", { scale: 1.08, duration: 0.9 }, 6.18);
    }, experienceRef);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      context.revert();
    };
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-room-index]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const room = Number((visible.target as HTMLElement).dataset.roomIndex);
        activeRoomRef.current = room;
        setActiveRoom(room);
      },
      { rootMargin: "-30% 0px -45%", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!dialogOpen) return;
    lastFocusRef.current = document.activeElement as HTMLElement;
    const node = dialogRef.current;
    const focusables = () => Array.from(node?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? []);
    requestAnimationFrame(() => focusables()[0]?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPanel(null);
        setQuickProduct(null);
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("dialog-open");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("dialog-open");
      lastFocusRef.current?.focus();
    };
  }, [dialogOpen]);

  const openPanel = (nextPanel: Exclude<Panel, null>) => {
    setQuickProduct(null);
    setPanel(nextPanel);
  };

  const openQuickView = (product: Product) => {
    setPanel(null);
    setQuickQuantity(1);
    setQuickProduct(product);
  };

  const toggleWishlist = (id: string) => {
    setWishlist((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  };

  const addToCart = (product: Product, quantity = 1) => {
    const variant = selectedVariants[product.id];
    setCart((lines) => {
      const existing = lines.find((line) => line.id === product.id && line.variant === variant);
      if (existing) return lines.map((line) => line === existing ? { ...line, quantity: line.quantity + quantity } : line);
      return [...lines, { id: product.id, quantity, variant }];
    });
    setQuickProduct(null);
    setPanel("cart");
  };

  const changeQuantity = (index: number, amount: number) => {
    setCart((lines) => lines.map((line, lineIndex) => lineIndex === index ? { ...line, quantity: line.quantity + amount } : line).filter((line) => line.quantity > 0));
  };

  const closeOverlay = () => {
    setPanel(null);
    setQuickProduct(null);
  };

  const jumpToRoom = (index: number) => {
    closeOverlay();
    if (index < 6) {
      const trigger = ScrollTrigger.getAll().find((item) => item.trigger === experienceRef.current);
      if (trigger) {
        const position = trigger.start + (trigger.end - trigger.start) * ((index + 0.08) / 6);
        window.scrollTo({ top: position, behavior: "smooth" });
        return;
      }
      document.querySelector(`.room-0${index + 1}`)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const destinations = ["proof", "brand", "shop", "services", "notes", "exit"];
    document.getElementById(destinations[index - 6])?.scrollIntoView({ behavior: "smooth" });
  };

  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
  };

  return (
    <main className="stillform-site" id="entry">
      <header className="wayfinding">
        <a className="wordmark" href="#entry" aria-label="Stillform, back to entry">STILL<span>/</span>FORM</a>
        <a className="current-room" href="#room-index"><span>ROOM {String(activeRoom + 1).padStart(2, "0")}</span><strong>{roomNames[activeRoom]}</strong></a>
        <nav className="commerce-nav" aria-label="Primary navigation">
          <a href="#shop">Shop</a><a href="#collections">Collections</a>
          <button type="button" onClick={() => openPanel("search")}>Search</button>
          <button className="desktop-only" type="button" onClick={() => openPanel("account")}>Account</button>
          <button className="desktop-only" type="button" onClick={() => openPanel("wishlist")}>Saved <sup>{String(wishlist.length).padStart(2, "0")}</sup></button>
          <button type="button" onClick={() => openPanel("cart")}>Cart <sup>{String(cartQuantity).padStart(2, "0")}</sup></button>
          <button className="menu-toggle" type="button" onClick={() => openPanel("menu")} aria-label="Open room index">Index</button>
        </nav>
      </header>

      <aside className="floor-register" id="room-index" aria-label="Exhibition progress">
        <span>1</span><div className="register-track"><i style={{ transform: `scaleY(${(activeRoom + 1) / 12})` }} /></div><span>12</span>
      </aside>

      <section className="exhibition" ref={experienceRef} aria-label="Stillform exhibition rooms one through six">
        <div className="exhibition-stage" ref={stageRef}>
          <section className="room-layer room-01" aria-labelledby="entry-title">
            <div className="entry-image"><Image src={products[0].image} alt={products[0].alt} fill priority sizes="100vw" /></div>
            <div className="entry-wash" /><div className="entry-wall entry-wall--left" /><div className="entry-wall entry-wall--right" />
            <p className="room-stamp">ROOM 01 / ENTRY INSTALLATION / 2026</p>
            <h1 id="entry-title" className="entry-title"><span className="entry-word entry-word--a">STILL</span><span className="entry-word entry-word--b">FORM</span></h1>
            <div className="entry-note"><span>Domestic studies, made useful.</span><span>Scroll to move through the installation ↓</span></div>
          </section>

          <section className="room-layer room-02" aria-labelledby="manifesto-title">
            <p className="room-stamp">ROOM 02 / DOMESTIC MANIFESTO</p>
            <div className="manifesto-copy" id="manifesto-title">
              <div><span className="manifesto-line serif">A home is not</span></div>
              <div><span className="manifesto-line">a finished picture.</span></div>
              <div><span className="manifesto-line serif italic">It is a sequence</span></div>
              <div><span className="manifesto-line">of small rituals.</span></div>
            </div>
            <p className="manifesto-aside">We make tactile objects that leave room for living—quiet in use, exact in form, and better with time.</p>
            <div className="paper-seam paper-seam--one" /><div className="paper-seam paper-seam--two" />
          </section>

          <section className="room-layer room-03" id="collections" aria-labelledby="archive-title">
            <div className="archive-image"><Image src={products[2].image} alt={products[2].alt} fill sizes="55vw" /></div>
            <div className="archive-index">
              <p className="room-stamp">ROOM 03 / COLLECTION ARCHIVE</p>
              <h2 id="archive-title" className="visually-hidden">Collection archive</h2>
              {[["01", "SOFT FORMS", "07 objects"], ["02", "LIGHT STUDIES", "05 objects"], ["03", "FIRED EARTH", "11 objects"], ["04", "WOVEN PLANES", "08 objects"]].map(([number, title, count]) => (
                <a className="collection-line" href="#shop" key={number}><small>{number}</small><span>{title}</span><em>{count} ↘</em></a>
              ))}
            </div>
            <p className="archive-note">ARCHIVE / SS–26<br />Thirty-one objects for rooms in motion.</p>
          </section>

          <section className="room-layer room-04" aria-labelledby="hero-object-title">
            <div className="hero-object-image"><Image src={products[0].image} alt={products[0].alt} fill sizes="70vw" /></div>
            <div className="object-wall object-wall--a"><span>WOOL / 72%</span></div><div className="object-wall object-wall--b"><span>FORM / 001</span></div>
            <div className="object-meta">
              <p className="room-stamp">ROOM 04 / HERO OBJECT</p><p>{products[0].object} · NEW STUDY</p>
              <h2 id="hero-object-title">Fold<br /><i>Lounge</i></h2>
              <div className="object-price"><span>{formatPrice(products[0].price)}</span><span>{products[0].status}</span></div>
              <div className="object-actions"><button type="button" onClick={() => openQuickView(products[0])}>Examine object ↗</button><button type="button" onClick={() => toggleWishlist(products[0].id)} aria-pressed={wishlist.includes(products[0].id)}>{wishlist.includes(products[0].id) ? "Saved ♥" : "Save ♡"}</button></div>
            </div>
            <div className="variant-orbit" aria-hidden="true"><span>OAT</span><span>INK</span><span>OXIDE</span></div>
          </section>

          <section className="room-layer room-05" aria-labelledby="product-wall-title">
            <div className="wall-heading"><p className="room-stamp">ROOM 05 / PRODUCT WALL</p><h2 id="product-wall-title">Objects enter.<br /><i>Rooms change.</i></h2></div>
            {products.slice(1).map((product, index) => (
              <article className={`wall-exhibit wall-exhibit--${index + 1}`} key={product.id}>
                <div className="wall-image"><Image src={product.image} alt={product.alt} fill sizes="36vw" /></div>
                <div className="wall-label"><small>{product.object}</small><strong>{product.name}</strong><span>{formatPrice(product.price)}</span><button type="button" onClick={() => openQuickView(product)}>Quick view ↗</button></div>
              </article>
            ))}
          </section>

          <section className="room-layer room-06" aria-labelledby="detail-title">
            <div className="detail-aperture"><Image src={products[1].image} alt={products[1].alt} fill sizes="58vw" /><span>LIGHT / 2700K</span></div>
            <div className="detail-copy">
              <p className="room-stamp">ROOM 06 / DETAIL CHAMBER</p><p>{products[1].object} · PAPER STUDY</p>
              <h2 id="detail-title">Light should<br /><i>touch a room.</i></h2><p className="detail-body">{products[1].description}</p>
              <dl><div><dt>Material</dt><dd>{products[1].material}</dd></div><div><dt>Dimensions</dt><dd>{products[1].dimensions}</dd></div><div><dt>Status</dt><dd>Available</dd></div></dl>
              <div className="detail-buy"><span>{formatPrice(products[1].price)}</span><button type="button" onClick={() => addToCart(products[1])}>Add to registry +</button></div>
            </div>
          </section>

          <div className="stage-counter" aria-hidden="true"><span>{String(activeRoom + 1).padStart(2, "0")}</span><span>/ 06</span></div>
        </div>
      </section>

      <section className="proof-installation" id="proof" data-room-index="6" aria-labelledby="proof-title">
        <div className="proof-ledger"><p>ROOM 07</p><span>VISITOR NOTE / 048</span><span>VERIFIED OWNER</span><span>BERLIN, DE</span></div>
        <blockquote id="proof-title">“The chair doesn’t ask for attention. It changes the entire room anyway.”</blockquote>
        <div className="proof-footer"><span>ELISE M. / FOLD LOUNGE</span><span>★★★★★ 5.0</span></div>
      </section>

      <section className="brand-archive" id="brand" data-room-index="7" aria-labelledby="brand-title">
        <div className="brand-document brand-document--image"><Image src={products[3].image} alt={products[3].alt} fill sizes="50vw" /><span>DOCUMENT 08—B / TEXTILE BEHAVIOUR</span></div>
        <div className="brand-document brand-document--copy">
          <p className="room-stamp">ROOM 08 / BRAND ARCHIVE</p><h2 id="brand-title">Useful things,<br /><i>honestly made.</i></h2>
          <p>STILL/FORM began as a weekly study of the objects people reach for without thinking. We work with small workshops in Porto, Kyoto, and the Welsh borders, choosing materials for touch, repair, and a long life.</p>
          <div className="archive-facts"><span><b>06</b>making partners</span><span><b>83%</b>natural fibres</span><span><b>2032</b>repair pledge</span></div>
        </div>
      </section>

      <section className="commerce-register" id="shop" data-room-index="8" aria-labelledby="shop-title">
        <div className="register-heading"><p className="room-stamp">ROOM 09 / COMMERCE REGISTER / AVAILABLE OBJECTS</p><h2 id="shop-title">The current<br /><i>domestic studies.</i></h2><p>Every object is made in considered runs. Availability is recorded live in the register below.</p></div>
        <div className="register-tabs" aria-label="Filter available objects">
          {["Featured", "New arrivals", "Best sellers", "All collections"].map((filter) => <button type="button" key={filter} className={registerFilter === filter ? "active" : ""} onClick={() => setRegisterFilter(filter)}>{filter}</button>)}
        </div>
        <div className="product-register">
          {registerProducts.map((product, index) => (
            <article className="product-record" key={product.id}>
              <div className="record-number"><span>{product.object}</span><small>{String(index + 1).padStart(2, "0")} / {String(registerProducts.length).padStart(2, "0")}</small></div>
              <button className="record-image" type="button" onClick={() => openQuickView(product)} aria-label={`Quick view ${product.name}`}><Image src={product.image} alt={product.alt} fill sizes="34vw" /><span>Examine ↗</span></button>
              <div className="record-main"><p>{product.category}</p><h3>{product.name}</h3><span>{product.rating}</span><span>{product.status}</span></div>
              <div className="record-controls">
                <label htmlFor={`variant-${product.id}`}>Finish</label>
                <select id={`variant-${product.id}`} value={selectedVariants[product.id]} onChange={(event) => setSelectedVariants((items) => ({ ...items, [product.id]: event.target.value }))}>{product.variants.map((variant) => <option key={variant}>{variant}</option>)}</select>
                <div><strong>{formatPrice(product.price)}</strong><button type="button" onClick={() => addToCart(product)}>Add +</button></div>
                <button className="save-record" type="button" onClick={() => toggleWishlist(product.id)} aria-pressed={wishlist.includes(product.id)}>{wishlist.includes(product.id) ? "♥ Saved to archive" : "♡ Save object"}</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="visitor-services" id="services" data-room-index="9" aria-labelledby="services-title">
        <div className="service-title-block"><p className="room-stamp">ROOM 10 / VISITOR SERVICES</p><h2 id="services-title">The practical<br /><i>details.</i></h2></div>
        <div className="service-grid">
          <div><span>01 / DELIVERY</span><strong>Complimentary over $250</strong><p>Tracked delivery in 2–5 days for stocked objects. White-glove placement for furniture.</p></div>
          <div><span>02 / RETURNS</span><strong>30 days, unhurried</strong><p>Live with it. If the object is not right, book a collection from your account.</p></div>
          <div><span>03 / PAYMENT</span><strong>Protected and flexible</strong><p>Cards, PayPal, Apple Pay, and instalments. Payments are encrypted end to end.</p></div>
          <div><span>04 / REPAIR</span><strong>Care beyond purchase</strong><p>Replacement covers, repair guidance, and workshop support for every numbered object.</p></div>
        </div>
        <div className="faq-list"><p>FREQUENT QUESTIONS / FILED A–D</p>
          {[["Where are the objects made?", "In small specialist workshops across Portugal, Japan, and the UK. Each product page names its workshop and material origin."], ["Can I order material samples?", "Yes. Textile and finish samples are complimentary and arrive in an archival paper wallet within five days."], ["Do you ship internationally?", "We currently ship to the US, Canada, UK, EU, Japan, and Australia. Duties are calculated before checkout."], ["How does the repair pledge work?", "Send us a photograph and object number. We will recommend a repair, supply a part, or connect you with the original workshop."]].map(([question, answer], index) => (
            <details key={question}><summary><span>0{index + 1}</span>{question}<i>+</i></summary><p>{answer}</p></details>
          ))}
        </div>
      </section>

      <section className="final-installation" id="notes" data-room-index="10" aria-labelledby="newsletter-title">
        <p className="room-stamp">ROOM 11 / FINAL INSTALLATION / NOTES FROM THE STUDIO</p><div className="newsletter-word" aria-hidden="true"><span>STILL</span><span>FORM</span></div>
        <div className="newsletter-content"><h2 id="newsletter-title">A slower kind<br />of <i>new.</i></h2><p>Monthly notes on useful objects, material experiments, and the rooms that hold them.</p>
          {subscribed ? <p className="newsletter-success" role="status">Filed. Your first studio note is on its way.</p> : (
            <form onSubmit={submitNewsletter}><label className="visually-hidden" htmlFor="email">Email address</label><input id="email" type="email" required placeholder="YOUR EMAIL ADDRESS" /><button type="submit">Enter the archive ↗</button></form>
          )}
        </div>
      </section>

      <footer className="site-footer" id="exit" data-room-index="11">
        <div className="footer-top"><p>ROOM 12 / EXIT</p><a href="#entry">Return to entry ↑</a></div><div className="footer-wordmark">STILL<span>/</span>FORM</div>
        <div className="footer-grid">
          <div><strong>VISIT</strong><a href="#shop">Shop all</a><a href="#collections">Collections</a><button type="button" onClick={() => openPanel("wishlist")}>Saved objects</button></div>
          <div><strong>ASSISTANCE</strong><a href="#services-title">Delivery & returns</a><a href="#services-title">Care & repair</a><a href="mailto:studio@stillform.example">Contact the studio</a></div>
          <div><strong>FOLLOW</strong><a href="#entry">Instagram</a><a href="#entry">Pinterest</a><a href="#entry">Journal</a></div>
          <div className="footer-address"><strong>STUDIO</strong><p>14 Paper Street<br />London, E2 7DD<br />Mon–Fri / 10–18</p></div>
        </div>
        <div className="footer-legal"><span>© 2026 STILL/FORM</span><span>Privacy · Terms · Accessibility</span><span>Objects for living, not displaying.</span></div>
      </footer>

      <AnimatePresence>
        {dialogOpen && (
          <motion.div className="overlay-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onMouseDown={(event) => event.target === event.currentTarget && closeOverlay()}>
            <motion.div className={`overlay-architecture ${quickProduct ? "quick-view" : `panel-${panel}`}`} role="dialog" aria-modal="true" aria-label={quickProduct ? `${quickProduct.name} quick view` : `${panel} panel`} ref={dialogRef} initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}>
              <button className="overlay-close" type="button" onClick={closeOverlay}>Close [Esc]</button>

              {panel === "menu" && <div className="room-menu"><p>EXHIBITION INDEX / 12 ROOMS</p><nav aria-label="Room index">
                {roomNames.map((room, index) => <button type="button" key={room} onClick={() => jumpToRoom(index)}><small>{String(index + 1).padStart(2, "0")}</small><span>{room}</span><i>↘</i></button>)}
              </nav></div>}

              {panel === "search" && <div className="search-room"><p>SEARCH THE ARCHIVE / 31 OBJECTS</p><label htmlFor="search-input">What are you looking for?</label><div className="search-field"><input id="search-input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try ‘paper’, ‘light’, ‘wool’…" /><span>⌕</span></div><div className="search-suggestions"><span>QUICK CATEGORIES</span>{["Seating", "Light", "Table", "Textile"].map((term) => <button type="button" key={term} onClick={() => setQuery(term)}>{term}</button>)}</div><div className="search-results">
                {searchResults.length ? searchResults.map((product) => <button type="button" key={product.id} onClick={() => openQuickView(product)}><span className="search-thumb"><Image src={product.image} alt="" fill sizes="96px" /></span><span><small>{product.object}</small><strong>{product.name}</strong><em>{product.category}</em></span><b>{formatPrice(product.price)}</b></button>) : <p>No objects found. Try a material or room.</p>}
              </div></div>}

              {panel === "account" && <div className="account-room"><p>COLLECTOR FILE / ACCOUNT</p><h2>Your objects,<br /><i>kept together.</i></h2><p>Sign in to track delivery, request repairs, save finishes, and keep the provenance record for every object you own.</p><form onSubmit={(event) => event.preventDefault()}><label htmlFor="account-email">Email address</label><input id="account-email" type="email" placeholder="name@example.com" /><button type="submit">Continue with email ↗</button></form><button className="text-button" type="button">Create a collector file</button></div>}

              {panel === "wishlist" && <div className="wishlist-room"><p>SAVED OBJECTS / {String(wishlist.length).padStart(2, "0")}</p><h2>Your private<br /><i>archive.</i></h2>{wishlist.length ? wishlist.map((id) => {
                const product = products.find((item) => item.id === id)!;
                return <article key={id}><button className="saved-image" type="button" onClick={() => openQuickView(product)}><Image src={product.image} alt={product.alt} fill sizes="160px" /></button><div><small>{product.object}</small><strong>{product.name}</strong><span>{selectedVariants[id]}</span><b>{formatPrice(product.price)}</b></div><button type="button" onClick={() => toggleWishlist(id)}>Remove</button></article>;
              }) : <div className="empty-registry"><span>○</span><p>No objects saved yet.</p><button type="button" onClick={closeOverlay}>Continue through the exhibition</button></div>}</div>}

              {panel === "cart" && <div className="cart-room"><div className="cart-heading"><p>PURCHASE REGISTRY / {String(cartQuantity).padStart(2, "0")}</p><h2>Object<br /><i>manifest.</i></h2></div><div className="cart-lines">
                {cart.length ? cart.map((line, index) => {
                  const product = products.find((item) => item.id === line.id)!;
                  return <article key={`${line.id}-${line.variant}`}><div className="cart-thumb"><Image src={product.image} alt="" fill sizes="120px" /></div><div className="cart-line-copy"><small>{product.object}</small><strong>{product.name}</strong><span>{line.variant}</span><b>{formatPrice(product.price * line.quantity)}</b></div><div className="quantity-control" aria-label={`Quantity for ${product.name}`}><button type="button" onClick={() => changeQuantity(index, -1)} aria-label="Decrease quantity">−</button><span>{line.quantity}</span><button type="button" onClick={() => changeQuantity(index, 1)} aria-label="Increase quantity">+</button></div><button className="remove-line" type="button" onClick={() => setCart((lines) => lines.filter((_, lineIndex) => lineIndex !== index))}>Remove</button></article>;
                }) : <div className="empty-registry"><span>□</span><p>Your registry is empty.</p><button type="button" onClick={closeOverlay}>Continue through the exhibition</button></div>}
              </div>{cart.length > 0 && <div className="cart-totals"><div><span>Subtotal</span><strong>{formatPrice(cartSubtotal)}</strong></div><small>Delivery and duties calculated at checkout.</small><button type="button">Proceed to secure checkout ↗</button><button className="text-button" type="button" onClick={closeOverlay}>Continue shopping</button></div>}</div>}

              {quickProduct && relatedProduct && <div className="quick-view-layout"><div className="quick-gallery"><div className="quick-image quick-image--main"><Image src={quickProduct.image} alt={quickProduct.alt} fill sizes="62vw" /></div><div className="quick-image quick-image--detail"><Image src={quickProduct.image} alt={`${quickProduct.name} material detail`} fill sizes="20vw" /></div><span>{quickProduct.object} / GALLERY 01–02</span></div><div className="quick-information"><p>{quickProduct.object} · {quickProduct.category}</p><h2>{quickProduct.name}</h2><div className="quick-rating"><span>★★★★★</span><span>{quickProduct.rating}</span></div><p className="quick-description">{quickProduct.description}</p><dl><div><dt>Material</dt><dd>{quickProduct.material}</dd></div><div><dt>Dimensions</dt><dd>{quickProduct.dimensions}</dd></div><div><dt>Availability</dt><dd>{quickProduct.status}</dd></div></dl><fieldset><legend>Selected finish — {selectedVariants[quickProduct.id]}</legend><div>{quickProduct.variants.map((variant) => <button type="button" key={variant} className={selectedVariants[quickProduct.id] === variant ? "active" : ""} onClick={() => setSelectedVariants((items) => ({ ...items, [quickProduct.id]: variant }))}>{variant}</button>)}</div></fieldset><div className="quick-purchase"><div className="quantity-control"><button type="button" onClick={() => setQuickQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">−</button><span>{quickQuantity}</span><button type="button" onClick={() => setQuickQuantity((value) => value + 1)} aria-label="Increase quantity">+</button></div><button type="button" onClick={() => addToCart(quickProduct, quickQuantity)}>Add to registry · {formatPrice(quickProduct.price * quickQuantity)}</button></div><button className="quick-save" type="button" onClick={() => toggleWishlist(quickProduct.id)}>{wishlist.includes(quickProduct.id) ? "♥ Saved to private archive" : "♡ Save to private archive"}</button><p className="quick-service">Complimentary delivery over $250 · 30-day returns · Repair pledge included</p><button className="quick-related" type="button" onClick={() => openQuickView(relatedProduct)}><span>Next in the archive</span><strong>{relatedProduct.name}</strong><i>↗</i></button></div></div>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
