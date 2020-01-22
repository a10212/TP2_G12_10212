package com.ipca.tp2client.remote;

import com.ipca.tp2client.model.UserRegister;
import com.ipca.tp2client.model.UserToken;


import java.util.HashMap;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;



public interface AuthenticationService {
    @POST("registar/")
    Call<UserToken> addUser(@Body UserRegister userRegister);

    @POST("login/")
    Call<UserToken> login(@Body HashMap credentials);

}
