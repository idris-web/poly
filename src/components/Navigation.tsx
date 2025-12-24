import { useEffect, useState } from 'react';
import styles from './Navigation.module.css';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      // Background change
      setScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${
        hidden ? styles.hidden : ''
      }`}
    >
      <div className={styles.container}>
        {/* Logo */}
        <a href="#" className={styles.logo}>
          <img src="/logo-icon.svg" alt="Poligamia" className={styles.logoIcon} />
        </a>

        {/* Nav Links */}
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

        {/* CTA */}
        <a
          href="#request"
          onClick={(e) => scrollToSection(e, 'request')}
          className={styles.cta}
        >
          <span>Anfragen</span>
        </a>
      </div>
    </nav>
  );
}
