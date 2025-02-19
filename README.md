# Marble node frontend
A frontend for [marble](https://marbleclimate.com) nodes.

# Requirements
- Python 3.9 or later

# Build the static site

To convert the files in the `templates/` directory into a built website:

1. Install the requirements:

```sh
python3 -m pip install -r requirements.txt
```

2. Build the HTML files

```sh
python3 build.py
```

To see all build options: 

```sh
python3 build.py --help
```

# Configuration

Configuration settings can be specified when building the site using either a configuration file or using environment
variables.

By default the configuration file is named `config.toml` and is found at the root of this repository. An alternative
file location can be specified with the `--config-file` argument to `build.py`.

The configuration options are described in `config.toml.example`. Commented options have a default value and need not
be specified. Non-commented options must be specified.

Configuration options can also be specified using environment variables. For example, `node_name` can be specified
by setting the `MARBLE_FRONTEND_CONFIG.NODE_NAME` variable. Environment variables will always take precedence over
options in the configuration files.
All configuration options set by environment variables will use the prefix `MARBLE_FRONTEND_CONFIG.`.

# Development

This is how the files are arranged in this repo and how to update them in order to develop this website.

- Files in the `static/` directory will be copied to the build directory without modification.
- Files in the `templates/site/js` directory will be copied to the build directory without modification.
- Files in the `templates/site/` directory will be copied to the build directory after being updated by the template engine
- All other directories in the `templates/` directory will not be copied to the build directory but will be used by the templating engine
- Files in the `templates/layouts/` directory contains files that should be extended by other template files
- Files in the `templates/partials/` directory contain files that should be included by other template files
