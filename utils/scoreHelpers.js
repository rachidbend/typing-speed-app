/**
 * Calculates Words Per Minute (WPM)
 * Standard definition: (All typed entries / 5) / Time taken in minutes
 * Note: Typos still count as "entries" for gross WPM usually, but usually for net WPM we count correct chars.
 * The requirements say: "Correct mistakes with backspace (original errors still count against accuracy)"
 * But for WPM, it usually implies Net WPM.
 * Let's calculate WPM based on (Correct Characters space incl / 5) / Time
 * 
 * @param {number} correctChars - Number of correct characters typed
 * @param {number} timeElapsedSeconds - Time elapsed in seconds
 * @returns {number} WPM
 */
export const calculateWPM = (correctChars, timeElapsedSeconds) => {
    if (timeElapsedSeconds === 0) return 0;
    const words = correctChars / 5;
    const minutes = timeElapsedSeconds / 60;
    return Math.round(words / minutes);
};

/**
 * Calculates Accuracy Percentage
 * @param {number} correctChars - Number of correct keystrokes/characters final
 * @param {number} totalTyped - Total keystrokes (including backspaced errors? or just errors present?)
 * Requirement: "original errors still count against accuracy"
 * This implies totalTyped should verify every key press that was intended as a char.
 * 
 * @returns {number} Accuracy percentage (0-100)
 */
export const calculateAccuracy = (correctChars, totalTyped) => {
    if (totalTyped === 0) return 100;
    const accuracy = (correctChars / totalTyped) * 100;
    return Math.round(accuracy); // Keep it integer for cleaner UI
};
