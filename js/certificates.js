
// JavaScript for Certificates Window
function openCertificateModal(certId) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'cert-modal';
    modal.innerHTML = `
        <div class="cert-modal-content">
            <span class="cert-close" onclick="closeCertificateModal()">&times;</span>
            <div class="cert-modal-header">
                <h2>Certificate Details</h2>
            </div>
            <div class="cert-modal-body">
                <div class="cert-preview">
                    <div class="cert-placeholder">
                        <div class="cert-placeholder-icon">🏆</div>
                        <p>Certificate Preview</p>
                        <p class="cert-id">ID: ${certId}</p>
                    </div>
                </div>
                <div class="cert-actions">
                    <button class="cert-action-btn download" onclick="downloadCertificate('${certId}')">
                        📥 Download PDF
                    </button>
                    <button class="cert-action-btn verify" onclick="verifyCertificate('${certId}')">
                        ✅ Verify Certificate
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .cert-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        }
        
        .cert-modal-content {
            background: white;
            padding: 0;
            border-radius: 15px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .cert-close {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 30px;
            cursor: pointer;
            color: #666;
            z-index: 1001;
        }
        
        .cert-modal-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 20px 20px;
            border-radius: 15px 15px 0 0;
        }
        
        .cert-modal-body {
            padding: 30px;
        }
        
        .cert-preview {
            background: #f8f9fa;
            border: 2px dashed #ddd;
            border-radius: 10px;
            padding: 40px;
            text-align: center;
            margin-bottom: 30px;
        }
        
        .cert-placeholder-icon {
            font-size: 4rem;
            margin-bottom: 15px;
        }
        
        .cert-actions {
            display: flex;
            gap: 15px;
            justify-content: center;
        }
        
        .cert-action-btn {
            padding: 12px 25px;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
        }
        
        .cert-action-btn.download {
            background: linear-gradient(45deg, #2ecc71, #27ae60);
            color: white;
        }
        
        .cert-action-btn.verify {
            background: linear-gradient(45deg, #3498db, #2980b9);
            color: white;
        }
        
        .cert-action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
}

function closeCertificateModal() {
    const modal = document.querySelector('.cert-modal');
    if (modal) {
        modal.remove();
    }
}

function downloadCertificate(certId) {
    alert(`Downloading certificate: ${certId}`);
    // Add actual download logic here
}

function verifyCertificate(certId) {
    alert(`Verifying certificate: ${certId}`);
    // Add actual verification logic here
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cert-modal')) {
        closeCertificateModal();
    }
});