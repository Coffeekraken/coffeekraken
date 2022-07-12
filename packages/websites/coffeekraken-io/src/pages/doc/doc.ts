export default {
  slugs: ["/doc/*", "/package/:organisation/:package/doc/*"],
  params: {
    path: "*",
  },
  views: [
    {
      data: "docmapDocumentation",
      path: "pages.markdown.markdown",
    },
  ],
};
