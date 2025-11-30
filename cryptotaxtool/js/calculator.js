// Quick calculator on homepage
function quickCalc() {
    const buy = parseFloat(document.getElementById('homeBuy').value);
    const sell = parseFloat(document.getElementById('homeSell').value);
    const period = document.getElementById('homePeriod').value;

    if (!buy || !sell) {
        alert('Please enter buy and sell amounts');
        return;
    }

    const gain = sell - buy;
    const taxRate = period === 'short' ? 22 : 15; // Simplified average rates
    const tax = gain * (taxRate / 100);
    const net = gain - tax;

    document.getElementById('homeResult').innerHTML = `
        <strong>Profit:</strong> $${gain.toFixed(2)} | 
        <strong>Est. Tax (${taxRate}%):</strong> $${tax.toFixed(2)} | 
        <strong>Net:</strong> $${net.toFixed(2)}
    `;
    document.getElementById('homeResult').style.display = 'block';
}

// Full calculator
function calculateFullTax() {
    const buy = parseFloat(document.getElementById('buyAmount').value);
    const sell = parseFloat(document.getElementById('sellAmount').value);
    const period = document.getElementById('holdingPeriod').value;

    if (!buy || !sell) {
        alert('Please enter valid buy and sell amounts');
        return;
    }

    const gain = sell - buy;
    let taxRate = 0;
    let displayRate = 0;

    if (period === 'short') {
        taxRate = parseFloat(document.getElementById('taxBracket').value);
        displayRate = taxRate * 100;
    } else {
        // Simplified long-term capital gains brackets for 2025
        // Actual rate depends on total taxable income
        if (gain <= 47025) {
            taxRate = 0;
            displayRate = 0;
        } else if (gain <= 518900) {
            taxRate = 0.15;
            displayRate = 15;
        } else {
            taxRate = 0.20;
            displayRate = 20;
        }
    }

    const taxDue = gain * taxRate;
    const netProfit = gain - taxDue;

    // Update results
    document.getElementById('gain').textContent = `$${gain.toFixed(2)}`;
    document.getElementById('rate').textContent = `${displayRate}%`;
    document.getElementById('tax').textContent = `$${taxDue.toFixed(2)}`;
    document.getElementById('net').textContent = `$${netProfit.toFixed(2)}`;

    document.getElementById('results').style.display = 'block';
    document.getElementById('placeholder').style.display = 'none';
}

function clearForm() {
    document.getElementById('buyAmount').value = '';
    document.getElementById('sellAmount').value = '';
    document.getElementById('results').style.display = 'none';
    document.getElementById('placeholder').style.display = 'block';
}

function updateTaxBracket() {
    const period = document.getElementById('holdingPeriod').value;
    const bracketGroup = document.getElementById('bracketGroup');
    
    if (period === 'long') {
        bracketGroup.style.display = 'none';
    } else {
        bracketGroup.style.display = 'block';
    }
}