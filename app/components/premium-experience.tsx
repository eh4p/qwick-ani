"use client";

import { animated, to as springTo, useSpring as useReactSpring } from "@react-spring/web";
import { Alignment, Fit, Layout, RuntimeLoader, useRive } from "@rive-app/react-canvas";
import { getProject, types } from "@theatre/core";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Lottie from "lottie-react";
import { motion, useScroll, useSpring as useMotionSpring, useTransform } from "motion/react";
import dynamic from "next/dynamic";
import { useEffect } from "react";

import { WEBGL_SUPPORTED } from "@/app/lib/webgl-supported";

function NeuralFallback() {
  return (
    <div className="premium-canvas-fallback" aria-hidden="true">
      <i />
      <i />
      <i />
    </div>
  );
}

const NeuralCanvas = dynamic(() => import("./neural-canvas"), {
  ssr: false,
  loading: () => <NeuralFallback />,
});

const sigilAnimation = {
  v: "5.10.0",
  fr: 60,
  ip: 0,
  op: 180,
  w: 200,
  h: 200,
  nm: "LIA Neural Sigil",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Rotating star",
      sr: 1,
      ks: {
        o: { a: 0, k: 78 },
        r: { a: 1, k: [{ t: 0, s: [0] }, { t: 180, s: [360] }] },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [{ t: 0, s: [82, 82, 100] }, { t: 90, s: [104, 104, 100] }, { t: 180, s: [82, 82, 100] }] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "sr", sy: 1, d: 1, pt: { a: 0, k: 8 }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 22.5 }, ir: { a: 0, k: 20 }, is: { a: 0, k: 0 }, or: { a: 0, k: 82 }, os: { a: 0, k: 0 }, nm: "Neural star" },
            { ty: "st", c: { a: 0, k: [0.62, 0.27, 1, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 1.6 }, lc: 2, lj: 2, bm: 0, nm: "Violet stroke" },
            { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 }, sk: { a: 0, k: 0 }, sa: { a: 0, k: 0 } },
          ],
          nm: "Star group",
        },
      ],
      ip: 0,
      op: 180,
      st: 0,
      bm: 0,
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Pulse ring",
      sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 0, s: [70] }, { t: 90, s: [12] }, { t: 180, s: [70] }] },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [{ t: 0, s: [64, 64, 100] }, { t: 90, s: [116, 116, 100] }, { t: 180, s: [64, 64, 100] }] },
      },
      ao: 0,
      shapes: [
        { ty: "el", d: 1, s: { a: 0, k: [126, 126] }, p: { a: 0, k: [0, 0] }, nm: "Ring" },
        { ty: "st", c: { a: 0, k: [0.2, 0.49, 1, 1] }, o: { a: 0, k: 90 }, w: { a: 0, k: 1 }, lc: 2, lj: 2, bm: 0, nm: "Blue stroke" },
      ],
      ip: 0,
      op: 180,
      st: 0,
      bm: 0,
    },
  ],
};

const sectionLinks = [
  ["01", "ORIGIN", "#hero"],
  ["02", "CAPABILITIES", "#features"],
  ["03", "INDUSTRIES", "#industries"],
  ["04", "INTELLIGENCE", "#roi-calculator"],
  ["05", "VOICES", "#testimonials"],
];

const riveLayout = new Layout({ fit: Fit.Cover, alignment: Alignment.Center });
RuntimeLoader.setWasmUrl("/lia/rive.wasm");

const theatreState = {
  sheetsById: {},
  definitionVersion: "0.4.0",
  revisionHistory: ["lia-premium-runtime-v2"],
};

function RiveActor() {
  const { RiveComponent, rive } = useRive({
    src: "/lia/skills.riv",
    autoplay: true,
    layout: riveLayout,
  });

  useEffect(() => {
    if (!rive || rive.animationNames.length === 0) return;
    rive.play(rive.animationNames);
  }, [rive]);

  return (
    <div className="rive-actor-shell" onPointerEnter={() => rive?.play(rive.animationNames)}>
      <RiveComponent aria-label="Interactive LIA intelligence animation" />
      <span>RIVE / LIVE CORE</span>
    </div>
  );
}

