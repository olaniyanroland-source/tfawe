type LegalType = "privacy" | "terms" | "cookies";

type Section = { heading: string; body: string[] };

const CONTENT: Record<LegalType, { eyebrow: string; title: string; intro: string; sections: Section[] }> = {
  privacy: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    intro: "This policy explains how TFawe handles personal information when you visit our website, contact us, or book an appointment.",
    sections: [
      { heading: "Information we collect", body: ["We may collect the information you choose to provide, including your name, email address, phone number, message, and appointment details. We also receive limited technical information such as device, browser, and website usage data through cookies and service providers."] },
      { heading: "How we use information", body: ["We use your information to respond to enquiries, arrange consultations, provide our services, improve the website, and send updates where you have chosen to receive them. We do not sell personal information."] },
      { heading: "Service providers", body: ["We use carefully selected third parties to operate parts of our website and booking experience. Calendly processes appointment scheduling information under its own privacy practices. These providers may process information only as needed to deliver their services."] },
      { heading: "Your choices", body: ["You may ask to access, correct, or delete personal information we hold about you, subject to applicable legal requirements. You may unsubscribe from marketing emails at any time using the link in the email or by contacting us."] },
      { heading: "Contact", body: ["For privacy questions or requests, email hello@tfawe.com. We may update this policy from time to time; the latest version will always appear on this page."] },
    ],
  },
  terms: {
    eyebrow: "Legal",
    title: "Terms of Use",
    intro: "These terms govern your use of the TFawe website. By using the site, you agree to use it lawfully and in accordance with these terms.",
    sections: [
      { heading: "Website information", body: ["We aim to keep website content accurate and current, but product imagery, availability, descriptions, and prices may change. Prices shown are starting prices unless stated otherwise and do not form a binding offer or final quotation."] },
      { heading: "Appointments and enquiries", body: ["Booking a consultation or sending an enquiry does not create a purchase agreement. Any garment order, scope of work, timing, pricing, deposits, and payment terms will be confirmed separately with you."] },
      { heading: "Intellectual property", body: ["The TFawe name, logo, website design, photographs, text, and other site content are owned by or licensed to TFawe. You may view the site for personal, non-commercial use, but may not reproduce or use its content without permission."] },
      { heading: "Acceptable use", body: ["Do not interfere with the website, attempt unauthorized access, submit harmful material, or use the site in a way that infringes another person's rights. We may restrict access where necessary to protect the site or our visitors."] },
      { heading: "Third-party services", body: ["This website may link to or use services operated by third parties, including Instagram and Calendly. We are not responsible for their content, availability, or privacy practices. Questions about these terms may be sent to hello@tfawe.com."] },
    ],
  },
  cookies: {
    eyebrow: "Legal",
    title: "Cookie Policy",
    intro: "This policy explains how cookies and similar technologies may be used when you visit the TFawe website.",
    sections: [
      { heading: "What cookies are", body: ["Cookies are small text files stored on your device. They help websites remember information about a visit, support essential features, and understand how visitors use a site."] },
      { heading: "How we use them", body: ["We may use essential cookies needed for website operation and cookies placed by third-party services embedded on the site. When you use the Calendly booking widget, Calendly may set cookies or use similar technologies to provide scheduling, security, and preference features."] },
      { heading: "Managing cookies", body: ["You can control or delete cookies through your browser settings. Blocking some cookies may affect website features, including appointment booking. Consult your browser's help materials for instructions on managing cookie preferences."] },
      { heading: "Third-party cookies", body: ["Third-party services operate under their own policies. For more information about the scheduling widget, review Calendly's privacy and cookie information directly. We do not control cookies set by third parties."] },
      { heading: "Updates and contact", body: ["We may revise this policy as our website or services change. For questions about cookies on this website, contact hello@tfawe.com."] },
    ],
  },
};

export function Legal({ type }: { type: LegalType }) {
  const page = CONTENT[type];

  return (
    <main style={{ background: "#F5EDE7", color: "#2C1810", minHeight: "100vh", padding: "150px 24px 96px" }}>
      <article className="max-w-3xl mx-auto">
        <p className="mb-3 text-xs tracking-[0.3em] uppercase" style={{ color: "#794137" }}>{page.eyebrow}</p>
        <h1 className="mb-6" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 400, lineHeight: 1.05 }}>{page.title}</h1>
        <p className="pb-10 mb-10 text-base leading-loose" style={{ color: "#5A3A30", borderBottom: "1px solid rgba(121,65,55,.18)" }}>{page.intro}</p>
        <div className="space-y-10">
          {page.sections.map(section => (
            <section key={section.heading}>
              <h2 className="mb-3 text-lg" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}>{section.heading}</h2>
              {section.body.map(paragraph => <p key={paragraph} className="text-sm leading-loose" style={{ color: "#5A3A30" }}>{paragraph}</p>)}
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}

export function PrivacyPolicy() {
  return <Legal type="privacy" />;
}

export function TermsOfUse() {
  return <Legal type="terms" />;
}

export function CookiePolicy() {
  return <Legal type="cookies" />;
}
