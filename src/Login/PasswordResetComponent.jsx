import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function PasswordResetComponent() {
  const params = useParams();
  useEffect(() => {
    console.log(params+" hereeeeeeeee");
  }, []);
  return <div>Hello from pw reset cmp! {params}</div>;
}

export default PasswordResetComponent;
