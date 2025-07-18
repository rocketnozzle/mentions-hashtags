module.exports = {
    /**
     * Parses a description string to extract unique mentions and hashtags.
     *
     * @param {string} description - The text content to parse.
     * @param {Object} options - Configuration options.
     * @param {boolean} [options.mentions=true] - Extract mentions if true.
     * @param {boolean} [options.hashtags=true] - Extract hashtags if true.
     * @param {boolean} [options.unique=true] - Deduplicate results if true.
     * @returns {{ mentions: string[] | null, hashtags: string[] | null }} Parsed mentions and hashtags.
     */
    parseMentionsAndHashtags: (description, {
        mentions = true,
        hashtags = true,
        unique = true
    } = {}) => {
        const result = { mentions: null, hashtags: null };

        if (typeof description !== 'string') {
            return result;
        }

        if (mentions) {
            result.mentions = module.exports.parseMentions(description, { unique });
        }

        if (hashtags) {
            result.hashtags = module.exports.parseHashtags(description, { unique });
        }

        return result;
    },

    /**
     * Extracts unique mentions from a description string.
     *
     * @param {string} description - The input text.
     * @param {Object} options - Options object.
     * @param {boolean} [options.unique=true] - Deduplicate mentions.
     * @returns {string[]} An array of lowercase mentions.
     */
    parseMentions: (description, { unique = true } = {}) => {
        if (typeof description !== 'string') return [];

        description = module.exports.convertStyledToNormal(description);
        const regex = /@[a-zA-Z0-9_\-.]+/giu;
        let mentions = description.match(regex) || [];
        mentions = mentions.map(m => m.toLowerCase());
        return unique ? Array.from(new Set(mentions)) : mentions;
    },

    /**
     * Extracts unique hashtags from a description string.
     *
     * @param {string} description - The input text.
     * @param {Object} options - Options object.
     * @param {boolean} [options.unique=true] - Deduplicate hashtags.
     * @returns {string[]} An array of lowercase hashtags.
     */
    parseHashtags: (description, { unique = true } = {}) => {
        if (typeof description !== 'string') return [];

        description = module.exports.convertStyledToNormal(description);
        const regex = /#[a-zA-Z0-9_\-.]+/giu;
        let hashtags = description.match(regex) || [];
        hashtags = hashtags.map(h => h.toLowerCase());
        return unique ? Array.from(new Set(hashtags)) : hashtags;
    },

    /**
     * Normalizes styled Unicode text into standard ASCII form.
     *
     * @param {string} description - The text to normalize.
     * @returns {string} The normalized string.
     */
    convertStyledToNormal: (description) => {
        return typeof description === 'string' ? description.normalize("NFKD") : '';
    }
};
