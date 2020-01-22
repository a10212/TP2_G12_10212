package com.ipca.tp2client.remote;

import com.ipca.tp2client.model.UserToken;

public class APIUtils {
    private APIUtils(){
    };

    public static final String API_URL = "http://172.16.12.181:5000/";

    public static  AuthenticationService getAuthenticationService(){
        return RetrofitClient.getClient(API_URL, "").create(AuthenticationService.class);
    }

    public static UserService getUserService(UserToken userToken){
        return RetrofitClient.getClient(API_URL, userToken.getToken()).create(UserService.class);
    }



}
