import React from "react";

export default function Footer(props) {
  return (
    <footer className="footer">
      <ul>
        <img
          src="https://s2.svgbox.net/hero-outline.svg?ic=chevron-double-right&color=000000"
          alt=""
          width="32"
          height="32"
        />
        <b>Creators:&nbsp;</b>
        <li>
          <a href="https://github.com/zivserphos">Ziv</a>
        </li>
        <li>
          <a href="https://github.com/DimaTomilin">Dima</a>
        </li>
        <li>
          <a href="https://github.com/sagigolan8">Sagi</a>
        </li>
        <li>
          <a href="https://github.com/ArnonAsquira">Arnon</a>
        </li>
        <img
          src="https://s2.svgbox.net/hero-outline.svg?ic=chevron-double-left&color=000000"
          alt=""
          width="32"
          height="32"
        />
      </ul>
    </footer>
  );
}
