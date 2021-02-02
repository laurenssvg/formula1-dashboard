import React, { useEffect, useState } from "react";
import styled from "styled-components";

const DriverCard = ({ driver }) => {
  const [driverInfo, setDriverInfo] = useState([]);

  const getDriverInfo = async (driver) => {
    const driverWikiName = driver.url.split("/");
    let name = driverWikiName[driverWikiName.length - 1];

    if (name === "Alexander_Albon") {
      name = "Alex_Albon";
    }

    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${name}`,
      { headers: { "User-Agent": "lauro.enzo@gmail.com" } }
    );

    const driverInfo = await res.json();
    setDriverInfo(driverInfo);
  };

  useEffect(() => {
    getDriverInfo(driver);
  }, [driver]);

  return (
    <Wrapper>
      <div className="driver_name">{`${driver.givenName} ${driver.familyName}`}</div>
      {driverInfo.type === "standard" && driverInfo.thumbnail ? (
        <img src={driverInfo.thumbnail.source} alt={driverInfo.title}></img>
      ) : (
        <div>No image provided</div>
      )}
      <div className="driver_nationality">
        Nationality: {driver.nationality}
      </div>
      <div className="driver_birthday">Birthday: {driver.dateOfBirth}</div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  background-color: white;
  letter-spacing: 0.1rem;
  border-radius: 0.3rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.4);
  text-align: center;
  display: grid;
  grid-template-rows: auto 1fr auto auto;
  place-items: center;
  &:hover {
    transform: scale(1.1);
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    cursor: pointer;
  }

  .driver_name {
    margin: 5px 0px;
    font-weight: bold;
  }

  .driver_nationality {
    font-size: 0.9rem;
  }

  .driver_birthday {
    font-size: 0.9rem;
  }

  img {
    width: 100px;
    margin: 5px;
  }
`;

export default DriverCard;
