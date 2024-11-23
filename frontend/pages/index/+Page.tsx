import React from "react";
import {Example} from "/components/example/Example";

export default function Page() {
  return (
    <>
      <h1>My Vike app</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
          <Example/>
      </ul>
    </>
  );
}
