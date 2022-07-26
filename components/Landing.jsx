import s from "../styles/landing.module.scss";

import { useState, useEffect } from "react";

const Landing = () => {
  let [p,setP] = useState(0)
  useEffect(() => {
    setP(localStorage.getItem("Length"));
  });

  return (
    <div className={s.Landing}>
      
      <div className={s.mainLanding}>
        <div>
          <h1>
            Study from the <b>best </b>resources !
          </h1>
          <ul>
            <li>
              <img src="/i3.png" />
              <h4>Handwritten notes Created by Toppers</h4>
            </li>
            <li>
              <img src="/i5.png" />
              <h4>All-in-one Absolute Preparation Material</h4>
            </li>
            <li>
              <img src="/i2.png" />
              <h4>50% price than any other book</h4>
            </li>

            <li>
              <img src="/i4.png" />
              <h4>No need to purchase other Guides / Books</h4>
            </li>
            <li>
              <img src="/i1.png" />
              <h4>Covers everything, Vivas till End Sem Exams</h4>
            </li>
          </ul>
        </div>
        <span>
          <video src="/illus1.mp4" autoPlay muted loop />
          <video src="/illus2.mp4" autoPlay muted loop />
        </span>
      </div>
      <div className={s.banner}>
        <h2>Shop Now</h2>
        <video src="/down.mp4" autoPlay muted loop />
      </div>
    </div>
  );
};

export default Landing;
