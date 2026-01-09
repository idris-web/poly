import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n/LanguageContext';
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
    quote: 'Dieser Duft vermittelt Sicherheit, Seriösität und maskuline Stärke! Er ist Herb gleichzeitig umgibt er die Umgebung von einer wohlen süßen Aura. Not for everyone!',
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
  {
    quote: 'EXORDIUM ist nicht einfach ein Parfüm – es ist eine Erklärung. Wer es trägt, wird nicht übersehen.',
    author: 'Marcus V.',
    title: 'Unternehmer',
    rating: 5,
  },
  {
    quote: 'Die Komplexität dieses Duftes ist beeindruckend. Er entwickelt sich über Stunden und bleibt einzigartig.',
    author: 'Elena K.',
    title: 'Kunstsammlerin',
    rating: 5,
  },
  {
    quote: 'Endlich ein Duft, der so kompromisslos ist wie ich. POLIGAMIA versteht seine Zielgruppe.',
    author: 'David R.',
    title: 'Kreativdirektor',
    rating: 5,
  },
  {
    quote: 'Die Verarbeitung der Verpackung, der Flasche sowie der goldenen Karte ist einzigartig und absolut überragend. Man merkt sofort, dass hier viel Wert auf Details und Qualität gelegt wurde. Der Duft ist kraftvoll, aber keinesfalls aufdringlich und strahlt Stärke, Eleganz und Selbstbewusstsein aus. Wie der Slogan bereits sagt dieses Parfüm ist wirklich not for Everybody',
    author: 'Adrian D.',
    title: 'Management in Logistik',
    rating: 5,
  },
];

// Single row for the floating effect
const row1 = testimonials;

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
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  // Localized title
  const titleText = {
    de: { prefix: 'Was', highlight: 'Auserwählte', suffix: 'sagen' },
    en: { prefix: 'What the', highlight: 'Chosen', suffix: 'say' },
  };

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
        <span className={styles.overline}>{t.testimonials.overline}</span>
        <h2 className={styles.title}>
          {titleText[language].prefix} <span className={styles.titleHighlight}>{titleText[language].highlight}</span> {titleText[language].suffix}
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

      </div>
    </section>
  );
}
