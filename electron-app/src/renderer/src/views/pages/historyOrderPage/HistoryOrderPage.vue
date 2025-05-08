<template>
    <div class="order-list-container">
      <!-- 查询条件区域 -->
      <el-card class="search-card">
        <el-form :model="searchForm" inline>
          <el-form-item label="单据编号">
            <el-input v-model="searchForm.orderNo" placeholder="请输入单据编号" clearable />
          </el-form-item>
          <el-form-item label="客户名称">
            <el-input v-model="searchForm.customer" placeholder="请输入客户名称" clearable />
          </el-form-item>
          <el-form-item label="日期范围">
            <el-date-picker
              v-model="searchForm.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
  
      <!-- 表格区域 -->
      <el-card class="table-card">
        <el-table
          :data="tableData"
          border
          stripe
          style="width: 100%"
          @sort-change="handleSortChange"
          show-summary
          :summary-method="getSummaries"
        >
          <el-table-column
            prop="orderNo"
            label="单据编号"
            sortable="custom"
            width="180"
          />
          <el-table-column
            prop="customer"
            label="客户名称"
            sortable="custom"
            width="150"
          />
          <el-table-column
            prop="orderDate"
            label="日期"
            sortable="custom"
            width="120"
          />
          <el-table-column
            prop="amount"
            label="金额"
            sortable="custom"
            width="120"
            align="right"
          />
          <el-table-column
            prop="status"
            label="状态"
            sortable="custom"
            width="120"
          />
          <el-table-column
            prop="operator"
            label="操作人"
            sortable="custom"
            width="120"
          />
          <el-table-column label="操作" width="120">
            <template #default="scope">
              <el-button type="text" @click="handleDetail(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
  
        <!-- 分页 -->
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pagination.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
          />
        </div>
      </el-card>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchForm: {
          orderNo: '',
          customer: '',
          dateRange: []
        },
        tableData: [],
        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        sortParams: {
          prop: '',
          order: ''
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        // 这里应该是API请求，模拟数据
        this.tableData = [
          {
            orderNo: 'SC20230001',
            customer: '客户A',
            orderDate: '2023-01-15',
            amount: 5000,
            status: '已完成',
            operator: '张三'
          },
          // 更多模拟数据...
        ]
        this.pagination.total = this.tableData.length
      },
      handleSearch() {
        this.pagination.currentPage = 1
        this.fetchData()
      },
      resetSearch() {
        this.searchForm = {
          orderNo: '',
          customer: '',
          dateRange: []
        }
        this.handleSearch()
      },
      handleSortChange({ prop, order }) {
        this.sortParams = { prop, order }
        this.fetchData()
      },
      getSummaries(param) {
        const { columns, data } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计'
            return
          }
          if (column.property === 'amount') {
            const values = data.map(item => Number(item[column.property]))
            sums[index] = values.reduce((prev, curr) => prev + curr, 0)
            sums[index] += ' 元'
          } else {
            sums[index] = ''
          }
        })
        return sums
      },
      handleSizeChange(val) {
        this.pagination.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.pagination.currentPage = val
        this.fetchData()
      },
      handleDetail(row) {
        console.log('查看详情', row)
      }
    }
  }
  </script>
  
  <style scoped>
  .order-list-container {
    padding: 20px;
  }
  
  .search-card {
    margin-bottom: 20px;
  }
  
  .table-card {
    margin-bottom: 20px;
  }
  
  .pagination {
    margin-top: 20px;
    text-align: right;
  }
  </style>