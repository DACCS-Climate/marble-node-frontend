import os
import shutil
import argparse

from jinja2 import FileSystemLoader, Environment, select_autoescape

try:
    import tomllib
except ModuleNotFoundError:
    import toml as tomllib
    TOML_OPEN_MODE="r"
else:
    TOML_OPEN_MODE="rb"


THIS_DIR = os.path.abspath(os.path.dirname(__file__))
TEMPLATE_PATH = os.path.join(THIS_DIR, "templates")
SITE_PATH = os.path.join(TEMPLATE_PATH, "site")


def filter_site_templates(template, extensions=("js", "html")):
    abs_filepath = os.path.join(TEMPLATE_PATH, template)
    basename = os.path.basename(template)
    return (SITE_PATH == os.path.commonpath((abs_filepath, SITE_PATH)) and
            "." in basename and
            basename.rsplit(".", 1)[1] in extensions)


def build(build_directory, config_file, clean=False):

    if clean:
        shutil.rmtree(build_directory, ignore_errors=True)
    env = Environment(
        loader=FileSystemLoader(TEMPLATE_PATH), autoescape=select_autoescape(enabled_extensions=("html", "js", "css"))
    )

    shutil.copytree(os.path.join(THIS_DIR, "static"), build_directory, dirs_exist_ok=True)

    for template in env.list_templates(filter_func=filter_site_templates):
        build_destination = os.path.join(
            build_directory, os.path.relpath(os.path.join(TEMPLATE_PATH, template), SITE_PATH)
        )
        os.makedirs(os.path.dirname(build_destination), exist_ok=True)

        with open(config_file, TOML_OPEN_MODE) as configfile:
            config_data = tomllib.load(configfile)
            node_details = config_data["Node-Details"]

            with open(build_destination, "w") as f:
                f.write(env.get_template(template).render(current_node_name=node_details["node_name"],
                                                          current_node_admin_email=node_details["node_admin_email"],
                                                          current_login_home = node_details.get("login_home", "login.html")))


if __name__ == "__main__":
    parser = argparse.ArgumentParser()

    parser.add_argument(
        "-b",
        "--build-directory",
        default=os.path.join(THIS_DIR, "build"),
        help="location on disk to write built templates to.",
    )

    parser.add_argument(
        "-g",
        "--config-file",
        default=os.path.join(THIS_DIR, "config.toml"),
        help="TOML config file",
    )

    parser.add_argument(
        "-c",
        "--clean",
        action="store_true",
        help="clean build directories before building.",
    )
    args = parser.parse_args()
    build(args.build_directory, args.config_file, args.clean)
