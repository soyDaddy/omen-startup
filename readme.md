# Omen Startup

Omen Startup is a Node.js package designed to help developers quickly initialize and manage their environment variables and project configurations. This package provides an easy way to create and verify `.env` files, ensuring that all necessary environment variables are set up correctly.

## Installation

To install Omen Startup, use npm:

```bash
npm install omen-startup
```

Or with yarn:

```bash
yarn add omen-startup
```

## Usage

### Initialize a New Startup

To initialize a new startup, create a new instance of the `Startup` class:

```javascript
const Startup = require('omen-startup');
const startup = new Startup('MyProject');
```

### Create a `.env` File

You can create a `.env` file by providing a configuration schema. This will prompt the user to enter the required environment variables.

```javascript
const configSchema = {
  db_host: {
    description: 'Enter your database host',
    required: true
  },
  db_user: {
    description: 'Enter your database user',
    required: true
  },
  db_password: {
    description: 'Enter your database password',
    hidden: true,
    replace: '*',
    required: true
  }
};

startup.createENV(configSchema).then(() => {
  console.log('Environment file created successfully.');
}).catch(err => {
  console.error('Failed to create environment file:', err);
});
```

### Verify Environment Variables

You can verify if the necessary environment variables are set by providing a sections object. This will print out the status of each variable.

```javascript
const sections = {
  Database: ['DB_HOST', 'DB_USER', 'DB_PASSWORD']
};

startup.verifyENV(sections);
```

### Create Necessary Files

The `createNecessaryFiles` method helps to create the necessary files for your project, including the `.env` file if it does not exist.

```javascript
const createENVConfig = {
  db_host: {
    description: 'Enter your database host',
    required: true
  },
  db_user: {
    description: 'Enter your database user',
    required: true
  },
  db_password: {
    description: 'Enter your database password',
    hidden: true,
    required: true
  }
};

startup.createNecessaryFiles(createENVConfig).then(created => {
  if (created) {
    console.log('Necessary files created successfully.');
  } else {
    console.log('.env file already exists.');
  }
}).catch(err => {
  console.error('Failed to create necessary files:', err);
});
```

### Example

Here's a full example of how you can use Omen Startup to initialize a new project, create a `.env` file, and verify environment variables:

```javascript
const Startup = require('omen-startup');
const startup = new Startup('MyProject');

const configSchema = {
  db_host: {
    description: 'Enter your database host',
    required: true
  },
  db_user: {
    description: 'Enter your database user',
    required: true
  },
  db_password: {
    description: 'Enter your database password',
    hidden: true,
    replace: '*',
    required: true
  }
};

startup.createENV(configSchema).then(() => {
  console.log('Environment file created successfully.');

  const sections = {
    Database: ['DB_HOST', 'DB_USER', 'DB_PASSWORD']
  };

  startup.verifyENV(sections);
}).catch(err => {
  console.error('Failed to create environment file:', err);
});
```

## Other Example
```javascript
const Startup = require('omen-startup');
const startup = new Startup('Discord Template');

const start = async () => {
    const needToCreateENV = await startup.createNecessaryFiles({
        botToken: { description: "Enter your bot token here", hidden: true },
        mongo: { description: "Enter your MongoDB URL", hidden: true },
        botID: { description: "Enter your bot ID" },
        ownerID: { description: 'Enter here the IDs from the Owners separated by ,', before: function(value) { return value.split(',').map(id => id.trim()).join('","'); } }
    });

    if (needToCreateENV) {
        console.log('✓ Your required files have been created, please restart the bot.');
        setTimeout(() => {
            return process.exit(1);
        }, 5000);
    } else {
        startup.verifyENV({
            'Bot Settings': [
                'TOKEN',
                'BOTID',
            ],
            'Other Settings': [
                'MONGOURI',
                'OWNERIDS'
            ]
            // Your bot index here
        });
    }
};

start();
```

## API

### `new Startup(name)`

Creates a new instance of the Startup class.

- `name` (String): The name of the project.

### `createENV(configSchema)`

Creates a `.env` file based on the provided configuration schema.

- `configSchema` (Object): The configuration schema for the environment variables.

### `verifyENV(sections)`

Verifies if the necessary environment variables are set.

- `sections` (Object): An object where keys are section names and values are arrays of environment variable names.

### `createNecessaryFiles(createENVConfig)`

Creates necessary files for the project, including the `.env` file if it does not exist.

- `createENVConfig` (Object): The configuration schema for the environment variables.

## License

This project is licensed under the MIT License.
