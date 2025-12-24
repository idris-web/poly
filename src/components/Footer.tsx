import { useRef } from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const brandTextRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!brandTextRef.current) return;

    const rect = brandTextRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    brandTextRef.current.style.setProperty('--mouse-x', `${x}%`);
    brandTextRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  const handleMouseEnter = () => {
    if (brandTextRef.current) {
      brandTextRef.current.classList.add(styles.isHovering);
    }
  };

  const handleMouseLeave = () => {
    if (brandTextRef.current) {
      brandTextRef.current.classList.remove(styles.isHovering);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top Section */}
        <div className={styles.topSection}>
          <div className={styles.grid}>
            {/* Brand Column */}
            <div className={styles.brandColumn}>
              <img src="/logo-icon.svg" alt="Poligamia" className={styles.logoIcon} />
              <p className={styles.tagline}>Not for Everybody.</p>
              <p className={styles.brandDescription}>
                Exklusive Düfte für diejenigen, die es wagen, anders zu sein.
              </p>
            </div>

            {/* Links Column */}
            <div className={styles.linksColumn}>
              <h4 className={styles.columnTitle}>Links</h4>
              <div className={styles.linksList}>
                <a href="#exordium" className={styles.footerLink}>Kollektion</a>
                <a href="#manifest" className={styles.footerLink}>Manifest</a>
                <a href="#request" className={styles.footerLink}>Anfragen</a>
              </div>
            </div>

            {/* Social Column */}
            <div className={styles.socialColumn}>
              <h4 className={styles.columnTitle}>Social</h4>
              <div className={styles.socialLinks}>
                <a href="https://instagram.com/poligamia" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  Instagram
                </a>
                <a href="https://tiktok.com/@poligamia" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  TikTok
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Big Brand Name */}
        <div
          className={styles.bigBrand}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div ref={brandTextRef} className={styles.bigBrandText}>
            {/* Base layer - subtle */}
            <img src="/poligamia-logo.svg" alt="POLIGAMIA" className={styles.logoBase} />
            {/* Spotlight layer */}
            <img src="/poligamia-logo.svg" alt="" className={styles.logoSpotlight} aria-hidden="true" />
            {/* Glow layer */}
            <img src="/poligamia-logo.svg" alt="" className={styles.logoGlow} aria-hidden="true" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} POLIGAMIA. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <a href="#" className={styles.legalLink}>Impressum</a>
            <a href="#" className={styles.legalLink}>Datenschutz</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
