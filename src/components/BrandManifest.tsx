import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './BrandManifest.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function BrandManifest() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const manifestWordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each text block on scroll
      textRefs.current.forEach((el, index) => {
        if (!el) return;

        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'top 50%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Animate the decorative elements
      gsap.fromTo(
        '.manifest-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Blur to sharp animation for "Manifest" - runs only once
      if (manifestWordRef.current) {
        gsap.fromTo(
          manifestWordRef.current,
          {
            filter: 'blur(12px)',
            opacity: 0.3,
          },
          {
            filter: 'blur(0px)',
            opacity: 1,
            duration: 1.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="manifest" className={styles.manifest}>

      <div className={styles.container}>
        {/* Decorative top line */}
        <div className={`${styles.decorativeLine} manifest-line`} />

        <div className={styles.content}>
          <span className={styles.badge}>{t.manifest.overline}</span>

          <h2
            ref={(el) => { textRefs.current[0] = el; }}
            className={styles.statement}
          >
            <span className={styles.statementFirst}><span className={styles.highlight}>POLIGAMIA</span> {t.manifest.title}</span>
            <span className={styles.statementSecond}>{t.manifest.subtitle.split(' ').slice(0, -1).join(' ')} <span ref={manifestWordRef} className={styles.manifestWord}>{t.manifest.subtitle.split(' ').slice(-1)[0]}</span></span>
          </h2>

          <p
            ref={(el) => { textRefs.current[2] = el; }}
            className={styles.description}
          >
            {t.manifest.description}
          </p>

          <p
            ref={(el) => { textRefs.current[4] = el; }}
            className={styles.subStatement}
          >
            {t.manifest.values[0].title}: {t.manifest.values[0].desc}
            <br />
            <span className={styles.emphasis}>{t.manifest.values[2].title}: {t.manifest.values[2].desc}</span>
          </p>
        </div>

      </div>
    </section>
  );
}
