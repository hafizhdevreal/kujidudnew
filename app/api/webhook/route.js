export async function POST(req) {
  const body = await req.json()

  console.log(body)

  const from = body.from
  const message = body.message

  // kalau ada pesan masuk
  if (from && message) {

    // kirim balasan
    await fetch("https://yilzi.me/api/send/message?device=1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer zap_967f4e66eb7a8341488ecf0296d895ed"
      },
      body: JSON.stringify({
        to: from,
        message: `Halo 👋\nPesan kamu: ${message}`
      })
    })

  }

  return Response.json({
    success: true
  })
                           }
