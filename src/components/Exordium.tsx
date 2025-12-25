import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Exordium.module.css';

gsap.registerPlugin(ScrollTrigger);

// Total number of frames for 3D rotation
const TOTAL_FRAMES = 160;

// Preload all frames into array
const frameImages: string[] = [];
for (let i = 1; i <= TOTAL_FRAMES; i++) {
  frameImages.push(`/frames/ezgif-frame-${String(i).padStart(3, '0')}.webp`);
}

export default function Exordium() {
  const sectionRef = useRef<HTMLElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentFrameRef = useRef(96); // Start at frame 96 (initial position)
  const preloadedImagesRef = useRef<HTMLImageElement[]>([]);
  const canvasInitializedRef = useRef(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Function to draw frame to canvas (stable reference)
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const images = preloadedImagesRef.current;

    // Clamp frame index to valid range
    const safeIndex = Math.max(0, Math.min(frameIndex, TOTAL_FRAMES - 1));
    const img = images[safeIndex];

    if (canvas && ctx && img && img.complete && img.naturalWidth > 0) {
      // Initialize canvas size once
      if (!canvasInitializedRef.current) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        canvasInitializedRef.current = true;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    }
  }, []);

  // Preload ALL images into memory for instant switching
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    frameImages.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        images[index] = img;
        if (loadedCount === TOTAL_FRAMES) {
          preloadedImagesRef.current = images;
          setImagesLoaded(true);
          // Draw initial frame after a short delay to ensure canvas is ready
          requestAnimationFrame(() => {
            drawFrame(currentFrameRef.current);
          });
        }
      };
      img.onerror = () => {
        console.warn(`Failed to load frame ${index + 1}: ${src}`);
        loadedCount++;
        // Create placeholder for missing frame
        images[index] = new Image();
        if (loadedCount === TOTAL_FRAMES) {
          preloadedImagesRef.current = images;
          setImagesLoaded(true);
        }
      };
    });
  }, [drawFrame]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Product image reveal
      gsap.fromTo(
        productRef.current,
        {
          opacity: 0,
          scale: 0.9,
          y: 100,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );

      // Content reveal
      gsap.fromTo(
        '.exordium-text',
        {
          opacity: 0,
          x: 50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 70%',
          },
        }
      );

      // 3D rotation scroll effect - ultra smooth using canvas & requestAnimationFrame
      let rafId: number | null = null;
      let targetFrame = currentFrameRef.current;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          // Use ALL 160 frames for maximum smoothness (full 360° rotation)
          // Frame 0 (front view) appears at ~40% progress (when section is well visible)
          const startFrame = 96;

          // Linear progression through ALL frames with modulo wrap
          const rawIndex = (startFrame + self.progress * TOTAL_FRAMES) % TOTAL_FRAMES;
          targetFrame = Math.round(rawIndex);

          // Use requestAnimationFrame for smooth updates
          if (currentFrameRef.current !== targetFrame && !rafId) {
            rafId = requestAnimationFrame(() => {
              if (currentFrameRef.current !== targetFrame) {
                currentFrameRef.current = targetFrame;
                drawFrame(targetFrame);
              }
              rafId = null;
            });
          }
        },
      });

    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [drawFrame]);

  return (
    <section ref={sectionRef} id="exordium" className={styles.exordium}>

      <div className={styles.container}>
        {/* Product Side */}
        <div className={styles.productSide}>
          <div ref={productRef} className={styles.productWrapper}>
            {/* Animated Glow Layers */}
            <div className={styles.productGlow} />
            <div className={styles.glowRing} />

            {/* Product Image - 3D Rotation via Canvas for smooth animation */}
            <div className={styles.productImage}>
              {/* Canvas for ultra-smooth frame animation (no React re-renders) */}
              <canvas
                ref={canvasRef}
                className={styles.bottleImage}
                style={{ opacity: imagesLoaded ? 1 : 0 }}
              />
              {/* Fallback while frames load */}
              {!imagesLoaded && (
                <img
                  src="/parfume-no-bg.webp"
                  alt="EXORDIUM - Extrait de Parfum"
                  className={styles.bottleImage}
                />
              )}
            </div>
          </div>
        </div>

        {/* Content Side */}
        <div ref={contentRef} className={styles.contentSide}>
          <span className={`${styles.badge} exordium-text`}>
            First Edition
          </span>

          <h2 className={`${styles.title} exordium-text`}>
            <span className={styles.titleGold}>EXORDIUM</span>
            <span className={styles.titleSub}>The Beginning of the Chosen Ones</span>
          </h2>

          <p className={`${styles.description} exordium-text`}>
            Ein Duft, der nicht nur verführt, sondern erwacht. Kraftvoll. Rätselhaft. Unberechenbar. Jede Note erzählt eine Geschichte von Rebellion und Raffinesse.
          </p>

          <div className={`${styles.details} exordium-text`}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Konzentration</span>
              <span className={styles.detailValue}>Extrait de Parfum</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Inhalt</span>
              <span className={styles.detailValue}>50ml</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Edition</span>
              <span className={styles.detailValue}>Limitiert</span>
            </div>
          </div>

          <div className={`${styles.quote} exordium-text`}>
            <p>
              Ein Duft, erschaffen für Persönlichkeiten, deren Identität nicht verhandelbar ist.
              <br /><br />
              Für jene, die nicht erwartet, sondern <span className={styles.emphasis}>angekündigt</span> werden.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
