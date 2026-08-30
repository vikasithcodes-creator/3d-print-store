import { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import './CustomPrinting.css';

export default function CustomPrinting() {
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    quantity: '1',
    material: '',
    color: '',
    size: '',
    finish: '',
    instructions: '',
    name: '',
    email: '',
    phone: ''
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, upload file and send data to backend
    console.log('Quote request:', { file, formData });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="custom-printing page-section">
        <div className="container page-section">
          <div className="success-message-custom page-section">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <h3>Quote Request Submitted!</h3>
            <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--spacing-6)' }}>
              We've received your custom printing request. Our team will review your file and get back to you with a quote within 24 hours.
            </p>
            <Button onClick={() => setSubmitted(false)}>Submit Another Request</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="custom-printing page-section">
      <div className="container page-section">
        <div className="custom-hero page-section">
          <h1>Have a 3D Model? We'll Print It.</h1>
          <p>
            Upload your own 3D design and we'll bring it to life with precision printing.
            Get a custom quote based on your specifications.
          </p>
        </div>

        <div className="process-section page-section">
          <div className="process-steps page-section">
            <div className="process-step page-section">
              <div className="step-number page-section">1</div>
              <h3>Upload Model</h3>
              <p>Upload your STL, OBJ, or 3MF file</p>
            </div>
            <div className="process-step page-section">
              <div className="step-number page-section">2</div>
              <h3>Choose Options</h3>
              <p>Select material, color, and finish</p>
            </div>
            <div className="process-step page-section">
              <div className="step-number page-section">3</div>
              <h3>Get Quote</h3>
              <p>Receive a detailed quote within 24h</p>
            </div>
            <div className="process-step page-section">
              <div className="step-number page-section">4</div>
              <h3>Approve Order</h3>
              <p>Review and confirm your order</p>
            </div>
            <div className="process-step page-section">
              <div className="step-number page-section">5</div>
              <h3>We Print & Ship</h3>
              <p>Your print is produced and delivered</p>
            </div>
          </div>
        </div>

        <div className="quote-form-section page-section">
          <h2>Request a Quote</h2>

          <form onSubmit={handleSubmit}>
            <div className="file-upload page-section">
              <label className="upload-area page-section" htmlFor="file-upload">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <p>Click to upload your 3D model</p>
                <span>Supports STL, OBJ, 3MF files (Max 50MB)</span>
                <input
                  id="file-upload"
                  type="file"
                  accept=".stl,.obj,.3mf"
                  onChange={handleFileChange}
                  required
                />
              </label>

              {file && (
                <div className="file-selected page-section">
                  <div className="file-icon page-section">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                      <polyline points="13 2 13 9 20 9"/>
                    </svg>
                  </div>
                  <div className="file-info page-section">
                    <div className="file-name page-section">{file.name}</div>
                    <div className="file-size page-section">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                  </div>
                  <button
                    type="button"
                    className="remove-file page-section"
                    onClick={() => setFile(null)}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <div className="form-grid page-section">
              <Input
                label="Quantity"
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="1"
              />
              <Input
                label="Material"
                name="material"
                value={formData.material}
                onChange={handleChange}
                placeholder="e.g., PLA, PETG, ABS"
                required
              />
              <Input
                label="Color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="e.g., Black, White"
                required
              />
              <Input
                label="Size/Scale"
                name="size"
                value={formData.size}
                onChange={handleChange}
                placeholder="e.g., 100%, 50mm height"
              />
              <Input
                label="Desired Finish"
                name="finish"
                value={formData.finish}
                onChange={handleChange}
                placeholder="e.g., Standard, Smooth"
                className="form-full page-section"
              />
            </div>

            <div className="textarea-group page-section">
              <label className="input-label page-section">Additional Instructions</label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                placeholder="Any special requirements or notes about your print..."
                className="textarea page-section"
              />
            </div>

            <div className="form-grid page-section">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                label="Phone / WhatsApp"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="form-full page-section"
              />
            </div>

            <Button type="submit" size="large" fullWidth>
              Get a Quote
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
