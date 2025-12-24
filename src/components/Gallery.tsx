import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Gallery.module.css';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: '/shot-01.png', alt: 'EXORDIUM Collection' },
  { src: '/shot-03.png', alt: 'EXORDIUM Artistic' },
  { src: '/shot-04.png', alt: 'EXORDIUM Red' },
  { src: '/shot-05.png', alt: 'EXORDIUM Blue' },
  { src: '/shot-02.png', alt: 'EXORDIUM Detail' },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal scroll animation
      const gallery = galleryRef.current;
      if (!gallery) return;

      const images = gallery.querySelectorAll(`.${styles.imageWrapper}`);

      gsap.fromTo(
        images,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.2,
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
    <section ref={sectionRef} className={styles.gallery}>
      <div className={styles.header}>
        <span className={styles.overline}>Die Kollektion</span>
        <h2 className={styles.title}>Visuelle Perfektion</h2>
      </div>

      <div ref={galleryRef} className={styles.galleryGrid}>
        {galleryImages.map((image, index) => (
          <div key={index} className={styles.imageWrapper}>
            <img
              src={image.src}
              alt={image.alt}
              className={styles.image}
              loading="lazy"
            />
            <div className={styles.imageOverlay} />
          </div>
        ))}
      </div>
    </section>
  );
}
