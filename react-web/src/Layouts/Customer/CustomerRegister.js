import React from "react";
import { useNavigate } from "react-router-dom";
import { PostAddCustomer } from "../Api";

// -----------
import LoginImg from "../../assets/login-2.jpeg";

const CustomerRegister = () => {
  const navigate = useNavigate();
  const handleRegister = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      name: data.get("name"),
      phone: data.get("phone"),
      password: data.get("password"),
    };

    PostAddCustomer(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        navigate("/customer");
      } else {
        console.log(data);
      }
    });
  };
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <div className="hidden sm:block">
          <img className="w-full h-full object" src={LoginImg} alt="" />
        </div>

        <div className="bg-gray-100 flex flex-col justify-center">
          <form
            onSubmit={handleRegister}
            className="max-w-[400px] w-full mx-auto bg-white p-4"
          >
            <h1 className="text-4xl font-bold text-center py-6">Register</h1>

            <label className="form-control w-full flex flex-col p-2">
              <div className="label">
                <span className="label-text">Phone Number</span>
              </div>
              <input
                type="text"
                name="phone"
                required
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            <label className="form-control w-full flex flex-col p-2 ">
              <div className="label">
                <span className="label-text">Name</span>
              </div>

              <input
                type="text"
                name="name"
                required
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            <label className="form-control w-full flex flex-col p-2 ">
              <div className="label">
                <span className="label-text">Password</span>
              </div>

              <input
                type="password"
                name="password"
                required
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            <div className="py-4">
              <button type="submit" className="btn btn-warning w-full">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* <form onSubmit={handleRegister}>
      <label name="phone">phone</label>
      <input type="text" name="phone" required />
      <label name="name">name</label>
      <input type="text" name="name" required />
      <label name="password">password</label>
      <input type="password" name="password" required />
      <button type="submit">Submit</button>
    </form> */}
    </>
  );
};

export default CustomerRegister;
