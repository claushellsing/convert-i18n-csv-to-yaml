# Convert i18n CSV to YAML

## Overview

The `convert-i18n-csv-to-yaml` CLI tool converts a CSV file containing translation data into multiple YAML files. Each language will have a separate YAML file generated in the same directory as the CSV file. This tool is useful for internationalization (i18n) in projects that require language-specific configuration files.

## Features

- **CSV Input**: Reads a CSV file with translation keys and values.
- **YAML Output**: Generates YAML files for each language specified in the CSV.
- **Automatic Escaping**: Escapes double quotes in translation values to ensure proper YAML formatting.
- **Single Directory Output**: Saves generated YAML files in the same directory as the CSV file.

## Installation

To install the `convert-i18n-csv-to-yaml` tool globally, use npm:

```bash
npm install -g convert-i18n-csv-to-yaml
```

### Example CSV File

```csv
key,en,fr,es
greeting.welcome_message,"This is a general welcome message","Este es un ""mensaje"" de bienvenida general","Este es un ""mensaje"" de bienvenida general"
greeting.user.welcome,"Welcome, user!","¡Bienvenido, usuario!","¡Bienvenido, usuario!"
greeting.user.goodbye,"Goodbye, user!","¡Adiós, usuario!","¡Adiós, usuario!"
```

Command 

```bash
convert-i18n-csv-to-yaml ./translations.csv
```

Generate

## en.yaml
```yaml
greeting:
  welcome_message: "This is a general welcome message"
  user:
    welcome: "Welcome, user!"
    goodbye: "Goodbye, user!"
```

## es.yaml
```yaml
greeting:
  welcome_message: "Este es un \"mensaje\" de bienvenida general"
  user:
    welcome: "¡Bienvenido, usuario!"
    goodbye: "¡Adiós, usuario!"
```

## fr.yaml
```yaml
greeting:
  welcome_message: "Este es un \"mensaje\" de bienvenida general"
  user:
    welcome: "¡Bienvenido, usuario!"
    goodbye: "¡Adiós, usuario!"
```