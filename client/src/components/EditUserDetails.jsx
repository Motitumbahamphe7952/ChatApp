
import React, { useState } from 'react'
import Avatar from './Avatar';

const EditUserDetails = ({onClose,data}) => {
  const [formData,setformData] = useState({
    name: data?.name || "",
    profilepic: data?.profilepic || "",
  })
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setformData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700/40 flex justify-center items-center">{/* here bg-gray-700/40 ---means 40% opacity and 700 contrast */}
       <div className="bg-white p-4 m-1 rounded w-full max-w-sm">
        <h2 className="text-2xl font-semibold  mt-0">Profile Details</h2>
        <p className="text-md">Edit user details :</p>

        <form className="grid gap-3 mt-3">
          <div className="flex flex-col gap-1">
            {/* <label htmlFor="profilepic">Photo: </label> */}
             <div className="flex justify-center item-center">
              <Avatar
              width={120}
              height={120}
              textSize="text-4xl"
              imageUrl={data?.profilepic}
              name={data?.name}
             />
             </div>
             <button className="bg-primary text-white mt-3 px-2 py-1 rounded hover:bg-secondary">Change Photo</button>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name: </label>
              <input type="text" 
              name="name"
              id="name"
              value={data.name}
              onChange={handleOnChange}
              className="w-full py-1 px-2 focus:outline-primary rounded bg-slate-100 border-0.5"
              />
          </div>
        </form>

       </div>
    </div>
  )
}

export default EditUserDetails