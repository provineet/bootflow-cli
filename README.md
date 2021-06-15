![WordPress Scaffolding Theme Generator](https://raw.githubusercontent.com/provineet/bootflow-cli/master/bootflow-cli.png)

# BOOTFLOW-CLI : A WordPress Developer Toolkit

A WordPress developer toolkit that kickstarts your next WordPress theme development project with modern tools and workflows.

<table width="100%">
    <tbody>
    <tr>
        <td style="margin: 0; padding: 0;">
            A FOSS (Free &amp; Open Source Software) project. Developed &amp; Maintained by <a href="https://github.com/provineet">@provineet</a>.
        </td>
        <td align="center">
            <strong>Vineet Verma</strong>
        </td>
    </tr>
</tbody></table>

![Version: v1.1.0](https://img.shields.io/github/package-json/v/provineet/bootplate?style=flat-square)
![GitHub branch checks state](https://img.shields.io/github/checks-status/provineet/bootplate/main?style=flat-square)
![Maintainer](https://img.shields.io/badge/maintainer-%40provineet-blue?style=flat-square)
<br>

## 🚀 How it works?

Bootflow-cli scaffolds a starter WordPress theme inside your wp-content/themes folder using the values supplied through a CLI interface. The starter theme supports Gulp, SASS, Babel, Webpack, AutoPrefixer, BrowserSync (Reloads your browser while development), assets minification and image optimizations.

You can just start using modern development tools and plugins in your WordPress theme Development Stack with almost no-configuration involved.

## ⚡️ Quick Installation

Go your terminal and cd to your local wp-content directory, where you want to start developing the theme and run the below given npx command:

`npx bootflow-cli`

You will be asked a few questions to generate your theme files, answer them correctly and a fresh copy of your development scaffolding theme will be generated inside your themes folder.

<br>

![Bootflow-cli installation](https://raw.githubusercontent.com/provineet/bootflow-cli/master/bootflow-cli-install.gif)

## The Generated WordPress Theme

Generated Developer WordPress theme supports:

-   Bootstrap 5.x, FontAwesome 5.x
-   SASS Compilation
-   CSS AutoPrefixer
-   JS Babel Transpilation (ES6 Presets)
-   Webpack 5 Script Bundling
-   Assets Minification (CSS, JS, Images)
-   Image Optimizer (JPEG, GIF, PNG and SVGs)
-   CSS Sprite Images
-   BrowserSync for a no-lag browser reload on file changes
-   Gulp Workflow

### Generated Theme's Folder Structure

```bash
.
└── themes
    └── bootflow
        ├── assets                (hold the compiled CSS,JS,Images)
        │   ├── css
        │   ├── images
        │   ├── js
        │   └── webfonts
        ├── assets_src            ( Static Assets Source Files )
        │   ├── images
        │   ├── js                ( Webpack or Babel JS )
        │   ├── scss              ( All Your SCSS Files )
        │   ├── sprite_images     ( Your Sprite Icons/Images )
        │   └── webfonts
        ├── babel.config.json
        ├── footer.php
        ├── functions.php
        ├── gulpfile.js           ( Gulp Config and tasks folder )
        ├── header.php
        ├── inc
        │   ├── classes
        │   │   ├── autoload.php           ( PHP Classes autoloader )
        │   │   ├── template-functions.php
        │   │   ├── theme-hooks.php        ( All your theme hooks )
        │   │   └── theme-setup.php
        │   ├── helper-functions.php
        │   └── loader.php                 ( Loads Classes and helpders )
        ├── index.php
        ├── package.json
        ├── screenshot.png
        └── style.css
```

### 📖 Generated Theme Documentation : <a href="https://github.com/provineet/bootflow/">Bootflow Github Repo.</a>
