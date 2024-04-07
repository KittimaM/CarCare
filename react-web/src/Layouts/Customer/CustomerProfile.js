import React, { useEffect, useState } from 'react'
import { GetCustomerProfile, UpdateCustomerProfile } from '../Api'

const CustomerProfile = () => {
    const [profile, setProfile] = useState([]);
    const [disabledEditProfile, setDisabledEditProfile] = useState(true);
    useEffect(() => {
        GetCustomerProfile().then((data) => {
            const {status, msg} = data;
            if (status == "SUCCESS") {
                setProfile(msg);
            } else {
                console.log(data);
            }
        })
    }, []);

    const handleEditProfile = (event) => {
        event.preventDefault();
        setDisabledEditProfile(false);
    }

    const handleUpdateProfile = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const jsonData = {
            phone: data.get("phone"),
            name: data.get("name"),
        }
        UpdateCustomerProfile(jsonData).then((data) => {
            const {status, msg} = data;
            if(status == "SUCCESS") {
                setDisabledEditProfile(true);
            } else {
                console.log(data);
            }
        })
    }

    const handleCancelEdit = (event) => {
        event.preventDefault();
        setDisabledEditProfile(true);
    }
  return (
    <div>
        {profile && profile.map((item) => (
            <div>
                <button className="btn" onClick={handleEditProfile} disabled={!disabledEditProfile}>Edit</button>
                <form onSubmit={handleUpdateProfile}>
                    <label>phone number</label>
                    <input type="tel" name="phone" defaultValue={item.phone} disabled={disabledEditProfile}/>
                    <label>name</label>
                    <input type="text" name="name" defaultValue={item.name} disabled={disabledEditProfile}/>
                    {disabledEditProfile == false && 
                        <div>
                            <button type="submit" className="btn">Submit</button>
                            <button className="btn" onClick={handleCancelEdit}>Cancel</button>
                        </div>
                    }
                </form>
            </div>

        ))}
    </div>
  )
}

export default CustomerProfile;
