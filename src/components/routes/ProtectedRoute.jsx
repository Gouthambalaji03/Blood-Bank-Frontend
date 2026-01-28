import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../../redux/features/auth/authActions';

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token && !user) {
            dispatch(getCurrentUser());
        }
    }, [dispatch, token, user]);

    if (!token) {
        return <Navigate to='/login' replace />;
    }

    return children;
};

export default ProtectedRoute;
