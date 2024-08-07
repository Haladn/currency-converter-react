import React from "react";
import { HiOutlineStar, HiStar } from "react-icons/hi";
import "./CurrencyConverter.css";

const DropDown = ({
  currencies,
  currency,
  favorites,
  handleFavorite,
  setCurrency,
  title = "",
}) => {
  const isFavorite = (cur) => favorites.includes(cur);
  return (
    <div className="mt-1 position-relative">
      <label htmlFor={title} className="fw-bold">
        {title}
      </label>
      <div>
        <select
          className="w-100 p-2"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          {/* render favorites */}
          {favorites.map((currency, index) => {
            return (
              <option className="bg-secondary" value={currency} key={index}>
                {currency}
              </option>
            );
          })}
          <hr />
          {/* filter currencies to not includes favorites then map throug them */}
          {currencies
            .filter((current) => !favorites.includes(current))
            .map((currency, index) => (
              <option value={currency} key={index}>
                {currency}
              </option>
            ))}
        </select>
        <button
          className=" position-absolute end-0 me-4 mt-0 "
          style={{ border: "none", backgroundColor: "transparent" }}
          onClick={() => handleFavorite(currency)}
        >
          {isFavorite(currency) ? <HiStar /> : <HiOutlineStar />}
        </button>
      </div>
    </div>
  );
};

export default DropDown;
