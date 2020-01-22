package com.ipca.tp2client;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import androidx.annotation.LayoutRes;
import androidx.annotation.NonNull;

import com.ipca.tp2client.model.User;

import java.util.List;

public class UserAdapter extends ArrayAdapter<User> {
    private Context context;
    private List<User> users;

    public UserAdapter(@NonNull Context context, @LayoutRes int resource, @NonNull List<User> objects) {
        super(context, resource, objects);
        this.context = context;
        this.users = objects;
    }

    @Override
    public View getView(final int pos, View convertView, ViewGroup parent){
        LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View rowView = inflater.inflate(R.layout.list_user, parent, false);

        TextView txtUserId = rowView.findViewById(R.id.txtUserId);
        TextView txtUsername =  rowView.findViewById(R.id.txtUsername);
        TextView txtNome =  rowView.findViewById(R.id.txtName);
        TextView txtEmail =  rowView.findViewById(R.id.txtEmail);
        TextView txtEstadoRegisto =  rowView.findViewById(R.id.txtEstadoRegisto);
        TextView txtRole =  rowView.findViewById(R.id.txtRole);


        txtUserId.setText(String.format("#ID: %s", users.get(pos).getId()));
        txtUsername.setText(String.format("USER NAME: %s", users.get(pos).getUsername()));
        txtNome.setText(String.format("NOME: %s", users.get(pos).getNome()));
        txtEmail.setText(String.format("EMAIL: %s", users.get(pos).getEmail()));
        txtEstadoRegisto.setText(String.format("ESTADO DO REGISTO: %s", users.get(pos).getEstadoRegisto()));
        txtRole.setText(String.format("ROLE: %s", users.get(pos).getRole()));

        rowView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //start Activity User Form
                Intent intent = new Intent(context, UserActivity.class);
                intent.putExtra("user_id", String.valueOf(users.get(pos).getId()));
                intent.putExtra("user_name", users.get(pos).getUsername());
                intent.putExtra("user_nome", users.get(pos).getNome());
                intent.putExtra("user_email", users.get(pos).getEmail());
                intent.putExtra("user_estadoRegisto", users.get(pos).getEstadoRegisto().get(0));
                intent.putExtra("user_role", users.get(pos).getRole().get(0));
                context.startActivity(intent);
            }
        });

        return rowView;
    }
}
