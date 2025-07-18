module.exports = {
    /**
     * Parses a description string to extract unique mentions and hashtags.
     *
     * @param {string} description - The text content to be parsed.
     * @param {Object} options - Configuration options.
     * @param {boolean} [options.mentions=true] - Whether to parse mentions (e.g., "@user").
     * @param {boolean} [options.hashtags=true] - Whether to parse hashtags (e.g., "#topic").
     * @returns {{ e: null, mentions: string[] | null, hashtags: string[] | null }} An object containing arrays of unique mentions and/or hashtags found in the description.
     * @throws Will throw an error if parsing fails.
     */
    parseMentionsAndHashtags: (description, {
        mentions = true,
        hashtags = true,
        unique = true
    }) => {
        const result = {e: null, mentions: null, hashtags: null};
        try {
            let matched_mentions = [];
            let matched_hashtags = [];
            if (mentions) {
                matched_mentions = module.exports.parseMentions(description, {unique});
                result.mentions = matched_mentions

            }
            if (hashtags) {
                matched_hashtags = module.exports.parseHashtags(description, {unique});
                result.hashtags = matched_hashtags;
            }
            return result;
        } catch (e) {
            throw e
        }
    },
    /**
     * Extracts unique mentions from a description string.
     *
     * @param {string} description - The text content to search for mentions.
     * @returns {string[]} An array of unique, lowercase mentions found in the description.
     * @throws Will throw an error if processing fails.
     */
    parseMentions: (description, {unique = true}) => {
        let mentions = null;
        try {
            description = module.exports.convertStyledToNormal(description);
            let mentions_regex = /@[a-zA-Z0-9_\-.]+/giu;
            mentions = description.match(mentions_regex);
            if (mentions && mentions.length > 0) {
                mentions = Array.from(new Set(mentions));
                mentions = mentions.map(mention => mention.toLowerCase());
                if (unique) {
                    mentions = Array.from(new Set(mentions));
                }
            }
        } catch (e) {
            throw e
        }
        return mentions;
    },
    /**
     * Extracts unique hashtags from a description string.
     *
     * @param {string} description - The text content to search for hashtags.
     * @returns {string[]} An array of unique, lowercase hashtags found in the description.
     * @throws Will throw an error if processing fails.
     */
    parseHashtags: (description, {unique = true}) => {
        let hashtags = null;
        try {
            description = module.exports.convertStyledToNormal(description);
            let hashtags_regex = /#[a-zA-Z0-9_\-.]+/giu;
            hashtags = description.match(hashtags_regex);

            if (hashtags && hashtags.length > 0) {
                hashtags = Array.from(new Set(hashtags));
                hashtags = hashtags.map(hashtag => hashtag.toLowerCase());
                if (unique) {
                    hashtags = Array.from(new Set(hashtags));
                }
            }
        } catch (e) {
            throw e;
        }
        return hashtags;
    },
    /**
     * Converts styled (e.g., accented or special Unicode) characters into their normal forms.
     *
     * @param {string} description - The input text to normalize.
     * @returns {string} The normalized text.
     */
    convertStyledToNormal: (description) => {
        if (!description) {
            return description
        }
        return description.normalize("NFKD")
    }
}