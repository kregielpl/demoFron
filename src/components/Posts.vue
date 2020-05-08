<template>
    <div style="height: 100%;">
        <v-card style="height: 100%; overflow: hidden">
            <v-toolbar color="blue" dark>
                <v-toolbar-title>Tytuł listy {{listId}}</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon>
                    <v-icon>search</v-icon>
                </v-btn>
            </v-toolbar>

            <v-list two-line style="height: calc(100% - 128px); overflow-y: scroll">
                <template v-for="(post, key) in posts ">
                    <Post v-bind:key="key" :post="post" :index="key"/>
                </template>

            </v-list>
            <v-divider></v-divider>
            <v-card-actions>
                <v-layout>
                    <v-flex>
                        <NewPost/>
                    </v-flex>
                </v-layout>
            </v-card-actions>

        </v-card>
    </div>
</template>

<script>
    import Post from './Post'
    import NewPost from './NewPost'
    import axios from "../axios";

    export default {
        name: "posts",
        components: { Post, NewPost},
        data: () => ({
            posts: [],
            auth: {headers: {Authorization: 'Bearer ' + localStorage.getItem("accessToken")}}
        }),
        computed: {
            listId() {
                return this.$route.params.id;
            }
        },
        methods: {
            getList(){
                console.log('tuaj1')

                const data = {};

                axios
                    .post(axios.defaults.baseURL + '/api/getAllMessage', data, this.auth)
                    .then((response) => {
                        if (response.data.state == 'ERROR') {
                            alert(response.data.msg)
                        }else{
                            this.posts = response.data.data
                            console.log(this.posts.length)
                        }
                    });
            },
            listenerChild() {
                console.log('tutaj')
                this.getList();
            },
            updateList(list){
                this.posts = list
            }
        },
        created() {
            this.getList()
        }

    }
</script>