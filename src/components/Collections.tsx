import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './Collections.module.css';

gsap.registerPlugin(ScrollTrigger);

const collectionImages = [
  '/shot-02.webp',
  '/mockup-04.webp',
  '/shot-04.webp',
];

export default function Collections() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.collection-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.collections} id="collections">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}>{t.collections.badge}</span>
          <h2 className={styles.title}>
            {t.collections.title}
            <br />
            <span className={styles.titleLight}>{t.collections.titleLight}</span>
          </h2>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {t.collections.items.map((item, index) => (
            <article key={index} className={`${styles.card} collection-card`}>
              <div className={styles.cardImageWrapper}>
                <img
                  src={collectionImages[index]}
                  alt={item.name}
                  className={styles.cardImage}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className={styles.cardOverlay} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.name}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
