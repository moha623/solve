import path from 'path';
const serverDistPath = path.join(process.cwd(), 'dist/solve/server/server.mjs');
export default import(serverDistPath).then(module => module.app);
