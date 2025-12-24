import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './Hero.module.css';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Initial state
      gsap.set(['.hero-crown', scrollIndicatorRef.current], {
        opacity: 0,
      });

      // Animate logo
      tl.fromTo(
        '.hero-crown',
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
        }
      )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          '-=0.4'
        );

      // Continuous scroll indicator animation
      gsap.to('.scroll-line', {
        scaleY: 1.5,
        opacity: 0.3,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.hero}>
      {/* Subtle center glow */}
      <div className={styles.heroGlow} />

      <div className={styles.content}>
        <div className={`${styles.fullLogo} hero-crown`}>
          <img src="/logo-full.svg" alt="Poligamia - Not for Everybody" className={styles.logoImage} />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div ref={scrollIndicatorRef} className={styles.scrollIndicator}>
        <span className={styles.scrollText}>Scroll</span>
        <div className={styles.scrollLineWrapper}>
          <div className={`${styles.scrollLine} scroll-line`} />
        </div>
      </div>

      {/* Bottom gradient for smooth transition */}
      <div className={styles.bottomGradient} />
    </section>
  );
}
