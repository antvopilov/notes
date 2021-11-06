---
type: article
tags:
- markdown
- mdx
categories: 
- [[markdown]]
- [[obsidian]]
---
[[../markdown/markdown]]
https://dev.to/joeholmes/creating-a-diy-digital-garden-with-obsidian-and-gatsby-378e

# Creating a DIY Digital Garden with Obsidian and Gatsby
Are you intrigued by networked note-taking apps?

Do you want to build "blazing" fast sites on the JAMStack?

Have you heard about the [digital garden](https://www.technologyreview.com/2020/09/03/1007716/digital-gardens-let-you-cultivate-your-own-little-bit-of-the-internet/) craze sweeping the nation and want to make one of your own?

Maybe [Obsidian](https://obsidian.md) + [Gatsby](https://gatsbyjs.com) will be as good to you as they have been to me.

In addition to being a great note-taking tool, Obsidian functions as an excellent content manager. When combined with a git-based deployment solution like Netlify (and a few plugins), it compares favorably to other git-based CMS's such as Forestry and Netlify CMS, with the added benefit of backlinks, graph views, and a bunch of bells and whistles.

Open a new Obsidian vault in your `content` folder, `.gitignore` the config folder and its CSS, add frontmatter templates to your Obsidian settings, and *voila!* You've got a slick new CMS.

Add MDX to Gatsby and you can pass shortcodes through your Obsidian files too. This allows you to display interactive, custom React components in your notes. If this sounds fun to you, I've cataloged the steps I took to set it up below.

I have made the repo for this demo public. You can find it [here](https://github.com/bathrobe/gatsby-obsidian-cms-demo).

*Note: I am a beginner developer and this is a beginner-friendly tutorial. If y'all spot anything that could be improved upon, please let me know!*

We will start with the totally empty `gatsby-hello-world` starter to keep things simple.

Navigate to the folder where you plan to house your site and enter  

```
gatsby new obsidian-cms-demo https://github.com/gatsbyjs/gatsby-starter-hello-world.git`

```

Enter fullscreen modeExit fullscreen mode

Once the site is booted up let's install some dependencies. This set up will depend on `gatsby-source-filesystem` and `gatsby-plugin-mdx`.  
Navigate to your new project directory, then install them at the command line:  
`npm i gatsby-source-filesystem`  
`npm i gatsby-plugin-mdx`

Add both plugins to `gatsby-config.js`. Make sure the MDX plugin reads markdown files as .mdx as well, since .md files are what Obsidian creates. Tell `gatsby-source-filesystem` to read a folder `notes` that is inside a folder named `content`:  

```
//gatsby-config.js...{resolve:`gatsby-plugin-mdx`,options:{extensions:[`.mdx`,`.md`],},},{resolve:`gatsby-source-filesystem`,options:{name:`notes`,path:`${__dirname}/content/notes/`,},},
```

Enter fullscreen modeExit fullscreen mode

Make a folder in the root of your project named `content`.  
`mkdir ./content`

Then, after downloading and installing Obsidian, open that folder as a pre-existing vault.

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--cFdtFGmw--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://res.cloudinary.com/duyf6yqvr/image/upload/v1602775407/mshn15s3d5fbtcnfel7v.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--cFdtFGmw--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://res.cloudinary.com/duyf6yqvr/image/upload/v1602775407/mshn15s3d5fbtcnfel7v.png)

Navigate to your project folder and open `content`.  
You may wish to configure this differently, but I created a second folder within content called `notes`. This way, all content you want published to your website is automatically kept apart from the Obsidian config files.

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--FbeU5Gsp--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://res.cloudinary.com/duyf6yqvr/image/upload/v1602775407/fwi0p1b4kvyyrosuc8fw.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--FbeU5Gsp--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://res.cloudinary.com/duyf6yqvr/image/upload/v1602775407/fwi0p1b4kvyyrosuc8fw.png)

Create your first note! We will test out our page creation file with it soon.  
You'll notice a new folder, `.obsidian`, was added to the content folder. We can tell git to ignore it. We will also be adding a frontmatter template to Obsidian soon, so I've created a `_private` folder at `content/_private` to house it (as well as any drafts and journals you may want in the future). If you install any custom CSS to your vault, you can add those to the .gitignore too.   
In the `.gitignore` file:  

```
# Obsidian Files
/content/.obsidian
/content/_private
# Optional custom CSS
obsidian.css

```

Enter fullscreen modeExit fullscreen mode

Now, `gatsby-source-filesystem` will only read content in the `notes` folder, and will not push any other files to your repo. You can write and setup Obsidian in peace.

We now need a way to programmatically create pages from the files Obsidian creates.

There's a lot of ground to cover here and I may gloss over it, but I'm getting the code from the official docs at: [Creating Pages from Data Programmatically | Gatsby](https://www.gatsbyjs.com/docs/programmatically-create-pages-from-data/). It is a great walkthrough and there are plenty like it on the Gatsby docs.

First, in `gatsby-node.js`:  

```
exports.createPages=async({actions,graphql,reporter})=>{const{createPage}=actionsconstnotesTemplate=require.resolve(`./src/templates/noteTemplate.js`)constresult=awaitgraphql(`
    {
      allFile {
        edges {
          node {
            childMdx {
              slug
            }
          }
        }
      }
    }
  `)if(result.errors){reporter.panicOnBuild(`Error while running GraphQL query.`)return}result.data.allFile.edges.forEach(({node})=>{createPage({path:`notes/${node.childMdx.slug}`,component:notesTemplate,context:{// additional data can be passed via contextslug:node.childMdx.slug,},})})}
```

Enter fullscreen modeExit fullscreen mode

Note that the GraphQL query is set to query `allFiles` instead of `allMdx`. There may be a better solution than this, but I set it up in case I wanted to create pages via other sources in the future (GraphQL has a handy piece of data called `sourceInstanceName` that can help you sort different sources, available from `allFile`.)

We've also specified a noteTemplate file for all incoming notes, so let's make that now.

Create a new folder in `src` called `templates`, then add `noteTemplate.js` to the templates folder.

This is a very barebones template and you will probably want to add a layout component and styles to it as well. I've added a link to go Back Home for easier navigation.  

```
//in src/templates/noteTemplate.jsimportReactfrom"react"import{graphql,Link}from"gatsby"import{MDXRenderer}from"gatsby-plugin-mdx"exportdefaultfunctionnoteTemplate({data}){const{mdx}=datareturn(<article><MDXRenderer>{mdx.body}</MDXRenderer>
<Linkto="/">BackHome</Link>
</article>
)}exportconstquery=graphql`
  query($slug: String!) {
    mdx(slug: { eq: $slug }) {
      body
    }
  }
`
```

Enter fullscreen modeExit fullscreen mode

We import the `MDXRenderer` component to display the body of our note as an MDX file. In the GraphQL query, we're taking in the variable that we passed at the bottom of `gatsby-node.js` in the `context:` section.

We will probably want an easy way to grab a note's title and date of creation. Thankfully, this is simple and relatively frictionless using Obsidian's template plugin. In your vault, navigate to Settings/Plugin and turn on the Template plugin. Specify a `_templates` folder inside `_private`, then create a file called "Frontmatter" in it with the following:  

```
---
title: "{{title}}"
date: {{date}}T{{time}}
---

```

Enter fullscreen modeExit fullscreen mode

Obsidian will automatically fill in the title and date values every time you call the template. Hook the template up to a hotkey and it can be very fluid to create new notes with formatted frontmatter.

*Note: I struggled to find the best way to format the date. I found that creating it in the style above allows notes to be sorted by date, and formatting the date to be more readable (either via the template or GraphQL) gave me troubles when I tried to sort. So instead, I imported [Day.js](https://day.js.org/) in pages where the date was displayed and it worked without trouble.*

After inserting the template at the top of the page, our Hello, World note now looks like this:  

```
--------
title: Hello world
date: 2020-10-14T13:22
--------

This is the first note in my Gatsby digital garden.

```

Enter fullscreen modeExit fullscreen mode

Just to illustrate the idea, we'll make a list of all note pages on our home page.  
We can easily accomplish this with a GraphQL query for each note's title, date, and slug.

In `pages/index.js`:  

```
importReactfrom"react"import{Link,graphql}from"gatsby"constHome=({data:{allMdx:{edges},},})=>{constNotes=edges.map(edge=>(<article><Linkto={`/notes/${edge.node.slug}`}><h1>{edge.node.frontmatter.title}</h1>
</Link>
<p>{edge.node.frontmatter.date}</p>
</article>
))return<section>{Notes}</section>
}exportdefaultHomeexportconstpageQuery=graphql`
  query MyQuery {
    allMdx {
      edges {
        node {
          slug
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
`
```

Enter fullscreen modeExit fullscreen mode

To walk through what we've done here:

* We pass the edges of the query into our page's function, which allows us to retrieve the data in our markup
* We take the array of edges and use the `.map()` array method to create a new array of markup with link to each note page, displaying its title and (ugly-formatted) date (I recommend fixing this with [Day.js](https://day.js.org/))
* We pass this new array `Notes` to the JSX that's returned by the function
* We export the Home page function
* We export the GraphQL query that retrieves our data

Now fire up the dev server using `gatsby develop`, and you should see your first note displayed there!

[[https://dev.to/joeholmes/creating-a-diy-digital-garden-with-obsidian-and-gatsby-378e#wikilinks-and-gatsbyplugincatchlinks]] Wikilinks and Gatsby-plugin-catch-links
----------

Right now our site is pretty unimpressive and its functionality is more or less the same as any old markdown blog with posts written in the IDE. We will fix that!

Two fundamental features of networked note software are

* support for `[[wikilink]]` syntax
* support for linked references

and we have some simple plugins that can accomplish both of these things!

Thanks to the excellent work of developer Mathieu Dutour on his [gatsby-digital-garden](https://github.com/mathieudutour/gatsby-digital-garden), we can easily get both of these features running.

We will use two items in his `packages` directory: `gatsby-remark-double-brackets-link` and `gatsby-transformer-markdown-references`.

First, let's install them in our project:  

```
npm i gatsby-remark-double-brackets-link
npm i gatsby-transformer-markdown-references

```

Enter fullscreen modeExit fullscreen mode

We can now configure the plugins in our `gatsby-config.js`. First let's set up the double brackets link. It will be configured inside the MDX plugin:  

```
//in gatsby-config.jsplugins:[...{resolve:`gatsby-plugin-mdx`,options:{extensions:[`.mdx`,`.md`],gatsbyRemarkPlugins:[{resolve:"gatsby-remark-double-brackets-link",options:{titleToURLPath:`${__dirname}/resolve-url.js`,stripBrackets:true,},},]},},]
```

Enter fullscreen modeExit fullscreen mode

Both of these options are... optional. Because our note pages are created at index/notes/note-slug, we need a way to tell the autogenerated wikilinks to follow that same convention.

(I did this because I set up a blog in addition to a garden on my personal site, and I think it's good practice to separate the note files from any additional main-level pages as well.)

At the root of the project, create a file named `resolve-url.js`. The code here is quite simple:  

```
constslugify=require("slugify")module.exports=title=>`/notes/${slugify(title)}`
```

Enter fullscreen modeExit fullscreen mode

There you have it! Now any `[[double bracket link]]` in our MDX notes will automatically turn into a link to another note page.

If you care to try it out, create a new wikilink in your first note. Open the link in Obsidian by Ctrl + clicking it and add its frontmatter via the template.

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--Yjq0WGHm--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://res.cloudinary.com/duyf6yqvr/image/upload/v1602775407/mmkfyasnkr5vfunj1vdq.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--Yjq0WGHm--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://res.cloudinary.com/duyf6yqvr/image/upload/v1602775407/mmkfyasnkr5vfunj1vdq.png)  
[![](https://res.cloudinary.com/practicaldev/image/fetch/s--MOBvCQBn--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://res.cloudinary.com/duyf6yqvr/image/upload/v1602775407/gui6enmfehbottgjlumh.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--MOBvCQBn--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://res.cloudinary.com/duyf6yqvr/image/upload/v1602775407/gui6enmfehbottgjlumh.png)

Make sure your new note is inside the `notes` folder. You can configure where new files are stored in the Vault settings.

Boot up the dev server again and you should see the link in the Hello World note. Click it and you'll be routed to your new note.

You may notice something wrong, though-- the link takes a long time to load. Isn't lightning-fast linking one of the core features of Gatsby? Yes it is and there's a very easy plugin solution in `gatsby-plugin-catch-links`.

Install with `npm i gatsby-plugin-catch-links`, and throw it in your `gatsby-config.js` file:  

```
//gatsby-config.jsplugins:[...`gatsby-plugin-catch-links`,...
```

Enter fullscreen modeExit fullscreen mode

Now the next time you click the link it should be "blazing".

[[https://dev.to/joeholmes/creating-a-diy-digital-garden-with-obsidian-and-gatsby-378e#markdown-references]] Markdown References
----------

After installing `gatsby-transformer-markdown-references`, add it to the root level of your gatsby-config (ie, not inside of the gatsby-mdx plugin).  

```
//gatsby-config.jsplugins:[...{resolve:`gatsby-transformer-markdown-references`,options:{types:["Mdx"],// or ['RemarkMarkdown'] (or both)},},]
```

Enter fullscreen modeExit fullscreen mode

Now if you check out GraphiQL, the super-handy GraphQL tool at [http://localhost:8000/\_\_\_graphql](http://localhost:8000/___graphql), you should see nodes for inbound and outbound references in each of your mdx files!  
[![](https://res.cloudinary.com/practicaldev/image/fetch/s--wbj8z8wl--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://res.cloudinary.com/duyf6yqvr/image/upload/v1602775408/bu2dmacd0bxzgpmxbfjo.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--wbj8z8wl--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://res.cloudinary.com/duyf6yqvr/image/upload/v1602775408/bu2dmacd0bxzgpmxbfjo.png)

Turns into...

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--GZ9G7vJu--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://res.cloudinary.com/duyf6yqvr/image/upload/v1602775408/pqp6mn93ucy9rsieoqr4.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--GZ9G7vJu--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://res.cloudinary.com/duyf6yqvr/image/upload/v1602775408/pqp6mn93ucy9rsieoqr4.png)

Since the Hello, World note contained a link to "Second Note," Second Note is aware of it and lists it in the `inboundReferences` array. Pretty sweet!  
We can use this to list linked references to each note file we have, *a la* Roam Research, Obsidian, and all the other fancy note apps.

Let's set it up in our `noteTemplate.js` file.

First, let's add it to our GraphQL query:  

```
//noteTemplate.jsexportconstquery=graphql`
  query($slug: String!) {
    mdx(slug: { eq: $slug }) {
    body
    inboundReferences {
      ... on Mdx {
        frontmatter {
          title
        }
        slug
      }
    }
    }
  }
`
```

Enter fullscreen modeExit fullscreen mode

Then we can map a simple new array that lists the references in a `<ul>` tag. I added a ternary operator for the "Referenced in:" line, so it wouldn't display if there were no references.  

```
//inside noteTemplate.jsreturn(<article><MDXRenderer>{mdx.body}</MDXRenderer>
{mdx.inboundReferences.length>0?<p>Referencedin:</p> : ""}
<ul>{mdx.inboundReferences.map(ref=>(<li><Linkto={`/notes/${ref.slug}`}>{ref.frontmatter.title}</Link>
</li>
))}</ul>
<Linkto="/">BackHome</Link>
</article>
)
```

Enter fullscreen modeExit fullscreen mode

Not so hard, right? Our Second Note page should now look like this:  
[![](https://res.cloudinary.com/practicaldev/image/fetch/s--18wUoc6b--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://res.cloudinary.com/duyf6yqvr/image/upload/v1602775408/xa4g22ru2ushvpuyatwx.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--18wUoc6b--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://res.cloudinary.com/duyf6yqvr/image/upload/v1602775408/xa4g22ru2ushvpuyatwx.png)

None of the early MDX config would be worth it if we didn't try out some custom components. The [[https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/#shortcodes]] are pretty thorough, so I'll be brief. I'm using the lovely MDX Embed for Gatsby, a [freshly](https://www.gatsbyjs.com/blog/hacktoberfest-spotlight-mdx-embed/) updated plugin worked on by some [[https://github.com/PaulieScanlon/mdx-embed#-core-team]]. It requires no imports.

Simply:  

```
npm install mdx-embed gatsby-plugin-mdx-embed --save

```

Enter fullscreen modeExit fullscreen mode

then  

```
// gatsby-config.jsmodule.exports={...plugins:[...`gatsby-plugin-mdx-embed`]...}
```

Enter fullscreen modeExit fullscreen mode

It's a great plugin with lots of different embeddable content. Try it out!

Obsidian autosaves, so it'll crash the dev server if you type in it for too long. But just for fun:

[![](https://res.cloudinary.com/practicaldev/image/fetch/s--6K9JHAVx--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://res.cloudinary.com/duyf6yqvr/image/upload/v1602781288/yvakk4ummmlvmklckwkh.gif)](https://res.cloudinary.com/practicaldev/image/fetch/s--6K9JHAVx--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://res.cloudinary.com/duyf6yqvr/image/upload/v1602781288/yvakk4ummmlvmklckwkh.gif)

If you want to see what this system looks like with some styling (and a newly added Algolia search), I set it up on the [Notes](https://seph.news/notes) section of my personal website. Thanks for reading, and if you make something cool with this or want to chat, feel free to send me an [email](https://dev.tomailto:hello@joeholmesdev) or say hi on [Twitter](https://twitter.com/joeholmesdev).