"use client";

import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CartItem, Product } from "./store/data";
import {
  CartDrawer,
  Loader,
  QuickView,
  SearchOverlay,
  Toast,
  WishlistDrawer,
} from "./store/overlays";
import {
  CollectionRail,
  ConversionWorld,
  Footer,
  Header,
  Hero,
  ProductExplorer,
  StoryWorld,
} from "./store/scenes";

type Overlay = "cart" | "search" | "wishlist" | "quick-view" | null;

export default function Portfolio() {
  const root = useRef<HTMLElement>(null);
  const toastTimer = useRef(0);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [storageReady, setStorageReady] = useState(false);

  const notify = useCallback((message: string) => {
    window.clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = window.setTimeout(() => setToast(null), 2800);
  }, []);

  useEffect(() => {
    const loaderTimer = window.setTimeout(() => setLoaderVisible(false), 950);
    try {
      const savedCart = window.localStorage.getItem("velora-cart");
      const savedWishlist = window.localStorage.getItem("velora-wishlist");
      if (savedCart) {
        const parsedCart: unknown = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart.filter((value): value is CartItem => {
            if (!value || typeof value !== "object") return false;
            const item = value as Partial<CartItem>;
            return typeof item.productId === "string"
              && typeof item.size === "string"
              && typeof item.quantity === "number"
              && item.quantity > 0;
          }));
        }
      }
      if (savedWishlist) {
        const parsedWishlist: unknown = JSON.parse(savedWishlist);
        if (Array.isArray(parsedWishlist)) setWishlist(parsedWishlist.filter((value): value is string => typeof value === "string"));
      }
    } catch {
      // Storage can be unavailable in private contexts; the store still works in memory.
    }
    setStorageReady(true);
    return () => {
      window.clearTimeout(loaderTimer);
      window.clearTimeout(toastTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem("velora-cart", JSON.stringify(cart));
      window.localStorage.setItem("velora-wishlist", JSON.stringify(wishlist));
    } catch {
      // Keep the session usable even when persistence is blocked.
    }
  }, [cart, storageReady, wishlist]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let lenis: Lenis | null = null;
    let refreshFrame = 0;
    let resizeTimer = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const media = gsap.matchMedia();
    const lenisFrame = (time: number) => lenis?.raf(time * 1000);

    const refresh = () => {
      window.cancelAnimationFrame(refreshFrame);
      refreshFrame = window.requestAnimationFrame(() => {
        lenis?.resize();
        ScrollTrigger.refresh(true);
      });
    };
    const refreshAfterResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(refresh, 160);
    };

    const context = gsap.context(() => {
      if (!reduceMotion) {
        lenis = new Lenis({ anchors: { offset: 0 }, lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.92 });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(lenisFrame);
        gsap.ticker.lagSmoothing(0);

        const heroTimeline = gsap.timeline({
          defaults: { ease: "none", force3D: true },
          scrollTrigger: { trigger: ".velora-hero", start: "top top", end: "bottom bottom", scrub: 1.1 },
        });

        heroTimeline
          .to(".hero-copy", { autoAlpha: 0, yPercent: -35, duration: 0.75 }, 0)
          .to(".hero-display", { opacity: 0.08, scale: 1.14, xPercent: -4, duration: 1.1 }, 0)
          .to(".hero-coordinate", { xPercent: -120, duration: 1 }, 0)
          .to(".hero-edition", { xPercent: 120, duration: 1 }, 0)
          .to(".hero-product", { rotate: -5, scale: 2.55, yPercent: -8, duration: 1.9 }, 0.12)
          .to(".halo-outer", { rotate: 110, scale: 1.8, duration: 1.8 }, 0)
          .to(".halo-inner", { rotate: -90, scale: 0.58, duration: 1.8 }, 0)
          .to(".label-a", { xPercent: -95, yPercent: -100, duration: 1.1 }, 0.18)
          .to(".label-b", { xPercent: 100, yPercent: -180, duration: 1.1 }, 0.22)
          .to(".label-c", { xPercent: 80, yPercent: 110, duration: 1.1 }, 0.28)
          .to(".hero-product-wrap", { autoAlpha: 0, scale: 1.3, duration: 0.42 }, 1.72)
          .fromTo(".hero-portal-copy", { autoAlpha: 0, scale: 0.35, z: -800 }, { autoAlpha: 1, scale: 1, z: 0, duration: 0.75 }, 1.72)
          .to(".hero-aurora-a", { xPercent: 38, scale: 1.55, opacity: 0.8, duration: 1.2 }, 1.35)
          .to(".hero-aurora-b", { xPercent: -40, scale: 1.35, opacity: 0.7, duration: 1.2 }, 1.35)
          .to(".hero-portal-copy", { scale: 1.32, opacity: 0, duration: 0.7 }, 2.58);

        const storyScenes = gsap.utils.toArray<HTMLElement>(".story-scene");
        gsap.set(storyScenes.slice(1), { autoAlpha: 0, clipPath: "inset(100% 0 0 0)" });
        const storyTimeline = gsap.timeline({
          defaults: { force3D: true },
          scrollTrigger: { trigger: ".phase-story", start: "top top", end: "bottom bottom", scrub: 1 },
        });

        storyTimeline
          .to(".story-portrait img", { scale: 1.18, xPercent: -4, duration: 1.1, ease: "none" }, 0)
          .to(".story-giant-type", { xPercent: -28, duration: 1.1, ease: "none" }, 0)
          .to(storyScenes[0], { autoAlpha: 0, scale: 0.92, filter: "blur(8px)", duration: 0.34 }, 0.92)
          .to(storyScenes[1], { autoAlpha: 1, clipPath: "inset(0% 0 0 0)", duration: 0.6, ease: "power3.inOut" }, 0.94)
          .fromTo(".portal-cleanse", { xPercent: -80, rotate: -20 }, { xPercent: 0, rotate: -8, duration: 0.7, ease: "power2.out" }, 1.02)
          .fromTo(".portal-treat", { yPercent: 100, scale: 0.5 }, { yPercent: 0, scale: 1, duration: 0.7, ease: "power2.out" }, 1.08)
          .fromTo(".portal-seal", { xPercent: 80, rotate: 20 }, { xPercent: 0, rotate: 8, duration: 0.7, ease: "power2.out" }, 1.02)
          .to(".portal-orbit-line", { rotate: 100, scale: 1.25, duration: 1.05, ease: "none" }, 1.05)
          .to(storyScenes[1], { autoAlpha: 0, scale: 1.1, filter: "blur(7px)", duration: 0.35 }, 2.15)
          .to(storyScenes[2], { autoAlpha: 1, clipPath: "inset(0% 0 0 0)", duration: 0.6, ease: "power3.inOut" }, 2.18)
          .fromTo(".formula-product", { scale: 0.4, rotate: -18 }, { scale: 1, rotate: 0, duration: 0.72, ease: "power3.out" }, 2.26)
          .fromTo(".ingredient", { autoAlpha: 0, scale: 0.4 }, { autoAlpha: 1, scale: 1, stagger: 0.13, duration: 0.52, ease: "back.out(1.4)" }, 2.52)
          .to(".ring-one", { rotate: 120, duration: 1.05, ease: "none" }, 2.25)
          .to(".ring-two", { rotate: -80, duration: 1.05, ease: "none" }, 2.25)
          .to(".story-progress b", { scaleX: 1, duration: 3.1, ease: "none" }, 0);

        media.add("(min-width: 768px)", () => {
          const magneticCleanups: Array<() => void> = [];
          const rail = document.querySelector<HTMLElement>(".collection-rail");
          if (rail) {
            gsap.to(rail, {
              x: () => -(rail.scrollWidth - window.innerWidth * 0.92),
              ease: "none",
              force3D: true,
              scrollTrigger: {
                trigger: ".collection-scroll",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.05,
                invalidateOnRefresh: true,
              },
            });
            gsap.to(".collection-index b", {
              scaleX: 1,
              ease: "none",
              scrollTrigger: { trigger: ".collection-scroll", start: "top top", end: "bottom bottom", scrub: true },
            });
            gsap.to(".collection-heading", {
              autoAlpha: 0,
              xPercent: -20,
              scrollTrigger: { trigger: ".collection-scroll", start: "top top", end: "18% top", scrub: true },
            });
          }

          gsap.utils.toArray<HTMLElement>(".magnetic").forEach((button) => {
            const move = (event: PointerEvent) => {
              const bounds = button.getBoundingClientRect();
              gsap.to(button, { x: (event.clientX - bounds.left - bounds.width / 2) * 0.14, y: (event.clientY - bounds.top - bounds.height / 2) * 0.14, duration: 0.35 });
            };
            const reset = () => gsap.to(button, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.35)" });
            button.addEventListener("pointermove", move);
            button.addEventListener("pointerleave", reset);
            magneticCleanups.push(() => {
              button.removeEventListener("pointermove", move);
              button.removeEventListener("pointerleave", reset);
            });
          });

          return () => magneticCleanups.forEach((cleanup) => cleanup());
        });

        gsap.utils.toArray<HTMLElement>(".product-explorer, .proof-world, .service-world, .faq-world").forEach((section) => {
          gsap.fromTo(section, { y: 70, opacity: 0.55 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 90%", once: true } });
        });

        gsap.to(".proof-orbit", { rotate: 52, yPercent: -14, ease: "none", scrollTrigger: { trigger: ".proof-world", start: "top bottom", end: "bottom top", scrub: 1 } });
        gsap.to(".newsletter-moon", { rotate: -16, scale: 1.18, ease: "none", scrollTrigger: { trigger: ".newsletter-world", start: "top bottom", end: "bottom top", scrub: 1 } });
      }
    }, root);

    window.addEventListener("load", refresh);
    window.addEventListener("resize", refreshAfterResize);
    window.addEventListener("orientationchange", refresh);
    document.fonts?.addEventListener("loadingdone", refresh);
    document.fonts?.ready.then(refresh);
    refresh();

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refreshAfterResize);
      window.removeEventListener("orientationchange", refresh);
      document.fonts?.removeEventListener("loadingdone", refresh);
      gsap.ticker.remove(lenisFrame);
      lenis?.destroy();
      media.revert();
      context.revert();
    };
  }, []);

  const addToCart = useCallback((product: Product, size = product.sizes[0], quantity = 1) => {
    setCart((current) => {
      const existing = current.find((item) => item.productId === product.id && item.size === size);
      if (existing) return current.map((item) => item === existing ? { ...item, quantity: item.quantity + quantity } : item);
      return [...current, { productId: product.id, quantity, size }];
    });
    notify(`${product.name} entered your ritual.`);
  }, [notify]);

  const removeItem = useCallback((productId: string, size: string) => {
    setCart((current) => current.filter((item) => item.productId !== productId || item.size !== size));
  }, []);

  const updateQuantity = useCallback((productId: string, size: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId, size);
      return;
    }
    setCart((current) => current.map((item) => item.productId === productId && item.size === size ? { ...item, quantity } : item));
  }, [removeItem]);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((current) => {
      const removing = current.includes(productId);
      notify(removing ? "Removed from your orbit." : "Saved to your orbit.");
      return removing ? current.filter((id) => id !== productId) : [...current, productId];
    });
  }, [notify]);

  const openQuickView = useCallback((product: Product) => {
    setSelectedProduct(product);
    setOverlay("quick-view");
  }, []);

  const actions = { addToCart, openQuickView, toggleWishlist, wishlist };
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="velora-store" ref={root}>
      <Loader visible={loaderVisible} />
      <Header
        cartCount={cartCount}
        notify={notify}
        openCart={() => setOverlay("cart")}
        openSearch={() => setOverlay("search")}
        openWishlist={() => setOverlay("wishlist")}
        wishlistCount={wishlist.length}
      />
      <Hero openQuickView={openQuickView} />
      <StoryWorld />
      <CollectionRail {...actions} />
      <ProductExplorer {...actions} />
      <ConversionWorld notify={notify} />
      <Footer />

      <AnimatePresence mode="wait">
        {overlay === "cart" && <CartDrawer cart={cart} key="cart" notify={notify} onClose={() => setOverlay(null)} removeItem={removeItem} updateQuantity={updateQuantity} />}
        {overlay === "search" && <SearchOverlay key="search" onClose={() => setOverlay(null)} openQuickView={openQuickView} />}
        {overlay === "wishlist" && <WishlistDrawer addToCart={addToCart} key="wishlist" onClose={() => setOverlay(null)} openQuickView={openQuickView} toggleWishlist={toggleWishlist} wishlist={wishlist} />}
        {overlay === "quick-view" && selectedProduct && (
          <QuickView
            addToCart={(product, size, quantity) => {
              addToCart(product, size, quantity);
              setOverlay("cart");
            }}
            key={selectedProduct.id}
            onClose={() => setOverlay(null)}
            openProduct={openQuickView}
            product={selectedProduct}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
        )}
      </AnimatePresence>
      <Toast message={toast} />
    </main>
  );
}
