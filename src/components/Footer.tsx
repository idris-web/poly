import { useState } from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Placeholder - would integrate with newsletter service
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top Divider */}
        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerDiamond} />
          <span className={styles.dividerLine} />
        </div>

        {/* Main Content Grid */}
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brandColumn}>
            <div className={styles.logo}>POLIGAMIA</div>
            <p className={styles.tagline}>Not for Everybody.</p>
            <p className={styles.brandDescription}>
              Exklusive Düfte für diejenigen, die es wagen, anders zu sein.
            </p>
          </div>

          {/* Newsletter Column */}
          <div className={styles.newsletterColumn}>
            <h4 className={styles.columnTitle}>Bleiben Sie informiert</h4>
            {!subscribed ? (
              <form onSubmit={handleNewsletterSubmit} className={styles.newsletterForm}>
                <div className={styles.inputWrapper}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ihre E-Mail Adresse"
                    className={styles.newsletterInput}
                    required
                    aria-label="E-Mail Adresse für Newsletter"
                  />
                  <button type="submit" className={styles.newsletterBtn} aria-label="Newsletter abonnieren">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <p className={styles.newsletterHint}>
                  Erfahren Sie als Erster von neuen Editionen.
                </p>
              </form>
            ) : (
              <div className={styles.subscribed}>
                <span className={styles.subscribedIcon}>✓</span>
                <p>Vielen Dank für Ihre Anmeldung.</p>
              </div>
            )}
          </div>

          {/* Social Column */}
          <div className={styles.socialColumn}>
            <h4 className={styles.columnTitle}>Folgen Sie uns</h4>
            <div className={styles.socialLinks}>
              <a
                href="https://instagram.com/poligamia"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="18" cy="6" r="1.5" fill="currentColor" stroke="none" />
                </svg>
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottom}>
          <div className={styles.links}>
            <a href="#" className={styles.link}>Impressum</a>
            <span className={styles.linkDivider}>|</span>
            <a href="#" className={styles.link}>Datenschutz</a>
            <span className={styles.linkDivider}>|</span>
            <a href="#" className={styles.link}>Kontakt</a>
          </div>

          <p className={styles.copyright}>
            &copy; {currentYear} POLIGAMIA. All rights reserved.
          </p>
        </div>

        {/* Bottom accent */}
        <div className={styles.bottomAccent} />
      </div>
    </footer>
  );
}
