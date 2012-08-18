var formatting = {}

formatting.general = {
	normal: '0',
	bold: '1',
	italic: '3',
	underline: '4',
	reverse: '7'
}

formatting.fg = {
	black: '30',
	darkgray: '1;30',
	red: '31',
	lightred: '1;31',
	green: '32',
	lightgreen: '1;32',
	brown: '33',
	yellow: '1;33',
	blue: '34',
	lightblue: '1;34',
	purple: '35',
	lightpurple: '1;35',
	cyan: '36',
	lightcyan: '1;36',
	lightgray: '37',
	white: '1;37',

	none: ''
}

formatting.bg = {
	darkgray: '40',
	red: '41',
	green: '42',
	yellow: '43',
	lightblue: '44',
	purple: '45',
	lightcyan: '46',
	lightgray: '47'
}

module.exports = formatting
