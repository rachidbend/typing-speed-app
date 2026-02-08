import data from '../../data.json';

/**
 * Get a random passage based on difficulty.
 * @param {string} difficulty - 'easy', 'medium', 'hard'
 * @returns {string} The text content of the passage.
 */
export const getPassage = (difficulty = 'medium') => {
    // Normalize difficulty to lowercase just in case
    const level = difficulty.toLowerCase();

    // Check if difficulty exists in data
    if (!data[level] || !Array.isArray(data[level])) {
        console.warn(`Difficulty level '${difficulty}' not found, defaulting to 'medium'`);
        return data.medium[0].text;
    }

    const passages = data[level];
    const randomIndex = Math.floor(Math.random() * passages.length);
    return passages[randomIndex].text;
};
