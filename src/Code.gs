/**
 * Dish & Share — a mobile-friendly potluck/recipe-swap board.
 * Deploy your own copy: see README.md for the full walkthrough.
 */

var HEADERS = ["id", "name", "contributor", "category", "description", "notes", "link", "image", "dietary", "greatFor", "reactions"];

function doGet() {
  return HtmlService.createHtmlOutputFromFile('app')
    .setTitle('Dish & Share')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Run this once from the Apps Script editor (select "setup" in the function
 * dropdown, click Run) before your first deploy. Writes the header row the
 * rest of the app expects; safe to re-run, it won't duplicate headers.
 */
function setup() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  var hasHeaders = firstRow.some(function (cell) { return cell !== ""; });
  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
}

function getRecipes() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  return sheet.getDataRange().getValues();
}

function addRecipe(data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var id = sheet.getLastRow();
  sheet.appendRow([id, data.name || "", data.contributor || "", data.category || "", data.description || "", data.notes || "", data.link || "", "", data.dietary || "", data.greatFor || "", 0]);
}

function addReaction(id) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var values = sheet.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(id)) {
      var cur = parseInt(sheet.getRange(i + 1, 11).getValue()) || 0;
      sheet.getRange(i + 1, 11).setValue(cur + 1);
      break;
    }
  }
}
