import React, { useEffect, useState, useTransition } from "react";
import "./CurrencyConverter.css";
import DropDown from "./DropDown";
import { HiArrowsRightLeft } from "react-icons/hi2";

const CURRENCIES_URL = "https://api.frankfurter.app/currencies";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);

  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("GBP");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converting, setConverting] = useState(false);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || ["GBP", "USD"]
  );

  console.log("favorites:", favorites);
  const fetchCurrencies = async () => {
    try {
      const response = await fetch(CURRENCIES_URL);
      const data = await response.json();
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.log("Error fetching data.", error);
    }
  };

  const convertCurrency = async () => {
    try {
      if (!amount) return;
      setConverting(true);
      const CONVERT_URL = `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`;
      const response = await fetch(CONVERT_URL);
      const data = await response.json();
      setConvertedAmount(data["rates"][toCurrency]);
      console.log(data["rates"][toCurrency]);
    } catch (error) {
      console.log("Error fetching data.", error);
    } finally {
      setConverting(false);
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleFavorite = (currency) => {
    let updatedFavorites = [...favorites];
    if (favorites.includes(currency)) {
      updatedFavorites = updatedFavorites.filter((fav) => fav !== currency);
    } else {
      updatedFavorites.push(currency);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  console.log(currencies);

  return (
    <div className="bg-white container-fluid  rounded p-5 mx-auto my-10 w-75">
      <h2 className="text-center mb-5 fw-bold">Currency converter</h2>
      <div className="row">
        <div className="col col-10 col-sm-5">
          <DropDown
            currencies={currencies}
            title="From:"
            currency={fromCurrency}
            setCurrency={setFromCurrency}
            favorites={favorites}
            handleFavorite={handleFavorite}
          />
        </div>
        {/* swap currency button in between */}
        <div className="col col-10 col-sm-2 text-center mt-4">
          <button
            className="btn btn-light rounded-circle "
            onClick={handleSwap}
          >
            <HiArrowsRightLeft />
          </button>
        </div>
        <div className="col col-10 col-sm-5">
          <DropDown
            currencies={currencies}
            title="To:"
            currency={toCurrency}
            setCurrency={setToCurrency}
            favorites={favorites}
            handleFavorite={handleFavorite}
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="form-label" htmlFor="amount">
          amount:
        </label>
        <input
          id="amount"
          className="form-control p-2"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-end mt-5 ">
        <button
          className="btn btn-primary btn-sm  py-2 px-3 fw-bold"
          onClick={convertCurrency}
        >
          convert
        </button>
      </div>
      <div className="mt-4 fs-3 text-end">
        Converted Amount: {convertedAmount} {convertedAmount && toCurrency}
      </div>
    </div>
  );
};

export default CurrencyConverter;
