import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './Hero.module.css';

export default function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Set initial states
      gsap.set(['.hero-headline', '.hero-subtitle', '.hero-buttons'], {
        opacity: 0,
      });

      // Animate elements in sequence
      tl.fromTo(
        '.hero-headline',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2 }
      )
        .fromTo(
          '.hero-subtitle',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          '.hero-buttons',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} className={styles.hero}>
      {/* Background Image */}
      <div className={styles.heroBg}>
        <picture>
          <source media="(max-width: 768px)" srcSet="/hero-mobile.webp" />
          <img
            src="/hero-bg.webp"
            alt=""
            className={styles.heroBgImage}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </picture>
        <div className={styles.heroBgOverlay} />
      </div>

      {/* Content */}
      <div className={styles.heroContent}>
        {/* Left Side - Text */}
        <div className={styles.heroText}>
          <div className={`${styles.heroHeadline} hero-headline`}>
            <div className={styles.logoWrapper}>
              <img src="/name-poligamia.svg" alt="POLIGAMIA - Not for everybody" className={styles.heroLogo} />
              <span className={styles.trademark}>®</span>
            </div>
          </div>

          <p className={`${styles.heroSubtitle} hero-subtitle`}>
            POLIGAMIA ist mehr als eine Parfümmarke. Es ist ein Manifest. Eine Einladung, Grenzen zu überschreiten und Identität neu zu definieren. Für jene, die nicht dazugehören wollen, sondern herausstechen.
          </p>

          <div className={`${styles.heroButtons} hero-buttons`}>
            <button
              className={styles.btnPrimary}
              onClick={() => scrollToSection('#exordium')}
            >
              {t.hero.cta}
            </button>
            <button
              className={styles.btnSecondary}
              onClick={() => scrollToSection('#anfragen')}
            >
              {t.nav.request}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
