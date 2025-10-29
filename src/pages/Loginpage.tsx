import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const COLORS = {
  BG_PAGE: '#FFFFFF',
  BG_CARD: '#4b5f82',
  LOGO_TEXT: '#610c1e',
  BUTTON: '#2c4166',
  BUTTON_HOVER: '#4b5f82',
  MANDATORY: '#330307',
  TEXT: '#2c4166',
  ACCENT_LINK: '#b01045',
};

interface LoginAPIData {
  username: string;
  password: string;
  rememberMe?: boolean;
}

// ✅ Connect frontend login to backend
const login = async (data: LoginAPIData) => {
  const response = await fetch('http://localhost:9096/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: data.username, // username is actually email from signup
      password: data.password,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Invalid username or password.');
  }
  return response.text();
};

const Spinner: React.FC = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
      5.291A7.962 7.962 0 014 12H0c0 
      3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginAPIData>({
    username: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSignUp = () => navigate('/signup');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.username || !formData.password) {
      setError('Please enter both username and password.');
      setLoading(false);
      return;
    }

    try {
      // ✅ connect to backend validation
      const result = await login(formData);
      console.log(result);
      alert('Login Successful!');
      navigate('/dashboard');
    } catch (err: unknown) {
      let errorMessage = 'Login failed.';
      if (typeof err === 'object' && err !== null && 'message' in err) {
        errorMessage = (err as { message: string }).message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    marginBottom: '16px',
    borderRadius: '12px',
    border: `1px solid ${COLORS.MANDATORY}`,
    backgroundColor: 'rgba(255,255,255,0.9)',
    color: COLORS.MANDATORY,
    fontSize: '14px',
    boxSizing: 'border-box',
  };

  const buttonStyle: React.CSSProperties = {
    ...inputStyle,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BUTTON,
    color: 'white',
    fontWeight: 'bold',
    cursor: loading ? 'not-allowed' : 'pointer',
    marginBottom: '0',
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: COLORS.BG_PAGE }}
    >
      <div
        className="w-full max-w-sm flex flex-col items-center relative"
        style={{
          backgroundColor: COLORS.BG_CARD,
          borderRadius: '30px',
          border: `1px solid ${COLORS.MANDATORY}`,
          boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
          padding: '70px 30px 40px',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '65px',
            height: '65px',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '15px',
            position: 'absolute',
            top: '25px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <img
            src="Invenza.png"
            alt="Logo"
            style={{ width: '90px', height: '100px', objectFit: 'contain' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src =
                'https://placehold.co/40x40/FFFFFF/610c1e?text=Logo';
            }}
          />
        </div>

        <h1
          className="font-bold mb-4 mt-16"
          style={{ color: COLORS.LOGO_TEXT, fontSize: '24px' }}
        >
          Login
        </h1>

        <form onSubmit={handleSubmit} className="w-full flex flex-col">
          {(['username', 'password'] as (keyof LoginAPIData)[]).map((field) => (
            <div key={field} className="flex flex-col mb-4">
              <label
                htmlFor={field}
                style={{
                  color: COLORS.MANDATORY,
                  marginBottom: '6px',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                id={field}
                name={field}
                type={field.includes('password') ? 'password' : 'text'}
                value={formData[field] as string}
                onChange={handleChange}
                placeholder={`Enter your ${
                  field.charAt(0).toUpperCase() + field.slice(1)
                }`}
                style={inputStyle}
                disabled={loading}
                required
              />
            </div>
          ))}

          <div className="flex justify-between items-center mb-4 w-full">
            <label
              className="flex items-center text-sm"
              style={{ color: COLORS.MANDATORY }}
            >
              <input
                type="checkbox"
                checked={formData.rememberMe || false}
                onChange={(e) =>
                  setFormData({ ...formData, rememberMe: e.target.checked })
                }
                className="mr-2"
                disabled={loading}
              />
              Remember Me
            </label>

            <span
              onClick={() => navigate('/forgot-password')}
              className="text-sm font-semibold hover:underline cursor-pointer"
              style={{ color: COLORS.ACCENT_LINK, marginLeft: '20px' }}
            >
              Forgot Password?
            </span>
          </div>

          {error && (
            <div className="w-full p-2 rounded-md text-red-700 bg-red-50 text-center mb-4">
              {error}
            </div>
          )}

          <div style={{ margin: '16px 0' }}>
            <button type="submit" style={buttonStyle} disabled={loading}>
              {loading ? <Spinner /> : 'Login'}
            </button>
          </div>
        </form>

        <div className="text-center mt-6 text-sm">
          <span className="text-black opacity-90 mr-1">
            Don't have an account?
          </span>
          <span
            onClick={handleSignUp}
            className="font-bold hover:underline cursor-pointer"
            style={{ color: COLORS.ACCENT_LINK }}
          >
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;




