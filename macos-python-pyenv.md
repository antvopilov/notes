
[[macos]]-[[macos-python]]

---

# [[macos-python-pyenv]]

## Preparations:

- [[macos-xcode-command-line-tools#Install]]
- [[macos-homebrew#Install]]
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


## Resources 
https://github.com/pyenv/pyenv/wiki#suggested-build-environment

https://github.com/pyenv/pyenv-virtualenv

https://binx.io/blog/2019/04/12/installing-pyenv-on-macos/