import React, { useEffect, useState } from 'react'

import axios from "axios";
import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import { Controller, useForm } from 'react-hook-form';
import { MultiSelect } from "react-multi-select-component";
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
                    <h6 className="p-2">Register User</h6>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group ">
                            <p>Full name</p>
                            <input type="text" name="name" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                placeholder="Enter Full name" ref={register()}
                            />
                        </div>

                        <div className="form-group">
                            <p>Password</p>
                            <input name="password" type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                                placeholder="Enter Password" ref={register()}
                            />
                        </div>

                        <div className="form-group ">
                            <p>Department</p>
                            <select name="department" ref={register()} className="form-control SlectBox mb-4 w-full rounded font-light text-gray-500">
                                {department.map((dept) => <option key={dept.id} value={dept.name}>{dept.name}</option>)}
                            </select>
                        </div>

                        <div className="form-group ">
                            <p>Tax Station</p>
                            <select ref={register()} name="station" class="form-control mb-4 SlectBox w-full rounded font-light text-gray-500" id="taxStation">
                                {taxStation.map((office) => <option key={office.idstation} value={office.station_code}>{office.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group">
                            <p>User group</p>
                            {/* <select ref={register()} name="userGroup" class="form-multiselect block w-full mt-1" multiple>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                                <option value="4">Option 4</option>
                                <option value="5">Option 5</option>
                            </select> */}

                            {/* 
                            <Controller
                                control={control}
                                defaultValue={selectedOption}
                                name="test"
                                render={({
                                    // field: {  ref },
                                    // fieldState: { invalid, isTouched, isDirty, error },
                                    formState,
                                }) => (
                                    <Select
                                        // onBlur={onBlur} // notify when input is touched
                                        // onChange={onChange} // send value to hook form
                                        // checked={value}
                                        // inputRef={ref}
                                        onChange={setSelectedOption}
                                        isMulti
                                        options={options}
                                        defaultValue={selectedOption}
                                    />
                                )}
                            /> */}

                            {/* <Select
                                className="form-control mb-4 w-full rounded font-light text-gray-500"
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={options}
                                value={selectedOption}
                                isMulti
                            /> */}
                            {/* 
                            <Controller
                                as={Select}
                                name="group"
                                options={options}
                                isMulti
                                control={control}
                            /> */}

                            <Controller
                                control={control}
                                defaultValue={options.map(c => c.value)}
                                name="group"
                                render={({ onChange, value, ref }) => (
                                    <MultiSelect
                                        inputRef={ref}
                                        options={options}
                                        value={((options.filter(c => value.includes(c.value))))}
                                        onChange={val => onChange(val.map(c => c.value).toString())}
                                        labelledBy="Select"
                                    />
                                    // <Select
                                    //     inputRef={ref}
                                    //     value={((options.forEach(c => value.includes(c.value))))}
                                    //     onChange={val => onChange(val.map(c => c.value))}
                                    //     options={options}
                                    //     isMulti
                                    // />
                                )}
                            />
                        </div>

                        <div className="form-group ">
                            <p>Email</p>
                            <input name="email" ref={register()} type="email" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>
                        <div className="form-group ">
                            <p>Phone Number</p>
                            <input name="phone" ref={register()} type="text" className="form-control mb-4 w-full rounded font-light text-gray-500"
                            />
                        </div>

                        <div className="form-group ">
                            <p>Active</p>

                            <select ref={register()} name="active" class="form-control mb-4 SlectBox  w-full rounded font-light text-gray-500">
                                <option value="Y">Yes</option>
                                <option value="N">No</option>
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
