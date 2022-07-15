export default {
  slugs: ["/styleguide/*", "/package/:organisation/:package/styleguide/*"],
  params: {
    path: "*",
  },
  views: [
    {
      data: "docmapStyleguide",
      path: "pages.styleguide.styleguide",
    },
  ],
};
