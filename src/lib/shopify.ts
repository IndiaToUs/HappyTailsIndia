const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

export async function createCheckoutAndRedirect(shopifyVariantId: string): Promise<string> {
  const response = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
      },
      body: JSON.stringify({
        query: `
          mutation {
            checkoutCreate(input: {
              lineItems: [{ variantId: "gid://shopify/ProductVariant/${shopifyVariantId}", quantity: 1 }]
            }) {
              checkout { webUrl }
            }
          }
        `,
      }),
    }
  );

  const data = await response.json();
  return data.data.checkoutCreate.checkout.webUrl;
}
