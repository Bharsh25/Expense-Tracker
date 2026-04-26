import React, { useEffect } from 'react';
import { FiAlertTriangle, FiX, FiTrash2 } from 'react-icons/fi';

const ConfirmModal = ({ isOpen, onConfirm, onCancel, title = 'Confirm Action', message = 'Are you sure?' }) => {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') onCancel(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={onCancel}
    >
      {/* Modal card — stop click propagation so clicking inside doesn't close */}
      <div
        className="bg-[#161616] border border-[#2a2a2a] rounded-2xl w-full max-w-sm shadow-2xl fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#ef4444]/10 flex items-center justify-center">
              <FiAlertTriangle className="text-[#ef4444] text-lg" />
            </div>
            <h2 className="text-lg font-bold font-heading text-[#f0f0f0]">{title}</h2>
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 text-[#888888] hover:text-[#f0f0f0] hover:bg-[#2a2a2a] rounded-lg transition-colors"
            aria-label="Close"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="text-[#888888] text-sm leading-relaxed">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-[#2a2a2a] text-[#888888] hover:text-[#f0f0f0] hover:border-[#3a3a3a] hover:bg-[#2a2a2a] transition-all text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-[#ef4444]/10 border border-[#ef4444]/30 text-[#ef4444] hover:bg-[#ef4444] hover:text-white transition-all text-sm font-medium flex items-center justify-center gap-2"
          >
            <FiTrash2 />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
