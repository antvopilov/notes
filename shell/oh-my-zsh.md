![](https://repository-images.githubusercontent.com/291137/fb009080-6110-11e9-82c2-b21ca7831f5c)

[[shell]] [[zsh]] [[../terrminal/terminal]] [[command-line-interface/command-line-interface]]
# [[oh-my-zsh]]

A delightful community-driven (with 1900+ contributors) framework for managing your zsh configuration. Includes 300+ optional plugins (rails, git, macOS, hub, docker, homebrew, node, php, python, etc), 140+ themes to spice up your morning, and an auto-update tool so that makes it easy to keep up with the latest updates from the community.

---

# Install

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)
```

# [GitHub - ohmyzsh/ohmyzsh: 🙃   A delightful community-driven (with 1900+ contributors) framework for managing your zsh configuration. Includes 300+ optional plugins (rails, git, macOS, hub, docker, homebrew, node, php, python, etc), 140+ themes to spice up your morning, and an auto-update tool so that makes it easy to keep up with the latest updates from the community.](https://github.com/ohmyzsh/ohmyzsh)
 You can’t perform that action at this time.

You signed in with another tab or window. [Reload](https://github.com/ohmyzsh/ohmyzsh) to refresh your session.You signed out in another tab or window. [Reload](https://github.com/ohmyzsh/ohmyzsh) to refresh your session.

# [ohmyzsh/README.md at master · ohmyzsh/ohmyzsh · GitHub](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md)
[![Oh My Zsh](https://camo.githubusercontent.com/3ec75cb1c3278cce3c661d3bcf72a4eca75db241a6ace648ea014b02f3f44458/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6f686d797a73682f6f682d6d792d7a73682d6c6f676f2e706e67)](https://camo.githubusercontent.com/3ec75cb1c3278cce3c661d3bcf72a4eca75db241a6ace648ea014b02f3f44458/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6f686d797a73682f6f682d6d792d7a73682d6c6f676f2e706e67)

Oh My Zsh is an open source, community-driven framework for managing your [zsh](https://www.zsh.org/) configuration.

Sounds boring. Let's try again.

**Oh My Zsh will not make you a 10x developer...but you may feel like one.**

Once installed, your terminal shell will become the talk of the town *or your money back!* With each keystroke in your command prompt, you'll take advantage of the hundreds of powerful plugins and beautiful themes. Strangers will come up to you in cafés and ask you, *"that is amazing! are you some sort of genius?"*

Finally, you'll begin to get the sort of attention that you have always felt you deserved. ...or maybe you'll use the time that you're saving to start flossing more often. 😬

To learn more, visit [ohmyz.sh](https://ohmyz.sh), follow [@ohmyzsh](https://twitter.com/ohmyzsh) on Twitter, and join us on [Discord](https://discord.gg/ohmyzsh).

[![CI](https://github.com/ohmyzsh/ohmyzsh/workflows/CI/badge.svg)](https://github.com/ohmyzsh/ohmyzsh/actions?query=workflow%3ACI)[![Follow @ohmyzsh](https://camo.githubusercontent.com/11a416635f3d1f03b7a97eac9d92f96b165ffe65a18199d50503e1e5f3c7b633/68747470733a2f2f696d672e736869656c64732e696f2f747769747465722f666f6c6c6f772f6f686d797a73683f6c6162656c3d466f6c6c6f772b406f686d797a7368267374796c653d666c6174)](https://twitter.com/intent/follow?screen_name=ohmyzsh)[![Discord server](https://camo.githubusercontent.com/64e8b917c8acd4f1b4c183948adc71b474cd574e5b36882f06c13631ad57ec6f/68747470733a2f2f696d672e736869656c64732e696f2f646973636f72642f363432343936383636343037323834373436)](https://discord.gg/ohmyzsh)[![Gitpod ready](https://camo.githubusercontent.com/eed956a921d6c38546e378ad7ee005b423b76361eef47db35b6afb2c71c8a090/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f476974706f642d72656164792d626c75653f6c6f676f3d676974706f64)](https://gitpod.io/#https://github.com/ohmyzsh/ohmyzsh)

[](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#getting-started)Getting Started
----------

### [](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#prerequisites)Prerequisites ###

* A Unix-like operating system: macOS, Linux, BSD. On Windows: WSL2 is preferred, but cygwin or msys also mostly work.
* [Zsh](https://www.zsh.org) should be installed (v4.3.9 or more recent is fine but we prefer 5.0.8 and newer). If not pre-installed (run `zsh --version` to confirm), check the following wiki instructions here: [Installing ZSH](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH)
* `curl` or `wget` should be installed
* `git` should be installed (recommended v2.4.11 or higher)

### [](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#basic-installation)Basic Installation ###

Oh My Zsh is installed by running one of the following commands in your terminal. You can install this via the command-line with either `curl`, `wget` or another similar tool.

| Method  |                                             Command                                             |
|:--------|:------------------------------------------------------------------------------------------------|
|**curl** |`sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`|
|**wget** | `sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"` |
|**fetch**|`sh -c "$(fetch -o - https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`|

