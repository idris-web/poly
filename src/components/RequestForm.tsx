import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './RequestForm.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function RequestForm() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.teaser-element',
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const teaserText = {
    de: {
      overline: 'Bald verfügbar',
      title: 'Der Zugang wird gewährt.',
      titleHighlight: 'Nicht gesucht.',
      subtitle: 'EXORDIUM wählt seine Träger.',
      comingSoon: 'Informationen folgen',
      hint: 'Wer bereit ist, wird es erfahren.',
    },
    en: {
      overline: 'Coming Soon',
      title: 'Access will be granted.',
      titleHighlight: 'Not sought.',
      subtitle: 'EXORDIUM chooses its wearers.',
      comingSoon: 'Information to follow',
      hint: 'Those who are ready will know.',
    },
  };

  return (
    <section ref={sectionRef} id="request" className={styles.request}>
      <div className={styles.container}>
        <div className={styles.teaserWrapper}>
          <span className={`${styles.overline} teaser-element`}>
            {teaserText[language].overline}
          </span>

          <h2 className={`${styles.teaserTitle} teaser-element`}>
            {teaserText[language].title}<br />
            <span className={styles.titleHighlight}>{teaserText[language].titleHighlight}</span>
          </h2>

          <p className={`${styles.teaserSubtitle} teaser-element`}>
            {teaserText[language].subtitle}
          </p>

          <div className={`${styles.comingSoonBadge} teaser-element`}>
            <span className={styles.pulsingDot} />
            {teaserText[language].comingSoon}
          </div>

          <p className={`${styles.teaserHint} teaser-element`}>
            {teaserText[language].hint}
          </p>
        </div>
      </div>
    </section>
  );
}
