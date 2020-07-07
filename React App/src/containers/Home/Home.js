import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import DataList from "../../components/DataList/DataList";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const result = await axios("https://jsonplaceholder.typicode.com/todos/");
    setData(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <DataList dataList={data} />
      </div>
    </div>
  );
};

export default Home;
