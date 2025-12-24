import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Testimonials.module.css';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  quote: string;
  author: string;
  title: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    quote: 'EXORDIUM ist kein Parfum. Es ist eine Haltung. Jedes Mal, wenn ich es trage, fühle ich mich unaufhaltsam.',
    author: 'M. Richter',
    title: 'Art Director, Berlin',
    rating: 5,
  },
  {
    quote: 'Die erste Edition, die mich wirklich überrascht hat. Komplex, aber nie aufdringlich.',
    author: 'A. von Stein',
    title: 'Private Collector',
    rating: 5,
  },
  {
    quote: 'Endlich ein Duft, der sich nicht erklärt. Er wirkt. Punkt.',
    author: 'J. Schwarz',
    title: 'Fashion Editor',
    rating: 5,
  },
  {
    quote: 'Luxus neu definiert. Ohne Kompromisse, ohne Erklärungen nötig.',
    author: 'L. Weber',
    title: 'Entrepreneur',
    rating: 5,
  },
  {
    quote: 'Ein Statement, das bleibt. Mein Signature-Duft für besondere Anlässe.',
    author: 'S. Hoffmann',
    title: 'Designer',
    rating: 4,
  },
  {
    quote: 'POLIGAMIA versteht, was wahre Exklusivität bedeutet. Nicht für jeden — genau richtig.',
    author: 'T. Neumann',
    title: 'Gallerist',
    rating: 5,
  },
  {
    quote: 'Die Verpackung allein ist schon Kunst. Der Duft selbst? Meisterhaft.',
    author: 'K. Fischer',
    title: 'Creative Director',
    rating: 5,
  },
  {
    quote: 'Ich bekomme ständig Komplimente. EXORDIUM ist mein Geheimnis.',
    author: 'E. Braun',
    title: 'Architect',
    rating: 4,
  },
];

// Split into rows for the floating effect
const row1 = testimonials.slice(0, 4);
const row2 = testimonials.slice(4, 8);

function StarRating({ rating }: { rating: number }) {
  return (
    <div className={styles.stars}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? styles.starFilled : styles.starEmpty}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.testimonial-header',
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.testimonials}>
      {/* Header */}
      <div className={`${styles.header} testimonial-header`}>
        <span className={styles.overline}>Stimmen</span>
        <h2 className={styles.title}>
          Was <span className={styles.titleHighlight}>Auserwählte</span> sagen
        </h2>
      </div>

      {/* Floating Rows */}
      <div className={styles.rowsWrapper}>
        {/* Row 1 - moves left */}
        <div className={styles.row}>
          <div className={styles.rowTrack} data-direction="left">
            {[...row1, ...row1].map((testimonial, index) => (
              <div key={index} className={styles.card}>
                <StarRating rating={testimonial.rating} />
                <blockquote className={styles.quote}>
                  "{testimonial.quote}"
                </blockquote>
                <div className={styles.author}>
                  <div className={styles.authorInfo}>
                    <span className={styles.authorName}>{testimonial.author}</span>
                    <span className={styles.authorTitle}>{testimonial.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - moves right */}
        <div className={styles.row}>
          <div className={styles.rowTrack} data-direction="right">
            {[...row2, ...row2].map((testimonial, index) => (
              <div key={index} className={styles.card}>
                <StarRating rating={testimonial.rating} />
                <blockquote className={styles.quote}>
                  "{testimonial.quote}"
                </blockquote>
                <div className={styles.author}>
                  <div className={styles.authorInfo}>
                    <span className={styles.authorName}>{testimonial.author}</span>
                    <span className={styles.authorTitle}>{testimonial.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
