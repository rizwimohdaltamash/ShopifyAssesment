// /* eslint-disable react/no-unescaped-entities */
// import { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import myContext from "../../context/myContext";
// import { Timestamp, addDoc, collection } from "firebase/firestore";
// import { auth, fireDB } from "../../firebase/FirebaseConfig";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import toast from "react-hot-toast";
// import Loader from "../../components/loader/Loader";

// const Signup = () => {
//     const context = useContext(myContext);
//     const {loading, setLoading } = context;

//     // navigate 
//     const navigate = useNavigate();

//     // User Signup State 
//     const [userSignup, setUserSignup] = useState({
//         name: "",
//         email: "",
//         password: "",
//         role: "user"
//     });

//     /**========================================================================
//      *                          User Signup Function 
//     *========================================================================**/

//     const userSignupFunction = async () => {
//         // validation 
//         if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
//             toast.error("All Fields are required")
//         }

//         setLoading(true);
//         try {
//             const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

//             // create user object
//             const user = {
//                 name: userSignup.name,
//                 email: users.user.email,
//                 uid: users.user.uid,
//                 role: userSignup.role,
//                 time: Timestamp.now(),
//                 date: new Date().toLocaleString(
//                     "en-US",
//                     {
//                         month: "short",
//                         day: "2-digit",
//                         year: "numeric",
//                     }
//                 )
//             }

//             // create user Refrence
//             const userRefrence = collection(fireDB, "user")

//             // Add User Detail
//             addDoc(userRefrence, user);
//             localStorage.setItem("users", JSON.stringify(user));
//             setUserSignup({
//                 name: "",
//                 email: "",
//                 password: ""
//             })

//             toast.success("Signup Successfully");

//             setLoading(false);
//             navigate('/')
//         } catch (error) {
//             console.log(error);
//             setLoading(false);
//         }

//     }

    
    
//     return (
//         <div className='flex justify-center items-center h-screen bg-red-900'>
//             {loading && <Loader/>}
//             {/* Login Form  */}
//             <div className="login_Form bg-black px-8 py-6 rounded-xl shadow-md w-[80%] lg:w-[30%]">

//                 {/* Top Heading  */}
//                 <div className="mb-5">
//                     <h2 className='text-center text-2xl font-bold text-orange-900 '>
//                         Signup
//                     </h2>
//                 </div>

//                 {/* Input One  */}
//                 <div className="mb-3">
//                     <input
//                         type="text"
//                         placeholder='Full Name'
//                         value={userSignup.name}
//                         onChange={(e) => {
//                             setUserSignup({
//                                 ...userSignup,
//                                 name: e.target.value
//                             })
//                         }}
//                         className='bg-gray-800 text-white px-2 py-2 w-full rounded-md outline-none placeholder-white'
//                     />
//                 </div>

//                 {/* Input Two  */}
//                 <div className="mb-3">
//                     <input
//                         type="email"
//                         placeholder='Email Address'
//                         value={userSignup.email}
//                         onChange={(e) => {
//                             setUserSignup({
//                                 ...userSignup,
//                                 email: e.target.value
//                             })
//                         }}
//                         className='bg-gray-800 text-white px-2 py-2 w-full rounded-md outline-none placeholder-white'
//                     />
//                 </div>

//                 {/* Input Three  */}
//                 <div className="mb-5">
//                     <input
//                         type="password"
//                         placeholder='Password'
//                         value={userSignup.password}
//                         onChange={(e) => {
//                             setUserSignup({
//                                 ...userSignup,
//                                 password: e.target.value
//                             })
//                         }}
//                         className='bg-gray-800 text-white px-2 py-2 w-full rounded-md outline-none placeholder-white'
//                     />
//                 </div>

//                 {/* Signup Button  */}
//                 <div className="mb-5">
//                     <button
//                         type='button'
//                         onClick={userSignupFunction}
//                         className='bg-yellow-900 hover:bg-yellow-800 w-full text-white text-center py-2 font-bold rounded-md '
//                     >
//                         Signup
//                     </button>
//                 </div>

//                 <div className="text-center">
//                     <h2 className='text-white'>Have an account <Link className=' text-yellow-900 font-bold' to={'/login'}>Login</Link></h2>
//                 </div>

//             </div>
//         </div>
//     );
// }

// export default Signup;

/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const Signup = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const navigate = useNavigate();
    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    const userSignupFunction = async () => {
        if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
            toast.error("All fields are required!");
            return;
        }

        setLoading(true);
        try {
            const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

            const user = {
                name: userSignup.name,
                email: users.user.email,
                uid: users.user.uid,
                role: userSignup.role,
                time: Timestamp.now(),
                date: new Date().toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }),
            };

            const userRef = collection(fireDB, "user");
            await addDoc(userRef, user);

            localStorage.setItem("users", JSON.stringify(user));
            setUserSignup({ name: "", email: "", password: "" });

            toast.success("Signup Successful 🌿");
            setLoading(false);
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error("Signup Failed ❌");
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-green-200">
            {loading && <Loader />}

            <div className="signup_Form bg-white/90 backdrop-blur-md px-8 py-6 rounded-2xl shadow-lg border border-green-300 w-[85%] sm:w-[60%] lg:w-[30%] transition-transform hover:scale-[1.01] duration-300">

                {/* Heading */}
                <div className="mb-5 text-center">
                    <h2 className="text-3xl font-extrabold text-green-800">Create Your Account</h2>
                    <p className="text-green-600 text-sm mt-1">Join Shopify and start your shopping journey</p>
                </div>

                {/* Name Input */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={userSignup.name}
                        onChange={(e) => setUserSignup({ ...userSignup, name: e.target.value })}
                        className="bg-green-50 text-gray-800 px-3 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500"
                    />
                </div>

                {/* Email Input */}
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={userSignup.email}
                        onChange={(e) => setUserSignup({ ...userSignup, email: e.target.value })}
                        className="bg-green-50 text-gray-800 px-3 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500"
                    />
                </div>

                {/* Password Input */}
                <div className="mb-6">
                    <input
                        type="password"
                        placeholder="Password"
                        value={userSignup.password}
                        onChange={(e) => setUserSignup({ ...userSignup, password: e.target.value })}
                        className="bg-green-50 text-gray-800 px-3 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500"
                    />
                </div>

                {/* Signup Button */}
                <div className="mb-5">
                    <button
                        type="button"
                        onClick={userSignupFunction}
                        className="bg-green-600 hover:bg-green-700 active:bg-green-800 transition-all w-full text-white py-2.5 font-semibold rounded-md shadow-md hover:shadow-lg"
                    >
                        Signup
                    </button>
                </div>

                {/* Login Redirect */}
                <div className="text-center">
                    <p className="text-gray-700">
                        Already have an account?{" "}
                        <Link to="/login" className="text-green-700 font-bold hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
