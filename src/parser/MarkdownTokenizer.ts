import { readFileSync } from "../util/FuncLib";

interface MarkdownTokenizerConfig
{
    file_path?: string;
    original_text?: string;
}

interface Token
{
    type: TokenType,
    indent: number,
    inside: Token[],
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

    private buffer_of_parsed: Token[];

    /**
     * If the line only has these character's repeating, its type will become `LineType.notation`.
     */
    private line_notation_repeatings = ['-', '='];

    /**
    * If the line only contains one of them, its type will become `LineType.notation`.
    */
    private line_notation_fixed_len = ["$$", "```"];

    private text_special_startings = ['*', '#', '>', '-', '+'];


    constructor(config: MarkdownTokenizerConfig)
    {
        if (config.file_path ?? false) { this.file_path = config.file_path; }
        else if (config.original_text ?? false) { this.parse(config.original_text); }
    }

    public result(): string
    {
        console.log("Showing parsed result.");
        return readFileSync(this.file_path);
    }

    private parse(text: string)
    {
        // The parser will read file line by line.
        // First, split the origin str by "\n". Multiple "\n" will have a empty string.
        let lines: string[] = text.split(/\n/);    // Example: "test\n\nstr" will be ["test", "", "str"].
        let line_index: number = 0;
        let previous_line_type: LineType = null;
        let current_line_type: LineType = null;

        for (let line of lines)
        {
            current_line_type = this.decideLineType(line);

            // Search for inline tokens.
            if (current_line_type == LineType.text)
            {

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
            || (line_text.split("").every(c => c == line_text[0]) // If only repeat one char
                && this.line_notation_repeatings.includes(line_text[0]))
        ) { return LineType.notation; }

        // If not other types of line.
        return LineType.text;
    }
}