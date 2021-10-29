'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function getBaseUrl(url, prefix) {
    const dir = '/';
    const urlAsArray = url.split(dir);
    const doubleSlashIndex = url.indexOf('://');
    if (doubleSlashIndex !== -1 && doubleSlashIndex === url.indexOf(dir) - 1) {
        urlAsArray.length = 3;
        let url = urlAsArray.join(dir);
        if (prefix !== undefined)
            url = url.replace(/http:\/\/|https:\/\//, prefix);
        return url;
    }
    else {
        const pointIndex = url.indexOf('.');
        if (pointIndex !== -1 && pointIndex !== 0) {
            return (prefix !== undefined ? prefix : 'https://') + urlAsArray[0];
        }
    }
}
function normalizeFilename(fileName) {
    const illegalSymbols = [':', '#', '/', '\\', '|', '?', '*', '<', '>', '"'];
    if (illegalSymbols.some((el) => fileName.contains(el))) {
        illegalSymbols.forEach((ilSymbol) => {
            fileName = fileName.replace(ilSymbol, '');
        });
        return fileName;
    }
    else {
        return fileName;
    }
}

const DEFAULT_SETTINGS = {
    inboxDir: 'ReadItLater Inbox',
    youtubeNote: `[[ReadItLater]] [[Youtube]]\n\n# [%videoTitle%](%videoURL%)\n\n%videoPlayer%`,
    twitterNote: `[[ReadItLater]] [[Tweet]]\n\n# [%tweetAuthorName%](%tweetURL%)\n\n%tweetContent%`,
    parsableArticleNote: `[[ReadItLater]] [[Article]]\n\n# [%articleTitle%](%articleURL%)\n\n%articleContent%`,
    notParsableArticleNote: `[[ReadItLater]] [[Article]]\n\n[%articleURL%](%articleURL%)`,
    textSnippetNote: `[[ReadItLater]] [[Textsnippet]]\n\n%content%`,
};
class ReadItLaterSettingsTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display() {
        const { containerEl } = this;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Settings for the ReadItLater plugin.' });
        new obsidian.Setting(containerEl)
            .setName('Inbox dir')
            .setDesc('By default, the plugin will add the files to the root folder')
            .addText((text) => text
            .setPlaceholder('Defaults to root')
            .setValue(this.plugin.settings.inboxDir || DEFAULT_SETTINGS.inboxDir)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.inboxDir = value;
            yield this.plugin.saveSettings();
        })));
        new obsidian.Setting(containerEl)
            .setName('Youtube note template')
            .setDesc('Available variables: %videoTitle%, %videoURL%, %videoId%, %videoPlayer%')
            .addTextArea((textarea) => textarea
            .setValue(this.plugin.settings.youtubeNote || DEFAULT_SETTINGS.youtubeNote)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.youtubeNote = value;
            yield this.plugin.saveSettings();
        })));
        new obsidian.Setting(containerEl)
            .setName('Twitter note template')
            .setDesc('Available variables: %tweetAuthorName%, %tweetURL%, %tweetContent%')
            .addTextArea((textarea) => textarea
            .setValue(this.plugin.settings.twitterNote || DEFAULT_SETTINGS.twitterNote)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.twitterNote = value;
            yield this.plugin.saveSettings();
        })));
        new obsidian.Setting(containerEl)
            .setName('Parsable article note template')
            .setDesc('Available variables: %articleTitle%, %articleURL%, %articleContent%')
            .addTextArea((textarea) => textarea
            .setValue(this.plugin.settings.parsableArticleNote || DEFAULT_SETTINGS.parsableArticleNote)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.parsableArticleNote = value;
            yield this.plugin.saveSettings();
        })));
        new obsidian.Setting(containerEl)
            .setName('Not parsable article note template')
            .setDesc('Available variables: %articleURL%')
            .addTextArea((textarea) => textarea
            .setValue(this.plugin.settings.notParsableArticleNote || DEFAULT_SETTINGS.notParsableArticleNote)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.notParsableArticleNote = value;
            yield this.plugin.saveSettings();
        })));
        new obsidian.Setting(containerEl)
            .setName('Text snippet note template')
            .setDesc('Available variables: %content%')
            .addTextArea((textarea) => textarea
            .setValue(this.plugin.settings.textSnippetNote || DEFAULT_SETTINGS.textSnippetNote)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.textSnippetNote = value;
            yield this.plugin.saveSettings();
        })));
    }
}

class Note {
    constructor(fileName, content) {
        this.fileName = fileName;
        this.content = content;
    }
}

class Parser {
    constructor(settings) {
        this.settings = settings;
    }
    isValidUrl(url) {
        try {
            new URL(url);
        }
        catch (e) {
            return false;
        }
        return true;
    }
    getFormattedDateForFilename() {
        const date = new Date();
        return obsidian.moment(date).format('YYYY-MM-DD HH-mm-ss');
    }
}

class YoutubeParser extends Parser {
    constructor(settings) {
        super(settings);
        this.PATTERN = /(youtube.com|youtu.be)\/(watch)?(\?v=)?(\S+)?/;
    }
    test(url) {
        return this.isValidUrl(url) && this.PATTERN.test(url);
    }
    prepareNote(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield obsidian.request({ method: 'GET', url });
            const videoTitle = new DOMParser().parseFromString(response, 'text/html').title;
            const videoId = this.PATTERN.exec(url)[4];
            const videoPlayer = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            const content = this.settings.youtubeNote
                .replace('%videoTitle%', videoTitle)
                .replace('%videoURL%', url)
                .replace('%videoId%', videoId)
                .replace('%videoPlayer%', videoPlayer);
            const fileName = `Youtube - ${videoTitle}.md`;
            return new Note(fileName, content);
        });
    }
}

class TwitterParser extends Parser {
    constructor(settings) {
        super(settings);
        this.PATTERN = /(https:\/\/twitter.com\/([a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+\/[a-zA-Z0-9_]+))/;
    }
    test(url) {
        return this.isValidUrl(url) && this.PATTERN.test(url);
    }
    prepareNote(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = JSON.parse(yield obsidian.request({
                method: 'GET',
                contentType: 'application/json',
                url: `https://publish.twitter.com/oembed?url=${url}`,
            }));
            const tweetAuthorName = response.author_name;
            const content = this.settings.twitterNote
                .replace('%tweetAuthorName%', tweetAuthorName)
                .replace('%tweetURL%', response.url)
                .replace('%tweetContent%', response.html);
            const fileName = `Tweet from ${tweetAuthorName} (${this.getFormattedDateForFilename()}).md`;
            return new Note(fileName, content);
        });
    }
}

var Readability$1 = {exports: {}};

/*eslint-env es6:false*/

