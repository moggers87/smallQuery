function browserNormaliser(browser) {
    return browser.toLowerCase().split(/[ /-]/)[0];
}

module.exports = function(config) {
    var chromeOpts = {
        base: "Chrome"
    }

    if (process.env.CI) {
        chromeOpts = {
            base: "ChromeHeadless",
            flags: ["--no-sandbox"]
        };
    }

    var preprocessors = {};
    var reporters = ['progress', 'kjhtml'];
    if (!process.env.SKIP_COVERAGE) {
        preprocessors["src/*.js"] = ["coverage"];
        reporters.push("coverage");
    }

    config.set({
        logLevel: config.LOG_INFO,
        frameworks: ['jasmine'],
        customLaunchers: {
            ChromeMaybeHeadless: chromeOpts
        },
        files: [
            {pattern: "spec/**/*spec.js", type: "module"},
            {pattern: "src/*.js", type: "module"}
        ],
        reporters: reporters,
        preprocessors: preprocessors,
        client: {
            clearContext: false,
            jasmine: {
                failSpecWithNoExpectations: true
            }
        },
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
        },
        jasmineHtmlReporter: {
            suppressAll: true,
            suppressFailed: true
        }
    })
}
