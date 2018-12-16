const exportExceltab = {
  exportExcel(obj) {

    require.ensure([], () => {
      const { export_json_to_excel } = require('./../vendor/Export2Excel');
      const tHeader = obj.thad;
      //对应表格输出的title
      const filterVal = obj.tbody;
      //?对应表格输出的数据
      const list = obj.tlist;
      const data = this.formatJson(filterVal, list);
      export_json_to_excel(tHeader, data, obj.title); //对应下载文件的名字
    })
  },
  formatJson(filterVal, jsonData) {
    return jsonData.map(v => filterVal.map(j => v[j]))
  }
}
export default exportExceltab;