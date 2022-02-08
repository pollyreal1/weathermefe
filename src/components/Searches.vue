<template>
    <div class="container">
        <h5>Searches of the users will be shown here</h5>

        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Searches</th>
                    <th>Timestamp</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="search in searches" :key="search.id">
                    <td>{{ search.search}}</td>
                    <td>{{ new Date(search.updated_at).toLocaleString() }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'

export default {

    data(){
        return {
            searches: null,
        }
    },
    
    mounted() {
        this.getSearches();
    },

    methods:{
        async getSearches() {
            axios
            .get(process.env.VUE_APP_API + '/api/search')
            .then((response) => {
                this.searches = response.data;
            });
        }
    },

}
</script>