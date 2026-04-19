import { useEffect, useState } from "react";
import { getComponents } from "../api/component";
import { registry as localRegistry } from "../utils/registry";

export function useRegistry() {
  const [registry, setRegistry] = useState(localRegistry);

  useEffect(() => {
    getComponents()
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setRegistry(res.data);
        }
      })
      .catch(() => {
        setRegistry(localRegistry);
      });
  }, []);

  return registry;
}