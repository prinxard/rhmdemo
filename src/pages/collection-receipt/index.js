import React from 'react'
import { CoatOfArms, KgirsLogo, KogiGov } from '../../components/Images/Images'

export default function index() {
    return (
        <div className='rounded-lg p-6 bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800'>
            <div className="border p-6">
                <p>KOGI STATE GOVERNMENT</p>
                <section className="flex justify-between">
                    <p className="font-bold">REVENUE RECEIPT</p>
                    <p className="font-bold">2022033222</p>
                </section>
                <section className="flex justify-end mt-8">
                    <CoatOfArms />
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
                        <div className="flex mt-10">
                            <div className='w-16 border-b-2'>
                            </div>
                            <p className='align-self-center'>Details</p>
                            <div className="border-b-2 w-3/4">
                            </div>
                        </div>
                    </div>

                </div>
                <div className="mt-3">
                    <div className="grid grid-cols-6 gap-2">
                        <p>PAYMENT DATE:</p>
                        <p className="font-bold col-span-2">06-06-2022</p>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                        <p>AMOUNT:</p>
                        <div className="col-span-4">
                            <p className="font-bold">NGN 80,732.00</p>
                            <small>Eighty thousand seven hundred and thirty two naira only</small>
                        </div>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                        <p>BEING:</p>
                        <div className="col-span-3">
                            <p className="font-bold"> Payment for (22000800100/12010102) </p>
                            <small>Pay as you earn</small>
                        </div>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                        <p>PAID AT:</p>
                        <p className="font-bold"> First Bank </p>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                        <p>AGENCY:</p>
                        <div className="col-span-3">
                            <p className="font-bold"> INTERNAL REVENUE SERVICE </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                        <p>TAX STATION:</p>
                        <p className="font-bold"> Lokoja 1 </p>
                    </div>
                    <div className="border-b-2 mt-3 w-4/4">
                    </div>
                </div>
                <div className="flex justify-between">
                    <div></div>
                    <div>Authorized Signitory</div>
                </div>
            </div>
        </div>
    )
}
