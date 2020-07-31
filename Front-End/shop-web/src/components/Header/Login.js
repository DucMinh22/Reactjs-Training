import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";

export default function Login(props) {
  const [data, setData] = useState([]);
  const [inputValue, setinputValue] = useState({ username: "", password: "" });
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const { onCancel } = props;

  const isChange = (event) => {
    // const newArray = [data].push(value);
    // setData(newArray);
    if (event.target.name === "username") {
      setName(event.target.value);
    } else {
      setPass(event.target.value);
    }
    // console.log(name);
    // console.log(value);
  };

  const onSummit = () => {
    console.log("name :>> ", name);
    console.log("pass :>> ", pass);
    localStorage.setItem("name", name);
    setName("");
    setPass("");
    onCancel();
  };
  return (
    <div>
      Username:
      <Input
        name="username"
        value={name}
        onChange={(event) => isChange(event)}
      />
      Password:{" "}
      <Input.Password
        value={pass}
        name="password"
        onChange={(event) => isChange(event)}
      />
      <Button
        style={{
          marginTop: "20px",
        }}
        onClick={onSummit}
        type="primary"
      >
        Submit
      </Button>
    </div>
  );
}
