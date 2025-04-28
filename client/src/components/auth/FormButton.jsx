import React from 'react';

export function FormButton({ children, isSubmitting, onClick, fullWidth = true }) {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={isSubmitting}
      className={`${
        fullWidth ? 'w-full' : ''
      } bg-[#5a6440] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5a6440] ${
        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
      }`}
    >
      {isSubmitting ? (
        <span className="inline-flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          處理中...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
