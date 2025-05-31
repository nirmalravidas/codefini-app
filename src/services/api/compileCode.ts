import axios from 'axios';

interface ExecuteParams {
  code: string;
  input: string;
  language: string;
}

const languageMap: Record<string, { pistonLang: string; extension: string }> = {
  python: { pistonLang: 'python3', extension: 'py' },
  cpp: { pistonLang: 'cpp', extension: 'cpp' },
  c: { pistonLang: 'c', extension: 'c' },
  java: { pistonLang: 'java', extension: 'java' },
  javascript: { pistonLang: 'javascript', extension: 'js' },
  ruby: { pistonLang: 'ruby', extension: 'rb' },
  go: { pistonLang: 'go', extension: 'go' },
  rust: { pistonLang: 'rust', extension: 'rs' },
  php: { pistonLang: 'php', extension: 'php' },
};

export const executeCodeWithPiston = async ({
  code,
  input,
  language,
}: ExecuteParams): Promise<string> => {
  const { pistonLang, extension } = languageMap[language] || languageMap['python'];

  const payload = {
    language: pistonLang,
    version: '*',
    files: [{ name: `main.${extension}`, content: code }],
    stdin: input,
  };

  try {
    const response = await axios.post('https://emkc.org/api/v2/piston/execute', payload);

    // Output is inside run.output or compile.output
    if (response.data.run) {
      return response.data.run.output || 'No output';
    } else if (response.data.compile) {
      return response.data.compile.output || 'No output';
    } else {
      return 'No output from execution';
    }
  } catch (error: any) {
    console.error('[Piston API Error]:', error.response?.data || error.message);
    return 'Failed to execute code.';
  }
};
