<template>
    <v-navigation-drawer permanent style="width: 100%; overflow: hidden">
        <v-toolbar color="blue" dark>
            <v-toolbar-title >Twoje listy</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn icon >
                <v-icon>search</v-icon>
            </v-btn>
        </v-toolbar>
        <v-list>
            <v-list-tile color="blue">
                <v-list-tile-content>
                    <v-list-tile-title>Stwórz listę</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-list-tile-title>
                        <v-icon>add</v-icon>
                    </v-list-tile-title>
                </v-list-tile-action>
            </v-list-tile>
        </v-list>

        <v-divider></v-divider>
        <v-list style="height: calc(100% - 128px); overflow-y: scroll">
            <v-list-tile
                         :to="{ name: 'posts', params:{id: list.id} }"
                         v-for="(list, key) in lists"
                         v-bind:key="key"
            >
                <v-list-tile-content>
                    <v-list-tile-title>{{ list.title }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-list-tile-title>{{list.post}}</v-list-tile-title>
                </v-list-tile-action>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>

</template>

<script>
    export default {
        name: "lists",
        data: () => ({
            lists: [
                {
                    id: 1,
                    title:"Lista 1",
                    post: 12,
                }
            ]
        }),

    }
</script>