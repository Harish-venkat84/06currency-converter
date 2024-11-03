import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`);
      const json = await response.json();
      setData(json[currency]);
    };
    fetchData();
  }, [currency]);

  return data;
}

export default useCurrencyInfo;
