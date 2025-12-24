import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './FragranceNotes.module.css';

gsap.registerPlugin(ScrollTrigger);

interface Phase {
  time: string;
  label: string;
  title: string;
  notes: string[];
}

const phases: Phase[] = [
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
];

export default function FragranceNotes() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline progress animation
      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 0.3,
            },
          }
        );
      }

      // Phase cards stagger
      gsap.fromTo(
        '.phase-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
          },
        }
      );

      // Timeline nodes
      gsap.fromTo(
        '.timeline-node',
        { scale: 0 },
        {
          scale: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.fragrance}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <span className={styles.overline}>Die Duftreise</span>
          <h2 className={styles.title}>
            Wie sich <span className={styles.titleHighlight}>EXORDIUM</span> entfaltet
          </h2>
          <p className={styles.subtitle}>
            Ein Duft entwickelt sich über Stunden — von den ersten frischen Noten bis zur tiefen, warmen Basis.
          </p>
        </header>

        {/* Timeline */}
        <div ref={timelineRef} className={styles.timeline}>
          {/* Timeline Track */}
          <div className={styles.timelineTrack}>
            <div ref={progressRef} className={styles.timelineProgress} />
          </div>

          {/* Timeline Nodes */}
          <div className={styles.timelineNodes}>
            {phases.map((phase, index) => (
              <div key={phase.title} className={`${styles.timelineNode} timeline-node`}>
                <div className={styles.nodeCircle}>
                  <span className={styles.nodeNumber}>{index + 1}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Phase Cards */}
          <div className={styles.phases}>
            {phases.map((phase) => (
              <div key={phase.title} className={`${styles.phaseCard} phase-card`}>
                <span className={styles.phaseTime}>{phase.time}</span>
                <span className={styles.phaseLabel}>{phase.label}</span>
                <h3 className={styles.phaseTitle}>{phase.title}</h3>
                <div className={styles.phaseDivider} />
                <ul className={styles.phaseNotes}>
                  {phase.notes.map((note) => (
                    <li key={note} className={styles.noteItem}>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Info */}
        <div className={styles.bottomInfo}>
          <span className={styles.concentration}>Extrait de Parfum</span>
          <span className={styles.concentrationValue}>30% Konzentration</span>
        </div>
      </div>
    </section>
  );
}
