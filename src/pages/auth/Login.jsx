import { useEffect } from 'react';
import Form from '../../components/shared/Form/Form';
import { useSelector } from 'react-redux';
import { DNA } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

const Login = () => {
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
        <div className="auth-form-section">
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
              <i className="fa-solid fa-droplet" style={{ fontSize: '36px', color: 'white' }}></i>
            </div>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to continue to Blood Bank</p>
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
            <Form formTitle={"Sign In"} submitBtn={"Login"} formType={'login'} />
          )}
        </div>

        <div className="auth-image-section">
          <div style={{ textAlign: 'center', zIndex: 1, padding: '40px' }}>
            <i className="fa-solid fa-heart-pulse" style={{ fontSize: '80px', color: 'white', marginBottom: '20px', display: 'block' }}></i>
            <h2 style={{ color: 'white', fontSize: '28px', fontWeight: '700', marginBottom: '15px' }}>
              Donate Blood, Save Lives
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', lineHeight: '1.8' }}>
              Join our mission to ensure safe blood supply for everyone in need.
              Every drop counts!
            </p>
            <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: '700', color: 'white' }}>1000+</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>Donors</div>
              </div>
              <div style={{ width: '1px', background: 'rgba(255,255,255,0.3)' }}></div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: '700', color: 'white' }}>500+</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>Lives Saved</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
