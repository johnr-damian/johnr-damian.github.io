export const config = {
    dir: {
        input: "source",
        output: "artifacts",
        includes: "templates",
        data: "data"
    }
}

export default function (eleventyConfig) {
    // Collection: blogposts
    eleventyConfig.addCollection("blogposts", function (collectionApi) {
        let directory = `${config.dir.input}/posts/*/**`;
        return collectionApi.getFilteredByGlob(directory).sort((a, b) => b.date - a.date);
    });

    // Copy favicon to the output root so /favicon.ico resolves, in addition to images folder.
    eleventyConfig.addPassthroughCopy({ "source/images/favicon.ico": "favicon.ico" });
};