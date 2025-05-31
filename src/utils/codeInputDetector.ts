// List of input-related keywords for different languages
const INPUT_KEYWORDS = [
  "input(",   // Python
  "scanf(",   // C
  "cin",      // C++
  "Scanner",  // Java
  "prompt(",  // JS
  "gets",     // C
  "fmt.scan", // Go
  "stdin",    // General
  "$argv",    // PHP
];

// Regexes for detecting strings and comments (JS/TS + Python style)
const REGEX_PATTERNS = {
  singleLineCommentJS: /\/\/.*$/gm,
  multiLineCommentJS: /\/\*[\s\S]*?\*\//gm,
  singleLineCommentPy: /#.*$/gm,
  multiLineStringPy: /("""|''')[\s\S]*?\1/gm,
  stringDoubleQuotes: /"(?:\\.|[^"\\])*"/gm,
  stringSingleQuotes: /'(?:\\.|[^'\\])*'/gm,
  stringBackticks: /`(?:\\.|[^`\\])*`/gm,
};

/**
 * Remove strings and comments from the code string to avoid false positives.
 * @param code Raw user code string
 * @returns Code with strings & comments stripped out
 */
export function stripStringsAndComments(code: string): string {
  let cleanCode = code;

  // Remove multi-line Python triple-quoted strings first
  cleanCode = cleanCode.replace(REGEX_PATTERNS.multiLineStringPy, "");

  // Remove JS multi-line comments
  cleanCode = cleanCode.replace(REGEX_PATTERNS.multiLineCommentJS, "");

  // Remove single-line comments (JS and Python)
  cleanCode = cleanCode.replace(REGEX_PATTERNS.singleLineCommentJS, "");
  cleanCode = cleanCode.replace(REGEX_PATTERNS.singleLineCommentPy, "");

  // Remove string literals (double, single quotes, backticks)
  cleanCode = cleanCode.replace(REGEX_PATTERNS.stringDoubleQuotes, "");
  cleanCode = cleanCode.replace(REGEX_PATTERNS.stringSingleQuotes, "");
  cleanCode = cleanCode.replace(REGEX_PATTERNS.stringBackticks, "");

  return cleanCode;
}

/**
 * Detect if the user code requires input based on common input keywords,
 * ignoring keywords inside strings and comments.
 * @param code Raw user code string
 * @returns true if input likely needed, false otherwise
 */
export function doesCodeRequireInput(code: string): boolean {
  const cleanedCode = stripStringsAndComments(code).toLowerCase();

  return INPUT_KEYWORDS.some((keyword) => cleanedCode.includes(keyword.toLowerCase()));
}
