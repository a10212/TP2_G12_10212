package com.ipca.tp2;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.ipca.tp2.model.User;
import com.ipca.tp2.model.UserRegister;
import com.ipca.tp2.model.UserToken;
import com.ipca.tp2.remote.APIUtils;
import com.ipca.tp2.remote.AuthenticationService;
import com.ipca.tp2.remote.UserService;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class UserActivity extends AppCompatActivity {

    UserService userService;
    AuthenticationService authService;
    EditText edtUId;
    EditText edtUsername, edtPassword, edtName, edtEmail, edtEstadoRegisto, edtRole;
    Button btnSave;
    Button btnDel;
    TextView txtUId, txtPassword, txtEstadoRegisto;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user);

        setTitle("Users");
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        txtUId = findViewById(R.id.txtUId);
        txtPassword = findViewById(R.id.txtPassword);
        edtUId =  findViewById(R.id.edtUId);
        edtUsername = findViewById(R.id.edtUsername);
        edtPassword = findViewById(R.id.edtPassword);
        edtName = findViewById(R.id.edtName);
        edtEmail = findViewById(R.id.edtEmail);
        txtEstadoRegisto = findViewById(R.id.txtEstadoRegisto);
        edtEstadoRegisto = findViewById(R.id.edtEstadoRegisto);
        edtRole = findViewById(R.id.edtRole);

        btnSave = findViewById(R.id.btnSave);
        btnDel = findViewById(R.id.btnDel);

        UserToken token = new UserToken(getSharedPreferences("API_TOKEN", Context.MODE_PRIVATE)
                .getString("API_TOKEN", ""));

        Log.d("Using Token", token.getToken());

        userService = APIUtils.getUserService(token);
        authService = APIUtils.getAuthenticationService();

        Bundle extras = getIntent().getExtras();
        final String userId = extras.getString("user_id");
        String userName = extras.getString("user_name");
        String nome = extras.getString("user_nome");
        String email = extras.getString("user_email");
        String estadoResgisto = extras.getString("user_estadoRegisto");
        String role = extras.getString("user_role");

        edtUId.setText(userId);
        edtUsername.setText(userName);
        edtPassword.setText("");
        edtName.setText(nome);
        edtEmail.setText(email);
        edtEstadoRegisto.setText(estadoResgisto);
        edtRole.setText(role);

        if(userId != null && userId.trim().length() > 0 ){
            edtUId.setFocusable(false);
            txtPassword.setVisibility(View.INVISIBLE);
            edtPassword.setVisibility(View.INVISIBLE);

        } else {
            txtUId.setVisibility(View.INVISIBLE);
            edtUId.setVisibility(View.INVISIBLE);
            btnDel.setVisibility(View.INVISIBLE);
            txtEstadoRegisto.setVisibility(View.INVISIBLE);
            edtEstadoRegisto.setVisibility(View.INVISIBLE);
        }

        btnSave.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                User u = new User();
                u.setNome(edtName.getText().toString());
                u.setUsername(edtUsername.getText().toString());
                u.setEmail(edtEmail.getText().toString());

                List<String> estado = new ArrayList<String>();
                estado.add(edtEstadoRegisto.getText().toString());
                u.setEstadoRegisto(estado);

                List<String> role = new ArrayList<String>();
                role.add(edtRole.getText().toString());
                u.setRole(role);


                //NEW USER
                UserRegister uRegister = new UserRegister();
                uRegister.setNome(edtName.getText().toString());
                uRegister.setUsername(edtUsername.getText().toString());
                uRegister.setPassword(edtPassword.getText().toString());
                uRegister.setEmail(edtEmail.getText().toString());
                uRegister.setRole(edtRole.getText().toString());


                if(userId != null && userId.trim().length() > 0){
                    //update user
                    updateUser(userId, u);
                } else {
                    //add user
                    addUser(uRegister);
                }
            }
        });

        btnDel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                deleteUser(userId);

                Intent intent = new Intent(UserActivity.this, MainActivity.class);
                startActivity(intent);
            }
        });

    }


        /**
         * <server>:5000/registar
     * @param u: UserRegister object with all information needed to register a new user on the DB
     */
    public void addUser(UserRegister u){
        Call<UserToken> call = authService.addUser(u);

        call.enqueue(new Callback<UserToken>() {
            @Override
            public void onResponse(Call<UserToken> call, Response<UserToken> response) {
                if(response.isSuccessful()){
                    Toast.makeText(UserActivity.this, "User created successfully!", Toast.LENGTH_SHORT).show();

                    setResult(Activity.RESULT_OK);
                    //Complete and destroy login activity once successful
                    finish();
                }
                else {
                    // error case
                    switch (response.code()) {
                        case 401:
                            Toast.makeText(UserActivity.this, "UnauthorizedError : " + response.raw(), Toast.LENGTH_SHORT).show();
                            break;
                        case 404:
                            Toast.makeText(UserActivity.this, "not found: " + response.message(), Toast.LENGTH_SHORT).show();
                            break;
                        case 500:
                            Toast.makeText(UserActivity.this, "server broken", Toast.LENGTH_SHORT).show();
                            break;
                        default:
                            Toast.makeText(UserActivity.this, "unknown error", Toast.LENGTH_SHORT).show();
                            break;
                    }
                }
            }

            @Override
            public void onFailure(Call<UserToken> call, Throwable t) {
                Log.e("ERROR: ", t.getMessage());
            }
        });
    }

    public void updateUser(String id, User u){
        Call<User> call = userService.updateUser(id, u);
        call.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if(response.isSuccessful()){
                    Toast.makeText(UserActivity.this, "User updated successfully!", Toast.LENGTH_SHORT).show();
                    setResult(Activity.RESULT_OK);
                    //Complete and destroy login activity once successful
                    finish();
                }
                else {
                    // error case
                    switch (response.code()) {
                        case 401:
                            Toast.makeText(UserActivity.this, "UnauthorizedError : " + response.raw(), Toast.LENGTH_SHORT).show();
                            break;
                        case 404:
                            Toast.makeText(UserActivity.this, "not found", Toast.LENGTH_SHORT).show();
                            break;
                        case 500:
                            Toast.makeText(UserActivity.this, "server broken", Toast.LENGTH_SHORT).show();
                            break;
                        default:
                            Toast.makeText(UserActivity.this, "unknown error", Toast.LENGTH_SHORT).show();
                            break;
                    }
                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                Log.e("ERROR: ", t.getMessage());
            }
        });
    }

    public void deleteUser(String id){
        Call<User> call = userService.deleteUser(id);
        call.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if(response.isSuccessful()){
                    Toast.makeText(UserActivity.this, "User deleted successfully!", Toast.LENGTH_SHORT).show();
                    setResult(Activity.RESULT_OK);
                    //Complete and destroy login activity once successful
                    finish();
                }
                else {
                    // error case
                    switch (response.code()) {
                        case 401:
                            Toast.makeText(UserActivity.this, "UnauthorizedError : " + response.raw(), Toast.LENGTH_SHORT).show();
                            break;
                        case 404:
                            Toast.makeText(UserActivity.this, "not found", Toast.LENGTH_SHORT).show();
                            break;
                        case 500:
                            Toast.makeText(UserActivity.this, "server broken", Toast.LENGTH_SHORT).show();
                            break;
                        default:
                            Toast.makeText(UserActivity.this, "unknown error", Toast.LENGTH_SHORT).show();
                            break;
                    }
                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                Log.e("ERROR: ", t.getMessage());
            }
        });
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                finish();
                return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
