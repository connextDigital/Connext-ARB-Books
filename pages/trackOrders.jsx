import s from "../styles/landing.module.scss";
import st from "../styles/books.module.scss";

import { useState, useEffect } from "react";

import BackendUrl from "../components/BackendUrl";
import axios from "axios";
import Link from "next/link";

const Tracking = () => {
  let [IDRequested, setIDRequested] = useState("");
  let [dataReceived, setDataReceived] = useState([]);
  let [OrderObject, setOrderObject] = useState({});
  useEffect(() => {
    let urlParameter = window.location.href.split("?");
    setIDRequested(urlParameter[1]);
    // setTimeout(() => callDatabase(), 1000);
  }, []);

  const callDatabase = async () => {
    let { data } = await axios.get(
      BackendUrl + `/order-details?uuid=${IDRequested}`
    );
    setDataReceived(data);
  };
  //
  return (
    <div className={s.TrackingPage} onLoad={() => callDatabase()}>
      <div className={s.navv} style={{width: "50vw"}}>
        <img src="/booksLogo.png" />

        <Link href="/">
          <h2>Home</h2>
        </Link>
      </div>
      <div className={s.SearchBox}>
        <h3>Enter Order ID {" > "} </h3>
        <input
          type="text"
          defaultValue={IDRequested}
          onChange={(e) => setIDRequested(e.target.value)}
        ></input>
        <button onClick={() => callDatabase()}>Search</button>
      </div>
      <div>
        {dataReceived.length !=0 && (
          <div className={s.DetBox}>
            <div className={s.Details}>
              <div className={s.DetailHolder}>
                <h3>Name: </h3>
                <h4> {dataReceived[0].fullName}</h4>
              </div>
              <div className={s.DetailHolder}>
                <h3>Mobile: </h3>
                <h4> {dataReceived[0].mobileNo}</h4>
              </div>
              <div className={s.DetailHolder}>
                <h3>Email: </h3>
                <h4> {dataReceived[0].email}</h4>
              </div>
              <div className={s.DetailHolder}>
                <h3>Books: </h3>
                <p>
                  {dataReceived[0].bag.map((item) => (
                    <p>
                      {item.name} ({item.quantity})
                    </p>
                  ))}
                </p>
              </div>
            </div>

            <div className={s.Details}>
              <div className={s.DetailHolder2}>
                <h3>Total Price: </h3>
                <h4> ₹ {dataReceived[0].totalPrice}</h4>
              </div>
              <div className={s.DetailHolder2}>
                <h3>Order Date: </h3>
                <h4> {dataReceived[0].orderDate}</h4>
              </div>
              <div className={s.DetailHolder2}>
                <h4>Expected Delivery</h4>
                <h3>{dataReceived[0].expectedDelivery}</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracking;
