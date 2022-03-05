define(["require", "exports", "../util/FuncLib"], function (require, exports, FuncLib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MarkdownTokenizer = void 0;
    var TokenType;
    (function (TokenType) {
        /**
         *
         */
        TokenType[TokenType["plaintext"] = 0] = "plaintext";
        /**
         *
         */
        TokenType[TokenType["line_special_starting"] = 1] = "line_special_starting";
        /**
         *
         */
        TokenType[TokenType["HTML_tags"] = 2] = "HTML_tags";
        /**
         * Like "$$" or "```"
         */
        TokenType[TokenType["paired_mul_line_fmt_notation"] = 3] = "paired_mul_line_fmt_notation";
    })(TokenType || (TokenType = {}));
    var LineType;
    (function (LineType) {
        /**
         * A line with text or inline-formatted
         */
        LineType[LineType["text"] = 0] = "text";
        /**
         * Like "====" to show the previous line will be a title, "$$" to show mul-lines formula
         */
        LineType[LineType["notation"] = 1] = "notation";
        /**
         * Effectively empty lines. Contains only space, tab, or nothing.
         */
        LineType[LineType["blank"] = 2] = "blank";
    })(LineType || (LineType = {}));
    /**
     *
     */
    class MarkdownTokenizer {
        constructor(config) {
            /**
             * If the line only has these character's repeating, its type will become `LineType.notation`.
             */
            this.line_notation_repeatings = ['-', '='];
            /**
            * If the line only contains one of them, its type will become `LineType.notation`.
            */
            this.line_notation_fixed_len = ["$$", "```"];
            this.text_special_startings = ['*', '#', '>', '-', '+'];
            if (config.file_path ?? false) {
                this.file_path = config.file_path;
            }
            else if (config.original_text ?? false) {
                this.parse(config.original_text);
            }
        }
        result() {
            console.log("Showing parsed result.");
            return (0, FuncLib_1.readFileSync)(this.file_path);
        }
        parse(text) {
            // The parser will read file line by line.
            // First, split the origin str by "\n". Multiple "\n" will have a empty string.
            let lines = text.split(/\n/); // Example: "test\n\nstr" will be ["test", "", "str"].
            let line_index = 0;
            let previous_line_type = null;
            let current_line_type = null;
            for (let line of lines) {
                current_line_type = this.decideLineType(line);
                console.log("LineType: " + LineType[current_line_type] + ",\ttext: " + line);
                // Search for inline tokens.
                if (current_line_type == LineType.text) {
                }
            }
        }
        decideLineType(line_text) {
            // If the line_text is actually with characters that are thought to be empty.
            if (line_text.trim().length == 0) {
                return LineType.blank;
            }
            // Check if has fixed-length character, or filled with repeatings.
            // Trim end to avoid parse error.
            line_text = line_text.trimEnd();
            if (this.line_notation_fixed_len.includes(line_text)
                || (line_text.split("").every(c => c == line_text[0]) // If only repeat one char
                    && this.line_notation_repeatings.includes(line_text[0]))) {
                return LineType.notation;
            }
            // If not other types of line.
            return LineType.text;
        }
    }
    exports.MarkdownTokenizer = MarkdownTokenizer;
});
