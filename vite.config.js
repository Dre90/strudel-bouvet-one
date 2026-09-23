import { defineConfig } from "vite";
import { readFile } from "node:fs/promises";
import path from "node:path";

const patternsDir = path.resolve(import.meta.dirname, "patterns");

// Sender endret pattern-kode til nettleseren som egen HMR-hendelse,
// slik at Strudel re-evaluerer uten at siden lastes på nytt.
function strudelPatterns() {
  return {
    name: "strudel-patterns",
    async handleHotUpdate({ file, server }) {
      if (!file.startsWith(patternsDir) || !file.endsWith(".js")) return;
      const name = path.basename(file, ".js");
      const code = await readFile(file, "utf8");
      server.hot.send({
        type: "custom",
        event: "strudel:pattern-changed",
        data: { name, code },
      });
      return [];
    },
  };
}

export default defineConfig({
  plugins: [strudelPatterns()],
  server: {
    port: 5173,
    strictPort: true,
    forwardConsole: false, // Strudel logger harmløse AudioNode-feil ved opprydding; feil vises i nettleseren uansett
  },
});
