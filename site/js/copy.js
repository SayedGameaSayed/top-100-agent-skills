/**
 * copy.js - Clipboard utility with accessible toast notification & fallback
 */

let toastTimeout = null;

/**
 * Shows an accessible toast notification for 2 seconds
 */
export function showToast(message = 'تم النسخ') {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

/**
 * Copies text to clipboard with modern API and execCommand fallback
 */
export async function copyToClipboard(text, successMessage = 'تم النسخ بنجاح!') {
  if (!text) return false;

  let successful = false;

  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      successful = true;
    } catch (err) {
      console.warn('navigator.clipboard failed, attempting execCommand fallback:', err);
    }
  }

  // Fallback for older browsers or non-secure contexts
  if (!successful) {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.top = '-9999px';
      textarea.style.left = '-9999px';
      textarea.setAttribute('readonly', '');
      document.body.appendChild(textarea);
      textarea.select();
      successful = document.execCommand('copy');
      document.body.removeChild(textarea);
    } catch (err) {
      console.error('execCommand fallback failed:', err);
      successful = false;
    }
  }

  if (successful) {
    showToast(successMessage);
  } else {
    showToast('تعذر النسخ تلقائيًا، يرجى النسخ يدويًا');
  }

  return successful;
}
