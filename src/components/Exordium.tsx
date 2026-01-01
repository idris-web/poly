import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './Exordium.module.css';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 102;
const getFramePath = (index: number) => `/frames/frame-${String(index).padStart(3, '0')}.webp`;

export default function Exordium() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

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

  // Setup scroll animation once images are loaded
  useEffect(() => {
    if (!imagesLoaded) return;
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const images = imagesRef.current;
    const firstImage = images[0];

    // Set canvas size to match image
    canvas.width = firstImage.naturalWidth;
    canvas.height = firstImage.naturalHeight;

    // Draw first frame
    ctx.drawImage(firstImage, 0, 0);

    // Animate frame index with GSAP scrub
    // Start at frame 60, end at frame 90 when scrolling through section
    const frameObj = { frame: 0 };
    const frameTween = gsap.to(frameObj, {
      frame: FRAME_COUNT - 1,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom 5%',
        scrub: 0.5,
      },
      onUpdate: () => {
        const frameIndex = Math.round(frameObj.frame);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(images[frameIndex], 0, 0);
      }
    });

    return () => {
      frameTween.kill();
    };
  }, [imagesLoaded]);

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

          <p className={`${styles.description} exordium-text`}>
            {t.exordium.description}
          </p>

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