export default function PremiumExperience() {
  const { scrollYProgress } = useScroll();
  const progress = useMotionSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.24 });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.07], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.075], [1, 1.16]);
  const actorY = useTransform(scrollYProgress, [0, 0.07], [0, -120]);
  const [{ pointerX, pointerY, pointerScale }, pointerApi] = useReactSpring(() => ({
    pointerX: -120,
    pointerY: -120,
    pointerScale: 0,
    config: { mass: 0.28, tension: 250, friction: 25 },
  }));

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const theatreProject = getProject("LIA Premium Runtime v2", { state: theatreState });
    const atmosphere = theatreProject.sheet("Cinematic Atmosphere").object("Atmosphere", {
      bloom: types.number(0.42, { range: [0, 1] }),
      hue: types.number(0, { range: [-40, 40] }),
      grain: types.number(0.035, { range: [0, 0.15] }),
    }, { reconfigure: true });
    const unsubscribeTheatre = atmosphere.onValuesChange(({ bloom, hue, grain }) => {
      document.documentElement.style.setProperty("--premium-bloom", bloom.toFixed(3));
      document.documentElement.style.setProperty("--premium-hue", `${hue.toFixed(2)}deg`);
      document.documentElement.style.setProperty("--premium-grain", grain.toFixed(3));
    });

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onPointerMove = (event: PointerEvent) => {
      pointerApi.start({ pointerX: event.clientX, pointerY: event.clientY, pointerScale: reducedMotion ? 0 : 1 });
    };
    const onPointerLeave = () => pointerApi.start({ pointerScale: 0 });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);

    if (reducedMotion) {
      return () => {
        unsubscribeTheatre();
        window.removeEventListener("pointermove", onPointerMove);
        document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      };
    }

    const lenis = new Lenis({
      duration: 1.12,
      smoothWheel: true,
      anchors: { offset: 0 },
      easing: (value) => Math.min(1, 1.001 - 2 ** (-10 * value)),
    });
    const updateLenis = (time: number) => lenis.raf(time * 1000);
    const updateScrollTrigger = () => ScrollTrigger.update();
    lenis.on("scroll", updateScrollTrigger);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const cinema = { bloom: 0.42, hue: 0, grain: 0.035 };
    const context = gsap.context(() => {
      gsap.to(".hero-atmosphere", {
        scale: 1.2,
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: 0.8 },
      });
      gsap.to(".hero-copy", {
        yPercent: -18,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: "#hero", start: "35% top", end: "bottom top", scrub: 0.7 },
      });
      gsap.fromTo(
        ".faq-row",
        { x: 46, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.05,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: "#section-faq", start: "top 72%", toggleActions: "play none none reverse" },
        },
      );
      gsap.fromTo(
        ".roi-result",
        { clipPath: "inset(8% 8% 8% 8% round 36px)", scale: 0.94 },
        {
          clipPath: "inset(0% 0% 0% 0% round 28px)",
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: "#roi-calculator", start: "top 72%", end: "center center", scrub: 1 },
        },
      );
      gsap.fromTo(
        ".testimonials-section > header",
        { y: 45, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.15, ease: "power3.out", scrollTrigger: { trigger: "#testimonials", start: "top 75%" } },
      );
      const trustedLogos = gsap.utils.toArray<HTMLElement>(".client-logo");
      const compactTrustedScene = window.matchMedia("(max-width: 760px)").matches;
      const trustedTimeline = gsap.timeline({
        scrollTrigger: compactTrustedScene
          ? { trigger: ".trusted-scene", start: "top 88%", end: "bottom 12%", scrub: 1.15 }
          : { trigger: "#features", start: "56% top", end: "bottom bottom", scrub: 1.15 },
      });
      trustedLogos.forEach((logo, index) => {
        const endpoint = 0.76 + (index / Math.max(1, trustedLogos.length - 1)) * 0.234;
        trustedTimeline.fromTo(
          logo,
          { autoAlpha: 0, scale: 0.58 },
          {
            autoAlpha: 0.82,
            scale: 1,
            duration: 1.25,
            ease: "none",
            motionPath: {
              path: ".trusted-orbit-path",
              align: ".trusted-orbit-path",
              alignOrigin: [0.5, 0.5],
              start: 0,
              end: endpoint,
            },
          },
          index * 0.055,
        );
      });
      trustedTimeline.fromTo(
        ".trusted-word",
        { autoAlpha: 0, y: 22, filter: "blur(11px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.36, stagger: 0.06, ease: "power2.out" },
        0.3,
      );
      trustedTimeline.to(
        ".trusted-word",
        { autoAlpha: 0, y: -14, filter: "blur(9px)", duration: 0.24, stagger: 0.025, ease: "power1.in" },
        1.12,
      );
      gsap.to(cinema, {
        bloom: 0.92,
        hue: 24,
        grain: 0.09,
        ease: "none",
        onUpdate: () => {
          atmosphere.initialValue = cinema;
        },
        scrollTrigger: { trigger: "#features", start: "top top", end: "bottom bottom", scrub: 1.2 },
      });
    }, document.body);

    ScrollTrigger.refresh();
    return () => {
      context.revert();
      lenis.off("scroll", updateScrollTrigger);
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
      unsubscribeTheatre();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      document.documentElement.style.removeProperty("--premium-bloom");
      document.documentElement.style.removeProperty("--premium-hue");
      document.documentElement.style.removeProperty("--premium-grain");
    };
  }, [pointerApi]);

  return (
    <>
      <motion.div className="premium-webgl-layer" style={{ opacity: heroOpacity, scale: heroScale }} aria-hidden="true">
        {WEBGL_SUPPORTED ? <NeuralCanvas /> : <NeuralFallback />}
      </motion.div>
      <motion.div className="rive-intelligence" style={{ opacity: heroOpacity, y: actorY }}>
        <RiveActor />
      </motion.div>
      <motion.div className="lottie-sigil" style={{ opacity: heroOpacity }} aria-hidden="true">
        <Lottie animationData={sigilAnimation} loop autoplay />
      </motion.div>
      <motion.div className="premium-scroll-progress" style={{ scaleY: progress }} aria-hidden="true" />
      <aside className="premium-section-index" aria-label="Page sections">
        {sectionLinks.map(([number, label, href]) => (
          <a key={number} href={href}><span>{number}</span><b>{label}</b></a>
        ))}
      </aside>
      <div className="premium-scanline" aria-hidden="true" />
      <div className="premium-noise" aria-hidden="true" />
      <animated.div
        className="spring-cursor"
        aria-hidden="true"
        style={{
          transform: springTo(
            [pointerX, pointerY, pointerScale],
            (x, y, scale) => `translate3d(${x - 22}px, ${y - 22}px, 0) scale(${scale})`,
          ),
        }}
      ><i /></animated.div>
    </>
  );
}
