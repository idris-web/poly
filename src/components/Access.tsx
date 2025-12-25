import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Access.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Access() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Limited edition count - would come from API in production
  const totalBottles = 1000;
  const soldBottles = 20;

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

      // Counter animation - runs once when section enters viewport
      if (!hasAnimated && counterRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            setHasAnimated(true);
            const counter = { value: 0 };
            gsap.to(counter, {
              value: soldBottles,
              duration: 2.5,
              ease: 'power2.out',
              onUpdate: () => {
                if (counterRef.current) {
                  counterRef.current.textContent = Math.round(counter.value).toString();
                }
              },
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const accessItems = [
    {
      number: '01',
      title: 'Kein Handel',
      description: 'Kein Online-Shop. Keine Läden. Zugang nur auf Einladung. Release ausschließlich auf ausgewählten Events mit limitierter Verfügbarkeit.',
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
            EXORDIUM ist bewusst entzogen –<br />
            <span className={styles.titleHighlight}>Dem Mainstream. Der Masse. Dem Erwartbaren.</span>
          </h2>
          <p className={styles.subtitle}>Es findet dich.</p>
        </div>

        {/* Scarcity Counter */}
        <div className={styles.scarcitySection}>
          <div className={styles.scarcityBox}>
            <div className={styles.scarcityContent}>
              <span className={styles.scarcityLabel}>Limitierte Edition</span>
              <div className={styles.scarcityCounter}>
                <span ref={counterRef} className={styles.scarcityNumber}>0</span>
                <span className={styles.scarcityDivider}>/</span>
                <span className={styles.scarcityTotal}>{totalBottles}</span>
              </div>
              <span className={styles.scarcitySubtext}>Flaschen vergeben</span>
            </div>
            <div className={styles.scarcityProgress}>
              <div
                className={styles.scarcityBar}
                style={{ width: `${(soldBottles / totalBottles) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className={styles.dividerLine} />

        {/* Access Cards */}
        <div className={styles.cards}>
          {accessItems.map((item, index) => (
            <div key={index} className={styles.card}>
              <img src="/icon-poligamia.svg" alt="" className={styles.cardIcon} />
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
