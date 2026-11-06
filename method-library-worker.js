"use strict";

const API_BASE = "https://act-master-schedule.onrender.com";
const METHODS_ENDPOINT = "/method-library/extension";
const REQUEST_TYPE = "ACT_METHOD_LIBRARY_FETCH";
const ALLOWED_SENDERS = new Set([
  "https://cenexel.clinspark.com",
  "https://cenexeltest.clinspark.com"
]);
const PAGE_SIZE = 250;
const MAX_METHODS = 10000;
const MAX_EXPRESSION_LENGTH = 500000;

function validMethod(item) {
  return item && typeof item.name === "string" && item.name.length <= 200 &&
    (item.category === "method" || item.category === "edit_check") &&
    typeof item.expression === "string" && item.expression.length <= MAX_EXPRESSION_LENGTH;
}

async function readMethodLibrary() {
  const items = [];
  let offset = 0;
  while (true) {
    const url = new URL(METHODS_ENDPOINT, API_BASE);
    url.searchParams.set("limit", String(PAGE_SIZE));
    url.searchParams.set("offset", String(offset));
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    let response;
    try {
      // This is an anonymous, credential-free GET to the narrow method-only projection.
      response = await fetch(url, { method: "GET", credentials: "omit", cache: "no-store", redirect: "error", headers: { Accept: "application/json" }, signal: controller.signal });
    } finally {
      clearTimeout(timeout);
    }
    if (!response.ok) throw new Error("ACT server returned HTTP " + response.status + ".");
    const payload = await response.json();
    if (!payload || !Array.isArray(payload.items) || typeof payload.has_more !== "boolean" || payload.items.length > PAGE_SIZE) {
      throw new Error("ACT Method Library returned an invalid page.");
    }
    for (const item of payload.items) {
      if (!validMethod(item)) throw new Error("ACT Method Library returned an invalid entry.");
      items.push({ name: item.name, category: item.category, expression: item.expression });
      if (items.length > MAX_METHODS) throw new Error("ACT Method Library exceeds the extension's 10,000-item safety limit.");
    }
    if (!payload.has_more) return items;
    if (payload.items.length === 0) throw new Error("ACT Method Library pagination did not advance.");
    offset += payload.items.length;
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message || message.type !== REQUEST_TYPE) return false;
  if (sender.id !== chrome.runtime.id) {
    sendResponse({ success: false, error: "Method Library requests must originate from this extension." });
    return false;
  }
  let origin = "";
  try { origin = new URL(sender.url || "").origin; } catch (_) {}
  if (!ALLOWED_SENDERS.has(origin)) {
    sendResponse({ success: false, error: "Method Library requests are allowed only from ClinSpark pages." });
    return false;
  }
  readMethodLibrary()
    .then((items) => sendResponse({ success: true, items }))
    .catch((error) => sendResponse({ success: false, error: String(error && error.message ? error.message : "ACT Method Library is unavailable.") }));
  return true;
});
