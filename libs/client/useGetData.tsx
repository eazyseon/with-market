import { useState } from "react";

interface UseGetDataState {
  loading: boolean;
  data?: object | [];
  error?: object;
}
type UseGetDataStateResult = [() => void, UseGetDataState];

export default function useGetData(url: string | null): UseGetDataStateResult {
  const [state, setSate] = useState<UseGetDataState>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  function mutation() {
    setSate((prev) => ({ ...prev, loading: true }));
    fetch(url)
      .then((response) => response.json())
      .then((data) => setSate((prev) => ({ ...prev, data })))
      .catch((error) => setSate((prev) => ({ ...prev, error })))
      .finally(() => setSate((prev) => ({ ...prev, loading: false })));
  }
  return [mutation, { ...state }] as [() => void, UseGetDataState];
}
