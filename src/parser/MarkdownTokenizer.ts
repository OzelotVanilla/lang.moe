import { readFileSync } from "../util/FuncLib";

interface MarkdownTokenizerConfig
{
    file_path?: string;
    original_text?: string;
}

interface Token
{
    type: TokenType,
    indent?: number,
    inside?: Token[],
    original_text?: string
}

enum TokenType
{
    /**
     * 
     */
    plaintext,
    /**
     * 
     */
    line_special_starting,
    /** 
     * 
     */
    HTML_tags,
    /**
     * Like "[src]" or "(./path/file.jpg)"
     */
    paired_in_line,
    /**
     * Like "$$" or "```"
     */
    paired_mul_line_fmt_notation,
}

enum LineType
{
    /**
     * A line with text or inline-formatted
     */
    text,
    /**
     * Like "====" to show the previous line will be a title, "$$" to show mul-lines formula
     */
    notation,
    /**
     * Effectively empty lines. Contains only space, tab, or nothing.
     */
    blank
}

/**
 * 
 */
export class MarkdownTokenizer
{
    readonly file_path?: string;

    /**
     * Patterns registered
     */
    private pattern;

    private buffer_of_parsed: Token[];

    /**
     * If the line only has these character's repeating, its type will become `LineType.notation`.
     */
    private line_notation_repeatings = ['-', '=', '*'];

    /**
    * If the line only contains one of them, its type will become `LineType.notation`.
    */
    private line_notation_fixed_len = ["$$", "```"];

    /**
     * If one line start with it, it should be tokenized as special formatted line.
     */
    private text_special_startings = ['*', '#', '>', '-', '+'];


    constructor(config: MarkdownTokenizerConfig)
    {
        if (config.file_path ?? false) { this.file_path = config.file_path; }
        else if (config.original_text ?? false) { this.parse(config.original_text); }
    }

    /**
     * Add trigger characters, let parser convert it into token.
     */
    public addTriggerCharacters()
    { }

    public result(): string
    {
        console.log("Showing parsed result.");
        return readFileSync(this.file_path);
    }

    private parse(text: string)
    {
        // First, group target into paragraph
        // Example: "test\nparagraph\n\none str" will be ["test paragraph", "one str"].
        let paragraphs: string[] = text.split(/\n{2,}/).map(element => element.replaceAll(/\n/g, " "));

        // Split text using detecting trigger character (like "**")
        let line_index: number = 0;
        let previous_line_type: LineType = null;
        let current_line_type: LineType = null;

        for (const line of paragraphs)
        {
            // If text line, search for inline tokens.
            if ((current_line_type = this.decideLineType(line)) == LineType.text)
            {
                // TODO
                let tokenized_line = this.groupTextAndTokenize(line);
            }
        }
    }

    private decideLineType(line_text: string): LineType
    {
        // If the line_text is actually with characters that are thought to be empty.
        if (line_text.trim().length == 0) { return LineType.blank; }

        // Check if has fixed-length character, or filled with repeatings.
        // Trim end to avoid parse error.
        line_text = line_text.trimEnd();
        if (
            this.line_notation_fixed_len.includes(line_text)
            || (line_text.split("").every(c => c == line_text[0])    // If only repeat one char
                && this.line_notation_repeatings.includes(line_text[0])
                && line_text.length >= 3)    // ... and more than 3 times
        ) { return LineType.notation; }

        // If not other types of line.
        return LineType.text;
    }

    /**
     * This will grouped the text according to whether they were surrounded by paired characters.
     * If cannot 
     * 
     * Examples:
     * 
     * `"I (me) my"` -> ["I", "(me)", "my"]
     * 
     * "Some [[prototype]] here" -> ["Some", ["[", "[prototype]", "]"], "here"]
     * 
     * "Missing `(` another?" -> ["Missing", "`(`"]
     * 
     * @param text The text to be grouped
     */
    private groupTextAndTokenize(text: string): Token[]
    {
        const paired_start = ["$", "`", "==", "**", "*", "(", "[", "{", "<"];
        const paired_end = ["$", "`", "==", "**", "*", ")", "]", "}", ">",];
        let characters = text.split(/(\(|\)|\[|\]|\{|\}|\<|\>|\`|\$|==|\*\*|\*)/);
        let buffer: string[] = [];
        let result: string[] = [];

        // Add characters to a buffer, if found one
        let waiting_pair_end: boolean = false;
        for (const c of characters)
        {
            if (c.length == 0) { continue; }
            if (paired_start.includes(c)) { waiting_pair_end = true; }
            if (waiting_pair_end && paired_end.includes(c)) { }

            // TODO
        }

        return [];
    }
}