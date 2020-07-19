#!/usr/bin/env node
require('dotenv').config();

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
			const { skip, command, count } = config.seed[u];
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

async function connectToDb() {
	// pools will use environment variables
	// for connection information
	const pool = new Pool();

	// you can also use async/await
	const res = await pool.query('SELECT * FROM public."Users"');
	await pool.end();
	console.log(res.rows);
}
