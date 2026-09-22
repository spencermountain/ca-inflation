 /* eslint-disable no-console */
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

// Read package.json
const packagePath = join(process.cwd(), 'package.json')
const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'))

// Parse current version
const [major, minor, patch] = packageJson.version.split('.').map(Number)

// Increment minor version
const newVersion = `${major}.${minor}.${patch + 1}`

// Update package.json
packageJson.version = newVersion
writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n')

console.log(`bumped from ${packageJson.version} to ${newVersion}`)
