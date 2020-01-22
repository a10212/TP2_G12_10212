package com.ipca.tp2.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class User {
    @SerializedName("_id")
    @Expose
    private String _id;

    @SerializedName("nome")
    @Expose
    private String nome;

    @SerializedName("email")
    @Expose
    private String email;

    @SerializedName("username")
    @Expose
    private String username;

    @SerializedName("estadoRegisto")
    @Expose
    private List<String> estadoRegisto;

    @SerializedName("role")
    @Expose
    private List<String> role;


    public User() {
    }

    public User(String _id, String nome) {
        this._id = _id;
        this.nome = nome;
    }

    public String getId() {
        return _id;
    }

    public void setId(String id) {
        this._id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getEstadoRegisto() {
        return estadoRegisto;
    }

    public void setEstadoRegisto(List<String> estadoRegisto) {
        this.estadoRegisto = estadoRegisto;
    }

    public List<String> getRole() {
        return role;
    }

    public void setRole(List<String> role) {
        this.role = role;
    }
}
