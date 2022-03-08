import React, { useEffect, useState } from 'react'
import { SubmitButton } from '../../components/CustomButton/CustomButton'
import axios from "axios";
import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

export default function index() {
    const [taxStation, setTaxStation] = useState([])
    const [department, setDepartment] = useState([])
    const [rhmGroups, setRhmGroups] = useState([])
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }, } = useForm()

    // let handleStationChange = (e) => {
    //     setTaxStation(e.target.value)
    //   }

    useEffect(() => {

        setAuthToken();
        const fetchPost = async () => {
            try {
                let res = await axios.get(`${url.BASE_URL}user/items`);
                let itemsBody = res.data.body
                let taxOffice = itemsBody.taxOffice
                let department = itemsBody.department
                let rhmGroups = itemsBody.rhmGroups
                setTaxStation(taxOffice)
                setDepartment(department)
                setRhmGroups(rhmGroups)

            } catch (e) {
                // setIsFetching(false);
            }
        };
        fetchPost();

    }, []);
    const options = rhmGroups.map(item => {
        return {
            label: item.role,
            value: item.id
        }
    })
    const onSubmit = (data) => console.log(data);

    const [selectedOption, setSelectedOption] = useState(null);
    console.log(selectedOption);

    return (
        <div>
            <div className="block p-6 rounded-lg bg-white w-full">
                <div className="flex justify-center mb-4">
                    <h6 className="p-2">Register Individual Taxpayer</h6>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="form-group ">
                            <p>Title</p>
                            <select name="title" ref={register()} className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                                <option value="mr">Mr</option>
                                <option value="mrs">Mrs</option>
                                <option value="mrss">Mrss</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <p>First name</p>
                            <input name="firstname" type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                placeholder="Enter Password" ref={register()}
                            />
                        </div>

                        <div className="form-group ">
                            <p>Middle name</p>
                            <input name="middlename" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>Surname</p>
                            <input name="Surname" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>Date of Birth</p>
                            <input name="dob" ref={register()} type="date" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>


                        <div className="form-group ">
                            <p>Phone Number</p>
                            <input name="number" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>Gender</p>
                            <select name="title" ref={register()} className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                                <option value="mr">Female</option>
                                <option value="mrs">Male</option>
                                <option value="mrss">Other</option>
                            </select>
                        </div>

                        <div className="form-group ">
                            <p>Marital Status</p>
                            <select name="maritalstatus" ref={register()} className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                                <option value="mr">Single</option>
                                <option value="mrs">Married</option>
                            </select>
                        </div>

                        <div className="form-group ">
                            <p>Nationality</p>
                            <select name="state" ref={register()} className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                                <option value="mr">Nigeria</option>
                                <option value="mrs">Fishery</option>
                            </select>
                        </div>
                        <div className="form-group ">
                            <p>State of Origin</p>
                            <select name="state" ref={register()} className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                                <option value="mr">Kogi</option>
                                <option value="mrs">Fishery</option>
                            </select>
                        </div>
                        <div className="form-group ">
                            <p>State of residence</p>
                            <select name="state_of_residence" ref={register()} className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                                <option value="mr">Kogi</option>
                                <option value="mrs">Fishery</option>
                            </select>
                        </div>
                        <div className="form-group ">
                            <p>Income Source</p>
                            <select name="income_source" ref={register()} className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                                <option value="mr">Kogi</option>
                                <option value="mrs">Fishery</option>
                            </select>
                        </div>

                        <div className="form-group ">
                            <p>Occupation</p>
                            <input name="occupation" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="form-group">
                            <p>Email</p>
                            <input name="email" ref={register()} type="email" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>BVN</p>
                            <input name="bvn" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>
                        <div className="form-group ">
                            <p>NIN</p>
                            <input name="nin" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>Birth Place</p>
                            <input name="birthplace" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>
                        <div className="form-group ">
                            <p>Mother's Name</p>
                            <input name="mothername" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>House no</p>
                            <input name="house" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>
                        <div className="form-group ">
                            <p>Street</p>
                            <input name="street" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>
                        <div className="form-group ">
                            <p>Ward</p>
                            <input name="ward" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>
                        <div className="form-group ">
                            <p>City</p>
                            <input name="city" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>LGA</p>
                            <select name="lga" ref={register()} className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                                <option value="mr">Kabba</option>
                                <option value="mrs">Anpka</option>
                            </select>
                        </div>
                        <div className="form-group ">
                            <p>Sector</p>
                            <select name="sector" ref={register()} className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                                <option value="mr">Agric</option>
                                <option value="mrs">Fishery</option>
                            </select>
                        </div>
                        <div className="form-group ">
                            <p>Category</p>
                            <select name="sector" ref={register()} className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                                <option value="mr">Agric</option>
                                <option value="mrs">Fishery</option>
                            </select>
                        </div>
                        <div className="form-group ">
                            <p>Employer TIN</p>
                            <input name="emptin" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500" />
                        </div>
                        <div className="form-group ">
                            <p>Employer's Name</p>
                            <input name="emp_name" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500" />
                        </div>
                        <div className="form-group ">
                            <p>Tax Office</p>
                            <select name="office" ref={register()} className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                                <option value="mr">Lokoja</option>
                                <option value="mrs">Fishery</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-6 flex justify-center">
                        <button
                            style={{ backgroundColor: "#84abeb" }}
                            className="btn btn-default text-white btn-outlined bg-transparent rounded-md"
                            type="submit"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
