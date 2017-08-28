# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added

### Changed
- Compatible with Pageflow 12
- Reformatted this file to conform to [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)

### Fixed

### Removed

## [1.2.1] - 2017-08-12
### Fixed
- changed key in English translations file to `en`.

## [1.2.0] - 2017-07-28
### Added
- Facebook single post support. Uses the Facebook JS SDK. Spy on all the things!
  facebook, single post: https://www.facebook.com/20531316728/posts/10154009990506729/
  Will add Facebook Video in a future release.

## [1.1.1] - 2017-07-25
### Fixed
- make the URL test more strict. Otherwise non-embeddable links were found.

## [1.1.0] - 2017-07-16
### Added
- Spotify support. Uses Oembed like the makers intended, damnit!
spotify, single track: https://open.spotify.com/track/298gs9ATwr2rD9tGYJKlQR
spotify, artist: https://open.spotify.com/artist/0IIPgITtEO4JJfipw57KGv

### Fixed
- NodeList to Array now considers empty Nodelist. Also, speed.

## [1.0.1] - 2017-07-17
### Fixed
- tweet ID is now correctly parsed from the link.

## [1.0.0] - 2017-07-16
### Added
- Twitter support. Doesn't actually use oEmbed, because the Twitter SDK handles everything for us. Oh well.
  twitter, single tweet: https://twitter.com/scrollytelling/status/885128273239396352
