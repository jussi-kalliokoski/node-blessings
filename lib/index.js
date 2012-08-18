function wrapperToString () {
	return this.begin
}
function commandToString () {
	return this.symbol
}
function movementToString () {
	return this(1)
}

function createWrapper (begin, end) {
	var wrapper = function () {
		var str = [].join.call(arguments, ' ')

		return wrapper.begin + str + wrapper.end
	}

	wrapper.toString = wrapperToString
	wrapper.begin = "\033[" + begin + 'm'
	wrapper.end = "\033[" + end + 'm'

	return wrapper
}

function createCommand (symbol) {
	var command = function () {
		this.write(command.symbol)
	}

	command.toString = commandToString
	command.symbol = symbol

	return command
}

function createCursorMovement (direction) {
	var command = function (count) {
		return '\033[' + ~~count + command.direction
	}

	command.toString = movementToString
	command.direction = direction

	return command
}

var formatting = require('./formatting')

function Terminal (options) {
	var k

	if (options) {
		for (k in options) {
			if (!options.hasOwnProperty(k)) continue

			this[k] = options[k]
		}
	}

	if (!this.stream) this.stream = process.stdout

	this.isTTY = !!this.stream.isTTY
	this.stack = []
}

Terminal.prototype = {
	stream: null,
	stack: [],

	get width () {
		return this.stream.columns
	},

	get height () {
		return this.stream.rows
	},

	write: function () {
		return this.stream.write([].join.call(arguments, ' '))
	},

	writeln: function () {
		return this.stream.write([].join.call(arguments, ' ') + '\n')
	},

	reset: createCommand('\033c'),

	clear: createCommand('\033[2J'),
	clearScreen: createCommand('\033[2J'),
	clearToEOS: createCommand('\033[1J'),
	clearToBOS: createCommand('\033[J'),

	clearLine: createCommand('\033[2K'),
	clearToBOL: createCommand('\033[1K'),
	clearToEOL: createCommand('\033[K'),

	visualBell: createCommand('\033g'),
	audibleBell: createCommand('\a'),

	showCursor: createCommand('\033\067p'),
	hideCursor: createCommand('\033\066p'),

	move: function (x, y) {
		return '\033[' + ~~y + ';' + ~~x + 'H'
	},

	moveUp: createCursorMovement('A'),
	moveDown: createCursorMovement('B'),
	moveRight: createCursorMovement('C'),
	moveLeft: createCursorMovement('D')
}

void function () {
	var k, obj

	obj = Terminal.prototype.fg = {}

	for (k in formatting.fg) {
		if (!formatting.fg.hasOwnProperty(k)) continue

		Terminal.prototype[k] = obj[k] = createWrapper(
			formatting.fg[k],
			formatting.fg.none
		)
	}

	obj = Terminal.prototype.bg = {}

	for (k in formatting.bg) {
		if (!formatting.bg.hasOwnProperty(k)) continue

		obj[k] = createWrapper(
			formatting.bg[k],
			formatting.fg.none
		)
	}

	for (k in formatting.general) {
		if (!formatting.general.hasOwnProperty(k)) continue

		Terminal.prototype[k] = createWrapper(
			formatting.general[k],
			formatting.general.normal
		)
	}
}()

module.exports = Terminal
