import fs from "fs";
import path from "path";
import { PortfolioData } from "@/types";

const dataPath = path.join(process.cwd(), "data", "data.json");

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const data = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading data.json:", error);
    throw new Error("Failed to read portfolio data");
  }
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing data.json:", error);
    throw new Error("Failed to save portfolio data");
  }
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function getCurrentTimestamp(): string {
  return new Date().toISOString();
}