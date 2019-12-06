<template id="grid-template">
    <table>
        <thead>
        <tr>
            <th v-for="colKey in columns" :key="colKey"
                @click="sortBy(colKey)"
                :class="{ active: sortKey === colKey }">
                {{ colKey | capitalize }}
                <span class="arrow" :class="sortOrders[colKey] > 0 ? 'asc' : 'dsc'"></span>
            </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="entry in filteredRooms" :key="entry.name"
            v-b-tooltip.hover.top.html.v-primary :title="entry.details">
            <td v-for="tdKey in columns" :key="tdKey"
                @click="apply(entry)">
                {{entry[tdKey]}}
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: 'grid',
        template: '#grid-template',
        props: {
            rooms: Array,
            columns: Array,
            filterKey: String,
            selectedInfo: String,
            parent : Object
        },
        data: function () {
            var sortOrders = {};
            this.columns.forEach(function (key) {
                sortOrders[key] = 1
            });
            sortOrders[this.columns[0]] = -1;
            return {
                sortKey: this.columns[0],
                sortOrders: sortOrders
            }
        },
        computed: {
            filteredRooms: function () {
                var sortKey = this.sortKey;
                var filterKey = this.filterKey && this.filterKey.toLowerCase();
                var order = this.sortOrders[sortKey] || 1;
                var rooms = this.rooms;
                if (filterKey) {
                    rooms = rooms.filter(function (row) {
                        return Object.keys(row).some(function (key) {
                            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                        })
                    })
                }
                if (sortKey) {
                    rooms = rooms.slice().sort(function (a, b) {
                        a = a[sortKey];
                        b = b[sortKey];
                        return (a === b ? 0 : a > b ? 1 : -1) * order;
                    })
                }
                return rooms
            }
        },
        filters: {
            capitalize: function (str) {
                return str.charAt(0).toUpperCase() + str.slice(1)
            }
        },
        methods: {
            apply: function (row) {
                if (typeof Office.context.mailbox !== 'undefined') {
                    var currentAppointment = Office.context.mailbox.item;
                    currentAppointment.location.setAsync("The event will take place in: " + row['name']);
                }
            },
            sortBy: function (key) {
                this.parent.fetchData(1);
                this.sortKey = key;
                this.sortOrders[key] = this.sortOrders[key] * -1;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    body {
        font-family: Helvetica Neue, Arial, sans-serif;
        font-size: 14px;
        color: #444;
    }

    table {
        border: 2px solid #0078D4;
        border-radius: 3px;
        /*background-color: #fff;*/
        margin-top: 5px;
    }

    tr:nth-child(even) {background: #CAE9F5}
    /*tr:nth-child(even) {background: #d4ebf2}*/
    tr:nth-child(odd) {background: #FFF}

    th {
        background-color: #0078D4;
        color: rgba(255, 255, 255, 0.66);
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    td {
        /*background-color: #f9f9f9;*/
    }

    th, td {
        padding: 5px 10px;
        max-width: 150px;
        cursor: pointer;
    }

    th.active {
        color: #fff;
    }

    th.active .arrow {
        opacity: 1;
    }

    .arrow {
        display: inline-block;
        vertical-align: middle;
        width: 0;
        height: 0;
        margin-left: 5px;
        opacity: 0.2;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
    }

    .arrow.asc {
        border-bottom: 4px solid #fff;
    }

    .arrow.dsc {
        border-top: 4px solid #fff;
    }

    form {
        margin-top: 4px;
    }
    .tooltip.b-tooltip {
       display: block;
        opacity: 0.9;
    }
</style>
