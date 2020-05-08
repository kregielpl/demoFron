<template>
    <v-list-tile ripple @click.prevent="toggle(index)">
        <v-list-tile-action>
            <v-btn icon @click="openModal()">
                <v-icon color="pink">edit</v-icon>
            </v-btn>
        </v-list-tile-action>

        <v-list-tile-content>
            <v-list-tile-title>{{ post.text }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ post.username }}</v-list-tile-sub-title>
            <v-list-tile-sub-title>{{ post.created.date }}</v-list-tile-sub-title>
        </v-list-tile-content>
    </v-list-tile>
</template>

<script>
    export default {
        name: "post",
        props: {
            post: Object,
            index: Number,
        },
        data: () => ({
            selected: [2]
        }),
        methods: {
            toggle(index) {
                console.log(index)
            },
            openModal() {
                this.$router.push({
                    name: "notes",
                    params: { postId: this.post.id }
                });
            }

        },

    }
</script>

