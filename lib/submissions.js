import crypto from "crypto";
import { readJson, writeJson } from "./blobStore";

const SUBMISSIONS_KEY = "submissions.json";
const EMPTY = { contact: [], enrollment: [] };

export async function getSubmissions() {
  const data = await readJson(SUBMISSIONS_KEY, EMPTY);
  return {
    contact: Array.isArray(data.contact) ? data.contact : [],
    enrollment: Array.isArray(data.enrollment) ? data.enrollment : [],
  };
}

export async function addSubmission(type, entry) {
  const data = await getSubmissions();
  if (!data[type]) data[type] = [];
  const record = {
    id: `${type}-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`,
    receivedAt: new Date().toISOString(),
    read: false,
    ...entry,
  };
  data[type].unshift(record);
  await writeJson(SUBMISSIONS_KEY, data);
  return record;
}

export async function markSubmissionRead(type, id) {
  const data = await getSubmissions();
  if (!data[type]) return false;
  const record = data[type].find((r) => r.id === id);
  if (!record) return false;
  record.read = true;
  await writeJson(SUBMISSIONS_KEY, data);
  return true;
}

export async function deleteSubmission(type, id) {
  const data = await getSubmissions();
  if (!data[type]) return false;
  const before = data[type].length;
  data[type] = data[type].filter((r) => r.id !== id);
  await writeJson(SUBMISSIONS_KEY, data);
  return data[type].length < before;
}
