module.exports = {
  presets: ["@vue/app"],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "~node_modules/element-theme-nio/lib"
      }
    ]
  ]
};
