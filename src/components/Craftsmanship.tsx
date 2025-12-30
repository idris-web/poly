import { useLanguage } from '../i18n/LanguageContext';
import styles from './Craftsmanship.module.css';

const stats = [
  { number: '5000+', labelKey: 'devHours' },
  { number: '47', labelKey: 'ingredients' },
  { number: '18', labelKey: 'monthsMaturing' },
  { number: '1000*', labelKey: 'limitedBottles' },
];

// Static stat labels - these are numerical facts, not translatable
const statLabels: Record<string, { de: string; en: string }> = {
  devHours: { de: 'Stunden Entwicklung*', en: 'Hours of Development*' },
  ingredients: { de: 'Rohstoffe', en: 'Raw Materials' },
  monthsMaturing: { de: 'Monate Reifung', en: 'Months Maturing' },
  limitedBottles: { de: 'Limitierte Flakons*', en: 'Limited Bottles*' },
};

export default function Craftsmanship() {
  const { t, language } = useLanguage();

  // Localized quote text
  const quoteText = {
    de: {
      main: 'Wir erschaffen Parfüms, die Grenzen herausfordern. Düfte, die eine Geschichte erzählen, ohne ein Wort zu sagen.',
      highlight: 'Einzigartig, mysteriös, kompromisslos exklusiv.',
      author: 'Die Philosophie von POLIGAMIA',
    },
    en: {
      main: 'We create perfumes that challenge boundaries. Scents that tell a story without saying a word.',
      highlight: 'Unique, mysterious, uncompromisingly exclusive.',
      author: 'The Philosophy of POLIGAMIA',
    },
  };

  // Localized title
  const titleText = {
    de: { prefix: 'Perfektion braucht', highlight: 'Zeit' },
    en: { prefix: 'Perfection takes', highlight: 'Time' },
  };

  return (
    <section className={styles.craftsmanship}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.overline}>{t.craftsmanship.overline}</span>
          <h2 className={styles.title}>
            {titleText[language].prefix} <span className={styles.titleHighlight}>{titleText[language].highlight}</span>
          </h2>
        </header>

        <div className={styles.stats}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.stat}>
              <span className={styles.statNumber}>{stat.number}</span>
              <span className={styles.statLabel}>{statLabels[stat.labelKey][language]}</span>
            </div>
          ))}
        </div>

        <div className={styles.quoteSection}>
          <p className={styles.quote}>
            {quoteText[language].main} <span className={styles.quoteHighlight}>{quoteText[language].highlight}</span>
          </p>
          <span className={styles.author}>{quoteText[language].author}</span>
        </div>
      </div>
    </section>
  );
}
