import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Exordium.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Exordium() {
  const sectionRef = useRef<HTMLElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="exordium" className={styles.exordium}>

      <div className={styles.container}>
        {/* Product Side */}
        <div className={styles.productSide}>
          <div ref={productRef} className={styles.productWrapper}>
            {/* Subtle Glow */}
            <div className={styles.productGlow} />

            {/* Product Image */}
            <div className={styles.productImage}>
              <img
                src="/parfume-no-bg.png"
                alt="EXORDIUM - Extrait de Parfum"
                className={styles.bottleImage}
              />
            </div>
          </div>
        </div>

        {/* Content Side */}
        <div ref={contentRef} className={styles.contentSide}>
          <span className={`${styles.label} exordium-text`}>
            First Edition
          </span>

          <h2 className={`${styles.title} exordium-text`}>
            <span className={styles.titleGold}>EXORDIUM</span> — Der Ursprung
          </h2>

          <p className={`${styles.description} exordium-text`}>
            Ein Duft, der nicht nur verführt, sondern erwacht. Kraftvoll. Rätselhaft. Unberechenbar.
          </p>

          <div className={`${styles.quote} exordium-text`}>
            <p>
              Kein Parfüm, das man trägt — ein Parfüm, das man <span className={styles.emphasis}>wird.</span>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
