---
title: 毕业设计（水表识别）后端知识整理
date: 2021-06-04 18:48:59
id: graduation-project-back-end-knowledge
categories:
  - Python
tags:
  - Python
  - 毕业设计
  - Flask
---

[[toc]]

# 毕业设计（水表识别）后端知识整理

大学毕业设计后端项目，主要功能是水表识别。

水表识别的代码参考了这个[项目](https://github.com/Denstiny2017/WaterMeter)（如果需要识别代码，请参考这个项目，我写的项目目前不打算公开）

## 技术点

- Flask
- TensorFlow

## 部分实现

### 识别接口

识别接口主要是上传图片，然后将图片传给识别函数，并且以一定的格式返回识别结果

```python
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif', 'JPG', 'JPEG', 'PNG', 'GIF'}

@app.route('/recognize', methods=['POST'])
def recognizeApi():
    file = request.files.get('file')
    if file and '.' in file.filename and file.filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS:
        data = file.read()
        imgRaw = str(base64.b64encode(data), encoding='utf-8')
        resStr, imgCrop = recognize(data)
        return jsonify({
            'code': 0,
            'message': '识别成功',
            'imgRaw': imgRaw,
            'imgCrop': imgCrop,
            'resStr': resStr
        })
    else:
        return jsonify({
            'code': 1,
            'message': '上传文件类型不支持',
        })
```

### 下载示例图片接口

这个接口就是简单的下载接口

```python
@app.route('/download/demo', methods=['GET'])
def download():
    directory = os.getcwd()
    return send_from_directory(directory, 'assets/demo.zip', as_attachment=True)
```

### 识别主函数

这也就是接口调用的函数，具体的里面的识别部分可以参考最上面提到的项目

```python
def recognize(data):
    num_region_bytes = get_num_region(BytesIO(data))  # 识别出字轮区域
    num_region = Image.fromarray(num_region_bytes)  # 转换成Image格式
    res_number = get_wm_num(num_region)  # 识别字轮区域的数字

    res_str = "{:6.0f}".format(res_number)

    # 将字轮区域的图片转为base64编码
    buffered = BytesIO()
    num_region.save(buffered, format="PNG")
    num_region_base64 = str(base64.b64encode(buffered.getvalue()), encoding='utf-8')

    return res_str, num_region_base64
```

## 总结

整个毕业设计最重要的部分，其实都是参考了别人的项目，这里再次感谢这位[作者](https://github.com/Denstiny2017)。

主要就是利用Flask建立起后端框架，能够让前后端联动。
