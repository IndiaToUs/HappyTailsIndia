const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

export async function createCheckoutAndRedirect(shopifyVariantId: string): Promise<string> {
  const response = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/2024-10/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
      },
      body: JSON.stringify({
        query: `
          mutation cartCreate($input: CartInput!) {
            cartCreate(input: $input) {
              cart {
                checkoutUrl
              }
              userErrors {
                field
                message
              }
            }
          }
        `,
        variables: {
          input: {
            lines: [
              {
                merchandiseId: `gid://shopify/ProductVariant/${shopifyVariantId}`,
                quantity: 1,
              },
            ],
          },
        },
      }),
    }
  );

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(data.errors[0].message);
  }

  const { cart, userErrors } = data.data.cartCreate;
  
  if (userErrors.length > 0) {
    throw new Error(userErrors[0].message);
  }

  return cart.checkoutUrl;
}
