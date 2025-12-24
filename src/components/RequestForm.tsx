import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './RequestForm.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function RequestForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate form elements
      gsap.fromTo(
        '.form-element',
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section ref={sectionRef} id="request" className={styles.request}>
      {/* Icon Pattern Background */}
      <div className="icon-pattern-sparse" />

      {/* Background Elements */}
      <div className={styles.bgElements}>
        <div className={styles.cornerDecor} style={{ top: '5%', left: '5%' }} />
        <div className={styles.cornerDecor} style={{ top: '5%', right: '5%' }} />
        <div className={styles.cornerDecor} style={{ bottom: '5%', left: '5%' }} />
        <div className={styles.cornerDecor} style={{ bottom: '5%', right: '5%' }} />
      </div>

      <div className={styles.container}>
        {/* Header */}
        <div className={`${styles.header} form-element`}>
          <span className={styles.overline}>Zugang anfragen</span>
          <h2 className={styles.title}>
            Bist du bereit,<br />
            <span className={styles.titleHighlight}>Teil dieser Welt zu werden?</span>
          </h2>
          <p className={styles.subtitle}>
            Jede Einladung ist eine Entscheidung.
          </p>
        </div>

        {/* Form Container */}
        <div className={styles.formWrapper}>
          {!submitted ? (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={`${styles.inputGroup} form-element`}>
                <label htmlFor="name" className={styles.label}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="Ihr vollständiger Name"
                />
                <div className={styles.inputLine} />
              </div>

              <div className={`${styles.inputGroup} form-element`}>
                <label htmlFor="email" className={styles.label}>
                  E-Mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="Ihre E-Mail-Adresse"
                />
                <div className={styles.inputLine} />
              </div>

              <div className={`${styles.inputGroup} form-element`}>
                <label htmlFor="message" className={styles.label}>
                  Nachricht <span className={styles.optional}>(optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.textarea}
                  placeholder="Warum möchten Sie Teil von POLIGAMIA werden?"
                  rows={4}
                />
                <div className={styles.inputLine} />
              </div>

              <button
                type="submit"
                className={`${styles.submitBtn} form-element`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className={styles.loading}>
                    <span className={styles.loadingDot} />
                    <span className={styles.loadingDot} />
                    <span className={styles.loadingDot} />
                  </span>
                ) : (
                  <>
                    <span>Zugang anfragen</span>
                    <svg
                      className={styles.arrow}
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>

              <p className={`${styles.disclaimer} form-element`}>
                Durch das Absenden stimmen Sie zu, von POLIGAMIA kontaktiert zu werden.
                Wir respektieren Ihre Privatsphäre.
              </p>
            </form>
          ) : (
            <div className={styles.successMessage}>
              <div className={styles.successIcon}>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3 className={styles.successTitle}>Anfrage erhalten</h3>
              <p className={styles.successText}>
                Vielen Dank für Ihr Interesse an POLIGAMIA.<br />
                Wenn Sie auserwählt werden, werden wir Sie kontaktieren.
              </p>
              <div className={styles.successQuote}>
                "Wahre Exklusivität lässt sich nicht anklicken. Sie findet dich."
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
