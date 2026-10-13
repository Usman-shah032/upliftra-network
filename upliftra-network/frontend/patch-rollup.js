import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const nativeJsPath = path.join(__dirname, 'node_modules', 'rollup', 'dist', 'native.js');

try {
  if (fs.existsSync(nativeJsPath)) {
    let content = fs.readFileSync(nativeJsPath, 'utf8');
    if (!content.includes("require('@rollup/wasm-node/dist/native.js')")) {
      // Clean up previous patch if any
      content = content.replace("return require('@rollup/wasm-node');", "return require('@rollup/wasm-node/dist/native.js');");
      if (!content.includes("require('@rollup/wasm-node/dist/native.js')")) {
        content = content.replace(
          /catch\s*\(([^)]+)\)\s*\{/,
          "catch ($1) {\n\t\ttry {\n\t\t\treturn require('@rollup/wasm-node/dist/native.js');\n\t\t} catch (_) {}"
        );
      }
      fs.writeFileSync(nativeJsPath, content, 'utf8');
      console.log('[Frontend] Applied WASM rollup patch for Windows Application Control compatibility.');
    }
  }
} catch (e) {
  // Silent catch
}
