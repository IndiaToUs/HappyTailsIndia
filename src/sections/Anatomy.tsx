import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeritageHelix from '../effects/HeritageHelix';
import { anatomyConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export default function Anatomy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pillarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pillars = anatomyConfig.pillars;

  useEffect(() => {
    const ctx = gsap.context(() => {
      pillarRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 75%',
              end: 'top 40%',
              scrub: false,
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!anatomyConfig.sectionLabel && !anatomyConfig.title && pillars.length === 0) {
    return null;
  }

  return (
    <section
      id="anatomy"
      ref={sectionRef}
      style={{
        backgroundColor: '#f0ecd7',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'center', padding: '60px 24px 40px' }}>
        {anatomyConfig.sectionLabel && (
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              color: '#938977',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            {anatomyConfig.sectionLabel}
          </p>
        )}
        {anatomyConfig.title && (
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 500,
              lineHeight: 1.2,
              color: '#180c04',
            }}
          >
            {anatomyConfig.title}
          </h2>
        )}
      </div>

      {/* Desktop: Split Layout, Mobile: Single Column */}
      <div className="anatomy-layout">

        {/* Left: Sticky HeritageHelix — desktop only */}
        <div className="anatomy-helix-panel">
          <div style={{ width: '100%', height: '60vh' }}>
            <HeritageHelix />
          </div>
        </div>

        {/* Right: Scrolling Pillars */}
        <div className="anatomy-content-panel">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.label}
              ref={(el) => { pillarRefs.current[i] = el; }}
              style={{
                padding: '48px 0',
                borderBottom: i < pillars.length - 1 ? '1px solid rgba(24, 12, 4, 0.1)' : 'none',
              }}
            >
              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#938977',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  marginBottom: '24px',
                }}
              >
                {pillar.label}
              </p>
              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: 'clamp(20px, 3vw, 26px)',
                  fontWeight: 600,
                  lineHeight: 1.3,
                  color: '#180c04',
                  marginBottom: '20px',
                }}
              >
                {pillar.title}
              </h3>
              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: '#696969',
                  marginBottom: '20px',
                }}
              >
                {pillar.body}
              </p>
              {pillar.link && (
                <a
                  href="#products"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#938977',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    transition: 'color 0.4s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLAnchorElement).style.color = '#180c04';
                    (e.target as HTMLAnchorElement).style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLAnchorElement).style.color = '#938977';
                    (e.target as HTMLAnchorElement).style.textDecoration = 'none';
                  }}
                >
                  {pillar.link}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .anatomy-layout {
          display: flex;
          flex-direction: column;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px 60px;
        }

        .anatomy-helix-panel {
          display: none;
        }

        .anatomy-content-panel {
          width: 100%;
          padding: 0;
        }

        @media (min-width: 768px) {
          .anatomy-layout {
            flex-direction: row;
            padding: 0 24px 80px;
          }

          .anatomy-helix-panel {
            display: flex;
            width: 50%;
            position: sticky;
            top: 0;
            height: 100vh;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .anatomy-content-panel {
            width: 50%;
            padding: 0 48px;
          }
        }
      `}</style>
    </section>
  );
}
