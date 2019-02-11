module.exports = function(config) {
    config.set({
        logLevel: config.LOG_INFO,
        frameworks: ['jasmine'],
        files: [
            "smallquery.js",
            "spec/**/*spec.js"
        ]
    })
}
