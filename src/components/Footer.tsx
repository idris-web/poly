import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Icon Pattern Background */}
      <div className="icon-pattern" />

      <div className={styles.container}>
        {/* Top Divider */}
        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerDiamond} />
          <span className={styles.dividerLine} />
        </div>

        {/* Logo */}
        <div className={styles.logo}>POLIGAMIA</div>

        {/* Tagline */}
        <p className={styles.tagline}>Not for Everybody.</p>

        {/* Links */}
        <div className={styles.links}>
          <a href="#" className={styles.link}>Impressum</a>
          <span className={styles.linkDivider}>|</span>
          <a href="#" className={styles.link}>Datenschutz</a>
          <span className={styles.linkDivider}>|</span>
          <a href="#" className={styles.link}>Kontakt</a>
        </div>

        {/* Copyright */}
        <p className={styles.copyright}>
          &copy; {currentYear} POLIGAMIA. All rights reserved.
        </p>

        {/* Bottom accent */}
        <div className={styles.bottomAccent} />
      </div>
    </footer>
  );
}
