import { useEffect, useState } from "react";
import axios from "axios";

export function useRegistry() {
  const [registry, setRegistry] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/component/all")
      .then((res) => setRegistry(res.data));
  }, []);

  return registry;
}