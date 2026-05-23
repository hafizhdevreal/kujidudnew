"use client";

import { useEffect, useState } from "react";

const products = [
  {
    id: 1,
    name: "Angker Melon (1 Slop)",
    price: 102000,
    sold: 300,
    image:
      "https://cdn.phototourl.com/free/2026-05-16-c9174073-f3b2-4ccd-96be-ba8c566f61bd.jpg",
  },
  {
    id: 2,
    name: "Angker Filter Black (1 Slop)",
    price: 102000,
    sold: 500,
    image:
      "https://cdn.phototourl.com/free/2026-05-16-54bca7c4-3318-4d46-a2a7-248c054342e6.jpg",
  },
  {
    id: 3,
    name: "Angker Mangga (1 Slop)",
    price: 102000,
    sold: 110,
    image:
      "https://cdn.phototourl.com/free/2026-05-16-83ca767c-9260-4a42-8ead-599a69ec14ad.jpg",
  },
  {
    id: 4,
    name: "Marbol Original HLP (1 Slop)",
    price: 110000,
    sold: 200,
    image:
      "https://cdn.phototourl.com/free/2026-05-16-f0271eed-d21a-4c2b-97e7-248419a2f91c.jpg",
  },
];

const fakeNames = [
  "RizkyS*****",
  "DimasP*****",
  "AsepG*****",
  "FajarS*****",
  "BagusK*****",
  "AndiW*****",
  "RendyK*****",
  "WildanS*****",
  "BimaS*****",
  "RifkyO*****",
  "KevinG*****",
  "AldoP*****",
  "ZidanS*****",
  "YogaP*****",
  "FikriS*****",
  "RehanO*****",
  "RamaS*****",
  "AkbarG*****",
  "IlhamP*****",
  "DaffaS*****",
];

