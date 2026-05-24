import { useState } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

function Register({ setShowLogin, setIsRegistering }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
  try {
    setIsRegistering(true);

    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    const user = userCredential.user;

    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
      }
    );

    await signOut(auth);

    setIsRegistering(false);

    setShowLogin(true);

    alert("Account created successfully 🎉");

  } catch (err) {
    setIsRegistering(false);
    alert(err.message);
  }
};

  return (
    <div className="flex flex-col">
      <input
        type="email"
        className="border p-2 mb-3 rounded"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        className="border p-2 mb-3 rounded"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
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