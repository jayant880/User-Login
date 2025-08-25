import { useEffect, useState, type FormEvent } from 'react';

const UserForm = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [usernameError, setUsernameError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [sucess, setSucess] = useState<string>('');

    useEffect(() => {
        setUsernameError('');
        setPasswordError('');
        const usernameErrors: string[] = [];
        const passwordErrors: string[] = [];
        if (username === '') { usernameErrors.push('Username cannot be empty'); }
        if (username.length < 4) { usernameErrors.push('Username cannot be less than 4 character'); }
        if (password === '') { passwordErrors.push('Password cannot be empty'); }
        if (password.length < 6) { passwordErrors.push('password should be greater than 6 charcter'); }
        if (!(/[^a-zA-Z0-9\s]/.test(password))) { passwordErrors.push('password should include special symbol'); }
        setUsernameError(usernameErrors.join(' / '));
        setPasswordError(passwordErrors.join(' / '));
        if (usernameErrors.length !== 0 || passwordErrors.length !== 0) setError(true)
        else {
            setError(false)
            setSucess('');
        }
    }, [username, password])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (!error) {
            console.log(username, password);
            setSucess('Login Successful');
        }
    }
    return (
        <div className='max-w-2xl'>
            {sucess.length > 0 &&
                <span className='absolute top-3 right-1.5 border-2 rounded-2xl px-4 py-3 m-4 text-3xl bg-green-500 text-white font-bold animate-bounce'>{sucess}</span>
            }
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    <div className='border rounded-2xl m-2 px-4 py-2 bg-gray-100'>
                        <div className='flex items-center'>
                            <label
                                htmlFor="username"
                                className='text-lg font-bold'
                            >Username :</label>
                            <input
                                type="text"
                                value={username}
                                name='username'
                                placeholder='Enter Username'
                                onChange={e => setUsername(e.target.value)}
                                className={`px-3 m-2 py-2 text-xl bg-white border-2 focus:outline-blue-300 flex-1 focus:outline-2 rounded-xl ${usernameError === '' ? 'border-green-500' : 'border-red-500'}`}
                            />
                        </div>
                        <span className='text-xl text-red-500 flex flex-1 justify-center bg-amber-100 rounded capitalize'>{usernameError}</span>
                    </div>
                    <div className='border rounded-2xl m-2 px-4 py-2 bg-gray-100'>
                        <div className="flex items-center">
                            <label
                                htmlFor="password"
                                className='text-lg font-bold'
                            >Password : </label>
                            <input
                                type="password"
                                value={password}
                                name='password'
                                placeholder='Enter Password'
                                onChange={e => setPassword(e.target.value)}
                                className={`px-3 m-2 py-2 text-xl bg-white border-2 focus:outline-blue-300 flex-1 focus:outline-2 rounded-xl ${passwordError === '' ? 'border-green-500' : 'border-red-500'}`}
                            />
                        </div>
                        <span className='text-xl text-red-500 flex flex-1 justify-center bg-amber-100 rounded capitalize'>{passwordError}</span>
                    </div>
                    <div className='flex items-center'>
                        <button
                            type='submit'
                            className='px-4 py-2 m-2 text-2xl bg-blue-500 flex-1 rounded-full text-white border-2 border-white hover:bg-blue-600'
                        >Login</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UserForm