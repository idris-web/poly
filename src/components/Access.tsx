import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './Access.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Access() {
  const { t, language } = useLanguage();
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

  // Localized access items
  const accessItems = {
    de: [
      {
        number: '01',
        title: 'Kein Handel',
        description: 'Kein Online-Shop. Keine Läden. Zugang nur auf Einladung. Release ausschließlich auf ausgewählten Events mit limitierter Verfügbarkeit.',
      },
      {
        number: '02',
        title: 'Ausgewählte Events',
        description: 'Jedes POLIGAMIA-Event ist ein Ritual. Geheimnisvoll, sinnlich, provokant. Hier wird EXORDIUM nicht präsentiert, sondern offenbart.',
      },
      {
        number: '03',
        title: 'Auf Einladung',
        description: 'Zugang ausschließlich auf Einladung. Begrenzte Stückzahl. Denn wahre Exklusivität lässt sich nicht anklicken. Sie findet dich.',
      },
    ],
    en: [
      {
        number: '01',
        title: 'No Retail',
        description: 'No online shop. No stores. Access by invitation only. Release exclusively at selected events with limited availability.',
      },
      {
        number: '02',
        title: 'Selected Events',
        description: 'Every POLIGAMIA event is a ritual. Mysterious, sensual, provocative. Here EXORDIUM is not presented, but revealed.',
      },
      {
        number: '03',
        title: 'By Invitation',
        description: 'Access exclusively by invitation. Limited quantity. Because true exclusivity cannot be clicked. It finds you.',
      },
    ],
  };

  // Localized header and quote text
  const headerText = {
    de: {
      title: 'EXORDIUM ist bewusst entzogen –',
      titleHighlight: 'Dem Mainstream. Der Masse. Dem Erwartbaren.',
      subtitle: 'Es findet dich.',
    },
    en: {
      title: 'EXORDIUM is deliberately withheld –',
      titleHighlight: 'From the mainstream. The masses. The expected.',
      subtitle: 'It finds you.',
    },
  };

  const quoteText = {
    de: {
      main: 'Ein Duft, den man nicht einfach kauft.',
      highlight: 'Man erlebt ihn.',
    },
    en: {
      main: "A fragrance you don't simply buy.",
      highlight: 'You experience it.',
    },
  };

  return (
    <section ref={sectionRef} id="access" className={styles.access}>
      <div className={`${styles.container} access-content`}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.overline}>{t.access.overline}</span>
          <h2 className={styles.title}>
            {headerText[language].title}<br />
            <span className={styles.titleHighlight}>{headerText[language].titleHighlight}</span>
          </h2>
          <p className={styles.subtitle}>{headerText[language].subtitle}</p>
        </div>


        {/* Access Cards */}
        <div className={styles.cards}>
          {accessItems[language].map((item, index) => (
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
            {quoteText[language].main}
            <span className={styles.quoteHighlight}>{quoteText[language].highlight}</span>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
