import React from 'react';

const JsonLd = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Jay",
        "url": "https://jaywebstudio.in",
        "jobTitle": "Freelance Web Developer & SEO Specialist",
        "image": "https://jaywebstudio.in/images/jay%20logo.png",
        "sameAs": [
            // Add social links here if needed in future
        ],
        "workLocation": {
            "@type": "Place",
            "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
            }
        },
        "worksFor": {
            "@type": "Organization",
            "name": "Jay Web Studio"
        },
        "knowsAbout": ["Web Development", "SEO", "React", "Next.js", "Tailwind CSS", "UI/UX Design"]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export default JsonLd;
