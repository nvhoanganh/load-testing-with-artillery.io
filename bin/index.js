#!/usr/bin/env node
require('dotenv').config();
const { execSync } = require('child_process');

const fs = require('fs');
const TokenReplacer = require('chance-token-replacer');

const replacer = new TokenReplacer();

const YAML = require('yaml');
const { Pool } = require('pg');

(async function () {
	const ymlConfig = fs.readFileSync('./config.yml').toString();

	const parsed = YAML.parse(ymlConfig);

	seed(parsed);
})();

async function seed(config) {
	if (config.seed) {
		const pool = new Pool();
		for (let u = 0; u < config.seed.length; u++) {
			const { name, skip, command, count } = config.seed[u];
			console.log(`------------ ${name} --------------`);
			if (!skip) {
				for (let index = 0; index < count; index++) {
					const processedCmd = replacer.processString(command);
					console.log('running:', processedCmd);
					// eslint-disable-next-line no-await-in-loop
					await pool.query(processedCmd);
					console.log('Done');
				}
			}
		}
		await pool.end();
	}
}
