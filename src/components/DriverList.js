import React, { useState, useEffect } from "react";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@material-ui/icons";
import styled from "styled-components";
import DriverCard from "./DriverCard";

const orderBy = (drivers, value, direction) => {
  if (direction === "asc") {
    return [...drivers].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }
  if (direction === "desc") {
    return [...drivers].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }
  return drivers;
};

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }
  if (direction === "desc") {
    return (
      <div>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  }
};

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [season, setSeason] = useState(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [direction, setDirection] = useState();

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

  const onInputChange = (value) => {
    switchDirection();
    setValue(value);
  };

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  const orderedDrivers = orderBy(drivers, value, direction);

  return (
    <Wrapper>
      <div className="drivers_header">
        <div className="season">Drivers {season}</div>
        <div className="order-by">
          <div className="order-by-text">Order by:</div>
          <div className="buttons">
            <button
              onClick={() => onInputChange("familyName")}
              className="button_name"
            >
              <div>Name</div>
              {value === "familyName" && <SortArrow direction={direction} />}
            </button>
            <button
              onClick={() => onInputChange("dateOfBirth")}
              className="button_age"
            >
              <div>Age</div>
              {value === "dateOfBirth" && <SortArrow direction={direction} />}
            </button>
          </div>
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
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .order-by-text {
    flex: 1;
  }

  .order-by button {
    outline: none;
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button_name {
    text-transform: uppercase;
    background: white;
    color: black;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    border-radius: var(--radius);
    border-color: transparent;
    cursor: pointer;
    padding: 0.375rem 0.75rem;
    width: 80px;
    height: 50px;
    display: flex;
    flex-direction: row;
    place-items: center;
  }

  .button_age {
    text-transform: uppercase;
    background: white;
    color: black;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    border-radius: var(--radius);
    border-color: transparent;
    cursor: pointer;
    padding: 0.375rem 0.75rem;
    width: 80px;
    height: 50px;
    display: flex;
    flex-direction: row;
    place-items: center;
  }

  .button_name:hover {
    transform: scale(1.1);
  }

  .button_age:hover {
    transform: scale(1.1);
  }

  @media screen and (max-width: 930px) {
    .drivers {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

export default DriverList;
