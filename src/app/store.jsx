import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storageSession from "redux-persist/lib/storage/session";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import userReducer from "../features/user/userSlice";
import mockDataReducer from "../features/mock-data/mockDataSlice";
import dataCountReducer from "../features/data-count/dataCountSlice";
import documentInventoryReducer from "../features/document-inventory/documentInventorySlice";
import submissionReducer from "../features/submissionSlice/submissionSlice";
import extractionProgressSlice from "../features/Extraction-slice/extractionProgressSlice"
import ProgressSubmissionSlice from "../features/progress-submission/ProgressSubmissionSlice";

const rootReducer = combineReducers({
  user: userReducer,
  mockData: mockDataReducer,
  dataCount: dataCountReducer,
  documentInventory: documentInventoryReducer,
  submission: submissionReducer,

  extractionProgress: extractionProgressSlice,
  progressSubmission:ProgressSubmissionSlice,
});

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
