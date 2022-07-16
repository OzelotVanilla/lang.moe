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
}