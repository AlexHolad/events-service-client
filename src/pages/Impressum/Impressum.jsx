import React from "react";

import "./Impressum.css"

export default function Impressum() {
  return (
    <div className="gen__container">
      <h3 className="impressum__headline">Impressum</h3>

      <h4 className="impressum__subline">Angaben gemäß § 5 TMG</h4>
      <p className="impressum__text">
        Vladimir Grigoryev
        <br />
        Elsa-Ledetsch-Weg 2<br />
        12683 Berlin
      </p>

      <h4 className="impressum__subline">Kontakt</h4>
      <p className="impressum__text">
        Telefon: +49 176 70680893
        <br />
        E-Mail: svoi.berlin@gmail.com
      </p>
    </div>
  );
}
