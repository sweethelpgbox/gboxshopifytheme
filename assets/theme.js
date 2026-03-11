/* ===================================================
   GBOX THEME — main JS
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Marquee duplicate ---- */
  const track = document.querySelector('.marquee-track');
  if (track) {
    track.innerHTML += track.innerHTML;
  }

  /* ---- TikTok modal player ---- */
  const tiktokCards = document.querySelectorAll('.tiktok-card[data-video-url]');
  tiktokCards.forEach(card => {
    card.addEventListener('click', () => {
      const url = card.dataset.videoUrl;
      if (!url) return;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });

  /* ---- Sticky header shadow ---- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 8) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
      } else {
        header.style.boxShadow = '';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Newsletter form ---- */
  const form = document.querySelector('.newsletter-form');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      const btn   = form.querySelector('button[type="submit"]');
      if (!input?.value) return;
      btn.textContent = 'Subscribed!';
      btn.disabled = true;
      btn.style.opacity = '0.7';
      input.value = '';
    });
  }

  /* ---- Product quick-add ---- */
  document.querySelectorAll('.product-card-quick-add').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const card = btn.closest('.product-card');
      const variantId = card?.dataset.variantId;
      if (!variantId) return;

      fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [{ id: variantId, quantity: 1 }] })
      })
      .then(r => r.json())
      .then(() => {
        btn.textContent = 'Added!';
        setTimeout(() => { btn.textContent = 'Quick Add'; }, 2000);
        // Update cart count
        return fetch('/cart.js');
      })
      .then(r => r.json())
      .then(cart => {
        const countEl = document.querySelector('.cart-count');
        if (countEl) countEl.textContent = cart.item_count;
      })
      .catch(console.error);
    });
  });

});
