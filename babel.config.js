module.exports = {
  "presets": [
    "@vue/app"
  ],
  "plugins": [
    [
      "import",
      {
        "libraryName": "vant",
        "libraryDirectory": "es",
        "style": true
      },
      "vant"
    ],
    [
      "transform-imports",
      {
        "quasar": {
          "transform": "quasar/dist/babel-transforms/imports.js",
          "preventFullImport": true
        }
      }
    ]
  ]
}