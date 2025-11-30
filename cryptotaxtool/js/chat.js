// Simple chatbot for 24/7 support
const chatResponses = {
    'hello': 'Hello! How can I help you today? I can answer questions about crypto tax calculations, wallets, exchanges, and general crypto education.',
    'hi': 'Hi there! Welcome to CryptoTax Tools. What would you like to know?',
    'tax': 'For tax calculations, use our calculator pages. Short-term gains are taxed as income (10%-37%). Long-term gains at 0%, 15%, or 20%. This is general info, not advice.',
    'wallet': 'Wallets store your private keys. Hardware wallets (Ledger, Trezor) are most secure for large amounts. Software wallets (MetaMask, Exodus) are convenient for small amounts.',
    'exchange': 'Centralized exchanges (Coinbase, Binance) are user-friendly but hold your funds. Decentralized exchanges (Uniswap) let you control your funds but are more complex.',
    'risk': 'Crypto is highly volatile and risky. Never invest more than you can afford to lose. Past performance does not guarantee future results.',
    'profit': 'Profit potential exists but is not guaranteed. Long-term holding has historically been more successful than day trading for most investors.',
    'calculate': 'Go to our Tax Calculator page to input your buy/sell amounts and holding period. The calculator shows estimated taxes and net profit.',
    'contact': 'For support, email us at: support@cryptotaxtool.io. We typically respond within 24 hours.',
    'human': 'For complex questions, please email support@cryptotaxtool.io and our team will assist you within 24 hours.',
    'default': 'I can help with crypto tax calculations, wallet information, exchange details, and crypto education. For specific tax advice, please consult a CPA. To speak to a human, email support@cryptotaxtool.io'
};

// Chat widget UI
document.addEventListener('DOMContentLoaded', function() {
    const chatWidget = document.createElement('div');
    chatWidget.className = 'chat-widget';
    chatWidget.innerHTML = `
        <div class="chat-window" id="chatWindow">
            <div class="chat-header">
                💬 24/7 Educational Support
                <button onclick="toggleChat()" style="float: right; background: none; border: none; color: white; cursor: pointer;">✕</button>
            </div>
            <div class="chat-body" id="chatBody">
                <div style="margin-bottom: 10px; padding: 10px; background: #e3f2fd; border-radius: 5px;">
                    Hello! I'm here to help with crypto education questions. For tax advice, please consult a CPA. Type 'human' to email our support team.
                </div>
            </div>
            <div class="chat-input">
                <input type="text" id="chatInput" placeholder="Ask about crypto tax, wallets, exchanges..." onkeypress="handleChatKeyPress(event)">
                <button onclick="sendMessage()">Send</button>
            </div>
        </div>
        <button class="chat-button" onclick="toggleChat()">💬</button>
    `;
    document.body.appendChild(chatWidget);

    // Show welcome message after 3 seconds
    setTimeout(() => {
        if (document.getElementById('chatWindow').style.display !== 'flex') {
            document.querySelector('.chat-button').style.animation = 'pulse 2s infinite';
        }
    }, 3000);
});

function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim().toLowerCase();
    
    if (!message) return;

    const chatBody = document.getElementById('chatBody');
    
    // Add user message
    chatBody.innerHTML += `
        <div style="margin-bottom: 10px; text-align: right;">
            <span style="display: inline-block; padding: 10px; background: var(--primary); color: white; border-radius: 5px;">
                ${input.value}
            </span>
        </div>
    `;

    // Get bot response
    let response = chatResponses.default;
    for (let key in chatResponses) {
        if (message.includes(key)) {
            response = chatResponses[key];
            break;
        }
    }

    // Add bot response
    setTimeout(() => {
        chatBody.innerHTML += `
            <div style="margin-bottom: 10px;">
                <span style="display: inline-block; padding: 10px; background: #f1f3f4; border-radius: 5px;">
                    ${response}
                </span>
            </div>
        `;
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 500);

    input.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);