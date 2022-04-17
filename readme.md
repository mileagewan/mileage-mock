## 一个简单的mock服务器
### 通过mockjs模拟数据，通过koa2构建服务器
```shell
npm i @mileage/mock -g

mileage-mock mock 你的存放mock的json文件夹 你的端口（默认3000）

# 示例
mileage-mock mock D:\mileage-mock\mock 9090

# mock文件夹的结构
mock
 data.json
   {
     "res": 200,
     "data|1-10":[
       {
         "id|+1": 1,
         "name": "张三",
         "age": "20"
       }
     ]
   }

# 访问
localhost:9090/mock/data
localhost:9090/mock/data.json

# 响应结构
{
    "res": 200,
    "data": [
        {
            "id": 1,
            "name": "张三",
            "age": "20"
        },
        {
            "id": 2,
            "name": "张三",
            "age": "20"
        },
        {
            "id": 3,
            "name": "张三",
            "age": "20"
        },
        {
            "id": 4,
            "name": "张三",
            "age": "20"
        },
        {
            "id": 5,
            "name": "张三",
            "age": "20"
        }
    ]
}
```
