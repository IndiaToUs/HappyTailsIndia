import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { getLenis } from '../hooks/useLenis';
import { navigationConfig } from '../config';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [badgePulse, setBadgePulse] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      const navHeight = navRef.current?.offsetHeight ?? 0;
      const probeY = navHeight > 0 ? navHeight * 0.6 : 60;
      const lightSectionIds = ['anatomy', 'tiers', 'testimonials', 'footer'];
      const isInLightSection = lightSectionIds.some((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= probeY && rect.bottom >= probeY;
      });

      setIsLightSection(isInLightSection);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Listen for cart updates from Products section
  useEffect(() => {
    const handleCartUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      setCartCount(customEvent.detail.count);
      setBadgePulse(true);
      setTimeout(() => setBadgePulse(false), 300);
    };
    window.addEventListener('cart-updated', handleCartUpdate);
    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (mobileMenuOpen) {
        gsap.to(mobileMenuRef.current, {
          x: '0%',
          duration: 0.5,
          ease: 'power2.out',
        });
        const lenis = getLenis();
        if (lenis) lenis.stop();
      } else {
        gsap.to(mobileMenuRef.current, {
          x: '100%',
          duration: 0.5,
          ease: 'power2.out',
        });
        const lenis = getLenis();
        if (lenis) lenis.start();
      }
    }
  }, [mobileMenuOpen]);

  const baseTextColor = isLightSection ? '#180c04' : '#fcfaee';
  const hoverTextColor = isLightSection ? '#696969' : '#938977';

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(targetId);
    } else {
      const el = document.querySelector(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!navigationConfig.brandName && navigationConfig.links.length === 0) {
    return null;
  }

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 100,
          padding: scrolled ? '16px 0' : '24px 0',
          transition: 'padding 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          className="liquid-glass"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '14px 40px',
            borderRadius: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {navigationConfig.brandName ? (
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '20px',
                fontWeight: 500,
                color: baseTextColor,
                letterSpacing: '2px',
                textDecoration: 'none',
                textTransform: 'uppercase',
                transition: 'color 0.6s ease',
              }}
            >
              {navigationConfig.brandName}
            </a>
          ) : (
            <div />
          )}

          {/* Desktop Nav */}
          <div className="nav-desktop" style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
            {navigationConfig.links.map((item) => (
              <a
                key={`${item.label}-${item.target}`}
                href={item.target}
                onClick={(e) => handleNavClick(e, item.target)}
                className="nav-link"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: baseTextColor,
                  letterSpacing: '1.3px',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  transition: 'color 0.6s ease',
                  opacity: 0.85,
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLAnchorElement).style.color = hoverTextColor;
                  (e.target as HTMLAnchorElement).style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLAnchorElement).style.color = baseTextColor;
                  (e.target as HTMLAnchorElement).style.opacity = '0.85';
                }}
              >
                {item.label}
              </a>
            ))}

            {/* Cart Icon */}
            <button
              onClick={() => {/* Open cart drawer */}}
              style={{
                position: 'relative',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                color: baseTextColor,
                transition: 'color 0.6s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = hoverTextColor;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = baseTextColor;
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    backgroundColor: '#c45b4a',
                    color: '#fcfaee',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '10px',
                    fontWeight: 600,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: badgePulse ? 'scale(1.2)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: baseTextColor,
              padding: '4px',
            }}
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100%',
          height: '100vh',
          backgroundColor: '#180c04',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
          transform: 'translateX(100%)',
        }}
      >
        {navigationConfig.links.map((item) => (
          <a
            key={`mobile-${item.label}`}
            href={item.target}
            onClick={(e) => handleNavClick(e, item.target)}
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '24px',
              fontWeight: 500,
              color: '#fcfaee',
              textDecoration: 'none',
              letterSpacing: '1px',
            }}
          >
            {item.label}
          </a>
        ))}
        <div
          style={{
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(252, 250, 238, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#fcfaee',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '14px' }}>
            Cart ({cartCount})
          </span>
        </div>
      </div>
    </>
  );
}
