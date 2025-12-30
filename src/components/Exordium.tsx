import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './Exordium.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Exordium() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    video.pause();

    let videoTween: gsap.core.Tween | null = null;
    let isSetup = false;

    const setupVideoScroll = () => {
      if (isSetup) return;
      if (!video.duration || isNaN(video.duration)) return;

      isSetup = true;

      // Use GSAP's native scrub for smooth video scroll
      // scrub: 1 means 1 second catchup time for buttery smoothness
      videoTween = gsap.to(video, {
        currentTime: video.duration,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });
    };

    // Try to setup immediately if video is ready
    if (video.readyState >= 1 && video.duration && !isNaN(video.duration)) {
      setupVideoScroll();
    }

    // Also listen for loadedmetadata as fallback
    video.addEventListener('loadedmetadata', setupVideoScroll);
    video.addEventListener('canplay', setupVideoScroll);

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

    return () => {
      video.removeEventListener('loadedmetadata', setupVideoScroll);
      video.removeEventListener('canplay', setupVideoScroll);
      if (videoTween) videoTween.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="exordium" className={styles.exordium}>
      <div className={styles.container}>
        {/* Product Side */}
        <div className={styles.productSide}>
          <div ref={productRef} className={styles.productWrapper}>
            {/* Scroll-controlled video */}
            <div className={styles.productImage}>
              <video
                ref={videoRef}
                className={styles.bottleVideo}
                src="/poligamia.webm"
                muted
                playsInline
                preload="auto"
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
