<template>
    <div id="app">
        <span class="message">{{selectedInfo}}</span>
        <form id="search">
            Search <input name="query" v-model="searchQuery">
        </form>
        <grid
                :rooms="gridData"
                :columns="gridColumns"
                :filter-key="searchQuery"
                :selectedInfo="selectedInfo">
        </grid>
    </div>
</template>

<script>
    import grid from './components/Grid.vue'
    import axios from 'axios';
    export default {
        components: {
            grid
        },
        data:  () => {
            return {
                searchQuery: '',
                selectedInfo: '',
                gridColumns: [],
                gridData: []
            }
        },
        mounted() {
            axios
                .get('/goodRooms.json')
                .then(response => {
                    this.gridData = response.data;
                    this.gridColumns = Object.keys(this.gridData[0]);
                    this.selectedInfo = 'Our service has selected '+this.gridData.length+' meeting rooms for you.';
                });
        }
    }
</script>

<style>
    .message {
        display: block;
    }
</style>