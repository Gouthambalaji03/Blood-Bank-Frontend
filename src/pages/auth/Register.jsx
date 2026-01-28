import { useEffect } from 'react';
import Form from '../../components/shared/Form/Form';
import { useSelector } from 'react-redux';
import { DNA } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-form-section" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
          <div className="logo-container">
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #e63946 0%, #c1121f 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px',
              boxShadow: '0 8px 25px rgba(230, 57, 70, 0.3)'
            }}>
              <i className="fa-solid fa-user-plus" style={{ fontSize: '32px', color: 'white' }}></i>
            </div>
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join our blood donation community</p>
          </div>

          {loading ? (
            <div className="loading-container" style={{ minHeight: '200px' }}>
              <DNA
                visible={true}
                height="120"
                width="120"
                ariaLabel="dna-loading"
                wrapperClass="dna-wrapper"
              />
            </div>
          ) : (
            <Form formTitle={"Register"} submitBtn={"Create Account"} formType={'register'} />
          )}
        </div>

        <div className="auth-image-section">
          <div style={{ textAlign: 'center', zIndex: 1, padding: '40px' }}>
            <i className="fa-solid fa-hand-holding-heart" style={{ fontSize: '80px', color: 'white', marginBottom: '20px', display: 'block' }}></i>
            <h2 style={{ color: 'white', fontSize: '28px', fontWeight: '700', marginBottom: '15px' }}>
              Be a Hero Today
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', lineHeight: '1.8' }}>
              Register as a donor, hospital, or organization.
              Together, we can make a difference in saving lives!
            </p>
            <div style={{ marginTop: '30px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '15px',
                background: 'rgba(255,255,255,0.1)',
                padding: '12px 20px',
                borderRadius: '10px'
              }}>
                <i className="fa-solid fa-check-circle" style={{ color: '#4ade80', marginRight: '12px', fontSize: '18px' }}></i>
                <span style={{ color: 'white', fontSize: '14px' }}>Easy registration process</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '15px',
                background: 'rgba(255,255,255,0.1)',
                padding: '12px 20px',
                borderRadius: '10px'
              }}>
                <i className="fa-solid fa-check-circle" style={{ color: '#4ade80', marginRight: '12px', fontSize: '18px' }}></i>
                <span style={{ color: 'white', fontSize: '14px' }}>Track your donations</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.1)',
                padding: '12px 20px',
                borderRadius: '10px'
              }}>
                <i className="fa-solid fa-check-circle" style={{ color: '#4ade80', marginRight: '12px', fontSize: '18px' }}></i>
                <span style={{ color: 'white', fontSize: '14px' }}>Connect with hospitals</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
