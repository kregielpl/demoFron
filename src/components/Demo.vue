<template>
    <div v-bind:style="{maxHeight: '96.3vh', height: '100%'}">
    <v-container fluid fill-height pl-0 pr-0 pb-0 pt-0>
        <v-layout row align-space-between justify-space-between>
            <v-flex lg3 pr-2>
                <Lists/>
            </v-flex>
            <v-flex lg9 pr-2 pl-2>
                <router-view name="posts" :key="$route.fullPath"></router-view>
            </v-flex>
            <!--<v-flex lg2 pl-2>-->
            <!--</v-flex>-->
        </v-layout>
    </v-container>
    <v-footer height="auto" color="black">
        <v-layout justify-center>
            <v-flex white--text text-xs-center>
                &copy;2020
                <strong>Szawkało</strong>
            </v-flex>
        </v-layout>
    </v-footer>
    </div>
</template>

<script>
import Lists from "./Lists";

    export  default {
    name: "demo",
    components: {Lists },

}

</script>