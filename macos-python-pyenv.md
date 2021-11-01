
[[macos]]-[[macos-python]]

---

# [[macos-python-pyenv]]

## Preparations:

- [[macos-xcode-command-line-tools#Install]]
- [[homebrew#Install]]
- `brew install openssl readline sqlite3 xz zlib`
- `brew update && brew upgrade`
- `brew doctor`

## Install
 - `brew install pyenv`
 - `brew doctor`

To avoid them accidentally linking against a Pyenv-provided Python, add the following line into your interactive shell's configuration (Bash/Zsh):    
   ` alias brew='env PATH="${PATH//$(pyenv root)\/shims:/}" brew'`
   
   **Configure your shell's environment for Pyenv**
   
   For **Zsh**:

-   **MacOS, if Pyenv is installed with Homebrew:**
    
	```
	echo 'eval "$(pyenv init --path)"' >> ~/.zprofile
    echo 'eval "$(pyenv init -)"' >> ~/.zshrc
	```
	
	```
	brew install pyenv-virtualenv
	```

## Troubleshooting pyenv Installation

If you encounter an error that "C compiler cannot create executables" then the simplest way to solve this is to reinstall Apple's Xcode.

Xcode is a tool created by Apple that includes all the C libraries and other tools that Python uses when it runs on MacOS. Xcode is a whopping 11 gigabytes, but you'll want to be up-to-date. You may want to run this while you're sleeping.

You can [get the latest version of Apple's Xcode here](https://developer.apple.com/download/). I had to do this after upgrading to MacOS Big Sur, but once I did, all the following commands worked fine. Just re-run the above `pyenv install 3.9.2` and it should now work.

## Resources 
https://github.com/pyenv/pyenv/wiki#suggested-build-environment

https://github.com/pyenv/pyenv-virtualenv

https://www.freecodecamp.org/news/python-version-on-mac-update/

https://binx.io/blog/2019/04/12/installing-pyenv-on-macos/