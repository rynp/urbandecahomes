const fs = require('fs');
const path = require('path');

// We can compile data/projects.ts or extract the projects array
const projectsTs = fs.readFileSync('c:/Users/admin/.antigravity-ide/projects/decahomes/data/projects.ts', 'utf8');

// Let's use ts-node or run a small typescript transform to get the JSON representation
const ts = require('typescript');
const jsCode = ts.transpileModule(projectsTs, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
}).outputText;

const moduleExports = {};
const fn = new Function('exports', 'require', jsCode);
fn(moduleExports, require);

fs.writeFileSync(
  'c:/Users/admin/.antigravity-ide/projects/decahomes/data/projects.json',
  JSON.stringify(moduleExports.projects, null, 2),
  'utf8'
);

console.log('Successfully wrote data/projects.json. Projects count:', moduleExports.projects.length);