(function (module) {
/*
 * Copyright (c) 2010 Arc90 Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * This code is heavily based on Arc90's readability.js (1.7.1) script
 * available at: http://code.google.com/p/arc90labs-readability
 */

/**
 * Public constructor.
 * @param {HTMLDocument} doc     The document to parse.
 * @param {Object}       options The options object.
 */
function Readability(doc, options) {
  // In some older versions, people passed a URI as the first argument. Cope:
  if (options && options.documentElement) {
    doc = options;
    options = arguments[2];
  } else if (!doc || !doc.documentElement) {
    throw new Error("First argument to Readability constructor should be a document object.");
  }
  options = options || {};

  this._doc = doc;
  this._docJSDOMParser = this._doc.firstChild.__JSDOMParser__;
  this._articleTitle = null;
  this._articleByline = null;
  this._articleDir = null;
  this._articleSiteName = null;
  this._attempts = [];

  // Configurable options
  this._debug = !!options.debug;
  this._maxElemsToParse = options.maxElemsToParse || this.DEFAULT_MAX_ELEMS_TO_PARSE;
  this._nbTopCandidates = options.nbTopCandidates || this.DEFAULT_N_TOP_CANDIDATES;
  this._charThreshold = options.charThreshold || this.DEFAULT_CHAR_THRESHOLD;
  this._classesToPreserve = this.CLASSES_TO_PRESERVE.concat(options.classesToPreserve || []);
  this._keepClasses = !!options.keepClasses;
  this._serializer = options.serializer || function(el) {
    return el.innerHTML;
  };
  this._disableJSONLD = !!options.disableJSONLD;

  // Start with all flags set
  this._flags = this.FLAG_STRIP_UNLIKELYS |
                this.FLAG_WEIGHT_CLASSES |
                this.FLAG_CLEAN_CONDITIONALLY;


  // Control whether log messages are sent to the console
  if (this._debug) {
    let logNode = function(node) {
      if (node.nodeType == node.TEXT_NODE) {
        return `${node.nodeName} ("${node.textContent}")`;
      }
      let attrPairs = Array.from(node.attributes || [], function(attr) {
        return `${attr.name}="${attr.value}"`;
      }).join(" ");
      return `<${node.localName} ${attrPairs}>`;
    };
    this.log = function () {
      if (typeof dump !== "undefined") {
        var msg = Array.prototype.map.call(arguments, function(x) {
          return (x && x.nodeName) ? logNode(x) : x;
        }).join(" ");
        dump("Reader: (Readability) " + msg + "\n");
      } else if (typeof console !== "undefined") {
        let args = Array.from(arguments, arg => {
          if (arg && arg.nodeType == this.ELEMENT_NODE) {
            return logNode(arg);
          }
          return arg;
        });
        args.unshift("Reader: (Readability)");
        console.log.apply(console, args);
      }
    };
  } else {
    this.log = function () {};
  }
}

Readability.prototype = {
  FLAG_STRIP_UNLIKELYS: 0x1,
  FLAG_WEIGHT_CLASSES: 0x2,
  FLAG_CLEAN_CONDITIONALLY: 0x4,

  // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
  ELEMENT_NODE: 1,
  TEXT_NODE: 3,

  // Max number of nodes supported by this parser. Default: 0 (no limit)
  DEFAULT_MAX_ELEMS_TO_PARSE: 0,

  // The number of top candidates to consider when analysing how
  // tight the competition is among candidates.
  DEFAULT_N_TOP_CANDIDATES: 5,

  // Element tags to score by default.
  DEFAULT_TAGS_TO_SCORE: "section,h2,h3,h4,h5,h6,p,td,pre".toUpperCase().split(","),

  // The default number of chars an article must have in order to return a result
  DEFAULT_CHAR_THRESHOLD: 500,

  // All of the regular expressions in use within readability.
  // Defined up here so we don't instantiate them repeatedly in loops.
  REGEXPS: {
    // NOTE: These two regular expressions are duplicated in
    // Readability-readerable.js. Please keep both copies in sync.
    unlikelyCandidates: /-ad-|ai2html|banner|breadcrumbs|combx|comment|community|cover-wrap|disqus|extra|footer|gdpr|header|legends|menu|related|remark|replies|rss|shoutbox|sidebar|skyscraper|social|sponsor|supplemental|ad-break|agegate|pagination|pager|popup|yom-remote/i,
    okMaybeItsACandidate: /and|article|body|column|content|main|shadow/i,

    positive: /article|body|content|entry|hentry|h-entry|main|page|pagination|post|text|blog|story/i,
    negative: /-ad-|hidden|^hid$| hid$| hid |^hid |banner|combx|comment|com-|contact|foot|footer|footnote|gdpr|masthead|media|meta|outbrain|promo|related|scroll|share|shoutbox|sidebar|skyscraper|sponsor|shopping|tags|tool|widget/i,
    extraneous: /print|archive|comment|discuss|e[\-]?mail|share|reply|all|login|sign|single|utility/i,
    byline: /byline|author|dateline|writtenby|p-author/i,
    replaceFonts: /<(\/?)font[^>]*>/gi,
    normalize: /\s{2,}/g,
    videos: /\/\/(www\.)?((dailymotion|youtube|youtube-nocookie|player\.vimeo|v\.qq)\.com|(archive|upload\.wikimedia)\.org|player\.twitch\.tv)/i,
    shareElements: /(\b|_)(share|sharedaddy)(\b|_)/i,
    nextLink: /(next|weiter|continue|>([^\|]|$)|»([^\|]|$))/i,
    prevLink: /(prev|earl|old|new|<|«)/i,
    tokenize: /\W+/g,
    whitespace: /^\s*$/,
    hasContent: /\S$/,
    hashUrl: /^#.+/,
    srcsetUrl: /(\S+)(\s+[\d.]+[xw])?(\s*(?:,|$))/g,
    b64DataUrl: /^data:\s*([^\s;,]+)\s*;\s*base64\s*,/i,
    // See: https://schema.org/Article
    jsonLdArticleTypes: /^Article|AdvertiserContentArticle|NewsArticle|AnalysisNewsArticle|AskPublicNewsArticle|BackgroundNewsArticle|OpinionNewsArticle|ReportageNewsArticle|ReviewNewsArticle|Report|SatiricalArticle|ScholarlyArticle|MedicalScholarlyArticle|SocialMediaPosting|BlogPosting|LiveBlogPosting|DiscussionForumPosting|TechArticle|APIReference$/
  },

  UNLIKELY_ROLES: [ "menu", "menubar", "complementary", "navigation", "alert", "alertdialog", "dialog" ],

  DIV_TO_P_ELEMS: new Set([ "BLOCKQUOTE", "DL", "DIV", "IMG", "OL", "P", "PRE", "TABLE", "UL" ]),

  ALTER_TO_DIV_EXCEPTIONS: ["DIV", "ARTICLE", "SECTION", "P"],

  PRESENTATIONAL_ATTRIBUTES: [ "align", "background", "bgcolor", "border", "cellpadding", "cellspacing", "frame", "hspace", "rules", "style", "valign", "vspace" ],

  DEPRECATED_SIZE_ATTRIBUTE_ELEMS: [ "TABLE", "TH", "TD", "HR", "PRE" ],

  // The commented out elements qualify as phrasing content but tend to be
  // removed by readability when put into paragraphs, so we ignore them here.
  PHRASING_ELEMS: [
    // "CANVAS", "IFRAME", "SVG", "VIDEO",
    "ABBR", "AUDIO", "B", "BDO", "BR", "BUTTON", "CITE", "CODE", "DATA",
    "DATALIST", "DFN", "EM", "EMBED", "I", "IMG", "INPUT", "KBD", "LABEL",
    "MARK", "MATH", "METER", "NOSCRIPT", "OBJECT", "OUTPUT", "PROGRESS", "Q",
    "RUBY", "SAMP", "SCRIPT", "SELECT", "SMALL", "SPAN", "STRONG", "SUB",
    "SUP", "TEXTAREA", "TIME", "VAR", "WBR"
  ],

  // These are the classes that readability sets itself.
  CLASSES_TO_PRESERVE: [ "page" ],

  // These are the list of HTML entities that need to be escaped.
  HTML_ESCAPE_MAP: {
    "lt": "<",
    "gt": ">",
    "amp": "&",
    "quot": '"',
    "apos": "'",
  },

  /**
   * Run any post-process modifications to article content as necessary.
   *
   * @param Element
   * @return void
  **/
  _postProcessContent: function(articleContent) {
    // Readability cannot open relative uris so we convert them to absolute uris.
    this._fixRelativeUris(articleContent);

    this._simplifyNestedElements(articleContent);

    if (!this._keepClasses) {
      // Remove classes.
      this._cleanClasses(articleContent);
    }
  },

  /**
   * Iterates over a NodeList, calls `filterFn` for each node and removes node
   * if function returned `true`.
   *
   * If function is not passed, removes all the nodes in node list.
   *
   * @param NodeList nodeList The nodes to operate on
   * @param Function filterFn the function to use as a filter
   * @return void
   */
  _removeNodes: function(nodeList, filterFn) {
    // Avoid ever operating on live node lists.
    if (this._docJSDOMParser && nodeList._isLiveNodeList) {
      throw new Error("Do not pass live node lists to _removeNodes");
    }
    for (var i = nodeList.length - 1; i >= 0; i--) {
      var node = nodeList[i];
      var parentNode = node.parentNode;
      if (parentNode) {
        if (!filterFn || filterFn.call(this, node, i, nodeList)) {
          parentNode.removeChild(node);
        }
      }
    }
  },

  /**
   * Iterates over a NodeList, and calls _setNodeTag for each node.
   *
   * @param NodeList nodeList The nodes to operate on
   * @param String newTagName the new tag name to use
   * @return void
   */
  _replaceNodeTags: function(nodeList, newTagName) {
    // Avoid ever operating on live node lists.
    if (this._docJSDOMParser && nodeList._isLiveNodeList) {
      throw new Error("Do not pass live node lists to _replaceNodeTags");
    }
    for (const node of nodeList) {
      this._setNodeTag(node, newTagName);
    }
  },

  /**
   * Iterate over a NodeList, which doesn't natively fully implement the Array
   * interface.
   *
   * For convenience, the current object context is applied to the provided
   * iterate function.
   *
   * @param  NodeList nodeList The NodeList.
   * @param  Function fn       The iterate function.
   * @return void
   */
  _forEachNode: function(nodeList, fn) {
    Array.prototype.forEach.call(nodeList, fn, this);
  },

  /**
   * Iterate over a NodeList, and return the first node that passes
   * the supplied test function
   *
   * For convenience, the current object context is applied to the provided
   * test function.
   *
   * @param  NodeList nodeList The NodeList.
   * @param  Function fn       The test function.
   * @return void
   */
  _findNode: function(nodeList, fn) {
    return Array.prototype.find.call(nodeList, fn, this);
  },

  /**
   * Iterate over a NodeList, return true if any of the provided iterate
   * function calls returns true, false otherwise.
   *
   * For convenience, the current object context is applied to the
   * provided iterate function.
   *
   * @param  NodeList nodeList The NodeList.
   * @param  Function fn       The iterate function.
   * @return Boolean
   */
  _someNode: function(nodeList, fn) {
    return Array.prototype.some.call(nodeList, fn, this);
  },

  /**
   * Iterate over a NodeList, return true if all of the provided iterate
   * function calls return true, false otherwise.
   *
   * For convenience, the current object context is applied to the
   * provided iterate function.
   *
   * @param  NodeList nodeList The NodeList.
   * @param  Function fn       The iterate function.
   * @return Boolean
   */
  _everyNode: function(nodeList, fn) {
    return Array.prototype.every.call(nodeList, fn, this);
  },

  /**
   * Concat all nodelists passed as arguments.
   *
   * @return ...NodeList
   * @return Array
   */
  _concatNodeLists: function() {
    var slice = Array.prototype.slice;
    var args = slice.call(arguments);
    var nodeLists = args.map(function(list) {
      return slice.call(list);
    });
    return Array.prototype.concat.apply([], nodeLists);
  },

  _getAllNodesWithTag: function(node, tagNames) {
    if (node.querySelectorAll) {
      return node.querySelectorAll(tagNames.join(","));
    }
    return [].concat.apply([], tagNames.map(function(tag) {
      var collection = node.getElementsByTagName(tag);
      return Array.isArray(collection) ? collection : Array.from(collection);
    }));
  },

  /**
   * Removes the class="" attribute from every element in the given
   * subtree, except those that match CLASSES_TO_PRESERVE and
   * the classesToPreserve array from the options object.
   *
   * @param Element
   * @return void
   */
  _cleanClasses: function(node) {
    var classesToPreserve = this._classesToPreserve;
    var className = (node.getAttribute("class") || "")
      .split(/\s+/)
      .filter(function(cls) {
        return classesToPreserve.indexOf(cls) != -1;
      })
      .join(" ");

    if (className) {
      node.setAttribute("class", className);
    } else {
      node.removeAttribute("class");
    }

    for (node = node.firstElementChild; node; node = node.nextElementSibling) {
      this._cleanClasses(node);
    }
  },

  /**
   * Converts each <a> and <img> uri in the given element to an absolute URI,
   * ignoring #ref URIs.
   *
   * @param Element
   * @return void
   */
  _fixRelativeUris: function(articleContent) {
    var baseURI = this._doc.baseURI;
    var documentURI = this._doc.documentURI;
    function toAbsoluteURI(uri) {
      // Leave hash links alone if the base URI matches the document URI:
      if (baseURI == documentURI && uri.charAt(0) == "#") {
        return uri;
      }

      // Otherwise, resolve against base URI:
      try {
        return new URL(uri, baseURI).href;
      } catch (ex) {
        // Something went wrong, just return the original:
      }
      return uri;
    }

    var links = this._getAllNodesWithTag(articleContent, ["a"]);
    this._forEachNode(links, function(link) {
      var href = link.getAttribute("href");
      if (href) {
        // Remove links with javascript: URIs, since
        // they won't work after scripts have been removed from the page.
        if (href.indexOf("javascript:") === 0) {
          // if the link only contains simple text content, it can be converted to a text node
          if (link.childNodes.length === 1 && link.childNodes[0].nodeType === this.TEXT_NODE) {
            var text = this._doc.createTextNode(link.textContent);
            link.parentNode.replaceChild(text, link);
          } else {
            // if the link has multiple children, they should all be preserved
            var container = this._doc.createElement("span");
            while (link.childNodes.length > 0) {
              container.appendChild(link.childNodes[0]);
            }
            link.parentNode.replaceChild(container, link);
          }
        } else {
          link.setAttribute("href", toAbsoluteURI(href));
        }
      }
    });

    var medias = this._getAllNodesWithTag(articleContent, [
      "img", "picture", "figure", "video", "audio", "source"
    ]);

    this._forEachNode(medias, function(media) {
      var src = media.getAttribute("src");
      var poster = media.getAttribute("poster");
      var srcset = media.getAttribute("srcset");

      if (src) {
        media.setAttribute("src", toAbsoluteURI(src));
      }

      if (poster) {
        media.setAttribute("poster", toAbsoluteURI(poster));
      }

      if (srcset) {
        var newSrcset = srcset.replace(this.REGEXPS.srcsetUrl, function(_, p1, p2, p3) {
          return toAbsoluteURI(p1) + (p2 || "") + p3;
        });

        media.setAttribute("srcset", newSrcset);
      }
    });
  },

  _simplifyNestedElements: function(articleContent) {
    var node = articleContent;

    while (node) {
      if (node.parentNode && ["DIV", "SECTION"].includes(node.tagName) && !(node.id && node.id.startsWith("readability"))) {
        if (this._isElementWithoutContent(node)) {
          node = this._removeAndGetNext(node);
          continue;
        } else if (this._hasSingleTagInsideElement(node, "DIV") || this._hasSingleTagInsideElement(node, "SECTION")) {
          var child = node.children[0];
          for (var i = 0; i < node.attributes.length; i++) {
            child.setAttribute(node.attributes[i].name, node.attributes[i].value);
          }
          node.parentNode.replaceChild(child, node);
          node = child;
          continue;
        }
      }

      node = this._getNextNode(node);
    }
  },

  /**
   * Get the article title as an H1.
   *
   * @return string
   **/
  _getArticleTitle: function() {
    var doc = this._doc;
    var curTitle = "";
    var origTitle = "";

    try {
      curTitle = origTitle = doc.title.trim();

      // If they had an element with id "title" in their HTML
      if (typeof curTitle !== "string")
        curTitle = origTitle = this._getInnerText(doc.getElementsByTagName("title")[0]);
    } catch (e) {/* ignore exceptions setting the title. */}

    var titleHadHierarchicalSeparators = false;
    function wordCount(str) {
      return str.split(/\s+/).length;
    }

    // If there's a separator in the title, first remove the final part
    if ((/ [\|\-\\\/>»] /).test(curTitle)) {
      titleHadHierarchicalSeparators = / [\\\/>»] /.test(curTitle);
      curTitle = origTitle.replace(/(.*)[\|\-\\\/>»] .*/gi, "$1");

      // If the resulting title is too short (3 words or fewer), remove
      // the first part instead:
      if (wordCount(curTitle) < 3)
        curTitle = origTitle.replace(/[^\|\-\\\/>»]*[\|\-\\\/>»](.*)/gi, "$1");
    } else if (curTitle.indexOf(": ") !== -1) {
      // Check if we have an heading containing this exact string, so we
      // could assume it's the full title.
      var headings = this._concatNodeLists(
        doc.getElementsByTagName("h1"),
        doc.getElementsByTagName("h2")
      );
      var trimmedTitle = curTitle.trim();
      var match = this._someNode(headings, function(heading) {
        return heading.textContent.trim() === trimmedTitle;
      });

      // If we don't, let's extract the title out of the original title string.
      if (!match) {
        curTitle = origTitle.substring(origTitle.lastIndexOf(":") + 1);

        // If the title is now too short, try the first colon instead:
        if (wordCount(curTitle) < 3) {
          curTitle = origTitle.substring(origTitle.indexOf(":") + 1);
          // But if we have too many words before the colon there's something weird
          // with the titles and the H tags so let's just use the original title instead
        } else if (wordCount(origTitle.substr(0, origTitle.indexOf(":"))) > 5) {
          curTitle = origTitle;
        }
      }
    } else if (curTitle.length > 150 || curTitle.length < 15) {
      var hOnes = doc.getElementsByTagName("h1");

      if (hOnes.length === 1)
        curTitle = this._getInnerText(hOnes[0]);
    }

    curTitle = curTitle.trim().replace(this.REGEXPS.normalize, " ");
    // If we now have 4 words or fewer as our title, and either no
    // 'hierarchical' separators (\, /, > or ») were found in the original
    // title or we decreased the number of words by more than 1 word, use
    // the original title.
    var curTitleWordCount = wordCount(curTitle);
    if (curTitleWordCount <= 4 &&
        (!titleHadHierarchicalSeparators ||
         curTitleWordCount != wordCount(origTitle.replace(/[\|\-\\\/>»]+/g, "")) - 1)) {
      curTitle = origTitle;
    }

    return curTitle;
  },

  /**
   * Prepare the HTML document for readability to scrape it.
   * This includes things like stripping javascript, CSS, and handling terrible markup.
   *
   * @return void
   **/
  _prepDocument: function() {
    var doc = this._doc;

    // Remove all style tags in head
    this._removeNodes(this._getAllNodesWithTag(doc, ["style"]));

    if (doc.body) {
      this._replaceBrs(doc.body);
    }

    this._replaceNodeTags(this._getAllNodesWithTag(doc, ["font"]), "SPAN");
  },

  /**
   * Finds the next node, starting from the given node, and ignoring
   * whitespace in between. If the given node is an element, the same node is
   * returned.
   */
  _nextNode: function (node) {
    var next = node;
    while (next
        && (next.nodeType != this.ELEMENT_NODE)
        && this.REGEXPS.whitespace.test(next.textContent)) {
      next = next.nextSibling;
    }
    return next;
  },

  /**
   * Replaces 2 or more successive <br> elements with a single <p>.
   * Whitespace between <br> elements are ignored. For example:
   *   <div>foo<br>bar<br> <br><br>abc</div>
   * will become:
   *   <div>foo<br>bar<p>abc</p></div>
   */
  _replaceBrs: function (elem) {
    this._forEachNode(this._getAllNodesWithTag(elem, ["br"]), function(br) {
      var next = br.nextSibling;

      // Whether 2 or more <br> elements have been found and replaced with a
      // <p> block.
      var replaced = false;

      // If we find a <br> chain, remove the <br>s until we hit another node
      // or non-whitespace. This leaves behind the first <br> in the chain
      // (which will be replaced with a <p> later).
      while ((next = this._nextNode(next)) && (next.tagName == "BR")) {
        replaced = true;
        var brSibling = next.nextSibling;
        next.parentNode.removeChild(next);
        next = brSibling;
      }

      // If we removed a <br> chain, replace the remaining <br> with a <p>. Add
      // all sibling nodes as children of the <p> until we hit another <br>
      // chain.
      if (replaced) {
        var p = this._doc.createElement("p");
        br.parentNode.replaceChild(p, br);

        next = p.nextSibling;
        while (next) {
          // If we've hit another <br><br>, we're done adding children to this <p>.
          if (next.tagName == "BR") {
            var nextElem = this._nextNode(next.nextSibling);
            if (nextElem && nextElem.tagName == "BR")
              break;
          }

          if (!this._isPhrasingContent(next))
            break;

          // Otherwise, make this node a child of the new <p>.
          var sibling = next.nextSibling;
          p.appendChild(next);
          next = sibling;
        }

        while (p.lastChild && this._isWhitespace(p.lastChild)) {
          p.removeChild(p.lastChild);
        }

        if (p.parentNode.tagName === "P")
          this._setNodeTag(p.parentNode, "DIV");
      }
    });
  },

  _setNodeTag: function (node, tag) {
    this.log("_setNodeTag", node, tag);
    if (this._docJSDOMParser) {
      node.localName = tag.toLowerCase();
      node.tagName = tag.toUpperCase();
      return node;
    }

    var replacement = node.ownerDocument.createElement(tag);
    while (node.firstChild) {
      replacement.appendChild(node.firstChild);
    }
    node.parentNode.replaceChild(replacement, node);
    if (node.readability)
      replacement.readability = node.readability;

    for (var i = 0; i < node.attributes.length; i++) {
      try {
        replacement.setAttribute(node.attributes[i].name, node.attributes[i].value);
      } catch (ex) {
        /* it's possible for setAttribute() to throw if the attribute name
         * isn't a valid XML Name. Such attributes can however be parsed from
         * source in HTML docs, see https://github.com/whatwg/html/issues/4275,
         * so we can hit them here and then throw. We don't care about such
         * attributes so we ignore them.
         */
      }
    }
    return replacement;
  },

  /**
   * Prepare the article node for display. Clean out any inline styles,
   * iframes, forms, strip extraneous <p> tags, etc.
   *
   * @param Element
   * @return void
   **/
  _prepArticle: function(articleContent) {
    this._cleanStyles(articleContent);

    // Check for data tables before we continue, to avoid removing items in
    // those tables, which will often be isolated even though they're
    // visually linked to other content-ful elements (text, images, etc.).
    this._markDataTables(articleContent);

    this._fixLazyImages(articleContent);

    // Clean out junk from the article content
    this._cleanConditionally(articleContent, "form");
    this._cleanConditionally(articleContent, "fieldset");
    this._clean(articleContent, "object");
    this._clean(articleContent, "embed");
    this._clean(articleContent, "footer");
    this._clean(articleContent, "link");
    this._clean(articleContent, "aside");

    // Clean out elements with little content that have "share" in their id/class combinations from final top candidates,
    // which means we don't remove the top candidates even they have "share".

    var shareElementThreshold = this.DEFAULT_CHAR_THRESHOLD;

    this._forEachNode(articleContent.children, function (topCandidate) {
      this._cleanMatchedNodes(topCandidate, function (node, matchString) {
        return this.REGEXPS.shareElements.test(matchString) && node.textContent.length < shareElementThreshold;
      });
    });

    this._clean(articleContent, "iframe");
    this._clean(articleContent, "input");
    this._clean(articleContent, "textarea");
    this._clean(articleContent, "select");
    this._clean(articleContent, "button");
    this._cleanHeaders(articleContent);

    // Do these last as the previous stuff may have removed junk
    // that will affect these
    this._cleanConditionally(articleContent, "table");
    this._cleanConditionally(articleContent, "ul");
    this._cleanConditionally(articleContent, "div");

    // replace H1 with H2 as H1 should be only title that is displayed separately
    this._replaceNodeTags(this._getAllNodesWithTag(articleContent, ["h1"]), "h2");

    // Remove extra paragraphs
    this._removeNodes(this._getAllNodesWithTag(articleContent, ["p"]), function (paragraph) {
      var imgCount = paragraph.getElementsByTagName("img").length;
      var embedCount = paragraph.getElementsByTagName("embed").length;
      var objectCount = paragraph.getElementsByTagName("object").length;
      // At this point, nasty iframes have been removed, only remain embedded video ones.
      var iframeCount = paragraph.getElementsByTagName("iframe").length;
      var totalCount = imgCount + embedCount + objectCount + iframeCount;

      return totalCount === 0 && !this._getInnerText(paragraph, false);
    });

    this._forEachNode(this._getAllNodesWithTag(articleContent, ["br"]), function(br) {
      var next = this._nextNode(br.nextSibling);
      if (next && next.tagName == "P")
        br.parentNode.removeChild(br);
    });

    // Remove single-cell tables
    this._forEachNode(this._getAllNodesWithTag(articleContent, ["table"]), function(table) {
      var tbody = this._hasSingleTagInsideElement(table, "TBODY") ? table.firstElementChild : table;
      if (this._hasSingleTagInsideElement(tbody, "TR")) {
        var row = tbody.firstElementChild;
        if (this._hasSingleTagInsideElement(row, "TD")) {
          var cell = row.firstElementChild;
          cell = this._setNodeTag(cell, this._everyNode(cell.childNodes, this._isPhrasingContent) ? "P" : "DIV");
          table.parentNode.replaceChild(cell, table);
        }
      }
    });
  },

  /**
   * Initialize a node with the readability object. Also checks the
   * className/id for special names to add to its score.
   *
   * @param Element
   * @return void
  **/
  _initializeNode: function(node) {
    node.readability = {"contentScore": 0};

    switch (node.tagName) {
      case "DIV":
        node.readability.contentScore += 5;
        break;

      case "PRE":
      case "TD":
      case "BLOCKQUOTE":
        node.readability.contentScore += 3;
        break;

      case "ADDRESS":
      case "OL":
      case "UL":
      case "DL":
      case "DD":
      case "DT":
      case "LI":
      case "FORM":
        node.readability.contentScore -= 3;
        break;

      case "H1":
      case "H2":
      case "H3":
      case "H4":
      case "H5":
      case "H6":
      case "TH":
        node.readability.contentScore -= 5;
        break;
    }

    node.readability.contentScore += this._getClassWeight(node);
  },

  _removeAndGetNext: function(node) {
    var nextNode = this._getNextNode(node, true);
    node.parentNode.removeChild(node);
    return nextNode;
  },

  /**
   * Traverse the DOM from node to node, starting at the node passed in.
   * Pass true for the second parameter to indicate this node itself
   * (and its kids) are going away, and we want the next node over.
   *
   * Calling this in a loop will traverse the DOM depth-first.
   */
  _getNextNode: function(node, ignoreSelfAndKids) {
    // First check for kids if those aren't being ignored
    if (!ignoreSelfAndKids && node.firstElementChild) {
      return node.firstElementChild;
    }
    // Then for siblings...
    if (node.nextElementSibling) {
      return node.nextElementSibling;
    }
    // And finally, move up the parent chain *and* find a sibling
    // (because this is depth-first traversal, we will have already
    // seen the parent nodes themselves).
    do {
      node = node.parentNode;
    } while (node && !node.nextElementSibling);
    return node && node.nextElementSibling;
  },

  // compares second text to first one
  // 1 = same text, 0 = completely different text
  // works the way that it splits both texts into words and then finds words that are unique in second text
  // the result is given by the lower length of unique parts
  _textSimilarity: function(textA, textB) {
    var tokensA = textA.toLowerCase().split(this.REGEXPS.tokenize).filter(Boolean);
    var tokensB = textB.toLowerCase().split(this.REGEXPS.tokenize).filter(Boolean);
    if (!tokensA.length || !tokensB.length) {
      return 0;
    }
    var uniqTokensB = tokensB.filter(token => !tokensA.includes(token));
    var distanceB = uniqTokensB.join(" ").length / tokensB.join(" ").length;
    return 1 - distanceB;
  },

  _checkByline: function(node, matchString) {
    if (this._articleByline) {
      return false;
    }

    if (node.getAttribute !== undefined) {
      var rel = node.getAttribute("rel");
      var itemprop = node.getAttribute("itemprop");
    }

    if ((rel === "author" || (itemprop && itemprop.indexOf("author") !== -1) || this.REGEXPS.byline.test(matchString)) && this._isValidByline(node.textContent)) {
      this._articleByline = node.textContent.trim();
      return true;
    }

    return false;
  },

  _getNodeAncestors: function(node, maxDepth) {
    maxDepth = maxDepth || 0;
    var i = 0, ancestors = [];
    while (node.parentNode) {
      ancestors.push(node.parentNode);
      if (maxDepth && ++i === maxDepth)
        break;
      node = node.parentNode;
    }
    return ancestors;
  },

  /***
   * grabArticle - Using a variety of metrics (content score, classname, element types), find the content that is
   *         most likely to be the stuff a user wants to read. Then return it wrapped up in a div.
   *
   * @param page a document to run upon. Needs to be a full document, complete with body.
   * @return Element
  **/
  _grabArticle: function (page) {
    this.log("**** grabArticle ****");
    var doc = this._doc;
    var isPaging = page !== null;
    page = page ? page : this._doc.body;

    // We can't grab an article if we don't have a page!
    if (!page) {
      this.log("No body found in document. Abort.");
      return null;
    }

    var pageCacheHtml = page.innerHTML;

    while (true) {
      this.log("Starting grabArticle loop");
      var stripUnlikelyCandidates = this._flagIsActive(this.FLAG_STRIP_UNLIKELYS);

      // First, node prepping. Trash nodes that look cruddy (like ones with the
      // class name "comment", etc), and turn divs into P tags where they have been
      // used inappropriately (as in, where they contain no other block level elements.)
      var elementsToScore = [];
      var node = this._doc.documentElement;

      let shouldRemoveTitleHeader = true;

      while (node) {
        var matchString = node.className + " " + node.id;

        if (!this._isProbablyVisible(node)) {
          this.log("Removing hidden node - " + matchString);
          node = this._removeAndGetNext(node);
          continue;
        }

        // Check to see if this node is a byline, and remove it if it is.
        if (this._checkByline(node, matchString)) {
          node = this._removeAndGetNext(node);
          continue;
        }

        if (shouldRemoveTitleHeader && this._headerDuplicatesTitle(node)) {
          this.log("Removing header: ", node.textContent.trim(), this._articleTitle.trim());
          shouldRemoveTitleHeader = false;
          node = this._removeAndGetNext(node);
          continue;
        }

        // Remove unlikely candidates
        if (stripUnlikelyCandidates) {
          if (this.REGEXPS.unlikelyCandidates.test(matchString) &&
              !this.REGEXPS.okMaybeItsACandidate.test(matchString) &&
              !this._hasAncestorTag(node, "table") &&
              !this._hasAncestorTag(node, "code") &&
              node.tagName !== "BODY" &&
              node.tagName !== "A") {
            this.log("Removing unlikely candidate - " + matchString);
            node = this._removeAndGetNext(node);
            continue;
          }

          if (this.UNLIKELY_ROLES.includes(node.getAttribute("role"))) {
            this.log("Removing content with role " + node.getAttribute("role") + " - " + matchString);
            node = this._removeAndGetNext(node);
            continue;
          }
        }

        // Remove DIV, SECTION, and HEADER nodes without any content(e.g. text, image, video, or iframe).
        if ((node.tagName === "DIV" || node.tagName === "SECTION" || node.tagName === "HEADER" ||
             node.tagName === "H1" || node.tagName === "H2" || node.tagName === "H3" ||
             node.tagName === "H4" || node.tagName === "H5" || node.tagName === "H6") &&
            this._isElementWithoutContent(node)) {
          node = this._removeAndGetNext(node);
          continue;
        }

        if (this.DEFAULT_TAGS_TO_SCORE.indexOf(node.tagName) !== -1) {
          elementsToScore.push(node);
        }

        // Turn all divs that don't have children block level elements into p's
        if (node.tagName === "DIV") {
          // Put phrasing content into paragraphs.
          var p = null;
          var childNode = node.firstChild;
          while (childNode) {
            var nextSibling = childNode.nextSibling;
            if (this._isPhrasingContent(childNode)) {
              if (p !== null) {
                p.appendChild(childNode);
              } else if (!this._isWhitespace(childNode)) {
                p = doc.createElement("p");
                node.replaceChild(p, childNode);
                p.appendChild(childNode);
              }
            } else if (p !== null) {
              while (p.lastChild && this._isWhitespace(p.lastChild)) {
                p.removeChild(p.lastChild);
              }
              p = null;
            }
            childNode = nextSibling;
          }

          // Sites like http://mobile.slate.com encloses each paragraph with a DIV
          // element. DIVs with only a P element inside and no text content can be
          // safely converted into plain P elements to avoid confusing the scoring
          // algorithm with DIVs with are, in practice, paragraphs.
          if (this._hasSingleTagInsideElement(node, "P") && this._getLinkDensity(node) < 0.25) {
            var newNode = node.children[0];
            node.parentNode.replaceChild(newNode, node);
            node = newNode;
            elementsToScore.push(node);
          } else if (!this._hasChildBlockElement(node)) {
            node = this._setNodeTag(node, "P");
            elementsToScore.push(node);
          }
        }
        node = this._getNextNode(node);
      }

      /**
       * Loop through all paragraphs, and assign a score to them based on how content-y they look.
       * Then add their score to their parent node.
       *
       * A score is determined by things like number of commas, class names, etc. Maybe eventually link density.
      **/
      var candidates = [];
      this._forEachNode(elementsToScore, function(elementToScore) {
        if (!elementToScore.parentNode || typeof(elementToScore.parentNode.tagName) === "undefined")
          return;

        // If this paragraph is less than 25 characters, don't even count it.
        var innerText = this._getInnerText(elementToScore);
        if (innerText.length < 25)
          return;

        // Exclude nodes with no ancestor.
        var ancestors = this._getNodeAncestors(elementToScore, 5);
        if (ancestors.length === 0)
          return;

        var contentScore = 0;

        // Add a point for the paragraph itself as a base.
        contentScore += 1;

        // Add points for any commas within this paragraph.
        contentScore += innerText.split(",").length;

        // For every 100 characters in this paragraph, add another point. Up to 3 points.
        contentScore += Math.min(Math.floor(innerText.length / 100), 3);

        // Initialize and score ancestors.
        this._forEachNode(ancestors, function(ancestor, level) {
          if (!ancestor.tagName || !ancestor.parentNode || typeof(ancestor.parentNode.tagName) === "undefined")
            return;

          if (typeof(ancestor.readability) === "undefined") {
            this._initializeNode(ancestor);
            candidates.push(ancestor);
          }

          // Node score divider:
          // - parent:             1 (no division)
          // - grandparent:        2
          // - great grandparent+: ancestor level * 3
          if (level === 0)
            var scoreDivider = 1;
          else if (level === 1)
            scoreDivider = 2;
          else
            scoreDivider = level * 3;
          ancestor.readability.contentScore += contentScore / scoreDivider;
        });
      });

      // After we've calculated scores, loop through all of the possible
      // candidate nodes we found and find the one with the highest score.
      var topCandidates = [];
      for (var c = 0, cl = candidates.length; c < cl; c += 1) {
        var candidate = candidates[c];

        // Scale the final candidates score based on link density. Good content
        // should have a relatively small link density (5% or less) and be mostly
        // unaffected by this operation.
        var candidateScore = candidate.readability.contentScore * (1 - this._getLinkDensity(candidate));
        candidate.readability.contentScore = candidateScore;

        this.log("Candidate:", candidate, "with score " + candidateScore);

        for (var t = 0; t < this._nbTopCandidates; t++) {
          var aTopCandidate = topCandidates[t];

          if (!aTopCandidate || candidateScore > aTopCandidate.readability.contentScore) {
            topCandidates.splice(t, 0, candidate);
            if (topCandidates.length > this._nbTopCandidates)
              topCandidates.pop();
            break;
          }
        }
      }

      var topCandidate = topCandidates[0] || null;
      var neededToCreateTopCandidate = false;
      var parentOfTopCandidate;

      // If we still have no top candidate, just use the body as a last resort.
      // We also have to copy the body node so it is something we can modify.
      if (topCandidate === null || topCandidate.tagName === "BODY") {
        // Move all of the page's children into topCandidate
        topCandidate = doc.createElement("DIV");
        neededToCreateTopCandidate = true;
        // Move everything (not just elements, also text nodes etc.) into the container
        // so we even include text directly in the body:
        var kids = page.childNodes;
        while (kids.length) {
          this.log("Moving child out:", kids[0]);
          topCandidate.appendChild(kids[0]);
        }

        page.appendChild(topCandidate);

        this._initializeNode(topCandidate);
      } else if (topCandidate) {
        // Find a better top candidate node if it contains (at least three) nodes which belong to `topCandidates` array
        // and whose scores are quite closed with current `topCandidate` node.
        var alternativeCandidateAncestors = [];
        for (var i = 1; i < topCandidates.length; i++) {
          if (topCandidates[i].readability.contentScore / topCandidate.readability.contentScore >= 0.75) {
            alternativeCandidateAncestors.push(this._getNodeAncestors(topCandidates[i]));
          }
        }
        var MINIMUM_TOPCANDIDATES = 3;
        if (alternativeCandidateAncestors.length >= MINIMUM_TOPCANDIDATES) {
          parentOfTopCandidate = topCandidate.parentNode;
          while (parentOfTopCandidate.tagName !== "BODY") {
            var listsContainingThisAncestor = 0;
            for (var ancestorIndex = 0; ancestorIndex < alternativeCandidateAncestors.length && listsContainingThisAncestor < MINIMUM_TOPCANDIDATES; ancestorIndex++) {
              listsContainingThisAncestor += Number(alternativeCandidateAncestors[ancestorIndex].includes(parentOfTopCandidate));
            }
            if (listsContainingThisAncestor >= MINIMUM_TOPCANDIDATES) {
              topCandidate = parentOfTopCandidate;
              break;
            }
            parentOfTopCandidate = parentOfTopCandidate.parentNode;
          }
        }
        if (!topCandidate.readability) {
          this._initializeNode(topCandidate);
        }

        // Because of our bonus system, parents of candidates might have scores
        // themselves. They get half of the node. There won't be nodes with higher
        // scores than our topCandidate, but if we see the score going *up* in the first
        // few steps up the tree, that's a decent sign that there might be more content
        // lurking in other places that we want to unify in. The sibling stuff
        // below does some of that - but only if we've looked high enough up the DOM
        // tree.
        parentOfTopCandidate = topCandidate.parentNode;
        var lastScore = topCandidate.readability.contentScore;
        // The scores shouldn't get too low.
        var scoreThreshold = lastScore / 3;
        while (parentOfTopCandidate.tagName !== "BODY") {
          if (!parentOfTopCandidate.readability) {
            parentOfTopCandidate = parentOfTopCandidate.parentNode;
            continue;
          }
          var parentScore = parentOfTopCandidate.readability.contentScore;
          if (parentScore < scoreThreshold)
            break;
          if (parentScore > lastScore) {
            // Alright! We found a better parent to use.
            topCandidate = parentOfTopCandidate;
            break;
          }
          lastScore = parentOfTopCandidate.readability.contentScore;
          parentOfTopCandidate = parentOfTopCandidate.parentNode;
        }

        // If the top candidate is the only child, use parent instead. This will help sibling
        // joining logic when adjacent content is actually located in parent's sibling node.
        parentOfTopCandidate = topCandidate.parentNode;
        while (parentOfTopCandidate.tagName != "BODY" && parentOfTopCandidate.children.length == 1) {
          topCandidate = parentOfTopCandidate;
          parentOfTopCandidate = topCandidate.parentNode;
        }
        if (!topCandidate.readability) {
          this._initializeNode(topCandidate);
        }
      }

      // Now that we have the top candidate, look through its siblings for content
      // that might also be related. Things like preambles, content split by ads
      // that we removed, etc.
      var articleContent = doc.createElement("DIV");
      if (isPaging)
        articleContent.id = "readability-content";

      var siblingScoreThreshold = Math.max(10, topCandidate.readability.contentScore * 0.2);
      // Keep potential top candidate's parent node to try to get text direction of it later.
      parentOfTopCandidate = topCandidate.parentNode;
      var siblings = parentOfTopCandidate.children;

      for (var s = 0, sl = siblings.length; s < sl; s++) {
        var sibling = siblings[s];
        var append = false;

        this.log("Looking at sibling node:", sibling, sibling.readability ? ("with score " + sibling.readability.contentScore) : "");
        this.log("Sibling has score", sibling.readability ? sibling.readability.contentScore : "Unknown");

        if (sibling === topCandidate) {
          append = true;
        } else {
          var contentBonus = 0;

          // Give a bonus if sibling nodes and top candidates have the example same classname
          if (sibling.className === topCandidate.className && topCandidate.className !== "")
            contentBonus += topCandidate.readability.contentScore * 0.2;

          if (sibling.readability &&
              ((sibling.readability.contentScore + contentBonus) >= siblingScoreThreshold)) {
            append = true;
          } else if (sibling.nodeName === "P") {
            var linkDensity = this._getLinkDensity(sibling);
            var nodeContent = this._getInnerText(sibling);
            var nodeLength = nodeContent.length;

            if (nodeLength > 80 && linkDensity < 0.25) {
              append = true;
            } else if (nodeLength < 80 && nodeLength > 0 && linkDensity === 0 &&
                       nodeContent.search(/\.( |$)/) !== -1) {
              append = true;
            }
          }
        }

        if (append) {
          this.log("Appending node:", sibling);

          if (this.ALTER_TO_DIV_EXCEPTIONS.indexOf(sibling.nodeName) === -1) {
            // We have a node that isn't a common block level element, like a form or td tag.
            // Turn it into a div so it doesn't get filtered out later by accident.
            this.log("Altering sibling:", sibling, "to div.");

            sibling = this._setNodeTag(sibling, "DIV");
          }

          articleContent.appendChild(sibling);
          // siblings is a reference to the children array, and
          // sibling is removed from the array when we call appendChild().
          // As a result, we must revisit this index since the nodes
          // have been shifted.
          s -= 1;
          sl -= 1;
        }
      }

      if (this._debug)
        this.log("Article content pre-prep: " + articleContent.innerHTML);
      // So we have all of the content that we need. Now we clean it up for presentation.
      this._prepArticle(articleContent);
      if (this._debug)
        this.log("Article content post-prep: " + articleContent.innerHTML);

      if (neededToCreateTopCandidate) {
        // We already created a fake div thing, and there wouldn't have been any siblings left
        // for the previous loop, so there's no point trying to create a new div, and then
        // move all the children over. Just assign IDs and class names here. No need to append
        // because that already happened anyway.
        topCandidate.id = "readability-page-1";
        topCandidate.className = "page";
      } else {
        var div = doc.createElement("DIV");
        div.id = "readability-page-1";
        div.className = "page";
        var children = articleContent.childNodes;
        while (children.length) {
          div.appendChild(children[0]);
        }
        articleContent.appendChild(div);
      }

      if (this._debug)
        this.log("Article content after paging: " + articleContent.innerHTML);

      var parseSuccessful = true;

      // Now that we've gone through the full algorithm, check to see if
      // we got any meaningful content. If we didn't, we may need to re-run
      // grabArticle with different flags set. This gives us a higher likelihood of
      // finding the content, and the sieve approach gives us a higher likelihood of
      // finding the -right- content.
      var textLength = this._getInnerText(articleContent, true).length;
      if (textLength < this._charThreshold) {
        parseSuccessful = false;
        page.innerHTML = pageCacheHtml;

        if (this._flagIsActive(this.FLAG_STRIP_UNLIKELYS)) {
          this._removeFlag(this.FLAG_STRIP_UNLIKELYS);
          this._attempts.push({articleContent: articleContent, textLength: textLength});
        } else if (this._flagIsActive(this.FLAG_WEIGHT_CLASSES)) {
          this._removeFlag(this.FLAG_WEIGHT_CLASSES);
          this._attempts.push({articleContent: articleContent, textLength: textLength});
        } else if (this._flagIsActive(this.FLAG_CLEAN_CONDITIONALLY)) {
          this._removeFlag(this.FLAG_CLEAN_CONDITIONALLY);
          this._attempts.push({articleContent: articleContent, textLength: textLength});
        } else {
          this._attempts.push({articleContent: articleContent, textLength: textLength});
          // No luck after removing flags, just return the longest text we found during the different loops
          this._attempts.sort(function (a, b) {
            return b.textLength - a.textLength;
          });

          // But first check if we actually have something
          if (!this._attempts[0].textLength) {
            return null;
          }

          articleContent = this._attempts[0].articleContent;
          parseSuccessful = true;
        }
      }

      if (parseSuccessful) {
        // Find out text direction from ancestors of final top candidate.
        var ancestors = [parentOfTopCandidate, topCandidate].concat(this._getNodeAncestors(parentOfTopCandidate));
        this._someNode(ancestors, function(ancestor) {
          if (!ancestor.tagName)
            return false;
          var articleDir = ancestor.getAttribute("dir");
          if (articleDir) {
            this._articleDir = articleDir;
            return true;
          }
          return false;
        });
        return articleContent;
      }
    }
  },

  /**
   * Check whether the input string could be a byline.
   * This verifies that the input is a string, and that the length
   * is less than 100 chars.
   *
   * @param possibleByline {string} - a string to check whether its a byline.
   * @return Boolean - whether the input string is a byline.
   */
  _isValidByline: function(byline) {
    if (typeof byline == "string" || byline instanceof String) {
      byline = byline.trim();
      return (byline.length > 0) && (byline.length < 100);
    }
    return false;
  },

  /**
   * Converts some of the common HTML entities in string to their corresponding characters.
   *
   * @param str {string} - a string to unescape.
   * @return string without HTML entity.
   */
  _unescapeHtmlEntities: function(str) {
    if (!str) {
      return str;
    }

    var htmlEscapeMap = this.HTML_ESCAPE_MAP;
    return str.replace(/&(quot|amp|apos|lt|gt);/g, function(_, tag) {
      return htmlEscapeMap[tag];
    }).replace(/&#(?:x([0-9a-z]{1,4})|([0-9]{1,4}));/gi, function(_, hex, numStr) {
      var num = parseInt(hex || numStr, hex ? 16 : 10);
      return String.fromCharCode(num);
    });
  },

  /**
   * Try to extract metadata from JSON-LD object.
   * For now, only Schema.org objects of type Article or its subtypes are supported.
   * @return Object with any metadata that could be extracted (possibly none)
   */
  _getJSONLD: function (doc) {
    var scripts = this._getAllNodesWithTag(doc, ["script"]);

    var jsonLdElement = this._findNode(scripts, function(el) {
      return el.getAttribute("type") === "application/ld+json";
    });

    if (jsonLdElement) {
      try {
        // Strip CDATA markers if present
        var content = jsonLdElement.textContent.replace(/^\s*<!\[CDATA\[|\]\]>\s*$/g, "");
        var parsed = JSON.parse(content);
        var metadata = {};
        if (
          !parsed["@context"] ||
          !parsed["@context"].match(/^https?\:\/\/schema\.org$/)
        ) {
          return metadata;
        }

        if (!parsed["@type"] && Array.isArray(parsed["@graph"])) {
          parsed = parsed["@graph"].find(function(it) {
            return (it["@type"] || "").match(
              this.REGEXPS.jsonLdArticleTypes
            );
          });
        }

        if (
          !parsed ||
          !parsed["@type"] ||
          !parsed["@type"].match(this.REGEXPS.jsonLdArticleTypes)
        ) {
          return metadata;
        }
        if (typeof parsed.name === "string") {
          metadata.title = parsed.name.trim();
        } else if (typeof parsed.headline === "string") {
          metadata.title = parsed.headline.trim();
        }
        if (parsed.author) {
          if (typeof parsed.author.name === "string") {
            metadata.byline = parsed.author.name.trim();
          } else if (Array.isArray(parsed.author) && parsed.author[0] && typeof parsed.author[0].name === "string") {
            metadata.byline = parsed.author
              .filter(function(author) {
                return author && typeof author.name === "string";
              })
              .map(function(author) {
                return author.name.trim();
              })
              .join(", ");
          }
        }
        if (typeof parsed.description === "string") {
          metadata.excerpt = parsed.description.trim();
        }
        if (
          parsed.publisher &&
          typeof parsed.publisher.name === "string"
        ) {
          metadata.siteName = parsed.publisher.name.trim();
        }
        return metadata;
      } catch (err) {
        this.log(err.message);
      }
    }
    return {};
  },

  /**
   * Attempts to get excerpt and byline metadata for the article.
   *
   * @param {Object} jsonld — object containing any metadata that
   * could be extracted from JSON-LD object.
   *
   * @return Object with optional "excerpt" and "byline" properties
   */
  _getArticleMetadata: function(jsonld) {
    var metadata = {};
    var values = {};
    var metaElements = this._doc.getElementsByTagName("meta");

    // property is a space-separated list of values
    var propertyPattern = /\s*(dc|dcterm|og|twitter)\s*:\s*(author|creator|description|title|site_name)\s*/gi;

    // name is a single value
    var namePattern = /^\s*(?:(dc|dcterm|og|twitter|weibo:(article|webpage))\s*[\.:]\s*)?(author|creator|description|title|site_name)\s*$/i;

    // Find description tags.
    this._forEachNode(metaElements, function(element) {
      var elementName = element.getAttribute("name");
      var elementProperty = element.getAttribute("property");
      var content = element.getAttribute("content");
      if (!content) {
        return;
      }
      var matches = null;
      var name = null;

      if (elementProperty) {
        matches = elementProperty.match(propertyPattern);
        if (matches) {
          // Convert to lowercase, and remove any whitespace
          // so we can match below.
          name = matches[0].toLowerCase().replace(/\s/g, "");
          // multiple authors
          values[name] = content.trim();
        }
      }
      if (!matches && elementName && namePattern.test(elementName)) {
        name = elementName;
        if (content) {
          // Convert to lowercase, remove any whitespace, and convert dots
          // to colons so we can match below.
          name = name.toLowerCase().replace(/\s/g, "").replace(/\./g, ":");
          values[name] = content.trim();
        }
      }
    });

    // get title
    metadata.title = jsonld.title ||
                     values["dc:title"] ||
                     values["dcterm:title"] ||
                     values["og:title"] ||
                     values["weibo:article:title"] ||
                     values["weibo:webpage:title"] ||
                     values["title"] ||
                     values["twitter:title"];

    if (!metadata.title) {
      metadata.title = this._getArticleTitle();
    }

    // get author
    metadata.byline = jsonld.byline ||
                      values["dc:creator"] ||
                      values["dcterm:creator"] ||
                      values["author"];

    // get description
    metadata.excerpt = jsonld.excerpt ||
                       values["dc:description"] ||
                       values["dcterm:description"] ||
                       values["og:description"] ||
                       values["weibo:article:description"] ||
                       values["weibo:webpage:description"] ||
                       values["description"] ||
                       values["twitter:description"];

    // get site name
    metadata.siteName = jsonld.siteName ||
                        values["og:site_name"];

    // in many sites the meta value is escaped with HTML entities,
    // so here we need to unescape it
    metadata.title = this._unescapeHtmlEntities(metadata.title);
    metadata.byline = this._unescapeHtmlEntities(metadata.byline);
    metadata.excerpt = this._unescapeHtmlEntities(metadata.excerpt);
    metadata.siteName = this._unescapeHtmlEntities(metadata.siteName);

    return metadata;
  },

  /**
   * Check if node is image, or if node contains exactly only one image
   * whether as a direct child or as its descendants.
   *
   * @param Element
  **/
  _isSingleImage: function(node) {
    if (node.tagName === "IMG") {
      return true;
    }

    if (node.children.length !== 1 || node.textContent.trim() !== "") {
      return false;
    }

    return this._isSingleImage(node.children[0]);
  },

  /**
   * Find all <noscript> that are located after <img> nodes, and which contain only one
   * <img> element. Replace the first image with the image from inside the <noscript> tag,
   * and remove the <noscript> tag. This improves the quality of the images we use on
   * some sites (e.g. Medium).
   *
   * @param Element
  **/
  _unwrapNoscriptImages: function(doc) {
    // Find img without source or attributes that might contains image, and remove it.
    // This is done to prevent a placeholder img is replaced by img from noscript in next step.
    var imgs = Array.from(doc.getElementsByTagName("img"));
    this._forEachNode(imgs, function(img) {
      for (var i = 0; i < img.attributes.length; i++) {
        var attr = img.attributes[i];
        switch (attr.name) {
          case "src":
          case "srcset":
          case "data-src":
          case "data-srcset":
            return;
        }

        if (/\.(jpg|jpeg|png|webp)/i.test(attr.value)) {
          return;
        }
      }

      img.parentNode.removeChild(img);
    });

    // Next find noscript and try to extract its image
    var noscripts = Array.from(doc.getElementsByTagName("noscript"));
    this._forEachNode(noscripts, function(noscript) {
      // Parse content of noscript and make sure it only contains image
      var tmp = doc.createElement("div");
      tmp.innerHTML = noscript.innerHTML;
      if (!this._isSingleImage(tmp)) {
        return;
      }

      // If noscript has previous sibling and it only contains image,
      // replace it with noscript content. However we also keep old
      // attributes that might contains image.
      var prevElement = noscript.previousElementSibling;
      if (prevElement && this._isSingleImage(prevElement)) {
        var prevImg = prevElement;
        if (prevImg.tagName !== "IMG") {
          prevImg = prevElement.getElementsByTagName("img")[0];
        }

        var newImg = tmp.getElementsByTagName("img")[0];
        for (var i = 0; i < prevImg.attributes.length; i++) {
          var attr = prevImg.attributes[i];
          if (attr.value === "") {
            continue;
          }

          if (attr.name === "src" || attr.name === "srcset" || /\.(jpg|jpeg|png|webp)/i.test(attr.value)) {
            if (newImg.getAttribute(attr.name) === attr.value) {
              continue;
            }

            var attrName = attr.name;
            if (newImg.hasAttribute(attrName)) {
              attrName = "data-old-" + attrName;
            }

            newImg.setAttribute(attrName, attr.value);
          }
        }

        noscript.parentNode.replaceChild(tmp.firstElementChild, prevElement);
      }
    });
  },

  /**
   * Removes script tags from the document.
   *
   * @param Element
  **/
  _removeScripts: function(doc) {
    this._removeNodes(this._getAllNodesWithTag(doc, ["script"]), function(scriptNode) {
      scriptNode.nodeValue = "";
      scriptNode.removeAttribute("src");
      return true;
    });
    this._removeNodes(this._getAllNodesWithTag(doc, ["noscript"]));
  },

  /**
   * Check if this node has only whitespace and a single element with given tag
   * Returns false if the DIV node contains non-empty text nodes
   * or if it contains no element with given tag or more than 1 element.
   *
   * @param Element
   * @param string tag of child element
  **/
  _hasSingleTagInsideElement: function(element, tag) {
    // There should be exactly 1 element child with given tag
    if (element.children.length != 1 || element.children[0].tagName !== tag) {
      return false;
    }

    // And there should be no text nodes with real content
    return !this._someNode(element.childNodes, function(node) {
      return node.nodeType === this.TEXT_NODE &&
             this.REGEXPS.hasContent.test(node.textContent);
    });
  },

  _isElementWithoutContent: function(node) {
    return node.nodeType === this.ELEMENT_NODE &&
      node.textContent.trim().length == 0 &&
      (node.children.length == 0 ||
       node.children.length == node.getElementsByTagName("br").length + node.getElementsByTagName("hr").length);
  },

  /**
   * Determine whether element has any children block level elements.
   *
   * @param Element
   */
  _hasChildBlockElement: function (element) {
    return this._someNode(element.childNodes, function(node) {
      return this.DIV_TO_P_ELEMS.has(node.tagName) ||
             this._hasChildBlockElement(node);
    });
  },

  /***
   * Determine if a node qualifies as phrasing content.
   * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content
  **/
  _isPhrasingContent: function(node) {
    return node.nodeType === this.TEXT_NODE || this.PHRASING_ELEMS.indexOf(node.tagName) !== -1 ||
      ((node.tagName === "A" || node.tagName === "DEL" || node.tagName === "INS") &&
        this._everyNode(node.childNodes, this._isPhrasingContent));
  },

  _isWhitespace: function(node) {
    return (node.nodeType === this.TEXT_NODE && node.textContent.trim().length === 0) ||
           (node.nodeType === this.ELEMENT_NODE && node.tagName === "BR");
  },

  /**
   * Get the inner text of a node - cross browser compatibly.
   * This also strips out any excess whitespace to be found.
   *
   * @param Element
   * @param Boolean normalizeSpaces (default: true)
   * @return string
  **/
  _getInnerText: function(e, normalizeSpaces) {
    normalizeSpaces = (typeof normalizeSpaces === "undefined") ? true : normalizeSpaces;
    var textContent = e.textContent.trim();

    if (normalizeSpaces) {
      return textContent.replace(this.REGEXPS.normalize, " ");
    }
    return textContent;
  },

  /**
   * Get the number of times a string s appears in the node e.
   *
   * @param Element
   * @param string - what to split on. Default is ","
   * @return number (integer)
  **/
  _getCharCount: function(e, s) {
    s = s || ",";
    return this._getInnerText(e).split(s).length - 1;
  },

  /**
   * Remove the style attribute on every e and under.
   * TODO: Test if getElementsByTagName(*) is faster.
   *
   * @param Element
   * @return void
  **/
  _cleanStyles: function(e) {
    if (!e || e.tagName.toLowerCase() === "svg")
      return;

    // Remove `style` and deprecated presentational attributes
    for (var i = 0; i < this.PRESENTATIONAL_ATTRIBUTES.length; i++) {
      e.removeAttribute(this.PRESENTATIONAL_ATTRIBUTES[i]);
    }

    if (this.DEPRECATED_SIZE_ATTRIBUTE_ELEMS.indexOf(e.tagName) !== -1) {
      e.removeAttribute("width");
      e.removeAttribute("height");
    }

    var cur = e.firstElementChild;
    while (cur !== null) {
      this._cleanStyles(cur);
      cur = cur.nextElementSibling;
    }
  },

  /**
   * Get the density of links as a percentage of the content
   * This is the amount of text that is inside a link divided by the total text in the node.
   *
   * @param Element
   * @return number (float)
  **/
  _getLinkDensity: function(element) {
    var textLength = this._getInnerText(element).length;
    if (textLength === 0)
      return 0;

    var linkLength = 0;

    // XXX implement _reduceNodeList?
    this._forEachNode(element.getElementsByTagName("a"), function(linkNode) {
      var href = linkNode.getAttribute("href");
      var coefficient = href && this.REGEXPS.hashUrl.test(href) ? 0.3 : 1;
      linkLength += this._getInnerText(linkNode).length * coefficient;
    });

    return linkLength / textLength;
  },

  /**
   * Get an elements class/id weight. Uses regular expressions to tell if this
   * element looks good or bad.
   *
   * @param Element
   * @return number (Integer)
  **/
  _getClassWeight: function(e) {
    if (!this._flagIsActive(this.FLAG_WEIGHT_CLASSES))
      return 0;

    var weight = 0;

    // Look for a special classname
    if (typeof(e.className) === "string" && e.className !== "") {
      if (this.REGEXPS.negative.test(e.className))
        weight -= 25;

      if (this.REGEXPS.positive.test(e.className))
        weight += 25;
    }

    // Look for a special ID
    if (typeof(e.id) === "string" && e.id !== "") {
      if (this.REGEXPS.negative.test(e.id))
        weight -= 25;

      if (this.REGEXPS.positive.test(e.id))
        weight += 25;
    }

    return weight;
  },

  /**
   * Clean a node of all elements of type "tag".
   * (Unless it's a youtube/vimeo video. People love movies.)
   *
   * @param Element
   * @param string tag to clean
   * @return void
   **/
  _clean: function(e, tag) {
    var isEmbed = ["object", "embed", "iframe"].indexOf(tag) !== -1;

    this._removeNodes(this._getAllNodesWithTag(e, [tag]), function(element) {
      // Allow youtube and vimeo videos through as people usually want to see those.
      if (isEmbed) {
        // First, check the elements attributes to see if any of them contain youtube or vimeo
        for (var i = 0; i < element.attributes.length; i++) {
          if (this.REGEXPS.videos.test(element.attributes[i].value)) {
            return false;
          }
        }

        // For embed with <object> tag, check inner HTML as well.
        if (element.tagName === "object" && this.REGEXPS.videos.test(element.innerHTML)) {
          return false;
        }
      }

      return true;
    });
  },

  /**
   * Check if a given node has one of its ancestor tag name matching the
   * provided one.
   * @param  HTMLElement node
   * @param  String      tagName
   * @param  Number      maxDepth
   * @param  Function    filterFn a filter to invoke to determine whether this node 'counts'
   * @return Boolean
   */
  _hasAncestorTag: function(node, tagName, maxDepth, filterFn) {
    maxDepth = maxDepth || 3;
    tagName = tagName.toUpperCase();
    var depth = 0;
    while (node.parentNode) {
      if (maxDepth > 0 && depth > maxDepth)
        return false;
      if (node.parentNode.tagName === tagName && (!filterFn || filterFn(node.parentNode)))
        return true;
      node = node.parentNode;
      depth++;
    }
    return false;
  },

  /**
   * Return an object indicating how many rows and columns this table has.
   */
  _getRowAndColumnCount: function(table) {
    var rows = 0;
    var columns = 0;
    var trs = table.getElementsByTagName("tr");
    for (var i = 0; i < trs.length; i++) {
      var rowspan = trs[i].getAttribute("rowspan") || 0;
      if (rowspan) {
        rowspan = parseInt(rowspan, 10);
      }
      rows += (rowspan || 1);

      // Now look for column-related info
      var columnsInThisRow = 0;
      var cells = trs[i].getElementsByTagName("td");
      for (var j = 0; j < cells.length; j++) {
        var colspan = cells[j].getAttribute("colspan") || 0;
        if (colspan) {
          colspan = parseInt(colspan, 10);
        }
        columnsInThisRow += (colspan || 1);
      }
      columns = Math.max(columns, columnsInThisRow);
    }
    return {rows: rows, columns: columns};
  },

  /**
   * Look for 'data' (as opposed to 'layout') tables, for which we use
   * similar checks as
   * https://searchfox.org/mozilla-central/rev/f82d5c549f046cb64ce5602bfd894b7ae807c8f8/accessible/generic/TableAccessible.cpp#19
   */
  _markDataTables: function(root) {
    var tables = root.getElementsByTagName("table");
    for (var i = 0; i < tables.length; i++) {
      var table = tables[i];
      var role = table.getAttribute("role");
      if (role == "presentation") {
        table._readabilityDataTable = false;
        continue;
      }
      var datatable = table.getAttribute("datatable");
      if (datatable == "0") {
        table._readabilityDataTable = false;
        continue;
      }
      var summary = table.getAttribute("summary");
      if (summary) {
        table._readabilityDataTable = true;
        continue;
      }

      var caption = table.getElementsByTagName("caption")[0];
      if (caption && caption.childNodes.length > 0) {
        table._readabilityDataTable = true;
        continue;
      }

      // If the table has a descendant with any of these tags, consider a data table:
      var dataTableDescendants = ["col", "colgroup", "tfoot", "thead", "th"];
      var descendantExists = function(tag) {
        return !!table.getElementsByTagName(tag)[0];
      };
      if (dataTableDescendants.some(descendantExists)) {
        this.log("Data table because found data-y descendant");
        table._readabilityDataTable = true;
        continue;
      }

      // Nested tables indicate a layout table:
      if (table.getElementsByTagName("table")[0]) {
        table._readabilityDataTable = false;
        continue;
      }

      var sizeInfo = this._getRowAndColumnCount(table);
      if (sizeInfo.rows >= 10 || sizeInfo.columns > 4) {
        table._readabilityDataTable = true;
        continue;
      }
      // Now just go by size entirely:
      table._readabilityDataTable = sizeInfo.rows * sizeInfo.columns > 10;
    }
  },

  /* convert images and figures that have properties like data-src into images that can be loaded without JS */
  _fixLazyImages: function (root) {
    this._forEachNode(this._getAllNodesWithTag(root, ["img", "picture", "figure"]), function (elem) {
      // In some sites (e.g. Kotaku), they put 1px square image as base64 data uri in the src attribute.
      // So, here we check if the data uri is too short, just might as well remove it.
      if (elem.src && this.REGEXPS.b64DataUrl.test(elem.src)) {
        // Make sure it's not SVG, because SVG can have a meaningful image in under 133 bytes.
        var parts = this.REGEXPS.b64DataUrl.exec(elem.src);
        if (parts[1] === "image/svg+xml") {
          return;
        }

        // Make sure this element has other attributes which contains image.
        // If it doesn't, then this src is important and shouldn't be removed.
        var srcCouldBeRemoved = false;
        for (var i = 0; i < elem.attributes.length; i++) {
          var attr = elem.attributes[i];
          if (attr.name === "src") {
            continue;
          }

          if (/\.(jpg|jpeg|png|webp)/i.test(attr.value)) {
            srcCouldBeRemoved = true;
            break;
          }
        }

        // Here we assume if image is less than 100 bytes (or 133B after encoded to base64)
        // it will be too small, therefore it might be placeholder image.
        if (srcCouldBeRemoved) {
          var b64starts = elem.src.search(/base64\s*/i) + 7;
          var b64length = elem.src.length - b64starts;
          if (b64length < 133) {
            elem.removeAttribute("src");
          }
        }
      }

      // also check for "null" to work around https://github.com/jsdom/jsdom/issues/2580
      if ((elem.src || (elem.srcset && elem.srcset != "null")) && elem.className.toLowerCase().indexOf("lazy") === -1) {
        return;
      }

      for (var j = 0; j < elem.attributes.length; j++) {
        attr = elem.attributes[j];
        if (attr.name === "src" || attr.name === "srcset") {
          continue;
        }
        var copyTo = null;
        if (/\.(jpg|jpeg|png|webp)\s+\d/.test(attr.value)) {
          copyTo = "srcset";
        } else if (/^\s*\S+\.(jpg|jpeg|png|webp)\S*\s*$/.test(attr.value)) {
          copyTo = "src";
        }
        if (copyTo) {
          //if this is an img or picture, set the attribute directly
          if (elem.tagName === "IMG" || elem.tagName === "PICTURE") {
            elem.setAttribute(copyTo, attr.value);
          } else if (elem.tagName === "FIGURE" && !this._getAllNodesWithTag(elem, ["img", "picture"]).length) {
            //if the item is a <figure> that does not contain an image or picture, create one and place it inside the figure
            //see the nytimes-3 testcase for an example
            var img = this._doc.createElement("img");
            img.setAttribute(copyTo, attr.value);
            elem.appendChild(img);
          }
        }
      }
    });
  },

  _getTextDensity: function(e, tags) {
    var textLength = this._getInnerText(e, true).length;
    if (textLength === 0) {
      return 0;
    }
    var childrenLength = 0;
    var children = this._getAllNodesWithTag(e, tags);
    this._forEachNode(children, (child) => childrenLength += this._getInnerText(child, true).length);
    return childrenLength / textLength;
  },

  /**
   * Clean an element of all tags of type "tag" if they look fishy.
   * "Fishy" is an algorithm based on content length, classnames, link density, number of images & embeds, etc.
   *
   * @return void
   **/
  _cleanConditionally: function(e, tag) {
    if (!this._flagIsActive(this.FLAG_CLEAN_CONDITIONALLY))
      return;

    // Gather counts for other typical elements embedded within.
    // Traverse backwards so we can remove nodes at the same time
    // without effecting the traversal.
    //
    // TODO: Consider taking into account original contentScore here.
    this._removeNodes(this._getAllNodesWithTag(e, [tag]), function(node) {
      // First check if this node IS data table, in which case don't remove it.
      var isDataTable = function(t) {
        return t._readabilityDataTable;
      };

      var isList = tag === "ul" || tag === "ol";
      if (!isList) {
        var listLength = 0;
        var listNodes = this._getAllNodesWithTag(node, ["ul", "ol"]);
        this._forEachNode(listNodes, (list) => listLength += this._getInnerText(list).length);
        isList = listLength / this._getInnerText(node).length > 0.9;
      }

      if (tag === "table" && isDataTable(node)) {
        return false;
      }

      // Next check if we're inside a data table, in which case don't remove it as well.
      if (this._hasAncestorTag(node, "table", -1, isDataTable)) {
        return false;
      }

      if (this._hasAncestorTag(node, "code")) {
        return false;
      }

      var weight = this._getClassWeight(node);

      this.log("Cleaning Conditionally", node);

      var contentScore = 0;

      if (weight + contentScore < 0) {
        return true;
      }

      if (this._getCharCount(node, ",") < 10) {
        // If there are not very many commas, and the number of
        // non-paragraph elements is more than paragraphs or other
        // ominous signs, remove the element.
        var p = node.getElementsByTagName("p").length;
        var img = node.getElementsByTagName("img").length;
        var li = node.getElementsByTagName("li").length - 100;
        var input = node.getElementsByTagName("input").length;
        var headingDensity = this._getTextDensity(node, ["h1", "h2", "h3", "h4", "h5", "h6"]);

        var embedCount = 0;
        var embeds = this._getAllNodesWithTag(node, ["object", "embed", "iframe"]);

        for (var i = 0; i < embeds.length; i++) {
          // If this embed has attribute that matches video regex, don't delete it.
          for (var j = 0; j < embeds[i].attributes.length; j++) {
            if (this.REGEXPS.videos.test(embeds[i].attributes[j].value)) {
              return false;
            }
          }

          // For embed with <object> tag, check inner HTML as well.
          if (embeds[i].tagName === "object" && this.REGEXPS.videos.test(embeds[i].innerHTML)) {
            return false;
          }

          embedCount++;
        }

        var linkDensity = this._getLinkDensity(node);
        var contentLength = this._getInnerText(node).length;

        var haveToRemove =
          (img > 1 && p / img < 0.5 && !this._hasAncestorTag(node, "figure")) ||
          (!isList && li > p) ||
          (input > Math.floor(p/3)) ||
          (!isList && headingDensity < 0.9 && contentLength < 25 && (img === 0 || img > 2) && !this._hasAncestorTag(node, "figure")) ||
          (!isList && weight < 25 && linkDensity > 0.2) ||
          (weight >= 25 && linkDensity > 0.5) ||
          ((embedCount === 1 && contentLength < 75) || embedCount > 1);
        return haveToRemove;
      }
      return false;
    });
  },

  /**
   * Clean out elements that match the specified conditions
   *
   * @param Element
   * @param Function determines whether a node should be removed
   * @return void
   **/
  _cleanMatchedNodes: function(e, filter) {
    var endOfSearchMarkerNode = this._getNextNode(e, true);
    var next = this._getNextNode(e);
    while (next && next != endOfSearchMarkerNode) {
      if (filter.call(this, next, next.className + " " + next.id)) {
        next = this._removeAndGetNext(next);
      } else {
        next = this._getNextNode(next);
      }
    }
  },

  /**
   * Clean out spurious headers from an Element.
   *
   * @param Element
   * @return void
  **/
  _cleanHeaders: function(e) {
    let headingNodes = this._getAllNodesWithTag(e, ["h1", "h2"]);
    this._removeNodes(headingNodes, function(node) {
      let shouldRemove = this._getClassWeight(node) < 0;
      if (shouldRemove) {
        this.log("Removing header with low class weight:", node);
      }
      return shouldRemove;
    });
  },

  /**
   * Check if this node is an H1 or H2 element whose content is mostly
   * the same as the article title.
   *
   * @param Element  the node to check.
   * @return boolean indicating whether this is a title-like header.
   */
  _headerDuplicatesTitle: function(node) {
    if (node.tagName != "H1" && node.tagName != "H2") {
      return false;
    }
    var heading = this._getInnerText(node, false);
    this.log("Evaluating similarity of header:", heading, this._articleTitle);
    return this._textSimilarity(this._articleTitle, heading) > 0.75;
  },

  _flagIsActive: function(flag) {
    return (this._flags & flag) > 0;
  },

  _removeFlag: function(flag) {
    this._flags = this._flags & ~flag;
  },

  _isProbablyVisible: function(node) {
    // Have to null-check node.style and node.className.indexOf to deal with SVG and MathML nodes.
    return (!node.style || node.style.display != "none")
      && !node.hasAttribute("hidden")
      //check for "fallback-image" so that wikimedia math images are displayed
      && (!node.hasAttribute("aria-hidden") || node.getAttribute("aria-hidden") != "true" || (node.className && node.className.indexOf && node.className.indexOf("fallback-image") !== -1));
  },

  /**
   * Runs readability.
   *
   * Workflow:
   *  1. Prep the document by removing script tags, css, etc.
   *  2. Build readability's DOM tree.
   *  3. Grab the article content from the current dom tree.
   *  4. Replace the current DOM tree with the new one.
   *  5. Read peacefully.
   *
   * @return void
   **/
  parse: function () {
    // Avoid parsing too large documents, as per configuration option
    if (this._maxElemsToParse > 0) {
      var numTags = this._doc.getElementsByTagName("*").length;
      if (numTags > this._maxElemsToParse) {
        throw new Error("Aborting parsing document; " + numTags + " elements found");
      }
    }

    // Unwrap image from noscript
    this._unwrapNoscriptImages(this._doc);

    // Extract JSON-LD metadata before removing scripts
    var jsonLd = this._disableJSONLD ? {} : this._getJSONLD(this._doc);

    // Remove script tags from the document.
    this._removeScripts(this._doc);

    this._prepDocument();

    var metadata = this._getArticleMetadata(jsonLd);
    this._articleTitle = metadata.title;

    var articleContent = this._grabArticle();
    if (!articleContent)
      return null;

    this.log("Grabbed: " + articleContent.innerHTML);

    this._postProcessContent(articleContent);

    // If we haven't found an excerpt in the article's metadata, use the article's
    // first paragraph as the excerpt. This is used for displaying a preview of
    // the article's content.
    if (!metadata.excerpt) {
      var paragraphs = articleContent.getElementsByTagName("p");
      if (paragraphs.length > 0) {
        metadata.excerpt = paragraphs[0].textContent.trim();
      }
    }

    var textContent = articleContent.textContent;
    return {
      title: this._articleTitle,
      byline: metadata.byline || this._articleByline,
      dir: this._articleDir,
      content: this._serializer(articleContent),
      textContent: textContent,
      length: textContent.length,
      excerpt: metadata.excerpt,
      siteName: metadata.siteName || this._articleSiteName
    };
  }
};

{
  module.exports = Readability;
}
}(Readability$1));

