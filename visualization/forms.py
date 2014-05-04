from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

__author__ = 'josecolella'

from django import forms

from .models import UploadFile


class UploadFileForm(forms.ModelForm):

    class Meta:
        model = UploadFile


class SignInForm(AuthenticationForm):
    """
    This class represents the authentication form used to uniquely identify a user
    for the visualize platform
    """
    username = forms.CharField(widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'Username',
        'minlength': 4,
        'maxlength': 25
    }))
    password = forms.CharField(widget=forms.PasswordInput(attrs={
        'class': 'form-control',
        'placeholder': 'Password',
        'minlength': 6,
        'maxlength': 25
    }))



class SignUpForm(UserCreationForm):
    """
    This class represents the form to create new users
    """
    username = forms.CharField(widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'Username',
        'minlength': 4,
        'maxlength': 25
    }))
    password1 = forms.CharField(widget=forms.PasswordInput(attrs={
        'class': 'form-control',
        'placeholder': 'Password',
        'minlength': 6,
        'maxlength': 25
    }))
    password2 = forms.CharField(widget=forms.PasswordInput(attrs={
        'class': 'form-control',
        'placeholder': 'Repeat Password',
        'minlength': 6,
        'maxlength': 25
    }))



