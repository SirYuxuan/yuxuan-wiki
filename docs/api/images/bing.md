---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 必应每日壁纸 API

:::info 接口说明
获取必应搜索首页每日更新的精美壁纸，支持多种分辨率，图片质量优秀，每日更新。适用于桌面壁纸、网站背景、应用展示等场景。
:::

## 接口概览

| 项目 | 说明 |
|------|------|
| 接口地址 | `/images/bing/getWallpaper` |
| 请求方式 | `GET` |
| 认证方式 | 无需认证 |
| 响应格式 | `image/*` |
| 更新频率 | 每日更新 |

## 在线调试

:::tip 快速测试
👉 [点击这里](https://api.oofo.cc/images/bing/getWallpaper) 在浏览器中直接查看今日壁纸
:::

使用 curl 调试：
```bash
# 下载图片
curl -o wallpaper.jpg "https://api.oofo.cc/images/bing/getWallpaper"

# 仅查看响应头
curl -I "https://api.oofo.cc/images/bing/getWallpaper"
```

## 请求说明

### 请求参数
本接口支持以下可选参数：

| 参数名 | 类型 | 必选 | 说明 |
|--------|------|------|------|
| resolution | string | 否 | 图片分辨率，可选值：`1920x1080`(默认)、`1366x768`、`3840x2160` |
| format | string | 否 | 图片格式，可选值：`jpg`(默认)、`png`、`webp` |

### 请求示例

```http
# 获取 4K 分辨率的壁纸
GET /images/bing/getWallpaper?resolution=3840x2160

# 获取 WebP 格式的壁纸
GET /images/bing/getWallpaper?format=webp
```

## 响应说明

### 成功响应

- **状态码**: `200 OK`
- **Content-Type**: `image/jpeg`（默认）或其他请求的图片格式
- **Content-Length**: 图片实际大小
- **Cache-Control**: `public, max-age=86400`（缓存 24 小时）

### 错误响应

<Tabs>
  <TabItem value="not_found" label="资源不存在" default>

**状态码**: `404 Not Found`

```json
{
  "code": 404,
  "msg": "今日壁纸尚未更新"
}
```

  </TabItem>
  <TabItem value="server_error" label="服务器错误">

**状态码**: `500 Internal Server Error`

```json
{
  "code": 500,
  "msg": "获取壁纸失败"
}
```

  </TabItem>
</Tabs>

## 代码示例

<Tabs>
  <TabItem value="javascript" label="JavaScript" default>

```javascript
// 在 img 标签中使用
const imgElement = document.createElement('img');
imgElement.src = 'https://api.oofo.cc/images/bing/getWallpaper';
document.body.appendChild(imgElement);

// 下载图片
async function downloadWallpaper() {
  try {
    const response = await fetch('https://api.oofo.cc/images/bing/getWallpaper');
    if (!response.ok) throw new Error('获取壁纸失败');
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `bing-wallpaper-${new Date().toISOString().split('T')[0]}.jpg`;
    a.click();
    
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('下载失败：', error);
  }
}
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
import requests
from datetime import datetime

def download_wallpaper(resolution='1920x1080'):
    try:
        url = 'https://api.oofo.cc/images/bing/getWallpaper'
        params = {'resolution': resolution}
        
        response = requests.get(url, params=params, stream=True)
        response.raise_for_status()
        
        # 生成文件名
        filename = f'bing-wallpaper-{datetime.now().strftime("%Y-%m-%d")}.jpg'
        
        # 保存图片
        with open(filename, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
                
        print(f'壁纸已保存为: {filename}')
        return filename
        
    except requests.exceptions.RequestException as e:
        print(f'下载失败: {str(e)}')
        return None

# 下载 4K 壁纸
wallpaper = download_wallpaper('3840x2160')
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;

public class BingWallpaper {
    private static final String API_URL = "https://api.oofo.cc/images/bing/getWallpaper";
    
    public static void downloadWallpaper(String resolution) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        
        String url = resolution == null ? API_URL : API_URL + "?resolution=" + resolution;
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .build();
                
        String filename = "bing-wallpaper-" + LocalDate.now() + ".jpg";
        Path filePath = Path.of(filename);
        
        HttpResponse<Path> response = client.send(request,
                HttpResponse.BodyHandlers.ofFile(filePath, StandardCopyOption.REPLACE_EXISTING));
                
        if (response.statusCode() == 200) {
            System.out.println("壁纸已保存为: " + filename);
        } else {
            Files.deleteIfExists(filePath);
            throw new IOException("下载失败，状态码: " + response.statusCode());
        }
    }
    
    public static void main(String[] args) {
        try {
            // 下载 4K 壁纸
            downloadWallpaper("3840x2160");
        } catch (Exception e) {
            System.err.println("下载出错: " + e.getMessage());
        }
    }
}
```

  </TabItem>
  <TabItem value="rust" label="Rust">

```rust
use reqwest::Client;
use tokio::fs::File;
use tokio::io::AsyncWriteExt;
use chrono::Local;
use anyhow::Result;

async fn download_wallpaper(resolution: Option<&str>) -> Result<String> {
    let client = Client::new();
    
    // 构建请求 URL
    let mut url = String::from("https://api.oofo.cc/images/bing/getWallpaper");
    if let Some(res) = resolution {
        url.push_str(&format!("?resolution={}", res));
    }
    
    // 发送请求
    let response = client.get(&url)
        .send()
        .await?;
        
    // 检查状态码
    if !response.status().is_success() {
        anyhow::bail!("下载失败，状态码: {}", response.status());
    }
    
    // 生成文件名
    let filename = format!("bing-wallpaper-{}.jpg", 
        Local::now().format("%Y-%m-%d"));
    
    // 保存文件
    let mut file = File::create(&filename).await?;
    let bytes = response.bytes().await?;
    file.write_all(&bytes).await?;
    
    println!("壁纸已保存为: {}", filename);
    Ok(filename)
}

#[tokio::main]
async fn main() -> Result<()> {
    // 下载 4K 壁纸
    match download_wallpaper(Some("3840x2160")).await {
        Ok(path) => println!("下载成功: {}", path),
        Err(e) => eprintln!("下载失败: {}", e),
    }
    Ok(())
}

// Cargo.toml 依赖:
// [dependencies]
// reqwest = { version = "0.11", features = ["json"] }
// tokio = { version = "1.0", features = ["full"] }
// chrono = "0.4"
// anyhow = "1.0"
```

  </TabItem>
</Tabs>

## 使用建议

:::caution 注意事项
1. 图片每日更新一次，建议做好缓存
2. 选择合适的分辨率以平衡加载速度和显示效果
3. 注意处理图片加载失败的情况
:::

### 最佳实践

1. **缓存策略**
   - 使用浏览器缓存或本地存储
   - 遵循响应头中的缓存指令
   - 在凌晨定时更新缓存

2. **性能优化**
   - 选择合适的图片格式和分辨率
   - 使用渐进式加载
   - 实现图片预加载

3. **错误处理**
   - 准备默认的备用图片
   - 添加加载状态提示
   - 实现失败重试机制

## 更新日志

| 版本 | 日期 | 描述 |
|------|------|------|
| 1.0.0 | 2024-02-11 | 接口首次发布 |
| 1.1.0 | 2024-02-12 | 添加分辨率和格式选项 | 