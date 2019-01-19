<template>
    <div>
        <mu-raised-button label="场次列表" class="demo-raised-button" :primary="focus=='list'" @click="tab('list')"/>
        <mu-raised-button label="添加" class="demo-raised-button" :primary="focus=='add'" @click="tab('add')"/>
        <div class="listContent" v-if="focus=='list'" style="overflow:hidden;">
            <mu-table  multiSelectable enableSelectAll @rowSelection="rowSelection">
                <mu-thead>
                    <mu-tr>
                        <mu-th tooltip="hall">影厅</mu-th>
                        <mu-th tooltip="movie">电影</mu-th>
                        <mu-th tooltip="effect">效果</mu-th>
                        <mu-th tooltip="price">价格</mu-th>
                        <mu-th tooltip="start">开始时间</mu-th>
                        <mu-th tooltip="end">结束时间</mu-th>
                    </mu-tr>
                </mu-thead>
                <mu-tbody>
                    <mu-tr v-for="(list,index) in datalist" :key="list.pk">
                        <mu-td>{{list.hall}}</mu-td>
                        <mu-td>{{list.movie.name}}</mu-td>
                        <mu-td>{{list.effect}}</mu-td>
                        <mu-td>{{list.price}}</mu-td>
                        <mu-td>{{list.start}}</mu-td>
                        <mu-td>{{list.end}}</mu-td>
                        <mu-td><mu-raised-button label="编辑" class="demo-raised-button" secondary @click.native.stop="showEditScene(list,index)"></mu-raised-button></mu-td>
                    </mu-tr>
                </mu-tbody>
            </mu-table>
        </div>
        <div v-if="focus=='add'">
            <form>
                <p><mu-text-field v-model="addData.hall" label="影厅" label-float/></p>
                <p><mu-text-field v-model="addData.effect" label="效果" label-float/></p>
                <mu-raised-button class="demo-raised-button" label="添加" secondary @click="addScene"/>
            </form>
        </div>

        <mu-popup :position="popup.position" :overlay="popup.overlay" :popupClass="{'demo-popup-top': true, error: popup.error}" :open="popup.open">
            {{popup.message}}
        </mu-popup>
        <mu-dialog :open="dialog.open" :title="'修改 ['+editData.pk+']'" @close="dialog.open=false">
            <form>
                <p><mu-text-field v-model="editData.hall" label="影厅" label-float/></p>
                <p><mu-select-field v-model="editData.movie.pk" label="电影" :labelFocusClass="['label-foucs']">
                    <mu-menu-item v-for="movie, index in movielist" :key="index" :value="movie.pk" :title="movie.name"/>
                </mu-select-field></p>
                <p><mu-text-field v-model="editData.effect" label="效果" label-float/></p>
                <p><mu-text-field v-model="editData.price" label="价格" type="number" label-float/></p>
                <p><mu-text-field v-model="editData.start" label="开始时间" label-float/></p>
                <p><mu-text-field v-model="editData.end" label="结束时间" label-float/></p>
            </form>
            <mu-flat-button slot="actions" secondary @click="editScene" label="确定"/>
     </mu-dialog>
    </div>
</template>

<script>
export default {
    name: 'Scenes',
    data: function() {
        return {
            focus: 'list',
            popup:{
                open:false,
                position:'top',
                overlay:false,
                message:'',
                error:true
            },
            dialog: {
                open: false
            },
            editData: {
                hall:'',
                movie: {
                    pk:'',
                    name:''
                },
                effect:'',
                price:'',
                start:'',
                end:''
            },
            addData: {

            }
        }
    },
    methods: {
        tab(name) {
            this.focus = name;
            if(name == 'list') {
                this.$store.dispatch('getScenes', this.$http);
            }
        },
        rowSelection(selectedRowsIndex) {
            
        },
        showEditScene(list, index) {
            this.editData = list;
            this.dialog.open = true;
        },
        editScene() {
            this.$store.dispatch('editScene', {
                $http:this.$http,
                data: {
                    pk: this.editData.pk,
                    hall: this.editData.hall,
                    movie: this.editData.movie.pk,
                    effect: this.editData.effect,
                    price: this.editData.price,
                    start: this.editData.start,
                    end: this.editData.end
                }
            }).then(
                (value) => {
                    this.showPopup(false,"修改成功",1000);
                    this.dialog.open = false;
                    this.$store.dispatch('getScenes', this.$http);
                },
                (value) => {
                    this.showPopup(true,"修改失败",1000);
                    this.$store.dispatch('getScenes', this.$http);
                }
            )
        },
        addScene() {

        },

        showPopup(type, message, time) {
            this.popup.error = type;
            this.popup.message = message;
            this.popup.open = true;
            setTimeout(() => {
                this.popup.open = false;
            }, time);
        }
    },
    created() {
        this.$store.dispatch('getScenes', this.$http);
    },
    computed: {
        datalist() {
            return this.$store.getters.APP_scenes;
        },
        movielist() {
            return this.$store.getters.APP_movies;
        }
    },
}
</script>

<style> 
.demo-popup-top {
    width: 100%;
    opacity: .8;
    height: 48px;
    line-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 375px;
}
.error {
    background: red ;
    color: white ;
}
.mu-text-field{ width: 200px; }
.mu-grid-tile-titlebar{
    background-color: rgba(0, 0, 0, 0.0);
}
.mu-td, .mu-th{
    padding-left: 0px;
    padding-right: 0px;
}
.pig-pad{ float: left; margin-right:20px;  }
.pigbox{width: 200px; display: inline-block;position: relative;}
.pigbox img{display: block;width: 100%;}
</style>