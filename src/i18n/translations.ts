export type Language = 'de' | 'en';

export const translations = {
  de: {
    // Navigation
    nav: {
      manifest: 'Manifest',
      exordium: 'Exordium',
      access: 'Zugang',
      request: 'Anfragen',
    },

    // Hero
    hero: {
      tagline: 'Not for Everybody',
      cta: 'Kollektion entdecken',
    },

    // Brand Manifest
    manifest: {
      overline: 'Unser Manifest',
      title: 'Wir kreieren nicht für die Masse.',
      subtitle: 'Sondern für jene, die wissen, wer sie sind.',
      description:
        'POLIGAMIA ist kein Parfüm für jeden. Es ist ein Statement. Ein olfaktorisches Bekenntnis für Menschen, die sich nicht anpassen – sondern auffallen. Die nicht folgen – sondern führen.',
      values: [
        { title: 'Exklusivität', desc: 'Limitierte Editionen für Kenner' },
        { title: 'Authentizität', desc: 'Kompromisslos in jeder Note' },
        { title: 'Rebellion', desc: 'Gegen das Gewöhnliche' },
      ],
    },

    // Exordium Product
    exordium: {
      badge: 'First Edition',
      title: 'EXORDIUM',
      titleSub: 'The Beginning of the Chosen Ones',
      description:
        'Ein Duft, der nicht nur verführt, sondern erwacht. Kraftvoll. Rätselhaft. Unberechenbar. Jede Note erzählt eine Geschichte von Rebellion und Raffinesse.',
      concentration: 'Konzentration',
      concentrationValue: 'Extrait de Parfum',
      content: 'Inhalt',
      contentValue: '50ml',
      edition: 'Edition',
      editionValue: 'Limitiert',
      quote:
        'Ein Duft, erschaffen für Persönlichkeiten, deren Identität nicht verhandelbar ist.',
      quoteHighlight: 'angekündigt',
      quoteSuffix: 'Für jene, die nicht erwartet, sondern',
    },

    // Fragrance Notes
    fragrance: {
      overline: 'Die Duftreise',
      title: 'EXORDIUM',
      titleSub: 'Unberechenbar und frei von Regeln.',
      subtitle:
        'Ein Duft, der nicht gefallen will, aber Begierden weckt. Er entwickelt sich über Stunden.',
      subtitleContinue:
        'Beginnend mit frischen, blumigen Noten bis hin zur tiefen, warmen Basis.',
      phases: [
        {
          time: '0-15 Min',
          label: 'Erster Eindruck',
          title: 'Top Notes',
          notes: ['Zitrone', 'Bergamotte', 'Lavendel', 'Rose', 'Geranie'],
        },
        {
          time: '15 Min - 2h',
          label: 'Entwicklung',
          title: 'Heart Notes',
          notes: ['Muskatnuss', 'Nelke', 'Tonkabohne', 'Patschuli', 'Weihrauch'],
        },
        {
          time: '2h+',
          label: 'Tiefe',
          title: 'Base Notes',
          notes: ['Amber', 'Sandelholz', 'Zedernholz', 'Moschus', 'Labdanum'],
        },
      ],
      concentration: 'Extrait de Parfum',
      concentrationValue: '30% Konzentration',
    },

    // Collections
    collections: {
      badge: 'Unser Produkt',
      title: 'Entdecke EXORDIUM',
      titleLight: 'aus jeder Perspektive',
      items: [
        {
          name: 'Die Flasche',
          description:
            'Handgefertigtes Design mit zeitloser Eleganz. Jedes Detail erzählt eine Geschichte.',
        },
        {
          name: 'Der Duft',
          description:
            'Luxuriöse Tiefe mit warmen Noten, ein Erlebnis, das in Erinnerung bleibt.',
        },
        {
          name: 'Das Erlebnis',
          description:
            'Mehr als ein Parfüm, ein Statement für die, die herausstechen wollen.',
        },
      ],
    },

    // Gallery
    gallery: {
      overline: 'Die Kollektion',
      title: 'Visuelle Perfektion',
      images: [
        { title: 'Das Statement', subtitle: 'Luxus im Alltag' },
        { title: 'Das Ritual', subtitle: 'Ein Moment nur für dich' },
        { title: 'Die Essenz', subtitle: 'Handgefertigt in limitierter Auflage' },
        { title: 'Das Handwerk', subtitle: 'Perfektion in jedem Detail' },
        { title: 'Die Kunst', subtitle: 'Ein Moment der Transformation' },
        { title: 'Die Leidenschaft', subtitle: 'Intensiv und unvergesslich' },
        { title: 'Die Tiefe', subtitle: 'Mysterium in jeder Note' },
      ],
    },

    // Craftsmanship
    craftsmanship: {
      overline: 'Handwerkskunst',
      title: 'Meisterhafte Perfektion',
      subtitle:
        'Jeder Flakon ist ein Kunstwerk. Von Hand gefertigt, mit Liebe zum Detail.',
      features: [
        {
          title: 'Handgefertigt',
          description: 'Jede Flasche wird von Hand montiert und geprüft.',
        },
        {
          title: 'Premium Materialien',
          description: 'Nur die edelsten Rohstoffe finden Verwendung.',
        },
        {
          title: 'Limitierte Auflage',
          description: 'Nummerierte Editionen für wahre Sammler.',
        },
      ],
    },

    // Testimonials
    testimonials: {
      overline: 'Stimmen',
      title: 'Was andere sagen',
      items: [
        {
          quote:
            'EXORDIUM ist nicht einfach ein Parfüm – es ist eine Erklärung. Wer es trägt, wird nicht übersehen.',
          author: 'Marcus V.',
          role: 'Unternehmer',
        },
        {
          quote:
            'Die Komplexität dieses Duftes ist beeindruckend. Er entwickelt sich über Stunden und bleibt einzigartig.',
          author: 'Elena K.',
          role: 'Kunstsammlerin',
        },
        {
          quote:
            'Endlich ein Duft, der so kompromisslos ist wie ich. POLIGAMIA versteht seine Zielgruppe.',
          author: 'David R.',
          role: 'Kreativdirektor',
        },
      ],
    },

    // Access
    access: {
      overline: 'Exklusiver Zugang',
      title: 'Nicht käuflich. Nur erhältlich.',
      subtitle:
        'POLIGAMIA wird nicht verkauft – es wird vergeben. An jene, die verstehen.',
      steps: [
        { number: '01', title: 'Anfrage', desc: 'Teile uns mit, wer du bist' },
        { number: '02', title: 'Prüfung', desc: 'Wir wählen sorgfältig aus' },
        { number: '03', title: 'Einladung', desc: 'Exklusiver Zugang zur Kollektion' },
      ],
      note: 'Limitiert auf 500 Stück weltweit',
    },

    // Request Form
    request: {
      overline: 'Anfrage',
      title: 'Werde Teil der Auserwählten',
      subtitle:
        'Hinterlasse deine Kontaktdaten und wir melden uns bei dir, sobald EXORDIUM für dich verfügbar ist.',
      form: {
        name: 'Vollständiger Name',
        namePlaceholder: 'Dein Name',
        email: 'E-Mail Adresse',
        emailPlaceholder: 'deine@email.de',
        message: 'Nachricht (optional)',
        messagePlaceholder: 'Erzähl uns von dir...',
        submit: 'Anfrage senden',
        sending: 'Wird gesendet...',
        success: 'Vielen Dank für deine Anfrage. Wir melden uns bei dir.',
        error: 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.',
      },
      privacy:
        'Mit dem Absenden stimmst du unserer Datenschutzerklärung zu.',
    },

    // Footer
    footer: {
      tagline: 'Not for Everybody',
      description:
        'Exklusive Düfte für jene, die sich nicht anpassen – sondern auffallen.',
      links: {
        title: 'Navigation',
        manifest: 'Manifest',
        exordium: 'Exordium',
        access: 'Zugang',
        request: 'Anfragen',
      },
      legal: {
        title: 'Rechtliches',
        privacy: 'Datenschutz',
        imprint: 'Impressum',
        terms: 'AGB',
      },
      contact: {
        title: 'Kontakt',
        email: 'kontakt@poligamia.de',
      },
      copyright: '© 2024 POLIGAMIA. Alle Rechte vorbehalten.',
    },
  },

  en: {
    // Navigation
    nav: {
      manifest: 'Manifest',
      exordium: 'Exordium',
      access: 'Access',
      request: 'Request',
    },

    // Hero
    hero: {
      tagline: 'Not for Everybody',
      cta: 'Discover Collection',
    },

    // Brand Manifest
    manifest: {
      overline: 'Our Manifest',
      title: "We don't create for the masses.",
      subtitle: 'But for those who know who they are.',
      description:
        "POLIGAMIA is not a perfume for everyone. It's a statement. An olfactory confession for people who don't adapt – but stand out. Who don't follow – but lead.",
      values: [
        { title: 'Exclusivity', desc: 'Limited editions for connoisseurs' },
        { title: 'Authenticity', desc: 'Uncompromising in every note' },
        { title: 'Rebellion', desc: 'Against the ordinary' },
      ],
    },

    // Exordium Product
    exordium: {
      badge: 'First Edition',
      title: 'EXORDIUM',
      titleSub: 'The Beginning of the Chosen Ones',
      description:
        "A fragrance that doesn't just seduce, but awakens. Powerful. Enigmatic. Unpredictable. Every note tells a story of rebellion and refinement.",
      concentration: 'Concentration',
      concentrationValue: 'Extrait de Parfum',
      content: 'Content',
      contentValue: '50ml',
      edition: 'Edition',
      editionValue: 'Limited',
      quote:
        'A fragrance created for personalities whose identity is non-negotiable.',
      quoteHighlight: 'announced',
      quoteSuffix: 'For those who are not expected, but',
    },

    // Fragrance Notes
    fragrance: {
      overline: 'The Fragrance Journey',
      title: 'EXORDIUM',
      titleSub: 'Unpredictable and free from rules.',
      subtitle:
        "A fragrance that doesn't want to please, but awakens desires. It evolves over hours.",
      subtitleContinue:
        'Beginning with fresh, floral notes down to the deep, warm base.',
      phases: [
        {
          time: '0-15 Min',
          label: 'First Impression',
          title: 'Top Notes',
          notes: ['Lemon', 'Bergamot', 'Lavender', 'Rose', 'Geranium'],
        },
        {
          time: '15 Min - 2h',
          label: 'Development',
          title: 'Heart Notes',
          notes: ['Nutmeg', 'Clove', 'Tonka Bean', 'Patchouli', 'Frankincense'],
        },
        {
          time: '2h+',
          label: 'Depth',
          title: 'Base Notes',
          notes: ['Amber', 'Sandalwood', 'Cedarwood', 'Musk', 'Labdanum'],
        },
      ],
      concentration: 'Extrait de Parfum',
      concentrationValue: '30% Concentration',
    },

    // Collections
    collections: {
      badge: 'Our Product',
      title: 'Discover EXORDIUM',
      titleLight: 'from every perspective',
      items: [
        {
          name: 'The Bottle',
          description:
            'Handcrafted design with timeless elegance. Every detail tells a story.',
        },
        {
          name: 'The Scent',
          description:
            'Luxurious depth with warm notes, an experience that stays with you.',
        },
        {
          name: 'The Experience',
          description:
            'More than a perfume, a statement for those who want to stand out.',
        },
      ],
    },

    // Gallery
    gallery: {
      overline: 'The Collection',
      title: 'Visual Perfection',
      images: [
        { title: 'The Statement', subtitle: 'Everyday luxury' },
        { title: 'The Ritual', subtitle: 'A moment just for you' },
        { title: 'The Essence', subtitle: 'Handcrafted in limited edition' },
        { title: 'The Craft', subtitle: 'Perfection in every detail' },
        { title: 'The Art', subtitle: 'A moment of transformation' },
        { title: 'The Passion', subtitle: 'Intense and unforgettable' },
        { title: 'The Depth', subtitle: 'Mystery in every note' },
      ],
    },

    // Craftsmanship
    craftsmanship: {
      overline: 'Craftsmanship',
      title: 'Masterful Perfection',
      subtitle:
        'Every bottle is a work of art. Handcrafted with attention to detail.',
      features: [
        {
          title: 'Handcrafted',
          description: 'Each bottle is assembled and inspected by hand.',
        },
        {
          title: 'Premium Materials',
          description: 'Only the finest raw materials are used.',
        },
        {
          title: 'Limited Edition',
          description: 'Numbered editions for true collectors.',
        },
      ],
    },

    // Testimonials
    testimonials: {
      overline: 'Voices',
      title: 'What Others Say',
      items: [
        {
          quote:
            "EXORDIUM isn't just a perfume – it's a declaration. Whoever wears it won't be overlooked.",
          author: 'Marcus V.',
          role: 'Entrepreneur',
        },
        {
          quote:
            'The complexity of this fragrance is impressive. It evolves over hours and remains unique.',
          author: 'Elena K.',
          role: 'Art Collector',
        },
        {
          quote:
            'Finally a fragrance as uncompromising as I am. POLIGAMIA understands its audience.',
          author: 'David R.',
          role: 'Creative Director',
        },
      ],
    },

    // Access
    access: {
      overline: 'Exclusive Access',
      title: 'Not for sale. Only available.',
      subtitle:
        "POLIGAMIA isn't sold – it's granted. To those who understand.",
      steps: [
        { number: '01', title: 'Request', desc: 'Tell us who you are' },
        { number: '02', title: 'Review', desc: 'We select carefully' },
        { number: '03', title: 'Invitation', desc: 'Exclusive access to the collection' },
      ],
      note: 'Limited to 500 pieces worldwide',
    },

    // Request Form
    request: {
      overline: 'Request',
      title: 'Become One of the Chosen',
      subtitle:
        'Leave your contact details and we will get back to you as soon as EXORDIUM is available for you.',
      form: {
        name: 'Full Name',
        namePlaceholder: 'Your name',
        email: 'Email Address',
        emailPlaceholder: 'your@email.com',
        message: 'Message (optional)',
        messagePlaceholder: 'Tell us about yourself...',
        submit: 'Send Request',
        sending: 'Sending...',
        success: 'Thank you for your request. We will contact you.',
        error: 'An error occurred. Please try again.',
      },
      privacy: 'By submitting, you agree to our privacy policy.',
    },

    // Footer
    footer: {
      tagline: 'Not for Everybody',
      description:
        "Exclusive fragrances for those who don't adapt – but stand out.",
      links: {
        title: 'Navigation',
        manifest: 'Manifest',
        exordium: 'Exordium',
        access: 'Access',
        request: 'Request',
      },
      legal: {
        title: 'Legal',
        privacy: 'Privacy',
        imprint: 'Imprint',
        terms: 'Terms',
      },
      contact: {
        title: 'Contact',
        email: 'contact@poligamia.com',
      },
      copyright: '© 2024 POLIGAMIA. All rights reserved.',
    },
  },
} as const;

export type Translations = typeof translations.de;
