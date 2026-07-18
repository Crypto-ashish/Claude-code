import type { Metadata, Viewport } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartDrawer, Preloader, Toast, WhatsAppButton } from "@/components/Chrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://goldencrumb.example.com"),
  title: {
    default: "GoldenCrumb — Premium Bakery Biscuits, Cookies & Gift Packs",
    template: "%s · GoldenCrumb Bakery",
  },
  description:
    "Small-batch bakery biscuits, premium cookies, certified gluten-free bakes, protein snacks and luxury gift hampers. Stone-oven baked in Punjab, delivered crisp across India.",
  keywords: [
    "bakery biscuits",
    "premium cookies",
    "gluten free biscuits India",
    "healthy snacks",
    "cookie gift packs",
    "wholesale biscuits",
  ],
  openGraph: {
    type: "website",
    siteName: "GoldenCrumb Bakery",
    title: "GoldenCrumb — Premium Bakery Biscuits & Cookies",
    description:
      "Stone-oven baked biscuits, cookies, gluten-free bakes and gift hampers delivered across India.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF6EC" },
    { media: "(prefers-color-scheme: dark)", color: "#17100A" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          // Apply persisted theme before hydration to avoid a flash.
          dangerouslySetInnerHTML={{
            __html: `try{if(JSON.parse(localStorage.getItem('gc-dark')||'false'))document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Bakery",
              name: "GoldenCrumb Bakery",
              servesCuisine: "Biscuits, Cookies, Healthy Snacks",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Ludhiana",
                addressRegion: "Punjab",
                addressCountry: "IN",
              },
              priceRange: "₹₹",
            }),
          }}
        />
      </head>
      <body className="font-body">
        <StoreProvider>
          <Preloader />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
          <Toast />
          <WhatsAppButton />
        </StoreProvider>
      </body>
    </html>
  );
}
