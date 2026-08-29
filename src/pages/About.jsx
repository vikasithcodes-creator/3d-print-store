import './About.css';

export default function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <h1>About SM Studio</h1>
          <p>
            We're dedicated to delivering precision 3D printing services that bring your ideas to life.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="about-content">
          <div className="about-section">
            <h2>Who We Are</h2>
            <p>
              SM Studio is a specialized 3D printing service committed to quality, precision, and customer satisfaction.
              We combine advanced printing technology with meticulous attention to detail to create products that exceed expectations.
            </p>
            <p>
              Whether you're looking for a unique home accessory, a functional desk tool, or bringing your own design to life,
              we have the expertise and equipment to deliver exceptional results.
            </p>
          </div>

          <div className="about-section">
            <h2>What We Do</h2>
            <p>
              We offer two core services: a curated collection of ready-to-order 3D printed products and custom printing
              for your own designs. Every print is carefully produced using high-quality materials and undergoes quality
              control to ensure it meets our standards.
            </p>
            <p>
              Our product range spans functional items like desk organizers and phone stands to decorative pieces like
              planters and collectibles. For custom projects, we work with you from quote to delivery, ensuring your
              vision is realized with precision.
            </p>
          </div>

          <div className="about-section">
            <h2>Why Choose Us</h2>
            <div className="values-grid">
              <div className="value-item">
                <div className="value-icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h3>Quality Prints</h3>
                <p>
                  Every print is carefully inspected and produced with attention to detail using premium materials.
                </p>
              </div>

              <div className="value-item">
                <div className="value-icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                </div>
                <h3>Custom Solutions</h3>
                <p>
                  Upload your own 3D models and we'll print them according to your exact specifications and requirements.
                </p>
              </div>

              <div className="value-item">
                <div className="value-icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <h3>Clear Communication</h3>
                <p>
                  From order to delivery, we keep you informed with transparent timelines and responsive support.
                </p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>Our Approach</h2>
            <p>
              We believe 3D printing should be accessible, reliable, and high-quality. That's why we focus on:
            </p>
            <p>
              <strong>Material Quality:</strong> We use trusted filament brands and test every spool to ensure consistent results.
            </p>
            <p>
              <strong>Print Quality:</strong> Our printers are calibrated regularly and every print is inspected before shipping.
            </p>
            <p>
              <strong>Customer Service:</strong> We respond to inquiries quickly and work with you to ensure you get exactly what you need.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
