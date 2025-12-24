import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './FragranceNotes.module.css';

gsap.registerPlugin(ScrollTrigger);

interface NoteCategory {
  title: string;
  subtitle: string;
  notes: string[];
  image: string;
}

const fragranceData: NoteCategory[] = [
  {
    title: 'Top Notes',
    subtitle: 'Fresh & Uplifting',
    notes: ['Lemon', 'Lemon Peel', 'Lavender Blossom', 'Bergamot', 'Rose Petals', 'Geranium'],
    // Replace with your own: /notes-top.jpg
    image: 'https://images.unsplash.com/photo-1587049016823-69ef9d68bd44?w=640&q=80',
  },
  {
    title: 'Heart Notes',
    subtitle: 'Spicy & Sensual',
    notes: ['Nutmeg', 'Clove', 'Tonka Bean', 'Strawberry', 'Patchouli', 'Frankincense'],
    // Replace with your own: /notes-heart.jpg
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=640&q=80',
  },
  {
    title: 'Base Notes',
    subtitle: 'Deep & Seductive',
    notes: ['Amber', 'Labdanum', 'Cedarwood', 'Sandalwood', 'Musk', 'Smoky Cedar Resin'],
    // Replace with your own: /notes-base.jpg
    image: 'https://images.unsplash.com/photo-1599751449318-56f6e7596e6e?w=640&q=80',
  },
];

export default function FragranceNotes() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        '.fragrance-header',
        { opacity: 0, y: 40 },
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
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
              },
            }
          );
        }
      });

      // Notes reveal within each card
      gsap.fromTo(
        '.note-item',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.fragrance}>
      {/* Background Elements */}
      <div className={styles.bgAccent} />

      <div className={styles.container}>
        {/* Header */}
        <div className={`${styles.header} fragrance-header`}>
          <span className={styles.overline}>The Olfactory Journey</span>
          <h2 className={styles.title}>
            Die <span className={styles.titleHighlight}>Duftkomposition</span>
          </h2>
          <p className={styles.subtitle}>
            Eine Symphonie sorgfältig ausgewählter Noten, die sich auf Ihrer Haut entfaltet.
          </p>
        </div>

        {/* Notes Grid */}
        <div className={styles.grid}>
          {fragranceData.map((category, index) => (
            <div
              key={category.title}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={styles.card}
            >
              {/* Background Image - shows on hover */}
              <div
                className={styles.cardImage}
                style={{ backgroundImage: `url(${category.image})` }}
              />

              {/* Title - always visible */}
              <div className={styles.cardTitleWrapper}>
                <span className={styles.cardNumber}>0{index + 1}</span>
                <h3 className={styles.cardTitle}>{category.title}</h3>
              </div>

              {/* Content - hides on hover */}
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardSubtitle}>{category.subtitle}</span>
                </div>

                <div className={styles.cardDivider} />

                <ul className={styles.notesList}>
                  {category.notes.map((note) => (
                    <li key={note} className={`${styles.noteItem} note-item`}>
                      <span className={styles.noteDot} />
                      <span className={styles.noteName}>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Quote */}
        <div className={`${styles.bottomQuote} fragrance-header`}>
          <p>
            Extrait de Parfum — 30% Konzentration für maximale Intensität und Haltbarkeit.
          </p>
        </div>
      </div>
    </section>
  );
}
