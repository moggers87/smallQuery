function browserNormaliser(browser) {
    return browser.toLowerCase().split(/[ /-]/)[0];
}

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
        ],
        reporters: ['progress', 'coverage'],
        preprocessors: {"smallquery.js": ["coverage"]},
        coverageReporter: {
            reporters: [
                {
                    type: 'lcov',
                    dir: 'coverage/',
                    subdir: '.'
                },
                {type: "text-summary"},
                {
                    type: "html",
                    dir: "htmlcov",
                    subdir: browserNormaliser
                }
            ]
        }
    })
}
