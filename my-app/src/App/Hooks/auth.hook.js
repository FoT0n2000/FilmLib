import {useState, useCallback, useEffect} from 'react';

const storageName = "UserData";

export const useAuth = () => {
    const[token, SetToken] = useState(null);
    const [userId, SetUserId] = useState(null);
    const [role, SetRole] = useState(null);


    const login = useCallback((jwtToken, id, UserRole) => {
        SetToken(jwtToken);
        SetUserId(id);
        SetRole(UserRole);

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, role: UserRole
        }));
    }, [SetToken, SetUserId, SetRole, ]);

    const logout = useCallback(() => {
        SetToken(null);
        SetUserId(null);
        SetRole(null);

        localStorage.removeItem(storageName);
    }, [SetToken, SetUserId, SetRole]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if(data && data.token){
            login(data.token, data.userId, data.role);
        }
    }, [login]);

    return {login, logout, token, userId, role};
}
