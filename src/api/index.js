export default async (req, res) => {
  const { reqHandler } = await import('../dist/solve/server/main.js');
  return reqHandler(req, res);
};
