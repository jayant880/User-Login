import { AlertCircle, CheckCircle, EyeOff, User, Lock, Eye } from 'lucide-react';
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';

const UserForm = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [usernameError, setUsernameError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        setUsernameError('');
        setPasswordError('');
        const usernameErrors: string[] = [];
        const passwordErrors: string[] = [];

        if (username && username.length < 4)
            usernameErrors.push('Username must be at least 4 characters');
        if (password && password.length < 6)
            passwordErrors.push('Password must be at least 6 characters');
        if (password && !(/[^a-zA-Z0-9\s]/.test(password)))
            passwordErrors.push('Password must include a special character');

        setUsernameError(usernameErrors.join('. '));
        setPasswordError(passwordErrors.join('. '));

        if (usernameErrors.length !== 0 || passwordErrors.length !== 0) setError(true);
        else setError(false);
    }, [username, password]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (!username.trim()) {
            setUsernameError('Username is Required');
            setError(true);
            return;
        }

        if (!password.trim()) {
            setPasswordError('Password is required');
            setError(true);
            return;
        }

        if (!error) {
            setIsSubmitting(true);
            setTimeout(() => {
                console.log(username, password);
                setSuccess('Login successful!');
                setIsSubmitting(false);

                setTimeout(() => {
                    setSuccess('');
                }, 3000);
            }, 1500);
        }
    }

    const getInputBorderClass = (fieldError: string, fieldValue: string) => {
        if (!fieldValue) return 'border-gray-300 focus:border-blue-500';
        if (fieldError) return 'border-red-400 focus:border-red:500';
        return 'border-green-400 focus:border-green-500';
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center p-4'>
            <div className='w-full max-w-md'>
                {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2 duration-300">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-green-800 font-medium">{success}</span>
                    </div>
                )}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                    <div className="text-center mb-8">
                        <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                            < User className='w-8 h-8 text-white' />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                        <p className="text-gray-600">Please sign in to your account</p>
                    </div>
                    <div className='space-y-6'>
                        <div className="space-y-2">
                            <label
                                htmlFor="username"
                                className='text-sm font-semibold text-gray-700 flex items-center gap-2'
                            >
                                <User className='w-4 h-4' />
                                Username
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id='username'
                                    value={username}
                                    name='username'
                                    placeholder='Enter your Username'
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                                    className={`w-full px-4 py-3 text-base border-2 rounded-xl bg-gray-50 focus:outline-none transition-all duration-200 ${getInputBorderClass(usernameError, username)}`}
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    {username && !usernameError && (
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                    )}
                                    {usernameError && (
                                        <AlertCircle className="w-5 h-5 text-red-500" />
                                    )}
                                </div>
                            </div>
                            {usernameError && (
                                <div className='flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded-lg '>
                                    <AlertCircle className='w-4 h-4' /> {usernameError}
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Lock className="w-4 h-4" />
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    name="password"
                                    placeholder="Enter your password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full px-4 py-3 pr-12 text-base border-2 rounded-xl bg-gray-50 focus:bg-white focus:outline-none transition-all duration-200 ${getInputBorderClass(passwordError, password)}`}
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                                    <div className="w-5 h-5 flex items-center justify-center">
                                        {password && !passwordError && (
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                        )}
                                        {passwordError && (
                                            <AlertCircle className="w-5 h-5 text-red-500" />
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-500 hover:text-gray-700 transition-colors p-1"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                            {passwordError && (
                                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded-lg">
                                    <AlertCircle className="w-4 h-4" />
                                    {passwordError}
                                </div>
                            )}
                        </div>

                        {password && (
                            <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
                                <p className="font-medium mb-2">Password requirements:</p>
                                <div className="space-y-1">
                                    <div className={`flex items-center gap-2 ${password.length >= 6 ? 'text-green-600' : 'text-gray-500'}`}>
                                        <div className={`w-2 h-2 rounded-full ${password.length >= 6 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                        At least 6 characters
                                    </div>
                                    <div className={`flex items-center gap-2 ${/[^a-zA-Z0-9\s]/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                                        <div className={`w-2 h-2 rounded-full ${/[^a-zA-Z0-9\s]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                        Include special character
                                    </div>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={handleSubmit}
                            disabled={error || isSubmitting || !username || !password}
                            className={`w-full py-3 px-4 text-base font-semibold rounded-xl transition-all duration-200 ${error || isSubmitting || !username || !password
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                                }`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center gap-3">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Signing in...
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <button className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors">
                                Sign up here
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserForm