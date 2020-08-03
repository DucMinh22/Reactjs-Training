import React, { useState } from "react";
import { Input, Button } from "antd";
import { useTranslation } from "react-i18next";

export default function Login(props) {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const { onCancel } = props;
  const { t } = useTranslation('common');

  const isChange = (event) => {
    if (event.target.name === "username") {
      setName(event.target.value);
    } else {
      setPass(event.target.value);
    }
  };

  const onSummit = () => {
    localStorage.setItem("name", name);
    localStorage.setItem("role", name === 'admin' ? 'admin' : 'user');
    window.location.href = "/";
    setName("");
    setPass("");
    onCancel();
  };

  return (
    <div>
      {t(`username`)}:
      <Input
        name="username"
        value={name}
        onChange={(event) => isChange(event)}
      />
      {t(`password`)}:{" "}
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
        {t(`signIn`)}
      </Button>
    </div>
  );
}
