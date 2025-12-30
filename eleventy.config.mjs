export const config = {
    dir: {
        input: "source",
        output: "artifacts",
        includes: "templates",
        data: "data"
    }
}

export default function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy({ "source/images/favicon.ico": "favicon.ico" });
};