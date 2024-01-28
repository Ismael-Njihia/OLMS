import Header from "../components/Header"
import Layout from "../components/Layout"
import ReadOnlineSteps from "../components/ReadOnlineSteps"

const Read = () => {
  return (
    <>
    <Header />
  
    <Layout>
    <ReadOnlineSteps step1 step2 step3 step4/>
        <h1>Read Now</h1>
    </Layout>
    </>
  )
}

export default Read