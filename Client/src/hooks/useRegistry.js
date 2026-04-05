import { useEffect, useState } from "react";
import { getComponents } from "../api/component";

export function useRegistry() {
  const [registry, setRegistry] = useState([]);

  useEffect(() => {
    getComponents().then((res) =>
      setRegistry(res.data)
    );
  }, []);

  return registry;
}