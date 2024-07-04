document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://api.coinlore.net/api/tickers/";
  const cryptoIds = [90, 80, 58, 1, 2321]; // The IDs of the cryptocurrencies we are interested in

  const container = document.querySelector(
    ".cryptosAndWhyTradeSection__cryptos"
  );

  // Function to show error message
  const showError = (message) => {
    container.innerHTML = `<div class="cryptosAndWhyTradeSection__cryptos__card__error">${message}</div>`;
  };

  // Fetch data from the API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const cryptos = data.data.filter((crypto) =>
        cryptoIds.includes(parseInt(crypto.id))
      );
      const cryptoCards = cryptos.map(createCryptoCard).join("");
      container.innerHTML = cryptoCards;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      showError(
        "Failed to load cryptocurrency data. Please try again later :("
      );
    });
});

function createCryptoCard({ symbol, name, price_usd, percent_change_24h }) {
  const changeClass =
    parseFloat(percent_change_24h) < 0
      ? "cryptoChange_negative"
      : "cryptoChange_positive";
  return `
      <div class="cryptosAndWhyTradeSection__cryptos__card">
        <div class="cryptosAndWhyTradeSection__cryptos__card__header">
          <img
            src="../images/coins/${symbol}.png"
            alt="${symbol}"
            class="crypto-icon"
          />
          <span class="crypto-code">${symbol}</span>
          <span class="crypto-name">${name}</span>
        </div>
        <div class="divider"></div>
        <div class="crypto-price">$${parseFloat(
          price_usd
        ).toLocaleString()}</div>
        <div class="cryptoChange ${changeClass}">
          <i class="fa-solid ${
            parseFloat(percent_change_24h) > 0
              ? "fa-circle-chevron-up"
              : "fa-circle-chevron-down"
          } cryptoChange__Icon"></i>
          ${percent_change_24h}%
        </div>
      </div>
    `;
}
