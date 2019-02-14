module.exports = function(config) {
    var chromeOpts = {
        base: "Chrome"
    }

    if (process.env.TRAVIS) {
        chromeOpts = {
            base: "ChromeHeadless",
            flags: ["--no-sandbox"]
        };
    }

    config.set({
        logLevel: config.LOG_INFO,
        frameworks: ['jasmine'],
        customLaunchers: {
            ChromeMaybeHeadless: chromeOpts
        },
        files: [
            "smallquery.js",
            "spec/**/*spec.js"
        ]
    })
}
