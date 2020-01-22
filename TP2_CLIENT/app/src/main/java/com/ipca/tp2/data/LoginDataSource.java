package com.ipca.tp2.data;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import com.ipca.tp2.data.model.LoggedInUser;
import com.ipca.tp2.model.UserToken;
import com.ipca.tp2.remote.APIUtils;
import com.ipca.tp2.remote.AuthenticationService;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


/**
 * Class that handles authentication w/ login credentials and retrieves user information.
 */
public class LoginDataSource {
    AuthenticationService authService;
    UserToken userToken = null;
    Boolean waitingResponse = false;

    public Result<LoggedInUser> login(String username, String password) {

        try {
            authService = APIUtils.getAuthenticationService();
            HashMap<String, Object> credentials = new HashMap<>();
            credentials.put("password", password);
            credentials.put("username", username);


            userLogin(credentials);
            while(waitingResponse)
            {
            }

            if (userToken == null)
            {
                Log.e("ERROR", "No Token received");
                return new Result.Error(new Exception("No token received"));
            }


            LoggedInUser user =
                    new LoggedInUser(
                            userToken.getUser().getId(),
                            userToken.getUser().getNome(),
                            userToken.getToken());



            return new Result.Success<>(user);
        } catch (Exception e) {
            return new Result.Error(new IOException("Error logging in", e));
        }
    }

    public void userLogin(HashMap<String, Object> credentials) {
        waitingResponse = true;
        Call<UserToken> call = authService.login(credentials);
        call.enqueue(new Callback<UserToken>() {
            @Override
            public void onResponse(Call<UserToken> call, Response<UserToken> response) {
                if(response.isSuccessful()){
                    userToken = response.body();
                }
                waitingResponse = false;
            }

            @Override
            public void onFailure(Call<UserToken> call, Throwable t) {
                Log.e("ERROR: ", t.getMessage());
                waitingResponse = false;
            }
        });

    }


    public void logout() {
        // TODO: revoke authentication
    }
}
