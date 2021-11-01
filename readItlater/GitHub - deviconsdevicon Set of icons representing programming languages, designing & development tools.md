[[ReadItLater]] [[Article]]

# [GitHub - devicons/devicon: Set of icons representing programming languages, designing & development tools](https://github.com/devicons/devicon/)

 [![GitHub release (latest by semver)](https://camo.githubusercontent.com/1f8445b94943bf225b94b0eea97a43fb2b9f31f004d6a1a8afc170f5e30f8bcc/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f762f72656c656173652f64657669636f6e732f64657669636f6e3f636f6c6f723d253233363062653836266c6162656c3d4c617465737425323072656c65617365267374796c653d666f722d7468652d626164676526736f72743d73656d766572)](https://github.com/devicons/devicon/releases) [ ![GitHub](https://camo.githubusercontent.com/de5b304d41faac72002e261f1e880ddb16ba631f85e990adec159379e7e04e40/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f64657669636f6e732f64657669636f6e3f636f6c6f723d253233363062653836267374796c653d666f722d7468652d6261646765) ](https://github.com/devicons/devicon/blob/master/LICENSE) [ ![GitHub contributors](https://camo.githubusercontent.com/3fb75309fa3cba1633c69c46965a11093ed6fe26047544c321bb016e92983e6e/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f636f6e7472696275746f72732d616e6f6e2f64657669636f6e732f64657669636f6e3f636f6c6f723d253233363062653836267374796c653d666f722d7468652d6261646765) ](https://github.com/devicons/devicon/graphs/contributors) [ ![GitHub branch checks state](https://camo.githubusercontent.com/337d4f2138653d74f6dd1728e129232a969a6daf1f57076c6a48e26f3c0062d2/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f636865636b732d7374617475732f64657669636f6e732f64657669636f6e2f6d61737465723f636f6c6f723d253233363062653836267374796c653d666f722d7468652d6261646765) ](https://github.com/devicons/devicon/actions) [ ![GitHub issues by-label](https://camo.githubusercontent.com/74a83a9d2cb8d8a777e7a2fb0d7c900da2c0e5e89a2fb1fd7497d71544947f8f/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6973737565732f64657669636f6e732f64657669636f6e2f726571756573743a69636f6e3f636f6c6f723d253233363062653836266c6162656c3d69636f6e2532307265717565737473267374796c653d666f722d7468652d6261646765) ](https://github.com/devicons/devicon/issues?q=is%3Aopen+is%3Aissue+label%3Arequest%3Aicon) [![GitHub Repo stars](https://camo.githubusercontent.com/6adaadd57ff98025d54021f7615a43bf086296a4f2c5d4a145c9134e95208355/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f73746172732f64657669636f6e732f64657669636f6e3f636f6c6f723d253233363062653836266c6162656c3d6769746875622532307374617273267374796c653d666f722d7468652d6261646765)](https://github.com/devicons/devicon/stargazers) 

  

[![Devicon Logo](https://raw.githubusercontent.com/devicons/devicon/master/icons/devicon/devicon-original-wordmark.svg)](https://github.com/devicons/devicon)

##### devicon aims to gather all logos representing development languages and tools.

[Demo](https://devicon.dev/) · [Request Icon](https://github.com/devicons/devicon/issues/new?assignees=&labels=request%3Aicon&template=icon-request.md&title=Icon+request%3A+%5BNAME%5D) · [Contribute](https://github.com/#contribute)

## TL;DR;

<!-- in your header -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css">

<!-- in your body -->
<i class="devicon-devicon-plain"></i>

## Table of Contents

1.  [About the project](https://github.com/#about)
2.  [Getting started](https://github.com/#getting-started)
3.  [Requesting icon](https://github.com/#request-icon)
4.  [Contributing](https://github.com/#contribute)
5.  [Discord server](https://github.com/#discord-server)
6.  [`develop` vs `master`](https://github.com/#develop-vs-master)
7.  [Stale pull requests](https://github.com/#stale-prs)
8.  [Go build yourself](https://github.com/#build-yourself)

## About the project

Devicon aims to gather all logos representing development languages and tools. Each icon comes in several versions: font/SVG, original/plain/line, colored/not colored, wordmark/no wordmark. Devicon has 150+ icons. And it's growing!  

See the [devicon.json](https://github.com/devicons/devicon/blob/master/devicon.json) or [our website](https://devicon.dev/) for complete and up to date reference of all available icons.

All product names, logos, and brands are property of their respective owners. All company, product and service names used in this website are for identification purposes only. Use of these names, logos, and brands does not imply endorsement. Usage of these logos should be done according to the company/brand/service's brand policy.

Thank you to our contributors and the [IcoMoon app](https://icomoon.io/#home). Devicon would not be possible without you.

## Getting started

For a super fast setup go check [devicon.dev](https://devicon.dev/).  
You can either [use the raw SVG](https://github.com/#getting-started-svg) icons or our [devicon font](https://github.com/#getting-started-font) (which is also available via CDN).

#### Use the `devicon` font (recommended)

You can install devicon as a dependency to your project either with `npm` or `yarn`:

npm install --save devicon
yarn add devicon

If you don't want to use a package manager you can also download and include [devicon.min.css](https://github.com/devicons/devicon/blob/master/devicon.min.css) next to the [font files](https://github.com/devicons/devicon/blob/master/fonts) to your project. See [devicon.dev](https://devicon.dev/) for details about how to add devicon to your project via a CDN.

After setting up you just have to include the stylesheet in your header to get started:

<link rel="stylesheet" href="devicon.min.css">

Start using icons with `<i>`-tag

<!--  for devicon plain version -->
<i class="devicon-devicon-plain"></i>

<!--  for devicon plain version with wordmark -->
<i class="devicon-devicon-plain-wordmark"></i>

<!--  for devicon plain version colored with devicon main color -->
<i class="devicon-devicon-plain colored"></i>

<!--  for devicon plain version with wordmark colored with devicon main color -->
<i class="devicon-devicon-plain-wordmark colored"></i>

An alternate way to use `devicon` is by copy/paste the raw SVG code to your project.

#### Copy/paste SVG code (from the [svg folder](https://github.com/devicons/devicon/tree/master/icons) or the [project page](https://devicon.dev/))

<!--  for devicon plain version -->
<svg id="Devicon" class='devicon-devicon-plain' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path id="plain" fill="#60be86" d="M64,7.83H4.77L14.95,95.13l49,25,.06,0,49.07-25L123.23,7.83Zm42.77,54.86c0,.88,0,1.67-.77,2L73.25,80.44l-2.42,1.13-.27-3.15V72.23l.24-1.57,1.09-.47L95.07,59.81l-21.54-9.6L64.35,68.34,58.9,78.87l-1.22,2.27-2.05-.9L22,64.71a2.42,2.42,0,0,1-1.45-2V56.91a2.39,2.39,0,0,1,1.42-2l34-15.73,3.21-1.44v9.66l.24,1.34-1.56.7L34.45,59.79,56.3,69.42l8.05-16,6.21-12.65,1.13-2.28,1.81.91L106,54.89c.73.35.76,1.14.76,2Z"/></svg>

Add css rules in your stylesheet

.devicon-devicon-plain {
  max-width: 2em;
}

/* if you want to change the original color */
.devicon-devicon-plain path {
  fill: #4691f6;
}

#### You can also use the `img` tag and referencing an svg directly from the repo.

<img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg'>

## Requesting icon

When you want to request a icon please feel feel to create a issue. See our [contribution guidelines](https://github.com/devicons/devicon/blob/master/CONTRIBUTING.md#requestingIcon) for more information.

## Contributing

We are happy for every contribution, whether it's new icons, features, or maintainers. Please have a look at our [contribution guidelines](https://github.com/devicons/devicon/blob/master/CONTRIBUTING.md) to see how you can contribute to this project.

## Discord server

We are running a Discord server. You can go here to talk, discuss, and more with the maintainers and other people, too. Here's the invitation: [https://discord.gg/hScy8KWACQ](https://discord.gg/hScy8KWACQ). **Note that the Discord server is unofficial, and Devicons is still being maintained via GitHub.**

## `develop` vs `master`

All official releases shall be in `master`. Any updates in between (icons, features, etc.) will be kept in `develop`.

**`develop` contains:**

-   Latest SVGs (non-optimized).
-   No icons for the latest SVGs. These will be build at every release.
-   Experimental changes.

**`master` contains:**

-   Latest official release, which contains the SVGs and icons.
-   Official tested changes.

## Stale pull requests

After a pull request has been open for over 30 days with no activity or response from the author, it'll be automatically marked as stale. We might fork your changes and merge the changes ourselves. Since GitHub tracks contributions by commits, you will be credited.

## Go build yourself

Feel free to follow those steps when you want to build the font by yourself.

##### Prerequisites

Install gulp (and gulp plugins)

##### Build the font and export stylesheet

Open [icomoon.io](https://icomoon.io/app/#/select) and import [icomoon.json](https://github.com/devicons/devicon/blob/master/icomoon.json). Choose _yes_ when being asked if you would like to restore the settings stored in the configuration file.

The next step is to click on **Generate font** and download the resulting archive. Extract the contents and you will find a [fonts](https://github.com/devicons/devicon/blob/master/fonts) directory next to a `style.css`. Replace the contents of the `fonts` folder, rename `style.css` as [devicon.css](https://github.com/devicons/devicon/blob/master/devicon.css) and follow the next step to build the final stylesheet.

##### Build and minify stylesheet

Run the following command to build the resulting file `devicon.min.css`

[![](https://camo.githubusercontent.com/7998890254268d8ed476c9f66d3fa59d21dd354d2090036083c82af4cda2a0eb/68747470733a2f2f666f7274686562616467652e636f6d2f696d616765732f6261646765732f6275696c742d776974682d6c6f76652e737667)](https://camo.githubusercontent.com/7998890254268d8ed476c9f66d3fa59d21dd354d2090036083c82af4cda2a0eb/68747470733a2f2f666f7274686562616467652e636f6d2f696d616765732f6261646765732f6275696c742d776974682d6c6f76652e737667) [![](https://camo.githubusercontent.com/74c68997445423bb43aecd572d760067203b0a53e29f548413a2c4b495cde7b0/68747470733a2f2f666f7274686562616467652e636f6d2f696d616765732f6261646765732f6275696c742d62792d646576656c6f706572732e737667)](https://camo.githubusercontent.com/74c68997445423bb43aecd572d760067203b0a53e29f548413a2c4b495cde7b0/68747470733a2f2f666f7274686562616467652e636f6d2f696d616765732f6261646765732f6275696c742d62792d646576656c6f706572732e737667)