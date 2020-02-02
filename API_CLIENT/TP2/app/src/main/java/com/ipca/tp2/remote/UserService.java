package com.ipca.tp2.remote;

import com.ipca.tp2.model.User;
import com.ipca.tp2.model.UserToken;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;


public interface  UserService {

    @GET("utilizadores/")
    Call<List<User>> getUsers();

    @POST("login/")
    Call<UserToken> userLogin(@Body String username, String password);

    @PUT("utilizadores/{id}")
    Call<User> updateUser(@Path("id") String id, @Body User user);

    @DELETE("utilizadores/{id}")
    Call<User> deleteUser(@Path("id") String id);

}
