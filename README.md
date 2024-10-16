# Marble-node-Magpie-ui
An optional alternative login interface to the default Magpie user interface

# Requirements
- Python 3.11 or later
- [TOML parser](https://pypi.org/project/toml/) (if using Python version 3.10 or lower)
- [Jinja2](https://pypi.org/project/Jinja2/)

# Build the Interface

To convert the files in the `templates/` directory into the login interface:

1. Install the requirements:
` python3 -m pip install -r requirements.txt`
2. Depending on your Python version, install the TOML parser as well
` python3 -m pip install toml`
3. Build the HTML files
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
2. Change the values under `[Node-Details]` for `node_name` and `node_admin_email` to the ones you want.
3. In the `build.py` file change the filename in the `--config-file` parser argument from `"config.toml.example"` to 
`"config.toml"`
4. Save the file and build the interface again.

# Additional Customizations

If you don't want to use the landing page provided you can change that as well.

To customize the landing page:
1. Edit an existing `config.toml` file or create a new one.
2. Change the value under `[Node-Details]` for `login_home` to the one you want.
3. Save the file and build the interface again.