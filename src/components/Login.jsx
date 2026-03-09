import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login({setUser}){

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const login = async ()=>{

try{
const res = await signInWithEmailAndPassword(auth,email,password);
setUser(res.user);
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
className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
onClick={login}
>
Login
</button>

</div>

);

}

export default Login;