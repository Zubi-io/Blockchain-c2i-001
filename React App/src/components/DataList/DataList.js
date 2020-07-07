import React, { useState } from "react";
import { Alert } from "reactstrap";
import styles from "./DataList.module.css";

const DataList = (props) => {
  const [selected, setSelected] = useState();

  const listDisplay = () =>
    props.dataList.map((item, index) => (
      <div
        className={styles.alertWrapper}
        onClick={() => {
          setSelected(index);
        }}
      >
        <Alert
          color={selected === index || item.completed ? "danger" : "primary"}
        >
          {item.title}
        </Alert>
      </div>
    ));

  return (
    <div className={styles.container}>
      <div>{listDisplay()} </div>
    </div>
  );
};

export default DataList;
