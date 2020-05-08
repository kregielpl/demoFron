<template>
    <v-form
        ref="form"
        v-model="valid"
        :lazy-validation="lazy"
    >
        <v-text-field :rules="[v => !!v || 'Pole wymagane']" v-model="title" solo label="Dodaj post" append-icon="add">
            <template slot="append">
                <v-btn outlined style="margin-bottom: 6px" @click.prevent="validate">
                    <v-icon left>mdi-magnify</v-icon>
                    Wyślij
                </v-btn>
            </template>
        </v-text-field>
    </v-form>
</template>

<script>
    import axios from "../axios";

    export default {
        name: "newPost",
        data: () => ({
            title: "",
            valid: true,
            lazy: false,
            auth: {headers: {Authorization: 'Bearer ' + localStorage.getItem("accessToken")}}
        }),
        methods: {
            validate () {
                if(this.$refs.form.validate()){
                    this.submitForm()
                }else{
                    alert('Proszę wprowadzić wiadomość')
                }
            },
            submitForm(){
                const data = {
                    message: this.title,
                };

                axios
                    .post(axios.defaults.baseURL + '/api/addUserMessage', data, this.auth)
                    .then((response) => {
                        if (response.data.state == 'ERROR') {
                            alert('Wystąpił problem podczas wysyłania wiadomości')
                        }else{
                            console.log('Pomyślnie dodano wiadomość')
                            // Posts.methods.getList()
                            // this.$emit('listenerChild')
                            // this.getList()
                            // this.$parent.methods.getList()
                            this.$refs.form.reset()
                        }
                    });
            },
        }
    };
</script>