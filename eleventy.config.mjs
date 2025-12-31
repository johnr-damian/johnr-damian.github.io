import { DateTime } from "luxon";

export const config = {
    dir: {
        input: "source",
        output: "artifacts",
        includes: "templates",
        data: "data"
    }
}

export default function (eleventyConfig) {
    //Filter: date format
    eleventyConfig.addFilter("blogdate", (dateString) => {
        let date = new Date(dateString);
        return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat("yyyy-MM-dd");
    });

    // Collection: blogposts
    eleventyConfig.addCollection("blogposts", function (collectionApi) {
        let directory = `${config.dir.input}/posts/*/**`;
        return collectionApi.getFilteredByGlob(directory).sort((a, b) => b.date - a.date);
    });

    // Favicon: copy to the root
    eleventyConfig.addPassthroughCopy({ "source/images/favicon.ico": "favicon.ico" });
};