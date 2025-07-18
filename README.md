# 📦 mentions-hashtags

A tiny, zero-dependency utility to extract social media-style **mentions** (`@username`) and **hashtags** (`#topic`) from any text. Includes multilingual Unicode normalization and optional deduplication.

---

### ✨ Features

- ✅ Extract `@mentions` and `#hashtags` from text
- 🌍 Unicode normalization (e.g., accented characters)
- 🔁 Configurable deduplication with `unique` flag
- ⚡️ Lightweight, blazing fast, zero dependencies
- 🎯 Ideal for Instagram, YouTube, TikTok, and Twitter/X content: fashion, beauty, luxury, and sports

---

### 📥 Installation

```bash
npm install mentions-hashtags
```

---

### 🚀 Quick Example

```js
const { parseMentionsAndHashtags } = require('mentions-hashtags');

const input = "Huge thanks to @Gucci and @vogueparis for the stunning event! #FashionWeek #LuxuryStyle #VogueMoment";

const result = parseMentionsAndHashtags(input, {
  mentions: true,
  hashtags: true,
  unique: true
});

console.log(result);
/*
{
  mentions: ['@gucci', '@vogueparis'],
  hashtags: ['#fashionweek', '#luxurystyle', '#voguemoment']
}
*/
```

---

### 🔍 API Reference

#### `parseMentionsAndHashtags(description, options)`

| Param             | Type      | Default | Description                    |
|------------------|-----------|---------|--------------------------------|
| `description`     | `string`  | —       | The input string to parse      |
| `options.mentions` | `boolean` | `true`  | Whether to extract `@mentions` |
| `options.hashtags` | `boolean` | `true`  | Whether to extract `#hashtags` |
| `options.unique`   | `boolean` | `true`  | Whether to deduplicate results |

**Returns:**

```js
{
  mentions: string[] | null,
  hashtags: string[] | null
}
```

---

#### `parseMentions(description, { unique })`

```js
parseMentions("@Dior @dior @FentyBeauty");
// → ['@dior', '@fentybeauty']
```

---

#### `parseHashtags(description, { unique })`

```js
parseHashtags("#Skincare #BeautyTips #beautytips");
// → ['#skincare', '#beautytips']
```

---

#### `convertStyledToNormal(description)`

```js
convertStyledToNormal("Crème de la crème by @Chanel #BeautéLuxe");
// → "Creme de la creme by @Chanel #BeauteLuxe"
```

---

### 📱 Real-World Social Media Examples

#### ✅ Instagram Fashion Post

```js
const input = "Styled by @balenciaga and shot by @highfashionlens 📸 #RunwayReady #ParisFashion #BalenciagaVibes";
parseMentionsAndHashtags(input);
/*
mentions: ['@balenciaga', '@highfashionlens']
hashtags: ['#runwayready', '#parisfashion', '#balenciagavibes']
*/
```

#### ✅ YouTube Beauty Review

```js
const input = "Loving the new @FentyBeauty gloss 💄✨ #MakeupReview #BeautyCommunity";
parseMentionsAndHashtags(input);
/*
mentions: ['@fentybeauty']
hashtags: ['#makeupreview', '#beautycommunity']
*/
```

#### ✅ TikTok Football Highlight

```js
const input = "⚽ What a goal by @Cristiano! #UCLFinal #FootballLegend #GOAT";
parseMentionsAndHashtags(input);
/*
mentions: ['@cristiano']
hashtags: ['#uclfinal', '#footballlegend', '#goat']
*/
```

---

### 🧪 Running Tests

```bash
npm install
npm test
```

---

### 📄 License

MIT License © [rocketnozzle.io]