export default function Home() {
  const [cart, setCart] = useState([]);
  const [fakeOrder, setFakeOrder] = useState("");

  const [address, setAddress] = useState("");
  const [wa, setWa] = useState("");

  const [qrImage, setQrImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [reffId, setReffId] = useState("");

  const [paymentSuccess, setPaymentSuccess] =
    useState(false);

  const [transactionCode, setTransactionCode] =
    useState("");

  const [transactionHistory, setTransactionHistory] =
    useState([]);

  const [isLogin, setIsLogin] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const [authMode, setAuthMode] =
    useState("register");

  const [showPassword, setShowPassword] =
    useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  useEffect(() => {
    const savedUser =
      localStorage.getItem(
        "kujidud_login"
      );

    if (savedUser) {
      setIsLogin(true);
    }

    const history =
      JSON.parse(
        localStorage.getItem(
          "kujidud_history"
        )
      ) || [];

    setTransactionHistory(
      [...history].reverse()
    );
  }, []);

  const handleRegister = () => {
    if (
      !username ||
      !email ||
      !password
    ) {
      alert("Lengkapi data");
      return;
    }

    localStorage.setItem(
      "kujidud_user",
      JSON.stringify({
        username,
        email,
        password,
      })
    );

    alert(
      "Daftar berhasil, silahkan login"
    );

    setAuthMode("login");

    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleLogin = () => {
    const savedUser = JSON.parse(
      localStorage.getItem(
        "kujidud_user"
      )
    );

    if (!savedUser) {
      return alert(
        "Akun belum terdaftar"
      );
    }

    if (
      email === savedUser.email &&
      password === savedUser.password
    ) {
      localStorage.setItem(
        "kujidud_login",
        "true"
      );

      setIsLogin(true);
      setShowAuth(false);

      alert("Login berhasil");
    } else {
      alert(
        "Email atau password salah"
      );
    }
  };

  const logout = () => {
    localStorage.removeItem(
      "kujidud_login"
    );

    setIsLogin(false);
  };

  const addToCart = (product) => {
    const existing = cart.find(
      (item) =>
        item.id === product.id
    );

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                qty:
                  item.qty + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          qty: 1,
        },
      ]);
    }
  };

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              qty:
                item.qty + 1,
            }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    const item = cart.find(
      (x) => x.id === id
    );

    if (!item) return;

    if (item.qty === 1) {
      setCart(
        cart.filter(
          (x) => x.id !== id
        )
      );
    } else {
      setCart(
        cart.map((x) =>
          x.id === id
            ? {
                ...x,
                qty:
                  x.qty - 1,
              }
            : x
        )
      );
    }
  };

  const subtotal = cart.reduce(
    (acc, item) =>
      acc +
      item.price * item.qty,
    0
  );

  const paymentFee = 8000;

  const total =
    subtotal + paymentFee;

  const generateCode = () => {
    return (
      "KJD" +
      Math.floor(
        100000 +
          Math.random() *
            900000
      )
    );
  };

  const checkout = async () => {
    if (!isLogin) {
      return alert(
        "Silahkan login dulu"
      );
    }

    if (cart.length === 0) {
      return alert(
        "Keranjang kosong"
      );
    }

    if (!address || !wa) {
      return alert(
        "Lengkapi alamat dan nomor WhatsApp"
      );
    }

    const code = generateCode();

    setTransactionCode(code);

    const history =
      JSON.parse(
        localStorage.getItem(
          "kujidud_history"
        )
      ) || [];

    history.push({
      code,
      cart,
      total,
      address,
      wa,
      date: new Date().toLocaleString(
        "id-ID"
      ),
      status: "Menunggu Pembayaran",
    });

    localStorage.setItem(
      "kujidud_history",
      JSON.stringify(history)
    );

    setTransactionHistory(
      [...history].reverse()
    );

    try {
      setLoading(true);

      const res = await fetch(
        "/api/create-payment",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            amount: total,
            description:
              "Checkout " + code,
          }),
        }
      );

      const data =
        await res.json();

      if (data.status) {
        setQrImage(
          data.data.qr_image
        );

        setReffId(
          data.data.reff_id
        );
      } else {
        alert(
          "Gagal membuat QRIS"
        );
      }
    } catch {
      alert("Terjadi error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!reffId) return;

    const interval =
      setInterval(async () => {
        try {
          const res =
            await fetch(
              "/api/check-payment",
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body: JSON.stringify(
                  {
                    reff_id:
                      reffId,
                  }
                ),
              }
            );

          const data =
            await res.json();

          if (
            data.status &&
            data.data.status ===
              "success"
          ) {
            setPaymentSuccess(
              true
            );

            const history =
              JSON.parse(
                localStorage.getItem(
                  "kujidud_history"
                )
              ) || [];

            const updatedHistory =
              history.map((item) => {
                if (
                  item.code ===
                  transactionCode
                ) {
                  return {
                    ...item,
                    status:
                      "Pembayaran Berhasil",
                  };
                }

                return item;
              });

            localStorage.setItem(
              "kujidud_history",
              JSON.stringify(
                updatedHistory
              )
            );

            setTransactionHistory(
              [...updatedHistory].reverse()
            );

            clearInterval(
              interval
            );
          }
        } catch {}
      }, 5000);

    return () =>
      clearInterval(interval);
  }, [reffId, transactionCode]);

  useEffect(() => {
    const interval =
      setInterval(() => {
        const randomName =
          fakeNames[
            Math.floor(
              Math.random() *
                fakeNames.length
            )
          ];

        const randomProduct =
          products[
            Math.floor(
              Math.random() *
                products.length
            )
          ];

        setFakeOrder(
          `${randomName} baru saja membeli ${randomProduct.name}`
        );
      }, 10000);

    return () =>
      clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#f5f5f5] pb-32 text-black">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b bg-white px-4 py-4 shadow-sm">
        <h1 className="text-2xl font-black">
          KUJIDUD SHOP
        </h1>

        <div className="flex items-center gap-2">
          {!isLogin ? (
            <button
              onClick={() =>
                setShowAuth(
                  true
                )
              }
              className="rounded-xl bg-black px-4 py-2 text-sm font-bold text-white"
            >
              Login / Daftar
            </button>
          ) : (
            <button
              onClick={logout}
              className="rounded-xl bg-red-500 px-4 py-2 text-sm font-bold text-white"
            >
              Logout
            </button>
          )}

          <div className="rounded-xl bg-black px-4 py-2 text-sm font-bold text-white">
            Keranjang (
            {cart.length})
          </div>
        </div>
      </nav>

      {/* WARNING */}
      {!isLogin && (
        <div className="mx-4 mt-4 rounded-2xl bg-yellow-400 p-4 text-sm font-bold text-black">
          Silahkan login /
          daftar terlebih dahulu
          untuk melakukan
          transaksi.
        </div>
      )}

      {/* AUTH */}
      {showAuth && (
        <div className="mx-4 mt-4 rounded-3xl bg-white p-5 shadow-lg">
          <h2 className="text-2xl font-black">
            {authMode ===
            "register"
              ? "Daftar Akun"
              : "Login Akun"}
          </h2>

          {authMode ===
            "register" && (
            <input
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              className="mt-4 w-full rounded-2xl border p-4"
            />
          )}

          <input
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="mt-4 w-full rounded-2xl border p-4"
          />

          <div className="relative mt-4">
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full rounded-2xl border p-4 pr-12"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword
                ? "🙈"
                : "👁️"}
            </button>
          </div>

          <button
            onClick={
              authMode ===
              "register"
                ? handleRegister
                : handleLogin
            }
            className="mt-5 w-full rounded-2xl bg-black py-4 font-black text-white"
          >
            {authMode ===
            "register"
              ? "Daftar"
              : "Login"}
          </button>

          <button
            onClick={() =>
              setAuthMode(
                authMode ===
                  "register"
                  ? "login"
                  : "register"
              )
            }
            className="mt-3 w-full text-sm font-bold"
          >
            {authMode ===
            "register"
              ? "Sudah punya akun? Login"
              : "Belum punya akun? Daftar"}
          </button>
        </div>
      )}

      {/* HEADER */}
      <section className="px-4 py-5">
        <div className="rounded-2xl bg-black p-5 text-white">
          <h2 className="text-3xl font-black">
            Welcome To KUJIDUD
            SHOP
          </h2>

          <p className="mt-2 text-white/70">
            Produk pilihan
            premium.
          </p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="grid grid-cols-2 gap-3 px-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="overflow-hidden rounded-2xl bg-white shadow-sm"
          >
            <img
              src={p.image}
              className="h-[180px] w-full object-cover"
            />

            <div className="p-3">
              <h3 className="line-clamp-2 text-sm font-semibold">
                {p.name}
              </h3>

              <p className="mt-2 text-xl font-black">
                Rp{" "}
                {p.price.toLocaleString(
                  "id-ID"
                )}
              </p>

              <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                <span>
                  ⭐ 4.8
                </span>

                <span>
                  •
                </span>

                <span>
                  {p.sold}+
                </span>

                <span>
                  terjual
                </span>
              </div>

              <button
                onClick={() =>
                  addToCart(p)
                }
                className="mt-3 w-full rounded-xl bg-black py-3 text-sm font-bold text-white"
              >
                Tambah ke
                Keranjang
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* CHECKOUT */}
      <section className="mt-6 border-t bg-white px-4 py-6">
        <h2 className="text-2xl font-black">
          Checkout
        </h2>

        {cart.map((item) => (
          <div
            key={item.id}
            className="mt-4 rounded-2xl border p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">
                  {item.name}
                </p>

                <p className="text-sm text-gray-500">
                  Rp{" "}
                  {item.price.toLocaleString(
                    "id-ID"
                  )}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    decreaseQty(
                      item.id
                    )
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500 text-white"
                >
                  -
                </button>

                <span className="font-bold">
                  {item.qty}
                </span>

                <button
                  onClick={() =>
                    increaseQty(
                      item.id
                    )
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500 text-white"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}

        <input
          placeholder="Alamat Rumah"
          value={address}
          onChange={(e) =>
            setAddress(
              e.target.value
            )
          }
          className="mt-5 w-full rounded-2xl border p-4"
        />

        <input
          placeholder="Nomor WhatsApp"
          value={wa}
          onChange={(e) =>
            setWa(
              e.target.value
            )
          }
          className="mt-4 w-full rounded-2xl border p-4"
        />

        <div className="mt-6 space-y-2 text-sm">
          <p>
            Subtotal: Rp{" "}
            {subtotal.toLocaleString(
              "id-ID"
            )}
          </p>

          <p>
            Biaya QRIS:
            Rp{" "}
            {paymentFee.toLocaleString(
              "id-ID"
            )}
          </p>

          <p className="text-3xl font-black">
            Total: Rp{" "}
            {total.toLocaleString(
              "id-ID"
            )}
          </p>
        </div>

        <button
          onClick={checkout}
          className="mt-6 w-full rounded-2xl bg-black py-4 font-black text-white"
        >
          {loading
            ? "Memproses QRIS..."
            : "Bayar Sekarang"}
        </button>

        {transactionCode && (
          <div className="mt-4 rounded-2xl bg-black p-4 text-white">
            <p className="text-sm">
              Kode
              Transaksi
            </p>

            <div className="mt-1 text-2xl font-black">
              {
                transactionCode
              }
            </div>
          </div>
        )}

        {qrImage && (
          <div className="mt-5 rounded-3xl border bg-white p-4">
            <p className="mb-4 text-sm font-bold">
              Scan QRIS
              dibawah
              menggunakan
              aplikasi
              e-wallet atau
              bank untuk
              melakukan
              pembayaran.
              PESANAN ANDA
              OTOMATIS
              DIPROSES OLEH
              SISTEM.
            </p>

            <img
              src={qrImage}
              className="w-full rounded-2xl"
            />
          </div>
        )}

        {paymentSuccess && (
          <div className="mt-6 rounded-3xl bg-green-500 p-5 text-white">
            <p className="text-2xl font-black">
              Pembayaran
              Berhasil
            </p>

            <p className="mt-2 text-sm">
              Pesanan anda
              sedang
              diproses.
            </p>
          </div>
        )}
      </section>

      {/* RIWAYAT */}
      <section className="mt-6 border-t bg-white px-4 py-6">
        <h2 className="text-2xl font-black">
          Riwayat
          Transaksi
        </h2>

        {transactionHistory.length ===
        0 ? (
          <div className="mt-4 rounded-2xl border p-4 text-sm text-gray-500">
            Belum ada
            transaksi
          </div>
        ) : (
          transactionHistory.map(
            (
              item,
              index
            ) => (
              <div
                key={index}
                className="mt-4 rounded-2xl border p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-black">
                      {
                        item.code
                      }
                    </p>

                    <p className="text-xs text-gray-500">
                      {
                        item.date
                      }
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-black">
                      Rp{" "}
                      {item.total.toLocaleString(
                        "id-ID"
                      )}
                    </p>

                    <p
                      className={`text-xs font-bold ${
                        item.status ===
                        "Pembayaran Berhasil"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {item.status}
                    </p>
                  </div>
                </div>

                <div className="mt-3 border-t pt-3">
                  {item.cart.map(
                    (
                      product,
                      i
                    ) => (
                      <div
                        key={
                          i
                        }
                        className="mb-2 flex items-center justify-between text-sm"
                      >
                        <span>
                          {
                            product.name
                          }{" "}
                          x
                          {
                            product.qty
                          }
                        </span>

                        <span>
                          Rp{" "}
                          {(
                            product.price *
                            product.qty
                          ).toLocaleString(
                            "id-ID"
                          )}
                        </span>
                      </div>
                    )
                  )}
                </div>

                <div className="mt-3 rounded-xl bg-gray-100 p-3 text-sm">
                  <p>
                    <span className="font-bold">
                      Alamat:
                    </span>{" "}
                    {
                      item.address
                    }
                  </p>

                  <p className="mt-1">
                    <span className="font-bold">
                      WhatsApp:
                    </span>{" "}
                    {item.wa}
                  </p>
                </div>
              </div>
            )
          )
        )}
      </section>

      {/* FAKE ORDER */}
      <div className="fixed bottom-5 left-1/2 z-50 w-[90%] -translate-x-1/2 rounded-2xl bg-black px-5 py-4 text-sm text-white">
        {fakeOrder ||
          "Loading order..."}
      </div>
    </main>
  );
}
