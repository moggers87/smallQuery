[![Build status](https://github.com/moggers87/exhibition/actions/workflows/tests.yml/badge.svg)](https://github.com/moggers87/exhibition/actions/workflows/tests.yml)
[![Codecov](https://img.shields.io/codecov/c/github/moggers87/smallQuery.svg)](https://codecov.io/gh/moggers87/smallQuery)

## smallQuery

A jQuery clone, except there's a bunch of stuff we don't implement. Also, where
possible we don't reinvent the wheel for a 1% performance boost.

### Where?

- Download: <https://www.npmjs.com/package/smallquery>
- Source: <https://github.com/moggers87/smallQuery>

### Why though?

This started as a learning project but has become semi-serious. For example,
there are optimisations that are only optimal for older browsers and jQuery
doesn't use the browser's query selector. There are good reasons for jQuery to
do these things, but they don't apply anywhere I'd want to use jQuery.

### What's been implemented?

So far:

- Selecting and create HTML elements
- Basic tree traversal via `find`, `children`, `siblings`, `parent` and
  `parents`
- Basic tree manipulation via `append`, `prepend`, `before`, `after`, `wrap`,
  `wrapInner`, and `wrapAll`
- The Data API
- The CSS API
- Event handling

### What will be implemented?

Other than what's already listed in the [issue
tracker](https://github.com/moggers87/smallQuery/issues), I'm fairly open to
suggestions. I would like to keep this library reasonably close to jQuery in
terms of API, so keep that in mind before opening an issue.

Some things I won't consider:

- Utility functions that aren't used by smallQuery itself, e.g. implementing `jQuery.grep()`
- Deprecated APIs, e.g. `.andSelf()`
- Custom selectors
- Effects and animation (do it in CSS or don't do it at all)
- Per event type functions, e.g. `.click()`
- Support for Browsers that are no longer receiving updates, e.g. Internet Explorer 8

### License?

See LICENSE
