import { useState } from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
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

            {/* Newsletter Column */}
            <div className={styles.newsletterColumn}>
              <h4 className={styles.columnTitle}>Newsletter</h4>
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
                    />
                    <button type="submit" className={styles.newsletterBtn}>
                      Anmelden
                    </button>
                  </div>
                </form>
              ) : (
                <div className={styles.subscribed}>
                  <span className={styles.subscribedIcon}>✓</span>
                  <p>Vielen Dank!</p>
                </div>
              )}
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
        <div className={styles.bigBrand}>
          <span className={styles.bigBrandText}>POLIGAMIA</span>
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
