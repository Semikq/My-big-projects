import React, { useEffect, useState } from 'react'
import { getAllUsers, fetchPromoteUserToAdmin, fetchDeleteUser } from '../../electronApi'
import './editingUsers.css'

function RenderEditingUsers(){
    const [users, setUsers] = useState([])
    const [shouldUpdateUser, setShouldUpdateUser] = useState(false);

    useEffect(() => {
        async function fetchUsers() {
            const result = await getAllUsers();
            setUsers(result);
        }
        fetchUsers();
    }, [shouldUpdateUser]);

    return (
        <div className='UsersField'>
            {users.map((user) =>(
                <div key={user.user_id} className='user'>
                    <h1>Id - {user.user_id} / Ім'я - {user.name}</h1>
                    <div>
                        <p>Surname: {user.surname}</p>
                        <p>Email: {user.email}</p>
                        <p>Password: {user.password}</p>
                        <p>Tel: +38{user.tel}</p>
                    </div>
                    <div>
                        <input type='button' onClick={() => {fetchPromoteUserToAdmin(user.user_id); setShouldUpdateUser(!shouldUpdateUser)}} value='Підвищити до адміна'></input>
                        <input type='button' onClick={() => {fetchDeleteUser(user.user_id); setShouldUpdateUser(!shouldUpdateUser)}} value='Видалити'></input>
                    </div>
                </div>
            ))}
        </div>
    )
}

export function CreatePageEditingUsers(){
    return (
        <div className='containerEditingUsers'>
            <RenderEditingUsers />
        </div>
    )
}