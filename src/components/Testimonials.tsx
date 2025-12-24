import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Testimonials.module.css';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  quote: string;
  author: string;
  title: string;
}

const testimonials: Testimonial[] = [
  {
    quote: 'EXORDIUM ist kein Parfum. Es ist eine Haltung.',
    author: 'M. Richter',
    title: 'Art Director, Berlin',
  },
  {
    quote: 'Die erste Edition, die mich wirklich überrascht hat.',
    author: 'A. von Stein',
    title: 'Private Collector',
  },
  {
    quote: 'Endlich ein Duft, der sich nicht erklärt. Er wirkt.',
    author: 'J. Schwarz',
    title: 'Fashion Editor',
  },
  {
    quote: 'Luxus neu definiert. Ohne Kompromisse.',
    author: 'L. Weber',
    title: 'Entrepreneur',
  },
  {
    quote: 'Ein Statement, das bleibt.',
    author: 'S. Hoffmann',
    title: 'Designer',
  },
];

// Duplicate for infinite scroll
const allTestimonials = [...testimonials, ...testimonials];

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

      {/* Floating Testimonials - Marquee */}
      <div className={styles.marqueeWrapper}>
        <div className={styles.marquee}>
          {allTestimonials.map((testimonial, index) => (
            <div key={index} className={styles.card}>
              <blockquote className={styles.quote}>
                "{testimonial.quote}"
              </blockquote>
              <div className={styles.author}>
                <span className={styles.authorName}>{testimonial.author}</span>
                <span className={styles.authorTitle}>{testimonial.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
