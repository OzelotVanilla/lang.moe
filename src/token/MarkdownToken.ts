export class MarkdownToken
{
    public type: TokenType;
    public text: string;
}

export enum TokenType
{
    /**
     * Only text
     */
    plaintext,

    /**
     * Self-closing HTML tag.
     * Accept both form, like "<br>" and "<br />"
     */
    single_HTML_tag,

    // Grouped text does not force no-space-around the symbol.
    // For example:
    // "(a)", "( a )", or "(a )"

    // Notice that all grouped symbol MUST be paired.
    // If not paired, it is not ensured that the result will be correct.

    /**
     * Text grouped by parenthesis
     */
    parenthesis_grouped,

    /**
     * Text grouped by bracket
     */
    bracket_grouped,

    /**
     * Text grouped bt brace
     */
    brace_grouped,

    /**
     * Text grouped by user-defined symbol
     */
    custom_symbol_grouped,

    /**
     * Text grouped by 
     */
    HTML_tag_grouped,

    // Surrounded text force no-space-around the symbol
    // For example:
    // ":a:"  ---- colon_surround
    // ": a:" ---- plaintext

    colon_surround
}