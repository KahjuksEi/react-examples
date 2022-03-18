import axios from "axios";
import React, { useEffect, useState } from "react";

const PaginationPerPage = () => {
  const [countries, setCountries] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);
  const totalCountries = countries.length;

  const lastCountryIndex = currentPage * countriesPerPage;
  const firstCountryIndex = lastCountryIndex - countriesPerPage;
  const currentCountry = countries.slice(firstCountryIndex, lastCountryIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const getCountries = async () => {
      // setLoading(true);
      const res = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(res.data);
      // setLoading(false);
    };
    getCountries();
  }, []);

  return (
    <div className="paginationPerPage">
      <ul>
        {currentCountry.map((country, index) => (
          <li key={index}>
            <span>{country.name["common"]}</span>
            <img style={{ width: "16px" }} src={country.flags["png"]} alt="" />
          </li>
        ))}
      </ul>
      <ul style={{ display: "flex", listStyle: "none" }}>
        {pageNumbers.map((number) => (
          <li key={number}>
            <a href="!#" onClick={() => paginate(number)}>
              {number}
            </a>
          </li>
        ))}
      </ul>
      <button onClick={prevPage}>Prev</button>
      <button onClick={nextPage}>Next</button>
    </div>
  );
};
export default PaginationPerPage;
