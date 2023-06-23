import React, { useState, useEffect } from "react";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";

const PhoneList = () => {
  const [phones, setPhones] = useState([]);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/phones");
      setPhones(response.data);
      console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (phones.length > 0) {
      setSelectedPhone(phones[currentIndex]);
    }
  }, [currentIndex, phones]);

  const handlePhoneClick = (phone) => {
    setSelectedPhone(phone);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % phones.length);
  };

  const handlePrevClick = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + phones.length) % phones.length
    );
  };

  return (
    <div>
      {isLoading ? (
        <div>
          <ScaleLoader color="#471971" className="myLoader" />
        </div>
      ) : (
        <div className="PhoneList">
          {phones.map((phone) => (
            <div key={phone.id} onClick={() => handlePhoneClick(phone)}>
              <p className={selectedPhone === phone ? "selectedPhoneName" : ""}>
                {phone.name}
              </p>
            </div>
          ))}
        </div>
      )}
      <hr className="HR" />
      {selectedPhone && (
        <div className="SelectedPhone">
          <div className="buttons">
            <button onClick={handlePrevClick}>
              <img src="/flechaizda.png" alt="izda" />
            </button>
          </div>

          <div className="ModelAndImg">
            <p>{selectedPhone.name}</p>
            <div className="imgContainer">
              <img src={selectedPhone.imageFileName} alt="imageFileName" />
            </div>
          </div>
          <div className="Specifications">
            <p>{selectedPhone.description}</p>
            <table>
              <tr>
                <th>Manufacturer</th>
                <th>Color</th>
                <th>Price</th>
                <th>Screen</th>
                <th>Processor</th>
                <th>RAM</th>
              </tr>
              <tr>
                <td>{selectedPhone.manufacturer}</td>
                <td>{selectedPhone.color}</td>
                <td>{selectedPhone.price}</td>
                <td>{selectedPhone.screen}</td>
                <td>{selectedPhone.processor}</td>
                <td>{selectedPhone.ram}</td>
              </tr>
            </table>
          </div>
          <div className="buttons">
            <button onClick={handleNextClick}>
              <img src="/flechadcha.png" alt="dcha" />
            </button>
          </div>
        </div>
      )}
      <div></div>
    </div>
  );
};

export default PhoneList;