var ReadabilityReaderable = {exports: {}};

/* eslint-env es6:false */

(function (module) {
/*
 * Copyright (c) 2010 Arc90 Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * This code is heavily based on Arc90's readability.js (1.7.1) script
 * available at: http://code.google.com/p/arc90labs-readability
 */

var REGEXPS = {
  // NOTE: These two regular expressions are duplicated in
  // Readability.js. Please keep both copies in sync.
  unlikelyCandidates: /-ad-|ai2html|banner|breadcrumbs|combx|comment|community|cover-wrap|disqus|extra|footer|gdpr|header|legends|menu|related|remark|replies|rss|shoutbox|sidebar|skyscraper|social|sponsor|supplemental|ad-break|agegate|pagination|pager|popup|yom-remote/i,
  okMaybeItsACandidate: /and|article|body|column|content|main|shadow/i,
};

function isNodeVisible(node) {
  // Have to null-check node.style and node.className.indexOf to deal with SVG and MathML nodes.
  return (!node.style || node.style.display != "none")
    && !node.hasAttribute("hidden")
    //check for "fallback-image" so that wikimedia math images are displayed
    && (!node.hasAttribute("aria-hidden") || node.getAttribute("aria-hidden") != "true" || (node.className && node.className.indexOf && node.className.indexOf("fallback-image") !== -1));
}

/**
 * Decides whether or not the document is reader-able without parsing the whole thing.
 * @param {Object} options Configuration object.
 * @param {number} [options.minContentLength=140] The minimum node content length used to decide if the document is readerable.
 * @param {number} [options.minScore=20] The minumum cumulated 'score' used to determine if the document is readerable.
 * @param {Function} [options.visibilityChecker=isNodeVisible] The function used to determine if a node is visible.
 * @return {boolean} Whether or not we suspect Readability.parse() will suceeed at returning an article object.
 */
function isProbablyReaderable(doc, options = {}) {
  // For backward compatibility reasons 'options' can either be a configuration object or the function used
  // to determine if a node is visible.
  if (typeof options == "function") {
    options = { visibilityChecker: options };
  }

  var defaultOptions = { minScore: 20, minContentLength: 140, visibilityChecker: isNodeVisible };
  options = Object.assign(defaultOptions, options);

  var nodes = doc.querySelectorAll("p, pre");

  // Get <div> nodes which have <br> node(s) and append them into the `nodes` variable.
  // Some articles' DOM structures might look like
  // <div>
  //   Sentences<br>
  //   <br>
  //   Sentences<br>
  // </div>
  var brNodes = doc.querySelectorAll("div > br");
  if (brNodes.length) {
    var set = new Set(nodes);
    [].forEach.call(brNodes, function (node) {
      set.add(node.parentNode);
    });
    nodes = Array.from(set);
  }

  var score = 0;
  // This is a little cheeky, we use the accumulator 'score' to decide what to return from
  // this callback:
  return [].some.call(nodes, function (node) {
    if (!options.visibilityChecker(node)) {
      return false;
    }

    var matchString = node.className + " " + node.id;
    if (REGEXPS.unlikelyCandidates.test(matchString) &&
        !REGEXPS.okMaybeItsACandidate.test(matchString)) {
      return false;
    }

    if (node.matches("li p")) {
      return false;
    }

    var textContentLength = node.textContent.trim().length;
    if (textContentLength < options.minContentLength) {
      return false;
    }

    score += Math.sqrt(textContentLength - options.minContentLength);

    if (score > options.minScore) {
      return true;
    }
    return false;
  });
}

{
  module.exports = isProbablyReaderable;
}
}(ReadabilityReaderable));

