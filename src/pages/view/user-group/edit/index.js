import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const index = () => {
    const [groupName, setGroupName] = useState('')
    const [role, setRole] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()
    const { id } = router.query;
    const [userGroupData, setUserGroupData] = useState([]);

    async function handleSubmit(event) {
        event.preventDefault()
        setIsSubmitting(true)
        // handle form submission here

        try {
            const response = await fetch('https://bespoque.dev/rhm/update-usergroups.php', {
                method: 'POST',
                body: JSON.stringify({ "groupname": groupName, "role": role, "id": userGroupData.id })
            })
            const data = await response.json()
            // console.log('Server Response:', data)
            toast.success(data.message);
            router.push('/view/user-group/list')
        } catch (error) {
            console.error('Server Error:', error)
        } finally {
            setIsSubmitting(false)
        }
    }
    useEffect(() => {
        async function fetchUserGroupData() {
            try {
                const response = await fetch(`https://bespoque.dev/rhm/get-usergroup-single.php`, {
                    method: 'POST',
                    body: JSON.stringify({ "id": id })
                });
                const data = await response.json();
                setUserGroupData(data.body[0]);
                setGroupName(data.body[0].groupname);
                setRole(data.body[0].role);
            } catch (error) {
                console.error(error);
            }
        }

        if (id) {
            fetchUserGroupData();
        }
    }, [id]);

    return (
        <>
            <ToastContainer />
            {/* <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                        // value={groupName}
                        defaultValue={groupName}
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
                        defaultValue={role}
                        placeholder="Enter role"
                        onChange={(event) => setRole(event.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className={`${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
                            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Update'}
                    </button>
                </div>
            </form> */}
            <form onSubmit={handleSubmit} >
                <div class="flex flex-wrap justify-center items-center">
                    <div class="w-full sm:w-auto max-w-sm">
                        <input type="text" className="w-full py-2 px-4 rounded-md border border-gray-300"
                            required
                            id="groupName"
                            placeholder="Enter group name"
                            defaultValue={groupName}
                            onChange={(event) => setGroupName(event.target.value)}
                        />
                    </div>
                    <div class="w-full sm:w-auto max-w-sm mt-4 sm:mt-0 ml-0 sm:ml-4">
                        <input type="text" class="w-full py-2 px-4 rounded-md border border-gray-300"
                            required
                            id="role"
                            placeholder="Enter role"
                            defaultValue={role}
                            onChange={(event) => setRole(event.target.value)}
                        />
                    </div>
                    <div class="mt-4 sm:mt-0 ml-4">
                        <button
                            className={`${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-400 hover:bg-blue-700'
                                } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Update'}
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}
export default index