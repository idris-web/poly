import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './Hero.module.css';

export default function Hero() {
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
        <img
          src="/hero-bg.jpg"
          alt=""
          className={styles.heroBgImage}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className={styles.heroBgOverlay} />
      </div>

      {/* Content */}
      <div className={styles.heroContent}>
        {/* Left Side - Text */}
        <div className={styles.heroText}>
          <h1 className={`${styles.heroHeadline} hero-headline`}>
            <span className={styles.heroHeadlineFirst}>POLIGAMIA ist mehr als eine Parfümmarke.</span>
            <span className={styles.heroHeadlineSecondLine}>Es ist ein <span className={styles.heroHeadlineGradient}>Manifest.</span></span>
          </h1>

          <p className={`${styles.heroSubtitle} hero-subtitle`}>
            Exklusive Düfte mit eleganter, moderner Note —
            gemacht für die, die herausstechen.
          </p>

          <div className={`${styles.heroButtons} hero-buttons`}>
            <button
              className={styles.btnPrimary}
              onClick={() => scrollToSection('#exordium')}
            >
              Kollektion entdecken
            </button>
            <button
              className={styles.btnSecondary}
              onClick={() => scrollToSection('#anfragen')}
            >
              Anfragen
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
