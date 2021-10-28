---
aliases: MacOS Setup Python with PyEnv
---

---

[[macos-setup-python]]

---

# [[macos-setup-python-pyenv|MacOS Setup Python with PyEnv]]


1. Xcode Command Line Tools: `xcode-select --install`
2. [Homebrew](http://brew.sh/) 
3. `brew install openssl readline sqlite3 xz zlib`
4. `brew update`
5. `brew install pyenv`
6. `brew doctor`

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