# Marble-node-Magpie-ui
An optional alternative login interface to the default Magpie user interface

# Requirements
- Python 3.9 or later

# Build the Interface

To convert the files in the `templates/` directory into the login interface:

1. Install the requirements:
`python3 -m pip install -r requirements.txt`
2. Build the HTML files
`python3 build.py`

The HTML files can now be found in the `build` directory.  To view them go to `build` and run a basic webserver.  
In a web browser go to `https://localhost`
```
cd build
python -m http.server
```

# Customizing the Interface

The interface can be customized for the node that runs it by allowing the name of the node and the contact email for
the node admin to be set in the `config.toml` file.  A template for making the `config.toml` file is the 
`config.toml.example` file.  The node name is shown in user feedback messages such as error messages and usage hints. 
The admin email is used in the Help page.  

To customize the interface:
1. Copy the `config.toml.example` file and rename it `config.toml`.  This file should be kept (or put) in the root 
folder for the project.
2. Uncomment the entries that will be changed
3. Change the values under `[Node-Details]` for `node_name` and `node_admin_email` to the ones you want.
4. Save the file and build the interface again.

# Additional Customizations

If you don't want to use the landing page provided you can change that as well.

To customize the landing page:
1. Edit an existing `config.toml` file or create a new one.
2. Uncomment `login_home` if needed
3. Change the value under `[Node-Details]` for `login_home` to the one you want.
4. Save the file and build the interface again.

# Including this site as the frontend for a Marble node

In your local environment file for [birdhouse-deploy](https://github.com/bird-house/birdhouse-deploy/), add the
absolute path to the `/component` directory in this repo to the `BIRDHOUSE_EXTRA_CONF_DIRS` variable.

# Development

This is how the files are arranged in this repo and how to update them in order to develop this website.

- Files in the `static/` directory will be copied to the build directory without modification.
- Files in the `templates/site/js` directory will be copied to the build directory without modification.
- Files in the `templates/site/` directory will be copied to the build directory after being updated by the template engine
- All other directories in the `templates/` directory will not be copied to the build directory but will be used by the templating engine
- Files in the `templates/layouts/` directory contains files that should be extended by other template files
- Files in the `templates/partials/` directory contain files that should be included by other template files
