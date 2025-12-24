import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Collections.module.css';

gsap.registerPlugin(ScrollTrigger);

const collections = [
  {
    id: 1,
    name: 'Die Flasche',
    description: 'Handgefertigtes Design mit zeitloser Eleganz — jedes Detail erzählt eine Geschichte.',
    badge: 'EXORDIUM',
    image: '/shot-01.png',
  },
  {
    id: 2,
    name: 'Der Duft',
    description: 'Luxuriöse Tiefe mit warmen Noten — ein Erlebnis, das in Erinnerung bleibt.',
    badge: 'EXORDIUM',
    image: '/shot-02.png',
  },
  {
    id: 3,
    name: 'Das Erlebnis',
    description: 'Mehr als ein Parfüm — ein Statement für die, die herausstechen wollen.',
    badge: 'EXORDIUM',
    image: '/shot-03.png',
  },
];

export default function Collections() {
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
          <span className={styles.badge}>Unser Produkt</span>
          <h2 className={styles.title}>
            Entdecke EXORDIUM
            <br />
            <span className={styles.titleLight}>aus jeder Perspektive</span>
          </h2>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {collections.map((collection) => (
            <article key={collection.id} className={`${styles.card} collection-card`}>
              <div className={styles.cardImageWrapper}>
                <img
                  src={collection.image}
                  alt={collection.name}
                  className={styles.cardImage}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className={styles.cardOverlay} />
                <span className={styles.cardBadge}>{collection.badge}</span>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{collection.name}</h3>
                <p className={styles.cardDescription}>{collection.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
