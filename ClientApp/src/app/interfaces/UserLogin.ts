interface UserLogin {
    token: string;
    user: {
        id: string;
        email: string;
        password: string;
        storeID: string;
    };
}
