<template>
  <div style="padding: 10px">
    <div style="margin: 10px 0">
      <el-button type="primary" round @click="addData"
        >Add Data
        <i class="el-icon-edit el-icon--right"></i>
      </el-button>
    </div>
    <div style="margin: 10px 0">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="Category Id">
          <el-input
            v-model="searchForm.categoryId"
            placeholder="Category Id"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="Category Name">
          <el-input
            v-model="searchForm.categoryName"
            placeholder="Category name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            round
            style="margin-left: 5px"
            @click="searchCategory"
            >Search</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        prop="categoryId"
        label="category id"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="categoryName"
        label="category Name"
        width="400"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="categoryLevel"
        label="category level"
        align="center"
      >
      </el-table-column>
      <el-table-column label="Operation" fixed="right">
        <template #default="scope">
          <el-button
            size="mini"
            @click.prevent="handleEdit(scope.$index, tableData)"
            type="text"
          >
            Edit
          </el-button>
          <el-button
            size="mini"
            @click.prevent="handleRemove(scope.$index, tableData)"
            type="text"
          >
            Remove
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        v-model:currentPage="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="total"
        style="display: flex; justify-content: center"
      >
      </el-pagination>
    </div>
    <div>
      <el-dialog title="Category Information" v-model="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="Category id" :label-width="120">
            <el-input
              v-model="form.categoryId"
              autocomplete="off"
              style="width: 80%"
            ></el-input>
          </el-form-item>
          <el-form-item label="category Name" :label-width="120">
            <el-input
              v-model="form.categoryName"
              autocomplete="off"
              style="width: 80%"
              sortable
            ></el-input>
          </el-form-item>
          <el-form-item label="Category Level" :label-width="120">
            <el-input
              v-model="form.categoryLevel"
              autocomplete="off"
              style="width: 80%"
            ></el-input>
          </el-form-item>
          <el-form-item label="Img" :label-width="120">
            <el-input
              v-model="form.categoryImg"
              autocomplete="off"
              style="width: 80%"
              sortable
            ></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="save">Confirm</el-button>
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <div>
      <el-dialog title="Category Information" v-model="editFormVisible">
        <el-form :model="editForm">
          <el-form-item label="Category id" :label-width="120">
            <el-input
              v-model="editForm.categoryId"
              style="width: 80%"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="category Name" :label-width="120">
            <el-input
              v-model="editForm.categoryName"
              style="width: 80%"
            ></el-input>
          </el-form-item>
          <el-form-item label="Category Level" :label-width="120">
            <el-input
              v-model="editForm.categoryLevel"
              style="width: 80%"
            ></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="editFormsave">Confirm</el-button>
            <el-button @click="editFormVisible = false">Cancel</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ElMessage } from 'element-plus'

export default {
  data() {
    return {
      tableData: [],
      searchForm: {},
      search: '',
      currentPage: 1,
      pageSize: 20,
      total: 400,
      dialogFormVisible: false,
      form: {},
      editFormVisible: false,
      editForm: {}
    }
  },
  created() {
    this.load()
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (this.tableData[rowIndex].rentNum <= 50) {
        return 'warning-row'
      } else if (this.tableData[rowIndex].rentNum >= 500) {
        return 'success-row'
      }
      return ''
    },
    load() {
      axios
        .get(
          '/category/getAllCategory/' + this.currentPage + '/' + this.pageSize
        )
        .then(res => {
          console.log(res)
          this.tableData = res.data.data
        })
    },
    handleCurrentChange(val) {
      console.log(`now page: ${val}`)
      axios
        .get(
          '/category/getAllCategory/' + this.currentPage + '/' + this.pageSize
        )
        .then(res => {
          console.log(res)
          this.tableData = res.data.data
        })
    },
    addData() {
      this.dialogFormVisible = true
      this.form = {}
    },
    save() {
      axios.post('/category/addCategoryInfo', this.form).then(res => {
        if (res.data.status === 1000) {
          ElMessage({
            showClose: true,
            message: res.data.msg,
            type: 'success'
          })
          this.tableData.push(res.data.data)
        } else {
          ElMessage({
            showClose: true,
            message: res.data.msg,
            type: 'error'
          })
        }
        console.log(res)
        this.dialogFormVisible = false
      })
    },
    handleRemove(index, rows) {
      this.$confirm('Do you want to remove the categoty?', 'Remind', {
        confirmButtonText: 'confirm',
        cancelButtonText: 'cancel',
        type: 'warning'
      })
        .then(() => {
          axios
            .delete('/category/delete/' + this.tableData[index].categoryId)
            .then(res => {
              if (res.data.status === 1000) {
                rows.splice(index, 1)
                ElMessage({
                  showClose: true,
                  message: res.data.msg,
                  type: 'success'
                })
              } else {
                ElMessage({
                  showClose: true,
                  message: res.data.msg,
                  type: 'error'
                })
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'cancel'
          })
        })
    },
    handleEdit(index, rows) {
      this.editFormVisible = true
      this.editForm = this.tableData[index]
    },
    editFormsave() {
      axios.post('/category/editCategoryInfo', this.editForm).then(res => {
        if (res.data.status === 1000) {
          ElMessage({
            showClose: true,
            message: res.data.msg,
            type: 'success'
          })
          this.load()
          this.editFormVisible = false
          this.editForm = {}
        } else {
          ElMessage({
            showClose: true,
            message: res.data.msg,
            type: 'error'
          })
          this.editFormVisible = false
          this.editForm = {}
        }
      })
    },
    searchCategory() {
      axios
        .post(
          '/category/searchCategory/' + this.currentPage + '/' + this.pageSize,
          this.searchForm
        )
        .then(res => {
          if (res.data.status == 1000) {
            this.tableData = res.data.data
          } else {
            ElMessage({
              showClose: true,
              message: res.data.msg,
              type: 'error'
            })
          }
        })
      this.searchForm = {}
    }
  }
}
</script>

<style scoped>
.el-table .warning-row {
  --el-table-tr-background-color: var(--el-color-warning-lighter);
}
.el-table .success-row {
  --el-table-tr-background-color: var(--el-color-success-lighter);
}
.pagination {
  position: fixed;
  bottom: 0;
  height: 40px;
  width: 100%;
}
</style>
