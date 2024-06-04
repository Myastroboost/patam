import axios from 'axios'
import Script from 'next/script'
import React, { useRef, useState } from 'react'

interface PropType {
    onSubmitSucces: () => void
}

export default function Optin({ onSubmitSucces }: PropType) {
    const captchRefEl = useRef<any>()
    const [hasEmailErr, sethasEmailErr] = useState({
        msg: '',
        hasErr: false
    })
    const [hasFirstNameErr, sethasFirstNameErr] = useState({
        msg: '',
        hasErr: false
    })
    const [hasLastNameErr, sethasLastNameErr] = useState({
        msg: '',
        hasErr: false
    })

    const [email, setEmail] = useState<string>('')
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')

    function onChangeEmail(
        event: React.ChangeEvent<
            HTMLTextAreaElement | HTMLInputElement
        >
    ) {
        setEmail(event.target.value)
    }
    function onChangeFirstName(
        event: React.ChangeEvent<
            HTMLTextAreaElement | HTMLInputElement
        >
    ) {
        setFirstName(event.target.value)
    }
    function onChangeLastName(
        event: React.ChangeEvent<
            HTMLTextAreaElement | HTMLInputElement
        >
    ) {
        setLastName(event.target.value)
    }
    function onSubmit() {
        const re =
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        function submitUserForm() {
            //@ts-ignore
            var response = grecaptcha.getResponse()
            if (response.length == 0 && captchRefEl.current) {
                captchRefEl.current.querySelector(
                    '#g-recaptcha-error'
                ).innerHTML =
                    '<span style="color:red;">Check Captcha to proceed.</span>'
                return false
            }
            return true
        }

        if (submitUserForm()) {
            if (!re.test(email)) {
                sethasEmailErr((prev) => ({
                    msg: 'Invalid email',
                    hasErr: true
                }))
                return
            } else {
                sethasEmailErr((prev) => ({
                    ...prev,
                    hasErr: false
                }))
            }

            axios
                .post(
                    'https://patam.vercel.app/coc/add-contact.php',
                    {
                        email: hasEmailErr,
                        first_name: firstName,
                        last_name: lastName
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                .then((value) => {
                    // callbck response when sucessfully sent to the API endpoint
                    console.log(value)
                    // Call back function to trigger call up to the parent component.
                    onSubmitSucces()
                })
                .catch((err) => {})
                .finally(() => {})
        }
    }

    return (
        <div
            ref={captchRefEl}
            className="text-center text-white w-full flex flex-col items-center py-12 px-4"
        >
            <div className="flex items-center flex-col lg:max-w-[720px] w-full">
                <div className=" flex gap-8  flex-col mb-8">
                    <h1 className="font-american-x text-6xl text-white">
                        Join the MAGAA Warrior Club
                    </h1>
                    <p className="text-xl font-normal">
                        Lock shields with us as we shove a
                        middle finger in the face of Soros DA's,
                        activists judges, and sell-out RINOs!
                        Receive real-time alerts to engage in
                        missions that mobilize millions of
                        Americans in lock-step to take our
                        country back from pedophiles, traitors,
                        and CCP-owned politicians. Only together
                        can we Make America Great Again...
                        AGAIN!
                    </p>
                </div>
                <div className="w-full lg:max-w-[80%]">
                    <div className="w-full mb-6 md:mb-0">
                        <div>
                            <input
                                style={{
                                    borderColor:
                                        hasFirstNameErr.hasErr
                                            ? 'red'
                                            : 'transparent'
                                }}
                                onChange={onChangeFirstName}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded p-4 leading-tight focus:outline-none focus:bg-white mb-2"
                                id="grid-first-name"
                                type="text"
                                placeholder="First Name"
                            />
                           {hasFirstNameErr.hasErr ? (
                                <p className="text-red-500 text-xs italic p-1 text-start">
                                    {hasLastNameErr.msg}
                                </p>
                            ) : null}
                            <input
                                style={{
                                    borderColor:
                                        hasLastNameErr.hasErr
                                            ? 'red'
                                            : 'transparent'
                                }}
                                onChange={onChangeLastName}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border  border-red-500 rounded p-4 leading-tight focus:outline-none focus:bg-white mb-2"
                                id="grid-first-name"
                                type="text"
                                placeholder="Last Name"
                            />
                            {hasLastNameErr.hasErr ? (
                                <p className="text-red-500 text-xs italic p-1 text-start">
                                    {hasLastNameErr.msg}
                                </p>
                            ) : null}
                            <input
                                style={{
                                    borderColor:
                                        hasEmailErr.hasErr
                                            ? 'red'
                                            : 'transparent'
                                }}
                                onChange={onChangeEmail}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded p-4 leading-tight focus:outline-none focus:bg-white mb-2"
                                id="grid-first-name"
                                type="text"
                                placeholder="Email Address"
                            />
                            {hasEmailErr.hasErr ? (
                                <p className="text-red-500 text-xs italic p-1 text-start">
                                    {hasEmailErr.msg}
                                </p>
                            ) : null}
                        </div>
                    </div>
                    <button
                        onClick={onSubmit}
                        className="bg-red-700 hover:bg-red-800 text-white font-bold py-4 w-full mt-4 rounded"
                    >
                        Enter Your Email Here to Join
                    </button>
                </div>
            </div>
            <div
                style={{
                    marginTop: '10px',
                    marginBottom: '10px'
                }}
            >
                <div
                    className="g-recaptcha"
                    data-sitekey="6LfJN_ApAAAAACmYp_g4thSjrXh4aWHM1PuR5Xe2"
                    data-callback="onSubmit"
                    data-size="invisible"
                ></div>
                <div
                    id="g-recaptcha-error"
                    className="py-2"
                ></div>
            </div>
        </div>
    )
}
