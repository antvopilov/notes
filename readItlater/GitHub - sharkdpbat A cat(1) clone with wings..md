[[ReadItLater]] [[Article]]

# [GitHub - sharkdp/bat: A cat(1) clone with wings.](https://github.com/sharkdp/bat)

[![bat - a cat clone with wings](https://github.com/sharkdp/bat/raw/master/doc/logo-header.svg)](https://github.com/sharkdp/bat/blob/master/doc/logo-header.svg)  
[![Build Status](https://github.com/sharkdp/bat/workflows/CICD/badge.svg)](https://github.com/sharkdp/bat/actions?query=workflow%3ACICD) [![license](https://camo.githubusercontent.com/4718d2a1e7a54c33732310613b2e2e8d8ef70c25e3e27406d1df79466b6b603d/68747470733a2f2f696d672e736869656c64732e696f2f6372617465732f6c2f6261742e737667)](https://camo.githubusercontent.com/4718d2a1e7a54c33732310613b2e2e8d8ef70c25e3e27406d1df79466b6b603d/68747470733a2f2f696d672e736869656c64732e696f2f6372617465732f6c2f6261742e737667) [![Version info](https://camo.githubusercontent.com/295b01f4d06e6db8b2fd1578ee2827e4f953fe7b63578b3a9c810d8cb0d3abcb/68747470733a2f2f696d672e736869656c64732e696f2f6372617465732f762f6261742e7376673f636f6c6f72423d333139653863)](https://crates.io/crates/bat)  
A _cat(1)_ clone with syntax highlighting and Git integration.

[Key Features](https://github.com/#syntax-highlighting) • [How To Use](https://github.com/#how-to-use) • [Installation](https://github.com/#installation) • [Customization](https://github.com/#customization) • [Project goals, alternatives](https://github.com/#project-goals-and-alternatives)  
[English] [[中文](https://github.com/chinanf-boy/bat-zh)] [[日本語](https://github.com/sharkdp/bat/blob/master/doc/README-ja.md)] [[한국어](https://github.com/sharkdp/bat/blob/master/doc/README-ko.md)] [[Русский](https://github.com/sharkdp/bat/blob/master/doc/README-ru.md)]

### Syntax highlighting

`bat` supports syntax highlighting for a large number of programming and markup languages:

[![Syntax highlighting example](https://camo.githubusercontent.com/7b7c397acc5b91b4c4cf7756015185fe3c5f700f70d256a212de51294a0cf673/68747470733a2f2f696d6775722e636f6d2f724773646e44652e706e67)](https://camo.githubusercontent.com/7b7c397acc5b91b4c4cf7756015185fe3c5f700f70d256a212de51294a0cf673/68747470733a2f2f696d6775722e636f6d2f724773646e44652e706e67)

### Git integration

`bat` communicates with `git` to show modifications with respect to the index (see left side bar):

[![Git integration example](https://camo.githubusercontent.com/c436c206f2c86605ab2f9fb632dd485afc05fccbf14af472770b0c59d876c9cc/68747470733a2f2f692e696d6775722e636f6d2f326c53573452452e706e67)](https://camo.githubusercontent.com/c436c206f2c86605ab2f9fb632dd485afc05fccbf14af472770b0c59d876c9cc/68747470733a2f2f692e696d6775722e636f6d2f326c53573452452e706e67)

### Show non-printable characters

You can use the `-A`/`--show-all` option to show and highlight non-printable characters:

[![Non-printable character example](https://camo.githubusercontent.com/643244c46834769e0ea2802e15518c49e0c7cf10aa82d00c7c69a406f2aa161d/68747470733a2f2f692e696d6775722e636f6d2f576e64477039482e706e67)](https://camo.githubusercontent.com/643244c46834769e0ea2802e15518c49e0c7cf10aa82d00c7c69a406f2aa161d/68747470733a2f2f692e696d6775722e636f6d2f576e64477039482e706e67)

### Automatic paging

By default, `bat` pipes its own output to a pager (e.g `less`) if the output is too large for one screen. If you would rather `bat` work like `cat` all the time (never page output), you can set `--paging=never` as an option, either on the command line or in your configuration file. If you intend to alias `cat` to `bat` in your shell configuration, you can use `alias cat='bat --paging=never'` to preserve the default behavior.

#### File concatenation

Even with a pager set, you can still use `bat` to concatenate files 😉. Whenever `bat` detects a non-interactive terminal (i.e. when you pipe into another process or into a file), `bat` will act as a drop-in replacement for `cat` and fall back to printing the plain file contents, regardless of the `--pager` option's value.

## How to use

Display a single file on the terminal

Display multiple files at once

Read from stdin, determine the syntax automatically (note, highlighting will only work if the syntax can be determined from the first line of the file, usually through a shebang such as `#!/bin/sh`)

> curl -s https://sh.rustup.rs | bat

Read from stdin, specify the language explicitly

> yaml2json .travis.yml | json_pp | bat -l json

Show and highlight non-printable characters:

Use it as a `cat` replacement:

bat > note.md  # quickly create a new file

bat header.md content.md footer.md > document.md

bat -n main.rs  # show line numbers (only)

bat f - g  # output 'f', then stdin, then 'g'.

### Integration with other tools

#### `fzf`

You can use `bat` as a previewer for [`fzf`](https://github.com/junegunn/fzf). To do this, use `bat`s `--color=always` option to force colorized output. You can also use `--line-range` option to restrict the load times for long files:

fzf --preview 'bat --color=always --style=numbers --line-range=:500 {}'

For more information, see [`fzf`s `README`](https://github.com/junegunn/fzf#preview-window).

#### `find` or `fd`

You can use the `-exec` option of `find` to preview all search results with `bat`:

If you happen to use [`fd`](https://github.com/sharkdp/fd), you can use the `-X`/`--exec-batch` option to do the same:

#### `ripgrep`

With [`batgrep`](https://github.com/eth-p/bat-extras/blob/master/doc/batgrep.md), `bat` can be used as the printer for [`ripgrep`](https://github.com/BurntSushi/ripgrep) search results.

#### `tail -f`

`bat` can be combined with `tail -f` to continuously monitor a given file with syntax highlighting.

tail -f /var/log/pacman.log | bat --paging=never -l log

Note that we have to switch off paging in order for this to work. We have also specified the syntax explicitly (`-l log`), as it can not be auto-detected in this case.

#### `git`

You can combine `bat` with `git show` to view an older version of a given file with proper syntax highlighting:

git show v0.6.0:src/main.rs | bat -l rs

#### `git diff`

You can combine `bat` with `git diff` to view lines around code changes with proper syntax highlighting:

batdiff() {
    git diff --name-only --diff-filter=d | xargs bat --diff
}

If you prefer to use this as a separate tool, check out `batdiff` in [`bat-extras`](https://github.com/eth-p/bat-extras).

If you are looking for more support for git and diff operations, check out [`delta`](https://github.com/dandavison/delta).

#### `xclip`

The line numbers and Git modification markers in the output of `bat` can make it hard to copy the contents of a file. To prevent this, you can call `bat` with the `-p`/`--plain` option or simply pipe the output into `xclip`:

`bat` will detect that the output is being redirected and print the plain file contents.

#### `man`

`bat` can be used as a colorizing pager for `man`, by setting the `MANPAGER` environment variable:

export MANPAGER="sh -c 'col -bx | bat -l man -p'"
man 2 select

(replace `bat` by `batcat` if you are on Debian or Ubuntu)

It might also be necessary to set `MANROFFOPT="-c"` if you experience formatting problems.

If you prefer to have this bundled in a new command, you can also use [`batman`](https://github.com/eth-p/bat-extras/blob/master/doc/batman.md).

Note that the [Manpage syntax](https://github.com/sharkdp/bat/blob/master/assets/syntaxes/02_Extra/Manpage.sublime-syntax) is developed in this repository and still needs some work.

Also, note that this will [not work](https://github.com/sharkdp/bat/issues/1145) with Mandocs `man` implementation.

#### `prettier` / `shfmt` / `rustfmt`

The [`prettybat`](https://github.com/eth-p/bat-extras/blob/master/doc/prettybat.md) script is a wrapper that will format code and print it with `bat`.

## Installation

[![Packaging status](https://camo.githubusercontent.com/e77807cccdb0c84e81c801389e69bb2d815a8fddbedc8c093a825d6388f99660/68747470733a2f2f7265706f6c6f67792e6f72672f62616467652f766572746963616c2d616c6c7265706f732f6261742d6361742e737667)](https://repology.org/project/bat-cat/versions)

### On Ubuntu (using `apt`)

_... and other Debian-based Linux distributions._

`bat` is available on [Ubuntu since 20.04 ("Focal")](https://packages.ubuntu.com/search?keywords=bat&exact=1) and [Debian since August 2021 (Debian 11 - "Bullseye")](https://packages.debian.org/bullseye/bat).

If your Ubuntu/Debian installation is new enough you can simply run:

**Important**: If you install `bat` this way, please note that the executable may be installed as `batcat` instead of `bat` (due to [a name clash with another package](https://github.com/sharkdp/bat/issues/982)). You can set up a `bat -> batcat` symlink or alias to prevent any issues that may come up because of this and to be consistent with other distributions:

mkdir -p ~/.local/bin
ln -s /usr/bin/batcat ~/.local/bin/bat

### On Ubuntu (using most recent `.deb` packages)

_... and other Debian-based Linux distributions._

If the package has not yet been promoted to your Ubuntu/Debian installation, or you want the most recent release of `bat`, download the latest `.deb` package from the [release page](https://github.com/sharkdp/bat/releases) and install it via:

sudo dpkg -i bat_0.18.3_amd64.deb  # adapt version number and architecture

### On Alpine Linux

You can install [the `bat` package](https://pkgs.alpinelinux.org/packages?name=bat) from the official sources, provided you have the appropriate repository enabled:

### On Arch Linux

You can install [the `bat` package](https://www.archlinux.org/packages/community/x86_64/bat/) from the official sources:

### On Fedora

You can install [the `bat` package](https://koji.fedoraproject.org/koji/packageinfo?packageID=27506) from the official [Fedora Modular](https://docs.fedoraproject.org/en-US/modularity/using-modules/) repository.

### On Funtoo Linux

You can install [the `bat` package](https://github.com/funtoo/dev-kit/tree/1.4-release/sys-apps/bat) from dev-kit.

### On Gentoo Linux

You can install [the `bat` package](https://packages.gentoo.org/packages/sys-apps/bat) from the official sources:

### On Void Linux

You can install `bat` via xbps-install:

### On Termux

You can install `bat` via pkg:

### On FreeBSD

You can install a precompiled [`bat` package](https://www.freshports.org/textproc/bat) with pkg:

or build it on your own from the FreeBSD ports:

cd /usr/ports/textproc/bat
make install

### On OpenBSD

You can install `bat` package using [`pkg_add(1)`](https://man.openbsd.org/pkg_add.1):

### Via nix

You can install `bat` using the [nix package manager](https://nixos.org/nix):

### On openSUSE

You can install `bat` with zypper:

### Via snap package

There is currently no recommended snap package available. Existing packages may be available, but are not officially supported and may contain [issues](https://github.com/sharkdp/bat/issues/1519).

### On macOS (or Linux) via Homebrew

You can install `bat` with [Homebrew on MacOS](https://formulae.brew.sh/formula/bat) or [Homebrew on Linux](https://formulae.brew.sh/formula-linux/bat):

### On macOS via MacPorts

Or install `bat` with [MacPorts](https://ports.macports.org/port/bat/summary):

### On Windows

There are a few options to install `bat` on Windows. Once you have installed `bat`, take a look at the ["Using `bat` on Windows"](https://github.com/#using-bat-on-windows) section.

#### Prerequisites

You will need to install the [Visual C++ Redistributable](https://support.microsoft.com/en-us/help/2977003/the-latest-supported-visual-c-downloads) package.

#### With Chocolatey

You can install `bat` via [Chocolatey](https://chocolatey.org/packages/Bat):

#### With Scoop

You can install `bat` via [scoop](https://scoop.sh/):

#### From prebuilt binaries:

You can download prebuilt binaries from the [Release page](https://github.com/sharkdp/bat/releases),

You will need to install the [Visual C++ Redistributable](https://support.microsoft.com/en-us/help/2977003/the-latest-supported-visual-c-downloads) package.

### From binaries

Check out the [Release page](https://github.com/sharkdp/bat/releases) for prebuilt versions of `bat` for many different architectures. Statically-linked binaries are also available: look for archives with `musl` in the file name.

### From source

If you want to build `bat` from source, you need Rust 1.46 or higher. You can then use `cargo` to build everything:

cargo install --locked bat

Note that additional files like the man page or shell completion files can not be installed in this way. They will be generated by `cargo` and should be available in the cargo target folder (under `build`).

## Customization

### Highlighting theme

Use `bat --list-themes` to get a list of all available themes for syntax highlighting. To select the `TwoDark` theme, call `bat` with the `--theme=TwoDark` option or set the `BAT_THEME` environment variable to `TwoDark`. Use `export BAT_THEME="TwoDark"` in your shell's startup file to make the change permanent. Alternatively, use `bat`s [configuration file](https://github.com/sharkdp/bat#configuration-file).

If you want to preview the different themes on a custom file, you can use the following command (you need [`fzf`](https://github.com/junegunn/fzf) for this):

bat --list-themes | fzf --preview="bat --theme={} --color=always /path/to/file"

`bat` looks good on a dark background by default. However, if your terminal uses a light background, some themes like `GitHub` or `OneHalfLight` will work better for you. You can also use a custom theme by following the ['Adding new themes' section below](https://github.com/sharkdp/bat#adding-new-themes).

### 8-bit themes

`bat` has three themes that always use [8-bit colors](https://en.wikipedia.org/wiki/ANSI_escape_code#Colors), even when truecolor support is available:

-   `ansi` looks decent on any terminal. It uses 3-bit colors: black, red, green, yellow, blue, magenta, cyan, and white.
-   `base16` is designed for [base16](https://github.com/chriskempson/base16) terminal themes. It uses 4-bit colors (3-bit colors plus bright variants) in accordance with the [base16 styling guidelines](https://github.com/chriskempson/base16/blob/master/styling.md).
-   `base16-256` is designed for [base16-shell](https://github.com/chriskempson/base16-shell). It replaces certain bright colors with 8-bit colors from 16 to 21. **Do not** use this simply because you have a 256-color terminal but are not using base16-shell.

Although these themes are more restricted, they have three advantages over truecolor themes. They:

-   Enjoy maximum compatibility. Some terminal utilities do not support more than 3-bit colors.
-   Adapt to terminal theme changes. Even for already printed output.
-   Visually harmonize better with other terminal software.

### Output style

You can use the `--style` option to control the appearance of `bat`s output. You can use `--style=numbers,changes`, for example, to show only Git changes and line numbers but no grid and no file header. Set the `BAT_STYLE` environment variable to make these changes permanent or use `bat`s [configuration file](https://github.com/sharkdp/bat#configuration-file).

### Adding new syntaxes / language definitions

Should you find that a particular syntax is not available within `bat`, you can follow these instructions to easily add new syntaxes to your current `bat` installation.

`bat` uses the excellent [`syntect`](https://github.com/trishume/syntect/) library for syntax highlighting. `syntect` can read any [Sublime Text `.sublime-syntax` file](https://www.sublimetext.com/docs/3/syntax.html) and theme.

A good resource for finding Sublime Syntax packages is [Package Control](https://packagecontrol.io/). Once you found a syntax:

1.  Create a folder with syntax definition files:
    
    mkdir -p "$(bat --config-dir)/syntaxes"
    cd "$(bat --config-dir)/syntaxes"
    
    # Put new '.sublime-syntax' language definition files
    # in this folder (or its subdirectories), for example:
    git clone https://github.com/tellnobody1/sublime-purescript-syntax
    
2.  Now use the following command to parse these files into a binary cache:
    
3.  Finally, use `bat --list-languages` to check if the new languages are available.
    
    If you ever want to go back to the default settings, call:
    
4.  If you think that a specific syntax should be included in `bat` by default, please consider opening a "syntax request" ticket after reading the policies and instructions [here](https://github.com/sharkdp/bat/blob/master/doc/assets.md): [Open Syntax Request](https://github.com/sharkdp/bat/issues/new?labels=syntax-request&template=syntax_request.md).
    

### Adding new themes

This works very similar to how we add new syntax definitions.

First, create a folder with the new syntax highlighting themes:

mkdir -p "$(bat --config-dir)/themes"
cd "$(bat --config-dir)/themes"

# Download a theme in '.tmTheme' format, for example:
git clone https://github.com/greggb/sublime-snazzy

# Update the binary cache
bat cache --build

Finally, use `bat --list-themes` to check if the new themes are available.

### Adding or changing file type associations

You can add new (or change existing) file name patterns using the `--map-syntax` command line option. The option takes an argument of the form `pattern:syntax` where `pattern` is a glob pattern that is matched against the file name and the absolute file path. The `syntax` part is the full name of a supported language (use `bat --list-languages` for an overview).

Note: You probably want to use this option as an entry in `bat`s configuration file instead of passing it on the command line (see below).

Example: To use "INI" syntax highlighting for all files with a `.conf` file extension, use

--map-syntax='*.conf:INI'

Example: To open all files called `.ignore` (exact match) with the "Git Ignore" syntax, use:

--map-syntax='.ignore:Git Ignore'

Example: To open all `.conf` files in subfolders of `/etc/apache2` with the "Apache Conf" syntax, use (this mapping is already built in):

--map-syntax='/etc/apache2/**/*.conf:Apache Conf'

### Using a different pager

`bat` uses the pager that is specified in the `PAGER` environment variable. If this variable is not set, `less` is used by default. If you want to use a different pager, you can either modify the `PAGER` variable or set the `BAT_PAGER` environment variable to override what is specified in `PAGER`.

**Note**: If `PAGER` is `more` or `most`, `bat` will silently use `less` instead to ensure support for colors.

If you want to pass command-line arguments to the pager, you can also set them via the `PAGER`/`BAT_PAGER` variables:

export BAT_PAGER="less -RF"

Instead of using environment variables, you can also use `bat`s [configuration file](https://github.com/sharkdp/bat#configuration-file) to configure the pager (`--pager` option).

**Note**: By default, if the pager is set to `less` (and no command-line options are specified), `bat` will pass the following command line options to the pager: `-R`/`--RAW-CONTROL-CHARS`, `-F`/`--quit-if-one-screen` and `-X`/`--no-init`. The last option (`-X`) is only used for `less` versions older than 530.

The `-R` option is needed to interpret ANSI colors correctly. The second option (`-F`) instructs less to exit immediately if the output size is smaller than the vertical size of the terminal. This is convenient for small files because you do not have to press `q` to quit the pager. The third option (`-X`) is needed to fix a bug with the `--quit-if-one-screen` feature in old versions of `less`. Unfortunately, it also breaks mouse-wheel support in `less`.

If you want to enable mouse-wheel scrolling on older versions of `less`, you can pass just `-R` (as in the example above, this will disable the quit-if-one-screen feature). For less 530 or newer, it should work out of the box.

### Indentation

`bat` expands tabs to 4 spaces by itself, not relying on the pager. To change this, simply add the `--tabs` argument with the number of spaces you want to be displayed.

**Note**: Defining tab stops for the pager (via the `--pager` argument by `bat`, or via the `LESS` environment variable for `less`) won't be taken into account because the pager will already get expanded spaces instead of tabs. This behaviour is added to avoid indentation issues caused by the sidebar. Calling `bat` with `--tabs=0` will override it and let tabs be consumed by the pager.

### Dark mode

If you make use of the dark mode feature in macOS, you might want to configure `bat` to use a different theme based on the OS theme. The following snippet uses the `default` theme when in the _dark mode_ and the `GitHub` theme when in the _light mode_.

alias cat="bat --theme=\$(defaults read -globalDomain AppleInterfaceStyle &> /dev/null && echo default || echo GitHub)"

## Configuration file

`bat` can also be customized with a configuration file. The location of the file is dependent on your operating system. To get the default path for your system, call

Alternatively, you can use the `BAT_CONFIG_PATH` environment variable to point `bat` to a non-default location of the configuration file:

export BAT_CONFIG_PATH="/path/to/bat.conf"

A default configuration file can be created with the `--generate-config-file` option.

bat --generate-config-file

### Format

The configuration file is a simple list of command line arguments. Use `bat --help` to see a full list of possible options and values. In addition, you can add comments by prepending a line with the `#` character.

Example configuration file:

# Set the theme to "TwoDark"
--theme="TwoDark"

# Show line numbers, Git modifications and file header (but no grid)
--style="numbers,changes,header"

# Use italic text on the terminal (not supported on all terminals)
--italic-text=always

# Use C++ syntax for Arduino .ino files
--map-syntax "*.ino:C++"

## Using `bat` on Windows

`bat` mostly works out-of-the-box on Windows, but a few features may need extra configuration.

### Prerequisites

You will need to install the [Visual C++ Redistributable](https://support.microsoft.com/en-us/help/2977003/the-latest-supported-visual-c-downloads) package.

### Paging

Windows only includes a very limited pager in the form of `more`. You can download a Windows binary for `less` [from its homepage](http://www.greenwoodsoftware.com/less/download.html) or [through Chocolatey](https://chocolatey.org/packages/Less). To use it, place the binary in a directory in your `PATH` or [define an environment variable](https://github.com/#using-a-different-pager). The [Chocolatey package](https://github.com/#on-windows) installs `less` automatically.

### Colors

Windows 10 natively supports colors in both `conhost.exe` (Command Prompt) and PowerShell since [v1511](https://en.wikipedia.org/wiki/Windows_10_version_history#Version_1511_(November_Update)), as well as in newer versions of bash. On earlier versions of Windows, you can use [Cmder](http://cmder.net/), which includes [ConEmu](https://conemu.github.io/).

**Note:** The Git and MSYS versions of `less` do not correctly interpret colors on Windows. If you don’t have any other pagers installed, you can disable paging entirely by passing `--paging=never` or by setting `BAT_PAGER` to an empty string.

### Cygwin

`bat` on Windows does not natively support Cygwin's unix-style paths (`/cygdrive/*`). When passed an absolute cygwin path as an argument, `bat` will encounter the following error: `The system cannot find the path specified. (os error 3)`

This can be solved by creating a wrapper or adding the following function to your `.bash_profile` file:

bat() {
    local index
    local args=("$@")
    for index in $(seq 0 ${#args[@]}) ; do
        case "${args[index]}" in
        -*) continue;;
        *)  [ -e "${args[index]}" ] && args[index]="$(cygpath --windows "${args[index]}")";;
        esac
    done
    command bat "${args[@]}"
}

## Troubleshooting

### Terminals & colors

`bat` handles terminals _with_ and _without_ truecolor support. However, the colors in most syntax highlighting themes are not optimized for 8-bit colors. It is therefore strongly recommended that you use a terminal with 24-bit truecolor support (`terminator`, `konsole`, `iTerm2`, ...), or use one of the basic [8-bit themes](https://github.com/#8-bit-themes) designed for a restricted set of colors. See [this article](https://gist.github.com/XVilka/8346728) for more details and a full list of terminals with truecolor support.

Make sure that your truecolor terminal sets the `COLORTERM` variable to either `truecolor` or `24bit`. Otherwise, `bat` will not be able to determine whether or not 24-bit escape sequences are supported (and fall back to 8-bit colors).

### Line numbers and grid are hardly visible

Please try a different theme (see `bat --list-themes` for a list). The `OneHalfDark` and `OneHalfLight` themes provide grid and line colors that are brighter.

### File encodings

`bat` natively supports UTF-8 as well as UTF-16. For every other file encoding, you may need to convert to UTF-8 first because the encodings can typically not be auto-detected. You can `iconv` to do so. Example: if you have a PHP file in Latin-1 (ISO-8859-1) encoding, you can call:

iconv -f ISO-8859-1 -t UTF-8 my-file.php | bat

Note: you might have to use the `-l`/`--language` option if the syntax can not be auto-detected by `bat`.

## Development

# Recursive clone to retrieve all submodules
git clone --recursive https://github.com/sharkdp/bat

# Build (debug version)
cd bat
cargo build --bins

# Run unit tests and integration tests
cargo test

# Install (release version)
cargo install --path . --locked

# Build a bat binary with modified syntaxes and themes
bash assets/create.sh
cargo install --path . --locked --force

If you want to build an application that uses `bat`s pretty-printing features as a library, check out the [the API documentation](https://docs.rs/bat/). Note that you have to use either `regex-onig` or `regex-fancy` as a feature when you depend on `bat` as a library.

## Contributing

Take a look at the [`CONTRIBUTING.md`](https://github.com/sharkdp/bat/blob/master/CONTRIBUTING.md) guide.

## Maintainers

-   [sharkdp](https://github.com/sharkdp)
-   [eth-p](https://github.com/eth-p)
-   [keith-hall](https://github.com/keith-hall)
-   [Enselic](https://github.com/Enselic)

## Security vulnerabilities

Please contact [David Peter](https://david-peter.de/) via email if you want to report a vulnerability in `bat`.

## Project goals and alternatives

`bat` tries to achieve the following goals:

-   Provide beautiful, advanced syntax highlighting
-   Integrate with Git to show file modifications
-   Be a drop-in replacement for (POSIX) `cat`
-   Offer a user-friendly command-line interface

There are a lot of alternatives, if you are looking for similar programs. See [this document](https://github.com/sharkdp/bat/blob/master/doc/alternatives.md) for a comparison.

## License

Copyright (c) 2018-2021 [bat-developers](https://github.com/sharkdp/bat).

`bat` is made available under the terms of either the MIT License or the Apache License 2.0, at your option.

See the [LICENSE-APACHE](https://github.com/sharkdp/bat/blob/master/LICENSE-APACHE) and [LICENSE-MIT](https://github.com/sharkdp/bat/blob/master/LICENSE-MIT) files for license details.