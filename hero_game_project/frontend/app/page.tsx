"use client";

import { useState } from "react";
import { ConnectButton, useCurrentAccount, useSignAndExecuteTransaction } from "@iota/dapp-kit";
import { Transaction } from "@iota/iota-sdk/transactions";

// --- CẤU HÌNH ---
// Package ID của contract vừa deploy, cập nhật sau khi publish
const PACKAGE_ID = "0x801a35bff920b87b91c9f83ed0f538af67dbcf5a81cb7978162a89e92789e23d";
const MODULE_NAME = "hero";
const FUNCTION_NAME = "mint_hero";

// Normalize package id: ensure single 0x prefix and 64 hex chars
function normalizePackageId(id: string) {
  if (!id || typeof id !== "string") return id;
  let s = id.trim();
  if (s.startsWith("0x") || s.startsWith("0X")) s = s.slice(2);
  if (s.length === 65 && s.startsWith("0")) s = s.slice(1);
  if (s.length !== 64) console.warn("Unexpected package id length:", s.length, s);
  return `0x${s}`;
}
const NORMALIZED_PACKAGE_ID = normalizePackageId(PACKAGE_ID);

export default function Home() {
  const account = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>("Iron Man");
  const [image, setImage] = useState<string>(
    "https://upload.wikimedia.org/wikipedia/en/4/47/Iron_Man_%28circa_2018%29.png"
  );
  const [txResult, setTxResult] = useState<any | null>(null);
  const [heroes, setHeroes] = useState<Array<{ name: string; image: string; digest?: string; confirmed?: boolean }>>([]);

  const handleMintHero = async () => {
    if (!account) return alert("Vui lòng kết nối ví trước!");

    setLoading(true);
    try {
      const tx = new Transaction();

      // Gọi hàm mint_hero trong Smart Contract using current form values
      tx.moveCall({
        target: `${NORMALIZED_PACKAGE_ID}::${MODULE_NAME}::${FUNCTION_NAME}`,
        arguments: [tx.pure.string(name), tx.pure.string(image)],
      });

      // Gửi transaction and wait for confirmation when available
      signAndExecute(
        { transaction: tx, waitForTransaction: true },
        {
          onSuccess: (result) => {
            const confirmed = 'rawEffects' in result || 'effects' in result;
            const newHero = { name, image, digest: result?.digest, confirmed };
            setHeroes((prev) => [newHero, ...prev]);
            setTxResult(result as any);
            console.log("Kết quả transaction:", result);
          },
          onError: (error) => {
            console.error("Lỗi:", error);
            const msg = error?.message || String(error);
            if (msg.includes("Dependent package not found") || msg.includes("dependent package")) {
              alert(
                "Thất bại: Dependent package not found on-chain.\n" +
                  "Nguyên nhân: PACKAGE_ID chưa được publish hoặc wallet đang ở mạng khác.\n" +
                  "Hành động: chạy `iota client publish` trong thư mục contract, cập nhật PACKAGE_ID trong frontend."
              );
            } else {
              alert("Thất bại: " + msg);
            }
          },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8 text-yellow-400">⚔️ Hero Trainer Game</h1>

      {/* Nút kết nối ví */}
      <div className="mb-8 scale-125">
        <ConnectButton />
      </div>

      {account ? (
        <div className="flex flex-col items-center gap-6 border border-gray-700 p-10 rounded-2xl bg-gray-800 shadow-xl">
          <p className="text-green-400 font-mono">
            Đã kết nối ví: {account.address.slice(0, 6)}...{account.address.slice(-4)}
          </p>

          {/* Simple form to choose hero name and image */}
          <div className="w-full max-w-md flex flex-col gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tên Hero"
              className="w-full p-2 rounded bg-gray-900 border border-gray-700 text-white"
            />
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image URL"
              className="w-full p-2 rounded bg-gray-900 border border-gray-700 text-white"
            />
          </div>

          <button
            onClick={handleMintHero}
            disabled={loading}
            className={`bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-full transition transform hover:scale-105 shadow-lg shadow-blue-500/50 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Đang xử lý..." : "🦸 Tạo Tướng Mới (Mint Hero)"}
          </button>

          <p className="text-sm text-gray-400 mt-2">Phí gas: ~0.02 IOTA</p>

          {/* List of minted heroes (local cache) */}
          {heroes.length > 0 && (
            <div className="mt-4 w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-4">
              {heroes.map((h, idx) => (
                <div key={idx} className="p-3 bg-gray-900 border border-gray-700 rounded-lg flex gap-3 items-center">
                  <img src={h.image} alt={h.name} className="w-16 h-16 rounded object-cover" />
                  <div className="flex-1">
                    <div className="font-semibold text-yellow-300">{h.name}</div>
                    <div className="text-xs text-gray-400 break-words">{h.digest}</div>
                    {h.confirmed ? <div className="text-green-400 text-xs">✅ Confirmed</div> : <div className="text-gray-400 text-xs">⏳ Pending</div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-400 animate-pulse">Hãy kết nối ví để bắt đầu cuộc phiêu lưu!</p>
      )}
    </main>
  );
}
