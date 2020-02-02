package com.ipca.tp2.ui.estacionamentos;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class EstacionamentosViewModel extends ViewModel {

    private MutableLiveData<String> mText;

    public EstacionamentosViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("This is estacionamentos fragment");
    }

    public LiveData<String> getText() {
        return mText;
    }
}