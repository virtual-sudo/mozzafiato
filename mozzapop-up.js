(function() {
    const appId = "mozzafiato-dynamic-hero";
    const brandTeal = "#369994";
    const imageUrl = "https://github.com/jiaseeds/mozzafiato-active/blob/main/POOL%20VIEW%20UPDATED2.png?raw=true";
    const imageTitle = "SWIMMING POOL";

    if (document.getElementById(appId)) document.getElementById(appId).remove();

    const style = document.createElement('style');
    style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;600&display=swap');

        #${appId} {
            position: fixed !important; 
            inset: 0 !important;
            z-index: 2147483647 !important;
            display: none; align-items: center; justify-content: center;
            background: transparent !important; 
            font-family: 'Inter', sans-serif;
            transition: all 0.6s ease;
            padding: 20px;
            pointer-events: none !important; 
        }
        #${appId}.active { display: flex !important; }

        .popup-monolith {
            background: #040808;
            width: clamp(320px, 85vw, 1200px);
            height: clamp(450px, 80vh, 850px); 
            border: 1px solid rgba(54, 153, 148, 0.4);
            position: relative;
            box-shadow: 0 40px 100px rgba(0,0,0,0.9);
            opacity: 0; 
            transform: translateY(50px) scale(0.98);
            transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
            display: flex; flex-direction: column;
            overflow: hidden;
            pointer-events: auto !important;
            animation: borderPulse 4s infinite ease-in-out;
        }
        
        @keyframes borderPulse {
            0%, 100% { border-color: rgba(54, 153, 148, 0.4); box-shadow: 0 40px 100px rgba(0,0,0,0.9); }
            50% { border-color: rgba(54, 153, 148, 0.8); box-shadow: 0 40px 100px rgba(0,0,0,0.9), 0 0 30px rgba(54, 153, 148, 0.2); }
        }

        #${appId}.active .popup-monolith { opacity: 1; transform: translateY(0) scale(1); }

        .popup-content-overlay {
            position: absolute; inset: 0;
            background: linear-gradient(to bottom, rgba(4,8,8,0.7) 0%, transparent 25%, transparent 100%);
            z-index: 5;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
            padding: clamp(30px, 5vw, 60px);
        }

        .popup-close-x {
            position: absolute; top: 20px; right: 25px;
            z-index: 20; color: #fff; opacity: 0.3; cursor: pointer; transition: 0.4s; 
            font-size: 32px; font-weight: 100;
        }
        .popup-close-x:hover { opacity: 1; color: ${brandTeal}; transform: rotate(90deg); }

        .popup-image-container {
            width: 100%; height: 100%; position: absolute; inset: 0; overflow: hidden;
        }
        .popup-image-container img {
            width: 100%; height: 100%; object-fit: cover; 
            transition: transform 10s ease-out;
        }
        #${appId}.active .popup-image-container img { transform: scale(1.1); }

        .popup-btn {
            align-self: center;
            color: #fff; font-size: clamp(9px, 0.8vw, 12px); letter-spacing: 0.6em; 
            cursor: pointer; transition: 0.5s cubic-bezier(0.19, 1, 0.22, 1);
            border: 1px solid ${brandTeal}; 
            padding: clamp(15px, 2vw, 22px) clamp(35px, 4vw, 60px);
            background: ${brandTeal}; text-transform: uppercase;
            text-indent: 0.6em;
            box-shadow: 0 10px 30px rgba(54, 153, 148, 0.3);
        }
        .popup-btn:hover { 
            color: #fff; 
            filter: brightness(1.1);
            box-shadow: 0 15px 40px rgba(54, 153, 148, 0.5);
            transform: translateY(-2px);
        }

        .popup-status-title {
            position: absolute;
            top: clamp(30px, 5vw, 60px);
            left: clamp(30px, 5vw, 60px);

            color: #ffffff;
            font-size: clamp(12px, 2vw, 32px);
            font-weight: 300;
            letter-spacing: 0.45em;
            text-transform: uppercase;
            text-indent: 0.45em;

            opacity: 0.95;
            text-align: left;

            z-index: 10;
        }
        @media (max-width: 768px) {
            .popup-monolith { width: 92vw; height: 70vh; }
        }
    `;
    document.head.appendChild(style);

    const container = document.createElement('div');
    container.id = appId;
    container.innerHTML = `
        <div class="popup-monolith">
            <div class="popup-close-x" onclick="window.toggleSinglePopup(event)">×</div>
            <div class="popup-image-container">
                <img src="${imageUrl}" alt="${imageTitle}">
            </div>
            <div class="popup-content-overlay">
                <div class="popup-status-title">
                    *ON-GOING CONSTRUCTION
                </div>

                <div class="popup-btn" onclick="window.toggleSinglePopup(event)">
                    CLOSE PREVIEW
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(container);

    const fixFullscreenPopup = () => {
        const fsElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
        if (fsElement && fsElement !== container) {
            fsElement.appendChild(container);
        } else if (!fsElement && container.parentElement !== document.body) {
            document.body.appendChild(container);
        }
    };

    document.addEventListener('fullscreenchange', fixFullscreenPopup);
    document.addEventListener('webkitfullscreenchange', fixFullscreenPopup);

    window.toggleSinglePopup = (e) => {
        if (e) e.stopPropagation();
        fixFullscreenPopup();
        if (!container.classList.contains('active')) {
            container.style.display = 'flex';
            container.style.pointerEvents = 'auto'; 
            setTimeout(() => container.classList.add('active'), 10);
        } else {
            container.classList.remove('active');
            container.style.pointerEvents = 'none';
            setTimeout(() => { container.style.display = 'none'; }, 600);
        }
    };

    container.addEventListener('mousedown', (e) => {
        if (e.target === container) {
            window.toggleSinglePopup(e);
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && container.classList.contains('active')) window.toggleSinglePopup(e);
    });

    window.toggleSinglePopup();
})();