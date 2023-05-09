import { useState } from "react";

interface UseUploadState {
  loading: boolean;
  data?: object | [];
  error?: object;
}
type UseUploadStateResult = [(data: any) => void, UseUploadState];

export default function useUploadData(url: string): UseUploadStateResult {
  const [state, setSate] = useState<UseUploadState>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  function mutation(data: any) {
    setSate((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => setSate((prev) => ({ ...prev, data })))
      .catch((error) => setSate((prev) => ({ ...prev, error })))
      .finally(() => setSate((prev) => ({ ...prev, loading: false })));
  }
  return [mutation, { ...state }];
}
