import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './BrandManifest.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function BrandManifest() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="manifest" className={styles.manifest}>

      <div className={styles.container}>
        {/* Decorative top line */}
        <div className={`${styles.decorativeLine} manifest-line`} />

        <div className={styles.content}>
          <p
            ref={(el) => { textRefs.current[0] = el; }}
            className={styles.statement}
          >
            <span className={styles.highlight}>POLIGAMIA</span> ist mehr als eine Parfümmarke.
          </p>

          <p
            ref={(el) => { textRefs.current[1] = el; }}
            className={styles.statement}
          >
            Es ist ein <span className={styles.highlight}>Manifest.</span>
          </p>

          <p
            ref={(el) => { textRefs.current[2] = el; }}
            className={styles.description}
          >
            Eine Einladung, Grenzen zu überschreiten und Identität neu zu definieren.
            Für jene, die nicht dazugehören wollen — sondern herausstechen.
          </p>


          <p
            ref={(el) => { textRefs.current[4] = el; }}
            className={styles.subStatement}
          >
            Wir erschaffen Düfte für Menschen, die nicht gefallen wollen.
            <br />
            <span className={styles.emphasis}>Sondern wirken.</span>
          </p>
        </div>

      </div>
    </section>
  );
}
