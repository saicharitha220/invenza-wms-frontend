

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const COLORS = {
  BG_PAGE: '#FFFFFF',
  BG_CARD: '#FFFFFF',
  LOGO_TEXT: '#610c1e',
  BUTTON: '#2c4166',
  MANDATORY: '#330307',
  TEXT: '#415982',
  ACCENT_LINK: '#b01045',
};

interface SignupAPIData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Mock signup function
const signup = async (data: SignupAPIData) => {
  console.log('API Submission Data:', data);
  return new Promise<void>((resolve) => setTimeout(resolve, 1500));
};

const Spinner: React.FC = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupAPIData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
    setSuccessMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill all fields.');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      await signup(formData);
      setSuccessMessage('Account created successfully!');
      setFormData({ username: '', email: '', password: '', confirmPassword: '' });
      
      // Redirect to login after showing success
      setTimeout(() => navigate('/'), 1500);
    } catch {
      setError('Signup failed. Try again.');
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
    margin: '16px 0',
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: COLORS.BG_PAGE }}>
      <div
        className="w-full max-w-sm flex flex-col items-center"
        style={{
          backgroundColor: COLORS.BG_CARD,
          borderRadius: '30px',
          border: `1px solid ${COLORS.MANDATORY}`,
          boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
          padding: '40px 30px',
        }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-4 w-full" style={{ height: '90px' }}>
          <img
            src="Invenza.png"
            alt="Invenza Logo"
            style={{ maxWidth: '80px', maxHeight: '80px', objectFit: 'contain' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = 'https://placehold.co/80x80/FFFFFF/610c1e?text=INVENZA';
            }}
          />
        </div>

        {/* Heading */}
        <h1 className="font-bold mb-2" style={{ color: COLORS.TEXT, fontSize: '24px' }}>Sign Up</h1>
        <p className="mb-6" style={{ color: COLORS.TEXT, opacity: 0.8, fontSize: '14px' }}>Create your account</p>

        {/* Error / Success */}
        {error && <div className="w-full p-2 rounded-md text-center mb-2" style={{ color: COLORS.MANDATORY, border: `1px solid ${COLORS.MANDATORY}`, backgroundColor: '#f8d7da' }}>{error}</div>}
        {successMessage && <div className="w-full p-2 rounded-md text-center mb-2" style={{ color: 'green', border: `1px solid green`, backgroundColor: '#d4edda' }}>{successMessage}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col">
          {(['username','email','password','confirmPassword'] as (keyof SignupAPIData)[]).map((field) => (
            <div key={field} className="flex flex-col mb-4">
              <label htmlFor={field} style={{ color: COLORS.MANDATORY, marginBottom: '6px', fontSize: '14px', fontWeight: 500 }}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                id={field}
                name={field}
                type={field.includes('password') ? 'password' : 'text'}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Enter your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                style={inputStyle}
                disabled={loading}
                required
              />
            </div>
          ))}

          {/* Submit Button */}
          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? <Spinner /> : 'Sign Up'}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-4 text-sm">
          <span style={{ color: COLORS.TEXT, marginRight: '4px' }}>Already have an account?</span>
          <span
            onClick={() => navigate('/')}
            className="font-bold hover:underline cursor-pointer"
            style={{ color: COLORS.ACCENT_LINK }}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;



