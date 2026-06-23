import React, { useState, useRef, useEffect } from 'react';
import { FiUploadCloud, FiFileText, FiTrash2, FiShoppingBag, FiInfo } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './PrintCalculator.css';

const PrintCalculator = ({ onOrderAdded }) => {
  const { addToCart } = useCart();
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('idle'); // 'idle', 'uploading', 'scanning', 'completed'
  const fileInputRef = useRef(null);

  // Configuration options
  const [colorMode, setColorMode] = useState('bw'); // 'bw' or 'color'
  const [printSides, setPrintSides] = useState('single'); // 'single' or 'double'
  const [pages, setPages] = useState(1);
  const [copies, setCopies] = useState(1);
  const [binding, setBinding] = useState('none'); // 'none', 'spiral', 'lamination'
  const [instructions, setInstructions] = useState('');

  // Calculate pricing
  const [pricing, setPricing] = useState({
    perPage: 2,
    baseCost: 2,
    bindingCost: 0,
    total: 2,
  });

  // Automatically compute pricing whenever options change
  useEffect(() => {
    let perPagePrice = 2; // default bw single

    if (colorMode === 'bw') {
      perPagePrice = printSides === 'single' ? 2 : 1.5; // single side: ₹2, double side: ₹3 (₹1.5 per page-side)
    } else {
      perPagePrice = printSides === 'single' ? 10 : 7.5; // single side: ₹10, double side: ₹15 (₹7.5 per page-side)
    }

    const printRate = printSides === 'single' ? perPagePrice : perPagePrice * 2;
    const baseCost = printRate * pages * copies;

    let bindingCost = 0;
    if (binding === 'spiral') bindingCost = 50 * copies;
    else if (binding === 'lamination') bindingCost = 30 * copies;

    const total = baseCost + bindingCost;

    setPricing({
      perPage: printSides === 'single' ? perPagePrice : perPagePrice * 2,
      baseCost,
      bindingCost,
      total,
    });
  }, [colorMode, printSides, pages, copies, binding]);

  // Handle Drag & Drop
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (selectedFile) => {
    // Basic validation
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(selectedFile.type) && !selectedFile.name.endsWith('.docx') && !selectedFile.name.endsWith('.doc')) {
      alert('Invalid file format. Please upload PDF, Word document, or image files.');
      return;
    }

    setFile(selectedFile);
    setUploadStatus('uploading');
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus('scanning');
          
          // Simulate doc scanning for page numbers
          setTimeout(() => {
            setUploadStatus('completed');
            // Generate a random page count between 3 and 30 for the mock feel
            const randomPages = Math.floor(Math.random() * 25) + 3;
            setPages(randomPages);
          }, 1500);

          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadProgress(0);
    setUploadStatus('idle');
    setPages(1);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAddToCart = () => {
    if (!file || uploadStatus !== 'completed') return;

    const printItem = {
      name: `Xerox Job: ${file.name}`,
      price: pricing.total / copies, // unit cost
    };

    const printConfig = {
      fileName: file.name,
      fileSize: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      colorMode,
      printSides,
      pages,
      binding,
      instructions,
    };

    addToCart(printItem, copies, true, printConfig);
    if (onOrderAdded) onOrderAdded();
  };

  return (
    <div className="print-widget-container glass-card">
      <div className="print-grid">
        
        {/* Left Column: Upload Area */}
        <div className="print-upload-col">
          <h3>1. Upload Document</h3>
          <p className="upload-subtitle">Upload your PDF, Word file, or images for Xerox printing.</p>

          <div
            className={`dropzone glass-card ${uploadStatus !== 'idle' ? 'active' : ''}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => uploadStatus === 'idle' && fileInputRef.current.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              style={{ display: 'none' }}
            />

            {uploadStatus === 'idle' && (
              <div className="dropzone-prompt">
                <FiUploadCloud className="upload-icon" />
                <p className="prompt-text">Drag and drop file here, or <span>browse files</span></p>
                <span className="file-formats-tag">PDF, Word, Images (Max 50MB)</span>
              </div>
            )}

            {uploadStatus === 'uploading' && (
              <div className="progress-container">
                <FiFileText className="file-loading-icon spinning" />
                <p className="progress-text">Uploading {file.name}...</p>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${uploadProgress}%` }} />
                </div>
                <span className="progress-percent">{uploadProgress}%</span>
              </div>
            )}

            {uploadStatus === 'scanning' && (
              <div className="progress-container">
                <div className="pulse-circle">📄</div>
                <p className="progress-text scanning-text">Scanning document pages...</p>
                <span className="scanning-bar"></span>
              </div>
            )}

            {uploadStatus === 'completed' && (
              <div className="file-success-box animate-fade-in">
                <div className="file-icon-box">📄</div>
                <div className="file-meta">
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB • <strong className="detected-badge">{pages} pages detected</strong></span>
                </div>
                <button
                  className="delete-file-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile();
                  }}
                  title="Remove document"
                >
                  <FiTrash2 />
                </button>
              </div>
            )}
          </div>

          <div className="instruction-box">
            <label className="input-label">Special Printing Instructions (Optional)</label>
            <textarea
              placeholder="e.g. Page 1-5 only, double sided, bind after printing..."
              className="input-field instruction-input"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows="3"
            />
          </div>
        </div>

        {/* Right Column: Print Configuration & Pricing */}
        <div className="print-config-col">
          <h3>2. Configuration & Pricing</h3>

          <div className="config-grid">
            {/* Color Mode */}
            <div className="config-option">
              <span className="config-label">Color Preference</span>
              <div className="radio-group">
                <button
                  className={`radio-option ${colorMode === 'bw' ? 'active' : ''}`}
                  onClick={() => setColorMode('bw')}
                >
                  Black & White
                </button>
                <button
                  className={`radio-option ${colorMode === 'color' ? 'active' : ''}`}
                  onClick={() => setColorMode('color')}
                >
                  Color Print
                </button>
              </div>
            </div>

            {/* Print Sides */}
            <div className="config-option">
              <span className="config-label">Printing Sides</span>
              <div className="radio-group">
                <button
                  className={`radio-option ${printSides === 'single' ? 'active' : ''}`}
                  onClick={() => setPrintSides('single')}
                >
                  Single-Sided
                </button>
                <button
                  className={`radio-option ${printSides === 'double' ? 'active' : ''}`}
                  onClick={() => setPrintSides('double')}
                >
                  Double-Sided
                </button>
              </div>
            </div>

            {/* Pages Selector */}
            <div className="config-input-row">
              <div className="input-group">
                <label className="input-label">Total Pages</label>
                <input
                  type="number"
                  min="1"
                  className="input-field"
                  value={pages}
                  onChange={(e) => setPages(Math.max(1, parseInt(e.target.value) || 1))}
                  disabled={uploadStatus === 'completed'} // Lock if auto-detected
                />
                {uploadStatus === 'completed' && (
                  <span className="lock-hint"><FiInfo /> Locked by doc scanner</span>
                )}
              </div>

              {/* Copies Selector */}
              <div className="input-group">
                <label className="input-label">Number of Copies</label>
                <input
                  type="number"
                  min="1"
                  className="input-field"
                  value={copies}
                  onChange={(e) => setCopies(Math.max(1, parseInt(e.target.value) || 1))}
                />
              </div>
            </div>

            {/* Binding Preference */}
            <div className="config-option">
              <span className="config-label">Binding Preference</span>
              <div className="radio-group">
                <button
                  className={`radio-option ${binding === 'none' ? 'active' : ''}`}
                  onClick={() => setBinding('none')}
                >
                  No Binding
                </button>
                <button
                  className={`radio-option ${binding === 'spiral' ? 'active' : ''}`}
                  onClick={() => setBinding('spiral')}
                >
                  Spiral (₹50)
                </button>
                <button
                  className={`radio-option ${binding === 'lamination' ? 'active' : ''}`}
                  onClick={() => setBinding('lamination')}
                >
                  Lamination (₹30)
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Breakout Box */}
          <div className="pricing-box glass-panel">
            <div className="pricing-title">Price Breakdown</div>
            <div className="pricing-line">
              <span>Rate per Page ({colorMode === 'bw' ? 'B&W' : 'Color'}, {printSides === 'single' ? 'Single' : 'Double'})</span>
              <span>₹{pricing.perPage.toFixed(2)}</span>
            </div>
            <div className="pricing-line">
              <span>Printing Subtotal ({pages} pages × {copies} copies)</span>
              <span>₹{pricing.baseCost}</span>
            </div>
            {pricing.bindingCost > 0 && (
              <div className="pricing-line">
                <span>Binding Cost ({copies} copy)</span>
                <span>₹{pricing.bindingCost}</span>
              </div>
            )}
            <div className="pricing-line total-line">
              <span>Total Price (Incl. Taxes)</span>
              <span className="total-val">₹{pricing.total}</span>
            </div>
          </div>

          {/* Actions */}
          <button
            onClick={handleAddToCart}
            className="btn btn-primary print-add-btn"
            disabled={uploadStatus !== 'completed'}
          >
            <FiShoppingBag /> Add Print Job to Cart
          </button>
          {uploadStatus !== 'completed' && (
            <span className="upload-reminder"><FiInfo /> Please upload a document to proceed.</span>
          )}
        </div>

      </div>
    </div>
  );
};

export default PrintCalculator;
