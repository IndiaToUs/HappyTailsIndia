import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Simulate submission
    setSubmitted(true);
    // In Shopify: fetch('/contact#newsletter', { method: 'POST', body: formData })
  };

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#180c04',
        position: 'relative',
        zIndex: 2,
        padding: '100px 24px',
      }}
    >
      <div
        ref={containerRef}
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center',
          opacity: 0,
        }}
      >
        {!submitted ? (
          <>
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
              STAY IN THE LOOP
            </p>
            <h2
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 'clamp(28px, 3vw, 36px)',
                fontWeight: 500,
                color: '#fcfaee',
                marginBottom: '16px',
              }}
            >
              Get Pet Care Tips & Exclusive Offers
            </h2>
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '14px',
                color: 'rgba(252, 250, 238, 0.7)',
                lineHeight: 1.6,
                marginBottom: '32px',
              }}
            >
              Join 25,000+ pet parents who receive our weekly newsletter with expert advice, new product alerts, and subscriber-only discounts.
            </p>

            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  flex: '1 1 280px',
                  background: 'rgba(252, 250, 238, 0.08)',
                  border: '1px solid rgba(147, 137, 119, 0.3)',
                  borderRadius: '2px',
                  padding: '14px 20px',
                  color: '#fcfaee',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.4s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#938977';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(147, 137, 119, 0.3)';
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: '#938977',
                  color: '#180c04',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  padding: '14px 32px',
                  borderRadius: '2px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.4s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#fcfaee';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#938977';
                }}
              >
                SUBSCRIBE
              </button>
            </form>

            {error && (
              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '12px',
                  color: '#c45b4a',
                  marginTop: '12px',
                }}
              >
                {error}
              </p>
            )}
          </>
        ) : (
          <div
            style={{
              animation: 'fadeIn 0.6s ease forwards',
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#938977"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ margin: '0 auto 16px' }}
            >
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <h3
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '22px',
                fontWeight: 400,
                fontStyle: 'italic',
                color: '#fcfaee',
              }}
            >
              Welcome to the pack! Check your inbox for a confirmation.
            </h3>
          </div>
        )}
      </div>
    </section>
  );
}
