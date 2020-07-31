import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default function Login(props) {
  const [data, setData] = useState([]);
  const [inputValue, setinputValue] = useState({ username: "", password: "" });
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const history = useHistory();
  const { onCancel } = props;

  const isChange = (event) => {
    if (event.target.name === "username") {
      setName(event.target.value);
    } else {
      setPass(event.target.value);
    }
  };
  // const handleNavigateAdmin = () => {
  //   history.push({
  //     pathname: `/admin`,
  //     state: {},
  //   });
  // };
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
      <Link to="/admin">
        <Button
          style={{
            marginTop: "20px",
          }}
          onClick={onSummit}
          type="primary"
        >
          Submit
        </Button>
      </Link>
    </div>
  );
}
