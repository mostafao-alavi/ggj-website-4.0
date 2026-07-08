import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  schemaData?: object;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description = "جامعه بازی‌سازان ایران در بزرگترین رویداد خلق بازی جهان. با هدف ایجاد خلاقیت و ترویج کار تیمی در بستر بازی‌سازی مستقل.",
  canonical = "https://globalgamejam.ir",
  ogType = "website",
  ogImage = "https://globalgamejam.ir/og-image.jpg",
  schemaData
}) => {
  const siteTitle = "Global Game Jam Iran";
  const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} | بزرگترین رویداد بازی‌سازی جهان`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};
