
import LeftSide from './LeftSide'
import '../assets/Layout.css'

const Layout = ({ children }) => {
  return (
    <div className='layout'>
        <LeftSide />
        <div className='content'>
            {children}
        </div>

    </div>
  )
}

export default Layout