[[ReadItLater]] [[Article]]

# [GitHub - yzhang-gh/vscode-markdown: Markdown All in One](https://github.com/yzhang-gh/vscode-markdown)

## Markdown Support for Visual Studio Code

[![version](https://camo.githubusercontent.com/61871ff001b4f58464cbe0603257dceb071e70b544eee3642d6363e87285f47f/68747470733a2f2f696d672e736869656c64732e696f2f7673636f64652d6d61726b6574706c6163652f762f797a68616e672e6d61726b646f776e2d616c6c2d696e2d6f6e652e7376673f7374796c653d666c61742d737175617265266c6162656c3d7673636f64652532306d61726b6574706c616365)](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) [![installs](https://camo.githubusercontent.com/46f69b65385f6d7a2fbea41fe2a584e3f49caab8c0333c5912c9145896b04141/68747470733a2f2f696d672e736869656c64732e696f2f7673636f64652d6d61726b6574706c6163652f642f797a68616e672e6d61726b646f776e2d616c6c2d696e2d6f6e652e7376673f7374796c653d666c61742d737175617265)](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) [![GitHub Workflow Status](https://camo.githubusercontent.com/b17013711d66fb4b71697adab0e584e9e609a0ce3482f63d6edfe4af13c7fa30/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f776f726b666c6f772f7374617475732f797a68616e672d67682f7673636f64652d6d61726b646f776e2f43493f7374796c653d666c61742d737175617265)](https://github.com/yzhang-gh/vscode-markdown/actions) [![GitHub stars](https://camo.githubusercontent.com/e18b0e4b2e9ea218575b7163e2fe6d1ed91aa82f18ef13a81ae3692d912dc5ff/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f73746172732f797a68616e672d67682f7673636f64652d6d61726b646f776e2e7376673f7374796c653d666c61742d737175617265266c6162656c3d6769746875622532307374617273)](https://github.com/yzhang-gh/vscode-markdown) [![GitHub Contributors](https://camo.githubusercontent.com/f0e19b5ca6977d024beb79cc723375425fb6dd7000d9b4acd101c09aaae94a2e/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f636f6e7472696275746f72732f797a68616e672d67682f7673636f64652d6d61726b646f776e2e7376673f7374796c653d666c61742d737175617265)](https://github.com/yzhang-gh/vscode-markdown/graphs/contributors)

All you need for Markdown (keyboard shortcuts, table of contents, auto preview and more).

_**Note**_: VS Code has basic Markdown support out-of-the-box (e.g, **Markdown preview**), please see the [official documentation](https://code.visualstudio.com/docs/languages/markdown) for more information.

**Table of Contents**

-   [Features](https://github.com/#features)
    -   [Keyboard shortcuts](https://github.com/#keyboard-shortcuts)
    -   [Table of contents](https://github.com/#table-of-contents)
    -   [List editing](https://github.com/#list-editing)
    -   [Print Markdown to HTML](https://github.com/#print-markdown-to-html)
    -   [GitHub Flavored Markdown](https://github.com/#github-flavored-markdown)
    -   [Math](https://github.com/#math)
    -   [Auto completions](https://github.com/#auto-completions)
    -   [Others](https://github.com/#others)
-   [Available Commands](https://github.com/#available-commands)
-   [Keyboard Shortcuts](https://github.com/#keyboard-shortcuts-1)
-   [Supported Settings](https://github.com/#supported-settings)
-   [FAQ](https://github.com/#faq)
    -   [Q: Error "command 'markdown.extension.onXXXKey' not found"](https://github.com/#q-error-command-markdownextensiononxxxkey-not-found)
    -   [Q: Which Markdown syntax is supported?](https://github.com/#q-which-markdown-syntax-is-supported)
    -   [Q: This extension has overridden some of my key bindings (e.g. Ctrl + B, Alt + C)](https://github.com/#q-this-extension-has-overridden-some-of-my-key-bindings-eg-ctrl--b-alt--c)
    -   [Q: The extension is unresponsive, causing lag etc. (performance issues)](https://github.com/#q-the-extension-is-unresponsive-causing-lag-etc-performance-issues)
-   [Changelog](https://github.com/#changelog)
-   [Latest Development Build](https://github.com/#latest-development-build)
-   [Contributing](https://github.com/#contributing)
-   [Related](https://github.com/#related)

## Features

### Keyboard shortcuts

[![toggle bold gif](https://github.com/yzhang-gh/vscode-markdown/raw/master/images/gifs/toggle-bold.gif)](https://github.com/yzhang-gh/vscode-markdown/raw/master/images/gifs/toggle-bold.gif)  
(Typo: multiple words)

[![check task list](https://github.com/yzhang-gh/vscode-markdown/raw/master/images/gifs/check-task-list.gif)](https://github.com/yzhang-gh/vscode-markdown/raw/master/images/gifs/check-task-list.gif)

See full key binding list in the [keyboard shortcuts](https://github.com/#keyboard-shortcuts-1) section

### Table of contents

[![toc](https://github.com/yzhang-gh/vscode-markdown/raw/master/images/toc.png)](https://github.com/yzhang-gh/vscode-markdown/raw/master/images/toc.png)

-   Run command "**Create Table of Contents**" (in the [VS Code Command Palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette)) to insert a new table of contents.
    
-   The TOC is **automatically updated** on file save by default. To disable, please change the `toc.updateOnSave` option.
    
-   The **indentation type (tab or spaces)** of TOC can be configured per file. Find the setting in the right bottom corner of VS Code's status bar.
    
    _**Note**_: Be sure to also check the `list.indentationSize` option.
    
-   To make TOC **compatible with GitHub or GitLab**, set option `slugifyMode` accordingly
    
-   Three ways to **control which headings are present** in the TOC:
    
    Click to expand
    
    1.  Add `<!-- omit in toc -->` at the end of a heading to ignore it in TOC  
        (It can also be placed above a heading)
        
    2.  Use `toc.levels` setting.
        
    3.  You can also use the `toc.omittedFromToc` setting to omit some headings (and their subheadings) from TOC:
        
        // In your settings.json
        "markdown.extension.toc.omittedFromToc": {
          // Use a path relative to your workspace.
          "README.md": [
              "# Introduction",
              "## Also omitted",
          ],
          // Or an absolute path for standalone files.
          "/home/foo/Documents/todo-list.md": [
            "## Shame list (I'll never do these)",
          ]
        }
        
        _**Note**_:
        
        -   Setext headings (underlined with `===` or `---`) can also be omitted, just put their `#` and `##` versions in the setting, respectively.
        -   When omitting heading, **make sure headings within a document are unique**. Duplicate headings may lead to unpredictable behavior.
    
-   Easily add/update/remove **section numbering**
    
    [![section numbers](https://github.com/yzhang-gh/vscode-markdown/raw/master/images/gifs/section-numbers.gif)](https://github.com/yzhang-gh/vscode-markdown/raw/master/images/gifs/section-numbers.gif)
-   _In case you are seeing **unexpected TOC recognition**, you can add a `<!-- no toc -->` comment above the list_.
    

### List editing

[![on enter key](https://github.com/yzhang-gh/vscode-markdown/raw/master/images/gifs/on-enter-key.gif)](https://github.com/yzhang-gh/vscode-markdown/raw/master/images/gifs/on-enter-key.gif)

[![on tab/backspace key](https://github.com/yzhang-gh/vscode-markdown/raw/master/images/gifs/tab-backspace.gif)](https://github.com/yzhang-gh/vscode-markdown/raw/master/images/gifs/tab-backspace.gif)

[![fix ordered list markers](https://github.com/yzhang-gh/vscode-markdown/raw/master/images/gifs/fix-marker.gif)](https://github.com/yzhang-gh/vscode-markdown/raw/master/images/gifs/fix-marker.gif)

_**Note**_: By default, this extension tries to determine indentation size for different lists according to [CommonMark Spec](https://spec.commonmark.org/0.29/#list-items). If you prefer to use a fixed tab size, please change the `list.indentationSize` setting.

### Print Markdown to HTML

-   Commands `Markdown: Print current document to HTML` and `Markdown: Print documents to HTML` (batch mode)
    
-   **Compatible** with other installed Markdown plugins (e.g. [Markdown Footnotes](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-footnotes)) The exported HTML should look the same as inside VS Code.
    
-   Use comment `<!-- title: Your Title -->` to specify a title of the exported HTML.
    
-   Plain links to `.md` files will be converted to `.html`.
    
-   It's recommended to print the exported HTML to PDF with browser (e.g. Chrome) if you want to share your documents with others.
    

### GitHub Flavored Markdown

-   Table formatter
    
    [![table formatter](https://github.com/yzhang-gh/vscode-markdown/raw/master/images/gifs/table-formatter.gif)](https://github.com/yzhang-gh/vscode-markdown/raw/master/images/gifs/table-formatter.gif)
    
    _**Note**_: The key binding is Ctrl + Shift + I on Linux. See [Visual Studio Code Key Bindings](https://code.visualstudio.com/docs/getstarted/keybindings#_keyboard-shortcuts-reference).
    
-   Task lists
    

### Math

[![math](https://github.com/yzhang-gh/vscode-markdown/raw/master/images/math.png)](https://github.com/yzhang-gh/vscode-markdown/raw/master/images/math.png)

Please use [Markdown+Math](https://marketplace.visualstudio.com/items?itemName=goessner.mdmath) for dedicated math support. Be sure to disable `math.enabled` option of this extension.

### Auto completions

Tip: also support the option `completion.root`

-   Images/Files (respects option `search.exclude`)
    
    [![image completions](https://github.com/yzhang-gh/vscode-markdown/raw/master/images/image-completions.png)](https://github.com/yzhang-gh/vscode-markdown/raw/master/images/image-completions.png)
    
-   Math functions (including option `katex.macros`)
    
    [![math completions](https://github.com/yzhang-gh/vscode-markdown/raw/master/images/math-completions.png)](https://github.com/yzhang-gh/vscode-markdown/raw/master/images/math-completions.png)
    
-   Reference links
    
    [![reference links](https://github.com/yzhang-gh/vscode-markdown/raw/master/images/reference-link.png)](https://github.com/yzhang-gh/vscode-markdown/raw/master/images/reference-link.png)
    

### Others

-   Paste link on selected text
    
    [![paste link](https://github.com/yzhang-gh/vscode-markdown/raw/master/images/gifs/paste-link.gif)](https://github.com/yzhang-gh/vscode-markdown/raw/master/images/gifs/paste-link.gif)
    
-   Override "Open Preview" keybinding with "Toggle Preview", which means you can close preview using the same keybinding (Ctrl + Shift + V or Ctrl + K V).
    

## Available Commands

-   Markdown All in One: Create Table of Contents
-   Markdown All in One: Update Table of Contents
-   Markdown All in One: Add/Update section numbers
-   Markdown All in One: Remove section numbers
-   Markdown All in One: Toggle code span
-   Markdown All in One: Toggle code block
-   Markdown All in One: Print current document to HTML
-   Markdown All in One: Print documents to HTML
-   Markdown All in One: Toggle math environment
-   Markdown All in One: Toggle list
    -   It will cycle through list markers (`-`, `*`, `+`, `1.` and `1)`)

## Keyboard Shortcuts

Table

Key

Command

Ctrl/Cmd + B

Toggle bold

Ctrl/Cmd + I

Toggle italic

Alt+S (on Windows)

Toggle strikethrough1

Ctrl/Cmd + Shift + ]

Toggle heading (uplevel)

Ctrl/Cmd + Shift + [

Toggle heading (downlevel)

Ctrl/Cmd + M

Toggle math environment

Alt + C

Check/Uncheck task list item

Ctrl/Cmd + Shift + V

Toggle preview

Ctrl/Cmd + K V

Toggle preview to side

1. If the cursor is on a list/task item without selection, strikethrough will be added to the whole item (line)

## Supported Settings

Table

Name

Default

Description

`markdown.extension.completion.respectVscodeSearchExclude`

`true`

Whether to consider `search.exclude` option when providing file path completions

`markdown.extension.completion.root`

Root folder when providing file path completions (It takes effect when the path starts with `/`)

`markdown.extension.italic.indicator`

`*`

Use `*` or `_` to wrap italic text

`markdown.extension.katex.macros`

`{}`

KaTeX macros e.g. `{ "\\name": "expansion", ... }`

`markdown.extension.list.indentationSize`

`adaptive`

Use different indentation size for ordered and unordered list

`markdown.extension.orderedList.autoRenumber`

`true`

Auto fix list markers as you edits

`markdown.extension.orderedList.marker`

`ordered`

Or `one`: always use `1.` as ordered list marker

`markdown.extension.preview.autoShowPreviewToSide`

`false`

Automatically show preview when opening a Markdown file.

`markdown.extension.print.absoluteImgPath`

`true`

Convert image path to absolute path

`markdown.extension.print.imgToBase64`

`false`

Convert images to base64 when printing to HTML

`markdown.extension.print.includeVscodeStylesheets`

`true`

Whether to include VS Code's default styles

`markdown.extension.print.onFileSave`

`false`

Print to HTML on file save

`markdown.extension.print.theme`

`light`

Theme of the exported HTML

`markdown.extension.print.validateUrls`

`true`

Enable/disable URL validation when printing

`markdown.extension.syntax.decorations`

`true`

Add decorations to ~~strikethrough~~ and `code span`

`markdown.extension.syntax.decorationFileSizeLimit`

50000

Don't render syntax decorations if a file is larger than this size (in byte/B)

`markdown.extension.syntax.plainTheme`

`false`

A distraction-free theme

`markdown.extension.tableFormatter.enabled`

`true`

Enable GFM table formatter

`markdown.extension.toc.slugifyMode`

`github`

Slugify mode for TOC link generation (`vscode`, `github`, `gitlab` or `gitea`)

`markdown.extension.toc.omittedFromToc`

`{}`

Lists of headings to omit by project file (e.g. `{ "README.md": ["# Introduction"] }`)

`markdown.extension.toc.levels`

`1..6`

Control the heading levels to show in the table of contents.

`markdown.extension.toc.orderedList`

`false`

Use ordered list in the table of contents.

`markdown.extension.toc.plaintext`

`false`

Just plain text.

`markdown.extension.toc.unorderedList.marker`

`-`

Use `-`, `*` or `+` in the table of contents (for unordered list)

`markdown.extension.toc.updateOnSave`

`true`

Automatically update the table of contents on save.

## FAQ

#### Q: Error "command 'markdown.extension.onXXXKey' not found"

-   In most cases, it is because VS Code **needs a few seconds to load** this extension when you open a Markdown file _for the first time_. (You will see a message "Activating Extensions..." on the status bar.)
    
-   If you still see this "command not found" error after waiting for a long time, please try to **restart** VS Code. If needed, **reinstall** this extension:
    
    1.  Uninstall this extension.
    2.  **Close and restart VS Code. (important!)**
    3.  Reinstall this extension.
-   If it doesn't help, feel free to open a new issue on [GitHub](https://github.com/yzhang-gh/vscode-markdown/issues/new/choose). It would be better if you can report any suspicious error information to us: It's usually in VS Code's menubar **Help** > **Toggle Developer Tools** > **Console**.
    
-   (As a last resort, you may choose to delete `onXXXKey` keys through [VS Code's Keyboard Shortcuts editor](https://code.visualstudio.com/docs/getstarted/keybindings) if you do not need the [list editing feature](https://github.com/yzhang-gh/vscode-markdown#list-editing) at all.)
    

#### Q: Which Markdown syntax is supported?

-   [CommonMark](https://spec.commonmark.org/)
-   [Tables](https://help.github.com/articles/organizing-information-with-tables/), [strikethrough](https://help.github.com/articles/basic-writing-and-formatting-syntax/#styling-text) and [task lists](https://docs.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax#task-lists) (from GitHub Flavored Markdown)
-   [Math support](https://github.com/waylonflinn/markdown-it-katex#syntax) (from KaTeX)
-   [Front matter](https://github.com/ParkSB/markdown-it-front-matter#valid-front-matter)

For other Markdown syntax, you need to install the corresponding extensions from VS Code marketplace (e.g. [Mermaid diagram](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid), [emoji](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-emoji), [footnotes](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-footnotes) and [superscript](https://marketplace.visualstudio.com/items?itemName=DevHawk.markdown-sup)). Once installed, they will take effect in VS Code and also the exported HTML file.

#### Q: This extension has overridden some of my key bindings (e.g. Ctrl + B, Alt + C)

You can easily manage key bindings with [VS Code's **Keyboard Shortcuts** editor](https://code.visualstudio.com/docs/getstarted/keybindings). (Commands provided by this extension have prefix `markdown.extension`.)

#### Q: The extension is unresponsive, causing lag etc. (performance issues)

From experience, there is _a good chance_ that the performance issues are caused by _other extensions_ (e.g., some spell checker extensions).

This can be verified if you try again with all other extensions disabled (execute `Developer: Reload with Extensions Disabled` or `Extensions: Disable All Installed Extensions for this Workspace` in the VS Code command Palette) and then enable this extension.

To find out the root cause, you can install our [development build](https://github.com/#latest-development-build) (`debug.vsix`) and create a CPU profile following this official [instruction](https://github.com/microsoft/vscode/wiki/Performance-Issues#profile-the-running-extensions) from the VS Code. And then please open a GitHub issue with that profile (`.cpuprofile.txt`) attached.

## Changelog

See [CHANGELOG](https://github.com/yzhang-gh/vscode-markdown/blob/master/CHANGELOG.md) for more information.

## Latest Development Build

Download it [here](https://github.com/yzhang-gh/vscode-markdown/actions/workflows/main.yml?query=event%3Apush+is%3Asuccess), please click the latest passing event to download artifacts.

There are two versions: `markdown-all-in-one-*.vsix` is the regular build, while `debug.vsix` is used to create a verbose CPU profile.

To install, execute `Extensions: Install from VSIX...` in the VS Code Command Palette (`ctrl + shift + p`)

## Contributing

-   File bugs, feature requests in [GitHub Issues](https://github.com/yzhang-gh/vscode-markdown/issues).
-   Leave a review on [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one#review-details).
-   Buy me a coffee ☕ (via [PayPal](https://www.paypal.me/2yzhang), [Alipay or WeChat](https://github.com/yzhang-gh/vscode-markdown/blob/master/donate.md)).

Special thanks to the collaborator [@Lemmingh](https://github.com/Lemmingh) and all other [contributors](https://github.com/yzhang-gh/vscode-markdown/graphs/contributors).

[![](https://camo.githubusercontent.com/fcff5e0ab14b3209e7843d83b19f924f695c22263236472bbb22369df1eea6af/68747470733a2f2f736f757263657265722e696f2f66616d652f797a68616e672d67682f797a68616e672d67682f7673636f64652d6d61726b646f776e2f696d616765732f30)](https://sourcerer.io/fame/yzhang-gh/yzhang-gh/vscode-markdown/links/0)[![](https://camo.githubusercontent.com/65044a7b159024eb2a4d84fe0815f8007c5bdeedbe4973202ae4f28d93af000e/68747470733a2f2f736f757263657265722e696f2f66616d652f797a68616e672d67682f797a68616e672d67682f7673636f64652d6d61726b646f776e2f696d616765732f31)](https://sourcerer.io/fame/yzhang-gh/yzhang-gh/vscode-markdown/links/1)[![](https://camo.githubusercontent.com/c1a82b7cb07bf9b5f5bfdd74e6a369b8b4533d4361f0ad750d6318d67e9204de/68747470733a2f2f736f757263657265722e696f2f66616d652f797a68616e672d67682f797a68616e672d67682f7673636f64652d6d61726b646f776e2f696d616765732f32)](https://sourcerer.io/fame/yzhang-gh/yzhang-gh/vscode-markdown/links/2)[![](https://camo.githubusercontent.com/859414862b33198cba52b49afbb6f5da4a6838c8bfa85a06e7b2927a1c4323bd/68747470733a2f2f736f757263657265722e696f2f66616d652f797a68616e672d67682f797a68616e672d67682f7673636f64652d6d61726b646f776e2f696d616765732f33)](https://sourcerer.io/fame/yzhang-gh/yzhang-gh/vscode-markdown/links/3)[![](https://camo.githubusercontent.com/0d257385a6d6d76613e5514aa93860ccbc77977dd37b1b6cc6b763ba9dee4891/68747470733a2f2f736f757263657265722e696f2f66616d652f797a68616e672d67682f797a68616e672d67682f7673636f64652d6d61726b646f776e2f696d616765732f34)](https://sourcerer.io/fame/yzhang-gh/yzhang-gh/vscode-markdown/links/4)[![](https://camo.githubusercontent.com/449089111bc241fa5ee0477362a12b4cb4acc2e4d6beb21d086eb5bdd379d9dc/68747470733a2f2f736f757263657265722e696f2f66616d652f797a68616e672d67682f797a68616e672d67682f7673636f64652d6d61726b646f776e2f696d616765732f35)](https://sourcerer.io/fame/yzhang-gh/yzhang-gh/vscode-markdown/links/5)[![](https://camo.githubusercontent.com/f8e6c3020f40c6edffe9cdeb6ba271c752cfa32beea1f9be9da6f07bc9932101/68747470733a2f2f736f757263657265722e696f2f66616d652f797a68616e672d67682f797a68616e672d67682f7673636f64652d6d61726b646f776e2f696d616765732f36)](https://sourcerer.io/fame/yzhang-gh/yzhang-gh/vscode-markdown/links/6)[![](https://camo.githubusercontent.com/f240b26fabd3a81236911e4c76b390c9713b0f47e4fceca8c2eeaa63efbc54eb/68747470733a2f2f736f757263657265722e696f2f66616d652f797a68616e672d67682f797a68616e672d67682f7673636f64652d6d61726b646f776e2f696d616765732f37)](https://sourcerer.io/fame/yzhang-gh/yzhang-gh/vscode-markdown/links/7)

---

## Related

[More extensions of mine](https://marketplace.visualstudio.com/publishers/yzhang)