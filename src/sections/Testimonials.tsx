import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonials } from '../config';

gsap.registerPlugin(ScrollTrigger);

function StarRating({ stars }: { stars: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px', marginBottom: '16px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={star <= stars ? '#d4a843' : 'rgba(24,12,4,0.15)'}
          stroke="none"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#f0ecd7',
        position: 'relative',
        zIndex: 2,
        padding: '100px 24px',
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
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
          HAPPY PET PARENTS
        </p>
        <h2
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(32px, 4vw, 42px)',
            fontWeight: 500,
            lineHeight: 1.2,
            color: '#180c04',
          }}
        >
          What Our Customers Say
        </h2>
      </div>

      {/* Testimonials Grid */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '32px',
        }}
        className="testimonials-grid"
      >
        {testimonials.map((testimonial, i) => (
          <div
            key={testimonial.id}
            ref={(el) => { cardRefs.current[i] = el; }}
            style={{
              backgroundColor: '#fcfaee',
              padding: '40px 32px',
              borderRadius: '12px',
              boxShadow: '0px 2px 10px -3px rgba(168, 142, 113, 0.15)',
              opacity: 0,
            }}
          >
            <StarRating stars={testimonial.stars} />
            <p
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '18px',
                fontWeight: 400,
                fontStyle: 'italic',
                color: '#180c04',
                lineHeight: 1.5,
              }}
            >
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '12px',
                color: '#938977',
                marginTop: '20px',
                fontWeight: 500,
              }}
            >
              — {testimonial.author}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '8px',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#696969" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '11px',
                  color: '#696969',
                }}
              >
                Verified Buyer
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
