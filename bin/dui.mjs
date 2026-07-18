#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const REGISTRY = "qentrah/DUI";
const args = process.argv.slice(2);
const command = args.shift();

function printHelp() {
  console.log(`DUI component installer

Usage:
  dui add <component...> [shadcn options]
  dui init [shadcn options]
  dui --version

Examples:
  dui add button
  dui add button input card
  dui add button --dry-run

Components are installed as editable source through the shadcn CLI.`);
}

if (!command || command === "help" || command === "--help" || command === "-h") {
  printHelp();
  process.exit(0);
}

if (command === "--version" || command === "-v") {
  const packagePath = fileURLToPath(new URL("../package.json", import.meta.url));
  const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
  console.log(packageJson.version);
  process.exit(0);
}

let shadcnArgs;

if (command === "add") {
  const firstOption = args.findIndex((arg) => arg.startsWith("-"));
  const components = firstOption === -1 ? args : args.slice(0, firstOption);
  const options = firstOption === -1 ? [] : args.slice(firstOption);

  if (components.length === 0) {
    console.error("DUI: provide at least one component, for example: dui add button");
    process.exit(1);
  }

  shadcnArgs = [
    "--yes",
    "shadcn@latest",
    "add",
    ...components.map((component) => `${REGISTRY}/${component}`),
    ...options,
  ];
} else if (command === "init") {
  shadcnArgs = ["--yes", "shadcn@latest", "init", ...args];
} else {
  console.error(`DUI: unknown command "${command}"`);
  printHelp();
  process.exit(1);
}

const npmCommand = process.platform === "win32" ? "npx.cmd" : "npx";
const result = spawnSync(npmCommand, shadcnArgs, { stdio: "inherit" });

if (result.error) {
  console.error(`DUI: unable to start shadcn: ${result.error.message}`);
  process.exit(1);
}

process.exit(result.status ?? 1);
