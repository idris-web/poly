import { useEffect, useState } from 'react';
import styles from './Navigation.module.css';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show/hide based on scroll direction (but not when menu is open)
      if (!menuOpen) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      }

      // Background change
      setScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, menuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <>
      <nav
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${
          hidden ? styles.hidden : ''
        } ${menuOpen ? styles.menuOpen : ''}`}
      >
        <div className={styles.container}>
          {/* Logo */}
          <a href="#" className={styles.logo}>
            <img src="/logo-icon.svg" alt="Poligamia" className={styles.logoIcon} />
          </a>

          {/* Nav Links (Desktop) */}
          <div className={styles.links}>
            <a
              href="#manifest"
              onClick={(e) => scrollToSection(e, 'manifest')}
              className={styles.link}
            >
              Manifest
            </a>
            <a
              href="#exordium"
              onClick={(e) => scrollToSection(e, 'exordium')}
              className={styles.link}
            >
              Exordium
            </a>
            <a
              href="#access"
              onClick={(e) => scrollToSection(e, 'access')}
              className={styles.link}
            >
              Zugang
            </a>
          </div>

          {/* CTA (Desktop) */}
          <a
            href="#request"
            onClick={(e) => scrollToSection(e, 'request')}
            className={styles.cta}
          >
            <span>Anfragen</span>
          </a>

          {/* Hamburger Menu (Mobile) */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerContent}>
          <a
            href="#manifest"
            onClick={(e) => scrollToSection(e, 'manifest')}
            className={styles.drawerLink}
          >
            Manifest
          </a>
          <a
            href="#exordium"
            onClick={(e) => scrollToSection(e, 'exordium')}
            className={styles.drawerLink}
          >
            Exordium
          </a>
          <a
            href="#access"
            onClick={(e) => scrollToSection(e, 'access')}
            className={styles.drawerLink}
          >
            Zugang
          </a>
          <a
            href="#request"
            onClick={(e) => scrollToSection(e, 'request')}
            className={styles.drawerCta}
          >
            Anfragen
          </a>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
