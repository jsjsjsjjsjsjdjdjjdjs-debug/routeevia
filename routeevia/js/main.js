// Clean Mock Auth Logic
document.addEventListener('DOMContentLoaded', () => {
  const sendOtpBtn = document.getElementById('sendOtpBtn');
  const verifyOtpBtn = document.getElementById('verifyOtpBtn');
  const otpContainer = document.getElementById('otpContainer');
  const otpHelp = document.getElementById('otpHelp');

  if (sendOtpBtn) {
    sendOtpBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (otpContainer) otpContainer.style.display = 'block';
      if (sendOtpBtn) sendOtpBtn.style.display = 'none';
      if (verifyOtpBtn) verifyOtpBtn.style.display = 'block';
      if (otpHelp) otpHelp.innerText = 'Demo Active: Enter code 123456';
    });
  }

  if (verifyOtpBtn) {
    verifyOtpBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const code = document.getElementById('otpInput')?.value.trim();
      if (code === '123456' || (code && code.length === 6)) {
        localStorage.setItem('routevia_logged_in', 'true');
        window.location.href = 'index.html';
      } else {
        alert('Enter code 123456');
      }
    });
  }
});