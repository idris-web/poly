import styles from './Craftsmanship.module.css';

const stats = [
  { number: '200+', label: 'Stunden Entwicklung' },
  { number: '47', label: 'Rohstoffe' },
  { number: '18', label: 'Monate Reifung' },
  { number: '100', label: 'Limitierte Flakons' },
];

export default function Craftsmanship() {
  return (
    <section className={styles.craftsmanship}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.overline}>Handwerkskunst</span>
          <h2 className={styles.title}>
            Perfektion braucht <span className={styles.titleHighlight}>Zeit</span>
          </h2>
        </header>

        <div className={styles.stats}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.stat}>
              <span className={styles.statNumber}>{stat.number}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.quoteSection}>
          <p className={styles.quote}>
            Jeder Duft ist eine <span className={styles.quoteHighlight}>Komposition aus Leidenschaft</span>,
            kreiert für diejenigen, die das Besondere suchen.
          </p>
          <span className={styles.author}>Die Philosophie von POLIGAMIA</span>
        </div>
      </div>
    </section>
  );
}
