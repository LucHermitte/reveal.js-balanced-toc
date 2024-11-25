# reveal.js-balanced-toc

A table of contents plugin for [Reveal.js](https://github.com/hakimel/reveal.js) to generate automatically a table of contents slide. [Check out the live demo](https://naamor.github.io/reveal.js-tableofcontents/).

This plugin is a fork of [revealjs-tableofcontents](https://github.com/naamor/reveal.js-tableofcontents) that:

- has been ported to Reveal 5.x
- diplays TOC entries into a multi-columns array

## Installation

### npm

Download and install the package in your project:

```npm install --save reveal.js-balanced-toc```

Add the plugin to the dependencies in your presentation:

```html
<script src="node_modules/reveal.js-balanced-toc/balanced-toc.js"></script>
<script>
Reveal.initialize({
    // ...

    plugins: [
        ...
        RevealBalancedTableOfContents,
    ]
});
</script>
```

### Manual

Copy this repository into the plugins folder of your reveal.js presentation, i.e. `plugins/balanced-toc`.

Add the plugin to the dependencies in your presentation:

```html
<script src="plugin/balanced-toc/balanced-toc.js"></script>
<script>
Reveal.initialize({
    // ...

    plugins: [
        ...
        RevealBalancedTableOfContents,
    ]
});
</script>
```

## Configuration

You can configure the table of contents for your presentation by providing a ```tableofcontents``` option in the reveal.js initialization options. Note that all configuration values are optional and will default to the values specified below.

```javascript
Reveal.initialize({
    // ...

    tableofcontents: {
        // Specifies the slide title of the table of contents slide
        title: "Table of Contents",

        // Specifies the position of the table of contents slide in the presentation
        position: 2,

        // Specifies html tag in which the table of contents title stands
        titleTag: "h1",

        // Specifies which slide tag elements will be used
        // for generating the table of contents.
        titleTagSelector: "h1, h2, h3, h4, h5, h6",

        // Specifies if the first slide, mostly the title slide of the presentation, should be ignored.
        ignoreFirstSlide: false,

        // Specifies if every single element of the table of contents
        // will be stepped through before moving on to the next slide.
        fadeInElements: false,

        // Specifies in how many columns the TOC will be distributed into
        numberOfColumns: 2,

        // Specifies the format of the generated TOC entry:
        // - "" => Just inserts the section name -- default value
        // - or any template string that contains "{title}", "{pagenr}", and/or "{chapternr}"
        //   e.g.: "{chapternr} | {title}",
        //   it could be any valid HTML code.
        tocFormat: "",
    },
});
```

## License

[MIT licensed](https://en.wikipedia.org/wiki/MIT_License)

Copyright (C) 2018 Roman Stocker  
Copyright (C) 2024 Luc Hermitte
