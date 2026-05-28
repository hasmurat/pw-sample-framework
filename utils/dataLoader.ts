import fs from 'fs';
import path from 'path';

/**
 * @description: Utility function to load test data from a JSON file located in the test-data directory.
 * @param fileName 
 * @returns 
 */

export function getTestData(fileName: string) {
  const filePath = path.resolve(__dirname, `../test-data/${fileName}.json`);
  
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}
