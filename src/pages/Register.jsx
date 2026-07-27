import Button from '../components/Button.jsx';
import InputField from '../components/InputField.jsx';
import PasswordField from '../components/PasswordField.jsx';

export default function Register() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Register</h2>
        <p className="mt-2 text-sm text-slate-500">Create your StudyFlow account.</p>
      </div>
      <div className="space-y-4">
        <InputField id="name" label="Name" placeholder="Your name" />
        <InputField id="email" label="Email" type="email" placeholder="you@example.com" />
        <PasswordField id="password" label="Password" placeholder="Create a password" />
        <Button className="w-full">Register</Button>
      </div>
    </div>
  );
}
