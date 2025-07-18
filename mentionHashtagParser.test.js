const parser = require('./mentionsHashtags.js');

describe('parseMentionsAndHashtags', () => {
    const input = 'Shoutout to @elonmusk and @NASA for the #LaunchDay success! #SpaceX #NASA';

    test('extracts both mentions and hashtags', () => {
        const result = parser.parseMentionsAndHashtags(input, {
            mentions: true,
            hashtags: true,
            unique: true
        });

        expect(result.mentions).toEqual(['@elonmusk', '@nasa']);
        expect(result.hashtags).toEqual(expect.arrayContaining(['#launchday', '#spacex', '#nasa']));
    });

    test('extracts only mentions', () => {
        const result = parser.parseMentionsAndHashtags(input, {
            mentions: true,
            hashtags: false
        });

        expect(result.mentions).toEqual(['@elonmusk', '@nasa']);
        expect(result.hashtags).toBeNull();
    });

    test('extracts only hashtags', () => {
        const result = parser.parseMentionsAndHashtags(input, {
            mentions: false,
            hashtags: true
        });

        expect(result.mentions).toBeNull();
        expect(result.hashtags).toEqual(expect.arrayContaining(['#launchday', '#spacex', '#nasa']));
    });

    test('returns nulls when both are disabled', () => {
        const result = parser.parseMentionsAndHashtags(input, {
            mentions: false,
            hashtags: false
        });

        expect(result.mentions).toBeNull();
        expect(result.hashtags).toBeNull();
    });
});

describe('parseMentions', () => {
    test('handles multiple mentions with different casing', () => {
        const text = '@ElonMusk @elonmusk @NASA';
        const result = parser.parseMentions(text);
        expect(result).toEqual(['@elonmusk', '@nasa']);
    });

    test('returns empty array if no mentions', () => {
        const text = 'No one mentioned here.';
        expect(parser.parseMentions(text)).toEqual([]);
    });

    test('respects unique=false option', () => {
        const text = '@OpenAI @OpenAI';
        const result = parser.parseMentions(text, { unique: false });
        expect(result).toEqual(['@openai', '@openai']);
    });
});

describe('parseHashtags', () => {
    test('handles multiple hashtags with duplicates', () => {
        const text = '#AI #ai #MachineLearning';
        const result = parser.parseHashtags(text);
        expect(result).toEqual(['#ai', '#machinelearning']);
    });

    test('returns empty array if no hashtags', () => {
        const text = 'Just text, no tags.';
        expect(parser.parseHashtags(text)).toEqual([]);
    });

    test('respects unique=false option', () => {
        const text = '#fun #fun';
        const result = parser.parseHashtags(text, { unique: false });
        expect(result).toEqual(['#fun', '#fun']);
    });
});

describe('convertStyledToNormal', () => {
    test('normalizes accented characters', () => {
        const text = 'Café @München #CrèmeBrûlée';
        const result = parser.convertStyledToNormal(text);
        expect(result).toContain('Cafe');
        expect(result).toContain('Munchen');
    });

    test('returns unchanged for plain ASCII', () => {
        const text = 'Hello World!';
        expect(parser.convertStyledToNormal(text)).toBe('Hello World!');
    });

    test('returns input as-is if null or empty', () => {
        expect(parser.convertStyledToNormal(null)).toBe(null);
        expect(parser.convertStyledToNormal(undefined)).toBe(undefined);
        expect(parser.convertStyledToNormal('')).toBe('');
    });
});
