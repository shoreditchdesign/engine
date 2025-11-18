import { promises as fs } from "fs";
import { logWithTimestamp } from "./utils.js";

/**
 * No category mapping - use database values as source of truth
 * Categories from CSV: Alternative Fuels, Availability, Bunkering Info, Fuel Quality, General, Regulations
 * These will be created in Webflow exactly as they appear in the database
 * Client can add new display labels in Webflow CMS as a separate field later
 */
const CATEGORY_MAPPING = {};

/**
 * Default category colors for each database category
 */
const CATEGORY_COLORS = {
  "Alternative Fuels": "#F39C12",
  Availability: "#4A90E2",
  "Bunkering Info": "#9B59B6",
  "Fuel Quality": "#E74C3C",
  General: "#95A5A6",
  Regulations: "#2ECC71",
};

/**
 * Parse CSV line handling quoted fields correctly
 * @param {string} line - CSV line to parse
 * @returns {Array<string>} - Parsed fields
 */
function parseCSVLine(line) {
  const fields = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"' && !inQuotes) {
      inQuotes = true;
    } else if (char === '"' && inQuotes && nextChar === '"') {
      field += '"';
      i++; // Skip next quote
    } else if (char === '"' && inQuotes) {
      inQuotes = false;
    } else if (char === "," && !inQuotes) {
      fields.push(field);
      field = "";
    } else {
      field += char;
    }
  }

  fields.push(field); // Add last field
  return fields;
}

/**
 * Convert CSV row to JSON article format
 * @param {object} headers - CSV headers mapping
 * @param {Array<string>} row - CSV row data
 * @returns {object|null} - Transformed article object or null if invalid
 */
function convertRowToArticle(headers, row) {
  try {
    // Extract values using header indices
    // CSV headers now match target JSON field names (no mapping needed)
    const title = row[headers.title] || "";
    const slug = row[headers.slug] || "";
    const postId = row[headers.postId] || "";
    const category = row[headers.cat] || "";
    const content = row[headers.content] || "";
    const desc = row[headers.desc] || ""; // Optional field
    const published = row[headers.timestamp] || "";
    const updatedDate = row[headers.updatedDate] || "";
    const tags = row[headers.tags] || ""; // Optional field
    const isFeatured = row[headers.isFeatured] || "0";
    const isRecurring = row[headers.isRecurring] || "0";
    const categoryColor =
      row[headers.color] || CATEGORY_COLORS[category] || "#4A90E2";
    const featuredImageBig = row[headers.featuredImageBig] || "";
    const featuredImageSmall = row[headers.featuredImageSmall] || "";

    // Skip invalid rows
    if (!title || !slug || !postId || !category) {
      return null;
    }

    // Parse dates (format: DD/MM/YYYY HH:MM)
    const parseDate = (dateStr) => {
      if (!dateStr) return new Date().toISOString();

      // Split date and time: "04/02/2020 09:21"
      const parts = dateStr.trim().split(" ");
      if (parts.length < 1) return new Date().toISOString();

      const dateParts = parts[0].split("/"); // [04, 02, 2020]
      const timeParts = parts[1] ? parts[1].split(":") : ["00", "00"];

      if (dateParts.length !== 3) return new Date().toISOString();

      // Convert DD/MM/YYYY to ISO format
      const day = dateParts[0];
      const month = dateParts[1];
      const year = dateParts[2];
      const hour = timeParts[0] || "00";
      const minute = timeParts[1] || "00";

      // Create ISO string: YYYY-MM-DDTHH:MM:00.000Z
      return new Date(
        `${year}-${month}-${day}T${hour}:${minute}:00.000Z`,
      ).toISOString();
    };

    const timestamp = parseDate(published);
    const updated = parseDate(updatedDate);

    // Parse tags (comma-separated)
    const tagsArray = tags
      ? tags
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t)
      : [];

    // Use category name as-is from database (source of truth)
    const normalizedCategory = category.trim();

    // Parse boolean values (your CSV uses 0/1)
    const featured =
      isFeatured === "1" || isFeatured === 1 || isFeatured === true;
    const recurring =
      isRecurring === "1" || isRecurring === 1 || isRecurring === true;

    return {
      postId: String(postId),
      title: title.trim(),
      slug: slug.trim(),
      content: content || "",
      desc: desc.trim(),
      timestamp,
      updatedDate: updated,
      cat: normalizedCategory,
      tags: tagsArray,
      color: categoryColor,
      isFeatured: featured,
      isRecurring: recurring,
      featuredImageBig: featuredImageBig || "",
      featuredImageSmall: featuredImageSmall || "",
    };
  } catch (error) {
    logWithTimestamp(
      `Error converting row to article: ${error.message}`,
      "error",
    );
    return null;
  }
}

