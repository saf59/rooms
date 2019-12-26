<template>
    <div id="app">
        <span class="message">{{selectedInfo}}</span>
        <form id="search">
            Search <input name="query" v-model="searchQuery" aria-label="Search">
        </form>
        <grid :rooms="externalData"
              :columns="gridColumns"
              :filter-key="searchQuery"
              :selected-info="selectedInfo"
              :page-size=5>
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
        data: () => {
            return {
                searchQuery: '',
                selectedInfo: '',
                gridColumns: ['rate', 'name', 'capacity'],
                externalData: []
            }
        },
        mounted() {
            axios
                .get('/goodRooms.json')
                .then(response => {
                    this.externalData = response.data;
                    this.selectedInfo = 'Our service has selected ' + this.externalData.length + ' meeting rooms for you.';
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