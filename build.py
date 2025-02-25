from collections.abc import Mapping
import os
import shutil
import argparse

from jinja2 import FileSystemLoader, Environment, select_autoescape

try:
    import tomllib
except ModuleNotFoundError:
    import toml as tomllib # type: ignore
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

def parse_configs(configs, defaults, path=None):
    missing = []
    if path is not None:
        env_path = path.upper().replace(".", "__")
        env_config_override = os.getenv(f"MARBLE_FRONTEND_CONFIG__{env_path}")
        if env_config_override is not None:
            configs = env_config_override
    if configs is None:
        if defaults == "__required":
            missing.append(path)
            return None, missing
        else:
            return defaults, missing
    if isinstance(configs, Mapping) and isinstance(defaults, Mapping):
        for key in defaults | configs:
            new_path = key if path is None else ".".join([path, key])
            configs[key], missing_ = parse_configs(configs.get(key), defaults.get(key), path=new_path)
            missing.extend(missing_)
    return configs, missing


def config_data(config_file):
    if os.path.isfile(config_file):
        with open(config_file, TOML_OPEN_MODE) as f:
            configs = tomllib.load(f)
    else:
        configs = {}
    with open(os.path.join(THIS_DIR, "config.default.toml"), TOML_OPEN_MODE) as f:
        config_defaults = tomllib.load(f)
    
    final_configs, missing = parse_configs(configs, config_defaults)
    
    if missing:
        raise Exception(f"The following missing configuration options are required: {missing}")
    return final_configs


def build(build_directory, config_file, clean=False):

    if clean:
        shutil.rmtree(build_directory, ignore_errors=True)
    env = Environment(
        loader=FileSystemLoader(TEMPLATE_PATH), autoescape=select_autoescape(enabled_extensions=("html", "js", "css"))
    )

    shutil.copytree(os.path.join(THIS_DIR, "static"), build_directory, dirs_exist_ok=True)

    configs = config_data(config_file)

    for template in env.list_templates(filter_func=filter_site_templates):
        build_destination = os.path.join(
            build_directory, os.path.relpath(os.path.join(TEMPLATE_PATH, template), SITE_PATH)
        )
        os.makedirs(os.path.dirname(build_destination), exist_ok=True)

        with open(build_destination, "w") as f:
            f.write(env.get_template(template).render(configs=configs))


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
