`parser` folder
====

Methodology
----

Unlike common markdown, this program will consider all char after `\` as an escape char.

### Preparing

The `tokenizer` will first open the markdown file by given path
(called by `src.ContentProvider::provide`,
with the `ContentProvider.provide_type == ProvideType.markdown`)
The file should better be <u>well-formatted</u>:

* Add blank line if format change from one to another
  (eg. from *paragraph* to *bullet list*).

Then, the `tokenizer` will read the file **line by line**.



### Parsing

The `parser` will read file started with no *previous line type*.
When it found a <u>non-empty</u> line, it will try to analyze the
*characteristic* of that line, saving that as *current line type*.
If next line has same *line type*, they will be grouped together.

* split text into paragraphs

For each line, as the grammar of Markdown, text like this will be considered as **one paragraph**:

```markdown
This is a whole
paragraph.
```

At that time, the `return` at the end will be considered as `space`. Only the text with more than 2 `return` between will be considered separated paragraph.

First, the parser will separate all text into different paragraph (`split(/\n{2,}/)`), and convert each `return` at end of line to `space`.

* convert chars into token

There are some chars that have special meaning in markdown, such as `*` sign. These symbol can be seen as *trigger char*, because parser will push them into stack, try to convert it into special token, but not leave it as plaintext.

For each trigger char, there are current (one or more) *token pattern* corresponding. When reading the text behind, each av



#### How to decide the characteristic?

Key: to test each line fulfill some **pattern** that already defined.



### Packing

Each time the `parser` finish parsing one line, the previously parsed content
will be stored in a **buffer**, called `buffer_of_parsed`.

When the `parser` found that the *line type* **for line which is parsing now**
is different from the **previous line**
(that is `previous_line_type != current_line_type` for `MarkdownTokenizer`),
it will **pack** the content in the `buffer_of_parsed`.

Design of Module
----

### `src.parser.MarkdownTokenizer`

Members:

* `previous_line_type`
* `current_line_type`
* `buffer_of_parsed`