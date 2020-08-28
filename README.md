```
  ____ _   _  ___  ____  ____
 / _  | | | |/___)/ _  )/ ___)
( ( | | |_| |___ ( (/ /| |
 \_|| |\____(___/ \____)_|
(_____|
```

![Coverage lines](./badges/badge-lines.svg)
![Coverage functions](./badges/badge-functions.svg)
![Coverage branches](./badges/badge-branches.svg)
![Coverage statements](./badges/badge-statements.svg)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# What is this?

Do you manage multiple git users on a single machine? Do you often switch between work and personal git accounts and configure different repositories to use differnet accounts? `guser` is an interactive tool inspired by [WindomZ's `gituser.js`](https://github.com/WindomZ/gituser.js) that helps make git user-switching a tiny bit easier by remembering user/email combinations you've used in the past.

If you want the [unix philosophy](https://en.wikipedia.org/wiki/Unix_philosophy#:~:text=The%20Unix%20philosophy%20is%20documented,%2C%20as%20yet%20unknown%2C%20program.) version of this tool, go with `gituser.js`, but if you like interactive input, choose `guser`. While this tool "does one thing and one thing well", it is not readily scriptable.

# Installation

```
npm i -g guser
```

Configuration is saved in a dotfile in your home directory (`~/.guser`).

# Usage

You'll of course need a working version of `git` in your path.

To start:

```
guser
```

The chosen user/email config is set in the current working directory, so you'll need to be inside a repo in order to configure it to use one of your stored configs.
