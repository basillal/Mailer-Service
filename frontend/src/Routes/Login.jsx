import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate username and password
    if (email === "maileradmin" && password === "adminmailer") {
      try {
        // Simulate a successful authentication
        setError(null); // Reset any previous errors
        // Simulated success - set your authenticated state or navigate
        navigate("/composer"); // Use navigate to navigate
        console.log("Authentication successful");
        sessionStorage.setItem("loged_in", true);
      } catch (error) {
        // Handle errors from the authentication process
        setError("Invalid credentials. Please try again.");
      }
    } else {
      // Display an error if the entered credentials are incorrect
      alert("Invalid username or password. Please try again.");
    }
  };
  const handleLogout = () => {
    // Simulate a logout by clearing session information
    sessionStorage.removeItem("loged_in");
    navigate("/");
  };

  return (
    <div>
      <main className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7">
            <div className="text-center">{/* ... (existing code) */}</div>

            <div className="mt-5">
              <form onSubmit={handleLogin}>
                {/* Email Input */}
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm mb-2 dark:text-white"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                    required
                    aria-describedby="email-error"
                  />

                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="email-error"
                  >
                    Please include a valid email address so we can get back to
                    you
                  </p>
                </div>

                {/* Password Input */}
                <div className="mb-4">
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="password"
                      className="block text-sm mb-2 dark:text-white"
                    >
                      Password
                    </label>
                    <a
                      href="../examples/html/recover-account.html"
                      className="text-sm text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                    required
                    aria-describedby="password-error"
                  />
                  {/* Display password validation error, if any */}
                  {/* <p className="hidden text-xs text-red-600 mt-2" id="password-error">
                    8+ characters required
                  </p> */}
                </div>

                {/* Checkbox */}
                <div className="flex items-center mb-4">
                  {/* ... (existing code) */}
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  Sign in
                </button>
                {/* <button
                  onClick={handleLogout}
                  className="mt-3 w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  Logout */}
                {/* </button> */}
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

