# Migration Guide

This directory contains tools for migrating large batches of historical articles from CSV to Webflow.

## 📁 Directory Structure

```
migrate/
├── README.md           # This file
├── export.csv          # Your source CSV file (place here, git-ignored)
└── export.json         # Generated JSON file (git-ignored)
```

## 🚀 Quick Start

### Step 1: Prepare Your CSV

1. Place your CSV file in this directory as `export.csv`
2. Ensure your CSV has these columns:
   - `Title` - Article title
   - `Slug` - URL slug
   - `PostID` - Unique identifier
   - `Category` - Article category
   - `Content` - Article HTML content
   - `Desc` or `Excerpt` - Article description
   - `Published` - Publication date
   - `Last Updated` - Last update date
   - `Tags` - Comma-separated tags
   - `Featured` - Boolean (true/false)
   - `Recurring` - Boolean (true/false)
   - `Category Color` - Hex color code
   - `Featured Image (Big)` - Large image URL
   - `Featured Image (Small)` - Small image URL

### Step 2: Convert CSV to JSON

```bash
npm run convert
```

This will:
- Read `migrate/export.csv`
- Convert it to the JSON format required by Webflow
- Save the result to `migrate/export.json`
- Display a summary of the conversion

**Custom paths:**
```bash
node lib/converter.js path/to/input.csv path/to/output.json
```

### Step 3: Run Migration

```bash
npm run migrate
```

This will:
- Load all articles from `migrate/export.json`
- Process each article one by one
- Display real-time progress for each article:
  - ✓ CREATED - New article created
  - ↻ UPDATED - Existing article updated
  - ○ SKIPPED - No changes needed
  - ✗ ERROR - Failed to process
- Add a delay between requests to respect API rate limits (default: 500ms)
- Display batch summaries every 50 articles

**Custom options:**
```bash
# Faster processing (250ms delay between articles)
npm run migrate -- --delay=250

# Slower processing (1000ms delay)
npm run migrate -- --delay=1000

# Change batch summary frequency (every 100 articles)
npm run migrate -- --batch-size=100
```

## 📊 Example Output

### Conversion Output
```
Reading CSV file: migrate/export.csv
Found 9000 data rows in CSV
Converted 100/9000 articles...
Converted 200/9000 articles...
...
✓ Conversion complete: 8950 articles converted, 50 skipped

Conversion Summary:
  Total rows: 9000
  Converted: 8950
  Skipped: 50
  Errors: 0
```

### Migration Output
```
============================================================
Starting migration (migrate/export.json)...
Delay between articles: 500ms
============================================================

📦 Loaded 8950 articles to migrate

✓ [1/8950] CREATED: "Article Title" (ID: 12345)
✓ [2/8950] CREATED: "Another Article" (ID: 12346)
○ [3/8950] SKIPPED: "Existing Article" (ID: 12347) - no changes
↻ [4/8950] UPDATED: "Updated Article" (ID: 12348)
...

📊 Progress: 50/8950 | Rate: 1.89 articles/sec | Elapsed: 26.5s

...

============================================================
MIGRATION COMPLETE
============================================================
Total processed: 8950
Created: 7800
Updated: 950
Skipped: 150
Errors: 50
Total time: 4736.2s
Average rate: 1.89 articles/sec
============================================================
```

## 🔧 Category Mapping

The converter automatically maps CSV category values to standardized names:

```javascript
"alternate-fuels" → "Alternate Fuels"
"bunker-news" → "Bunker Market Updates"
"regulations" → "Regulations"
```

To add more mappings, edit `lib/converter.js` and update the `CATEGORY_MAPPING` object.

## 🎨 Category Colors

Default colors are assigned to categories:

```javascript
"Alternate Fuels" → "#F39C12"
"Bunker Market Updates" → "#4A90E2"
"Regulations" → "#E74C3C"
```

If your CSV includes a `Category Color` column, those colors will be used instead.

## ⚠️ Important Notes

### Rate Limiting
- Default delay is 500ms between articles (~2 articles/sec)
- Adjust with `--delay=X` if you encounter rate limit errors
- Webflow has API rate limits - respect them!

### Error Handling
- Individual article failures won't stop the migration
- Failed articles are logged with reasons
- You can re-run the migration to retry failed articles
- Already-migrated articles will be skipped if unchanged

### Slug Conflicts
- If a slug already exists, the system automatically appends a hash
- Example: `my-article` → `my-article-abc123`

### Data Validation
- Articles missing required fields (title, slug, postId, category) are skipped
- Invalid dates are handled gracefully
- Empty tags/images are allowed

## 🔍 Troubleshooting

### "export.json must contain an array of articles"
- Run the converter first: `npm run convert`
- Ensure `migrate/export.json` exists

### "CSV file must contain header and at least one data row"
- Check that `migrate/export.csv` has a header row
- Ensure the file isn't empty

### Rate limit errors
- Increase the delay: `npm run migrate -- --delay=1000`
- Consider running during off-peak hours

### High error count
- Check the error details at the end of the migration
- Common issues:
  - Invalid dates
  - Missing required fields
  - Invalid HTML in content
  - Network timeouts

## 📝 Best Practices

1. **Test first**: Run on a small subset (5-10 articles) before full migration
2. **Backup**: Ensure you have backups of your Webflow data
3. **Monitor**: Watch the CLI output for errors
4. **Iterate**: Re-run to process any failed articles
5. **Verify**: Check a sample of migrated articles in Webflow

## 🔄 Re-running Migrations

Safe to re-run! The migration script:
- Checks if articles already exist (by postId)
- Only updates if content has changed
- Skips unchanged articles
- Creates only new articles

## 📧 Need Help?

If you encounter issues:
1. Check the error messages in the CLI output
2. Verify your CSV format matches the requirements
3. Review the conversion summary for skipped rows
4. Check the migration error details
