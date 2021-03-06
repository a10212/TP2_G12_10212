package com.ipca.tp2client.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class UserToken {
    @SerializedName("token")
    @Expose
    private String token;


    public UserToken() {
    }

    public UserToken(String token) {
        this.token = token;
    }


    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
