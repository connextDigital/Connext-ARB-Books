import { useState, useEffect } from "react";
import s from "../styles/books.module.scss";
import { v4 as uuidv4 } from "uuid";
import { useQRCode } from "next-qrcode";
import axios from "axios";

import BackendUrl from "./BackendUrl";
import Link from "next/link";

const Books = () => {
  let [currentSem, setCurrentSem] = useState(3);
  let [added, setAdded] = useState(false);
  let [nav, setNavBar] = useState(false);

  const { Image } = useQRCode();

  let [totalPrice, setTotalPrice] = useState(0);
  let [mybagArray, setMyBag] = useState([]);
  let [mybagArrayLength, setMyBagL] = useState(0);
  let [showBag, setShowBag] = useState(false);

  let [CheckOutPage, setCOP] = useState(false);

  const style2 = {
    borderBottomColor: "rgb(10, 200, 238)",
    color: "rgb(10, 200, 238)",
  };
  const style1 = {
    borderBottomColor: "rgb(238, 10, 139)",
    color: "rgb(238, 10, 139)",
  };
  const style = {
    borderBottomColor: "",
    color: "",
  };
  const sem3 = [
    {
      name: "All-in- one Pack Sem 3",
      price: 589,
      ogPrice: 596,
      description: "All 4 subjects Handwritten Notes combined pack",
      product_id: "3AIO",
      logo: "/SEM3/3AIO.png",
    },
    {
      name: "Data Structures and Analysis",
      price: 149,
      ogPrice: 149,
      description: "DSA Sem 3 Handwritten Notes + Viva Snippets + Solved Paper",
      product_id: "3DSA",
      logo: "/SEM3/DSA.png",
    },
    {
      name: "Database Management System",
      price: 149,
      ogPrice: 149,
      description:
        "DBMS Sem 3 Handwritten Notes + Viva Snippets + Solved Paper",
      product_id: "3DBMS",
      logo: "/SEM3/DBMS.png",
    },
    {
      name: "Principles of Communication",
      price: 149,
      ogPrice: 149,
      description: "POC Sem 3 Handwritten Notes + Viva Snippets + Solved Paper",
      product_id: "3POC",
      logo: "/SEM3/POC.png",
    },
    {
      name: "Paradigms & Computer Programming Fundamentals ",
      price: 149,
      ogPrice: 149,
      description:
        "PCPF Sem 3 Handwritten Notes + Viva Snippets + Solved Paper",
      product_id: "3PCPF",
      logo: "/SEM3/PCPF.png",
    },
  ];
  const sem4 = [
    {
      name: "All-in- one Pack Sem 4",
      price: 439,
      ogPrice: 447,
      description: "All 3 subjects Handwritten Notes combined pack",
      product_id: "4AIO",
      logo: "/SEM3/3AIO.png",
    },
    {
      name: "Computer Networks and Netwrok Design",
      price: 149,
      ogPrice: 149,

      description:
        "CNND Sem 4 Handwritten Notes + Viva Snippets + Solved Paper",
      product_id: "4CNND",
      logo: "/SEM3/3AIO.png",
    },
    {
      name: "Operating Systems",
      price: 149,
      ogPrice: 149,
      description: "OS Sem 4 Handwritten Notes + Viva Snippets + Solved Paper",
      product_id: "4OS",
      logo: "/SEM3/3AIO.png",
    },
    {
      name: "Computer Organization and Architecture",
      price: 149,
      ogPrice: 149,
      description: "COA Sem 4 Handwritten Notes + Viva Snippets + Solved Paper",
      product_id: "4COA",
      logo: "/SEM3/3AIO.png",
    },
  ];

  const changeBackground = () => {
    if (window.scrollY > 100) {
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    window.scroll({
      top: 1,
    });
    // setTimeout(setAdded, 1000);
    setInterval(setAdded, 6000);
  }, []);

  //   let [orderID, setOrderID] = useState("");

  const printDiv = (divName) => {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  };

  let uuid = uuidv4();
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  today = dd + "/" + mm + "/" + yyyy;

  let [userObject, setUserObject] = useState({
    fullName: "",
    mobileNo: "",
    email: "",
    location: "DMCE Airoli",
    uuid: "uuid",
    locInp: "",
    ship: false,
    bag: mybagArray,
    orderID: "orderID",
    orderDate: today,
    expectedDelivery: "2-3 Working Days",
    totalPrice: totalPrice,
  });

  const calcTotalPrice = () => {
    let p = 0;

    mybagArray.forEach((book) => {
      p = p + book.price * book.quantity;
    });
    setTotalPrice(p);
    userObject.totalPrice = p;
  };

  const calcShip = () => {
    let ship = 0;
    if (userObject.location == "Other" && userObject.ship == false) {
      userObject.ship = true;
      ship = 30;
    }
    if (userObject.location !== "Other" && userObject.ship == true) {
      userObject.ship = false;
      ship = -30;
    }

    let p = totalPrice + ship;
    setTotalPrice(p);
    userObject.totalPrice = p;
  };

  const HandleAddtoBag = (
    product_name,
    product_price,
    product_id,
    product_logo
  ) => {
    let bookPresent = false;

    mybagArray.forEach((book) => {
      if (book.product_id == product_id) {
        book.quantity = book.quantity + 1;
        bookPresent = true;
      }
    });

    if (!bookPresent) {
      mybagArray.push({
        name: product_name,
        price: product_price,
        product_id: product_id,
        logo: product_logo,
        quantity: 1,
      });
    }
    calcTotalPrice();
    setAdded(true);
    setMyBagL(mybagArray.length);
  };

  const RemoveFromBag = (id) => {
    mybagArray[id].quantity = mybagArray[id].quantity - 1;
    if (mybagArray[id].quantity == 0) {
      mybagArray.splice(id, 1);
    }
    calcTotalPrice();
    setMyBagL(mybagArray.length);
  };

  let [val, showVal] = useState(false);

  const handleChange = (e) => {
    setUserObject((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
    showVal(false);
  };

  let [nameError, showNameError] = useState(false);
  let [emailError, showEmailError] = useState(false);
  let [mobileError, showMobileError] = useState(false);

  const validate = () => {
    let err = false;
    if (userObject.fullName == "") {
      showNameError(true);
      err = true;
    }
    if (userObject.mobileNo == "") {
      showMobileError(true);
      err = true;
    }
    if (userObject.email == "") {
      showEmailError(true);
      err = true;
    }

    return !err;
  };

  const saveDetails = () => {
    let validated = validate();
    calcShip();
    if (validated) {
      showVal(true);
    }
  };

  const [loading, setLoading] = useState(false);
  const [orderAmount, setOrderAmount] = useState(totalPrice);
  let [Successfully, SetSuccessfully] = useState(false);

  const showOrderID = () => {
    SetSuccessfully(true);
    localStorage.clear();
  };

  const setFirebaseOrder = () => {
    axios.post(BackendUrl + "/Mail", {
      email: userObject.email,
      subject: `Your Order is Placed Successfully`,
      message: `Dear ${userObject.fullName}, <br ></br><br ></br>
      We have received your order with <br></br> TransactionID :  ${userObject.uuid} <br></br> Track Order here <a href='https://arb-books.netlify.app/trackOrders?${userObject.uuid}'>https://arb-books.netlify.app/trackOrders?${userObject.uuid}</a> <br/><br/> We will process the order shortly and keep you updated. <br></br>  Thank you for Shopping with us. `,
      orderID: userObject.uuid,
    });
    axios.post(BackendUrl + "/save-order", userObject);
  };

  function loadRazorpay() {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?");
    };
    script.onload = async () => {
      try {
        setLoading(true);
        const result = await axios.post(BackendUrl + "/create-order", {
          amount: totalPrice + "00",
        });
        const { amount, id: order_id, currency } = result.data;
        const {
          data: { key: razorpayKey },
        } = await axios.get(BackendUrl + "/get-razorpay-key");

        const options = {
          key: razorpayKey,
          amount: amount.toString(),
          currency: currency,
          description: "Payment",
          order_id: order_id,
          handler: async function (response) {
            // const result = await axios.post(BackendUrl + "/pay-order", {
            //   amount: amount,
            //   razorpayPaymentId: response.razorpay_payment_id,
            //   razorpayOrderId: response.razorpay_order_id,
            //   razorpaySignature: response.razorpay_signature,
            // });
            // alert(result.data.msg);
            userObject.orderID = order_id;
            setFirebaseOrder();
            // setUserObject(userObject);
            setCOP(false);
            // setOrderID(order_id);

            showOrderID();
          },
          theme: {
            color: "#FF1493",
          },
        };

        setLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        alert(err);
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  }

  return (
    <div className={s.books}>
      <div className={nav ? `${s.navBar} ${s.nav2}` : `${s.navBar}`}>
        <img src="/booksLogo.png" />
        <div>
          {!nav && <p>Products</p>}
          {!nav && <p>Track Order</p>}
          <h3 className={s.bag} onClick={() => setShowBag(!showBag)}>
            My Bag <img src="/bag.png" />
            <p>{mybagArrayLength}</p>
          </h3>
        </div>
      </div>
      <h2>
        Information Technology&nbsp;&nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;&nbsp;
        <b>R 2019 </b> &nbsp;&nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;&nbsp;Mumbai
        University&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </h2>

      <div className={s.buttonHolder}>
        <h3
          className={s.semSelect}
          onClick={() => setCurrentSem(3)}
          style={currentSem == 3 ? style1 : style}
        >
          Sem <b>3</b>
        </h3>
        <h3
          className={s.semSelect}
          onClick={() => setCurrentSem(4)}
          style={currentSem == 4 ? style2 : style}
        >
          Sem <b>4</b>
        </h3>
        <h3
          className={s.semSelect}
          onClick={() => setCurrentSem(5)}
          style={currentSem == 5 ? style1 : style}
        >
          Sem <b>5</b>
        </h3>
        <h3
          className={s.semSelect}
          onClick={() => setCurrentSem(6)}
          style={currentSem == 6 ? style2 : style}
        >
          Sem <b>6</b>
        </h3>
      </div>

      <div className={s.mainBook}>
        {currentSem == 3 &&
          sem3.map((book, id) => (
            <div className={s.book} key={id}>
              <img src={book.logo}></img>
              <div>
                <h2>{book.name}</h2>
                <h3>{book.description}</h3>
                <h1>
                  ₹ {book.price} <del> {id == 0 && book.ogPrice}</del>
                </h1>
              </div>
              <button
                style={{ backgroundColor: style1.borderBottomColor }}
                onClick={() =>
                  HandleAddtoBag(
                    book.name,
                    book.price,
                    book.product_id,
                    book.logo
                  )
                }
              >
                Add to Bag
              </button>
            </div>
          ))}
        {currentSem == 4 &&
          sem4.map((book, id) => (
            <div className={s.book} key={id}>
              <img src={book.logo}></img>
              <div>
                <h2>{book.name}</h2>
                <h3>{book.description}</h3>
                <h1>
                  ₹ {book.price} <del> {id == 0 && book.ogPrice}</del>
                </h1>
              </div>
              <button
                style={{ backgroundColor: style2.borderBottomColor }}
                onClick={() =>
                  HandleAddtoBag(
                    book.name,
                    book.price,
                    book.product_id,
                    book.logo
                  )
                }
              >
                Add to Bag
              </button>
            </div>
          ))}
      </div>

      <div
        className={s.Notification}
        style={{
          transform: added ? "" : "translateY(100vh)",
          transitionDuration: "0.3s",
        }}
      >
        <h2>Added to your bag</h2>
      </div>

      <div
        className={s.Mybag}
        style={{ transform: !showBag ? "" : "translateY(-100vh)" }}
      >
        <div className={s.BagModal}>
          <h2 className={s.heading}>CONNEXT</h2>
          <h2 className={s.heading2}>
            {CheckOutPage ? "CHECK" : Successfully ? "Success" : "MY BAG"}
          </h2>
          <p
            className={s.closeButton}
            style={{ display: Successfully ? "none" : "" }}
            onClick={() => {
              setShowBag(false);
              setCOP(false);
            }}
          >
            x
          </p>
          <div
            className={s.emptybag}
            style={{ display: mybagArrayLength == 0 ? "" : "none" }}
          >
            <video src="/nic.mp4" autoPlay muted loop />
            <h1>Want excellent grades ?</h1>
            <h2 onClick={() => setShowBag(false)}>
              Add books to your empty bag
            </h2>
          </div>
          <div
            className={s.carter}
            style={{
              display:
                mybagArrayLength == 0 || CheckOutPage || Successfully
                  ? "none"
                  : "",
            }}
          >
            {mybagArray.map((item, id) => (
              <div className={s.cartShow} key={id}>
                <img src={item.logo} />
                <div>
                  <h2>{item.name}</h2>
                  <h4>
                    Qauntity :{" "}
                    <button
                      onClick={() =>
                        HandleAddtoBag(
                          item.name,
                          item.price,
                          item.product_id,
                          item.logo
                        )
                      }
                    >
                      +
                    </button>
                    {item.quantity}
                    <button onClick={() => RemoveFromBag(id)}>-</button>
                  </h4>
                  <h3>
                    ₹ {item.price}{" "}
                    {item.quantity > 1
                      ? `x ${item.quantity} = ${item.quantity * item.price}`
                      : ""}{" "}
                  </h3>
                </div>
              </div>
            ))}
          </div>
          <div
            className={s.chkbtn}
            style={{
              display:
                mybagArrayLength == 0 || CheckOutPage || Successfully
                  ? "none"
                  : "",
            }}
          >
            <div className={s.totalPrice}>
              <h3>Total : ₹ {totalPrice}</h3>
            </div>

            <div
              className={s.checkout}
              onClick={() => {
                setCOP(true);
                userObject.uuid = uuid;
              }}
            >
              <h3>Proceed to Checkout {">"}</h3>
            </div>
          </div>
          <div
            className={s.CheckOutPage}
            style={{
              display: mybagArrayLength == 0 || !CheckOutPage ? "none" : "",
            }}
          >
            <div className={s.Form}>
              <h1>Enter Your Details</h1>
              <div className={s.formInput}>
                <h4> Name :</h4>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter Your Name"
                  onChange={handleChange}
                  onClick={() => showNameError(false)}
                />
                <h4 className={s.blink_me}>
                  {nameError ? "Please Fill Name" : ""}
                </h4>
              </div>
              <div className={s.formInput}>
                <h4> Mobile No. :</h4>
                <input
                  type="text"
                  name="mobileNo"
                  placeholder="Enter Your Mobile Number"
                  onChange={handleChange}
                  onClick={() => showMobileError(false)}
                />
                <h4 className={s.blink_me}>
                  {mobileError ? "Please Fill Mobile" : ""}
                </h4>
              </div>
              <div className={s.formInput}>
                <h4> Email :</h4>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email Address"
                  onChange={handleChange}
                  onClick={() => showEmailError(false)}
                />
                <h4 className={s.blink_me}>
                  {emailError ? "Please Fill E-mail" : ""}
                </h4>
              </div>
              <div className={s.formInput}>
                <h4> Pickup Location :</h4>
                <select
                  name="location"
                  onChange={handleChange}
                  style={{
                    width: userObject.location == "Other" ? "30%" : "",
                  }}
                >
                  <option value="DMCE Airoli">DMCE Airoli</option>
                  <option value="Airoli Railway Station">
                    Airoli Railway Station
                  </option>

                  <option value="Thane Railway Station">
                    Thane Railway Station
                  </option>
                  <option value="Dombivali Railway Station">
                    Dombivali Railway Station
                  </option>
                  <option value="Mulund Railway Station">
                    Mulund Railway Station
                  </option>
                  <option value="Other">Other Railway Station</option>
                </select>
                <input
                  type="text"
                  name="locInp"
                  onChange={handleChange}
                  placeholder="Enter Railway Station"
                  style={{
                    display: userObject.location == "Other" ? "" : "none",
                    width: "30%",
                  }}
                ></input>
              </div>
              <p
                style={{
                  display: userObject.location == "Other" ? "" : "none",
                  fontFamily: "Poppins",
                }}
              >
                Note : Additional ₹ 30 Shipping Charges Applicable on Routes
                other than Dombivali to Mulund / Thane to Airoli{" "}
              </p>
              {!val && (
                <button className={s.saveDetails} onClick={() => saveDetails()}>
                  Save Details
                </button>
              )}
              {val && (
                <button
                  className={s.pay}
                  disabled={loading}
                  onClick={loadRazorpay}
                >
                  Proceed to Pay
                </button>
              )}
            </div>
            <div className={s.bill2}>
              <div className={s.bill}>
                <h1>User Details</h1>
                <h2>{userObject.fullName}</h2>
                <p>{userObject.mobileNo}</p>
                <p>{userObject.email}</p>
                <p>
                  {userObject.location == "Other"
                    ? userObject.locInp + " Rly. Stn."
                    : userObject.location}
                </p>
              </div>
              <div className={s.bill}>
                <img src="/transplogo.png" />

                <h3>Purchase Details</h3>

                {mybagArray.map((item, id) => (
                  <div className={s.billCart} key={id}>
                    <div>
                      <p>
                        {item.name} &nbsp; Qty :{item.quantity} &nbsp; ₹
                        {item.quantity * item.price}
                      </p>
                    </div>
                  </div>
                ))}
                <p>Shipping Charges : {userObject.ship ? "₹ 30" : "FREE"} </p>
                <h3
                  style={{
                    fontFamily: "Poppins",
                  }}
                >
                  Total Payable {">"} ₹ {totalPrice}
                </h3>
              </div>
            </div>
          </div>

          <div
            className={s.ShowSummary}
            id="printableArea"
            style={{
              display: Successfully ? "" : "none",
              fontFamily: "Poppins",
            }}
          >
            <img src="/booksLogo.jpg" />
            <h1>Payment Successful</h1>
            <div className={s.qr}>
              <Image
                text={`https://arb-books.netlify.app/trackOrders?${userObject.uuid}`}
              ></Image>
            </div>
            <Link href={`/trackOrders?${userObject.uuid}`}>
              <h3 className={s.trackHere}>Track Here</h3>
            </Link>
            <h3>Order ID : {userObject.uuid}</h3>
            <h3>Razorpay Transaction ID : {userObject.orderID}</h3>
            <div>
              <button onClick={() => printDiv("printableArea")}>Print</button>
              <button
                onClick={() => {
                  window.location.reload();
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
