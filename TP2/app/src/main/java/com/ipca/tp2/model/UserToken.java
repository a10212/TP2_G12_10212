package com.ipca.tp2.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class UserToken {
    @SerializedName("token")
    @Expose
    private String token;

    @SerializedName("utilizador")
    @Expose
    private User user;


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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
