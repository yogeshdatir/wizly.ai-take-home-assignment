import { useState } from 'react';
import { login } from '../api/auth';
import { useNavigate } from 'react-router';
import Spinner from '../components/Spinner';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = await login(email, password);

      const decoded = JSON.parse(atob(token)); // decode base64
      const role = decoded?.role;

      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/chat');
      }
    } catch {
      setError('Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-black">
      <form
        onSubmit={handleSubmit}
        className="w-80 space-y-4 bg-white p-6 rounded shadow"
      >
        <h2 className="text-xl font-semibold text-center">Login</h2>

        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded p-2"
        />

        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded p-2"
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded flex items-center justify-center cursor-pointer disabled:cursor-progress"
        >
          {loading ? <Spinner /> : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
