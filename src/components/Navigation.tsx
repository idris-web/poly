import { useEffect, useState } from 'react';
import styles from './Navigation.module.css';
import { useLanguage } from '../i18n/LanguageContext';

type NavigationMode = 'landing' | 'legal';

interface NavigationProps {
  mode?: NavigationMode;
}

export default function Navigation({ mode = 'landing' }: NavigationProps) {
  const { language, setLanguage, t } = useLanguage();
  const isLegal = mode === 'legal';
  const [scrolled, setScrolled] = useState(isLegal);
  const [inHero, setInHero] = useState(!isLegal);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (isLegal) {
      setScrolled(true);
      setInHero(false);
      return;
    }
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.8; // 80% of viewport height

      // Check if we're in the hero section
      setInHero(currentScrollY < heroHeight);

      // Background change
      setScrolled(currentScrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLegal]);

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

  const linkPrefix = isLegal ? '/' : '';
  const logoHref = isLegal ? '/' : '#';
  const onSectionLinkClick = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isLegal) {
      setMenuOpen(false);
      return;
    }
    scrollToSection(e, id);
  };

  return (
    <>
      <nav
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${
          menuOpen ? styles.menuOpen : ''
        } ${inHero ? styles.inHero : ''}`}
      >
        <div className={styles.container}>
          {/* Logo */}
          <a href={logoHref} className={styles.logo}>
            <img src="/poligamia-logo-icon.svg" alt="Poligamia" className={styles.logoIcon} />
          </a>

          {/* Nav Links (Desktop) */}
          <div className={styles.links}>
            <a
              href={`${linkPrefix}#manifest`}
              onClick={onSectionLinkClick('manifest')}
              className={styles.link}
            >
              {t.nav.manifest}
            </a>
            <a
              href={`${linkPrefix}#exordium`}
              onClick={onSectionLinkClick('exordium')}
              className={styles.link}
            >
              {t.nav.exordium}
            </a>
            <a
              href={`${linkPrefix}#access`}
              onClick={onSectionLinkClick('access')}
              className={styles.link}
            >
              {t.nav.access}
            </a>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.langSwitch}
              onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}
              aria-label="Switch language"
            >
              {language === 'de' ? 'EN' : 'DE'}
            </button>

            {/* CTA (Desktop) */}
            <a
              href={`${linkPrefix}#request`}
              onClick={onSectionLinkClick('request')}
              className={styles.cta}
            >
              <span>{t.nav.request}</span>
            </a>
          </div>

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
            href={`${linkPrefix}#manifest`}
            onClick={onSectionLinkClick('manifest')}
            className={styles.drawerLink}
          >
            {t.nav.manifest}
          </a>
          <a
            href={`${linkPrefix}#exordium`}
            onClick={onSectionLinkClick('exordium')}
            className={styles.drawerLink}
          >
            {t.nav.exordium}
          </a>
          <a
            href={`${linkPrefix}#access`}
            onClick={onSectionLinkClick('access')}
            className={styles.drawerLink}
          >
            {t.nav.access}
          </a>
          <button
            className={styles.drawerLangSwitch}
            onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}
          >
            {language === 'de' ? 'English' : 'Deutsch'}
          </button>
          <a
            href={`${linkPrefix}#request`}
            onClick={onSectionLinkClick('request')}
            className={styles.drawerCta}
          >
            {t.nav.request}
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
