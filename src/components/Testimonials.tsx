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
    quote: 'Ein Duft der die Herzen der Frauen erobert! Dieser Duft vermittelt Sicherheit, Seriösität und maskuline Stärke! Er ist Herb gleichzeitig umgibt er die Umgebung von einer wohlen süßen Aura. Not for everyone!',
    author: 'Elvis Z.',
    title: 'Physiotherapeut aus Nürnberg',
    rating: 5,
  },
  {
    quote: 'Poligamija je dozvoljena i eskluziva samo za odabrane muškarce! Miris koji čovjeka čini pravim muškarcem.',
    author: 'Arben Jakupi',
    title: 'Unternehmer und Investor aus Montenegro, Rožaje',
    rating: 5,
  },
  {
    quote: 'Mit über zehn Jahren Erfahrung im Verkauf orientalischer Düfte bewerte ich Poligamia als einen markanten, kompromisslosen und bewusst polarisierenden Duft jenseits des Mainstreams – eine klare Empfehlung für Liebhaber charakterstarker Parfumkunst.',
    author: 'Hakija A.',
    title: 'Unternehmer aus Bosnien, Sarajevo',
    rating: 5,
  },
  {
    quote: 'Honest opinion, I love it. It\'s unique, the notes are well thought out. The sillage is great.',
    author: 'Sajid M.',
    title: 'Entrepreneur and Investor from UAE',
    rating: 5,
  },
  {
    quote: 'Poligamia ist ein außergewöhnlich angenehmer Duft mit warmer, eleganter Ausstrahlung. Dezent im Auftreten, aber spürbar präsent. Er zieht Aufmerksamkeit an, ohne aufdringlich zu sein. Ein Parfum, das im Gedächtnis bleibt – und wirkt.',
    author: 'Faruq al Itali',
    title: 'Unternehmer aus Marokko, Marrakesh',
    rating: 5,
  },
  {
    quote: 'Poligamia steht für ruhige, selbstverständliche Männlichkeit. Keine Süße, kein Lärm. Nur Klarheit und Tiefe. Der Auftakt ist klar und geordnet, doch schnell übernimmt eine souveräne, maskuline Struktur. Zurück bleibt eine holzig-warme, leicht harzige Basis, nah an der Haut, stabil und beständig. Ein Duft für Haltung, nicht für Selbstdarstellung.',
    author: 'Meris C.',
    title: 'IT Security aus Deutschland, Frankfurt a.M.',
    rating: 5,
  },
];

// Split into rows for the floating effect (10 per row for 20 total)
const row1 = testimonials.slice(0, 10);
const row2 = testimonials.slice(10, 20);

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
