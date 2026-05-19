import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [expired, setExpired] = useState(false);
  const targetDate = new Date('2025-12-31T23:59:59').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setExpired(true);
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: 'DAYS' },
    { value: timeLeft.hours, label: 'HOURS' },
    { value: timeLeft.minutes, label: 'MINUTES' },
    { value: timeLeft.seconds, label: 'SECONDS' },
  ];

  if (expired) {
    return (
      <div
        style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: '36px',
          fontWeight: 600,
          color: '#c45b4a',
          textAlign: 'center',
        }}
      >
        SALE ENDED
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
      {timeUnits.map((unit, i) => (
        <div key={unit.label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '72px',
              height: '72px',
              background: 'rgba(252, 250, 238, 0.08)',
              border: '1px solid rgba(147, 137, 119, 0.3)',
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '30px',
                fontWeight: 600,
                color: '#fcfaee',
                lineHeight: 1,
              }}
            >
              {String(unit.value).padStart(2, '0')}
            </span>
            <span
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '9px',
                color: '#938977',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginTop: '4px',
              }}
            >
              {unit.label}
            </span>
          </div>
          {i < timeUnits.length - 1 && (
            <span
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '22px',
                color: '#938977',
              }}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function PromoBanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
      if (rightRef.current) {
        gsap.fromTo(
          rightRef.current,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="promo"
      ref={sectionRef}
      style={{
        backgroundColor: '#180c04',
        position: 'relative',
        zIndex: 2,
        padding: '80px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          gap: '60px',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {/* Left side */}
        <div ref={leftRef} style={{ flex: '1 1 500px', minWidth: '300px', opacity: 0 }}>
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              color: '#938977',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            LIMITED TIME OFFER
          </p>
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(28px, 3vw, 36px)',
              fontWeight: 500,
              color: '#fcfaee',
              lineHeight: 1.2,
            }}
          >
            Summer Pet Care Sale — Up to 40% Off
          </h2>
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '14px',
              color: 'rgba(252, 250, 238, 0.8)',
              lineHeight: 1.6,
              maxWidth: '480px',
              marginTop: '16px',
            }}
          >
            Stock up on premium pet essentials before summer ends. Free shipping on all orders over $35 during the sale period.
          </p>
          <a
            href="#products"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              display: 'inline-block',
              marginTop: '24px',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              color: '#938977',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderBottom: '1px solid #938977',
              paddingBottom: '4px',
              transition: 'color 0.4s ease, border-color 0.4s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.color = '#fcfaee';
              el.style.borderBottomColor = '#fcfaee';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.color = '#938977';
              el.style.borderBottomColor = '#938977';
            }}
          >
            SHOP THE SALE →
          </a>
        </div>

        {/* Right side - Countdown */}
        <div
          ref={rightRef}
          style={{
            flex: '0 0 auto',
            minWidth: '300px',
            opacity: 0,
          }}
        >
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              color: '#938977',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            ENDS IN:
          </p>
          <CountdownTimer />
        </div>
      </div>
    </section>
  );
}
