import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './RequestForm.module.css';

gsap.registerPlugin(ScrollTrigger);

interface FormErrors {
  name?: string;
  email?: string;
}

export default function RequestForm() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

  // Validation messages
  const validationMessages = {
    de: {
      nameRequired: 'Bitte geben Sie Ihren Namen ein',
      nameMin: 'Name muss mindestens 2 Zeichen lang sein',
      emailRequired: 'Bitte geben Sie Ihre E-Mail-Adresse ein',
      emailInvalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
    },
    en: {
      nameRequired: 'Please enter your name',
      nameMin: 'Name must be at least 2 characters',
      emailRequired: 'Please enter your email address',
      emailInvalid: 'Please enter a valid email address',
    },
  };

  // Header text
  const headerText = {
    de: {
      overline: 'Zugang anfragen',
      title: 'Bist du bereit,',
      titleHighlight: 'Teil dieser Welt zu werden?',
      subtitle: 'Jede Einladung ist eine Entscheidung.',
    },
    en: {
      overline: 'Request Access',
      title: 'Are you ready to',
      titleHighlight: 'become part of this world?',
      subtitle: 'Every invitation is a decision.',
    },
  };

  // Form labels and placeholders
  const formLabels = {
    de: {
      name: 'Name',
      namePlaceholder: 'Ihr vollständiger Name',
      email: 'E-Mail',
      emailPlaceholder: 'Ihre E-Mail-Adresse',
      message: 'Nachricht',
      messageOptional: '(optional)',
      messagePlaceholder: 'Warum möchten Sie Teil von POLIGAMIA werden?',
      submit: 'Zugang anfragen',
      submitHover: "Los geht's",
      disclaimer: 'Durch das Absenden stimmen Sie zu, von POLIGAMIA kontaktiert zu werden. Wir respektieren Ihre Privatsphäre.',
    },
    en: {
      name: 'Name',
      namePlaceholder: 'Your full name',
      email: 'Email',
      emailPlaceholder: 'Your email address',
      message: 'Message',
      messageOptional: '(optional)',
      messagePlaceholder: 'Why do you want to be part of POLIGAMIA?',
      submit: 'Request Access',
      submitHover: "Let's go",
      disclaimer: 'By submitting, you agree to be contacted by POLIGAMIA. We respect your privacy.',
    },
  };

  // Success messages
  const successText = {
    de: {
      title: 'Anfrage erhalten',
      text: 'Vielen Dank für Ihr Interesse an POLIGAMIA.',
      textSub: 'Wenn Sie auserwählt werden, werden wir Sie kontaktieren.',
      quote: '"Wahre Exklusivität lässt sich nicht anklicken. Sie findet dich."',
      back: 'Weitere Anfrage stellen',
    },
    en: {
      title: 'Request Received',
      text: 'Thank you for your interest in POLIGAMIA.',
      textSub: 'If you are chosen, we will contact you.',
      quote: '"True exclusivity cannot be clicked. It finds you."',
      back: 'Submit another request',
    },
  };

  const validateField = (name: string, value: string): string | undefined => {
    const msgs = validationMessages[language];
    switch (name) {
      case 'name':
        if (!value.trim()) return msgs.nameRequired;
        if (value.trim().length < 2) return msgs.nameMin;
        return undefined;
      case 'email':
        if (!value.trim()) return msgs.emailRequired;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return msgs.emailInvalid;
        return undefined;
      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
    };
    setErrors(newErrors);
    return !newErrors.name && !newErrors.email;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ name: true, email: true, message: true });

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate on change if field has been touched
    if (touched[name]) {
      setErrors({
        ...errors,
        [name]: validateField(name, value),
      });
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
    setErrors({
      ...errors,
      [name]: validateField(name, value),
    });
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
    setTouched({});
  };

  const getInputClassName = (fieldName: string) => {
    const baseClass = fieldName === 'message' ? styles.textarea : styles.input;
    if (touched[fieldName] && errors[fieldName as keyof FormErrors]) {
      return `${baseClass} ${styles.inputError}`;
    }
    if (touched[fieldName] && !errors[fieldName as keyof FormErrors] && formData[fieldName as keyof typeof formData]) {
      return `${baseClass} ${styles.inputValid}`;
    }
    return baseClass;
  };

  return (
    <section ref={sectionRef} id="request" className={styles.request}>
      <div className={styles.container}>
        {/* Header */}
        <div className={`${styles.header} form-element`}>
          <span className={styles.overline}>{headerText[language].overline}</span>
          <h2 className={styles.title}>
            {headerText[language].title}<br />
            <span className={styles.titleHighlight}>{headerText[language].titleHighlight}</span>
          </h2>
          <p className={styles.subtitle}>
            {headerText[language].subtitle}
          </p>
        </div>

        {/* Form Container */}
        <div className={styles.formWrapper}>
          {!submitted ? (
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              <div className={`${styles.inputGroup} form-element`}>
                <label htmlFor="name" className={styles.label}>
                  {formLabels[language].name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName('name')}
                  placeholder={formLabels[language].namePlaceholder}
                  aria-invalid={touched.name && !!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                <div className={styles.inputLine} />
                {touched.name && errors.name && (
                  <span id="name-error" className={styles.errorMessage} role="alert">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className={`${styles.inputGroup} form-element`}>
                <label htmlFor="email" className={styles.label}>
                  {formLabels[language].email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName('email')}
                  placeholder={formLabels[language].emailPlaceholder}
                  aria-invalid={touched.email && !!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                <div className={styles.inputLine} />
                {touched.email && errors.email && (
                  <span id="email-error" className={styles.errorMessage} role="alert">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className={`${styles.inputGroup} form-element`}>
                <label htmlFor="message" className={styles.label}>
                  {formLabels[language].message} <span className={styles.optional}>{formLabels[language].messageOptional}</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.textarea}
                  placeholder={formLabels[language].messagePlaceholder}
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
                    <span className={styles.btnTextDefault}>{formLabels[language].submit}</span>
                    <span className={styles.btnTextHover}>
                      {formLabels[language].submitHover}
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </>
                )}
              </button>

              <p className={`${styles.disclaimer} form-element`}>
                {formLabels[language].disclaimer}
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
              <h3 className={styles.successTitle}>{successText[language].title}</h3>
              <p className={styles.successText}>
                {successText[language].text}<br />
                {successText[language].textSub}
              </p>
              <div className={styles.successQuote}>
                {successText[language].quote}
              </div>
              <button
                type="button"
                onClick={handleReset}
                className={styles.backBtn}
              >
                {successText[language].back}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
