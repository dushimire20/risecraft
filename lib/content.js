import fs from "fs";
import path from "path";
import { readJson, writeJson } from "./blobStore";

const CONTENT_KEY = "content.json";
const SEED_PATH = path.join(process.cwd(), "data", "content.json");

function seedContent() {
  const raw = fs.readFileSync(SEED_PATH, "utf-8");
  return JSON.parse(raw);
}

export async function getContent() {
  return readJson(CONTENT_KEY, seedContent());
}

export async function saveContent(newContent) {
  return writeJson(CONTENT_KEY, newContent);
}