/**
 * Convert CSV file to JSON format compatible with test.json structure
 * @param {string} csvPath - Path to input CSV file
 * @param {string} jsonPath - Path to output JSON file
 * @returns {Promise<object>} - Conversion summary
 */
export async function convertCSVToJSON(csvPath, jsonPath) {
  const summary = {
    totalRows: 0,
    converted: 0,
    skipped: 0,
    errors: [],
  };

  try {
    logWithTimestamp(`Reading CSV file: ${csvPath}`);
    let csvContent = await fs.readFile(csvPath, "utf-8");

    // Remove BOM (Byte Order Mark) if present
    if (csvContent.charCodeAt(0) === 0xfeff) {
      csvContent = csvContent.slice(1);
    }

    // Split into lines and clean up
    const lines = csvContent
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line);

    if (lines.length < 2) {
      throw new Error("CSV file must contain header and at least one data row");
    }

    // Parse header
    const headerLine = lines[0];
    const headerFields = parseCSVLine(headerLine);

    // Create header index mapping
    const headers = {};
    headerFields.forEach((field, index) => {
      headers[field] = index;
    });

    logWithTimestamp(`Found ${lines.length - 1} data rows in CSV`);

    // Convert each row
    const articles = [];
    for (let i = 1; i < lines.length; i++) {
      summary.totalRows++;

      try {
        const rowFields = parseCSVLine(lines[i]);
        const article = convertRowToArticle(headers, rowFields);

        if (article) {
          articles.push(article);
          summary.converted++;

          // Log progress every 100 articles
          if (summary.converted % 100 === 0) {
            logWithTimestamp(
              `Converted ${summary.converted}/${summary.totalRows} articles...`,
            );
          }
        } else {
          summary.skipped++;
        }
      } catch (error) {
        summary.skipped++;
        summary.errors.push({
          row: i + 1,
          error: error.message,
        });
      }
    }

    // Write JSON file
    logWithTimestamp(`Writing JSON to: ${jsonPath}`);
    await fs.writeFile(jsonPath, JSON.stringify(articles, null, 2), "utf-8");

    logWithTimestamp(
      `✓ Conversion complete: ${summary.converted} articles converted, ${summary.skipped} skipped`,
    );

    if (summary.errors.length > 0) {
      logWithTimestamp(
        `⚠ ${summary.errors.length} errors encountered:`,
        "warn",
      );
      summary.errors.slice(0, 10).forEach((err) => {
        console.log(`  Row ${err.row}: ${err.error}`);
      });
      if (summary.errors.length > 10) {
        console.log(`  ... and ${summary.errors.length - 10} more errors`);
      }
    }

    return summary;
  } catch (error) {
    logWithTimestamp(`✗ CSV conversion failed: ${error.message}`, "error");
    throw error;
  }
}

/**
 * CLI execution handler
 * Run with: node lib/converter.js <csv-path> <json-path>
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  const csvPath =
    process.argv[2] ||
    "/Users/austinshoreditch/Documents/Github/engine/migrate/export.csv";
  const jsonPath =
    process.argv[3] ||
    "/Users/austinshoreditch/Documents/Github/engine/migrate/export.json";

  convertCSVToJSON(csvPath, jsonPath)
    .then((summary) => {
      console.log("\nConversion Summary:");
      console.log(`  Total rows: ${summary.totalRows}`);
      console.log(`  Converted: ${summary.converted}`);
      console.log(`  Skipped: ${summary.skipped}`);
      console.log(`  Errors: ${summary.errors.length}`);
      process.exit(summary.errors.length > 0 ? 1 : 0);
    })
    .catch((error) => {
      console.error(`✗ Fatal error: ${error.message}`);
      process.exit(1);
    });
}
