package com.ipca.tp2.ui.estacionamentos;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;

import com.ipca.tp2.R;

public class EstacionamentosFragment extends Fragment {

    private EstacionamentosViewModel estacionamentosViewModel;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        estacionamentosViewModel =
                ViewModelProviders.of(this).get(EstacionamentosViewModel.class);
        View root = inflater.inflate(R.layout.fragment_estacionamentos, container, false);
        final TextView textView = root.findViewById(R.id.text_estacionamentos);
        estacionamentosViewModel.getText().observe(this, new Observer<String>() {
            @Override
            public void onChanged(@Nullable String s) {
                textView.setText(s);
            }
        });
        return root;
    }
}