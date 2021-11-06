# MacOS

For the sake of simplicity, the following instructions assume that you have the popular [package manager Homebrew](https://brew.sh/) installed. While you can certainly also install all dependencies without it, using Homebrew makes the process much easier.

If you want to use Homebrew but do not have it installed yet, please follow [Homebrew’s installation instructions](https://docs.brew.sh/Installation).

Note

For a while after Apple released its new ARM-based processors (the _“M1 chip”_), the recommended way of installing Manim relied on _Rosetta_, Apple’s compatibility layer between Intel and ARM architectures. This is no longer necessary, Manim can (and is recommended to) be installed natively.

## Required Dependencies[](https://docs.manim.community/en/stable/installation/macos.html#required-dependencies "Permalink to this headline")

To install all required dependencies for installing Manim (namely: ffmpeg, Python, and some required Python packages), run:

brew install py3cairo ffmpeg

![Copy to clipboard](https://docs.manim.community/en/stable/_static/copy-button.svg)

On _Apple Silicon_ based machines (i.e., devices with the M1 chip or similar; if you are unsure which processor you have check by opening the Apple menu, select _About This Mac_ and check the entry next to _Chip_), some additional dependencies are required, namely:

brew install cmake pango scipy

![Copy to clipboard](https://docs.manim.community/en/stable/_static/copy-button.svg)

After all required dependencies are installed, simply run:

pip3 install manim

![Copy to clipboard](https://docs.manim.community/en/stable/_static/copy-button.svg)

to install Manim.

Note

A frequent source for installation problems is if `pip3` does not point to the correct Python installation on your system. To check this, run `pip3 -V`: for MacOS Intel, the path should start with `/usr/local`, and for Apple Silicon with `/opt/homebrew`. If this is not the case, you either forgot to modify your shell profile (`.zprofile`) during the installation of Homebrew, or did not reload your shell (e.g., by opening a new terminal) after doing so. It is also possible that some other software (like Pycharm) changed the `PATH` variable – to fix this, make sure that the Homebrew-related lines in your `.zprofile` are at the very end of the file.

## Optional Dependencies[](https://docs.manim.community/en/stable/installation/macos.html#optional-dependencies "Permalink to this headline")

In order to make use of Manim’s interface to LaTeX for, e.g., rendering equations, LaTeX has to be installed as well. Note that this is an optional dependency: if you don’t intend to use LaTeX, you don’t have to install it.

For MacOS, the recommended LaTeX distribution is [MacTeX](http://www.tug.org/mactex/). You can install it by following the instructions from the link, or alternatively also via Homebrew by running:

brew install --cask mactex

![Copy to clipboard](https://docs.manim.community/en/stable/_static/copy-button.svg)

Warning

MacTeX is a _full_ LaTeX distribution and will require more than 4GB of disk space. If this is an issue for you, consider installing a smaller distribution like [BasicTeX](http://www.tug.org/mactex/morepackages.html).

Should you choose to work with some partial TeX distribution, the full list of LaTeX packages which Manim interacts with in some way (a subset might be sufficient for your particular application) is:

amsmath babel-english cbfonts-fd cm-super ctex doublestroke dvisvgm everysel
fontspec frcursive fundus-calligra gnu-freefont jknapltx latex-bin
mathastext microtype ms physics preview ragged2e relsize rsfs
setspace standalone tipa wasy wasysym xcolor xetex xkeyval

![Copy to clipboard](https://docs.manim.community/en/stable/_static/copy-button.svg)

## Working with Manim[](https://docs.manim.community/en/stable/installation/macos.html#working-with-manim "Permalink to this headline")

At this point, you should have a working installation of Manim. Head over to our [Quickstart Tutorial](https://docs.manim.community/en/stable/tutorials/quickstart.html) to learn how to make your own _Manimations_!