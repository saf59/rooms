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
                :selectedInfo="selectedInfo"
                :parent="this">
        </grid>
        <vue_simple_pagination v-if="pageCount > 1"
                               v-on:page-changed="fetchData"
                               v-bind:page-count="pageCount"
                               v-bind:current-page="currentPage">
        </vue_simple_pagination>
    </div>
</template>

<script>
    import grid from './components/Grid.vue'
    import vue_simple_pagination from './components/VueSimplePagination.vue'
    import axios from 'axios';

    export default {
        components: {
            grid,
            vue_simple_pagination
        },
        data: () => {
            return {
                searchQuery: '',
                selectedInfo: '',
                gridColumns: ['rate', 'name', 'capacity'],
                gridData: [],
                allData: [],
                pageCount: 0,
                currentPage: 1,
                pageSize: 5
            }
        },
        methods: {
            fetchData(selectedPage) {

                this.currentPage = selectedPage
                var start = (selectedPage - 1) * this.pageSize
                var end = start + this.pageSize
                this.gridData = this.allData.slice(start, end);
            }
        },
        mounted() {
            axios
                .get('/goodRooms.json')
                .then(response => {
                    this.allData = response.data;
                    //this.gridColumns = Object.keys(this.gridData[0]);
                    this.selectedInfo = 'Our service has selected ' + this.allData.length + ' meeting rooms for you.';
                    this.pageCount = this.allData.length / this.pageSize + 1
                    this.currentPage = 1
                    this.fetchData(1)
                });
        }
    }
</script>

<style lang="scss">
    @import '~bootstrap/scss/bootstrap.scss';
    @import '~bootstrap-vue/src/index.scss';

    .message {
        display: block;
    }

    body {
        font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
        font-size: 14px;
        font-stretch: 100%;
        font-style: normal;
        font-variant-caps: normal;
        font-variant-east-asian: normal;
        font-variant-ligatures: normal;
        font-variant-numeric: normal;
        font-weight: 400;
        margin-left: 10px;
    }
</style>