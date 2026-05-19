import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '../config';

gsap.registerPlugin(ScrollTrigger);

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={star <= Math.round(rating) ? '#d4a843' : 'rgba(24,12,4,0.15)'}
          stroke="none"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '11px',
          color: '#696969',
          marginLeft: '4px',
        }}
      >
        ({rating})
      </span>
    </div>
  );
}

export default function Products() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleAddToCart = (_productId: number) => {
    setCartCount((prev) => prev + 1);
    // Dispatch event for nav cart badge
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: { count: cartCount + 1 } }));
    // In Shopify: fetch('/cart/add.js', { method: 'POST', body: JSON.stringify({ id: _productId, quantity: 1 }) })
  };

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case 'Best Seller':
        return { background: '#938977', color: '#fcfaee' };
      case 'New Arrival':
        return { background: '#180c04', color: '#fcfaee' };
      case 'Sale':
        return { background: '#c45b4a', color: '#fcfaee' };
      case 'Top Rated':
        return { background: '#4a7c59', color: '#fcfaee' };
      default:
        return { background: '#938977', color: '#fcfaee' };
    }
  };

  return (
    <section
      id="products"
      ref={sectionRef}
      style={{
        backgroundColor: '#fcfaee',
        position: 'relative',
        zIndex: 2,
        padding: '100px 0 80px',
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'center', padding: '0 24px 60px' }}>
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
          TRENDING NOW
        </p>
        <h2
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 500,
            lineHeight: 1.2,
            color: '#180c04',
          }}
        >
          Pet Parent Favorites
        </h2>
      </div>

      {/* Product Grid */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '32px',
        }}
      >
        {products.map((product, i) => (
          <div
            key={product.id}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="tier-image-placeholder"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0px 2px 10px -3px rgba(168, 142, 113, 0.15)',
              transition: 'transform 0.4s ease, box-shadow 0.4s ease',
              opacity: 0,
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.transform = 'translateY(-4px)';
              el.style.boxShadow = '0px 8px 24px rgba(168, 142, 113, 0.25)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.transform = 'translateY(0)';
              el.style.boxShadow = '0px 2px 10px -3px rgba(168, 142, 113, 0.15)';
            }}
          >
            {/* Image Area */}
            <div
              style={{
                aspectRatio: '1/1',
                overflow: 'hidden',
                backgroundColor: '#f0ecd7',
                position: 'relative',
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.6s ease',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLImageElement).style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLImageElement).style.transform = 'scale(1)';
                }}
              />
              {/* Badge */}
              <span
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  padding: '6px 12px',
                  borderRadius: '2px',
                  ...getBadgeStyle(product.badge),
                }}
              >
                {product.badge}
              </span>
            </div>

            {/* Content Area */}
            <div style={{ padding: '20px' }}>
              <StarRating rating={product.rating} />

              <h4
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#180c04',
                  marginTop: '8px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {product.name}
              </h4>

              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '11px',
                  color: '#938977',
                  marginTop: '4px',
                }}
              >
                {product.category}
              </p>

              {/* Price Row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginTop: '12px',
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: '22px',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    color: '#938977',
                  }}
                >
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: '14px',
                        fontWeight: 400,
                        color: '#696969',
                        textDecoration: 'line-through',
                      }}
                    >
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: '10px',
                        color: '#c45b4a',
                        background: 'rgba(196, 91, 74, 0.1)',
                        padding: '2px 8px',
                        borderRadius: '2px',
                      }}
                    >
                      Save {formatPrice((product.originalPrice || 0) - product.price)}
                    </span>
                  </>
                )}
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => handleAddToCart(product.id)}
                style={{
                  width: '100%',
                  marginTop: '16px',
                  backgroundColor: '#180c04',
                  color: '#fcfaee',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  padding: '12px 0',
                  borderRadius: '2px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#938977';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#180c04';
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
