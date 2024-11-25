/**
 * reveal.js table of contents plugin
 * 
 * A plugin which generates automatically a table of contents slide.
 * 
 * Demo https://naamor.github.io/reveal.js-tableofcontents/
 * 
 * MIT License
 * Copyright (c) 2018 Roman Stocker
 * Copyright (c) 2024 Luc Hermitte -- adapt to reveal 5x, and display in tables
 */
// Register plugin into gulpfile
// and then execute "npm run build"

const horizontalOffsetFromTOC = 1;

const Plugin = () => {
    let deck;

    // Options
    let options;
    let titleTag;
    let titleTagSelector;
    let title;
    let position;
    let fadeInElements;
    let numberOfColumns;
    let ignoreFirstSlide;
    let tocFormat; // "", or any template string with {title}, {pagenr} and {chapternr} in it

    function initialize() {
        if (typeof options.titleTagSelector === "string") {
            titleTagSelector = options.titleTagSelector.split(",").map(item => {
                return item.trim();
            });
        }

        generateTableOfContentsSlide();
    }

    function generateTableOfContentsSlide() {
        let slides = document.getElementsByClassName("slides")[0];

        let section = document.createElement("section");
        section.className = "toc";

        let heading = document.createElement(titleTag);
        heading.innerText = title;
        section.appendChild(heading);

        let list = generateList();
        section.appendChild(list);

        // Subtract by one because index starts with zero
        let slideAfter = slides.children[position - 1];

        // Check if there are enough slides for the configured table of contents slide position
        // or set the table of contents slide automatically after the last slide
        if (slideAfter !== undefined) {
            slides.insertBefore(section, slideAfter);
        } else {
            slides.appendChild(section);
        }
    }

    // Generate list with the title of each slide
    function generateList() {
        let table = document.createElement("table");
        table.className = "toc";
        let slides = deck.getSlides();
        if (slides === undefined) {
            console.log("undefined slides");
            return table;
        }

        let counter = 0;

        // Ignore first slide with counter 0
        if (ignoreFirstSlide) {
            counter++;
        }

        let titles = [];
        const numberOfSlides = deck.getTotalSlides();
        // console.log("numberOfSlides: "+ numberOfSlides);
        for (counter; counter < numberOfSlides; counter++) {
            const slide = slides[counter];
            const slide_title = getTitle(slide);
            const horizontalOffset = slide && slide.dataset.visibility === 'uncounted' ? 0 : 1;

            if (slide_title !== undefined) {
                // console.log("Title: " + slide_title);
                let title;
                switch (tocFormat) {
                    case "":
                        title = slide_title;
                        break;
                    default:
                        const slideNumber = deck.getIndices(slide).h + horizontalOffset + horizontalOffsetFromTOC;
                        const chapterNumber = titles.length + 1;
                        const tags = {
                            "title": slide_title,
                            "pagenr": slideNumber,
                            "chapternr": chapterNumber,
                        };
                        title = tocFormat;
                        for (const tag of Object.keys(tags)) {
                            // console.log("title: "+ title + " {"+tag+"} --> " + tags[tag]);
                            title = title.replaceAll(`{${tag}}`, tags[tag]);
                        }
                        break;
                }
                titles.push(title);
            }
        }

        const numberOfTitles = titles.length;
        const numberOfLines = ~~(numberOfTitles / numberOfColumns) + (numberOfTitles % numberOfColumns);
        // console.log("Titles: "+titles);
        // console.log("numberOfTitles: "+numberOfTitles);
        // console.log("numberOfLines: "+numberOfLines);
        // console.log("numberOfColumns: "+numberOfColumns);

        counter = 0;
        for (let line=0; line < numberOfLines; line++) {
            let tr = document.createElement("tr");
            for (let col = 0; col < numberOfColumns && counter < numberOfTitles; col++, counter++) {
                let td = document.createElement("td");

                // Add attributes for use reveal.js fragment functionality
                if (fadeInElements) {
                    td.className = "fragment";
                    td.setAttribute("data-fragment-index", counter);
                }

                const idx = line + col * numberOfLines;
                td.innerText = titles[idx];
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        return table;
    }

    // Select the text of the most important heading tag of every slide
    function getTitle(slide) {
        return (title = Array.from(slide.childNodes)
            .filter(node => filterSlideTagElements(node))
            .sort((a, b) => sortHeadingTagElements(a, b))
            .map(node => node.textContent)[0]);
    }

    // Filter tags based on options
    function filterSlideTagElements(element) {
        if (element.tagName === undefined) {
            return false;
        }

        return titleTagSelector.indexOf(element.tagName.toLowerCase()) >= 0 && element.textContent !== "";
    }

    // Sort heading tags based on importance
    function sortHeadingTagElements(valueA, valueB) {
        if (valueA.tagName < valueB.tagName) return -1;
        if (valueA.tagName > valueB.tagName) return 1;
        return 0;
    }

    return {
        id: 'toaster',
        init: function( reveal ) {
            deck = reveal;

            // Set all option defaults
            options = deck.getConfig().tableofcontents || {};
            titleTag = options.titleTag || "h1";
            titleTagSelector = ["h1", "h2", "h3", "h4", "h5", "h6"];
            title = options.title || "Table of Contents";
            position = options.position || 2;
            fadeInElements = options.fadeInElements || false;
            numberOfColumns = options.numberOfColumns || 2;
            ignoreFirstSlide = options.ignoreFirstSlide;
            if (typeof ignoreFirstSlide === "undefined") ignoreFirstSlide = true;
            tocFormat = options.tocFormat || "";

            initialize();
        }
    }
};

export default Plugin;
