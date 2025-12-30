import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './Gallery.module.css';

gsap.registerPlugin(ScrollTrigger);

const galleryImageSources = [
  '/mockup-02.webp',
  '/mockup-06.webp',
  '/shot-01.webp',
  '/shot-02.webp',
  '/shot-03.webp',
  '/shot-04.webp',
  '/shot-05.webp',
];

interface GalleryImage {
  src: string;
  title: string;
  subtitle: string;
}

export default function Gallery() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);

  // Create gallery images from translations and image sources
  const galleryImages: GalleryImage[] = t.gallery.images.map((img, index) => ({
    src: galleryImageSources[index],
    title: img.title,
    subtitle: img.subtitle,
  }));

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
          <span className={styles.overline}>{t.gallery.overline}</span>
          <h2 className={styles.title}>{t.gallery.title}</h2>
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
                alt={image.title}
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
              alt={activeImage.title}
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
