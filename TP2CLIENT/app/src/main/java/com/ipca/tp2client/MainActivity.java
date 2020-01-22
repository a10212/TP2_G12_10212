package com.ipca.tp2client;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;


import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.android.volley.RequestQueue;


import com.ipca.tp2client.model.User;
import com.ipca.tp2client.model.UserToken;
import com.ipca.tp2client.remote.APIUtils;
import com.ipca.tp2client.remote.AuthenticationService;
import com.ipca.tp2client.remote.UserService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class MainActivity extends AppCompatActivity {

    Button btnAddUser;
    Button btnGetUsersList;
    ListView listView;

    UserService userService;
    List<User> list = new ArrayList<User>();

    AuthenticationService authService;
    UserToken userToken = new UserToken();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        setTitle("API Client for TP2");

        btnAddUser = findViewById(R.id.btnAddUser);
        btnGetUsersList = findViewById(R.id.btnGetUsersList);
        listView = findViewById(R.id.listView);

        userToken.setToken(getSharedPreferences("API_TOKEN", Context.MODE_PRIVATE)
                .getString("API_TOKEN", ""));
        userService = APIUtils.getUserService(userToken);
        authService = APIUtils.getAuthenticationService();

        btnGetUsersList.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //get users list

                HashMap<String, Object> credentials = new HashMap<>();
                credentials.put("password", "test1234");
                credentials.put("username", "admin");
                userLogin(credentials);

                getUsersList();

            }
        });

        btnAddUser.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, UserActivity.class);
                intent.putExtra("user_name", "");
                startActivity(intent);
            }
        });


    }

    public void getUsersList(){
        Call<List<User>> call = userService.getUsers();
        call.enqueue(new Callback<List<User>>() {
            @Override
            public void onResponse(Call<List<User>> call, Response<List<User>> response) {
                if(response.isSuccessful()){
                    list = response.body();
                    listView.setAdapter(new UserAdapter(MainActivity.this, R.layout.list_user, list));
                }
                else {
                    // error case
                    switch (response.code()) {
                        case 401:
                            Toast.makeText(MainActivity.this, "UnauthorizedError : " + response.raw(), Toast.LENGTH_SHORT).show();
                            break;
                        case 404:
                            Toast.makeText(MainActivity.this, "not found", Toast.LENGTH_SHORT).show();
                            break;
                        case 500:
                            Toast.makeText(MainActivity.this, "server broken", Toast.LENGTH_SHORT).show();
                            break;
                        default:
                            Toast.makeText(MainActivity.this, "unknown error", Toast.LENGTH_SHORT).show();
                            break;
                    }
                }
            }

            @Override
            public void onFailure(Call<List<User>> call, Throwable t) {
                Log.e("ERROR: ", t.getMessage());
            }
        });
    }
    public void userLogin(HashMap<String, Object> credentials) {

        Call<UserToken> call = authService.login(credentials);
        call.enqueue(new Callback<UserToken>() {
            @Override
            public void onResponse(Call<UserToken> call, Response<UserToken> response) {
                if(response.isSuccessful()){
                    userToken = response.body();

                    SharedPreferences sharedPreferences = getSharedPreferences("API_TOKEN", Context.MODE_PRIVATE);
                    SharedPreferences.Editor editor = sharedPreferences.edit();
                    editor.putString("API_TOKEN", userToken.getToken());
                    editor.apply();


                    Log.i("NEW USER TOKEN", getSharedPreferences("API_TOKEN", Context.MODE_PRIVATE)
                            .getString("API_TOKEN", ""));



                }
            }

            @Override
            public void onFailure(Call<UserToken> call, Throwable t) {
                Log.e("ERROR: ", t.getMessage());
            }
        });

    }

}
