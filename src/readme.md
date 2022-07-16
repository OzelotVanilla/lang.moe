Welcome to the source folder
====

Quick Explain of how it works
----

1. Read file, match patterns

The `parser.MarkdownTokenizer` will first read file, divide it into tokens, and match patterns
registered to it.

Usage of folder
----

* `parser`: The app that read Markdown file,
  try to group them into tokens,
  then give out tokens for `summoner` to summon text.
* `pattern`: Patterns for parser to refer to. Parser will try to match text with given patterns.
* `summoner`: According to tokens, summon HTML tags.
* `token`: Tokens for `parser` and `summoner`.