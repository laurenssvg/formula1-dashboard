import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DriverCard from "./DriverCard";

const orderBy = (drivers, value) => {
  if (value === "age") {
    return [...drivers].sort(
      (a, b) => parseFloat(a.dateOfBirth) - parseFloat(b.dateOfBirth)
    );
  }
  if (value === "name") {
    return [...drivers].sort((a, b) => {
      if (a.familyName < b.familyName) {
        return -1;
      }
      if (a.familyName > b.familyName) {
        return 1;
      }
      return 0;
    });
  }
  return drivers;
};

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [season, setSeason] = useState(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    const fetchDrivers = async () => {
      setLoading(true);
      const response = await fetch(
        "http://ergast.com/api/f1/2020/drivers.json"
      );

      const driverData = await response.json();

      setSeason(driverData.MRData.DriverTable.season);
      setDrivers(driverData.MRData.DriverTable.Drivers);
      setLoading(false);
    };
    fetchDrivers();
  }, []);

  const onInputChange = (e) => {
    setValue(e.target.value);
  };

  const orderedDrivers = orderBy(drivers, value);

  return (
    <Wrapper>
      <div className="drivers_header">
        <div className="season">Drivers {season}</div>
        <div className="order-by">
          <p>Order by:</p>
          <select
            className="select"
            onChange={onInputChange}
            placeholder="Sort by.."
          >
            <option value="name">Name</option>
            <option value="age">Age</option>
          </select>
        </div>
      </div>
      {!loading ? (
        <div className="drivers">
          {orderedDrivers.map((driver) => (
            <DriverCard key={driver.driverId} driver={driver} />
          ))}
        </div>
      ) : (
        <div className="loading" />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .season {
    font-size: 2rem;
  }

  .drivers {
    margin: 10px 10px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 1rem;
  }

  .loading {
    display: grid;
    place-items: center;
    font-size: 50px;
  }

  .drivers_header {
    display: grid;
    grid-template-columns: 5fr 1fr;
    align-items: center;
    margin: 15px;
  }

  .order-by {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .select {
    background: transparent;
  }

  @media screen and (max-width: 930px) {
    .drivers {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

export default DriverList;
