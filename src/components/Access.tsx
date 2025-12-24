import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Access.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Access() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.access-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        '.access-card',
        {
          opacity: 0,
          y: 80,
          rotateX: -15,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.access-cards',
            start: 'top 75%',
          },
        }
      );

      // Bottom text
      gsap.fromTo(
        '.access-bottom',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.access-bottom',
            start: 'top 85%',
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
      {/* Icon Pattern Background */}
      <div className="icon-pattern-large" />

      {/* Decorative background */}
      <div className={styles.bgGradient} />

      <div className={styles.container}>
        {/* Header */}
        <div className={`${styles.header} access-title`}>
          <span className={styles.overline}>Der Zugang</span>
          <h2 className={styles.title}>
            Du kannst EXORDIUM<br />
            <span className={styles.titleHighlight}>nicht kaufen.</span>
          </h2>
          <p className={styles.subtitle}>Es findet dich.</p>
        </div>

        {/* Access Cards */}
        <div className={`${styles.cards} access-cards`}>
          {accessItems.map((item, index) => (
            <div key={index} className={`${styles.card} access-card`}>
              <span className={styles.cardNumber}>{item.number}</span>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
              </div>
              <div className={styles.cardLine} />
            </div>
          ))}
        </div>

        {/* Bottom Quote */}
        <div className={`${styles.bottomSection} access-bottom`}>
          <div className={styles.decorativeDivider}>
            <span />
            <div className={styles.diamondSmall} />
            <span />
          </div>

          <blockquote className={styles.quote}>
            Ein Duft, den man nicht einfach kauft.<br />
            <span className={styles.quoteHighlight}>Man erlebt ihn.</span>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
