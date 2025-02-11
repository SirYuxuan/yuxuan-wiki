---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 每日一言 API

:::info 接口说明
随机返回一句精选名言名句，包含作者和出处信息。适用于网站展示、日常分享、个性签名等场景。
:::

## 接口概览

| 项目 | 说明 |
|------|------|
| 接口地址 | `/text/oneDay` |
| 请求方式 | `GET` |
| 认证方式 | 无需认证 |
| 请求格式 | 无需参数 |
| 返回格式 | `application/json` |

## 在线调试

:::tip 快速测试
👉 [点击这里](https://api.oofo.cc/text/oneDay) 在浏览器中直接测试接口
:::

使用 curl 调试：
```bash
curl -X GET "https://api.oofo.cc/text/oneDay" \
     -H "Accept: application/json"
```

## 请求说明

### 请求参数
本接口无需任何参数。

### 请求头
| 参数名 | 必选 | 说明 |
|--------|------|------|
| Accept | 否 | 建议设置为 `application/json` |

## 响应说明

<Tabs>
  <TabItem value="success" label="成功响应" default>

**状态码**: `200 OK`

```json
{
  "code": 200,
  "data": "我的悲伤还来不及出发，就已经到站下车。——《第七天》",
  "msg": "Success"
}
```

  </TabItem>
  <TabItem value="error" label="错误响应">

**状态码**: `500 Error`

```json
{
  "code": 500,
  "msg": "无法获取每日一言"
}
```

  </TabItem>
</Tabs>

### 响应参数

| 参数名 | 类型 | 必含 | 说明 |
|--------|------|------|------|
| code | number | 是 | 状态码，200 表示成功，500 表示失败 |
| data | string | 否 | 返回的名言内容，包含作者和出处。仅在成功时返回 |
| msg | string | 是 | 返回的提示信息 |

## 代码示例

<Tabs>
  <TabItem value="javascript" label="JavaScript" default>

```javascript
// 使用 fetch API 调用
fetch('https://api.oofo.cc/text/oneDay')
  .then(response => response.json())
  .then(data => {
    if (data.code === 200) {
      console.log('今日名言：', data.data);
    } else {
      console.error('获取失败：', data.msg);
    }
  })
  .catch(error => {
    console.error('请求出错：', error);
  });

// 使用 async/await
async function getOneDay() {
  try {
    const response = await fetch('https://api.oofo.cc/text/oneDay');
    const data = await response.json();
    if (data.code === 200) {
      console.log('今日名言：', data.data);
    } else {
      console.error('获取失败：', data.msg);
    }
  } catch (error) {
    console.error('请求出错：', error);
  }
}
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
import requests

def get_one_day():
    try:
        response = requests.get('https://api.oofo.cc/text/oneDay')
        data = response.json()
        
        if data['code'] == 200:
            print('今日名言：', data['data'])
            return data['data']
        else:
            print('获取失败：', data['msg'])
            return None
            
    except requests.exceptions.RequestException as e:
        print('请求出错：', str(e))
        return None

# 调用示例
result = get_one_day()
```

  </TabItem>
  <TabItem value="java" label="Java">

```jsx
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.concurrent.CompletableFuture;

public class OneDayApi {
    private static final String API_URL = "https://api.oofo.cc/text/oneDay";
    
    public static CompletableFuture<String> getOneDay() {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(API_URL))
                .header("Accept", "application/json")
                .build();

        return client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                .thenApply(HttpResponse::body);
    }

    public static void main(String[] args) {
        getOneDay()
            .thenAccept(System.out::println)
            .join();
    }
}
```

  </TabItem>
  <TabItem value="go" label="Go">

```jsx
package main

import (
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
)

type Response struct {
    Code int    `json:"code"`
    Data string `json:"data"`
    Msg  string `json:"msg"`
}

func getOneDay() (*Response, error) {
    resp, err := http.Get("https://api.oofo.cc/text/oneDay")
    if err != nil {
        return nil, fmt.Errorf("请求失败: %v", err)
    }
    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        return nil, fmt.Errorf("读取响应失败: %v", err)
    }

    var result Response
    if err := json.Unmarshal(body, &result); err != nil {
        return nil, fmt.Errorf("解析JSON失败: %v", err)
    }

    return &result, nil
}

func main() {
    result, err := getOneDay()
    if err != nil {
        fmt.Println("错误:", err)
        return
    }

    if result.Code == 200 {
        fmt.Println("今日名言:", result.Data)
    } else {
        fmt.Println("获取失败:", result.Msg)
    }
}
```

  </TabItem>
  <TabItem value="rust" label="Rust">

```rust
use serde::{Deserialize, Serialize};
use reqwest::Error;

#[derive(Debug, Serialize, Deserialize)]
struct Response {
    code: i32,
    data: Option<String>,
    msg: String,
}

async fn get_one_day() -> Result<Response, Error> {
    let client = reqwest::Client::new();
    let response = client
        .get("https://api.oofo.cc/text/oneDay")
        .header("Accept", "application/json")
        .send()
        .await?
        .json::<Response>()
        .await?;
    
    Ok(response)
}

#[tokio::main]
async fn main() {
    match get_one_day().await {
        Ok(response) => {
            if response.code == 200 {
                if let Some(quote) = response.data {
                    println!("今日名言: {}", quote);
                }
            } else {
                println!("获取失败: {}", response.msg);
            }
        }
        Err(e) => println!("请求出错: {}", e),
    }
}

// Cargo.toml 依赖:
// [dependencies]
// reqwest = { version = "0.11", features = ["json"] }
// tokio = { version = "1.0", features = ["full"] }
// serde = { version = "1.0", features = ["derive"] }
```

  </TabItem>
</Tabs>

## 使用建议

:::caution 注意事项
1. 接口返回的内容随机，每次调用可能获取不同的名言
2. 建议在客户端做好缓存，避免频繁调用
3. 在展示时请保留引用出处，尊重原创
:::

### 最佳实践

1. **缓存策略**
   - 建议缓存时间：1小时或1天
   - 可以在凌晨定时更新
   - 提供强制刷新机制

2. **错误处理**
   - 实现请求重试机制
   - 准备备用显示内容
   - 设置合理的超时时间

3. **性能优化**
   - 使用 gzip 压缩
   - 实现请求合并
   - 避免频繁刷新

## 更新日志

| 版本 | 日期 | 描述 |
|------|------|------|
| 1.0.0 | 2024-02-11 | 接口首次发布 | 