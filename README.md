[![Build Status](https://travis-ci.org/moggers87/smallQuery.svg?branch=master)](https://travis-ci.org/moggers87/smallQuery)

## smallQuery

A jQuery clone, except there's a bunch of stuff we don't implement. Also, where
possible we don't reinvent the wheel for a 1% performance boost.

### Where?

- Download: <https://www.npmjs.com/package/smallquery>
- Source: <https://github.com/moggers87/smallQuery>

### Why though?

This is a bit of a story and starts off with CSS.

In late 2018 I became aware of TurretCSS and started using it in a project. As
compared to my usual go-to CSS framework, I found that I could make the
resulting CSS file a lot smaller as I could remove more components (utility
classes are split up so I could import only the ones I actually needed) and
Turret does not support as many browsers - it can in fact be configured for
different browsers at build time. All in all, this leads to a ~50% reduction in
the minified CSS file. That's quite significant when most of a page down is CSS
and JS assets.

jQuery is much the same: there's a lot of support built in for older browsers
and there's a lot of stuff I don't use. So I'd like to create my own
jQuery-esque module and see if I can make something smaller.

#### Yeah, but why though?

Front-end tooling is something I want to be more familiar with, so this seemed
a like a good project to do that with. I've been able to write JS for a while
now, but as soon as I had issues with things like Karma configs or Grunt I was
lost.

### What's been implemented?

So far:

- Selecting and create HTML elements
- Basic tree traversal via `find`, `children`, `siblings`, `parent` and `parents`
- The Data API

### What will be implemented?

Other than what's already listed in the [issue
tracker](https://github.com/moggers87/smallQuery/issues), I'm fairly open to
suggestions. I would like to keep this library reasonably close to jQuery in
terms of API, so keep that in mind before opening an issue.

Some things I won't consider:

- Utility functions that aren't used by smallQuery itself, e.g. `jQuery.grep()`
- Deprecated APIs, e.g. `.andSelf()`
- Custom selectors
- Effects and animation (do it in CSS or don't do it at all)
- Per event type functions, e.g. `.click()`

### License?

See LICENSE
