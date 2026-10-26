export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { passphrase } = req.body || {};
  if (passphrase === process.env.ADMIN_PASSPHRASE) {
    return res.status(200).json({ ok: true, stats: { message: "Admin unlocked" } });
  }
  return res.status(401).json({ error: "Invalid passphrase" });
}
