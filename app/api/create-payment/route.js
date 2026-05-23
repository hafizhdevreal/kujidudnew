export async function POST(req) {
  try {
    const body = await req.json();

    const response = await fetch(
      "https://pg.ronzzyt.id/api/transaction/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key:
            "RP-dc5b4514-bc01-4217-9d07-e6f8e14db398",
          code: "qris",
          amount: body.amount,
          description: body.description,
        }),
      }
    );

    const data = await response.json();

    return Response.json(data);
  } catch (err) {
    return Response.json({
      status: false,
      message: "Gagal membuat QRIS",
    });
  }
}
