document.addEventListener('DOMContentLoaded', () => {
    // --- START: CONFIGURATION ---
    // IMPORTANT: Only the WORKER_URL needs to be changed by you!
    const WORKER_URL = "https://vvip-project.pages.dev/"; // ⚠️ YOUR WORKER URL HERE
    const GIST_TEMPLATE_URL = "https://gist.githubusercontent.com/thihaaungym/8d548592e8c2c8f21eef48588d03b6fc/raw/ff230f3e55c39168504bbd74becebe9ecf5f5f80/clash-thailand.yaml"; // ✅ Your Gist URL is correctly added.
    // --- END: CONFIGURATION ---

    const generateBtn = document.getElementById('generateBtn');
    const resultDiv = document.getElementById('result');
    const subLinkTextarea = document.getElementById('subLink');

    generateBtn.addEventListener('click', () => {
        const server = document.getElementById('server').value.trim();
        const uuid = document.getElementById('uuid').value.trim();
        const pk = document.getElementById('pk').value.trim();
        const sid = document.getElementById('sid').value.trim();

        if (!server || !uuid || !pk || !sid) {
            alert('Please fill in all fields.');
            return;
        }

        const encodedGistUrl = encodeURIComponent(GIST_TEMPLATE_URL);
        
        // We manually encode the URL to avoid '+' for spaces which can sometimes cause issues.
        const subscriptionUrl = `${WORKER_URL}?target=clash&url=${encodedGistUrl}&server=${encodeURIComponent(server)}&uuid=${encodeURIComponent(uuid)}&pk=${encodeURIComponent(pk)}&sid=${encodeURIComponent(sid)}`;

        subLinkTextarea.value = subscriptionUrl;
        resultDiv.classList.remove('hidden');

        // Generate QR Code
        new QRious({
            element: document.getElementById('qrCode'),
            value: subscriptionUrl,
            size: 200,
            background: '#ffffff',
            foreground: '#333'
        });
    });

    // Copy to clipboard functionality
    subLinkTextarea.addEventListener('click', () => {
        subLinkTextarea.select();
        document.execCommand('copy');
        alert('Subscription link copied to clipboard!');
    });
});
