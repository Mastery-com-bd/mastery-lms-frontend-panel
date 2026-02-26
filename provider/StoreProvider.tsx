"use client";

import { AppStore, makeStore } from "@/redux/store";
import { Provider } from "react-redux";
import { useState } from "react";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Image from "next/image";

const LogoLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      {/* Animated Logo */}
      <div
        style={{
          animation: "logoPulse 1.6s ease-in-out infinite",
        }}
      >
        <Image
          src="/logo.png"
          alt="Mini Online Skills"
          width={180}
          height={60}
          priority
        />
      </div>

      {/* Animated dots */}
      <div className="flex items-center gap-2 mt-8">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-[#CC0000]"
            style={{
              animation: `dotBounce 1.2s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Keyframes injected inline */}
      <style>{`
        @keyframes logoPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.93); }
        }
        @keyframes dotBounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store] = useState<AppStore>(() => makeStore());

  const persistedStore = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={<LogoLoader />} persistor={persistedStore}>
        {children}
      </PersistGate>
    </Provider>
  );
}
