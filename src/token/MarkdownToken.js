define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TokenType = exports.MarkdownToken = void 0;
    class MarkdownToken {
    }
    exports.MarkdownToken = MarkdownToken;
    var TokenType;
    (function (TokenType) {
        /**
         * Only text
         */
        TokenType[TokenType["plaintext"] = 0] = "plaintext";
        /**
         * Self-closing HTML tag.
         * Accept both form, like "<br>" and "<br />"
         */
        TokenType[TokenType["single_HTML_tag"] = 1] = "single_HTML_tag";
        // Grouped text does not force no-space-around the symbol.
        // For example:
        // "(a)", "( a )", or "(a )"
        // Notice that all grouped symbol MUST be paired.
        // If not paired, it is not ensured that the result will be correct.
        /**
         * Text grouped by parenthesis
         */
        TokenType[TokenType["parenthesis_grouped"] = 2] = "parenthesis_grouped";
        /**
         * Text grouped by bracket
         */
        TokenType[TokenType["bracket_grouped"] = 3] = "bracket_grouped";
        /**
         * Text grouped bt brace
         */
        TokenType[TokenType["brace_grouped"] = 4] = "brace_grouped";
        /**
         * Text grouped by user-defined symbol
         */
        TokenType[TokenType["custom_symbol_grouped"] = 5] = "custom_symbol_grouped";
        /**
         * Text grouped by
         */
        TokenType[TokenType["HTML_tag_grouped"] = 6] = "HTML_tag_grouped";
        // Surrounded text force no-space-around the symbol
        // For example:
        // ":a:"  ---- colon_surround
        // ": a:" ---- plaintext
        TokenType[TokenType["colon_surround"] = 7] = "colon_surround";
    })(TokenType = exports.TokenType || (exports.TokenType = {}));
});
