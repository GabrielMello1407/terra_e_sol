import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin"; // Corrigindo a importação para o plugin correto
import tsParser from "@typescript-eslint/parser"; // Adicionando o parser do TypeScript

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // Adicionando configuração personalizada
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      "no-unused-vars": "off", // Desabilitar regra base
      "@typescript-eslint/no-unused-vars": "error", // Habilitar regra específica do TypeScript
    },
  },
];
