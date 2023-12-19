import {Outlet, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

const AdminRoute = () => {
    
    const {userInfo} = useSelector(state => state.auth);
  return userInfo && userInfo.user_type.toLowerCase() === 'admin' ? <Outlet /> : <Navigate to='/' replace/>;
}

export default AdminRoute