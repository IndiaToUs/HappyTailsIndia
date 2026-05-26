import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '../config';
import { createCheckoutAndRedirect } from '../lib/shopify';

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
      <span style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '11px', color: '#696969', marginLeft: '4px' }}>
        ({rating})
      </span>
    </div>
  );
}

const variantMap: { [key: number]: string } = {
  1: "47208335147139",
  2: "47208330952835",
  3: "47208328691843",
  4: "47208322039939",
  5: "47208315748483",
  6: "47208312995971",
  7: "47208311062659",
  8: "47208303755395",
};

export default function Products() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleAddToCart = async (productId: number) => {
    const variantId = variantMap[productId];
    if (!variantId) return;

    setLoadingId(productId);
    try {
      const url = await createCheckoutAndRedirect(variantId);
      window.location.href = url;
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case 'Best Seller': return { background: '#938977', color: '#fcfaee' };
      case 'New Arrival': return { background: '#180c04', color: '#fcfaee' };
      case 'Sale': return { background: '#c45b4a', color: '#fcfaee' };
      case 'Top Rated': return { background: '#4a7c59', color: '#fcfaee' };
      default: return { background: '#938977', color: '#fcfaee' };
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
        padding: '80px 0',
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'center', padding: '0 24px 48px' }}>
        <p style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '11px',
          fontWeight: 600,
          color: '#938977',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}>
          TRENDING NOW
        </p>
        <h2 style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 500,
          lineHeight: 1.2,
          color: '#180c04',
        }}>
          Pet Parent Favorites
        </h2>
      </div>

      {/* Product Grid */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '28px',
      }}>
        {products.map((product, i) => (
          <div
            key={product.id}
            ref={(el) => { cardRefs.current[i] = el; }}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0px 2px 10px -3px rgba(168, 142, 113, 0.15)',
              transition: 'transform 0.4s ease, box-shadow 0.4s ease',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0px 8px 24px rgba(168, 142, 113, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0px 2px 10px -3px rgba(168, 142, 113, 0.15)';
            }}
          >
            {/* Image */}
            <div style={{
              width: '100%',
              height: '220px',
              overflow: 'hidden',
              backgroundColor: '#f0ecd7',
              position: 'relative',
              flexShrink: 0,
            }}>
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
                onMouseEnter={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1.05)'; }}
                onMouseLeave={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1)'; }}
              />
              <span style={{
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
              }}>
                {product.badge}
              </span>
            </div>

            {/* Content */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <StarRating rating={product.rating} />

              <h4 style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '18px',
                fontWeight: 600,
                color: '#180c04',
                marginTop: '8px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {product.name}
              </h4>

              <p style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '11px',
                color: '#938977',
                marginTop: '4px',
              }}>
                {product.category}
              </p>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px', flexWrap: 'wrap' }}>
                <span style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '22px',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: '#938977',
                }}>
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '14px',
                      color: '#696969',
                      textDecoration: 'line-through',
                    }}>
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '10px',
                      color: '#c45b4a',
                      background: 'rgba(196, 91, 74, 0.1)',
                      padding: '2px 8px',
                      borderRadius: '2px',
                    }}>
                      Save {formatPrice((product.originalPrice || 0) - product.price)}
                    </span>
                  </>
                )}
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => handleAddToCart(product.id)}
                disabled={loadingId === product.id}
                style={{
                  width: '100%',
                  marginTop: '16px',
                  backgroundColor: loadingId === product.id ? '#938977' : '#180c04',
                  color: '#fcfaee',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  padding: '12px 0',
                  borderRadius: '2px',
                  border: 'none',
                  cursor: loadingId === product.id ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  if (loadingId !== product.id)
                    (e.target as HTMLButtonElement).style.backgroundColor = '#938977';
                }}
                onMouseLeave={(e) => {
                  if (loadingId !== product.id)
                    (e.target as HTMLButtonElement).style.backgroundColor = '#180c04';
                }}
              >
                {loadingId === product.id ? 'Redirecting...' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
