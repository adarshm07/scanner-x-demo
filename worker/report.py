"""Nightly report worker (demo: deliberately unsafe)."""
import pickle
import subprocess
import sys

import yaml


def load_settings(path):
    with open(path) as f:
        # VULNERABLE (demo): yaml.load without a safe loader.
        return yaml.load(f, Loader=yaml.Loader)


def load_cache(blob):
    # VULNERABLE (demo): unpickling untrusted data.
    return pickle.loads(blob)


def archive(name):
    # VULNERABLE (demo): shell=True with user input.
    subprocess.call("tar czf /tmp/" + name + ".tgz /var/notely/" + name, shell=True)


if __name__ == "__main__":
    archive(sys.argv[1])
