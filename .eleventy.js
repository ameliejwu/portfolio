module.exports = function(eleventyConfig) {
  // Copy static assets to maintain your existing structure
  eleventyConfig.addPassthroughCopy("src/static");
  
  // Set input/output directories
  return {
    dir: {
      input: "src",
      output: "docs",        // Keep GitHub Pages compatibility
      includes: "_includes",
      data: "_data"
    },
    // Use Nunjucks for templating
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"]
  };
};