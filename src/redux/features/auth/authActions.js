import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import toast from 'react-hot-toast';

export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ role, email, password }, { rejectWithValue }) => {
        try {
            const { data } = await API.post('/auth/login', { role, email, password });
            if (data.success) {
                localStorage.setItem('token', data.token);
                toast.success(data.message);
                // Return data with success flag - navigation handled in component
                return { ...data, shouldNavigate: true };
            }
            return data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

export const userRegister = createAsyncThunk(
    'auth/register',
    async ({
        name,
        role,
        email,
        password,
        organisationName,
        hospitalName,
        website,
        address,
        phone
    }, { rejectWithValue }) => {
        try {
            const { data } = await API.post('/auth/register', {
                name,
                role,
                email,
                password,
                organisationName,
                hospitalName,
                website,
                address,
                phone
            });

            if (data.success) {
                toast.success(data.message);
                return { ...data, shouldNavigate: true };
            } else {
                toast.error(data.message);
            }
            return data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await API.get('/auth/current-user');
            if (data?.success) {
                return data;
            }
            return rejectWithValue('Failed to get user');
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return rejectWithValue(message);
        }
    }
);
