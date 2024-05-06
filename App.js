import React from "react";
import { useEffect } from "react";
import {useState} from "react";
import { apiUrl, filterData} from "./data";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import {toast} from "react-toastify";
import Spinner from "./components/Spinner";


const App = () => {

  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true); // ye loading wala spinner ke liye hai
  const [category, setCategory] = useState(filterData[0].title);
    async function fetchData() {
      setLoading(true); //jabtak data nhi aajata tab tak loading wala spinner dikhana hai
      try{
        let response = await fetch(apiUrl); //api call larke outpout naam ka variable mai answer store kara liya hai
        let output = await response.json();
        setCourses(output.data);
      }

      catch(error){
        toast.error("Something went wrong");

      }
      setLoading(false); // jaise hi data aajayega toh loading wala spinner chala jayega
    }
    
    useEffect(() =>{
      fetchData();
    },[])
  
  return (
    <div className="min-h-screen flex flex-col bg-bgDark2">
      <div>
        <Navbar/>
      </div>

      <div className="bg-bgDark2">
      <div>
        <Filter filterData={filterData}
        category={category}
        setCategory={setCategory}
        />
      </div>

      <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
        
         {loading ? (<Spinner/>) : (<Cards courses={courses} category={category}/> )}
        
      </div>
      </div>
    </div>
  );
};

export default App;
