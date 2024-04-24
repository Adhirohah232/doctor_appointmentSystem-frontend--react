import axios from 'axios'
import { useState } from 'react';

function App() {
  
  const [doctors, setdoctors] = useState([]);
  async function listdoctors (){
    // console.log('button is working fine');
     const result =await axios.get('https://doctors-appointment-api-server.onrender.com/dummydata');
     setdoctors(result.data);
     
    //  console.log(resultdata);
  }
  const handlecheck = (t) => {
    const updatedDoctors = doctors.map((doctor) =>
      doctor.name === t.name
        ? { ...doctor, available_slots: doctor.available_slots + 1 }
        : doctor
    );
  
    const nameobj = { name: t.name };
  
    if (localStorage.getItem("doctordata") === null) {
      localStorage.setItem("doctordata", JSON.stringify(nameobj));
    } else {
      localStorage.clear();
      localStorage.setItem("doctordata", JSON.stringify(nameobj));
    }
  
    setdoctors(updatedDoctors);
  };
  
 
  return (
    <div className="App">
      <header className="App-header">
      <h1>Onepiece Hospital</h1>
      <p>check the list of doctors availble for booking</p>
      <p>NOTE: max of 10 slots are avaible to each of the doctors</p>
      <button onClick={listdoctors}>get_doctors</button>
      {/* <button onClick={check}> checklist</button> */}
      <div>
        <ul>
        {doctors.map((t) => (
  <li style={{ padding: "0.5em" }}>
    NAME: {t.name} <br />
    AVAILABILITY: {t.availabilityHour} <br />
   ABOUT:{t.dr_description}  <br />
    SLOTS filled: {t.available_slots}{" "}
    {t.available_slots < 10 ? (
      <>
        <p>Schedule an appointment?</p>
        <button onClick={()=> handlecheck(t)}>Book</button>
      </>
    ) : (
      <p style={{color:'red'}}>Slot is full</p>
    )}
  </li>
))}

          
        
        </ul>
      </div>
      </header>
    </div>
  );
}

export default App;
