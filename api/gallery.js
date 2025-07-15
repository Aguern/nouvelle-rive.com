// api/gallery.js  ← aucune dépendance externe requise
export default async function handler(req, res) {
  const { CLOUDINARY_CLOUD, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

  // Construire l'appel Search API
  const url  = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/resources/search`;
  const auth = Buffer.from(`${CLOUDINARY_KEY}:${CLOUDINARY_SECRET}`).toString('base64');

  const body = {
    expression : 'tags=public_gallery',
    sort_by    : [{ created_at: 'desc' }],
    max_results: 500
  };

  try {
    const r   = await fetch(url, {
      method : 'POST',
      headers: {
        Authorization : `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!r.ok) throw new Error(`Cloudinary → ${r.status}`);

    const data = await r.json();
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate');
    res.status(200).json(data.resources);   // renvoie le tableau d’assets
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
