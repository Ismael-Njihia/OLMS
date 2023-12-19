import {Outlet, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

const StaffRoute = () => {
        
    const {userInfo} = useSelector(state => state.auth);
    console.log(userInfo.user_type);
    return userInfo && userInfo.user_type.toLowerCase() === 'staff' ? <Outlet /> : <Navigate to='/' replace/>;
}

export default StaffRoute