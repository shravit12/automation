const Parser = require("rss-parser");
const fs = require("fs");

const parser = new Parser();

// RSS Feed URL
const RSS_URL = "https://techcrunch.com/feed/"; // change as needed
const OUTPUT_FILE = "news.json";

async function fetchAndSaveNews() {
  try {
    const feed = await parser.parseURL(RSS_URL);
    
    const news = feed.items.slice(0, 6).map((item) => ({
      title: item.title,
      link: item.link,
      slug: item.link.split("/").pop(),
    }));

    // Save to JSON
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(news, null, 2));
    console.log("✅ News saved to", OUTPUT_FILE);
  } catch (err) {
    console.error("❌ Error fetching news:", err);
  }
}

fetchAndSaveNews();