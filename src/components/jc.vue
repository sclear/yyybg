<template>
  <div class="ss">
    <cs class="sss" @inputs='inputs' :values='firstName'>
    </cs>
    <div>{{firstName}}</div>
    <!-- <div>{{fullName}}</div>
      <input type="text" v-model="fullName"> -->
    <a href="javascript:;" class="file">导入表格
      <input id="upload" type="file" @change="importfxx($event)"/>
    </a>
  </div>
</template>

<script>
import cs from "./cs";
export default {
    data() {
        return {
            // fullName:333,
            firstName: "3",
            lastName: 2,
            file: ""
        };
    },
    methods: {
        inputs(res) {
            this.firstName = res;
        },
         importfxx(event) {
          //  console.log(obj)
                let _this = this;
                let inputDOM = this.$refs.inputer;
                // 通过DOM取文件数据
                this.file = event.currentTarget.files[0];
                // console.log(this.file)
                var rABS = false; //是否将文件读取为二进制字符串
                var f = this.file;
                var reader = new FileReader();
                //if (!FileReader.prototype.readAsBinaryString) {
                FileReader.prototype.readAsBinaryString = function(f) {
                    var binary = "";
                    var rABS = false; //是否将文件读取为二进制字符串
                    var pt = this;
                    var wb; //读取完成的数据
                    var outdata;
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var bytes = new Uint8Array(reader.result);
                        var length = bytes.byteLength;
                        for(var i = 0; i < length; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }
                        var XLSX = require('xlsx');
                        if(rABS) {
                            wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                                type: 'base64'
                            });
                        } else {
                            wb = XLSX.read(binary, {
                                type: 'binary'
                            });
                        }
                        outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);//outdata就是你想要的东西
                        // console.log(outdata)
                        
                    }
                    reader.readAsArrayBuffer(f);
                }
                if(rABS) {
                    reader.readAsArrayBuffer(f);
                } else {
                    reader.readAsBinaryString(f);
                }
            }
    },
    components: {
        cs
    }
    //   computed: {
    //   fullName: {
    //     // getter
    //     get: function () {
    //       return this.firstName + ' ' + this.lastName
    //     },
    //     // setter
    //     set: function (newValue) {
    //       console.log(newValue)
    //       var names = newValue.split(' ')
    //       this.firstName = names[0]
    //       this.lastName = names[names.length - 1]
    //     }
    //   }
    // }
};
</script>

<style scoped >
</style>
