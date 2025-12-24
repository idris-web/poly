import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Access.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Access() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple fade in on scroll
      gsap.fromTo(
        '.access-content',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const accessItems = [
    {
      number: '01',
      title: 'Kein Handel',
      description: 'EXORDIUM wird nicht online und nicht im Handel verkauft. Bewusst entzogen — dem Mainstream, der Masse, dem Erwartbaren.',
    },
    {
      number: '02',
      title: 'Ausgewählte Events',
      description: 'Jedes POLIGAMIA-Event ist ein Ritual. Geheimnisvoll, sinnlich, provokant. Hier wird EXORDIUM nicht präsentiert — sondern offenbart.',
    },
    {
      number: '03',
      title: 'Auf Einladung',
      description: 'Zugang ausschließlich auf Einladung. Begrenzte Stückzahl. Denn wahre Exklusivität lässt sich nicht anklicken. Sie findet dich.',
    },
  ];

  return (
    <section ref={sectionRef} id="access" className={styles.access}>
      <div className={`${styles.container} access-content`}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.overline}>Der Zugang</span>
          <h2 className={styles.title}>
            Du kannst EXORDIUM <span className={styles.titleHighlight}>nicht kaufen.</span>
          </h2>
          <p className={styles.subtitle}>Es findet dich.</p>
        </div>

        {/* Divider Line */}
        <div className={styles.dividerLine} />

        {/* Access Cards */}
        <div className={styles.cards}>
          {accessItems.map((item, index) => (
            <div key={index} className={styles.card}>
              <span className={styles.cardNumber}>{item.number}</span>
              <div className={styles.cardDivider} />
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDescription}>{item.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom Quote */}
        <div className={styles.bottomSection}>
          <div className={styles.quoteDivider}>
            <span />
            <div className={styles.diamond} />
            <span />
          </div>
          <blockquote className={styles.quote}>
            Ein Duft, den man nicht einfach kauft.
            <span className={styles.quoteHighlight}>Man erlebt ihn.</span>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
