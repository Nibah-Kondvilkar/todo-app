import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Register({setShowLogin}){

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const register = async ()=>{

try{
await createUserWithEmailAndPassword(auth,email,password);

alert("Account created successfully");
await signOut(auth);


setShowLogin(true);
}catch(err){
alert(err.message);
}

};

return(

<div className="flex flex-col">

<input
className="border p-2 mb-3 rounded"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
className="border p-2 mb-3 rounded"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button
className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
onClick={register}
>
Register
</button>

</div>

);

}

export default Register;