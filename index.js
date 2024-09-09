#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Function to escape double quotes in a string
function escapeDoubleQuotes(str) {
    return str.replace(/"/g, '\\"');
}

// Function to convert CSV data to a nested dictionary for i18n
async function csvToI18nDict(csvFilePath) {
    const i18nData = {};
    const headers = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('headers', headerList => {
                headers.push(...headerList);
            })
            .on('data', row => {
                const key = row[headers[0]];
                headers.slice(1).forEach((language, index) => {
                    let translation = row[headers[index + 1]];
                    if (translation) {
                        translation = escapeDoubleQuotes(translation);
                    }
                    if (!i18nData[language]) {
                        i18nData[language] = {};
                    }
                    const keyParts = key.split('.');
                    let nestedDict = i18nData[language];
                    keyParts.slice(0, -1).forEach(part => {
                        if (!nestedDict[part]) {
                            nestedDict[part] = {};
                        }
                        nestedDict = nestedDict[part];
                    });
                    nestedDict[keyParts[keyParts.length - 1]] = translation;
                });
            })
            .on('end', () => {
                resolve(i18nData);
            })
            .on('error', reject);
    });
}

// Function to generate YAML content manually with indentation
function generateYamlContent(nestedDict, indent = 0) {
    const yamlLines = [];
    const indentStr = '  '.repeat(indent);
    for (const [key, value] of Object.entries(nestedDict)) {
        if (typeof value === 'object' && value !== null) {
            yamlLines.push(`${indentStr}${key}:`);
            yamlLines.push(generateYamlContent(value, indent + 1));
        } else {
            yamlLines.push(`${indentStr}${key}: "${value}"`);
        }
    }
    return yamlLines.join('\n');
}

// Function to generate YAML files
function generateYamlFiles(i18nData, outputDir) {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    for (const [language, translations] of Object.entries(i18nData)) {
        const yamlContent = generateYamlContent(translations);
        const yamlFilePath = path.join(outputDir, `${language}.yaml`);
        fs.writeFileSync(yamlFilePath, yamlContent, 'utf8');
        console.log(`Generated YAML file for ${language}: ${yamlFilePath}`);
    }
}

// Main function to execute the script
async function main() {
    if (process.argv.length !== 3) {
        console.error('Usage: node index.js <csvFilePath>');
        process.exit(1);
    }

    const csvFilePath = process.argv[2];
    if (!csvFilePath) {
        console.error('Error: CSV file path must be provided.');
        process.exit(1);
    }
    const outputDir = path.dirname(csvFilePath); // Use the same directory as the CSV file

    try {
        const i18nData = await csvToI18nDict(csvFilePath);
        generateYamlFiles(i18nData, outputDir);
        console.log(`YAML files have been generated and saved to: ${outputDir}`);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

main();