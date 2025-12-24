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

      // Floating animation for product
      gsap.to(productRef.current, {
        y: -20,
        duration: 3,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Glow pulse
      gsap.to('.product-glow', {
        opacity: 0.6,
        scale: 1.1,
        duration: 2,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="exordium" className={styles.exordium}>
      {/* Background Elements */}
      <div className={styles.bgPattern}>
        <div className={styles.verticalLine} style={{ left: '20%' }} />
        <div className={styles.verticalLine} style={{ left: '80%' }} />
      </div>

      <div className={styles.container}>
        {/* Product Side */}
        <div className={styles.productSide}>
          <div ref={productRef} className={styles.productWrapper}>
            {/* Product Glow */}
            <div className={`${styles.productGlow} product-glow`} />

            {/* Product Image */}
            <div className={styles.productImage}>
              <img
                src="/exordium.png"
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
            Der Ursprung.<br />
            <span className={styles.titleGold}>Der erste Atemzug einer neuen Ära.</span>
          </h2>

          <p className={`${styles.description} exordium-text`}>
            Ein Duft, der nicht nur verführt, sondern erwacht.
            Kraftvoll. Rätselhaft. Unberechenbar.
          </p>

          <p className={`${styles.description} exordium-text`}>
            Er öffnet mit einer klaren, elektrischen Spannung, bevor er sich
            in dunkle, würzige Tiefen senkt, die sich wie ein Flüstern auf
            die Haut legen.
          </p>

          <div className={`${styles.quote} exordium-text`}>
            <span className={styles.quoteMark}>"</span>
            <p>
              EXORDIUM ist kein Parfüm, das man trägt.<br />
              Es ist ein Parfüm, das man <span className={styles.emphasis}>wird.</span>
            </p>
          </div>

          <div className={`${styles.tagline} exordium-text`}>
            <div className={styles.taglineLine} />
            <span>Only for the Chosen Few</span>
            <div className={styles.taglineLine} />
          </div>
        </div>
      </div>
    </section>
  );
}
