import { readFileSync } from "../util/FuncLib";

enum SpecialStartings
{
    "*", "#", ">", "-"
}

interface MarkdownTokenizerConfig
{
    file_path?: string;
    original_text?: string;
}

/**
 * 
 */
export class MarkdownTokenizer
{
    readonly file_path?: string;

    private buffer_of_parsed;

    private previous_line_type;

    private current_line_type;

    constructor(config: MarkdownTokenizerConfig)
    {
        if (config.file_path ?? false) { this.file_path = config.file_path; }
        else if (config.original_text ?? false) { this.parse(config.original_text); }
    }

    private parse(text: string)
    {

    }

    public result(): string
    {
        console.log("Showing parsed result.");
        return readFileSync(this.file_path);
    }
}