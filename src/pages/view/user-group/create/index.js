import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const index = () => {
    const [groupName, setGroupName] = useState('')
    const [role, setRole] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    async function handleSubmit(event) {
        event.preventDefault()
        setIsSubmitting(true)
        // handle form submission here

        try {
            const response = await fetch('https://bespoque.dev/rhm/new-usergroups.php', {
                method: 'POST',
                body: JSON.stringify({ "groupname": groupName, "role": role })
            })

            const data = await response.json()
            console.log('Server Response:', data)
            // handle success
            toast.success("Created Successfully!");
            router.push('/view/user-group/list')
        } catch (error) {
            console.error('Server Error:', error)
            // handle error
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <ToastContainer />
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="groupName">
                        Group Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="groupName"
                        type="text"
                        required
                        placeholder="Enter group name"
                        value={groupName}
                        onChange={(event) => setGroupName(event.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="role">
                        Role
                    </label>
                    <input
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="role"
                        type="text"
                        placeholder="Enter role"
                        value={role}
                        onChange={(event) => setRole(event.target.value)}
                    />
                </div>
                {/* <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit
                    </button>
                </div> */}
                <div className="flex items-center justify-between">
                    <button
                        className={`${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
                            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    )
}
export default index