export default {
    reg: /<!-- og:(.*) -->/g,
    async transform(data, target) {
        return;
        // const og = await __scrapeUrl(data[1]);
        // return og ?? {};
    },
};
