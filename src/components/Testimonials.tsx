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
    author: 'Khalid Al-Rashid',
    title: 'Art Director, Dubai',
    rating: 5,
  },
  {
    quote: 'Die erste Edition, die mich wirklich überrascht hat. Komplex, aber nie aufdringlich.',
    author: 'Faris Al-Hassan',
    title: 'Private Collector',
    rating: 5,
  },
  {
    quote: 'Endlich ein Duft, der sich nicht erklärt. Er wirkt. Punkt.',
    author: 'Omar Benzema',
    title: 'Fashion Editor',
    rating: 5,
  },
  {
    quote: 'Luxus neu definiert. Ohne Kompromisse, ohne Erklärungen nötig.',
    author: 'Rashid Al-Farsi',
    title: 'Entrepreneur, Abu Dhabi',
    rating: 5,
  },
  {
    quote: 'Ein Statement, das bleibt. Mein Signature-Duft für besondere Anlässe.',
    author: 'Yusuf Al-Qasimi',
    title: 'Designer',
    rating: 5,
  },
  {
    quote: 'POLIGAMIA versteht, was wahre Exklusivität bedeutet. Nicht für jeden — genau richtig.',
    author: 'Nabil Mansour',
    title: 'Gallerist, Berlin',
    rating: 5,
  },
  {
    quote: 'Die Verpackung allein ist schon Kunst. Der Duft selbst? Meisterhaft.',
    author: 'Ahmed Al-Maktoum',
    title: 'Creative Director',
    rating: 5,
  },
  {
    quote: 'Ich bekomme ständig Komplimente. EXORDIUM ist mein Geheimnis.',
    author: 'Samir El-Amin',
    title: 'Architect',
    rating: 5,
  },
  {
    quote: 'Ein Duft, der Geschichten erzählt. Jede Note eine Erinnerung.',
    author: 'Mohammed Al-Thani',
    title: 'Investor, Qatar',
    rating: 5,
  },
  {
    quote: 'EXORDIUM hat meine Erwartungen übertroffen. Wahre Handwerkskunst.',
    author: 'Amir Khaled',
    title: 'Interior Designer',
    rating: 5,
  },
  {
    quote: 'Selten findet man solche Tiefe in einem modernen Duft. Beeindruckend.',
    author: 'Hassan Al-Jabri',
    title: 'Art Collector, Kuwait',
    rating: 5,
  },
  {
    quote: 'Die Exklusivität spürt man sofort. Ein Duft für Kenner.',
    author: 'Bilal Benali',
    title: 'Fashion Designer',
    rating: 5,
  },
  {
    quote: 'POLIGAMIA hat verstanden, was Luxus wirklich bedeutet.',
    author: 'Tariq Al-Saud',
    title: 'Private Banker',
    rating: 5,
  },
  {
    quote: 'Mein neuer Favorit. Die Sillage ist perfekt — präsent, aber elegant.',
    author: 'Zayed Al-Mutairi',
    title: 'CEO, Dubai',
    rating: 5,
  },
  {
    quote: 'Ein Meisterwerk. Die Komposition ist einzigartig und unvergesslich.',
    author: 'Ibrahim Hakim',
    title: 'Hotelier',
    rating: 5,
  },
  {
    quote: 'EXORDIUM ist wie Kunst — man muss es erleben, um es zu verstehen.',
    author: 'Rayan Al-Fayed',
    title: 'Gallery Owner',
    rating: 5,
  },
  {
    quote: 'Jedes Detail stimmt. Vom Flakon bis zur letzten Note.',
    author: 'Malik Saeed',
    title: 'Brand Strategist',
    rating: 5,
  },
  {
    quote: 'Ein Duft, der Selbstbewusstsein verleiht. Absolut einzigartig.',
    author: 'Hamza Al-Hashimi',
    title: 'Luxury Consultant',
    rating: 5,
  },
  {
    quote: 'Die limitierte Edition war die richtige Entscheidung. Ich bin stolz, dabei zu sein.',
    author: 'Karim Nasser',
    title: 'Entrepreneur, Beirut',
    rating: 5,
  },
  {
    quote: 'EXORDIUM spricht für sich selbst. Keine Worte nötig.',
    author: 'Yasser Al-Rasheed',
    title: 'Photographer',
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