#### [](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#manual-inspection)Manual inspection ####

It's a good idea to inspect the install script from projects you don't yet know. You can do
that by downloading the install script first, looking through it so everything looks normal,
then running it:

```
wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh
sh install.sh
```

[](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#using-oh-my-zsh)Using Oh My Zsh
----------

### [](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#plugins)Plugins ###

Oh My Zsh comes with a shitload of plugins for you to take advantage of. You can take a look in the [plugins](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins) directory and/or the [wiki](https://github.com/ohmyzsh/ohmyzsh/wiki/Plugins) to see what's currently available.

#### [](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#enabling-plugins)Enabling Plugins ####

Once you spot a plugin (or several) that you'd like to use with Oh My Zsh, you'll need to enable them in the `.zshrc` file. You'll find the zshrc file in your `$HOME` directory. Open it with your favorite text editor and you'll see a spot to list all the plugins you want to load.

For example, this might begin to look like this:

```
plugins=(
  git
  bundler
  dotenv
  osx
  rake
  rbenv
  ruby
)
```

*Note that the plugins are separated by whitespace (spaces, tabs, new lines...). **Do not** use commas between them or it will break.*

#### [](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#using-plugins)Using Plugins ####

Each plugin includes a **README**, documenting it. This README should show the aliases (if the plugin adds any) and extra goodies that are included in that particular plugin.

### [](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#themes)Themes ###

We'll admit it. Early in the Oh My Zsh world, we may have gotten a bit too theme happy. We have over one hundred and fifty themes now bundled. Most of them have [screenshots](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes) on the wiki (We are working on updating this!). Check them out!

#### [](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#selecting-a-theme)Selecting a Theme ####

*Robby's theme is the default one. It's not the fanciest one. It's not the simplest one. It's just the right one (for him).*

Once you find a theme that you'd like to use, you will need to edit the `~/.zshrc` file. You'll see an environment variable (all caps) in there that looks like:

To use a different theme, simply change the value to match the name of your desired theme. For example:

```
ZSH_THEME="agnoster"# (this is one of the fancy ones)# see https://github.com/ohmyzsh/ohmyzsh/wiki/Themes#agnoster
```

*Note: many themes require installing the [Powerline Fonts](https://github.com/powerline/fonts) in order to render properly.*

Open up a new terminal window and your prompt should look something like this:

[![Agnoster theme](https://cloud.githubusercontent.com/assets/2618447/6316862/70f58fb6-ba03-11e4-82c9-c083bf9a6574.png)](https://cloud.githubusercontent.com/assets/2618447/6316862/70f58fb6-ba03-11e4-82c9-c083bf9a6574.png)

In case you did not find a suitable theme for your needs, please have a look at the wiki for [more of them](https://github.com/ohmyzsh/ohmyzsh/wiki/External-themes).

If you're feeling feisty, you can let the computer select one randomly for you each time you open a new terminal window.

```
ZSH_THEME="random"# (...please let it be pie... please be some pie..)
```

And if you want to pick random theme from a list of your favorite themes:

```
ZSH_THEME_RANDOM_CANDIDATES=(
  "robbyrussell""agnoster"
)
```

If you only know which themes you don't like, you can add them similarly to an ignored list:

```
ZSH_THEME_RANDOM_IGNORED=(pygmalion tjkirch_mod)
```

### [](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#faq)FAQ ###

If you have some more questions or issues, you might find a solution in our [FAQ](https://github.com/ohmyzsh/ohmyzsh/wiki/FAQ).

[](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#advanced-topics)Advanced Topics
----------

If you're the type that likes to get their hands dirty, these sections might resonate.

### [](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#advanced-installation)Advanced Installation ###

Some users may want to manually install Oh My Zsh, or change the default path or other settings that
the installer accepts (these settings are also documented at the top of the install script).

#### [](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#custom-directory)Custom Directory ####

The default location is `~/.oh-my-zsh` (hidden in your home directory, you can access it with `cd ~/.oh-my-zsh`)

If you'd like to change the install directory with the `ZSH` environment variable, either by running`export ZSH=/your/path` before installing, or by setting it before the end of the install pipeline
like this:

```
ZSH="$HOME/.dotfiles/oh-my-zsh" sh install.sh
```

#### [](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#unattended-install)Unattended install ####

If you're running the Oh My Zsh install script as part of an automated install, you can pass the
flag `--unattended` to the `install.sh` script. This will have the effect of not trying to change
the default shell, and also won't run `zsh` when the installation has finished.

```
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)""" --unattended
```

#### [](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#installing-from-a-forked-repository)Installing from a forked repository ####

The install script also accepts these variables to allow installation of a different repository:

* `REPO` (default: `ohmyzsh/ohmyzsh`): this takes the form of `owner/repository`. If you set
  this variable, the installer will look for a repository at `https://github.com/{owner}/{repository}`.

* `REMOTE` (default: `https://github.com/${REPO}.git`): this is the full URL of the git repository
  clone. You can use this setting if you want to install from a fork that is not on GitHub (GitLab,
  Bitbucket...) or if you want to clone with SSH instead of HTTPS (`git@github.com:user/project.git`).

  *NOTE: it's incompatible with setting the `REPO` variable. This setting will take precedence.*

* `BRANCH` (default: `master`): you can use this setting if you want to change the default branch to be
  checked out when cloning the repository. This might be useful for testing a Pull Request, or if you
  want to use a branch other than `master`.

For example:

```
REPO=apjanke/oh-my-zsh BRANCH=edge sh install.sh
```

#### [](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#manual-installation)Manual Installation ####

##### [](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#1-clone-the-repository)1. Clone the repository #####

```
git clone https://github.com/ohmyzsh/ohmyzsh.git ~/.oh-my-zsh
```

##### [](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#2-optionally-backup-your-existing-zshrc-file)2. *Optionally*, backup your existing `~/.zshrc` file #####

##### [](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#3-create-a-new-zsh-configuration-file)3. Create a new zsh configuration file #####

You can create a new zsh config file by copying the template that we have included for you.

```
cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
```

##### [](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#4-change-your-default-shell)4. Change your default shell #####

You must log out from your user session and log back in to see this change.

##### [](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#5-initialize-your-new-zsh-configuration)5. Initialize your new zsh configuration #####

Once you open up a new terminal window, it should load zsh with Oh My Zsh's configuration.

### [](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#installation-problems)Installation Problems ###

If you have any hiccups installing, here are a few common fixes.

* You *might* need to modify your `PATH` in `~/.zshrc` if you're not able to find some commands after
  switching to `oh-my-zsh`.
* If you installed manually or changed the install location, check the `ZSH` environment variable in`~/.zshrc`.

### [](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#custom-plugins-and-themes)Custom Plugins and Themes ###

If you want to override any of the default behaviors, just add a new file (ending in `.zsh`) in the `custom/` directory.

If you have many functions that go well together, you can put them as a `XYZ.plugin.zsh` file in the `custom/plugins/` directory and then enable this plugin.

If you would like to override the functionality of a plugin distributed with Oh My Zsh, create a plugin of the same name in the `custom/plugins/` directory and it will be loaded instead of the one in `plugins/`.

[](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#getting-updates)Getting Updates
----------

By default, you will be prompted to check for updates every 2 weeks. You can choose other update modes by adding a line to your `~/.zshrc` file, **before Oh My Zsh is loaded**:

1. Automatic update without confirmation prompt:

   ```
   zstyle ':omz:update' mode auto
   ```

2. Just offer a reminder every few days, if there are updates available:

   ```
   zstyle ':omz:update' mode reminder
   ```

3. To disable automatic updates entirely:

   ```
   zstyle ':omz:update' mode disabled
   ```

NOTE: you can control how often Oh My Zsh checks for updates with the following setting:

```
# This will check for updates every 7 days
zstyle ':omz:update' frequency 7
# This will check for updates every time you open the terminal (not recommended)
zstyle ':omz:update' frequency 0
```

### [](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#manual-updates)Manual Updates ###

If you'd like to update at any point in time (maybe someone just released a new plugin and you don't want to wait a week?) you just need to run:

Magic! 🎉

[](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#uninstalling-oh-my-zsh)Uninstalling Oh My Zsh
----------

Oh My Zsh isn't for everyone. We'll miss you, but we want to make this an easy breakup.

If you want to uninstall `oh-my-zsh`, just run `uninstall_oh_my_zsh` from the command-line. It will remove itself and revert your previous `bash` or `zsh` configuration.

[](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#how-do-i-contribute-to-oh-my-zsh)How do I contribute to Oh My Zsh?
----------

Before you participate in our delightful community, please read the [code of conduct](https://github.com/ohmyzsh/ohmyzsh/blob/master/CODE_OF_CONDUCT.md).

I'm far from being a [Zsh](https://www.zsh.org/) expert and suspect there are many ways to improve – if you have ideas on how to make the configuration easier to maintain (and faster), don't hesitate to fork and send pull requests!

We also need people to test out pull-requests. So take a look through [the open issues](https://github.com/ohmyzsh/ohmyzsh/issues) and help where you can.

See [Contributing](https://github.com/ohmyzsh/ohmyzsh/blob/master/CONTRIBUTING.md) for more details.

### [](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#do-not-send-us-themes)Do NOT send us themes ###

We have (more than) enough themes for the time being. Please add your theme to the [external themes](https://github.com/ohmyzsh/ohmyzsh/wiki/External-themes) wiki page.

[](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#contributors)Contributors
----------

Oh My Zsh has a vibrant community of happy users and delightful contributors. Without all the time and help from our contributors, it wouldn't be so awesome.

Thank you so much!

[](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#follow-us)Follow Us
----------

We're on social media:

[](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#merchandise)Merchandise
----------

We have [stickers, shirts, and coffee mugs available](https://shop.planetargon.com/collections/oh-my-zsh?utm_source=github) for you to show off your love of Oh My Zsh. Again, you will become the talk of the town!

[](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#license)License
----------

Oh My Zsh is released under the [MIT license](https://github.com/ohmyzsh/ohmyzsh/blob/master/LICENSE.txt).

[](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md#about-planet-argon)About Planet Argon
----------

[![Planet Argon](https://camo.githubusercontent.com/170065022b50bc9f78cdca4c602820da0992b180490a1eb8b5000b154f11c938/68747470733a2f2f70612d6769746875622d6173736574732e73332e616d617a6f6e6177732e636f6d2f504152474f4e5f6c6f676f5f6469676974616c5f434f4c2d736d616c6c2e6a7067)](https://camo.githubusercontent.com/170065022b50bc9f78cdca4c602820da0992b180490a1eb8b5000b154f11c938/68747470733a2f2f70612d6769746875622d6173736574732e73332e616d617a6f6e6177732e636f6d2f504152474f4e5f6c6f676f5f6469676974616c5f434f4c2d736d616c6c2e6a7067)

Oh My Zsh was started by the team at [Planet Argon](https://www.planetargon.com/?utm_source=github), a [Ruby on Rails development agency](https://www.planetargon.com/skills/ruby-on-rails-development?utm_source=github). Check out our [other open source projects](https://www.planetargon.com/open-source?utm_source=github).