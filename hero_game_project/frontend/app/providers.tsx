"use client";

import { IotaClientProvider, WalletProvider } from "@iota/dapp-kit";
import { getFullnodeUrl } from "@iota/iota-sdk/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import "@iota/dapp-kit/dist/index.css";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  // BẮT BUỘC DÙNG DEVNET ĐỂ KHỚP VỚI VÍ CỦA BẠN
  // File providers.tsx
// ...
    const networks = { 
      devnet: { url: getFullnodeUrl("devnet") } // Dùng Devnet RPC
    };

    return (
      <QueryClientProvider client={queryClient}>
        <IotaClientProvider networks={networks} defaultNetwork="devnet"> {/* Default là Devnet */}
          <WalletProvider>
            {children}
          </WalletProvider>
        </IotaClientProvider>
      </QueryClientProvider>
    );
// ...
}