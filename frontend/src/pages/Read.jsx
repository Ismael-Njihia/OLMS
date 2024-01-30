import Header from "../components/Header"
import Layout from "../components/Layout"
import ReadOnlineSteps from "../components/ReadOnlineSteps"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { removeHours } from "../slices/HoursSlice"

const Read = () => {
  const hours = useSelector((state) => state.hours);
  const bookPdf = useSelector((state) => state.bookPdf);
  const stopTime = useSelector((state) => state.startTime);
  console.log(stopTime);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [timeRemaining, setTimeRemaining] = useState(stopTime - Math.floor(Date.now() / 1000));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => prevTime > 0 ? prevTime - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if(timeRemaining === 0){
      dispatch(removeHours());
    }
  }, [timeRemaining, dispatch]);
  

  useEffect(() => {
    if(!hours){
      navigate('/duration');
    }

    const checkTime = setInterval(() =>{
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      console.log('Current Time:', currentTimeInSeconds);

      if(currentTimeInSeconds >= stopTime){
        dispatch(removeHours());
        clearInterval(checkTime)
      }
    }, 1000);

    return () => clearInterval(checkTime);
  }, [hours, navigate, dispatch, stopTime])

  console.log(stopTime);

 
  return (
    <>
    <Header />
  
    <Layout>
    
    <div className="timeRemaining">
          {new Date(timeRemaining * 1000).toISOString().substr(11, 8)}
        </div>
        
    </Layout>
    </>
  )
}

export default Read