var Readability = Readability$1.exports;
var isProbablyReaderable = ReadabilityReaderable.exports;

var readability = {
  Readability: Readability,
  isProbablyReaderable: isProbablyReaderable
};

class WebsiteParser extends Parser {
    constructor(settings) {
        super(settings);
    }
    test(url) {
        return this.isValidUrl(url);
    }
    prepareNote(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield obsidian.request({ method: 'GET', url });
            const dom = new DOMParser().parseFromString(response, 'text/html');
            // Set base to allow Readability to resolve relative path's
            const baseEl = dom.createElement('base');
            baseEl.setAttribute('href', getBaseUrl(url));
            dom.head.append(baseEl);
            const article = new readability.Readability(dom).parse();
            return (article === null || article === void 0 ? void 0 : article.content) ? this.parsableArticle(article, url) : this.notParsableArticle(url);
        });
    }
    parsableArticle(article, url) {
        const articleTitle = article.title || 'No title';
        const articleContent = obsidian.htmlToMarkdown(article.content);
        const content = this.settings.parsableArticleNote
            .replace('%articleTitle%', articleTitle)
            .replace('%articleURL%', url)
            .replace('%articleContent%', articleContent);
        const fileName = `${articleTitle}.md`;
        return new Note(fileName, content);
    }
    notParsableArticle(url) {
        console.error('Website not parseable');
        const content = this.settings.notParsableArticleNote.replace('%articleURL%', url);
        const fileName = `Article (${this.getFormattedDateForFilename()}).md`;
        return new Note(fileName, content);
    }
}

