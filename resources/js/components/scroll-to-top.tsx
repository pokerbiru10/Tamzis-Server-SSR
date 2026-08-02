import { ChevronUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';

/**
 * ScrollToTop component
 * This component renders a blue square floating button in the bottom-right corner
 * that appears when the user scrolls down.
 */
export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top scroll behavior
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <button
            onClick={scrollToTop}
            className={`fixed right-6 bottom-20 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition-all duration-500 active:scale-95 md:right-8 md:bottom-8 ${
                isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none translate-y-10 opacity-0'
            } hover:bg-blue-700`}
            aria-label="Scroll to top"
        >
            <ChevronUp className="h-8 w-8" />
        </button>
    );
}
