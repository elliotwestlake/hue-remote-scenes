"""pytest-homeassistant-custom-component ships its own custom_components package;
make ours importable through it."""

import pathlib

import custom_components

custom_components.__path__.append(str(pathlib.Path(__file__).parents[1] / "custom_components"))
