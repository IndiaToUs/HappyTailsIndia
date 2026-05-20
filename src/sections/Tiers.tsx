import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { tiersConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export default function Tiers() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tierRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tiers = tiersConfig.tiers;

  useEffect(() => {
    const ctx = gsap.context(() => {
      tierRefs.current.forEach((el) => {
        if (!el) return;
        const textEl = el.querySelector('.tier-text-content');
        if (textEl) {
          gsap.fromTo(
            textEl,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 75%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (!tiersConfig.sectionLabel && !tiersConfig.title && tiers.length === 0) {
    return null;
  }

  return (
    <section
      id="tiers"
      ref={sectionRef}
      style={{
        backgroundColor: '#fcfaee',
        position: 'relative',
        zIndex: 2,
        padding: '60px 0',
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'center', padding: '0 24px 48px' }}>
        {tiersConfig.sectionLabel && (
          <p style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '11px',
            fontWeight: 600,
            color: '#938977',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            {tiersConfig.sectionLabel}
          </p>
        )}
        {tiersConfig.title && (
          <h2 style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 500,
            lineHeight: 1.2,
            color: '#180c04',
          }}>
            {tiersConfig.title}
          </h2>
        )}
      </div>

      {/* Tier Rows */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {tiers.map((tier, i) => (
          <div
            key={tier.name}
            ref={(el) => { tierRefs.current[i] = el; }}
            className={`tier-row ${i % 2 === 0 ? 'tier-row-normal' : 'tier-row-reverse'}`}
            style={{
              marginBottom: i < tiers.length - 1 ? '60px' : '0',
            }}
          >
            {/* Image */}
            <div
              className="tier-image-placeholder"
              style={{
                width: '100%',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0px 8px 10px 0px rgba(168, 142, 113, 0.2)',
              }}
            >
              {tier.image && (
                <img
                  src={tier.image}
                  alt={tier.name}
                  style={{
                    width: '100%',
                    height: '260px',
                    display: 'block',
                    objectFit: 'cover',
                  }}
                />
              )}
            </div>

            {/* Text Content */}
            <div className="tier-text-content" style={{ width: '100%' }}>
              <p style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                color: '#938977',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>
                {tier.journeys}
              </p>
              <h3 style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 'clamp(24px, 3vw, 32px)',
                fontWeight: 600,
                lineHeight: 1.2,
                color: '#180c04',
                marginBottom: '8px',
              }}>
                {tier.name}
              </h3>
              <p style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '26px',
                fontWeight: 400,
                color: '#938977',
                marginBottom: '20px',
              }}>
                <span style={{ fontStyle: 'italic' }}>${tier.price}</span>
                <span style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '12px',
                  fontWeight: 400,
                  color: '#696969',
                  marginLeft: '8px',
                }}>
                  {tier.frequency}
                </span>
              </p>
              <p style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '14px',
                lineHeight: 1.6,
                color: '#696969',
                marginBottom: '24px',
              }}>
                {tier.description}
              </p>

              {/* Amenities */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0' }}>
                {tier.amenities.map((amenity) => (
                  <li key={amenity} style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '13px',
                    color: '#696969',
                    padding: '8px 0',
                    borderBottom: '1px solid rgba(24, 12, 4, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}>
                    <span style={{
                      display: 'inline-block',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: '#938977',
                      flexShrink: 0,
                    }} />
                    {amenity}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {tier.ctaText && (
                <a
                  href={tier.ctaHref || '#'}
                  onClick={(e) => {
                    if (!tier.ctaHref || tier.ctaHref === '#') e.preventDefault();
                  }}
                  style={{
                    display: 'inline-block',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#180c04',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    padding: '14px 32px',
                    border: '1px solid rgba(24, 12, 4, 0.25)',
                    borderRadius: '2px',
                    transition: 'all 0.4s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#180c04';
                    e.currentTarget.style.color = '#fcfaee';
                    e.currentTarget.style.borderColor = '#180c04';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#180c04';
                    e.currentTarget.style.borderColor = 'rgba(24, 12, 4, 0.25)';
                  }}
                >
                  {tier.ctaText}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .tier-row {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        @media (min-width: 768px) {
          .tier-row-normal {
            flex-direction: row !important;
            gap: 60px !important;
            align-items: center !important;
          }
          .tier-row-reverse {
            flex-direction: row-reverse !important;
            gap: 60px !important;
            align-items: center !important;
          }
          .tier-row .tier-image-placeholder {
            width: 460px !important;
            flex-shrink: 0 !important;
          }
          .tier-row .tier-image-placeholder img {
            height: 340px !important;
          }
          .tier-row .tier-text-content {
            flex: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
