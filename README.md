# Blessings

This is a node.js port of [blessings](http://pypi.python.org/pypi/blessings/), an easy to use library for manipulating ANSITERM terminals.

## Installation

```
$ npm install blessings
```

## Usage

The module exports a class called Terminal, which gives you a few handy methods for manipulating the terminal. For example:

```javascript

var Terminal = require('blessings')

with (new Terminal()) {
	writeln(red('red'), green('green'), 'and', blue('blue'))
	writeln(bold('bold'), 'and', normal('normal'))
	writeln(bg.darkgray('dark backgrounds'))
}

```

## License

MIT License
