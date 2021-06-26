import React, { useState } from "react";
import moment from "moment";
import "./styles.css";

export default function ExpenseTracker() {
  const [enteredAmount, setEnteredAmount] = useState(null);
  const [shownAmount, setShownAmout] = useState(0);
  const [trackerDetails, setTrackerDetails] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const onAmountAdd = (e) => {
    if (e.target.value <= 0) {
      setErrorMessage("Amount cannot be lessthan are equal to 0");
      setIsDisabled(true);
    } else {
      setErrorMessage("");
      setIsDisabled(false);
      setEnteredAmount(parseInt(e.target.value));
    }
  };

  const onAddClick = () => {
    if (errorMessage === "") {
      setShownAmout(shownAmount + enteredAmount);
      trackerDetails.push({
        time: moment().format(),
        operation: "Add",
        value: enteredAmount,
      });
      setTrackerDetails(trackerDetails);
      document.getElementById("amount").value = null;
      setIsDisabled(true);
    } else {
      setIsDisabled(true);
    }
  };

  const onRemoveClick = () => {
    if (shownAmount < enteredAmount) {
      setErrorMessage(
        "removing amount is high as compared to available amount.. Please check and re-enter!!"
      );
      setIsDisabled(true);
    } else {
      setErrorMessage("");
      setShownAmout(shownAmount - enteredAmount);
      trackerDetails.push({
        time: moment().format(),
        operation: "Remove",
        value: enteredAmount,
      });
      setTrackerDetails(trackerDetails);
      document.getElementById("amount").value = null;
      setIsDisabled(true);
    }
  };

  return (
    <div className="extracker-container">
      <div className="extracker-wrapper">
        <div>
          <h1>Expense Tracker - Basic</h1>
        </div>
        <div className="balance-enter-wrapper">
          <h3>Balance : {shownAmount}</h3>
          <div>
            <input
              type="number"
              id="amount"
              name="amount"
              onChange={(e) => onAmountAdd(e)}
            />
            <br></br>
            {errorMessage ? (
              <p className="error-message">{errorMessage}</p>
            ) : null}
            <button
              type="button"
              className="mrtop-6"
              onClick={() => onAddClick()}
              disabled={!isDisabled ? false : true}
            >
              Add
            </button>
            <button
              type="button"
              className="mrtop-6 mrleft4"
              onClick={() => onRemoveClick()}
              disabled={!isDisabled ? false : true}
            >
              Remove
            </button>
          </div>
        </div>
        {trackerDetails && trackerDetails.length > 0 ? (
          <div className="tranction-data transactions-wrapper mrtop-12">
            <div style={{ marginBottom: "16px" }}>Transactions:</div>
            {trackerDetails.map((detail, index) => (
              <div key={index}>
                {detail.time}
                <span>-</span>
                <span>{detail.value}</span>
                <span>-</span>
                <span>{detail.operation}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
