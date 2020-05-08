<template>
    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md5>
                <v-card class="elevation-12">
                    <v-toolbar dark color="blue">
                        <v-toolbar-title>Rejestracja</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form
                            ref="form"
                            v-model="valid"
                            :lazy-validation="lazy"
                            @submit.prevent
                        >
                            <v-text-field
                                    prepend-icon="person"
                                    name="username"
                                    label="Login"
                                    :rules="[rules.required]"
                                    v-model="username"
                            ></v-text-field>

                            <v-text-field
                                    prepend-icon="email"
                                    name="email"
                                    label="Email"
                                    :rules="[rules.required, rules.email]"
                                    v-model="email"
                            ></v-text-field>

                            <v-text-field
                                    prepend-icon="lock"
                                    name="password"
                                    label="Hasło"
                                    :rules="[rules.required]"
                                    v-model="password"
                                    type="password"
                            ></v-text-field>

                            <v-text-field
                                    prepend-icon="lock"
                                    name="password"
                                    label="Potwierdzenie hasła"
                                    :rules="[rules.required, (password === confirm_password) || 'Hasła muszą być takie same!']"
                                    type="password"
                                    v-model="confirm_password"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-divider light></v-divider>
                    <v-card-actions>
                        <v-btn to="/login"  round color="black" dark>Login</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn round color="success" @click.prevent="validate">
                            Register
                            <v-icon>keyboard_arrow_up</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
    import axios from "../../axios";

    export default {
        name: "signup",
        data: () => ({
            userExists: false,
            username: "",
            email: "",
            password: "",
            confirm_password: "",
            valid: true,
            lazy: false,
            rules: {
                required: value => !!value || "Pole wymagane",
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || "Niepoprawny adres email.";
                },
            },
            auth: {headers: {Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1ODg5MTY1NTUsImV4cCI6MTU4ODkyMDE1NSwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiYXBpMiJ9.PHmhHduKaqQ3O3rTwLs01v0LekO_epgbIzHt0qBYj9ohW6ZY1XeftI7AHhGK1xyVEwl01P8m__1YJTmw9ITnjbDkQ6mvEowqU23lWTLrc5vRtGeD_HUZeLVTzYeZ0X5efRxU3itDpw3n0zl1zJCz75oK0ysiVOCdnsSFxi2nkwVldJqatVPsrYNMi5c6H5sJB66or-v_modzQPb9yg8UMSIdaH3ujnrHswTS7y5ajvybyqg0xXzTwGddiAOzVFDYPni_p7DR3kaFMULUNqGhfQZOwDA6juMywBd7_zU39bZm7mwR_Aby8SNnbIMz5sOY0rOhVwWjBojc3eiHCpMRxWe2sdPbpfaceM70GlbT6MMv3nfnuhb991cGavxde13o1jvhlswyAo0VtThj1E0ebC4_wK-KdY8oBZOTK0DUGSiDT0Ds5LEt5ZtqcfAWIrXYnULU0Bhd2K5zgrfeisoQjq3Kr4mMIgByhsj4sikbnnwaumhnyDX-RvSCG16sMZDeciajpEB_5QCr3s8Puxga1m0GXL-LgxUoUKEFde6n3MHo6o-HgDZx_N7WklOsv84LCLeSKzmIOw_rmCity90zVC0BpjZLF3aZhVsbyhTFHQXiBjIbBH2cHyTrN6meuMyBlAQrK9VW5TGmEMv38Hf2L2DHKZa0P5tnE5eEX3APsIQ'}}
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
                    email: this.email,
                };

                axios
                    .post(axios.defaults.baseURL + '/api/register', data, this.auth)
                    .then((response) => {
                        if (response.data.data.state == 'ERROR') {
                            alert(response.data.data.msg)
                        }else{
                            this.$refs.form.reset()
                            alert(response.data.data.msg)
                        }
                    });
            }
        }

    };
</script>