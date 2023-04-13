[![Build status](https://github.com/moggers87/exhibition/actions/workflows/tests.yml/badge.svg)](https://github.com/moggers87/exhibition/actions/workflows/tests.yml)
[![Codecov](https://img.shields.io/codecov/c/github/moggers87/smallQuery.svg)](https://codecov.io/gh/moggers87/smallQuery)

## smallQuery

A jQuery clone, except there's a bunch of stuff we don't implement. Also, where
possible we don't reinvent the wheel and just use what the browser provides.

### Where?

- Download: <https://www.npmjs.com/package/smallquery>
- Source: <https://github.com/moggers87/smallQuery>

### Why though?

I needed a project that would help me learn JS beyond the basics I needed for work. Reimplementing jQuery works well because:

- I use jQuery quite a lot so I'm familiar with its API, just not it internals.
- There are a lot of things jQuery does that I'm not interested in, so that
  gives me the opportunity to make something smaller and possibly faster. That
  should keep me interested in the project long enough for me to learn something
  useful from the project.
- I can mimic jQuery's plugin architecture, allowing me to implement features piecemeal.

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
- Cloning!

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
- AJAX. The Fetch API in your browser is far nicer.

### License?

See LICENSE
