[[ReadItLater]] [[Article]]

# [GitHub - kefranabg/readme-md-generator: 📄 CLI that generates beautiful README.md files](https://github.com/kefranabg/readme-md-generator)

## Welcome to readme-md-generator 👋

[![](https://camo.githubusercontent.com/71ea934e6e0c08f24b1f0a759e1901e11ebc8ea3e30d182694eef9e4d14b0b1e/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f726561646d652d6d642d67656e657261746f722e7376673f6f72616e67653d626c7565)](https://camo.githubusercontent.com/71ea934e6e0c08f24b1f0a759e1901e11ebc8ea3e30d182694eef9e4d14b0b1e/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f726561646d652d6d642d67656e657261746f722e7376673f6f72616e67653d626c7565) [ ![downloads](https://camo.githubusercontent.com/ba66ee60ea0a32d450c83119cdb637b79552e87d7fa8d36291d2f44ba275547d/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f646d2f726561646d652d6d642d67656e657261746f722e7376673f636f6c6f723d626c7565) ](https://www.npmjs.com/package/readme-md-generator) [ ![License: MIT](https://camo.githubusercontent.com/408116b648180becb83ae93945100c71de70f661b61f1b637bc69401972108b0/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d4d49542d79656c6c6f772e737667) ](https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE) [ ![](https://camo.githubusercontent.com/fd2677751d50ad3781f96f2b04b56fe2eb8115bf7f34180066362bbad41e2b35/68747470733a2f2f636f6465636f762e696f2f67682f6b656672616e6162672f726561646d652d6d642d67656e657261746f722f6272616e63682f6d61737465722f67726170682f62616467652e737667) ](https://codecov.io/gh/kefranabg/readme-md-generator) [ ![gitmoji-changelog](https://camo.githubusercontent.com/768b10ef495b737fe9480b0d26a5ede5ec0e10342435876caa60eb538b7f4fbc/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6368616e67656c6f672d6769746d6f6a692d627269676874677265656e2e737667) ](https://github.com/frinyvonnick/gitmoji-changelog) [![Twitter: FranckAbgrall](https://camo.githubusercontent.com/d88e8d432bee0ee3619d519721ae70a23e5fdb5c965ce41bc1edc1505409a56b/68747470733a2f2f696d672e736869656c64732e696f2f747769747465722f666f6c6c6f772f4672616e636b41626772616c6c2e7376673f7374796c653d736f6369616c)](https://twitter.com/FranckAbgrall) 

> CLI that generates beautiful README.md files.  
> `readme-md-generator` will suggest you default answers by reading your `package.json` and `git` configuration.

## ✨ Demo

`readme-md-generator` is able to read your environment (package.json, git config...) to suggest you default answers during the `README.md` creation process:

[![demo](https://user-images.githubusercontent.com/9840435/60266022-72a82400-98e7-11e9-9958-f9004c2f97e1.gif)](https://user-images.githubusercontent.com/9840435/60266022-72a82400-98e7-11e9-9958-f9004c2f97e1.gif)

Generated `README.md`:

[![cli output](https://user-images.githubusercontent.com/9840435/60266090-9cf9e180-98e7-11e9-9cac-3afeec349bbc.jpg)](https://user-images.githubusercontent.com/9840435/60266090-9cf9e180-98e7-11e9-9cac-3afeec349bbc.jpg)

Example of `package.json` with good meta data:

// The package.json is not required to run README-MD-GENERATOR
{
  "name": "readme-md-generator",
  "version": "0.1.3",
  "description": "CLI that generates beautiful README.md files.",
  "author": "Franck Abgrall",
  "license": "MIT",
  "homepage": "https://github.com/kefranabg/readme-md-generator#readme",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/kefranabg/readme-md-generator.git"
  },
  "bugs": {
    "url": "https://github.com/kefranabg/readme-md-generator/issues"
  },
  "engines": {
    "npm": ">=5.5.0",
    "node": ">=9.3.0"
  }
}

## 🚀 Usage

Make sure you have [npx](https://www.npmjs.com/package/npx) installed (`npx` is shipped by default since npm `5.2.0`)

Just run the following command at the root of your project and answer questions:

Or use default values for all questions (`-y`):

npx readme-md-generator -y

Use your own `ejs` README template (`-p`):

npx readme-md-generator -p path/to/my/own/template.md

You can find [ejs README template examples here](https://github.com/kefranabg/readme-md-generator/tree/master/templates).

## Code Contributors

This project exists thanks to all the people who contribute. [[Contribute](https://github.com/kefranabg/readme-md-generator/blob/master/CONTRIBUTING.md)]. [![](https://camo.githubusercontent.com/e4be48fb17e9aa29c96b189f5a89b8ab3c4c5b08ad79628f5c945cd2103c86aa/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f726561646d652d6d642d67656e657261746f722f636f6e7472696275746f72732e7376673f77696474683d38393026627574746f6e3d66616c7365)](https://github.com/kefranabg/readme-md-generator/graphs/contributors)

## Financial Contributors

Become a financial contributor and help us sustain our community. [[Contribute](https://opencollective.com/readme-md-generator/contribute)]

### Individuals

[![](https://camo.githubusercontent.com/89e1b868f40187e21eb3705323513d6b00e4bc6f984eaf93c8c94648f53dec00/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f726561646d652d6d642d67656e657261746f722f696e646976696475616c732e7376673f77696474683d383930)](https://opencollective.com/readme-md-generator)

### Organizations

Support this project with your organization. Your logo will show up here with a link to your website. [[Contribute](https://opencollective.com/readme-md-generator/contribute)] [![](https://camo.githubusercontent.com/52868e88c5e4235031a790aaa0ffe21dc18d874b49c389c7c6af4be809ca5dee/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f726561646d652d6d642d67656e657261746f722f6f7267616e697a6174696f6e2f302f6176617461722e737667)](https://opencollective.com/readme-md-generator/organization/0/website) [![](https://camo.githubusercontent.com/4b63796e331fd1fe0c6aea97ccffcf1228a4195e6c63d73d5245264fb4a10a25/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f726561646d652d6d642d67656e657261746f722f6f7267616e697a6174696f6e2f312f6176617461722e737667)](https://opencollective.com/readme-md-generator/organization/1/website) [![](https://camo.githubusercontent.com/00b56af50e8d938c2f7681f05bb144cc60f84a9610387fbf20ffe1a3cc03abe9/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f726561646d652d6d642d67656e657261746f722f6f7267616e697a6174696f6e2f322f6176617461722e737667)](https://opencollective.com/readme-md-generator/organization/2/website) [![](https://camo.githubusercontent.com/71c95293266991413ca2d67d2d3239a8dce66e69488488cf3972e80f61422ba8/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f726561646d652d6d642d67656e657261746f722f6f7267616e697a6174696f6e2f332f6176617461722e737667)](https://opencollective.com/readme-md-generator/organization/3/website) [![](https://camo.githubusercontent.com/e7369368814866ddfae196ee460ab1f9767f4eb0721f64056b89066b326a7af3/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f726561646d652d6d642d67656e657261746f722f6f7267616e697a6174696f6e2f342f6176617461722e737667)](https://opencollective.com/readme-md-generator/organization/4/website) [![](https://camo.githubusercontent.com/f9b1c08448fb6bf974749a0b1351dbee5d520e25149dc08b4329590dc50f06ac/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f726561646d652d6d642d67656e657261746f722f6f7267616e697a6174696f6e2f352f6176617461722e737667)](https://opencollective.com/readme-md-generator/organization/5/website) [![](https://camo.githubusercontent.com/61db279913716fada6b58b5e76e39500b59800c6e446494aea09a597a6a9db74/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f726561646d652d6d642d67656e657261746f722f6f7267616e697a6174696f6e2f362f6176617461722e737667)](https://opencollective.com/readme-md-generator/organization/6/website) [![](https://camo.githubusercontent.com/43603a483a060a984eebdeb2c468964864b7aaa2504b72e482a5eb44cb097a0a/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f726561646d652d6d642d67656e657261746f722f6f7267616e697a6174696f6e2f372f6176617461722e737667)](https://opencollective.com/readme-md-generator/organization/7/website) [![](https://camo.githubusercontent.com/6764295cde8053841dc73c6ecb5a0885e90bcc00e67fb2e42ddbf778b2272093/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f726561646d652d6d642d67656e657261746f722f6f7267616e697a6174696f6e2f382f6176617461722e737667)](https://opencollective.com/readme-md-generator/organization/8/website) [![](https://camo.githubusercontent.com/2f381a559647981045bc9bff586f027af264f835b5a03e0ae694a14ca33a5d7b/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f726561646d652d6d642d67656e657261746f722f6f7267616e697a6174696f6e2f392f6176617461722e737667)](https://opencollective.com/readme-md-generator/organization/9/website)

## 🤝 Contributing

Contributions, issues and feature requests are welcome.  
Feel free to check [issues page](https://github.com/kefranabg/readme-md-generator/issues) if you want to contribute.  
[Check the contributing guide](https://github.com/kefranabg/readme-md-generator/blob/master/CONTRIBUTING.md).  

## Author

👤 **Franck Abgrall**

-   Twitter: [@FranckAbgrall](https://twitter.com/FranckAbgrall)
-   Github: [@kefranabg](https://github.com/kefranabg)

## Show your support

Please ⭐️ this repository if this project helped you!

 [![](https://camo.githubusercontent.com/ca317983c1ee436cd8c1157c5d2769c641372ee441af705dc0a32e3654fcbc9f/68747470733a2f2f63352e70617472656f6e2e636f6d2f65787465726e616c2f6c6f676f2f6265636f6d655f615f706174726f6e5f627574746f6e4032782e706e67)](https://www.patreon.com/FranckAbgrall) 

## 📝 License

Copyright © 2019 [Franck Abgrall](https://github.com/kefranabg).  
This project is [MIT](https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_