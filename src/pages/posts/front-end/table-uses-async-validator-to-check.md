---
title: 表格使用async-validator检验composition
date: 2023-01-16 15:24:40
id: table-uses-async-validator-to-check
categories:
  - 前端
tags:
  - Composition
  - Vue
  - async-validator
---

# 表格使用async-validator检验composition

```ts
import Schema from 'async-validator'
import type { Rules, ValidateError, ValidateFieldsError } from 'async-validator'

export async function validateTable(table: Record<string, unknown>[], rules: Rules) {
  const validator = new Schema(rules)
  let error: {
    errors: ValidateError[]
    fields: ValidateFieldsError
  } | undefined
  await Promise.all(table.map(item => validator.validate(item))).catch((e) => {
    error = e
  })
  if (error)
    throw error

  return true
}
```

## 进一步封装错误消息

```ts
export function getValidateFieldsError(fields: ValidateFieldsError) {
  const messages: string[] = []
  Object.entries(fields).forEach(([key, value]) => {
    messages.push(...value.map(item => item.message || ''))
  })
  return messages.filter(Boolean)
}
```
