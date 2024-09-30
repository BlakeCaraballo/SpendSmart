import Charts from "./component/chart/Chart"
import UserChart from "./component/chart/UserChart";
import Form from "./component/form/Form"
import Hero from "./component/hero/Hero"
import History from "./component/history/History";
import NavBar from "./component/nav/NavBar"
import React, { useState } from 'react';



function App() {
  const [userData, setUserData] = useState(null);

  const handleFormSubmit = (data: any) => {
    setUserData(data);
  };

  return (
    <>
      <NavBar/>
      <Hero/>
      <Charts/>
      <Form onSubmit={handleFormSubmit} />
      {userData && <UserChart data={userData} />}
      <History/>
    </>
  )
}

export default App
