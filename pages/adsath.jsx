import s from "../styles/landing.module.scss";
import { useState, useEffect } from "react";

import BackendUrl from "../components/BackendUrl";
import axios from "axios";
import Link from "next/link";

const AdminPage = () => {
  let [dataReceived, setDataReceived] = useState([]);
  const callDatabase = async () => {
    let { data } = await axios.get(BackendUrl + `/orders`);
    setDataReceived(data);
  };

  const markDeliver = (uuid) => {
    axios.patch(BackendUrl + `/save-order`, {
      uuid: uuid,
      updates: { expectedDelivery: "Delivered" },
    });
  };

  let [logged, setLogged] = useState(false);

  let [expand, setExpand] = useState(-1);

  const onLoad = function (event) {
    let fileInput = document.getElementById("fileInput");
    var file = fileInput.files[0];
    var textType = /text.*/;

    if (file.type.match(textType)) {
      var reader = new FileReader();

      reader.onload = function (e) {
        var content = reader.result;

        if (
          content ==
          "Adika I love You. Everything I do is for you. AdsAth Forever"
        )
          setLogged(true);
      };

      reader.readAsText(file);
    }
  };

  return (
    <div>
      {logged && (
        <div className={s.navv2}>
          <img src="/booksLogo.png" />
          <label htmlFor="fileInput" className={s.upload}>
            Enter Credential Key
          </label>
          <input
            type="file"
            id="fileInput"
            className={s.upload}
            title=" Insert Credential Key"
            style={{ display: "none" }}
            onChange={(e) => onLoad(e)}
          />
        </div>
      )}
      {!logged && (
        <div className={s.TrackingPage}>
          <div className={s.navv}>
            <img src="/booksLogo.png" />

            <h2 onClick={() => callDatabase()}>Fetch Orders</h2>
          </div>
          <div>
            {dataReceived.length != 0 && (
              <div>
                <div className={s.filterBar}>
                  <span>
                    <h4> Search</h4> <input type={"search"}></input>{" "}
                    <img src="/search.png" />
                  </span>
                  <span>
                    <h4> Filter</h4> <img src="/filter.png" />
                  </span>
                </div>
                <div className={s.title}>
                  <h3> Name</h3>

                  <h3> Mobile</h3>
                  <h3 style={{ width: "5vw" }}>Price </h3>
                  <h3> Location</h3>
                  <h3 style={{ width: "16vw" }}>Bag</h3>
                  <h3 style={{ width: "8vw" }}>Order Date </h3>

                  <h3 style={{ width: "15vw" }}>Email </h3>
                  <h3 style={{ width: "7vw" }}>Status</h3>
                </div>
                <div>
                  {dataReceived
                    .slice(0)
                    .reverse()
                    .map((item, index) => (
                      <div
                        className={s.ordBox}
                        key={item.ordBox}
                        style={{
                          backgroundColor:
                            item.expectedDelivery == "Delivered"
                              ? "rgb(166, 247, 139)"
                              : "",
                        }}
                      >
                        <div className={s.OrdersData}>
                          <h3>{item.fullName} </h3>
                          <h3>{item.mobileNo} </h3>
                          <h3 style={{ width: "5vw" }}>{item.totalPrice} </h3>
                          <h3>
                            {item.location == "Other"
                              ? item.locInp
                              : item.location}
                          </h3>
                          <h3 style={{ width: "15vw" }}>
                            {item.bag.map((items) => (
                              <h5 key={items.name}>
                                {items.name} ( {items.quantity} )
                              </h5>
                            ))}
                          </h3>
                          <h3 style={{ width: "7vw" }}>{item.orderDate} </h3>

                          <h3 style={{ width: "15vw" }}>{item.email} </h3>

                          {item.expectedDelivery == "Delivered" ? (
                            "Delivered"
                          ) : (
                            <button
                              className={s.mark}
                              onClick={() => markDeliver(item.uuid)}
                            >
                              Mark Delivered
                            </button>
                          )}
                          <button
                            className={s.expand}
                            onClick={() => setExpand(index)}
                            style={{ height: expand == index ? "7vh" : "" }}
                          >
                            v
                          </button>
                        </div>
                        <div
                          className={s.ids}
                          style={{ display: expand == index ? "" : "none" }}
                        >
                          <h5>{item.orderID}</h5>
                          <h5> {item.uuid}</h5>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
