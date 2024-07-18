const dotenv = require('dotenv');
const chalk = require('chalk');
const fs = require('fs-extra');
const prompt = require("prompt");

class Startup {
    constructor(name) {
        this.name = name;
        dotenv.config();
        this.init();
    }

    init() {
        console.log(`Welcome to ${this.name}`);
    }

    async createENV(configSchema) {
        prompt.message = this.textColored(this.name, '#800080') + " " + this.textColored("Startup ", '#00ffff');
        prompt.delimiter = this.textColored("> ", '#ffffffff');

        const schema = { properties: {} };
        for (const key in configSchema) {
            schema.properties[key] = {
                description: this.textColored(configSchema[key].description + '\n'),
                required: configSchema[key].required || true,
                hidden: configSchema[key].hidden || false,
                replace: configSchema[key].hidden ? '*' : undefined,
                before: configSchema[key].before || (value => value)
            };
        }

        const result = await prompt.get(schema);

        let envContent = `# Environment variables generated by ${this.name} using omen-startup package\n`;

        for (const key in result) {
            envContent += `${key.toUpperCase()}=${result[key]}\n`;
        }

        await fs.writeFile('.env', envContent, 'utf8');
    }

    verifyENV(sections) {
        for (const section in sections) {
            console.log(this.textColored("═══════════ ⋆ ", "#800080"), this.textColored(section, '#800080'), this.textColored(" ⋆ ═══════════", '#800080'));

            sections[section].forEach(variable => {
                const status = {
                    message: process.env[variable] ? "Set" : "Not set",
                    color: process.env[variable] ? null : "#ff0000"
                };
                console.log(this.textColored(`⋆⦿ ⋆ ${variable}: `, '#00ffff'), this.textColored(status.message, status.color));
            });
        }
        console.log(this.textColored("════════════════ ⋆★ ⋆ ════════════════", '#800080'));
    }

    textColored(message, color) {
        return !color ? chalk.hex('#00ff00')(message) : chalk.hex(color)(message);
    }

    async createNecessaryFiles(createENVConfig) {
        try {
            const existENV = fs.existsSync('.env');
            if (existENV) return false;
            await this.createENV(createENVConfig);
            return true;
        } catch (err) {
            if (err.message === 'canceled') {
                console.log('Canceled by the user');
            } else {
                console.log(err);
            }
            process.exit(0);
        }
    }
}

module.exports = Startup;
