// card-payment.js
// Funciones de formateo para el formulario de tarjeta de crédito
// Usado por marca-de-ropa.html — los inputs llaman a estas funciones via oninput/onblur

function ccFmtNum(input) {
  let digits = input.value.replace(/\D/g, '').slice(0, 16);
  input.value = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  const brand = document.getElementById('cc-brand');
  if (brand) {
    if (/^4/.test(digits))                                      brand.textContent = 'VISA';
    else if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) brand.textContent = 'MC';
    else if (/^3[47]/.test(digits))                             brand.textContent = 'AMEX';
    else                                                         brand.textContent = '';
  }
}

function ccFmtExp(input) {
  let digits = input.value.replace(/\D/g, '').slice(0, 4);
  input.value = digits.length >= 2 ? digits.slice(0, 2) + '/' + digits.slice(2) : digits;
  const errEl = document.getElementById('err-expiry');
  if (errEl) { errEl.textContent = ''; errEl.style.display = 'none'; }
  if (input.value.length === 5) ccValidExp(input);
}

function ccValidExp(input) {
  const v = input.value;
  if (v.length < 5) return;
  const mm = parseInt(v.slice(0, 2));
  const yy = parseInt(v.slice(3, 5));
  const errEl = document.getElementById('err-expiry');
  if (!errEl) return;
  if (isNaN(mm) || isNaN(yy) || mm < 1 || mm > 12) {
    errEl.textContent = typeof lg !== 'undefined' && lg !== 'es' ? 'Invalid date' : 'Fecha inválida';
    errEl.style.display = 'block'; return;
  }
  const expDate = new Date(2000 + yy, mm, 0);
  if (expDate < new Date()) {
    errEl.textContent = typeof lg !== 'undefined' && lg !== 'es' ? 'Card expired' : 'Tarjeta vencida';
    errEl.style.display = 'block';
  } else {
    errEl.textContent = ''; errEl.style.display = 'none';
  }
}

function ccFmtCvv(input) {
  input.value = input.value.replace(/\D/g, '').slice(0, 4);
}
