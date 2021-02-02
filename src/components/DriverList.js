import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DriverCard from "./DriverCard";

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [season, setSeason] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDrivers = async () => {
      setLoading(true);
      const response = await fetch(
        "http://ergast.com/api/f1/2019/drivers.json"
      );

      const driverData = await response.json();

      setSeason(driverData.MRData.DriverTable.season);
      setDrivers(driverData.MRData.DriverTable.Drivers);
      setLoading(false);
    };
    fetchDrivers();
  }, []);

  return (
    <Wrapper>
      <div className="season">Drivers {season}</div>
      {!loading ? (
        <div className="drivers">
          {drivers.map((driver) => (
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
    display: grid;
    font-size: 2rem;
    place-items: center;
    margin: 15px;
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

  @media screen and (max-width: 930px) {
    .drivers {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

export default DriverList;
