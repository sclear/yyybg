<template>
  <div class="modify">
    <div v-for="(item,key,index) in menuModel" :key=index>
      <div v-if=" item[1] === 0 ">
        <j-text :name='item[0]'>
          <div slot="jtext">
            <el-input class="w200" :disabled="diabled" v-model='tableData[key]' :placeholder='`请输入${item[0]}`'></el-input>
          </div>
        </j-text>
      </div>

      <div v-else-if=" item[1] === 1">
        <j-date :name='item[0]'>
          <div slot="jdate">
            <el-date-picker class="w200" :disabled="diabled" v-model='tableData[key]' type="date" placeholder="选择日期" value-format="timestamp"></el-date-picker>
          </div>
        </j-date>
      </div>

      <div v-else-if=" item[1] === 2 ">
        <j-photo :name='item[0]'>
          <div slot="jphoto">
            <span v-if="!diabled" class="upload">选择文件
              <input @change="upload($event,key)" class="change" name="image" type="file" />
            </span>

            <img v-if="src === ''" class="previewImg" :src="$url+tableData[key]" alt="">
            <img v-if="src != ''" class="previewImg" :src="src" alt="">

          </div>
        </j-photo>
      </div>

      <div v-else-if=" item[1] === 3 ">
        <j-title :name='item[0]'></j-title>
      </div>

      <div v-else-if=" item[1] === 4 ">
        <j-radio :name='item[0]'>
          <div slot="jradio">
            <el-radio :disabled="diabled" v-model='tableData[key]' label="0">是</el-radio>
            <el-radio :disabled="diabled" v-model='tableData[key]' label="1">否</el-radio>
          </div>
        </j-radio>
      </div>

      <div v-else-if=" item[1] === 5 ">
        <j-text :name='item[0]'>
          <div slot="jtext">

            <el-select :disabled="diabled" class="w200" v-model="tableData[key]" :placeholder='`请选择${item[0]}`'>
              <el-option v-for="item in item[2]" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </j-text>
      </div>

    </div>
    <div class="mt30" v-if="!diabled">
      <el-button @click="bind" type="success">提交</el-button>
      <el-button>取消</el-button>
    </div>
  </div>
</template>


// 0 => 文字
// 1 => 日期
// 2 => 照片
// 3 => 标题
// 4 => 单选按钮
// 5 => select下拉
<script>
import jRadio from "./modelsmall/jradio";
import jTitle from "./modelsmall/jtitle";
import jDate from "./modelsmall/jdate";
import jText from "./modelsmall/jtext";
import jPhoto from "./modelsmall/jphoto";
export default {
    data() {
        return {
            // src:require('./../../assets/img/2yuandan.jpg')
            src: "",
        // value: ''
        };
    },
    props: {
        menuModel: Object,
        tableData: Object,
        diabled: Boolean
    },
    components: {
        jText,
        jPhoto,
        jDate,
        jTitle,
        jRadio
    },
    methods: {
        upload(res, index) {
            var self = res.currentTarget.parentElement.nextElementSibling;
            var newfile1 = res.target.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                self.src = e.target.result;
            };
            reader.readAsDataURL(newfile1);
        },
        bind() {
        }
    }
};
</script>

<style scoped >
.modify {
    padding-bottom: 50px;
}
.w200{
  width:200px;
}
</style>