class TextSnippetParser extends Parser {
    constructor(settings) {
        super(settings);
    }
    test() {
        return true;
    }
    prepareNote(text) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileName = `Notice ${this.getFormattedDateForFilename()}.md`;
            const content = this.settings.textSnippetNote.replace('%content%', text);
            return new Note(fileName, content);
        });
    }
}

class ReadItLaterPlugin extends obsidian.Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadSettings();
            this.parsers = [
                new YoutubeParser(this.settings),
                new TwitterParser(this.settings),
                new WebsiteParser(this.settings),
                new TextSnippetParser(this.settings),
            ];
            obsidian.addIcon('read-it-later', clipboardIcon);
            this.addRibbonIcon('read-it-later', 'ReadItLater: Save clipboard', () => __awaiter(this, void 0, void 0, function* () {
                yield this.processClipboard();
            }));
            this.addCommand({
                id: 'save-clipboard-to-notice',
                name: 'Save clipboard',
                callback: () => __awaiter(this, void 0, void 0, function* () {
                    yield this.processClipboard();
                }),
            });
            this.addSettingTab(new ReadItLaterSettingsTab(this.app, this));
        });
    }
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
        });
    }
    saveSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveData(this.settings);
        });
    }
    processClipboard() {
        return __awaiter(this, void 0, void 0, function* () {
            const clipboardContent = yield navigator.clipboard.readText();
            for (const parser of this.parsers) {
                if (parser.test(clipboardContent)) {
                    const note = yield parser.prepareNote(clipboardContent);
                    yield this.writeFile(note.fileName, note.content);
                    break;
                }
            }
        });
    }
    writeFile(fileName, content) {
        return __awaiter(this, void 0, void 0, function* () {
            let filePath;
            fileName = normalizeFilename(fileName);
            if (!(yield this.app.vault.adapter.exists(obsidian.normalizePath(this.settings.inboxDir)))) {
                new obsidian.Notice("The configured Inbox directory don't exist! Please create it first.");
                return;
                //await this.app.vault.adapter.mkdir(normalizePath(this.settings.inboxDir));
            }
            if (this.settings.inboxDir) {
                filePath = obsidian.normalizePath(`${this.settings.inboxDir}/${fileName}`);
            }
            else {
                filePath = obsidian.normalizePath(`/${fileName}`);
            }
            if (yield this.app.vault.adapter.exists(filePath)) {
                new obsidian.Notice(`${fileName} already exists!`);
            }
            else {
                this.app.vault.create(filePath, content);
                new obsidian.Notice(`${fileName} created successful`);
            }
        });
    }
}
const clipboardIcon = `
<svg fill="currentColor" stroke="currentColor" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
	<g>
		<path d="m365.9,144.9c-12.3,0-24.2,1.8-35.4,5.2v-114.7h-96.9l7.3-35.4h-150.2l6.8,35.4h-97.5v454.6h330.5v-102.1c11.2,3.4 23.1,5.2 35.4,5.2 68.8-0.1 124.1-56.4 124.1-124.1 0-67.8-55.3-124.1-124.1-124.1zm-150.1-124l-10.4,50h-79.2l-9.4-50h99zm93.8,448.2h-288.7v-412.8h80.7l6.8,35.4h113.6l7.3-35.4h80.3v102.2c-27.3,14-48.8,37.9-59.7,66.7h-200.9v20.8h195c-1.4,7.4-2.2,15.1-2.2,22.9 0,13.4 2.2,26.4 6.2,38.6h-199v20.9h208.1c12,21.8 30.3,39.7 52.5,51.1v89.6zm56.3-98c-57.3,0-103.2-46.9-103.2-103.2s46.9-103.2 103.2-103.2c57.3,0 103.2,46.9 103.2,103.2s-45.8,103.2-103.2,103.2z"/>
		<polygon points="426.4,223.1 346.1,303.4 313.8,271.1 299.2,285.7 346.1,332.6 441,237.7   "/>
		<rect width="233.5" x="49" y="143.9" height="20.9"/>
		<rect width="233.5" x="49" y="388.9" height="20.9"/>
	</g>
</svg>`;

