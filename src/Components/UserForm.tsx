import { useState, type FormEvent } from 'react';
const UserForm = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        console.log(username, password)
    }
    return (
        <div className='max-w-2xl'>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    <div className='border rounded-2xl m-2 px-4 py-2 bg-gray-100 flex items-center'>
                        <label
                            htmlFor="username"
                            className='text-lg '
                        >Username :</label>
                        <input
                            type="text"
                            value={username}
                            name='username'
                            placeholder='Enter Username'
                            onChange={e => setUsername(e.target.value)}
                            className='px-3 m-2 py-2 text-xl border-none focus:outline-blue-300 flex-1 focus:outline-2 rounded'
                        />
                    </div>
                    <div className='border rounded-2xl m-2 px-4 py-2 bg-gray-100 flex items-center'>
                        <label
                            htmlFor="password"
                            className='text-lg '
                        >Password :</label>
                        <input
                            type="password"
                            value={password}
                            name='password'
                            placeholder='Enter Password'
                            onChange={e => setUsername(e.target.value)}
                            className='px-3 m-2 py-2 text-xl border-none bg-white focus:outline-blue-300 flex-1 focus:outline-2 rounded'
                        />
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