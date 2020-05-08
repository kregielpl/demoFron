<template>
    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md5>
                <v-form
                    ref="form"
                    v-model="valid"
                    :lazy-validation="lazy"
                >
                    <v-card class="elevation-12">
                        <v-toolbar dark color="blue">
                            <v-toolbar-title>Login form</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-text-field :rules="[v => !!v || 'Pole wymagane']" v-model="username" prepend-icon="person" name="login" label="Login" type="text" required></v-text-field>

                            <v-text-field :rules="[v => !!v || 'Pole wymagane']" v-model="password" prepend-icon="lock" name="password" label="Password" type="password" required></v-text-field>
                        </v-card-text>
                        <v-divider light></v-divider>
                        <v-card-actions>
                            <v-btn to="/signup" round color="indigo" dark>Sign up</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn @click="validate" round color="primary">
                                Login
                                <v-icon>keyboard_arrow_right</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import axios from "../../axios"

    export default {
        name: "login",
        data: () => ({
            valid: true,
            lazy: false,
            username: '',
            password: '',
        }),
        methods: {
            validate () {
                if(this.$refs.form.validate()){
                    this.submitForm()
                }
            },
            submitForm(){
                const data = {
                    username: this.username,
                    password: this.password,
                };

                axios
                    .post(axios.defaults.baseURL + '/api/login_check', data)
                    .then((response) => {
                        if (response.statusText == 'ERROR') {
                            alert('Wystąpił problem podczas logowania')
                        }else{
                            console.log('Pomyślnie zalogowano')
                            localStorage.setItem("accessToken", response.data.token)
                            // this.$acl.change('user')
                            this.$router.push({ path: '/' })
                        }
                    });
            }
        }
    };
</script>