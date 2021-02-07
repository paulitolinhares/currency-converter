const cache = new Map();

/**
 *
 * @param currencyCode 3 letter currency code (USD, EUR, etc)
 * @param dateStamp timestamp formatted as YYYY-MM-DD to update the cache daily
 */
function generateCacheKey(currencyCode: string, dateStamp: string) {
  return `${currencyCode}-${dateStamp}`;
}

export async function loadConversionTable(baseCurrencyCode: string) {
  const todayDateStamp = new Date().toISOString().split("T")[0];
  const cacheKey = generateCacheKey(baseCurrencyCode, todayDateStamp);

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const response = await fetch(
    `https://api.exchangeratesapi.io/latest?base=${baseCurrencyCode}`
  );

  const data = await response.json();

  cache.set(cacheKey, data);

  return data;
}
