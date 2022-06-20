import React from 'react'
import { CoatOfArms, KgirsLogo, KogiGov } from '../../components/Images/Images'

export default function index() {
    return (
        <div className='rounded-lg p-6 bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800'>
            <p>KOGI STATE GOVERNMENT</p>
            <section className="flex justify-between">
                <p className="font-bold">REVENUE RECEIPT</p>
                <p className="font-bold">2022033222</p>
            </section>
            <section className="flex justify-end mt-8">
                <CoatOfArms />
                {/* <p className="border-r-2 ml-2 border-black h-8 self-center"></p> */}
                <KogiGov />

                <KgirsLogo />
            </section>
            <div className="flex">

                <div>
                    <div className="grid grid-cols-6 gap-2">
                        <p>PAID BY:</p>
                        <p className="font-bold col-span-2">Bespoque Global Concept</p>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                        <p>PAYER ID:</p>
                        <p className="font-bold col-span-2">2247026991</p>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                        <p>ADDRESS:</p>
                        <p className="font-bold col-span-2">38, Okene Kabba Road, Lokongoma</p>
                    </div>
                    <div className="flex">
                        <div className='w-16 border-b-2'>
                            {/* <hr /> */}
                        </div>
                        <p className='align-self-center'>Details</p>
                        <div>
                            <hr/>
                        </div>
                    </div>
                </div>
                <div>
                    test
                </div>
            </div>

        </div>
    )
}