module.exports = ReadItLaterPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy9oZWxwZXIudHMiLCJzcmMvc2V0dGluZ3MudHMiLCJzcmMvcGFyc2Vycy9Ob3RlLnRzIiwic3JjL3BhcnNlcnMvUGFyc2VyLnRzIiwic3JjL3BhcnNlcnMvWW91dHViZVBhcnNlci50cyIsInNyYy9wYXJzZXJzL1R3aXR0ZXJQYXJzZXIudHMiLCJub2RlX21vZHVsZXMvQG1vemlsbGEvcmVhZGFiaWxpdHkvUmVhZGFiaWxpdHkuanMiLCJub2RlX21vZHVsZXMvQG1vemlsbGEvcmVhZGFiaWxpdHkvUmVhZGFiaWxpdHktcmVhZGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9AbW96aWxsYS9yZWFkYWJpbGl0eS9pbmRleC5qcyIsInNyYy9wYXJzZXJzL1dlYnNpdGVQYXJzZXIudHMiLCJzcmMvcGFyc2Vycy9UZXh0U25pcHBldFBhcnNlci50cyIsInNyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpudWxsLCJuYW1lcyI6WyJQbHVnaW5TZXR0aW5nVGFiIiwiU2V0dGluZyIsIm1vbWVudCIsInJlcXVlc3QiLCJyZXF1aXJlJCQwIiwicmVxdWlyZSQkMSIsIlJlYWRhYmlsaXR5IiwiaHRtbFRvTWFya2Rvd24iLCJQbHVnaW4iLCJhZGRJY29uIiwibm9ybWFsaXplUGF0aCIsIk5vdGljZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF1REE7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUs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
