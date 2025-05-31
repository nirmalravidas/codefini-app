// src/store/useCompilerStore.ts

import { create } from 'zustand';
import { executeCodeWithPiston } from '@/src/services/api/compileCode';
import defaultCodeTemplates from '@/src/utils/defaultCode';

interface CompilerStore {
  code: string;
  input: string;
  output: string;
  language: string;
  isLoading: boolean;
  setCode: (code: string) => void;
  setInput: (input: string) => void;
  setLanguage: (language: string) => void;
  setOutput: (output: string) => void;
  setIsLoading: (loading: boolean) => void;
  setAll: (data: Partial<CompilerStore>) => void;
  reset: () => void;
  resetToDefaultCode: () => void;
  executeCode: () => Promise<void>;
  clearOutput: () => void;
  clearInput: () => void;
}

export const useCompilerStore = create<CompilerStore>((set, get) => ({
  code: defaultCodeTemplates['python'] + '\n'.repeat(70), // Default language code + 70 empty lines
  input: '',
  output: '',
  language: 'python',
  isLoading: false,

  setCode: (code) => set({ code }),
  setInput: (input) => set({ input }),

  setLanguage: (language) => {
    const defaultCode = (defaultCodeTemplates[language] || '') + '\n'.repeat(70);
    set({ language, code: defaultCode });
  },

  setOutput: (output) => set({ output }),
  setIsLoading: (loading) => set({ isLoading: loading }),

  setAll: (data) => set(data),

  reset: () =>
    set({
      code: defaultCodeTemplates['python'] + '\n'.repeat(70),
      input: '',
      output: '',
      language: 'python',
      isLoading: false,
    }),

  resetToDefaultCode: () => {
    const { language } = get();
    const defaultCode = (defaultCodeTemplates[language] || '') + '\n'.repeat(70);
    set({ code: defaultCode });
  },

  clearOutput: () => set({ output: '' }),
  clearInput: () => set({ input: '' }),

  executeCode: async () => {
    const { code, input, language, setOutput, setIsLoading } = get();
    try {
      setIsLoading(true);
      const result = await executeCodeWithPiston({ code, input, language });
      setOutput(result);
    } catch (error: any) {
      console.error('Code execution error:', error);
      setOutput(`Error: ${error?.message || 'Failed to execute code'}`);
    } finally {
      setIsLoading(false);
    }
  },
}));
