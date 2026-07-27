import Button from '../components/Button.jsx';
import InputField from '../components/InputField.jsx';
import PasswordField from '../components/PasswordField.jsx';

export default function Login() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Login</h2>
        <p className="mt-2 text-sm text-slate-500">Access your StudyFlow workspace.</p>
      </div>
      <div className="space-y-4">
        <InputField id="email" label="Email" type="email" placeholder="you@example.com" />
        <PasswordField id="password" label="Password" placeholder="Enter your password" />
        <Button className="w-full">Login</Button>
      </div>
    </div>
  );
}
