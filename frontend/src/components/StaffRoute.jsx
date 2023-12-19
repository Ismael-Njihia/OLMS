import {Outlet, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

const StaffRoute = () => {
        
    const {userInfo} = useSelector(state => state.auth);
    return userInfo && userInfo.user_type.toLowerCase() === 'staff' ? <Outlet /> : <Navigate to='/' replace/>;
}

export default StaffRoute