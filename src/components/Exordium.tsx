import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './Exordium.module.css';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 102;
const getFramePath = (index: number) => `/product-frames/frame_${index}.webp`;

export default function Exordium() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameValueRef = useRef(0); // float frame position for smooth drag
  const [rotationHintVisible, setRotationHintVisible] = useState(true);
  const [rotationHintFading, setRotationHintFading] = useState(false);
  const rotationHintTimerRef = useRef<number | null>(null);

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          imagesRef.current = images;
          setImagesLoaded(true);
        }
      };
      images.push(img);
    }
  }, []);

  // Setup interactive rotation once images are loaded
  useEffect(() => {
    if (!imagesLoaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const images = imagesRef.current;
    const firstImage = images[0];
    let renderWidth = 0;
    let renderHeight = 0;
    const container = canvas.parentElement;
    let lastWidth = 0;
    let lastHeight = 0;
    let lastDpr = 0;

    const resizeCanvas = () => {
      const containerWidth = container?.clientWidth || firstImage.naturalWidth;
      if (!containerWidth) return;
      const aspectRatio = firstImage.naturalHeight / firstImage.naturalWidth;
      renderWidth = containerWidth;
      renderHeight = Math.round(containerWidth * aspectRatio);

      const dpr = window.devicePixelRatio || 1;
      if (
        renderWidth === lastWidth &&
        renderHeight === lastHeight &&
        dpr === lastDpr
      ) {
        return;
      }
      canvas.style.width = `${renderWidth}px`;
      canvas.style.height = `${renderHeight}px`;
      canvas.width = Math.round(renderWidth * dpr);
      canvas.height = Math.round(renderHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastWidth = renderWidth;
      lastHeight = renderHeight;
      lastDpr = dpr;
    };

    const clampOrWrap = (value: number) => {
      // Toggle to false if you ever want to stop after a full 360° instead of looping
      const LOOP_ROTATION = true;
      if (LOOP_ROTATION) {
        const mod = value % FRAME_COUNT;
        return mod < 0 ? mod + FRAME_COUNT : mod;
      }
      return Math.min(FRAME_COUNT - 1, Math.max(0, value));
    };

    const drawFrame = (frameValue: number) => {
      const frameIndex = Math.round(frameValue) % FRAME_COUNT;
      const normalizedIndex = frameIndex < 0 ? frameIndex + FRAME_COUNT : frameIndex;
      ctx.clearRect(0, 0, renderWidth, renderHeight);
      ctx.drawImage(images[normalizedIndex], 0, 0, renderWidth, renderHeight);
    };

    const handleResize = () => {
      resizeCanvas();
      drawFrame(frameValueRef.current);
    };

    // Set canvas size to match container with DPR scaling
    handleResize();

    const applyFrameDelta = (delta: number) => {
      frameValueRef.current = clampOrWrap(frameValueRef.current + delta);
      drawFrame(frameValueRef.current);
    };

    // Initial frame render
    frameValueRef.current = 0;
    drawFrame(frameValueRef.current);
    const pointerState = {
      isDragging: false,
      lastX: 0,
      lastTime: 0,
      velocity: 0,
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (rotationHintTimerRef.current) {
        window.clearTimeout(rotationHintTimerRef.current);
      }
      rotationHintTimerRef.current = window.setTimeout(() => {
        setRotationHintFading(true);
        window.setTimeout(() => setRotationHintVisible(false), 400);
      }, 5000);
      pointerState.isDragging = true;
      pointerState.lastX = e.clientX;
      pointerState.lastTime = performance.now();
      pointerState.velocity = 0;
      canvas.setPointerCapture?.(e.pointerId);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!pointerState.isDragging) return;
      const now = performance.now();
      const dx = e.clientX - pointerState.lastX;
      const dt = now - pointerState.lastTime || 16;

      pointerState.lastX = e.clientX;
      pointerState.lastTime = now;
      pointerState.velocity = dx / dt;

      // Negative dx (drag left) -> next frame; positive dx -> previous frame
      const DRAG_SENSITIVITY = 0.25;
      applyFrameDelta(-dx * DRAG_SENSITIVITY);
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!pointerState.isDragging) return;
      pointerState.isDragging = false;
      canvas.releasePointerCapture?.(e.pointerId);
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    window.addEventListener('resize', handleResize);
    const resizeObserver = container && 'ResizeObserver' in window
      ? new ResizeObserver(() => {
          handleResize();
        })
      : null;
    resizeObserver?.observe(container);

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      resizeObserver?.disconnect();
    };
  }, [imagesLoaded]);

  // Auto-hide rotation hint after a short time
  useEffect(() => {
    const timer = setTimeout(() => {
      setRotationHintFading(true);
      setTimeout(() => setRotationHintVisible(false), 400);
    }, 5500);
    return () => clearTimeout(timer);
  }, []);

  // Other animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        productRef.current,
        { opacity: 0, scale: 0.9, y: 100 },
        {
          opacity: 1, scale: 1, y: 0, duration: 1.5, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
        }
      );
      gsap.fromTo(
        '.exordium-text',
        { opacity: 0, x: 50 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: contentRef.current, start: 'top 70%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="exordium" className={styles.exordium}>
      <div className={styles.container}>
        {/* Product Side */}
        <div className={styles.productSide}>
          <div ref={productRef} className={styles.productWrapper}>
            {/* Scroll-controlled frame animation */}
            <div className={styles.productImage}>
              {rotationHintVisible && (
                <div
                  className={`${styles.rotateHint} ${rotationHintFading ? styles.rotateHintFading : ''}`}
                  aria-hidden="true"
                >
                  <img src="/360.svg" alt="" className={styles.rotateIcon} />
                </div>
              )}
              <canvas
                ref={canvasRef}
                className={styles.bottleCanvas}
              />
            </div>
          </div>
        </div>

        {/* Content Side */}
        <div ref={contentRef} className={styles.contentSide}>
          <span className={`${styles.badge} exordium-text`}>
            {t.exordium.badge}
          </span>

          <h2 className={`${styles.title} exordium-text`}>
            <span className={styles.titleGold}>{t.exordium.title}</span>
            <span className={styles.titleSub}>{t.exordium.titleSub}</span>
          </h2>

          <div className={`${styles.description} exordium-text`}>
            <p>{t.exordium.description}</p>
            <p className={styles.descriptionHighlight}>{t.exordium.descriptionHighlight}</p>
            <p>{t.exordium.descriptionEnd}</p>
          </div>

          <div className={`${styles.details} exordium-text`}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>{t.exordium.concentration}</span>
              <span className={styles.detailValue}>{t.exordium.concentrationValue}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>{t.exordium.content}</span>
              <span className={styles.detailValue}>{t.exordium.contentValue}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>{t.exordium.edition}</span>
              <span className={styles.detailValue}>{t.exordium.editionValue}</span>
            </div>
          </div>

          <div className={`${styles.quote} exordium-text`}>
            <p>
              {t.exordium.quote}
              <br /><br />
              {t.exordium.quoteSuffix} <span className={styles.emphasis}>{t.exordium.quoteHighlight}</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
