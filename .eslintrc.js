/* eslint-disable indent */

module.exports = {
	"env": {
		"es2021": true,
		"node": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended"
	],
	"overrides": [
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"@typescript-eslint"
	],
	"rules": {
		"indent": [
			"error",
			4,
			{ "SwitchCase": 6 }
		],
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": [
			"error",
			{
				"vars": "all", "args": "after-used", "ignoreRestSiblings": false, "varsIgnorePattern": "^_",
				"argsIgnorePattern": "^_"
			}
		],
		// <3 i ended up ignoring this file
		// gtg for a bit <3
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		]
	}
};
