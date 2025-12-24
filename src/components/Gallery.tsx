import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Gallery.module.css';

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: '/shot-01.png',
    alt: 'EXORDIUM Collection',
    title: 'Die Essenz',
    subtitle: 'Handgefertigt in limitierter Auflage'
  },
  {
    src: '/shot-03.png',
    alt: 'EXORDIUM Artistic',
    title: 'Das Ritual',
    subtitle: 'Ein Moment der Transformation'
  },
  {
    src: '/shot-04.png',
    alt: 'EXORDIUM Red',
    title: 'Die Leidenschaft',
    subtitle: 'Intensiv und unvergesslich'
  },
  {
    src: '/shot-05.png',
    alt: 'EXORDIUM Blue',
    title: 'Die Tiefe',
    subtitle: 'Mysterium in jeder Note'
  },
  {
    src: '/shot-02.png',
    alt: 'EXORDIUM Detail',
    title: 'Das Handwerk',
    subtitle: 'Perfektion in jedem Detail'
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  // Close lightbox on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxOpen) {
        setLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  const openLightbox = (image: GalleryImage) => {
    setActiveImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setActiveImage(null);
  };

  return (
    <>
      <section ref={sectionRef} className={styles.gallery}>
        <div className={styles.header}>
          <span className={styles.overline}>Die Kollektion</span>
          <h2 className={styles.title}>Visuelle Perfektion</h2>
        </div>

        <div ref={galleryRef} className={styles.galleryGrid}>
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={styles.imageWrapper}
              onClick={() => openLightbox(image)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(image)}
              aria-label={`View ${image.title}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={styles.image}
                loading="lazy"
              />
              <div className={styles.imageOverlay} />

              {/* Caption */}
              <div className={styles.caption}>
                <span className={styles.captionTitle}>{image.title}</span>
                <span className={styles.captionSubtitle}>{image.subtitle}</span>
              </div>

              {/* Zoom Icon */}
              <div className={styles.zoomIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.35-4.35" />
                  <path d="M11 8v6M8 11h6" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && activeImage && (
        <div
          className={styles.lightbox}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            className={styles.lightboxClose}
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className={styles.lightboxImage}
            />
            <div className={styles.lightboxCaption}>
              <h3>{activeImage.title}</h3>
              <p>{activeImage.subtitle}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
