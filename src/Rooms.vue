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

    export default {
        name: 'demo',
        components: {
            grid
        },
        data:  () => {
            return {
                searchQuery: '',
                selectedInfo: 'Our service has selected 4 meeting rooms for you.',
                gridColumns: ['rate', 'name', 'capacity'],
                gridData: [
                    {rate: 97, name: 'Library, 2nd floor, Hall 3', capacity: 'up to 20'},
                    {rate: 63, name: 'Main building, 4th floor, room 5', capacity: 'up to 15'},
                    {rate: 22, name: 'Laboratory building, penthouse', capacity: 'up to 50'},
                    {rate: 11, name: 'Lobby, interview room', capacity: 'up to 10'}
                ]
            }
        }
    }
</script>

<style>
    .message {
        display: block;
    }
</style>