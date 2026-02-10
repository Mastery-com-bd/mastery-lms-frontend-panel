"use client";

import { AppStore, makeStore } from "@/redux/store";
import { Provider } from "react-redux";
import { useState } from "react";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store] = useState<AppStore>(() => makeStore());

  const persistedStore = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={<p>...loading</p>} persistor={persistedStore}>
        {children}
      </PersistGate>
    </Provider>
  );
}
